// Every deploy replaces the hashed JS and CSS files. A tab opened before the
// deploy still references the old names, so its next page load fails with a
// chunk error. Reloading fetches the new index.html and fixes it. The
// timestamp guard allows one reload per 30 seconds, so a real outage cannot
// turn into a reload loop.
const GUARD_KEY = "matthiasks:stale-deploy-reload";
const GUARD_MS = 30_000;

const STALE_CHUNK_MESSAGE =
  /dynamically imported module|Importing a module script failed|error loading dynamically imported module|Unable to preload CSS/i;

export function isStaleChunkError(error) {
  return STALE_CHUNK_MESSAGE.test(String(error?.message ?? error ?? ""));
}

/** Reloads the page unless it already did so in the last 30 seconds. */
export function reloadOnceForNewDeploy() {
  try {
    const last = Number(sessionStorage.getItem(GUARD_KEY));
    if (last && Date.now() - last < GUARD_MS) return false;
    sessionStorage.setItem(GUARD_KEY, String(Date.now()));
  } catch {
    // Storage blocked (private mode, strict settings): never risk a loop.
    return false;
  }
  window.location.reload();
  return true;
}
