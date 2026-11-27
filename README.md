[![Build Deployment](https://github.com/kavinkumar999/kavinkumar999.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/kavinkumar999/kavinkumar999.github.io/actions/workflows/deploy.yml)

# Personal Website

Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS 4 + Lenis, exported as a static site to GitHub Pages.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Editing content

All copy lives in **`src/lib/data.ts`**. Components only read from it.

Replace these assets with your own (they are still placeholders from the design template):

| File | What it is |
|------|------------|
| `public/hero/hero.mp4`, `hero.webm` | Talking intro video (plays silently on loop, button plays it with sound) |
| `public/portrait-bust.webp` | Portrait on the flip ID card |
| `public/og.jpg`, `icon.png`, `favicon.ico` | Share image and icons |
| `public/cv.pdf` | Résumé download |

`scripts/build-hero-video.py` turns a raw `intro.mp4` (project root, gitignored) into `public/hero/hero.mp4`, `hero.webm` and `hero-mask.png`. The mask is the person's silhouette: it makes the video opaque in front of the big ghost name and transparent elsewhere (a white shirt is lighter than the ghost text, so a blend mode alone lets the letters show through it). Needs ffmpeg, numpy, Pillow, onnxruntime and the `u2net_human_seg.onnx` model; see the script's docstring. Re-run it whenever you swap the video, and check that it prints `(ok)` on the safety line.

The portrait, share image (`og.jpg`), icons and `cv.pdf` are plain files in `public/`; replace them directly.

New skill logos go in `public/logos/` and get registered in `src/components/ui/TechLogo.tsx`.

## Deploy

Pushes to `master` build and publish via `.github/workflows/deploy.yml`. This is a user site, so there is no base path.

## Credits

- Design and the "talking-video portfolio" concept: **Lohitha Damisetti** ([@SL_Tech_Journal](https://www.instagram.com/SL_Tech_Journal)), as adopted from Ajay B's open-source portfolio.
- Logos: [devicon](https://devicon.dev) (MIT, see `public/logos/LICENSE-devicon.txt`). Trademarks belong to their owners.
- Fonts: Inter Tight, Instrument Serif, JetBrains Mono (SIL OFL), self-hosted in `src/fonts`.
