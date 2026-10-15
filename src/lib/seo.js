// Document head for each page. headTags() is the one definition; the browser
// applies it on every navigation (applySeo) and the build writes it into each
// route's HTML file (renderHeadTags), so both always agree.
import { DEFAULT_IMAGE, NOT_FOUND, SITE_NAME, SITE_ORIGIN, findRoute } from "./routes.js";

const AUTHOR = "Matthias Schaefle";

function absoluteUrl(path) {
  return path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}

/**
 * @param {{ title: string, description: string, path?: string, canonical?: string,
 *   ogTitle?: string, ogDescription?: string, robots?: string }} meta
 *   Without `path` (404) there is no canonical and no og:url.
 * @returns {{ title: string, tags: { tag: "meta" | "link", attrs: Record<string, string> }[] }}
 */
export function headTags(meta) {
  const ogTitle = meta.ogTitle ?? meta.title;
  const ogDescription = meta.ogDescription ?? meta.description;
  const url = meta.path ? absoluteUrl(meta.canonical ?? meta.path) : null;
  const named = (name, content) => ({ tag: "meta", attrs: { name, content } });
  const property = (prop, content) => ({ tag: "meta", attrs: { property: prop, content } });

  const tags = [
    named("description", meta.description),
    named("author", AUTHOR),
    named("robots", meta.robots ?? "index, follow"),
    property("og:title", ogTitle),
    property("og:description", ogDescription),
    property("og:type", "website"),
    property("og:locale", "en_US"),
    property("og:site_name", SITE_NAME),
    ...(url ? [property("og:url", url)] : []),
    property("og:image", DEFAULT_IMAGE.url),
    property("og:image:width", String(DEFAULT_IMAGE.width)),
    property("og:image:height", String(DEFAULT_IMAGE.height)),
    property("og:image:alt", DEFAULT_IMAGE.alt),
    named("twitter:card", "summary_large_image"),
    named("twitter:title", ogTitle),
    named("twitter:description", ogDescription),
    named("twitter:image", DEFAULT_IMAGE.url),
    named("twitter:image:alt", DEFAULT_IMAGE.alt),
    ...(url ? [{ tag: "link", attrs: { rel: "canonical", href: url } }] : []),
  ];
  return { title: meta.title, tags };
}

/** Head metadata for a URL path: the route's, or the 404 page's. */
export function metaForPath(pathname) {
  return findRoute(pathname) ?? NOT_FOUND;
}

const escapeHtml = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Serializes headTags() for an HTML file. */
export function renderHeadTags(meta) {
  const { title, tags } = headTags(meta);
  const lines = tags.map(({ tag, attrs }) => {
    const attributes = Object.entries(attrs)
      .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
      .join(" ");
    return `<${tag} ${attributes} />`;
  });
  return [...lines, `<title>${escapeHtml(title)}</title>`].join("\n    ");
}

// The attribute that identifies each tag, so an update finds the existing one.
const KEY_ATTRIBUTES = ["name", "property", "rel"];

/** Applies the head metadata for `pathname` to the live document. */
export function applySeo(pathname) {
  const { title, tags } = headTags(metaForPath(pathname));
  document.title = title;
  const wanted = new Set();
  for (const { tag, attrs } of tags) {
    const key = KEY_ATTRIBUTES.find((attribute) => attribute in attrs);
    const selector = `${tag}[${key}="${attrs[key]}"]`;
    wanted.add(selector);
    let element = document.head.querySelector(selector);
    if (!element) {
      element = document.createElement(tag);
      document.head.appendChild(element);
    }
    for (const [name, value] of Object.entries(attrs)) element.setAttribute(name, value);
  }
  // The 404 page has no canonical or og:url: drop the ones a previous page set.
  for (const selector of ['link[rel="canonical"]', 'meta[property="og:url"]']) {
    if (!wanted.has(selector)) document.head.querySelector(selector)?.remove();
  }
}
