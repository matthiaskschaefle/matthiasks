// Regenerates src/lib/imageManifest.json: the intrinsic width and height of
// every raster image the source references by a literal /assets/... path.
// Components read it so each <img> reserves its box before the file loads
// (no layout shift), without hand-typed sizes that drift from the files.
//
//   node scripts/image-manifest.mjs           rewrite the manifest
//   node scripts/image-manifest.mjs --check   fail if it is out of date (CI)
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { imageSize } from "./lib/image-size.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(root, "src/lib/imageManifest.json");
const RASTER_PATH = /\/assets\/[\w./-]+\.(?:png|jpe?g|webp|gif)/g;

function sourceFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.(jsx?|css)$/.test(entry.name) ? [path] : [];
  });
}

export function buildManifest() {
  const paths = new Set();
  for (const file of sourceFiles(join(root, "src"))) {
    for (const match of readFileSync(file, "utf8").matchAll(RASTER_PATH)) paths.add(match[0]);
  }
  const manifest = {};
  const problems = [];
  for (const path of [...paths].sort()) {
    let size = null;
    try {
      size = imageSize(readFileSync(join(root, "public", path)));
    } catch {
      problems.push(`${path}: referenced in src/ but missing from public/`);
      continue;
    }
    if (!size) problems.push(`${path}: unreadable image header`);
    else manifest[path] = size;
  }
  return { manifest, problems };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const { manifest, problems } = buildManifest();
  if (problems.length) {
    console.error(problems.join("\n"));
    process.exit(1);
  }
  const next = JSON.stringify(manifest, null, 2) + "\n";
  const target = relative(root, manifestPath);
  if (process.argv.includes("--check")) {
    const current = readFileSync(manifestPath, "utf8").replace(/\r\n/g, "\n");
    if (current !== next) {
      console.error(`${target} is out of date. Run: node scripts/image-manifest.mjs`);
      process.exit(1);
    }
    console.log(`${target} is up to date (${Object.keys(manifest).length} images).`);
  } else {
    writeFileSync(manifestPath, next);
    console.log(`Wrote ${target} (${Object.keys(manifest).length} images).`);
  }
}
