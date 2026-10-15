import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

export const read = (path) => readFileSync(join(ROOT, path), "utf8").replace(/\r\n/g, "\n");

const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "coverage", ".vite"]);

/** Repo-relative paths of files under `dir` whose name matches `pattern`. */
export function listFiles(dir, pattern = /./) {
  const base = join(ROOT, dir);
  const out = [];
  const walk = (current) => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) walk(join(current, entry.name));
      } else if (pattern.test(entry.name)) {
        out.push(relative(ROOT, join(current, entry.name)).split("\\").join("/"));
      }
    }
  };
  walk(base);
  return out;
}

// Client names under NDA, stored as SHA-256 of the lowercase word so this
// public file does not itself publish them. Add a name with:
//   node -e "console.log(require('crypto').createHash('sha256').update('name').digest('hex'))"
const NDA_WORD_HASHES = new Set([
  "ede06ced4b34afcf2bc3d2c54a7e0813febcc950b789fa45d29f62702dc6a878",
]);

const sha256 = (word) => createHash("sha256").update(word).digest("hex");

export function findNdaWords(text) {
  const words = text.toLowerCase().match(/\p{L}+/gu) ?? [];
  return [...new Set(words)].filter((word) => NDA_WORD_HASHES.has(sha256(word)));
}
