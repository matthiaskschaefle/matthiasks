# Handoff

Private working notes for Matthias Schaefle (`matthiasks`). React 19 + Vite 7 + Tailwind 3 + Framer Motion.

Repo (source): `https://github.com/matthiaskschaefle/matthiasks` (currently public).
Hostinger publishes from `https://github.com/matthiaskschaefle/matthias-portfolio` branch `deploy`. Pushing `portfolio-improvements` or even `deploy` on `matthiasks.git` does **not** update matthiasks.com.

This is not the Marcelo Gramas project.

## Current branch (2026-09-20)

- Working branch: `portfolio-improvements`
- This snapshot closes the reviewed uncommitted work on top of `49b2eac`. Source push to `origin/portfolio-improvements` is authorized. Deploy, merge to `main`, and force push are not.
- `origin/main` is still `4fe5307`. Not merged.

## Publication (last verified live, 2026-09-17)

| Place | SHA | Notes |
| --- | --- | --- |
| `matthiasks` `portfolio-improvements` | this snapshot after `49b2eac` | Source of truth for the reviewed site. Not what Hostinger deploys. |
| `matthiasks` `deploy` | `a9cc2f9` | Production files mirrored. Hostinger does **not** pull this repo. Sketch file omitted from this tree. |
| `matthias-portfolio` `deploy` | `5549d05` | This is what Hostinger auto-deploys. Fast-forward from `75a92a2`. No force push. |
| Live `https://matthiasks.com/` | HTML `last-modified: 2026-09-17 20:18:23 GMT` | Not updated in this round. No deploy. |

## How to publish next time

1. Work on `portfolio-improvements` in `matthiasks.git`. Do not assume a source push goes live.
2. `npm run lint` and `npm run build`.
3. Copy `dist/` onto `matthias-portfolio` `deploy` (Apache tree: `.htaccess`, hashed `assets/`, `index.html`). Keep `delivery-route-sketch.webp` out of the published tree.
4. Commit on that history (existing message style: `Deploy: ... (source <sha>)`) and `git push` without `--force`.
5. Wait until `https://matthiasks.com/` HTML references the new hashed JS. Hostinger `last-modified` should move. Then visually check `/`, `/delivery`, `/resume`, and the PDF.

Optional: also update `matthiasks.git` `deploy` so the two deploy trees do not drift.

Commit, push, and deploy only when Matthias explicitly authorizes each step. This snapshot may be on `origin/portfolio-improvements` and still unpublished.

## Delivery sketch

`public/assets/portfolio/delivery-route-sketch.webp` was rejected. It stays in the repo unused. Do not crop it, do not wire it into `/delivery`, and do not plan a later reintroduction. Do not delete the file.

## Case hashes (2026-09-20)

- In-flow `CaseContents` (no ScrollspyPill). Native `#` links.
- **One** offset: `html { scroll-padding-top: 88px }` (76px under 768px). Do not add matching `scroll-margin-top` on the same targets.
- Invalid fragments (`#%ZZ`) must not throw. Missing ids leave the page where it is.
- End-of-page hashes (short last sections) cannot sit under the header if remaining content is shorter than the viewport. That is document length, not double padding.
- `sectionStagger` parent opacity stays 1 so a hash jump does not land on an invisible section.

## Resume PDF

`/resume` is the only layout source. `branding/resume/capture.mjs` prints that route to a temp file, validates HTML facts plus PDF page/image counts, then copies to `branding/resume/CV_Matthias_Schaefle.pdf` and `public/assets/portfolio/2026/07/CV_Matthias_Schaefle_2026-07.pdf`. On generation or validation failure the existing copies stay. The browser closes in `finally`.

Tested 2026-09-20 against `http://localhost:4173/resume`:

1. `RESUME_FORCE_PDF_FAIL=1 node branding/resume/capture.mjs` threw after HTML load and left both PDFs at sha256 `38da13f57730b4e2652760c3c5042b187a2e82f60b642816c4fec66837ef3970`.
2. `node branding/resume/capture.mjs` then wrote one A4 page (107 KB, 0 images) and both copies match sha256 `4c205e767499a26a658a2f0a6b9376605e4d9859f62f96277a8066ef5d3509d9`.
3. `node --check branding/resume/capture.mjs` passes on syntax and does not catch undeclared identifiers. ESLint on `branding/resume/**/*.mjs` uses Node globals and `no-undef` (no React rules). A probe `copyFileSync(outputPath, publicPdfPath)` is a no-op for `node --check` and an error for ESLint.

Content checks on `/resume` HTML before print: Licenciatura (not B.Sc.), Late 2014 to early 2016, Deutsch für den Beruf, technical phase has not started, 92% to 98% and 7 to 8 seconds separate from projected 30 to 40% disputes, tel/mail/site links, role UX/UI Designer.

Intro still separates paid UX/UI client work from React/Vite on this portfolio. Doctor remains WordPress.

Preview download: after `npm run build`, `/resume` serves the public filename from `dist/`. Restart preview if it was started before the PDF copy.

## Lint and build (this environment, 2026-09-20)

- `npm run lint`: 0 errors
- `npm run build`: Vite 7.3.6 succeeded
- `git diff --check`: clean

## Pending

- Deploy this snapshot to `matthias-portfolio` `deploy` only with a separate authorization. Not done in this round. Source commit/push does not update matthiasks.com.
- Merge or rebase into `main` if Matthias wants GitHub `main` to match the live source.
- Decide whether `matthiasks.git` should stay public.
- Hero VP9 alpha was checked in Chrome. Firefox and Safari/WebKit were not tested here.
- `src/lib/positioning.js` still comments that remaining pages are wired in W6. Do not invent a Biology-to-design story.
- Hostinger credentials are not in this repo. If auto-deploy stops, publication blocks on hPanel Git for `matthiaskschaefle/matthias-portfolio` `deploy`.

## Factual constraints (do not invent)

- Paid: Delivery confirmation flow via Vulpes Studio, unnamed freight company, Barbacena, 2025. Paid: Dr. Helio / plastic surgeon site, 2024 (WordPress; later rebuilt by others).
- Educational: DuoPet (2023). Never list as employment.
- Delivery 30 to 40% dispute reduction is a projection from pilot data, not a measured outcome.
- 7 to 8 seconds is the whole stop; later observation placed the saving in the confirmation flow.
- 92% to 98% is aggregate record compliance.
- Biology is a previous career. WBS: three months of Deutsch für den Beruf, then AI Software Development. The technical phase has not started. German: B1 certified, B2 in progress.
- Title: UX/UI Designer. Do not use Design Engineer. Do not list Codex or Claude as skills.

## Unicode U+2013 and U+2014

Forbidden in project text and filenames. Use ASCII hyphen `-`, `to`, colon, or middle dot `·`.
