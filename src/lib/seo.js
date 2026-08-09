const SITE_ORIGIN = "https://matthiasks.com";
const DEFAULT_IMAGE = `${SITE_ORIGIN}/assets/portfolio/og-cover-2026-07.png`;

function upsertMeta(selector, attribute, value, content) {
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function upsertCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
}

export function applySeo({
  title,
  description,
  path = "/",
  ogTitle = title,
  ogDescription = description,
  robots = "index, follow",
}) {
  const url = path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;

  document.title = title;

  upsertMeta('meta[name="description"]', "name", "description", description);
  upsertMeta('meta[name="author"]', "name", "author", "Matthias Schaefle");
  upsertMeta('meta[name="robots"]', "name", "robots", robots);

  upsertMeta('meta[property="og:title"]', "property", "og:title", ogTitle);
  upsertMeta(
    'meta[property="og:description"]',
    "property",
    "og:description",
    ogDescription,
  );
  upsertMeta('meta[property="og:type"]', "property", "og:type", "website");
  upsertMeta('meta[property="og:locale"]', "property", "og:locale", "en_US");
  upsertMeta(
    'meta[property="og:site_name"]',
    "property",
    "og:site_name",
    "Matthias Schaefle",
  );
  upsertMeta('meta[property="og:url"]', "property", "og:url", url);
  upsertMeta('meta[property="og:image"]', "property", "og:image", DEFAULT_IMAGE);
  upsertMeta('meta[property="og:image:width"]', "property", "og:image:width", "1200");
  upsertMeta('meta[property="og:image:height"]', "property", "og:image:height", "630");
  upsertMeta(
    'meta[property="og:image:alt"]',
    "property",
    "og:image:alt",
    "Matthias Schaefle UX/UI design portfolio",
  );

  upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
  upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", ogTitle);
  upsertMeta(
    'meta[name="twitter:description"]',
    "name",
    "twitter:description",
    ogDescription,
  );
  upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", DEFAULT_IMAGE);
  upsertMeta(
    'meta[name="twitter:image:alt"]',
    "name",
    "twitter:image:alt",
    "Matthias Schaefle UX/UI design portfolio",
  );

  upsertCanonical(url);
}
