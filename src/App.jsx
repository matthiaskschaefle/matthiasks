import { useEffect } from "react";
import {
  createBrowserRouter,
  isRouteErrorResponse,
  Link,
  Outlet,
  RouterProvider,
  ScrollRestoration,
  useLocation,
  useRouteError,
} from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { LightboxProvider } from "./components/mockups/Lightbox.jsx";
import SiteHeader from "./components/SiteHeader.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import { findRoute, ROUTES } from "@/lib/routes";
import { applySeo } from "@/lib/seo";
import { isStaleChunkError, reloadOnceForNewDeploy } from "@/lib/staleDeploy";

// One chunk per page. The router loads it before the navigation commits, so
// the old page stays on screen until the new one can render (no blank frame),
// and ScrollRestoration measures the real page.
const PAGES = {
  home: () => import("./Home.jsx"),
  about: () => import("./About.jsx"),
  resume: () => import("./Resume.jsx"),
  delivery: () => import("./Delivery.jsx"),
  doctor: () => import("./Doctor.jsx"),
  duopet: () => import("./DuoPet.jsx"),
  legal: () => import("./Legal.jsx"),
};

const centeredLayout = {
  minHeight: "70vh",
  display: "grid",
  placeItems: "center",
  textAlign: "center",
  padding: "140px 24px 96px",
};

const eyebrowStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--ink-600)",
  margin: 0,
};

const headingStyle = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(34px, 6vw, 56px)",
  color: "var(--ink-900)",
  margin: "12px 0",
};

const leadStyle = {
  color: "var(--ink-600)",
  maxWidth: "46ch",
  margin: "0 auto 24px",
};

function Message({ eyebrow, title, lead, action }) {
  return (
    <main id="main" style={centeredLayout}>
      <div>
        <p style={eyebrowStyle}>{eyebrow}</p>
        <h1 style={headingStyle}>{title}</h1>
        <p style={leadStyle}>{lead}</p>
        {action}
      </div>
    </main>
  );
}

function RouteFallback() {
  return (
    <div className="route-fallback" role="status">
      <span className="ms-visually-hidden">Loading</span>
    </div>
  );
}

function NotFound() {
  return (
    <Message
      eyebrow="404"
      title="Page not found."
      lead="The page you are looking for does not exist or has moved."
      action={
        <Link to="/" className="btn btn--secondary btn--md">
          Back to home
        </Link>
      }
    />
  );
}

function RouteError() {
  const error = useRouteError();
  const staleChunk = isStaleChunkError(error);

  useEffect(() => {
    // A tab opened before the last deploy asks for page chunks that no longer
    // exist. Reloading once picks up the new build; the guard stops a loop.
    if (staleChunk) reloadOnceForNewDeploy();
    else console.error(error);
  }, [error, staleChunk]);

  if (isRouteErrorResponse(error) && error.status === 404) return <NotFound />;

  return (
    <>
      <SiteHeader />
      <Message
        eyebrow="Error"
        title="Something went wrong."
        lead="This page failed to load. Please try again."
        action={
          <button
            type="button"
            className="btn btn--secondary btn--md"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        }
      />
      <SiteFooter />
    </>
  );
}

function RootLayout() {
  const { pathname } = useLocation();
  const route = findRoute(pathname);

  useEffect(() => {
    applySeo(pathname);
  }, [pathname]);

  return (
    <>
      {/* New pages open at the top; Back and Forward return to where the reader was. */}
      <ScrollRestoration />
      <SiteHeader />
      <Outlet />
      <SiteFooter tagline={route?.footerTagline} />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteError />,
    HydrateFallback: RouteFallback,
    children: [
      ...ROUTES.map(({ path, page }) => ({
        path,
        lazy: async () => ({ Component: (await PAGES[page]()).default }),
      })),
      { path: "*", Component: NotFound },
    ],
  },
]);

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LightboxProvider>
        <RouterProvider router={router} />
      </LightboxProvider>
    </MotionConfig>
  );
}
