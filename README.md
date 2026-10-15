# matthiasks.com

Source of [matthiasks.com](https://matthiasks.com), the portfolio of Matthias Schaefle, UX/UI Designer in Berlin. Designed in Figma, built and shipped by me in React and Vite.

The site is a client-rendered React app compiled to static files and served by Apache. There is no backend, no cookies, no analytics and no third-party request: fonts, images, video and captions are all self-hosted.

## Run it

```bash
npm ci
npm run dev       # http://localhost:5173
npm run verify    # everything CI runs: lint, format, image sizes, build, tests, browser smoke test
```

Node 20.19 or newer. The smoke test needs Chrome or Edge (`CHROME_PATH` overrides the lookup).

## How it is put together

```
src/
  lib/routes.js        the only list of pages: path, title, description, preview text
  lib/seo.js           head tags for a route (shared by the browser and the build)
  App.jsx              router built from routes.js; root layout with header, footer, scroll restoration
  Home.jsx, About.jsx, Resume.jsx, Legal.jsx
  Delivery.jsx, Doctor.jsx, DuoPet.jsx   case studies
  components/          header, footer, case contents, video, parallax, typewriter
  components/mockups/  device frames, before/after, hotspots, gallery, lightbox
  styles/              one stylesheet per page, plus the CSS reset
scripts/
  vite-plugin-route-html.js   writes one HTML file per route, 404.html and sitemap.xml
  security-headers.js         CSP and other headers, served by `vite preview`
  image-manifest.mjs          records the size of every image the source uses
  smoke.mjs                   end-to-end check of the build in a real browser
tests/                        node:test suites (no test framework dependency)
public/.htaccess              production server config
branding/                     scripts that render the resume PDF, Open Graph image and LinkedIn assets
```

### One route table

`src/lib/routes.js` lists every page once. The router, the `<head>` tags, the per-route HTML files and the sitemap are all derived from it, and `tests/routes.test.js` fails if a page is listed without a module, a title or a canonical URL. Adding a page means one entry there and one import in `App.jsx`.

### HTML per route, rendered by React

Link previews on LinkedIn, Slack and WhatsApp read only the HTML, not what JavaScript renders. The build therefore writes `about.html`, `delivery.html` and so on: copies of the app shell whose `<head>` carries that page's title, description, Open Graph tags and canonical URL. Apache maps `/about` to `about.html`. Unknown paths get `404.html` with a real 404 status and `noindex`, instead of the usual single-page-app answer of 200 for everything.

### Navigation

The router loads a page's code before it switches, so the previous page stays on screen instead of flashing a loader. New pages open at the top; Back and Forward return to the previous scroll position, including after jumping through a case's contents. If a tab opened before a deploy asks for a file the deploy removed, the app reloads once to pick up the new build.

This uses React Router's data router, about 17 kB gzipped more than the plain `BrowserRouter`. The scroll and loading behaviour above is the reason.

### Styles

Each page keeps its own stylesheet in `src/styles/`. Page stylesheets are mounted with the page and removed when it unmounts, because pages intentionally reuse class names such as `.page` with different values. Shared tokens and components live in `src/index.css` and `src/components/mockups/mockups.css`.

### Motion and accessibility

Motion runs through Framer Motion with `reducedMotion="user"`, and components read the same setting through `useReducedMotion`, so the operating system preference turns off parallax, typing effects and autoplay everywhere. Images reserve their size before loading (from `imageManifest.json`), the lightbox traps focus and restores it, and case contents move focus to the section they jump to.

### Security

The production policy only allows scripts, styles, fonts, images, media and connections from this origin, and the build contains no inline script. `style-src` allows inline styles because page stylesheets are mounted as `<style>` elements. Headers are defined once in `scripts/security-headers.js`, served by `vite preview`, and checked against `public/.htaccess` by `tests/htaccess.test.js`. The smoke test fails on any CSP violation in the browser.

## Checks

| Command | What it proves |
| --- | --- |
| `npm run lint` | ESLint with the React hooks rules |
| `npm run format:check` | Prettier formatting |
| `npm run images:check` | `imageManifest.json` matches the image files |
| `npm test` | Route table, head tags, sitemap, server config, house style, and that no client name under NDA appears anywhere (stored only as hashes) |
| `npm run smoke` | Every route at 1440 and 390 px in a browser: one `<h1>`, the right title, no console error, no CSP violation, scroll position on navigation |

## Deploy

`npm run build` writes the static site to `dist/`. Production is that folder on Apache with `public/.htaccess`; no server code is involved.
