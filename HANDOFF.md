# Handoff

Private working notes for Matthias Schaefle (`matthiasks`). React 19 + Vite 7 + Tailwind 3 + Framer Motion.

Repo (source): `https://github.com/matthiaskschaefle/matthiasks` (currently public).
Hostinger publishes from `https://github.com/matthiaskschaefle/matthias-portfolio` branch `deploy`. Pushing `portfolio-improvements` or even `deploy` on `matthiasks.git` does **not** update matthiasks.com.

This is not the Marcelo Gramas project.

## Current branch (2026-09-20)

- Working branch: `portfolio-improvements`
- Source of this round: `2fc6681` (`2fc668148554beaa99c406ef7cc5d0dbc7db073c`). Pushed to `origin/portfolio-improvements`. This HANDOFF commit sits after that SHA.
- `origin/main` is still `4fe5307`. Not merged. No force push.

## Publication (2026-09-20)

| Place | SHA | Notes |
| --- | --- | --- |
| `matthiasks` `portfolio-improvements` | `2fc6681` (work) | Local round committed and pushed. HANDOFF follows on the same branch. |
| `matthiasks` `deploy` | `a9cc2f9` | Not updated in this round. Hostinger does **not** pull this repo. |
| `matthias-portfolio` `deploy` | `ceba710` (`ceba710a07ed0fd18ca4281e734c61c705722521`) | Fast-forward from `fa21668`. Message: `Deploy: local mockup and chrome round (source 2fc6681)`. `.htaccess` unchanged. `delivery-route-sketch.webp` not present in this tree. |
| Live `https://matthiasks.com/` | still `index-D9ubmCtu.js` | HTML `last-modified: 2026-09-20 17:12:19 GMT`. That matches the previous Hostinger pull of `fa21668` (source `b50746d`). New hashed files `index-D4I6PLU1.js` and `index-D6qXg9l5.css` are not on the origin yet (`index-D4I6PLU1.js` falls back to `text/html`). |

GitHub has the new production tree. Hostinger has not pulled `ceba710` as of 2026-09-20 20:53 GMT. The previous Hostinger pull of `fa21668` landed within seconds of that Git push. This round had no matching pull after about 20 minutes.

## How to publish next time

1. Work on `portfolio-improvements` in `matthiasks.git`. Do not assume a source push goes live.
2. `npm run lint` and `npm run build`.
3. Copy `dist/` onto `matthias-portfolio` `deploy` (Apache tree: `.htaccess`, hashed `assets/`, `index.html`). Keep `delivery-route-sketch.webp` out of the published tree.
4. Commit on that history (existing message style: `Deploy: ... (source <sha>)`) and `git push` without `--force`.
5. Wait until `https://matthiasks.com/` HTML references the new hashed JS. Hostinger `last-modified` should move. Then visually check `/`, `/delivery`, `/resume`, and the PDF.
6. If GitHub `deploy` is ahead of live HTML, pull `matthiaskschaefle/matthias-portfolio` `deploy` in hPanel Git. Credentials are not in this repo.

Optional: also update `matthiasks.git` `deploy` so the two deploy trees do not drift.

Commit, push, and deploy only when Matthias explicitly authorizes each step.

## This round (source `2fc6681`)

Uncommitted local work was reviewed, then committed as-is. No extra product edits.

- DuoPet competitor mockups: Figma Screen PNGs `competitor-vetster-mockup.png` and `competitor-vets-mockup.png` (316x645), clipped silhouette `drop-shadow`. Inner `*-screen.png` files and the older `pet-profile` / `time-picker` copies are in the repo.
- Case hash restore waits for preceding layout, skips unstarted lazy images, and aborts if the user scrolls.
- StoryHero first-photo timer, Delivery Before crop `-24px`, hero disc inset shadow, glass header/footer, Observation/Decision labels, Delivery wire mockup in `imageManifest.json`.
- Resume PDF was not regenerated. Live and local public copies match sha256 `4c205e767499a26a658a2f0a6b9376605e4d9859f62f96277a8066ef5d3509d9`.

## Delivery sketch

`public/assets/portfolio/delivery-route-sketch.webp` was rejected. It stays in the source repo unused. Do not crop it, do not wire it into `/delivery`, and do not plan a later reintroduction. Do not delete the file. It is absent from the published `matthias-portfolio` tree.

## Case hashes (2026-09-20)

- In-flow `CaseContents` (no ScrollspyPill). Native `#` links.
- **One** offset: `html { scroll-padding-top: 88px }` (76px under 768px). Do not add matching `scroll-margin-top` on the same targets.
- Invalid fragments (`#%ZZ`) must not throw. Missing ids leave the page where it is.
- End-of-page hashes (short last sections) cannot sit under the header if remaining content is shorter than the viewport. That is document length, not double padding.
- `sectionStagger` parent opacity stays 1 so a hash jump does not land on an invisible section.
- This round did **not** re-measure live anchors after publish, because the public HTML is still the previous build.

## Resume PDF

`/resume` is the only layout source. `branding/resume/capture.mjs` prints that route to a temp file, validates HTML facts plus PDF page/image counts, then copies to `branding/resume/CV_Matthias_Schaefle.pdf` and `public/assets/portfolio/2026/07/CV_Matthias_Schaefle_2026-07.pdf`. On generation or validation failure the existing copies stay. The browser closes in `finally`.

Not regenerated in this round.

## Lint and build (this environment, 2026-09-20, before commit `2fc6681`)

- `npm run lint`: 0 errors
- `npm run build`: Vite 7.3.6 succeeded (`index-D4I6PLU1.js`, `index-D6qXg9l5.css`, `case-duopet-CGlHwIFL.js`)
- `git diff --check`: clean

## Live checks actually executed (2026-09-20 20:53 GMT)

- `GET` 200: `/`, `/about`, `/delivery`, `/doctor`, `/duopet`, `/resume` (all `text/html` of the **previous** build, script `index-D9ubmCtu.js`).
- `GET` 200 PDF, sha256 match with local `CV_Matthias_Schaefle_2026-07.pdf`.
- New mockup `https://matthiasks.com/assets/portfolio/2026/03/competitor-vetster-mockup.png` is **not** on origin yet.
- Firefox, Safari/WebKit, and a full live anchor pass were **not** run.

## Pending

- Hostinger pull of `matthias-portfolio` `ceba710`. Until `index.html` points at `index-D4I6PLU1.js`, matthiasks.com is not this round.
- Merge or rebase into `main` if Matthias wants GitHub `main` to match the live source.
- Decide whether `matthiasks.git` should stay public.
- Hero VP9 alpha was checked in Chrome in an earlier round. Firefox and Safari/WebKit were not tested here.
- `src/lib/positioning.js` still comments that remaining pages are wired in W6. Do not invent a Biology-to-design story.

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
