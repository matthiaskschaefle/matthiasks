// public/.htaccess is the production server config. Apache cannot import
// JavaScript, so this test keeps it equal to scripts/security-headers.js,
// which `vite preview` uses.
import { test } from "node:test";
import assert from "node:assert/strict";
import { SECURITY_HEADERS } from "../scripts/security-headers.js";
import { read } from "./helpers.js";

const htaccess = read("public/.htaccess");

test("every security header is set in .htaccess with the same value", () => {
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    assert.ok(
      htaccess.includes(`Header always set ${name} "${value}"`),
      `.htaccess is missing or differs on ${name}`,
    );
  }
});

test("the CSP allows scripts from this origin only", () => {
  const csp = SECURITY_HEADERS["Content-Security-Policy"];
  assert.match(csp, /(^|; )script-src 'self'(;|$)/);
  assert.match(csp, /(^|; )object-src 'none'(;|$)/);
  assert.match(csp, /(^|; )frame-ancestors 'self'(;|$)/);
  assert.doesNotMatch(csp, /unsafe-eval|https?:|\*/);
});

test("unknown paths get a real 404, not the app shell with status 200", () => {
  assert.match(htaccess, /^ErrorDocument 404 \/404\.html$/m);
  assert.doesNotMatch(htaccess, /RewriteRule \. \/index\.html/);
});

test("dotfiles are blocked and HTML is never cached", () => {
  assert.match(htaccess, /RewriteRule \(\^\|\/\)\\\. - \[F,L\]/);
  assert.match(
    htaccess,
    /<FilesMatch "\\\.html\$">\s+Header set Cache-Control "no-cache, must-revalidate"/,
  );
});
