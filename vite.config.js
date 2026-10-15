import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import routeHtml from "./scripts/vite-plugin-route-html.js";
import { SECURITY_HEADERS } from "./scripts/security-headers.js";

export default defineConfig({
  plugins: [react(), routeHtml()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // Same headers as production, so a local preview fails the same way a CSP
  // violation would fail live. The dev server is left without them: its hot
  // reload injects inline scripts.
  preview: {
    headers: SECURITY_HEADERS,
  },
  build: {
    rollupOptions: {
      output: {
        // React, the router and framer-motion change rarely; keeping them in
        // one chunk lets returning visitors reuse it across deploys. Pages are
        // split automatically by their dynamic imports in App.jsx.
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
});
