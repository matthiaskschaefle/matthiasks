// Guards on what the repository publishes.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { buildManifest } from "../scripts/image-manifest.mjs";
import { findNdaWords, listFiles, read, ROOT } from "./helpers.js";

const TEXT_FILE = /\.(jsx?|mjs|css|html|json|md|txt|vtt|xml|svg)$|^\.htaccess$/;

/** Files that ship or document the site: everything tracked outside dependencies. */
const publishedTextFiles = () =>
  [
    ...listFiles("src", TEXT_FILE),
    ...listFiles("public", TEXT_FILE),
    ...listFiles("branding", TEXT_FILE).filter((file) => !file.endsWith("package-lock.json")),
    ...listFiles("scripts", TEXT_FILE),
    "index.html",
    "README.md",
  ].filter((file) => existsSync(join(ROOT, file)));

test("no NDA client name appears in source, assets or docs", () => {
  const leaks = publishedTextFiles().filter((file) => findNdaWords(read(file)).length > 0);
  assert.deepEqual(leaks, []);
});

test("copy uses no en dash or em dash (house style)", () => {
  const dashes = new RegExp("[\\u2013\\u2014]");
  const offenders = [...listFiles("src", TEXT_FILE), "index.html"].filter((file) =>
    dashes.test(read(file)),
  );
  assert.deepEqual(offenders, []);
});

test("the image manifest matches the files and every referenced image exists", () => {
  const { manifest, problems } = buildManifest();
  assert.deepEqual(problems, []);
  assert.deepEqual(JSON.parse(read("src/lib/imageManifest.json")), manifest);
});

test("every literal /assets or /media path in the source exists in public/", () => {
  const missing = new Set();
  // A public URL starts right after a quote, backtick or "url(": this skips
  // relative module imports such as "../assets/logo-mks.svg".
  const publicUrl = /(?<=["'`(])\/(?:assets|media)\/[\w./-]+\.\w{2,5}/g;
  for (const file of listFiles("src", /\.(jsx?|css)$/)) {
    for (const [path] of read(file).matchAll(publicUrl)) {
      if (!existsSync(join(ROOT, "public", path))) missing.add(`${file}: ${path}`);
    }
  }
  assert.deepEqual([...missing], []);
});
