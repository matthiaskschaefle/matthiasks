# Handoff for Codex

Private portfolio site for Matthias Schaefle (`matthiasks`). This file describes the **dirty working tree**, not a clean `HEAD`. Do not revert, reset, stash, or discard files. Do not commit, push, or deploy unless the user explicitly asks.

Repo: `https://github.com/matthiaskschaefle/matthiasks` (private).  
Site root: `/workspace/matthiasks` (React 19 + Vite 7 + Tailwind 3 + Framer Motion).  
This is **not** the Marcelo Gramas project.

## Current branch and commit

- Branch: `portfolio-improvements`
- Latest commit (`HEAD`): `df59cc4c54bb7d607ffbad516903ce4c4bbc92f9`
- Commit subject: `Remove en/em dashes from copy and classify resume work honestly.`
- Commit date: 2026-09-17 11:13:57 +0000
- All work after that commit is **uncommitted**. Staged: `git mv` of Delivery mockup files that used Unicode U+2013 in the filename. Unstaged: source, copy, CSS, and generated assets listed below.

## How to open or export this exact working tree

`git clone` + `git checkout portfolio-improvements` is **not** enough. That only yields `df59cc4`. Untracked generated assets and unstaged edits would be missing.

To keep this exact state:

1. Copy the directory `/workspace/matthiasks` as a whole, **or** tar it while excluding bulky regenerable folders:

```bash
cd /workspace
tar -czf matthiasks-handoff.tgz \
  --exclude='matthiasks/node_modules' \
  --exclude='matthiasks/dist' \
  --exclude='matthiasks/.git/objects/pack/*.tmp' \
  matthiasks
```

2. After extract: `cd matthiasks && npm ci && npm run dev` (install only in the Codex environment if `node_modules` was excluded).
3. Confirm `git status` still shows the same modified, renamed, and untracked paths. If the tree is clean, the handoff copy is wrong.
4. Do **not** `git reset --hard`, `git checkout -- .`, `git clean -fd`, or `git stash`. Those destroy this work.
5. Do **not** push `HEAD` and assume Codex can continue from GitHub. Untracked files are not on the remote.

Untracked files that must travel with the tree:

- `public/assets/hero-poses/hero-home-loop-2026.webm` (316 KB, VP9 with alpha)
- `public/assets/hero-poses/hero-home-loop-2026.webp` (3.18 MB, animated WebP with alpha)
- `public/assets/hero-poses/source/hero-home-loop-2026.mp4` (opaque original)
- `public/assets/hero-poses/source/hero-home-poster-2026.webp` (opaque original poster)
- `public/assets/portfolio/delivery-route-sketch.webp` (186 KB, 1536x1024)
- this `HANDOFF.md` once it exists on disk (untracked until someone commits it)

Also preserve the modified poster `public/assets/hero-poses/hero-home-poster-2026.webp` (transparent keyed still) and the unused `public/assets/hero-poses/hero-home-loop-2026.mp4` still in the public folder.

## Commands

From `/workspace/matthiasks`:

```bash
npm ci          # only if dependencies are missing; do not install extra packages unless asked
npm run dev     # Vite, typically http://127.0.0.1:5173/
npm run lint    # eslint .
npm run build   # vite build
npm run preview # optional production preview
```

Last run in this environment (after Delivery sketch): lint 0 errors; `vite build` succeeded. Home URL is `/`. Delivery case is `/delivery`. Trailing-slash issues from the Marcelo Gramas prototype do not apply here.

## Completed changes (uncommitted unless noted)

Already in `df59cc4` (committed earlier): dash cleanup in committed copy; honest resume classification work that landed in that commit. **Later edits to the same files are uncommitted.**

Uncommitted / staged on top of `df59cc4`:

- **Credibility and positioning:** Home/About/Resume copy. Role is UX/UI Designer. Open to UX/UI and Product Design roles in Germany. DuoPet labeled educational. Homepage DuoPet evidence: `164 survey responses · 2 usability-testing rounds`. Resume intro/bullets/skills without Codex/Claude as skills. Print resume CSS 10pt body / 8.5pt meta, one A4 page, no `transform: scale()`. Downloadable PDF was **not** regenerated.
- **Dash ban:** Visible copy, metadata, docs, and filenames must not use Unicode U+2013 or U+2014. Mockups under `public/assets/portfolio/2026/03/` and `2026/04/` were `git mv` renamed; `src/lib/imageManifest.json` and Entregas references updated. Staged as renames.
- **Home visual wrap:** Role size, pretty wrap, `Product Design` nowrap, work-title last-word + arrow, metadata segments, flex wrap so 390px does not overflow.
- **About:** Static H1 `About Matthias Schaefle` via `StoryHero` `heading` prop. Typewriter still drives the photo slideshow.
- **Home hero animation transparency:** Source MP4/poster had a baked near-white background plus CSS `mix-blend-mode: multiply` and `#FAFAF9` in the circular viewport. Edge flood-fill key (not global white chroma) produced VP9 WebM + animated WebP + transparent poster. Mix-blend and cream fill removed. Circular crop remains a layout viewport only. Reduced-motion uses the transparent poster. Fallback: animated WebP if VP9 WebM cannot play.
- **Home hero shadow:** `filter: drop-shadow(0 4px 6px rgba(26, 24, 21, 0.12))` on `.hero-video` only (video, animated fallback, poster). Not on the seal or container. Circular viewport did not clip the shadow at 1440 or 390.
- **Delivery opening sketch:** Replaced only `.case-hero-backdrop` on `/delivery`. See next section.

## Delivery sketch: implementation and negative visual feedback

**Implementation (current tree)**

- Asset: `public/assets/portfolio/delivery-route-sketch.webp`
- Markup: decorative `<div class="case-hero-backdrop" aria-hidden="true">` wrapping `<img alt="" ...>`. No screen-reader name. `pointer-events: none`. Not a research map.
- CSS: one continuous layer behind intro copy **and** the opening film (`inset: 0` on `.case-hero`). `object-fit: cover`, no repeat, no stretch, no animation, no parallax. Desktop `object-position: 68% 100%`. Mobile: lower 46% of the hero, `opacity: 0.42`, `object-position: center bottom`. Content order, video, and controls unchanged. Wireframe-grid circles and other pages' hero discs were not replaced.

**User constraints that count as rejection of the wrong treatment**

The user asked for a hand-drawn neighborhood as decoration, not as evidence. Negative instructions (do not do these):

- Do not present it as an actual research map.
- Do not repeat the image, stretch it, add animation, or add parallax.
- Do not remove circles that belong to screenshots, controls, or other pages.
- Do not let illustration detail sit on text or video controls.
- Do not add empty vertical space just to display the drawing.
- On mobile, simplify the crop and reduce prominence rather than repeating the desktop frame.

**Visual problems already seen on the rendered page**

First crop (`object-position: right bottom`) put the green route and houses **on** the Year value and the Result column. That failed the user's "keep details away from text" rule. The crop was moved to `68% 100%` so the empty paper sits under the title, meta, and in-short, with houses mainly at the right edge and under the film caption.

That second crop is what is in the tree now. It is **not** a user sign-off. After it was implemented, the user did not write a detailed screenshot critique in chat; they asked for this handoff instead. Treat the opening of `/delivery` as **unapproved visually**. The right-edge trees still sit close to the title block; the caption sits on the bottom houses; mobile is a faint bottom strip only.

## Inspect the rendered page before changing design

Do not restyle `/`, `/delivery`, `/about`, or `/resume` from memory, from this file, or from agent screenshots.

1. Run `npm run dev` and open the real page in a browser.
2. Check 1440px and 390px.
3. For Delivery: confirm text contrast, that the film controls still receive clicks, that the sketch crop matches the brief, and that `document.documentElement.scrollWidth` equals the viewport width.
4. Only then change CSS or assets.
5. Do not replace the keyed hero animation with a newly generated illustration. Do not fake transparency with mix-blend, whole-element opacity, a matched page color, or a circular crop alone.

## Pending tasks

- User has **not** authorized git commit, push, or any deploy of this dirty tree.
- Delivery opening still needs a human visual pass. If the user dislikes the current crop, adjust `object-position` / mobile strip first; do not invent a new illustration.
- Resume **page** follows `src/lib/resumeData.js`. The downloadable PDF at `RESUME_PDF_URL` was not rebuilt. Do not regenerate it unless asked.
- Hero VP9 alpha was verified in HeadlessChrome 153. Firefox and Safari/WebKit were not tested (Playwright browser binaries were not present; no extra installs). Fallback is animated WebP.
- `POSITIONING` comment still says remaining pages are wired in W6. Do not invent a Biology-to-design story on those pages.
- Do not fill Marcelo Gramas placeholders or work in that other repo from this tree.

## Factual constraints (do not invent)

Professional work vs education:

- **Paid:** Delivery confirmation flow, via Vulpes Studio, for an unnamed freight company in Barbacena (2025). **Paid:** Dr. Hélio / plastic surgeon site, freelance (2024).
- **Educational:** DuoPet (2023). Never list DuoPet as employment.
- Do not invent testimonials, metrics, quotes, or interviews. Delivery dispute reduction of 30 to 40% is a **projection** from pilot data, not a measured outcome; copy must keep that distinction.

Biology and WBS:

- Biology is a **previous career**. Do not build a Biology-to-design origin story or "unique bridge" in copy.
- WBS Front-end + AI Weiterbildung is **in progress**. German B2 comes first. The **technical curriculum has not started**. Do not claim WBS front-end skills or a completed bootcamp.
- German: B1 certified; currently attending B2. Do not upgrade that to fluent or C1.

Positioning:

- Target: UX/UI and Product Designer roles in Germany. Based in Berlin.
- Title: UX/UI Designer. Do not use "Design Engineer".
- Do not use Codex or Claude as resume skills.

## Unicode U+2013 and U+2014

Forbidden in project text and filenames: en dash (U+2013) and em dash (U+2014). Use ASCII hyphen `-`, `to`, colon, or middle dot `·`. This applies to UI copy, metadata, markdown (including this file), code comments, and asset names. Do not reintroduce dashes when renaming or writing copy.

## Deployment

No deploy, no GitHub Pages/Vercel/hosting publish, no `git push`, and no commit unless the user explicitly authorizes that action. Permission for one push does not carry over. Keep the repository private.
