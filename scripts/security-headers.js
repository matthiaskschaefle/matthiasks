// HTTP security headers, defined once.
// Production sends them from public/.htaccess (Apache); `vite preview` sends
// the same set so local checks run under the real policy. tests/htaccess.test.js
// fails if the two drift apart.
//
// The Content Security Policy allows only this origin. Everything the site
// loads (scripts, styles, fonts, images, video, captions) is self-hosted.
// style-src needs 'unsafe-inline' because page stylesheets are mounted as
// <style> elements while the page is open; scripts get no such exception.
export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

export const SECURITY_HEADERS = {
  "Content-Security-Policy": CONTENT_SECURITY_POLICY,
  "Cross-Origin-Opener-Policy": "same-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  "Strict-Transport-Security": "max-age=31536000",
};
