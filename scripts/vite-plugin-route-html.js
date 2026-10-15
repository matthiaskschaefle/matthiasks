// Vite plugin: one HTML file per route, plus 404.html and sitemap.xml.
//
// The site is a client-rendered SPA, but link previews (LinkedIn, Slack,
// WhatsApp) and some crawlers read only the HTML. Each route therefore gets a
// copy of the built index.html whose <head> carries that route's title,
// description, Open Graph tags and canonical URL. The page body is still
// rendered by React. public/.htaccess maps /about to about.html and serves
// 404.html with a real 404 status for unknown paths.
import { NOT_FOUND, ROUTES, SITE_ORIGIN, routeFileName } from "../src/lib/routes.js";
import { renderHeadTags } from "../src/lib/seo.js";

const MARKER = "<!-- route-head -->";
const START = "<!-- route-head:start -->";
const END = "<!-- route-head:end -->";

const block = (meta) => `${START}\n    ${renderHeadTags(meta)}\n    ${END}`;

function replaceHead(html, meta) {
  const start = html.indexOf(START);
  const end = html.indexOf(END);
  if (start < 0 || end < start) throw new Error("route-html: head markers missing from index.html");
  return html.slice(0, start) + block(meta) + html.slice(end + END.length);
}

export function sitemapXml(routes = ROUTES) {
  const urls = routes
    .filter((route) => route.inSitemap !== false)
    .map(
      (route) => `  <url><loc>${SITE_ORIGIN}${route.path === "/" ? "/" : route.path}</loc></url>`,
    );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
}

export default function routeHtml() {
  const home = ROUTES.find((route) => route.path === "/");

  return {
    name: "route-html",
    enforce: "post",
    // Dev and build: index.html gets the home page's tags.
    transformIndexHtml(html) {
      if (!html.includes(MARKER)) throw new Error(`route-html: ${MARKER} missing from index.html`);
      return html.replace(MARKER, block(home));
    },
    // Runs after Vite has emitted the final index.html (hashed asset URLs).
    generateBundle: {
      order: "post",
      handler(_options, bundle) {
        const index = bundle["index.html"];
        if (!index || index.type !== "asset")
          throw new Error("route-html: index.html not in bundle");
        const html = String(index.source);

        for (const route of ROUTES) {
          if (route.path === "/") continue;
          this.emitFile({
            type: "asset",
            fileName: routeFileName(route),
            source: replaceHead(html, route),
          });
        }
        this.emitFile({
          type: "asset",
          fileName: "404.html",
          source: replaceHead(html, NOT_FOUND),
        });
        this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemapXml() });
      },
    },
  };
}
