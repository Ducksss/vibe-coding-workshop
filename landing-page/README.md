# Workshop landing page

**[Live website](https://vibe-coding-workshop-nine.vercel.app)** · [Visual brand guide](https://vibe-coding-workshop-nine.vercel.app/brand.html)

A standalone, responsive landing page with an original premium identity and an artwork exported from ASCII Magic. Existing workshop examples are unchanged.

## Preview
From the repository root:

```sh
python3 -m http.server 5184 --bind 127.0.0.1 --directory landing-page
```

Open http://127.0.0.1:5184. No install or build is needed; deploy the contents of this directory to any static host.

- `index.html`: workshop and event landing page.
- `styles.css`: responsive layout and brand tokens.
- `studio.js`: video original/ASCII comparison, play/pause, tint, reset and reduced-motion handling.
- `brand.html`: visual brand guide.
- `BRAND.md`: downloadable guide and artwork recipe.
- `assets/`: original vector and video, actual ASCII Magic MP4 and PNG exports.

Event details are sourced from Luma; resources use the existing repository and demos. Registration is shown as closed. Links lead to the real destinations; this page does not collect registrations.

## Checks

```sh
python3 landing-page/check.py
node --test landing-page/studio.test.cjs
```

Browser smoke check: compare Original and ASCII; toggle Phosphor; Reset restores ASCII with tint off. Navigate to the toolkit, expand FAQs using Enter, and open the brand guide. Check 390 px mobile and 1440 px desktop for clipping and readable content. With JavaScript disabled, resources and FAQs should still work.


## Production deployment

Vercel project: `vibe-coding-workshop` in `ducksss-projects`, connected to `Ducksss/vibe-coding-workshop` on GitHub. The production branch is `main`, root directory is `landing-page`, framework is Other, build/install commands are empty, and output directory is `.`. Pushes to `main` deploy the static page automatically. Existing example deployments are separate projects.

GitHub's About website points to https://vibe-coding-workshop-nine.vercel.app . The `.vercel/` directory contains local linking metadata and is ignored by Git.
