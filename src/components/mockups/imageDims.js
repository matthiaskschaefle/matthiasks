import imageManifest from "@/lib/imageManifest.json";

// Dev-only registry so a missing manifest key warns once per src, not per render.
const warnedMissing = new Set();

/**
 * Real intrinsic dimensions for an asset, keyed by its exact `src`.
 * Graceful fallback: returns null (render without width/height) and warns in
 * dev when the manifest has no entry: never fabricates placeholder dims.
 */
export function getImageDims(src, consumer = "MockupSystem") {
  const dims = imageManifest[src];
  if (!dims && import.meta.env.DEV && !warnedMissing.has(src)) {
    warnedMissing.add(src);
    console.warn(
      `[${consumer}] No imageManifest entry for "${src}". Rendering without width/height. Regenerate src/lib/imageManifest.json to fix.`
    );
  }
  return dims ?? null;
}
