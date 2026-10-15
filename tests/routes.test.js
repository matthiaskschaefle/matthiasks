// The route table is the single source for the router, the head tags, the
// per-route HTML files and the sitemap. These tests hold that contract.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  findRoute,
  normalizePath,
  NOT_FOUND,
  ROUTES,
  routeFileName,
  SITE_ORIGIN,
} from "../src/lib/routes.js";
import { headTags, metaForPath, renderHeadTags } from "../src/lib/seo.js";
import { sitemapXml } from "../scripts/vite-plugin-route-html.js";
import { read, ROOT } from "./helpers.js";

const attr = (tags, key, value) => tags.find((tag) => tag.attrs[key] === value)?.attrs;

test("route paths are unique, absolute and lowercase", () => {
  const paths = ROUTES.map((route) => route.path);
  assert.equal(new Set(paths).size, paths.length);
  for (const path of paths) assert.match(path, /^\/([a-z0-9-]+)?$/);
});

test("every route has a title, a description and a page module wired in App.jsx", () => {
  const app = read("src/App.jsx");
  for (const route of ROUTES) {
    assert.ok(route.title.length > 10, `${route.path}: title`);
    assert.ok(route.description.length > 50, `${route.path}: description`);
    const wiring = app.match(new RegExp(`\\b${route.page}: \\(\\) => import\\("\\./([\\w.]+)"\\)`));
    assert.ok(wiring, `${route.path}: page "${route.page}" missing from PAGES in App.jsx`);
    assert.ok(
      existsSync(join(ROOT, "src", wiring[1])),
      `${route.path}: ${wiring[1]} does not exist`,
    );
  }
});

test("canonical URLs are absolute, and /impressum points at /legal", () => {
  for (const route of ROUTES) {
    const canonical = attr(headTags(route).tags, "rel", "canonical");
    assert.ok(canonical.href.startsWith(`${SITE_ORIGIN}/`), route.path);
    assert.equal(attr(headTags(route).tags, "property", "og:url").content, canonical.href);
  }
  assert.equal(
    attr(headTags(findRoute("/impressum")).tags, "rel", "canonical").href,
    `${SITE_ORIGIN}/legal`,
  );
});

test("the 404 page is noindex and claims no canonical URL", () => {
  const { title, tags } = headTags(metaForPath("/no-such-page"));
  assert.equal(title, NOT_FOUND.title);
  assert.equal(attr(tags, "name", "robots").content, "noindex, follow");
  assert.equal(attr(tags, "rel", "canonical"), undefined);
  assert.equal(attr(tags, "property", "og:url"), undefined);
});

test("paths with a trailing slash resolve to the same route", () => {
  assert.equal(normalizePath("/about/"), "/about");
  assert.equal(normalizePath("/"), "/");
  assert.equal(findRoute("/delivery/")?.page, "delivery");
});

test("each route is written to its own file name", () => {
  assert.equal(routeFileName(findRoute("/")), "index.html");
  assert.equal(routeFileName(findRoute("/doctor")), "doctor.html");
  const files = ROUTES.map(routeFileName);
  assert.equal(new Set(files).size, files.length);
});

test("rendered head tags escape attribute values", () => {
  const html = renderHeadTags({ title: 'A "quoted" <title>', description: "x & y", path: "/" });
  assert.match(html, /<title>A &quot;quoted&quot; &lt;title&gt;<\/title>/);
  assert.match(html, /content="x &amp; y"/);
});

test("the sitemap lists exactly the indexable routes", () => {
  const xml = sitemapXml();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const expected = ROUTES.filter((route) => route.inSitemap !== false).map(
    (route) => `${SITE_ORIGIN}${route.path === "/" ? "/" : route.path}`,
  );
  assert.deepEqual(locs, expected);
  assert.ok(!locs.includes(`${SITE_ORIGIN}/impressum`));
});
