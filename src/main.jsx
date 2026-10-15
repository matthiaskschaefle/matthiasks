import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./components/mockups/mockups.css";
import App from "./App.jsx";
import { reloadOnceForNewDeploy } from "@/lib/staleDeploy";

// Vite fires this when a chunk's preload fails, typically after a deploy.
// If the reload is skipped (guard), the error reaches the route error page.
window.addEventListener("vite:preloadError", (event) => {
  if (reloadOnceForNewDeploy()) event.preventDefault();
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
