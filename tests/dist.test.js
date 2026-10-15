// Checks the production build in dist/. Run after `npm run build`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { NOT_FOUND, ROUTES, routeFileName, SITE_ORIGIN } from "../src/lib/routes.js";
import { findNdaWords, listFiles, read, ROOT } from "./helpers.js";

const built = existsSync(join(ROOT, "dist/index.html"));
const skip = built ? false : "dist/ not built (run npm run build)";

const titleOf = (html) => html.match(/<title>([^<]*)<\/title>/)?.[1];
const canonicalOf = (html) => html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
const unescape = (text) => text.replace(/&quot;/g, '"').replace(/&amp;/g, "&");

test("each route has an HTML file with its own title and canonical", { skip }, () => {
  for (const route of ROUTES) {
    const html = read(`dist/${routeFileName(route)}`);
    assert.equal(unescape(titleOf(html)), route.title, route.path);
    const canonicalPath = route.canonical ?? route.path;
    assert.equal(canonicalOf(html), `${SITE_ORIGIN}${canonicalPath === "/" ? "/" : canonicalPath}`);
    assert.equal((html.match(/<title>/g) ?? []).length, 1, `${route.path}: one <title>`);
    assert.match(html, /<script type="module" crossorigin src="\/assets\/index-[\w-]+\.js">/);
  }
});

test("404.html is noindex and has no canonical", { skip }, () => {
  const html = read("dist/404.html");
  assert.equal(titleOf(html), NOT_FOUND.title);
  assert.match(html, /<meta name="robots" content="noindex, follow" \/>/);
  assert.equal(canonicalOf(html), undefined);
});

test("the build ships no inline scripts besides JSON-LD, so the CSP holds", { skip }, () => {
  for (const file of listFiles("dist", /\.html$/)) {
    for (const [tag] of read(file).matchAll(/<script\b[^>]*>/g)) {
      assert.ok(
        /type="application\/ld\+json"/.test(tag) || /\ssrc="\/assets\//.test(tag),
        `${file}: ${tag}`,
      );
    }
  }
});

test("the build contains no NDA name, no source maps and no rejected assets", { skip }, () => {
  const files = listFiles("dist", /\.(js|css|html|xml|txt|vtt|svg|json)$|^\.htaccess$/);
  assert.deepEqual(
    files.filter((file) => findNdaWords(read(file)).length > 0),
    [],
  );
  assert.deepEqual(listFiles("dist", /\.map$/), []);
  assert.deepEqual(listFiles("dist", /delivery-route-sketch/), []);
});
