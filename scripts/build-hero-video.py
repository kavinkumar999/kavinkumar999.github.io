"""Build the hero clip from a raw intro video: a side-by-side (colour | matte) video with audio.

Run from the project root:
    python -I -X utf8 scripts/build-hero-video.py [--src intro.mp4] [--crop 545,60,800,1000] [--model PATH]

Needs: ffmpeg on PATH, numpy, Pillow, onnxruntime, and the u2net_human_seg.onnx person-segmentation model
(176 MB, MIT: https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2net_human_seg.onnx).
Default model location is ~/.u2net/u2net_human_seg.onnx (the rembg convention). It is not committed.
Outputs: public/hero/hero.mp4 and public/hero/hero.webm, each 1536x960: left half colour, right half matte.

Why? The page has big ghost text *behind* the person, and a white shirt is lighter than the ghost text, so blend modes
let the letters show through it. The browser composites the two halves on a canvas (src/components/hero/useAlphaVideo.ts):
person opaque, everything else transparent. The matte is computed per frame so the cut-out hugs the person as they move.

Matte = person-segmentation model (smoothed over time, edges snapped to the image with a guided filter), plus a filled
interior because the model is unsure about white clothing, plus pixel evidence at the feet (white sneakers on a white wall).
Colours are clamped to the page paper colour so edge pixels blend into the page instead of leaving a white fringe.
"""
import argparse
import glob
import os
import subprocess
import sys
import tempfile

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "hero")

PAPER = (244, 242, 238)  # keep in sync with --paper (#f4f2ee) in src/app/globals.css
W, H = 768, 960  # one half; 4:5, matches the stage aspect ratio in Hero.tsx
FPS = 24
# Source backdrop is ~0.91-0.94 grey with a vignette; 0.90 maps it to pure white so it can be clamped to PAPER.
LEVELS = "colorlevels=rimax=0.90:gimax=0.90:bimax=0.90"
BT709 = ["-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv"]

SEG_SIZE = 320  # u2net input size
MEAN = np.array([0.485, 0.456, 0.406], np.float32)
STD = np.array([0.229, 0.224, 0.225], np.float32)
TIME_WEIGHTS = (1, 2, 1)  # temporal smoothing of the model output, to stop the edge flickering
# The model's idea of a white shirt flickers frame to frame, but the torso barely moves (the head does). So from the
# shoulders down the best confidence seen over the whole clip is used; above, each frame's own (the head sways ~40 px).
TORSO_FROM, TORSO_FULL = 0.21, 0.25  # fraction of height where that blend starts and is complete (the shoulders)
GUIDE_R, GUIDE_EPS = 8, 2e-3  # guided filter: snaps the soft model edge to real image edges (hair, hands, trousers)
EDGE_LO, EDGE_HI = 0.35, 0.60  # model alpha mapped to 0..1 for the edge ramp (the model is ~0.5 at the true edge)
CORE_THRESH = 0.20  # the model is only ~0.3-0.5 on a white shirt, so the interior is filled from a low threshold
CLOSE = 15  # px: bridges gaps in the interior
ERODE = 12  # px: the interior stops short of the edge, so the edge comes from the ramp above
FEATHER = 1.5  # px: softens the interior boundary
FEET_FROM = 0.80  # fraction of height below which pixel evidence is added (the model can't see white sneakers)
FEET_THRESH, FEET_PAD = 8, 40  # a pixel is "person" if this much darker than PAPER; px of slack either side of the legs


def run(cmd):
    r = subprocess.run(cmd, capture_output=True)
    if r.returncode:
        sys.exit(r.stderr.decode(errors="replace")[-2000:])


def extract_frames(src, crop, dst):
    """Crop, whiten the backdrop, clamp to PAPER; write lossless RGB PNGs (one per source frame)."""
    x, y, w, h = crop
    vf = (
        f"crop={w}:{h}:{x}:{y},scale={W}:{H}:flags=lanczos,format=gbrp,{LEVELS},"
        f"lutrgb=r='min(val,{PAPER[0]})':g='min(val,{PAPER[1]})':b='min(val,{PAPER[2]})',format=rgb24"
    )
    run(["ffmpeg", "-v", "error", "-y", "-i", src, "-vf", vf, "-fps_mode", "passthrough", os.path.join(dst, "%04d.png")])


# ---------- matte ----------

def load_model(path):
    if not os.path.isfile(path):
        sys.exit(f"Segmentation model not found: {path}\nDownload u2net_human_seg.onnx (see the docstring) or pass --model.")
    import onnxruntime as ort  # imported late so --help works without it

    return ort.InferenceSession(path, providers=["CPUExecutionProvider"])


def person_alpha(sess, img):
    """Model alpha, uint8 at frame size."""
    x = np.asarray(img.resize((SEG_SIZE, SEG_SIZE), Image.LANCZOS), np.float32) / 255.0
    x = (x / max(float(x.max()), 1e-6) - MEAN) / STD
    y = sess.run(None, {sess.get_inputs()[0].name: x.transpose(2, 0, 1)[None].astype(np.float32)})[0][0, 0]
    y = (y - y.min()) / max(float(y.max() - y.min()), 1e-6)
    return np.asarray(Image.fromarray((y * 255).astype(np.uint8)).resize(img.size, Image.BICUBIC))


def box(a, r):
    k = 2 * r + 1
    c = np.pad(a, r, mode="edge").astype(np.float64).cumsum(0).cumsum(1)
    c = np.pad(c, ((1, 0), (1, 0)))
    return (c[k:, k:] - c[:-k, k:] - c[k:, :-k] + c[:-k, :-k]) / (k * k)


def guided(guide, p, r, eps):
    """Guided filter (He et al.): p follows the edges of guide."""
    mi, mp = box(guide, r), box(p, r)
    a = (box(guide * p, r) - mi * mp) / (box(guide * guide, r) - mi * mi + eps)
    b = mp - a * mi
    return np.clip(box(a, r) * guide + box(b, r), 0, 1)


def fill_holes(mask):
    """mask: uint8 0/255. Fill everything not connected to the outside."""
    # 1px background border so (0,0) is outside. .copy(): Image.fromarray shares a read-only buffer and
    # ImageDraw.floodfill silently does nothing on it.
    padded = Image.fromarray(np.pad(mask, 1)).copy()
    ImageDraw.floodfill(padded, (0, 0), 128)
    return np.where(np.asarray(padded)[1:-1, 1:-1] == 128, 0, 255).astype(np.uint8)


def morph_close(mask, size):
    return np.asarray(Image.fromarray(mask).filter(ImageFilter.MaxFilter(size)).filter(ImageFilter.MinFilter(size)))


def feet_evidence(rgb, q):
    """Pixels clearly darker than the backdrop below FEET_FROM, near the legs: sneakers and their contact shadow."""
    y0 = int(FEET_FROM * H)
    legs = np.where((q[int(0.7 * H):] > 0.5).any(axis=0))[0]
    out = np.zeros((H, W), np.float32)
    if len(legs) == 0:
        return out
    x0, x1 = max(int(legs.min()) - FEET_PAD, 0), min(int(legs.max()) + FEET_PAD, W)
    darker = (np.array(PAPER, np.int16) - rgb.astype(np.int16)).max(axis=2)
    ev = np.zeros((H, W), np.uint8)
    ev[y0:, x0:x1] = np.where(darker[y0:, x0:x1] > FEET_THRESH, 255, 0)
    ev = fill_holes(morph_close(ev, 9))
    return np.asarray(Image.fromarray(ev).filter(ImageFilter.GaussianBlur(FEATHER)), np.float32) / 255.0


def make_matte(rgb, q):
    """rgb: HxWx3 uint8 frame; q: HxW float model alpha (already smoothed over time). Returns float alpha 0..1."""
    gray = rgb.astype(np.float32).mean(axis=2) / 255.0
    q = guided(gray, q, GUIDE_R, GUIDE_EPS)
    edge = np.clip((q - EDGE_LO) / (EDGE_HI - EDGE_LO), 0, 1)
    core = fill_holes(morph_close(np.where(q > CORE_THRESH, 255, 0).astype(np.uint8), CLOSE))
    core = Image.fromarray(core).filter(ImageFilter.MinFilter(2 * ERODE + 1)).filter(ImageFilter.GaussianBlur(FEATHER))
    return np.maximum.reduce([edge, np.asarray(core, np.float32) / 255.0, feet_evidence(rgb, q)])


def build_mattes(model_path, color_dir, matte_dir, cache=None):
    files = sorted(glob.glob(os.path.join(color_dir, "*.png")))
    n = len(files)
    if cache and os.path.isfile(cache):
        ml = np.load(cache)
        print(f"  reusing model output from {cache}", flush=True)
    else:
        sess = load_model(model_path)
        ml = np.zeros((n, H, W), np.uint8)
        for i, f in enumerate(files):
            ml[i] = person_alpha(sess, Image.open(f).convert("RGB"))
            if i % 40 == 0:
                print(f"  segmenting {i}/{n}", flush=True)
        if cache:
            np.save(cache, ml)
    wsum = float(sum(TIME_WEIGHTS))
    torso = np.clip((np.arange(H) / H - TORSO_FROM) / (TORSO_FULL - TORSO_FROM), 0, 1).astype(np.float32)[:, None]
    best = ml.max(axis=0).astype(np.float32) / 255.0  # per pixel: the most confident any frame was
    worst = 0.0
    for i, f in enumerate(files):
        q = sum(w * ml[min(max(i + d, 0), n - 1)].astype(np.float32) for w, d in zip(TIME_WEIGHTS, (-1, 0, 1))) / (255.0 * wsum)
        q = np.maximum(q, torso * best)
        rgb = np.asarray(Image.open(f).convert("RGB"))
        alpha = make_matte(rgb, q)
        # where the model is confident it is the person, 3 px in from its soft edge: that must be opaque
        strong = np.asarray(Image.fromarray(np.where(ml[i] > 127, 255, 0).astype(np.uint8)).filter(ImageFilter.MinFilter(7))) > 0
        worst = max(worst, float((strong & (alpha < 0.9)).sum() / max(int(strong.sum()), 1)))
        Image.fromarray((alpha * 255).round().astype(np.uint8), "L").save(os.path.join(matte_dir, os.path.basename(f)))
    return n, worst


# ---------- encode ----------

def encode(src, color_dir, matte_dir):
    pre = ["ffmpeg", "-v", "error", "-y", "-framerate", str(FPS), "-i", os.path.join(color_dir, "%04d.png"),
           "-framerate", str(FPS), "-i", os.path.join(matte_dir, "%04d.png"), "-i", src]
    fc = ("[0:v]format=rgb24[c];[1:v]format=rgb24[m];[c][m]hstack=inputs=2,"
          "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p,setsar=1[v]")
    maps = ["-filter_complex", fc, "-map", "[v]", "-map", "2:a"]
    run(pre + maps + ["-c:v", "libx264", "-crf", "20", "-preset", "slow", "-pix_fmt", "yuv420p", *BT709,
                      "-c:a", "copy", "-movflags", "+faststart", os.path.join(OUT, "hero.mp4")])
    run(pre + maps + ["-c:v", "libvpx-vp9", "-crf", "30", "-b:v", "0", "-row-mt", "1", "-pix_fmt", "yuv420p", *BT709,
                      "-c:a", "libopus", "-b:a", "80k", os.path.join(OUT, "hero.webm")])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", default=os.path.join(ROOT, "intro.mp4"))
    ap.add_argument("--crop", default="545,60,800,1000", help="x,y,w,h of a 4:5 window around the person in the source")
    ap.add_argument("--model", default=os.path.expanduser("~/.u2net/u2net_human_seg.onnx"), help="u2net_human_seg.onnx path")
    ap.add_argument("--keep", help="directory to keep per-frame PNGs and the model output in; reused on the next run (delete it if the source changes)")
    a = ap.parse_args()
    crop = tuple(int(v) for v in a.crop.split(","))
    assert crop[2] * 5 == crop[3] * 4, "crop must be 4:5"
    os.makedirs(OUT, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        work = a.keep or tmp
        color_dir, matte_dir = os.path.join(work, "color"), os.path.join(work, "matte")
        os.makedirs(color_dir, exist_ok=True)
        os.makedirs(matte_dir, exist_ok=True)
        extract_frames(a.src, crop, color_dir)
        n, worst = build_mattes(a.model, color_dir, matte_dir, os.path.join(work, "ml.npy") if a.keep else None)
        encode(a.src, color_dir, matte_dir)
    print(f"encoded {n} frames to public/hero/hero.mp4 + hero.webm (1536x960, colour | matte)")
    print(f"safety check: worst frame has {worst:.3%} of the confident person interior under 90% opaque"
          + ("  <-- CLIPPING" if worst > 0.01 else "  (ok)"))


if __name__ == "__main__":
    main()
