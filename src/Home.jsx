import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { DURATION, EASE, STAGGER } from "@/lib/animations";
import TypedSectionLabel from "./components/TypedSectionLabel.jsx";
import { POSITIONING } from "./lib/positioning.js";
import PlayOnceVideo from "./components/PlayOnceVideo.jsx";
import homeCss from "./styles/home.css?inline";

const MotionLink = motion.create(Link);

/*
 * Editorial work index: no cards, no borders. Each project is a media
 * stage plus a typographic row. The featured project takes the full
 * column; the other two share a two-up grid.
 */
const WORK = [
  {
    href: "/delivery",
    context: "Paid client work, product redesign, field research, 2025",
    title: "The New Delivery Experience",
    description:
      "Drivers retyped data the system already had, and the app had no option for how packages actually changed hands.",
    result: "7 to 8s faster per stop, 2 fewer taps, 92% to 98% record compliance",
    imageSrc: "/assets/portfolio/2026/03/Mockup-Hero-scaled.png",
    imageAlt:
      "Clip from the Delivery case film: the confirmation form arriving already filled from route data",
    video: {
      sources: [
        { src: "/media/delivery-short.webm", type: "video/webm" },
        { src: "/media/delivery-short.mp4", type: "video/mp4" },
      ],
      poster: "/media/delivery-poster.jpg",
      endFrame: "/media/delivery-endframe.jpg",
    },
    featured: true,
  },
  {
    href: "/doctor",
    context: "Paid client work, research, UI design, 2024",
    title: "The questions patients asked before booking",
    description: "Patients could not find procedures, prices, or insurance before booking.",
    result: "Logo and palette still in use",
    imageSrc: "/assets/portfolio/2025/11/mockup-helio.png",
    imageAlt: "The redesigned Dr. Hélio homepage on desktop and mobile",
  },
  {
    href: "/duopet",
    context: "Educational project, UX/UI, 2023",
    title: "DuoPet",
    description: "Course prototype for booking vet visits without waiting on WhatsApp.",
    result: "164 survey responses, 2 usability-testing rounds",
    imageSrc: "/assets/portfolio/2024/05/iPhone-12-Pro.png",
    imageAlt: "DuoPet prototype mockup",
  },
];

function canPlayVp9Webm() {
  if (typeof document === "undefined") return true;
  const probe = document.createElement("video");
  return Boolean(probe.canPlayType('video/webm; codecs="vp9"'));
}

/*
 * Animated hero character: five-second square loop with a real alpha
 * channel (VP9 WebM). Browsers without VP9 alpha get the same loop as
 * an animated WebP. Static transparent poster under reduced motion.
 * The circular crop is only the seal viewport; it is not the key.
 */
function HeroVideo() {
  const shouldReduceMotion = useReducedMotion();
  const [useWebm, setUseWebm] = useState(canPlayVp9Webm);

  if (shouldReduceMotion) {
    return (
      <img
        className="hero-video"
        src="/assets/hero-poses/hero-home-poster-2026.webp"
        alt="Illustration of Matthias typing on a laptop"
      />
    );
  }

  if (!useWebm) {
    return (
      <img
        className="hero-video"
        src="/assets/hero-poses/hero-home-loop-2026.webp"
        alt="Animated illustration of Matthias typing on a laptop"
      />
    );
  }

  return (
    <video
      className="hero-video"
      poster="/assets/hero-poses/hero-home-poster-2026.webp"
      autoPlay
      muted
      loop
      playsInline
      aria-label="Animated illustration of Matthias typing on a laptop"
      onError={() => setUseWebm(false)}
    >
      <source src="/assets/hero-poses/hero-home-loop-2026.webm" type="video/webm" />
    </video>
  );
}

function TitleArrow() {
  return (
    <span className="work-arrow" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </span>
  );
}

function wrapProductDesign(text) {
  const marker = "Product Design";
  const index = text.indexOf(marker);
  if (index < 0) return text;
  return (
    <>
      {text.slice(0, index)}
      <span className="hero-nowrap">{marker}</span>
      {text.slice(index + marker.length)}
    </>
  );
}

function WorkTitle({ title }) {
  const words = title.split(" ");
  const last = words.pop();
  return (
    <h2 className="work-title">
      {words.length > 0 ? `${words.join(" ")} ` : null}
      <span className="work-title-end">
        {last}
        <TitleArrow />
      </span>
    </h2>
  );
}

function WorkContext({ context }) {
  return <span className="work-context">{context}</span>;
}

function WorkItem({
  href,
  context,
  title,
  description,
  result,
  imageSrc,
  imageAlt,
  video,
  featured,
  order = 0,
}) {
  const shouldReduceMotion = useReducedMotion();
  const itemInitial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 };
  const itemVisible = shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <MotionLink
      to={href}
      className={featured ? "work-item work-item--featured" : "work-item"}
      initial={itemInitial}
      whileInView={itemVisible}
      viewport={{ once: true, amount: "some" }}
      transition={{
        duration: DURATION.slow,
        ease: EASE.out,
        delay: shouldReduceMotion ? 0 : order * STAGGER.base,
      }}
    >
      <div className="work-media">
        <div className="work-media-motion">
          {video ? (
            <PlayOnceVideo
              className="work-media-video"
              sources={video.sources}
              poster={video.poster}
              endFrame={video.endFrame}
              alt={imageAlt}
            />
          ) : (
            <img
              src={imageSrc}
              alt={imageAlt}
              loading={featured ? "eager" : "lazy"}
              decoding="async"
            />
          )}
        </div>
      </div>
      <div className="work-row">
        <div className="work-info">
          <WorkContext context={context} />
        </div>
        <div className="work-main">
          <WorkTitle title={title} />
          <p className="work-desc">{description}</p>
          {result ? <p className="work-result">{result}</p> : null}
        </div>
      </div>
    </MotionLink>
  );
}

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <style>{homeCss}</style>

      <main id="main" className="page home-page">
        <div className="page-inner">
          {/* HERO */}
          <section className="hero">
            <div className="hero-visual">
              <div className="hero-badge-ring" aria-hidden="true">
                <svg viewBox="0 0 238 238" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <path
                      id="badge-circle"
                      d="M 119,119 m 0,-92 a 92,92 0 1,1 0,184 a 92,92 0 1,1 0,-184"
                      fill="none"
                    />
                  </defs>
                  <text
                    fontFamily="'JetBrains Mono', ui-monospace, monospace"
                    fontSize="10"
                    fontWeight="500"
                    fill="#1A1815"
                    letterSpacing="0.16em"
                  >
                    <textPath
                      href="#badge-circle"
                      startOffset="0"
                      textLength="578"
                      lengthAdjust="spacing"
                    >
                      MATTHIAS SCHAEFLE / UX/UI DESIGNER IN BERLIN / RESEARCH / INTERFACE DESIGN /
                      PROTOTYPING / DESIGN SYSTEMS /
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="hero-peeps">
                <HeroVideo />
              </div>
            </div>

            <div className="hero-content">
              <h1 className="hero-title">Matthias Schaefle</h1>
              <p className="hero-role">{POSITIONING.roleShort}</p>
              <div className="hero-copy">
                <p className="hero-subtitle">{POSITIONING.heroLine}</p>
                <p className="hero-subtitle">{wrapProductDesign(POSITIONING.heroMethod)}</p>
              </div>
            </div>
          </section>

          {/* WORK INDEX */}
          <section className="work" aria-label="Selected work">
            <div className="section-header">
              <TypedSectionLabel
                className="section-label"
                prefersReducedMotion={shouldReduceMotion}
                standalone
              >
                Selected work
              </TypedSectionLabel>
              <span className="section-line" />
            </div>

            <WorkItem {...WORK[0]} order={0} />

            <div className="work-pair">
              <WorkItem {...WORK[1]} order={0} />
              <WorkItem {...WORK[2]} order={1} />
            </div>
          </section>

          {/* TOOLS */}
          <section className="tools-strip" aria-labelledby="build-heading">
            <div className="section-header">
              <TypedSectionLabel
                id="build-heading"
                className="section-label"
                prefersReducedMotion={shouldReduceMotion}
                standalone
              >
                Build
              </TypedSectionLabel>
              <span className="section-line" />
            </div>
            <p className="tools-intro">
              Software I use to design and prototype, including AI assistants in that workflow.
            </p>
            <p className="tools-group-label" id="build-process-label">
              Design and code
            </p>
            <ul className="tools-row" aria-labelledby="build-process-label">
              <li className="tool-item">
                <img className="tool-icon tool-icon--figma" src="/assets/icons/figma.svg" alt="" />
                <span className="tool-name">Figma</span>
              </li>
              <li className="tool-item">
                <img className="tool-icon" src="/assets/icons/react.svg" alt="" />
                <span className="tool-name">React</span>
              </li>
              <li className="tool-item">
                <img className="tool-icon" src="/assets/icons/vite.svg" alt="" />
                <span className="tool-name">Vite</span>
              </li>
              <li className="tool-item">
                <img className="tool-icon" src="/assets/icons/framer.svg" alt="" />
                <span className="tool-name">Framer Motion</span>
              </li>
              <li className="tool-item">
                <img className="tool-icon" src="/assets/icons/html5.svg" alt="" />
                <span className="tool-name">HTML</span>
              </li>
              <li className="tool-item">
                <img className="tool-icon" src="/assets/icons/css3.svg" alt="" />
                <span className="tool-name">CSS</span>
              </li>
              <li className="tool-item">
                <img className="tool-icon" src="/assets/icons/javascript.svg" alt="" />
                <span className="tool-name">JavaScript</span>
              </li>
              <li className="tool-item">
                <img className="tool-icon" src="/assets/icons/git.svg" alt="" />
                <span className="tool-name">Git</span>
              </li>
            </ul>
            <p className="tools-group-label" id="build-ai-label">
              AI assistants in the workflow
            </p>
            <ul className="tools-row" aria-labelledby="build-ai-label">
              <li className="tool-item">
                <img className="tool-icon" src="/assets/icons/cursor.svg" alt="" />
                <span className="tool-name">Cursor</span>
              </li>
              <li className="tool-item">
                <img className="tool-icon" src="/assets/icons/openai.svg" alt="" />
                <span className="tool-name">Codex</span>
              </li>
              <li className="tool-item">
                <img className="tool-icon" src="/assets/icons/claude.svg" alt="" />
                <span className="tool-name">Claude</span>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
