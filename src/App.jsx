import { Component, lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { LightboxProvider } from "./components/mockups/Lightbox.jsx";
import { applySeo } from "@/lib/seo";

const Home = lazy(() => import("./Home.jsx"));
const Entregas = lazy(() => import("./Entregas.jsx"));
const DuoPet = lazy(() => import("./DuoPet.jsx"));
const Doctor = lazy(() => import("./Doctor.jsx"));
const About = lazy(() => import("./About.jsx"));
const Resume = lazy(() => import("./Resume.jsx"));

const centeredLayout = {
  minHeight: "70vh",
  display: "grid",
  placeItems: "center",
  textAlign: "center",
  padding: "24px",
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

function RouteFallback() {
  return (
    <div className="route-fallback" role="status">
      <span
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
        }}
      >
        Loading
      </span>
    </div>
  );
}

function NotFound() {
  useEffect(() => {
    applySeo({
      title: "Page Not Found | Matthias Schaefle",
      description: "The requested page could not be found.",
      path: window.location.pathname,
      robots: "noindex, follow",
    });
  }, []);

  return (
    <main style={centeredLayout}>
      <div>
        <p style={eyebrowStyle}>404</p>
        <h1 style={headingStyle}>Page not found.</h1>
        <p style={leadStyle}>
          The page you are looking for does not exist or has moved.
        </p>
        <Link to="/" className="btn btn--secondary btn--md">
          Back to home
        </Link>
      </div>
    </main>
  );
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={centeredLayout}>
          <div>
            <p style={eyebrowStyle}>Error</p>
            <h1 style={headingStyle}>Something went wrong.</h1>
            <p style={leadStyle}>
              This page failed to load. Please try again.
            </p>
            <button
              type="button"
              className="btn btn--secondary btn--md"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LightboxProvider>
        <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/delivery" element={<Entregas />} />
              <Route path="/duopet" element={<DuoPet />} />
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/about" element={<About />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        </BrowserRouter>
      </LightboxProvider>
    </MotionConfig>
  );
}
