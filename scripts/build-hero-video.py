"""Build the hero video + silhouette mask from a raw intro clip.

Run from the project root:
    python -I -X utf8 scripts/build-hero-video.py [--src intro.mp4] [--crop 545,60,800,1000] [--model PATH]

Needs: ffmpeg on PATH, numpy, Pillow, onnxruntime, and the u2net_human_seg.onnx person-segmentation model
(176 MB, MIT: https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2net_human_seg.onnx).
Default model location is ~/.u2net/u2net_human_seg.onnx (the rembg convention). It is not committed.
Outputs: public/hero/hero.mp4, public/hero/hero.webm, public/hero/hero-mask.png

Why a mask? The page has big ghost text behind the video. A white shirt is lighter than the ghost text, so
`mix-blend-mode: darken` lets the letters show through the shirt. Instead the video is made opaque inside the
person's silhouette (hero-mask.png, applied with CSS mask-image) and fully transparent outside it.
To make that seamless, every pixel is clamped to the page paper colour, so the backdrop IS the page.

A white shirt on a white wall defeats colour thresholds, so the silhouette comes from a person-segmentation model
(unioned over the clip, since the person moves a little). The model is unsure about white clothing, so its threshold
is low. The lower part of the frame is always opaque: the ghost text never reaches it, and the model can't segment
white sneakers either.
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
W, H = 768, 960  # output size, 4:5 (matches .hero-video aspect-ratio in Hero.tsx)
# Source backdrop is ~0.91-0.94 grey with a vignette; 0.90 maps it to pure white so it can be clamped to PAPER.
LEVELS = "colorlevels=rimax=0.90:gimax=0.90:bimax=0.90"
BT709 = ["-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv"]

ML_THRESH = 0.15  # model alpha above this counts as person. Low on purpose: it is only ~0.3-0.5 on a white shirt.
CLOSE = 15  # px: bridges gaps in the model's mask
SMOOTH = 8  # px: blur radius used to round off lumps in the outline (re-thresholded, so it barely changes the size)
MARGIN = 6  # px: grow the silhouette so moving limbs are never clipped (also compensates for smoothing)
FEATHER = 3.0  # px: soft mask edge
SIDE_FEATHER = 0.08  # fraction of width faded at the left/right edges (hides the floor-shadow crop edge)
OPAQUE_FROM, OPAQUE_FULL = 0.62, 0.68  # fraction of height where the mask ramps to fully opaque (below the ghost text)
SAMPLE_FPS = 4
SEG_SIZE = 320  # u2net input size
MEAN = np.array([0.485, 0.456, 0.406], np.float32)
STD = np.array([0.229, 0.224, 0.225], np.float32)


def run(cmd):
    r = subprocess.run(cmd, capture_output=True)
    if r.returncode:
        sys.exit(r.stderr.decode(errors="replace")[-2000:])


def encode(src, crop):
    x, y, w, h = crop
    vf = (
        f"crop={w}:{h}:{x}:{y},scale={W}:{H}:flags=lanczos,format=gbrp,{LEVELS},"
        f"lutrgb=r='min(val,{PAPER[0]})':g='min(val,{PAPER[1]})':b='min(val,{PAPER[2]})',"
        "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p,setsar=1"
    )
    base = ["ffmpeg", "-v", "error", "-y", "-i", src, "-vf", vf]
    run(base + ["-c:v", "libx264", "-crf", "20", "-preset", "slow", "-pix_fmt", "yuv420p", *BT709,
                "-c:a", "copy", "-movflags", "+faststart", os.path.join(OUT, "hero.mp4")])
    run(base + ["-c:v", "libvpx-vp9", "-crf", "30", "-b:v", "0", "-row-mt", "1", "-pix_fmt", "yuv420p", *BT709,
                "-c:a", "libopus", "-b:a", "80k", os.path.join(OUT, "hero.webm")])


def fill_holes(mask):
    """mask: uint8 0/255. Fill everything not connected to the outside."""
    # 1px background border so (0,0) is outside. .copy(): Image.fromarray shares a read-only buffer and
    # ImageDraw.floodfill silently does nothing on it.
    padded = Image.fromarray(np.pad(mask, 1)).copy()
    ImageDraw.floodfill(padded, (0, 0), 128)
    arr = np.asarray(padded)[1:-1, 1:-1]
    return np.where(arr == 128, 0, 255).astype(np.uint8)


def load_model(path):
    if not os.path.isfile(path):
        sys.exit(f"Segmentation model not found: {path}\nDownload u2net_human_seg.onnx (see the docstring) or pass --model.")
    import onnxruntime as ort  # imported late so --help works without it

    return ort.InferenceSession(path, providers=["CPUExecutionProvider"])


def person_alpha(sess, frame_path):
    """Model alpha (0..1) at frame size."""
    img = Image.open(frame_path).convert("RGB")
    x = np.asarray(img.resize((SEG_SIZE, SEG_SIZE), Image.LANCZOS), np.float32) / 255.0
    x = (x / max(float(x.max()), 1e-6) - MEAN) / STD
    y = sess.run(None, {sess.get_inputs()[0].name: x.transpose(2, 0, 1)[None].astype(np.float32)})[0][0, 0]
    y = (y - y.min()) / max(float(y.max() - y.min()), 1e-6)
    return np.asarray(Image.fromarray((y * 255).astype(np.uint8)).resize(img.size, Image.BICUBIC), np.float32) / 255.0


def build_mask(model_path):
    sess = load_model(model_path)
    with tempfile.TemporaryDirectory() as tmp:
        # decode the *encoded* clip (BT.709) so the mask matches exactly what the browser will show
        run(["ffmpeg", "-v", "error", "-y", "-i", os.path.join(OUT, "hero.mp4"), "-vf",
             f"fps={SAMPLE_FPS},scale=in_color_matrix=bt709:in_range=tv,format=rgb24", os.path.join(tmp, "f%03d.png")])
        frames = sorted(glob.glob(os.path.join(tmp, "f*.png")))
        union = np.zeros((H, W), dtype=np.uint8)
        strong = np.zeros((H, W), dtype=bool)  # where the model is confident it is the person, in any frame
        for f in frames:
            alpha_ml = person_alpha(sess, f)
            union = np.maximum(union, np.where(alpha_ml > ML_THRESH, 255, 0).astype(np.uint8))
            strong |= alpha_ml > 0.5
    img = Image.fromarray(union).filter(ImageFilter.MaxFilter(CLOSE)).filter(ImageFilter.MinFilter(CLOSE))
    img = Image.fromarray(fill_holes(np.asarray(img)))
    img = img.filter(ImageFilter.GaussianBlur(SMOOTH)).point(lambda v: 255 if v > 110 else 0)
    img = img.filter(ImageFilter.MaxFilter(2 * MARGIN + 1)).filter(ImageFilter.GaussianBlur(FEATHER))
    alpha = np.asarray(img).astype(np.float32) / 255.0
    rows = np.clip((np.arange(H) / H - OPAQUE_FROM) / (OPAQUE_FULL - OPAQUE_FROM), 0, 1)
    alpha = np.maximum(alpha, rows[:, None])
    cols = np.clip(np.minimum(np.arange(W), W - 1 - np.arange(W)) / (SIDE_FEATHER * W), 0, 1)
    alpha = alpha * cols[None, :]
    rgba = np.dstack([np.full((H, W, 3), 255, np.uint8), (alpha * 255).round().astype(np.uint8)])
    Image.fromarray(rgba, "RGBA").save(os.path.join(OUT, "hero-mask.png"), optimize=True)
    clipped = float((strong & (alpha < 0.95)).sum() / max(int(strong.sum()), 1))
    return len(frames), float((union > 0).mean()), clipped


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", default=os.path.join(ROOT, "intro.mp4"))
    ap.add_argument("--crop", default="545,60,800,1000", help="x,y,w,h of a 4:5 window around the person in the source")
    ap.add_argument("--model", default=os.path.expanduser("~/.u2net/u2net_human_seg.onnx"), help="u2net_human_seg.onnx path")
    a = ap.parse_args()
    crop = tuple(int(v) for v in a.crop.split(","))
    assert crop[2] * 5 == crop[3] * 4, "crop must be 4:5"
    os.makedirs(OUT, exist_ok=True)
    encode(a.src, crop)
    n, cover, clipped = build_mask(a.model)
    print(f"encoded hero.mp4/webm; mask from {n} frames, person covers {cover:.1%} of the frame")
    print(f"safety check: {clipped:.3%} of the confident person area is under 95% opaque" + ("  <-- CLIPPING, raise MARGIN" if clipped > 0.001 else "  (ok)"))


if __name__ == "__main__":
    main()
