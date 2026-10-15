// The single list of pages. Three consumers read it:
//  - src/App.jsx builds the router from it (each `page` maps to a lazy module)
//  - src/lib/seo.js sets <title>, description, Open Graph and canonical on navigation
//  - vite.config.js writes one HTML file per route at build time, so link
//    previews (LinkedIn, Slack, WhatsApp) see the right title without running JS,
//    and generates sitemap.xml
// Plain data only: this file is imported by Node at build time.
import { POSITIONING } from "./positioning.js";

export const SITE_ORIGIN = "https://matthiasks.com";
export const SITE_NAME = "Matthias Schaefle";
export const DEFAULT_IMAGE = {
  url: `${SITE_ORIGIN}/assets/portfolio/og-cover-2026-07.png`,
  width: 1200,
  height: 630,
  alt: "Matthias Schaefle UX/UI design portfolio",
};

const legal = {
  title: "Impressum and Privacy | Matthias Schaefle",
  description:
    "Legal notice under §5 DDG and privacy information for matthiasks.com. The site sets no cookies, uses no analytics and loads no third-party resources.",
  ogTitle: "Impressum and Privacy",
  ogDescription: "Legal notice and privacy information for matthiasks.com.",
  footerTagline: "Legal notice and privacy.",
};

/**
 * @typedef {object} Route
 * @property {string} path      URL path, also the router path
 * @property {string} page      key of the page module in App.jsx
 * @property {string} title
 * @property {string} description
 * @property {string} [ogTitle]        defaults to title
 * @property {string} [ogDescription]  defaults to description
 * @property {string} [canonical]      path of the canonical URL, defaults to path
 * @property {boolean} [inSitemap]     defaults to true
 * @property {string} [footerTagline]  footer middle line, defaults to the general one
 */

/** @type {Route[]} */
export const ROUTES = [
  {
    path: "/",
    page: "home",
    title: POSITIONING.seoTitle,
    description: POSITIONING.seoDescription,
    ogDescription: POSITIONING.ogDescription,
  },
  {
    path: "/about",
    page: "about",
    title: "About Matthias Schaefle | UX/UI Designer in Berlin",
    description:
      "About Matthias Schaefle, a Brazilian-German UX/UI Designer in Berlin focused on user research, interface design, and prototyping.",
    ogDescription: "A research-driven UX/UI Designer in Berlin with a Brazilian-German background.",
  },
  {
    path: "/resume",
    page: "resume",
    title: "Resume | Matthias Schaefle | UX/UI Designer in Berlin",
    description:
      "Resume of Matthias Schaefle, UX/UI Designer based in Berlin. Research-led product design and prototyping in React and Vite.",
    ogTitle: "Resume | Matthias Schaefle",
    ogDescription:
      "UX/UI Designer in Berlin. Research-led product design and technical prototyping.",
  },
  {
    path: "/delivery",
    page: "delivery",
    title: "Delivery App Redesign | UX Case Study | Matthias Schaefle",
    description:
      "UX case study of a delivery confirmation redesign for last-mile drivers: 7 to 8 seconds faster per stop, two fewer taps, and record compliance from 92% to 98%.",
    ogTitle: "Delivery App Redesign | UX Case Study",
    ogDescription:
      "A faster delivery confirmation flow, designed from field research with last-mile drivers.",
    footerTagline: "Thanks for visiting. Research, interface design, and prototyping.",
  },
  {
    path: "/doctor",
    page: "doctor",
    title: "Healthcare Website UX Case Study | Matthias Schaefle",
    description:
      "Paid 2024 client project for plastic surgeon Dr. Hélio Alves: patient research, information architecture, UI, WordPress delivery, and a visual identity still in use.",
    ogTitle: "The questions patients asked before booking",
    ogDescription:
      "A paid 2024 website project for a Sao Paulo plastic surgeon, built around the questions patients asked before booking.",
    footerTagline: "Thanks for visiting. Research, interface design, and prototyping.",
  },
  {
    path: "/duopet",
    page: "duopet",
    title: "DuoPet Vet Booking | Educational UX Case Study | Matthias Schaefle",
    description:
      "Educational 2023 UX course project with Leticia Magri: a veterinary booking prototype based on a survey of 164 pet owners, five interviews, and two usability rounds.",
    ogTitle: "DuoPet: educational veterinary booking prototype",
    ogDescription:
      "A 2023 UX course prototype for booking vet appointments. Not a launched product.",
    footerTagline: "Thanks for visiting. Research, interface design, and prototyping.",
  },
  { path: "/legal", page: "legal", ...legal, inSitemap: false },
  // A German recruiter searches for "Impressum", not "legal". Same page, one canonical URL.
  { path: "/impressum", page: "legal", ...legal, canonical: "/legal", inSitemap: false },
];

export const NOT_FOUND = {
  title: "Page Not Found | Matthias Schaefle",
  description: "The requested page could not be found.",
  robots: "noindex, follow",
};

/** Normalizes "/about/" to "/about" so lookups match the router. */
export function normalizePath(pathname) {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

/** @returns {Route | undefined} */
export function findRoute(pathname) {
  const path = normalizePath(pathname);
  return ROUTES.find((route) => route.path === path);
}

/** The file a route is written to at build time: "/" -> index.html, "/about" -> about.html. */
export function routeFileName(route) {
  return route.path === "/" ? "index.html" : `${route.path.slice(1)}.html`;
}
