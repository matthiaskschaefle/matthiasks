// End-to-end smoke test of the production build in a real browser.
// Serves dist/ with `vite preview` (same security headers as production) and
// checks every route for: a clean console, no CSP violation, the right title,
// one <h1>, and that in-app navigation opens pages at the top while Back
// restores the previous position.
//
//   npm run build && node scripts/smoke.mjs
//
// Browser: CHROME_PATH if set, else Chrome, else Microsoft Edge.
import { existsSync } from "node:fs";
import { preview } from "vite";
import { chromium } from "playwright-core";
import { NOT_FOUND, ROUTES } from "../src/lib/routes.js";

const CANDIDATES = [
  process.env.CHROME_PATH,
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean);

const executablePath = CANDIDATES.find((path) => existsSync(path));
if (!executablePath) throw new Error("No Chrome or Edge found. Set CHROME_PATH.");

const failures = [];
const check = (ok, message) => {
  if (!ok) failures.push(message);
};

const server = await preview({ preview: { port: 0, strictPort: false }, logLevel: "error" });
const base = server.resolvedUrls.local[0].replace(/\/$/, "");
const browser = await chromium.launch({ executablePath, headless: true });

async function openPage(width) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const problems = [];
  page.on("pageerror", (error) => problems.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") problems.push(`console: ${message.text()}`);
  });
  // The CSP reports violations as DOM events; collect them in the page.
  await page.addInitScript(() => {
    window.__cspViolations = [];
    document.addEventListener("securitypolicyviolation", (event) => {
      window.__cspViolations.push(`${event.violatedDirective} ${event.blockedURI}`);
    });
  });
  return { page, problems };
}

try {
  for (const width of [1440, 390]) {
    for (const route of [...ROUTES, { path: "/does-not-exist", ...NOT_FOUND }]) {
      const { page, problems } = await openPage(width);
      const label = `${route.path} @${width}`;
      await page.goto(base + route.path, { waitUntil: "load" });
      await page
        .waitForFunction((title) => document.title === title, route.title, {
          timeout: 10_000,
        })
        .catch(() => {});
      // Scroll the whole page so lazy images, videos and in-view animations run.
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 40));
        }
      });
      await page.waitForTimeout(300);

      check((await page.title()) === route.title, `${label}: title "${await page.title()}"`);
      check((await page.locator("h1").count()) === 1, `${label}: expected exactly one <h1>`);
      const violations = await page.evaluate(() => window.__cspViolations);
      check(violations.length === 0, `${label}: CSP violations ${violations.join(", ")}`);
      check(problems.length === 0, `${label}: ${problems.join(" | ")}`);
      await page.close();
    }
  }

  // Navigation: a case opened from a scrolled Home starts at the top, and
  // Back returns to where the reader was.
  const { page, problems } = await openPage(1440);
  await page.goto(base + "/", { waitUntil: "load" });
  const link = page.locator('main a[href="/delivery"]').first();
  await link.scrollIntoViewIfNeeded();
  const homeY = await page.evaluate(() => window.scrollY);
  await link.click();
  await page.waitForURL("**/delivery");
  await page.waitForTimeout(500);
  check(
    (await page.evaluate(() => window.scrollY)) === 0,
    "navigation: case did not open at the top",
  );
  await page.goBack();
  await page.waitForURL(base + "/");
  await page.waitForTimeout(500);
  const backY = await page.evaluate(() => window.scrollY);
  check(Math.abs(backY - homeY) <= 2, `navigation: Back restored ${backY}, expected ${homeY}`);
  check(problems.length === 0, `navigation: ${problems.join(" | ")}`);

  // Security headers reach the browser.
  const response = await page.goto(base + "/about");
  const csp = response.headers()["content-security-policy"] ?? "";
  check(csp.includes("script-src 'self'"), "headers: CSP missing on preview responses");
} finally {
  await browser.close();
  await new Promise((resolve) => server.httpServer.close(resolve));
}

if (failures.length) {
  console.error(`Smoke test failed (${failures.length}):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log(`Smoke test passed: ${ROUTES.length + 1} routes x 2 widths, navigation and headers.`);
