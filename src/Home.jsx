import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { DURATION, EASE, STAGGER } from "@/lib/animations";
import { applySeo } from "@/lib/seo";
import SiteHeader from "./components/SiteHeader.jsx";
import TypedSectionLabel from "./components/TypedSectionLabel.jsx";
import { POSITIONING } from "./lib/positioning.js";
import SiteFooter from "./components/SiteFooter.jsx";
import PlayOnceVideo from "./components/PlayOnceVideo.jsx";

const MotionLink = motion.create(Link);

/*
 * Editorial work index: no cards, no borders. Each project is a media
 * stage plus a typographic row. The featured project takes the full
 * column; the other two share a two-up grid.
 */
const WORK = [
  {
    href: "/delivery",
    index: "01",
    context: "Paid client work · Product redesign · Field research · 2025",
    title: "The New Delivery Experience",
    description: "Customers were disputing deliveries they had paid for, and the records could not settle it. Two days in the field found what no survey would.",
    result: "7 to 8s faster per stop, 92%→98% record compliance",
    imageSrc: "/assets/portfolio/2026/03/Mockup-Hero-scaled.png",
    imageAlt: "Clip from the Delivery case film: the confirmation form arriving already filled from route data",
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
    index: "02",
    context: "Paid client work · Research · UI design · 2024",
    title: "The questions patients asked before booking",
    description: "A plastic surgeon's site rebuilt around what patients actually wanted to know. Research, IA, UI, and the brand it runs on.",
    result: "Logo and palette still in use, two years on.",
    imageSrc: "/assets/portfolio/2025/11/mockup-helio.png",
    imageAlt: "The redesigned Dr. Hélio homepage on desktop and mobile",
  },
  {
    href: "/duopet",
    index: "03",
    context: "Educational project · UX/UI · 2023",
    title: "DuoPet",
    description: "A faster, clearer way to book veterinary appointments without WhatsApp back-and-forth.",
    result: "164 survey responses · 2 usability-testing rounds",
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
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <span className="work-title-end">{last}<TitleArrow /></span>
    </h2>
  );
}

function WorkContext({ context }) {
  const segments = context.split(" · ");
  return (
    <span className="work-context">
      {segments.map((segment, index) => (
        <span className="work-context-seg" key={`${segment}-${index}`}>
          {segment}
          {index < segments.length - 1 ? " · " : ""}
        </span>
      ))}
    </span>
  );
}

function WorkItem({ href, index, context, title, description, result, imageSrc, imageAlt, video, featured, order = 0 }) {
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
            <img src={imageSrc} alt={imageAlt} loading={featured ? "eager" : "lazy"} decoding="async" />
          )}
        </div>
      </div>
      <div className="work-row">
        <div className="work-info">
          <span className="work-index">{index}</span>
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

export default function Document() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    applySeo({
      title: POSITIONING.seoTitle,
      description: POSITIONING.seoDescription,
      path: "/",
      ogDescription: POSITIONING.ogDescription,
    });
  }, []);

  return (
    <>
      <style>
        {`
* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  padding: 0;
  font-family: var(--font-body);
  color: var(--ink-900);
  background: var(--bg);
  min-height: 100vh;
  overflow-x: hidden;
}

a { color: inherit; text-decoration: none; }

img { max-width: 100%; display: block; }

.page {
  min-height: 100vh;
  width: 100%;
  padding: 140px 16px 104px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-inner {
  width: 100%;
  max-width: 872px;
}

/* Warm editorial backdrop used only on the work index. The quiet grid fades
   before the project list so the mockups remain the visual focus. */
.home-page {
  position: relative;
  isolation: isolate;
  background-color: var(--bg);
  background-image:
    radial-gradient(circle at 12% 4%, rgba(201, 169, 110, 0.14), transparent 31rem),
    radial-gradient(circle at 88% 10%, rgba(95, 142, 82, 0.12), transparent 34rem),
    linear-gradient(180deg, rgba(250, 250, 249, 0) 0%, var(--bg) 64%);
}

.home-page::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 760px;
  z-index: -1;
  pointer-events: none;
  opacity: 0.34;
  background-image:
    linear-gradient(rgba(26, 24, 21, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 24, 21, 0.055) 1px, transparent 1px);
  background-size: 48px 48px;
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, transparent 88%);
  mask-image: linear-gradient(to bottom, #000 0%, transparent 88%);
}

@media (max-width: 768px) {
  .page { min-height: auto; padding-top: 112px; padding-inline: 12px; padding-bottom: 120px; }
  .hero-title { word-break: break-word; }
}

/* HERO */
.hero {
  display: flex;
  gap: 48px;
  margin-bottom: 96px;
  align-items: center;
}

.hero-visual {
  flex: 0 0 auto;
  position: relative;
  width: 260px; height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-badge-ring {
  position: absolute; inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  /* static typographic seal; stays in front of the video */
  z-index: 2;
  pointer-events: none;
}

.hero-badge-ring svg {
  width: 238px; height: 238px;
  transform-origin: center;
  animation: spin-slow 18s linear infinite;
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .hero-badge-ring svg { animation-play-state: paused; }
}

/* Circular viewport centers the square video inside the typographic seal. */
.hero-peeps {
  position: absolute;
  inset: 17%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  background: transparent;
  z-index: 1;
}

.hero-peeps .hero-video {
  position: static;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: translateX(6px) scale(1.02);
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 4px 6px rgba(26, 24, 21, 0.12));
}

.hero-content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 64px;
  font-weight: 700;
  color: var(--ink-900);
  margin: 0;
  line-height: 1.02;
  letter-spacing: -0.025em;
}

.hero-role {
  margin: 0;
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--brand-600);
}

.hero-copy {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 460px;
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: 17px;
  line-height: 1.65;
  font-weight: 400;
  margin: 0;
  color: var(--ink-600);
  overflow-wrap: break-word;
  text-wrap: wrap;
  text-wrap: pretty;
}

.hero-nowrap {
  white-space: nowrap;
}

@media (max-width: 1024px) { .hero-title { font-size: 52px; } }

@media (max-width: 768px) {
  .hero { flex-direction: column; align-items: center; gap: 32px; margin-bottom: 72px; }
  .hero-visual { width: 220px; height: 220px; }
  .hero-badge-ring svg { width: 210px; height: 210px; }
  .hero-peeps { inset: 16%; }
  .hero-peeps .hero-video { width: 100%; height: 100%; }
  .hero-content { width: 100%; min-width: 0; }
  .hero-copy { max-width: none; }
  .hero-title { font-size: 40px; line-height: 1.08; overflow-wrap: break-word; word-break: break-word; hyphens: none; }
  .hero-role { font-size: 14px; }
  .hero-subtitle { font-size: 15px; }
}

@media (max-width: 400px) {
  .hero-title { font-size: 34px; }
}

/* SECTION HEADER (shared by work + tools) */
.section-header { display: flex; align-items: center; gap: 14px; }

.section-label {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--ink-600);
  white-space: nowrap;
  margin: 0;
}

.section-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--ink-300), rgba(210, 207, 200, 0.08));
}

/* WORK INDEX (editorial, no cards) */
.work {
  display: flex;
  flex-direction: column;
  gap: 72px;
  padding-bottom: 24px;
}

.work-pair {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 40px;
}

.work-item {
  display: block;
  text-decoration: none;
  cursor: pointer;
}

/* Media stage: tinted panel, no border; flat by default, subtle 3D tilt on hover */
.work-media {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background: linear-gradient(140deg, var(--ink-100) 0%, var(--brand-50) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 36px;
}

.work-item--featured .work-media { min-height: 380px; }

.work-media-motion {
  display: flex;
  align-items: center;
  justify-content: center;
}

.work-media img {
  width: 100%;
  max-width: 560px;
  height: auto;
  max-height: 340px;
  object-fit: contain;
  filter: drop-shadow(0 22px 36px rgba(15, 14, 12, 0.2));
}

.work-pair .work-media { padding: 28px 24px; min-height: 260px; }
.work-pair .work-media img { max-height: 220px; }

/* The film is 16:9 and letterboxes badly inside the contain box the mockups
   use, so it gets its own frame with the aspect ratio reserved up front. */
.work-media-video {
  position: relative;
  width: 100%;
  max-width: 560px;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  overflow: hidden;
  background: var(--ink-950);
  box-shadow: 0 22px 36px rgba(15, 14, 12, 0.2);
}

.work-media-video .play-once-media {
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  object-fit: cover;
  display: block;
  filter: none;
}

.play-once-hint {
  position: absolute;
  right: 10px;
  bottom: 10px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(15, 14, 12, 0.62);
  color: var(--ink-50);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  pointer-events: none;
}

/* Typographic row under the media */
.work-row {
  display: grid;
  grid-template-columns: minmax(150px, 220px) minmax(0, 1fr);
  gap: 12px 40px;
  margin-top: 22px;
  min-width: 0;
}

.work-pair .work-row {
  grid-template-columns: 1fr;
  gap: 8px;
  margin-top: 18px;
}

.work-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.work-pair .work-info {
  flex-direction: row;
  align-items: baseline;
  gap: 12px;
}

.work-index {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--gold-600);
}

.work-context {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  line-height: 1.7;
  color: var(--ink-600);
  display: flex;
  flex-wrap: wrap;
  min-width: 0;
}

.work-context-seg {
  white-space: nowrap;
}

.work-title {
  font-family: var(--font-display);
  font-size: 30px;
  font-weight: 600;
  letter-spacing: -0.015em;
  line-height: 1.15;
  margin: 0;
  color: var(--ink-900);
  transition: color .18s ease;
  overflow-wrap: break-word;
  text-wrap: wrap;
  text-wrap: pretty;
}

.work-title-end {
  white-space: nowrap;
}

.work-pair .work-title { font-size: 22px; }

.work-item:hover .work-title,
.work-item:focus-visible .work-title { color: var(--brand-700); }

/* The color shift alone is not a focus indicator: same ring as .btn. */
.work-item:focus-visible {
  outline: 2px solid var(--brand-400);
  outline-offset: 6px;
  border-radius: 20px;
}

.work-arrow {
  display: inline-flex;
  align-items: center;
  margin-left: 0.35em;
  vertical-align: -0.12em;
  transition: transform .2s ease;
}

.work-arrow svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  fill: none;
}

.work-pair .work-arrow svg { width: 16px; height: 16px; }

.work-item:hover .work-arrow,
.work-item:focus-visible .work-arrow { transform: translateX(6px); }

.work-desc {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.7;
  color: var(--ink-600);
  margin: 10px 0 0;
  max-width: 56ch;
}

.work-result {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--brand-700);
  margin: 14px 0 0;
}

@media (max-width: 768px) {
  .work { gap: 56px; }
  .work-pair { grid-template-columns: 1fr; gap: 56px; }
  .work-item--featured .work-media { min-height: 0; }
  .work-media { padding: 24px 18px; }
  .work-row { grid-template-columns: 1fr; gap: 8px; margin-top: 16px; }
  .work-info { flex-direction: row; align-items: baseline; gap: 12px; }
  .work-context { flex: 1 1 0; }
  .work-title { font-size: 24px; }
  .work-pair .work-title { font-size: 22px; }
  .work-desc { font-size: 15px; }
}

/* TOOLS STRIP (quiet, below the work index) */
.tools-strip {
  margin-top: 96px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.tools-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 24px 32px;
}
.tool-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  opacity: 0.8;
}
.tool-icon {
  width: 18px;
  height: 18px;
}
.tool-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-600);
}

@media (max-width: 768px) {
  .tools-strip { margin-top: 72px; }
  .tools-row { gap: 14px 18px; }
  .tool-icon { width: 22px; height: 22px; }
  .tool-label { font-size: 12px; }
}
`}
      </style>

      <SiteHeader active="work" />

      <main id="main" className="page home-page">
        <div className="page-inner">

          {/* HERO */}
          <section className="hero">
            <div className="hero-visual">
              <div className="hero-badge-ring" aria-hidden="true">
                <svg viewBox="0 0 238 238" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <path id="badge-circle" d="M 119,119 m 0,-92 a 92,92 0 1,1 0,184 a 92,92 0 1,1 0,-184" fill="none" />
                  </defs>
                  <text fontFamily="'JetBrains Mono', ui-monospace, monospace" fontSize="10" fontWeight="500" fill="#1A1815" letterSpacing="0.16em">
                    <textPath href="#badge-circle" startOffset="0" textLength="578" lengthAdjust="spacing">
                      MATTHIAS SCHAEFLE / UX/UI DESIGNER IN BERLIN / RESEARCH / INTERFACE DESIGN / PROTOTYPING / DESIGN SYSTEMS /
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
          <section className="tools-strip" aria-label="Tools I use">
            <div className="section-header">
              <TypedSectionLabel
                className="section-label"
                prefersReducedMotion={shouldReduceMotion}
                standalone
              >
                Tools I use
              </TypedSectionLabel>
              <span className="section-line" />
            </div>
            <div className="tools-row" aria-label="Tools">
              {/* Figma */}
              <div className="tool-item">
                <svg className="tool-icon" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
                  <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83"/>
                  <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262"/>
                  <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
                  <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
                </svg>
                <span className="tool-label">Figma</span>
              </div>

              {/* React */}
              <div className="tool-item">
                <svg className="tool-icon" viewBox="-11.5 -10.232 23 20.463" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle r="2.05" fill="#61DAFB"/>
                  <ellipse rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1" fill="none"/>
                  <ellipse rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(60)"/>
                  <ellipse rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(120)"/>
                </svg>
                <span className="tool-label">React</span>
              </div>

              {/* Cursor */}
              <div className="tool-item">
                <svg className="tool-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="6" fill="#1A1815"/>
                  <path d="M7 8l5 4-5 4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 16h4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="tool-label">Cursor</span>
              </div>
            </div>
          </section>

        </div>
      </main>

      <SiteFooter />
    </>
  );
}
