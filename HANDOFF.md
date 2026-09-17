# Handoff

Private working notes for Matthias Schaefle (`matthiasks`). React 19 + Vite 7 + Tailwind 3 + Framer Motion.

Repo (source): `https://github.com/matthiaskschaefle/matthiasks` (currently public).
Hostinger publishes from `https://github.com/matthiaskschaefle/matthias-portfolio` branch `deploy`. Pushing `portfolio-improvements` or even `deploy` on `matthiasks.git` does **not** update matthiasks.com.

This is not the Marcelo Gramas project.

## Current branch and commits (2026-09-17)

- Working branch: `portfolio-improvements`
- Source `HEAD`: `8784c62d65af025abcb3d4dd4f8873ab6f135b91`
- Subject: `Restore Delivery hero disc and regenerate resume PDF from current copy.`
- Also on GitHub: `7c80be8` (checkpoint) then `8784c62` (this publish).
- `origin/main` is still `4fe5307`. Local history fast-forwards from that commit. Not merged.

## Publication (verified live, not only by push)

| Place | SHA | Notes |
| --- | --- | --- |
| `matthiasks` `portfolio-improvements` | `8784c62` | Source of truth for code. Pushed 2026-09-17. |
| `matthiasks` `deploy` | `a9cc2f9` | Production files mirrored. Hostinger does **not** pull this repo. Sketch file omitted from this tree. |
| `matthias-portfolio` `deploy` | `5549d05` | This is what Hostinger auto-deploys. Fast-forward from `75a92a2`. No force push. |
| Live `https://matthiasks.com/` | HTML `last-modified: 2026-09-17 20:18:23 GMT` | Scripts: `index-hg7HkQky.js`, `case-delivery-B6R7nKGX.js`. |

Live checks on 2026-09-17 after Hostinger picked up `5549d05`:

- `/` homepage loads the new hashed bundle. Hero animation and positioning copy are present.
- `/delivery` uses the original radial disc (`560px`, `top: -140px`, `right: -180px`). No `delivery-route-sketch.webp` in the DOM or in `case-delivery-B6R7nKGX.js`. Requesting the sketch URL returns SPA HTML, not the image.
- `/resume` shows the approved copy, including projected 30 to 40% (not as a measured result).
- PDF `https://matthiasks.com/assets/portfolio/2026/07/CV_Matthias_Schaefle_2026-07.pdf` is `110924` bytes, `Content-Type: application/pdf`, same timestamp as the deploy.

## How to publish next time

1. Work on `portfolio-improvements` in `matthiasks.git`. Do not assume a source push goes live.
2. `npm run lint` and `npm run build`.
3. Copy `dist/` onto `matthias-portfolio` `deploy` (Apache tree: `.htaccess`, hashed `assets/`, `index.html`). Omit unused `delivery-route-sketch.webp` until Matthias wants it public.
4. Commit on that history (existing message style: `Deploy: ... (source <sha>)`) and `git push` without `--force`.
5. Wait until `https://matthiasks.com/` HTML references the new hashed JS. Hostinger `last-modified` should move. Then visually check `/`, `/delivery`, `/resume`, and the PDF.

Optional: also update `matthiasks.git` `deploy` so the two deploy trees do not drift.

## Delivery sketch

Rejected for the public site. Removed from `/delivery` markup and CSS. Restored pre-sketch `.case-hero-backdrop` from `df59cc4`. Asset remains unused in source at `public/assets/portfolio/delivery-route-sketch.webp`. Do not wire it back without a new visual brief.

## Resume PDF

Regenerated 2026-09-17 with `branding/resume/capture.mjs` (print of `/resume`). One A4 page, selectable text, no raster images. Generator checks were updated to the approved copy (`projected 30 to 40%`, measured `92% to 98%` and `7 to 8 seconds`). Old phrases `projected to fall` and `Measured results:` are gone from the page.

## Lint and build (this environment)

- `npm run lint`: 0 errors
- `npm run build`: Vite 7.3.6 succeeded

## Pending for tomorrow

- Merge or rebase `portfolio-improvements` into `main` if Matthias wants GitHub `main` to match the live source. Not done tonight.
- Decide whether `matthiasks.git` should stay public. Handoff previously called it private.
- Decide the fate of `delivery-route-sketch.webp` (keep unused, crop later, or delete).
- Hero VP9 alpha was checked in Chrome. Firefox and Safari/WebKit were not tested here.
- `src/lib/positioning.js` still comments that remaining pages are wired in W6. Do not invent a Biology-to-design story.
- Do not regenerate the PDF again unless copy changes.
- Hostinger credentials are not in this repo. If auto-deploy stops, publication blocks on hPanel Git for `matthiaskschaefle/matthias-portfolio` `deploy`.

## Factual constraints (do not invent)

- Paid: Delivery confirmation flow via Vulpes Studio, unnamed freight company, Barbacena, 2025. Paid: Dr. Helio / plastic surgeon site, 2024.
- Educational: DuoPet (2023). Never list as employment.
- Delivery 30 to 40% dispute reduction is a projection from pilot data, not a measured outcome.
- Biology is a previous career. WBS front-end curriculum has not started. German: B1 certified, B2 in progress.
- Title: UX/UI Designer. Do not use Design Engineer. Do not list Codex or Claude as skills.

## Unicode U+2013 and U+2014

Forbidden in project text and filenames. Use ASCII hyphen `-`, `to`, colon, or middle dot `·`.
