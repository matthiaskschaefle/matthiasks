import { createContext, useContext } from "react";

export const LightboxContext = createContext(null);

/**
 * useLightbox() → { open, close, isOpen }
 * open({ src, alt, caption? }) — alt is required and reused as the dialog
 * label fallback; caption (string) is shown under the image when present.
 */
export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) {
    throw new Error(
      "useLightbox must be used inside <LightboxProvider>. Mount it once around the routed pages (inside MotionConfig, in src/App.jsx)."
    );
  }
  return ctx;
}
