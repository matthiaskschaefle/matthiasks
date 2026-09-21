import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeIn, fadeScale, fadeUp, fadeUpImmediate, gridStagger, sectionStagger, useReducedMotion as getReducedMotion, viewport as motionViewport } from "@/lib/animations";
import { applySeo } from "@/lib/seo";
import SiteHeader from "./components/SiteHeader.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import CaseContents, { CaseBackToContents } from "./components/CaseContents.jsx";
import PinnedStory from "./components/PinnedStory.jsx";
import Figure from "./components/mockups/Figure.jsx";
import BeforeAfter from "./components/mockups/BeforeAfter.jsx";
import CountUp from "./components/CountUp.jsx";
import TypedSectionLabel from "./components/TypedSectionLabel.jsx";
import PlayOnceVideo from "./components/PlayOnceVideo.jsx";

/**
* Entregas Case Study: v2.0 (EN): DE market structure
* UX for a delivery app: Full portfolio pattern
* Accent: var(--brand-500) (mint)
*/

const CASE_SECTION_IDS = ["overview", "my-role", "research", "insights", "process", "solutions", "kpis", "reflections"];

const SEO_TITLE = "Delivery App Redesign | UX Case Study | Matthias Schaefle";
const SEO_DESCRIPTION = "UX case study of a delivery confirmation redesign for last-mile drivers: 7 to 8 seconds faster per stop, two fewer taps, and record compliance from 92% to 98%.";
const SEO_OG_TITLE = "Delivery App Redesign | UX Case Study";
const SEO_OG_DESCRIPTION = "A faster delivery confirmation flow, designed from field research with last-mile drivers.";

/* ── Asset URLs ── */
const HERO_IMG = "/assets/portfolio/2026/03/Mockup-Hero-scaled.png";

function NumberCard({ icon, title, description }) {
return (
<motion.article className="research-card" variants={fadeUp}>
{icon ? <div className="research-icon">{icon}</div> : null}
<h4 className="research-title">{title}</h4>
<p className="research-text">{description}</p>
</motion.article>
);
}

// ─── Quote band: full-column dark moment for the driver quotes ───────────────
function QuoteBand({ quotes }) {
return (
<motion.div className="quote-band" variants={fadeScale}>
<span className="quote-band-ghost" aria-hidden="true">&ldquo;</span>
<motion.div className="quote-band-grid" variants={gridStagger}>
{quotes.map((q) => (
<motion.figure className="quote-band-item" variants={fadeUp} key={q.author}>
<blockquote className="quote-band-text">{q.text}</blockquote>
<figcaption className="quote-band-author">{q.author}</figcaption>
</motion.figure>
))}
</motion.div>
</motion.div>
);
}

/* ═══════════════════════════════════════════════════════════════
MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function Document() {
const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => getReducedMotion());
const childUpV = prefersReducedMotion ? fadeIn : fadeUp;

useEffect(() => {
const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const updateMotionSettings = () => setPrefersReducedMotion(getReducedMotion());
updateMotionSettings();
reducedQuery.addEventListener("change", updateMotionSettings);
return () => reducedQuery.removeEventListener("change", updateMotionSettings);
}, []);

useEffect(() => {
applySeo({
title: SEO_TITLE,
description: SEO_DESCRIPTION,
path: "/delivery",
ogTitle: SEO_OG_TITLE,
ogDescription: SEO_OG_DESCRIPTION,
});
}, []);

useEffect(() => {
function updateMobile() {
if (window.innerWidth < 900) document.body.classList.add('is-mobile');
else document.body.classList.remove('is-mobile');
}
updateMobile();
window.addEventListener('resize', updateMobile);
return () => {
window.removeEventListener('resize', updateMobile);
document.body.classList.remove('is-mobile');
};
}, []);

return (
<>
<style>{`
* { box-sizing: border-box; }
html { scroll-behavior: auto; }
body { margin:0; padding:0; font-family:var(--font-body); color:var(--ink); background:var(--bg); min-height:100vh; overflow-x:hidden; max-width:100vw; }
a { color:inherit; text-decoration:none; }
img { max-width:100%; display:block; }

/* ── PAGE ── */
.page { min-height:100vh; width:100%; padding:152px 16px 96px; display:flex; flex-direction:column; align-items:center; }
.page-inner { width:100%; max-width:872px; }
@media(max-width:900px){ .page{min-height:auto;padding-top:120px;padding-inline:12px;padding-bottom:96px;overflow-x:hidden;} .page-inner{overflow-x:hidden;width:100%;max-width:100%!important;} .case-layout{overflow-x:hidden;} }

/* ── HERO ── */
.case-hero { display:flex; flex-direction:column; gap:24px; margin-bottom:0; position:relative; }
.case-hero-backdrop { position:absolute; top:-140px; right:-180px; width:560px; height:560px; border-radius:50%; background:radial-gradient(circle at 35% 35%, rgba(var(--accent-rgb),0.10) 0%, rgba(var(--accent-rgb),0.045) 40%, transparent 70%); box-shadow:inset 0 24px 64px rgba(15,14,12,0.07), inset 0 -12px 36px rgba(255,255,255,0.16); pointer-events:none; z-index:0; }
@media(max-width:900px){ .case-hero-backdrop{display:none;} }
.case-eyebrow { font-family:var(--font-mono); font-size:var(--label-1-size); text-transform:uppercase; letter-spacing:var(--label-1-track); color:var(--ink-600); }
.case-title-main { font-family:var(--font-display); font-size:40px; font-weight:500; letter-spacing:-0.02em; margin:0; color:var(--ink); line-height:1.1; }
.case-subtitle { font-family:var(--font-body); font-size:16px; line-height:1.7; font-weight:400; max-width:520px; color:var(--ink-600); margin:0; }
.case-engagement { font-family:var(--font-body); font-size:14px; line-height:1.6; color:var(--ink-700); margin:0; max-width:640px; position:relative; z-index:3; }
.case-meta-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:16px; margin-top:8px; position:relative; z-index:3; }
.case-meta-motion { min-width:0; display:flex; }
.case-meta-motion .case-meta-item { width:100%; }
.case-meta-item { padding:12px 0; border-top:var(--hairline); }
.case-meta-label { font-family:var(--font-mono); font-size:var(--label-1-size); text-transform:uppercase; letter-spacing:var(--label-1-track); color:var(--ink-600); margin-bottom:6px; }
.case-meta-value { font-family:var(--font-body); font-size:14px; color:var(--ink-800); }
@media(max-width:900px){ .case-meta-grid{grid-template-columns:repeat(2,1fr);gap:12px;} .case-title-main{font-size:32px;} }

/* ── IN SHORT (hero summary) ── */
.in-short { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:36px; margin-top:32px; padding-top:8px; border-top:none; position:relative; z-index:3; }
.in-short-label { font-family:var(--font-mono); font-size:var(--label-1-size); text-transform:uppercase; letter-spacing:var(--label-1-track); color:var(--ink-600); margin-bottom:8px; }
.in-short-text { font-family:var(--font-body); font-size:15px; line-height:1.6; color:var(--ink-700); margin:0; }
@media(max-width:900px){ .in-short{grid-template-columns:1fr;} }


/* ── LAYOUT ── */
.case-layout { position:relative; margin-top:32px; }
.case-content-column { min-width:0; }
@media(max-width:768px){ .case-layout{margin-top:12px;overflow-x:hidden;} }

/* ── SECTIONS ── */
.case-section { display:grid; grid-template-columns:minmax(120px,190px) minmax(0,1fr); gap:20px 40px; padding-block:32px; }
#kpis { padding-bottom: 140px; }
.case-section-label { min-height:1.3em; display:flex; align-items:baseline; align-self:start; font-family:var(--font-mono); font-size:var(--label-2-size); text-transform:uppercase; letter-spacing:var(--label-2-track); color:var(--ink-600); opacity:0.75; padding-top:4px; margin:0; }
.case-section-label-text { display:inline-flex; white-space:nowrap; }
.case-section-label-character { display:inline-block; }
.case-section-label-caret { width:1.5px; height:1.05em; margin-left:3px; border-radius:999px; background:var(--brand-600); box-shadow:0 0 8px rgba(46,73,52,0.28); transform:translateY(1px); }
.case-section-body { font-family:var(--font-body); font-size:16px; line-height:1.8; color:var(--ink-800); max-width:var(--measure-body); }
.case-section-body-secondary { grid-column:2/3; margin-top:24px; }
.case-section-body p { margin:0 0 14px; }
.case-section-body p:last-child { margin-bottom:0; }
.case-subsection-title { font-family:var(--font-display); font-size:17px; font-weight:600; margin:18px 0 6px; color:var(--ink-800); }
.case-subsection-title:first-child { margin-top:0; }
body.is-mobile .case-section { grid-template-columns:1fr!important; gap:16px!important; padding-block:32px!important; }
body.is-mobile .case-section-label { height:auto!important; width:auto!important; align-self:start!important; font-size:var(--label-1-size)!important; opacity:0.75!important; margin-bottom:4px!important; }
body.is-mobile .case-section-body,body.is-mobile .case-section-body-secondary { width:auto!important; max-width:100%!important; min-width:0!important; grid-column:1!important; font-size:15px; }
body.is-mobile .page-inner { max-width:100%!important; width:100%!important; overflow-x:hidden!important; }
body.is-mobile,body.is-mobile .page,body.is-mobile .case-layout,body.is-mobile .case-content-column { overflow-x:hidden!important; max-width:100vw!important; }
@media(max-width:900px){ .case-section{grid-template-columns:1fr!important;gap:10px;padding-block:24px;} .case-section-label{font-size:var(--label-1-size);letter-spacing:var(--label-2-track);opacity:0.75;} .case-section-body{width:auto!important;max-width:100%!important;min-width:0!important;font-size:15px;} .case-section-body-secondary{grid-column:1/-1;margin-top:16px;width:auto!important;max-width:100%!important;} }

/* ── RESEARCH FULL ── */
.research-full { grid-column:1/-1; max-width:872px; margin:0 auto; width:100%; }
.research-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:28px 40px; margin-top:22px; }
body.is-mobile .research-grid>* { grid-column:1!important; }
@media(max-width:768px){ .research-grid{grid-template-columns:1fr;} }

/* ── RESEARCH CARD (hairline row, no card chrome) ── */
.research-card { position:relative; padding:0; border:none; border-radius:0; background:transparent; box-shadow:none; display:flex; flex-direction:column; }
.research-icon { display:inline-flex; align-items:center; color:var(--brand-700); margin-bottom:12px; }
.research-title { font-family:var(--font-display); font-size:17px; font-weight:700; margin:0 0 10px; color:var(--ink-900); letter-spacing:-0.01em; line-height:1.35; }
.research-text { font-size:14px; line-height:1.7; color:var(--ink-600); margin:0; flex:1; }

/* ── WIREFRAME GRID (transparent glass mockups) ── */
.wireframe-grid-label { display:block; font-family:var(--font-mono); font-size:var(--label-1-size); font-weight:500; text-transform:uppercase; letter-spacing:var(--label-1-track); color:var(--ink-600); margin-bottom:16px; }
.wireframe-grid { position:relative; isolation:isolate; display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:24px; align-items:start; padding:34px 20px 18px; }
.wireframe-grid::before { content:""; position:absolute; z-index:-2; top:50%; left:50%; width:min(70vw,620px); aspect-ratio:1; border-radius:50%; background:radial-gradient(circle at 36% 34%,rgba(var(--accent-rgb),0.16) 0%,rgba(var(--accent-rgb),0.075) 42%,rgba(var(--accent-rgb),0) 71%); transform:translate(-50%,-52%); pointer-events:none; }
.wireframe-grid::after { content:""; position:absolute; z-index:-1; top:18%; right:7%; width:180px; aspect-ratio:1; border-radius:50%; background:radial-gradient(circle,rgba(201,169,110,0.15) 0%,rgba(201,169,110,0) 70%); filter:blur(2px); pointer-events:none; }
.wireframe-glass-item { position:relative; z-index:1; }
.wireframe-glass-item .ms-figure__media { filter:drop-shadow(0 22px 24px rgba(15,14,12,0.13)) drop-shadow(0 5px 7px rgba(15,14,12,0.08)); }
.wireframe-glass-item .ms-figure__img { position:relative; z-index:1; }
.wireframe-glass-item .ms-figure__caption { padding-inline:8px; text-align:center; }
@media (max-width:900px){
.wireframe-grid { grid-template-columns:1fr; gap:34px; max-width:390px; margin:0 auto; padding:30px 22px 16px; }
.wireframe-grid::before { width:520px; opacity:0.78; }
.wireframe-grid::after { top:38%; right:-10%; width:150px; }
}

/* ── DISCLAIMER ── */
.case-disclaimer { font-family:var(--font-body); font-size:12px; color:var(--ink-600); font-style:italic; margin-top:8px; }

/* ── QUOTE BAND (full-column dark moment) ── */
.quote-band { position:relative; grid-column:1/-1; margin:28px 0 8px; padding:48px 44px 44px; border-radius:24px; background:linear-gradient(150deg,var(--ink-950) 0%,var(--ink-900) 55%,#1E251C 100%); overflow:hidden; }
.quote-band-ghost { position:absolute; top:-72px; right:8px; font-family:var(--font-display); font-size:300px; font-weight:700; line-height:1; color:rgba(255,255,255,0.05); pointer-events:none; user-select:none; }
.quote-band-grid { position:relative; display:grid; grid-template-columns:1fr 1fr; gap:36px; }
.quote-band-item { margin:0; border-left:2px solid var(--gold-400); padding-left:20px; }
.quote-band-text { font-family:var(--font-display); font-size:19px; font-weight:500; line-height:1.5; letter-spacing:-0.01em; color:var(--ink-100); margin:0; }
.quote-band-author { margin-top:16px; font-family:var(--font-mono); font-size:var(--label-1-size); text-transform:uppercase; letter-spacing:var(--label-1-track); color:var(--ink-300); }
@media (max-width:900px) {
.quote-band { padding:32px 24px 28px; margin:20px 0 4px; }
.quote-band-grid { grid-template-columns:1fr; gap:24px; }
.quote-band-text { font-size:16px; }
.quote-band-ghost { font-size:200px; top:-48px; }
}

/* ── KPI (display number + label over a hairline, no card chrome) ── */
.kpi-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:16px; margin-top:24px; }
.kpi-card { padding:16px 0 0; border:none; display:flex; flex-direction:column; gap:8px; }
.kpi-card-value { font-family:var(--font-display); font-size:40px; font-weight:600; line-height:1; color:var(--brand-700); letter-spacing:-0.02em; }
.kpi-card-value--range { font-size:30px; }
/* So a unidade, nunca o numero. O seletor antigo pegava qualquer span dentro
   de .kpi-card-value, inclusive os spans internos do CountUp, e derrubava o
   numero de 40px para 17px nos dois cards animados. */
.kpi-card-unit { font-size:17px; font-weight:400; color:var(--ink-600); letter-spacing:0; }
.kpi-card-label { font-family:var(--font-mono); font-size:13px; font-weight:600; color:var(--ink-900); letter-spacing:0.01em; }
.kpi-card-desc { font-family:var(--font-body); font-size:13px; line-height:1.6; color:var(--ink-600); margin-top:4px; }
.kpi-grid--measured { grid-template-columns:repeat(3,minmax(0,1fr)); }
.projection-block { margin-top:28px; padding-top:24px; padding-bottom:8px; border-top:var(--hairline); }
.projection-block-label { font-family:var(--font-mono); font-size:var(--label-1-size); font-weight:500; text-transform:uppercase; letter-spacing:var(--label-1-track); color:var(--ink-600); margin-bottom:8px; }
.projection-block-value { font-family:var(--font-display); font-size:28px; font-weight:600; letter-spacing:-0.02em; color:var(--ink-900); margin:0 0 8px; }
.projection-block-text { font-family:var(--font-body); font-size:15px; line-height:1.7; color:var(--ink-600); margin:0; max-width:var(--measure-body); }
.limitations-block { margin-top:28px; }
.limitations-block h3 { margin-top:0; }
.limitations-list { margin:0; padding-left:18px; font-family:var(--font-body); font-size:15px; line-height:1.7; color:var(--ink-700); }
.limitations-list li { margin:0 0 8px; }
.limitations-list li:last-child { margin-bottom:0; }
@media(max-width:900px){ .kpi-grid,.kpi-grid--measured{grid-template-columns:1fr;} }

/* ── CASE FILM ── */
/* Sits in the hero flex column, so it needs to clear the radial backdrop. */
.case-film { margin: 12px 0 8px; position: relative; z-index: 3; }
.case-film-frame {
position: relative;
width: 100%;
aspect-ratio: 16 / 9;
border-radius: 16px;
overflow: hidden;
background: var(--ink-950);
border: none;
box-shadow: var(--shadow-fine);
}
.case-film-frame .play-once-media {
width: 100%;
height: 100%;
display: block;
object-fit: cover;
}
.case-film-caption {
font-family: var(--font-body);
font-size: 13px;
line-height: 1.6;
color: var(--ink-600);
margin-top: 10px;
}

/* ── CONTEXT CARD ── */
.context-card {
grid-column: 1 / -1;
margin-top: 16px;
padding: 36px 40px 32px;
border-radius: 24px;
border: none;
background: linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.96) 48%, rgba(236,253,245,0.86) 100%);
box-shadow: var(--shadow-fine);
}
.context-card-label {
font-family: var(--font-mono);
font-size: var(--label-1-size);
font-weight: 500;
text-transform: uppercase;
letter-spacing: var(--label-1-track);
color: var(--ink-600);
margin-bottom: 28px;
display: block;
}
.context-card-grid {
display: grid;
grid-template-columns: repeat(3, minmax(0, 1fr));
gap: 28px;
}
.context-card-item {
padding: 0;
border-right: none;
display: flex;
flex-direction: column;
gap: 6px;
}
.context-card-item:first-child { padding-left: 0; }
.context-card-item:last-child { padding-right: 0; border-right: none; }
.context-card-number {
font-family: var(--font-display);
font-size: 52px;
font-weight: 600;
line-height: 1;
color: var(--ink-900);
letter-spacing: -0.02em;
}
.context-card-unit {
font-family: var(--font-mono);
font-size: var(--label-1-size);
font-weight: 500;
text-transform: uppercase;
letter-spacing: var(--label-1-track);
color: var(--brand-500);
}
.context-card-context {
font-family: var(--font-body);
font-size: 12px;
color: var(--ink-600);
line-height: 1.5;
}
@media (max-width: 900px) {
.context-card { padding: 24px 20px 20px; }
.context-card-grid { grid-template-columns: 1fr; gap: 24px; }
.context-card-item { padding: 0; border-right: none; padding-bottom: 24px; }
.context-card-item:last-child { border-bottom: none; padding-bottom: 0; }
.context-card-number { font-size: 40px; }
}

/* ── PAGINATION (typographic line + hairline, no card chrome) ── */
.case-pagination { margin-top:48px; margin-bottom:24px; }
.case-pagination-inner { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:20px; }
.case-pagination-card { display:flex; flex-direction:column; gap:6px; padding:18px 0 0; border-top:var(--hairline); text-decoration:none; cursor:pointer; }
.case-pagination-label { font-family:var(--font-mono); font-size:var(--label-1-size); text-transform:uppercase; letter-spacing:var(--label-1-track); font-weight:700; color:var(--ink-600); transition:color 0.24s ease; }
.case-pagination-card:hover .case-pagination-label { color:var(--accent); }
.case-pagination-title { font-family:var(--font-display); font-size:18px; font-weight:600; color:var(--ink-900); letter-spacing:-0.01em; display:flex; align-items:center; gap:8px; }
.case-pagination-arrow { display:inline-flex; align-items:center; color:var(--accent); flex-shrink:0; transition:transform 0.28s cubic-bezier(0.4,0,0.2,1); }
.case-pagination-prev:hover .case-pagination-arrow { transform:translateX(-4px); }
.case-pagination-next:hover .case-pagination-arrow { transform:translateX(4px); }
.case-pagination-desc { font-family:var(--font-body); font-size:13px; line-height:1.6; color:var(--ink-600); }
.case-pagination-prev { text-align:left; }
.case-pagination-prev .case-pagination-title { flex-direction:row-reverse; justify-content:flex-end; }
.case-pagination-next { text-align:right; }
.case-pagination-next .case-pagination-title { justify-content:flex-end; }
@media(max-width:768px){ .case-pagination-inner{grid-template-columns:1fr;gap:14px;} .case-pagination-next{text-align:left;} .case-pagination-next .case-pagination-title{justify-content:flex-start;} }

.mobile-only { display:none!important; }
body.is-mobile .mobile-only { display:block!important; }
body.is-mobile .desktop-only { display:none!important; }

.research-grid--two {
grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
}
@media (max-width: 900px) {
.research-grid--two { grid-template-columns: 1fr !important; }
}

/* ── RESEARCH FIELD PHOTO ── */
.research-field-figure { margin: 20px 0 4px; }

/* ── ALTERNATIVES (considered and discarded) ── */
.alt-block { margin-top: 28px; }
.alt-block-label { display:inline-flex; align-items:center; font-family:var(--font-mono); font-size:var(--label-1-size); font-weight:500; text-transform:uppercase; letter-spacing:var(--label-1-track); color:var(--ink-600); }
.alt-block-intro { font-family:var(--font-body); font-size:15px; line-height:1.7; color:var(--ink-600); margin:10px 0 18px; max-width:var(--measure-body); }
.alt-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:16px; }
.alt-card { padding:18px 18px 20px; border:none; border-radius:14px; background:#fff; box-shadow:var(--shadow-fine); display:flex; flex-direction:column; gap:8px; }
.alt-card-tag { font-family:var(--font-mono); font-size:var(--label-1-size); font-weight:500; text-transform:uppercase; letter-spacing:var(--label-1-track); color:var(--ink-600); }
.alt-card-title { font-family:var(--font-display); font-size:16px; font-weight:600; color:var(--ink-900); margin:0; }
.alt-card-text { font-family:var(--font-body); font-size:14px; line-height:1.7; color:var(--ink-600); margin:0; }
.alt-block-close { font-family:var(--font-body); font-size:15px; line-height:1.7; color:var(--ink-700); margin:18px 0 0; font-style:italic; }
@media(max-width:768px){ .alt-grid{grid-template-columns:1fr;} }

/* ── CASE BTN ── */
.case-cta-row { display:flex; gap:12px; align-items:center; margin-top:10px; }
.case-btn { display:inline-flex; align-items:center; gap:10px; padding:12px 16px; border-radius:12px; background:#fff; border:none; box-shadow:var(--shadow-fine); color:var(--ink-900); text-decoration:none; font-family:var(--font-display); font-size:13px; font-weight:600; letter-spacing:-0.01em; white-space:nowrap; transition:box-shadow 0.18s ease,transform 0.18s ease; }
.case-btn:hover { box-shadow:var(--shadow-header); transform:translateY(-2px); }
.case-btn:active { transform:translateY(0); }
.case-btn:focus-visible { outline:2px solid var(--brand-400); outline-offset:2px; }
.case-btn-icon { display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; overflow:visible; width:12px; height:18px; }
.case-btn-icon img { width:12px; height:18px; display:block; object-fit:contain; overflow:visible; }
.case-btn-icon svg { display:block; width:12px; height:18px; overflow:visible; }
.case-btn-label { display:inline-flex; align-items:center; }

/* Delivery comparisons keep the exported screens almost square. */
.delivery-before-after .ms-frame--phone { border-radius:10px; }
.delivery-before-after.ms-ba--focus-top .ms-ba__cell:first-child .ms-ba__img { top: -24px; }

`}</style>

<SiteHeader />

{/* ── MAIN ── */}
<main id="main" className="page">
<div className="page-inner">

{/* ── HERO ── */}
<section className="case-hero">
<div className="case-hero-backdrop" aria-hidden="true" />
<p className="case-eyebrow">CASE STUDY / DELIVERY</p>
<h1 className="case-title-main">The New Delivery Experience</h1>
<p className="case-engagement">Paid freelance client project via Vulpes Studio, 2025. A small freight company in Barbacena, Brazil.</p>
<p className="case-subtitle">
We redesigned the confirmation flow inside the screens drivers already used.
</p>

<figure className="case-film">
<PlayOnceVideo
className="case-film-frame"
sources={[{ src: "/media/delivery-full-web.mp4", type: "video/mp4" }]}
poster="/media/delivery-poster.jpg"
alt="Delivery case film: the disputes, the field research, the redesigned confirmation flow and the pilot numbers"
threshold={1}
requireScroll
controls
reducedMotion="player"
tracks={[{ src: "/media/delivery-full-web.en.vtt", srcLang: "en", label: "English" }]}
/>
<figcaption className="case-film-caption">
The case in 49 seconds, from the disputes to the pilot numbers. Silent, all text on screen.
</figcaption>
</figure>

<motion.p className="case-hero-byline" {...fadeUpImmediate(0, prefersReducedMotion)}>
Two designers with the client&apos;s operations lead. Research and UI, 2025.
</motion.p>

<div className="in-short">
<div className="in-short-item">
<div className="in-short-label">Problem</div>
<p className="in-short-text">Paid deliveries were disputed, and the records were too thin to settle the claim.</p>
</div>
<div className="in-short-item">
<div className="in-short-label">My role</div>
<p className="in-short-text">I led the field sessions and designed the receiver confirmation flow.</p>
</div>
<div className="in-short-item">
<div className="in-short-label">Results</div>
<p className="in-short-text">7 to 8 seconds faster per stop, 2 fewer taps, and record compliance from 92% to 98%. 12-driver, 3-week pilot.</p>
</div>
</div>

<CaseContents sections={CASE_SECTION_IDS.map(id => ({ id, label: id === "my-role" ? "my role" : id === "kpis" ? "results" : id }))} />
</section>

{/* ── PINNED STORY: the case in four scroll steps ── */}
<PinnedStory
steps={[
{
id: "context",
label: "The product",
title: "A last-mile app at 80 to 130 stops a day",
body: "Partner drivers finish each stop in it: confirm delivery, register who received the package, and submit photo proof. The records it produced were not strong enough.",
img: HERO_IMG,
alt: "Delivery app mockups",
},
{
id: "field",
label: "Field research",
title: "I led two days on active routes",
body: "Five drivers, before the redesign and separate from the later 12-driver pilot. We watched the app at the door without interrupting, then debriefed after each route.",
img: "/assets/portfolio/2026/04/IMG-20260328-WA0013.jpg",
alt: "Field observation during a driver route in Barbacena",
},
{
id: "insight",
label: "The principle",
title: "Confirmation should replace entry",
body: "Names and document numbers were already in the system. Drivers were still typing them. The interface was asking people to do work the app could do.",
img: "/assets/portfolio/2026/03/Mockup-02-Receiver-Modal.png",
alt: "Wireframe of the receiver modal",
},
{
id: "solution",
label: "The three changes",
title: "Same screens, less work at the door",
body: "Auto-filled confirmation data, structured receiver options, and photo feedback at capture. No new screens and no retraining.",
img: "/assets/portfolio/2026/04/Mockup-02-Modal.png",
alt: "Final receiver modal UI",
},
]}
/>


{/* ── LAYOUT: TOC + CONTENT ── */}
<div className="case-layout">
<div className="case-content-column">

{/* ══ OVERVIEW ══ */}
<motion.section id="overview" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Overview</TypedSectionLabel>
<div className="case-section-body">
<p className="case-disclaimer">App name and visual identity have been altered to comply with a non-disclosure agreement.</p>
<p>The confirmation flow cost time and left records that could not settle Proof Not Received (PNR) disputes. The brief: close those gaps without new screens or retraining.</p>
</div>
<div className="context-card">
<span className="context-card-label">Context</span>
<div className="context-card-grid">
<div className="context-card-item">
<div className="context-card-number">80 to 130</div>
<div className="context-card-unit">Stops per day</div>
<div className="context-card-context">per driver, per route</div>
</div>
<div className="context-card-item">
<div className="context-card-number">7 to 8s</div>
<div className="context-card-unit">Faster per stop</div>
<div className="context-card-context">12-driver, 3-week pilot</div>
</div>
<div className="context-card-item">
<div className="context-card-number"><CountUp value={92} suffix="%" /></div>
<div className="context-card-unit">Record compliance</div>
<div className="context-card-context">before the redesign</div>
</div>
</div>
</div>

</motion.section>

{/* ══ MY ROLE ══ */}
<motion.section id="my-role" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>My Role</TypedSectionLabel>
<div className="case-section-body">
<p>I led the field sessions and the receiver confirmation flow, with one other designer and the client&apos;s operations lead. No dedicated researcher. Constraints: no new screens, no retraining, about three weeks from first field session to handoff.</p>
</div>
<div className="research-full">
<div className="research-grid research-grid--two">
<NumberCard
icon={
<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
<path d="M12 20h9" />
<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
</svg>
}
title="What I owned"
description="Field observations, driver interviews, wireframes for confirmation and photo capture, and high-fidelity UI for those flows."
/>
<NumberCard
icon={
<svg width="28" height="20" viewBox="0 0 28 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
<circle cx="10" cy="10" r="7" />
<circle cx="18" cy="10" r="7" />
</svg>
}
title="What was shared"
description="Research planning, which problems to prioritize, and the final design direction, with the other designer and the operations lead."
/>
</div>
</div>
</motion.section>

{/* ══ RESEARCH ══ */}
<motion.section id="research" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Research</TypedSectionLabel>
<div className="case-section-body">
<h3 className="case-subsection-title">Two days on the road</h3>
<p>Two days with five drivers, before the redesign and separate from the later 12-driver pilot. I led the ride-alongs. We watched the app at each stop without directing them, then debriefed after each route.</p>
<Figure
className="research-field-figure"
src="/assets/portfolio/2026/04/IMG-20260328-WA0013.jpg"
alt="Package with shipping label and phone during field research"
caption={{ text: "Field observation, driver route, Barbacena" }}
/>
<QuoteBand
quotes={[
{
text: "In stores it's almost always a coworker who receives the package, but there's no option for that in the app.",
author: "Driver, 1 year of experience",
},
{
text: "If the system already has the ID number, why do I need to type it again?",
author: "Driver, 3 years of experience",
},
]}
/>
</div>
<div className="research-full">
<div className="research-grid research-grid--two">
<NumberCard title="Retyping what the system already knew" description="Document numbers, recipient names, recurring notes. Drivers entered data the system already had." />
<NumberCard title="No option for how deliveries actually happen" description="In commercial buildings, packages almost always go to a coworker or security guard. The app had no field for that, so drivers used free text." />
<NumberCard title="Photos accepted regardless of quality" description="Dark, blurry, or off-angle shots were accepted. Proof of delivery depended on the driver's attention at that moment." />
<NumberCard title="PNR disputes with no clear answer" description="When a customer disputed a delivery, the records were often too thin to settle it. The app had not captured enough." />
</div>
</div>
</motion.section>

{/* ══ INSIGHTS ══ */}
<motion.section id="insights" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Insights</TypedSectionLabel>
<div className="case-section-body">
<p>One principle: confirmation should replace entry. Names and IDs were already in the system. Free text made coworker and doorman records inconsistent. Photo quality had to be caught at capture, while the driver was still at the door.</p>
</div>
</motion.section>

{/* ══ PROCESS ══ */}
<motion.section id="process" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Process</TypedSectionLabel>
<div className="case-section-body">
<h3 className="case-subsection-title">Informal wireframe check, not a usability test</h3>
<p>We took the wireframes back to drivers. Informal feedback, not a structured usability test. No formal test before rollout.</p>
<p>Most of the direction held. One gap: sometimes nobody is home, and packages go to the mailbox, the door, or building security. The receiver modal only covered attended deliveries, so we added a second group for unattended scenarios.</p>
</div>
<div className="research-full" style={{ marginTop: 24 }}>
<span className="wireframe-grid-label">Wireframes</span>
<div className="wireframe-grid">
<Figure className="wireframe-glass-item" src="/assets/portfolio/2026/03/Mockup-01-Route-List.png" alt="Wireframe mockup: Route List" caption={{ text: "Route List" }} />
<Figure className="wireframe-glass-item" src="/assets/portfolio/2026/03/Mockup-02-Receiver-Modal.png" alt="Wireframe mockup: Order Details" caption={{ text: "Order Details" }} />
<Figure className="wireframe-glass-item" src="/assets/portfolio/2026/03/Mockup-03-Confirmation-Form.png" alt="Wireframe mockup: Confirmation Form" caption={{ text: "Confirmation" }} />
</div>
</div>
</motion.section>

{/* ══ SOLUTIONS ══ */}
<motion.section id="solutions" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Solutions</TypedSectionLabel>
<div className="case-section-body">
<h3 className="case-subsection-title">From field observation to interface</h3>
<p>Each change maps to a problem we watched on routes.</p>
</div>

{/* ── Considered and discarded ── */}
<div className="research-full alt-block">
<span className="alt-block-label">Considered and discarded</span>
<p className="alt-block-intro">Two directions were dropped before the receiver modal below:</p>
<div className="alt-grid">
<article className="alt-card">
<h4 className="alt-card-title">A longer list of receiver-type buttons</h4>
<p className="alt-card-text">One button per situation sounded thorough. On 80 to 130 stops a day, every extra option is one more thing to scan at the door. We kept the set short and grouped it around attended and unattended deliveries.</p>
</article>
<article className="alt-card">
<h4 className="alt-card-title">Separate UI and journey per receiver group</h4>
<p className="alt-card-text">Separate flows would simplify each case in isolation. They would also break the sequence drivers already knew and collide with no new screens and no retraining. One modal with two labeled groups kept that muscle memory.</p>
</article>
</div>
<p className="alt-block-close">Both calls came back to the same test: does it hold up at the door, on stop 90 of a 120-stop route?</p>
</div>

{/* ── Pair 01: Confirmation Form ── */}
<div className="research-full" style={{ marginTop: 32 }}>
<BeforeAfter
className="delivery-before-after"
focus="top"
zoom
title="Data that shows itself"
description="Observation: drivers retyped names and IDs the system already had. Decision: those fields appear from route data, one tap to confirm. Evidence: 7 to 8 seconds faster per stop in the 12-driver, 3-week pilot."
caption="Empty name and ID fields before. After: filled from route data. Tap a screen to enlarge. Labels are in Portuguese."
before={{ src: "/assets/portfolio/2026/04/Mockup-01-Delivery-Proof-Wire.png", alt: "Before: empty receiver name and document fields on the confirmation screen" }}
after={{ src: "/assets/portfolio/2026/04/Mockup-01-Delivery-Proof.png", alt: "After: receiver name and document number filled from route data" }}
/>
</div>

{/* ── Pair 02: Receiver Modal ── */}
<div className="research-full" style={{ marginTop: 56 }}>
<BeforeAfter
className="delivery-before-after"
zoom
title="Receiver options that match delivery situations"
description="Observation: commercial stops often go to a coworker or security, so drivers wrote free text. Decision: a short labeled set, grouped into attended and unattended deliveries, instead of one button per situation. The unattended group came from the informal wireframe check. Evidence: field quotes and that wireframe check. This case does not measure how often each option was used."
caption="Wireframe: attended options only. After: two groups, attended and unattended. Tap a screen to enlarge. Labels are in Portuguese."
before={{ src: "/assets/portfolio/2026/04/Mockup-02-Modal-Wire.png", alt: "Before: wireframe of attended receiver options without an unattended group" }}
after={{ src: "/assets/portfolio/2026/04/Mockup-02-Modal.png", alt: "After: receiver options grouped into attended and unattended deliveries" }}
/>
</div>

{/* ── Pair 03: Photo Feedback ── */}
<div className="research-full" style={{ marginTop: 56 }}>
<BeforeAfter
className="delivery-before-after"
focus="bottom"
zoom
title="Photo feedback before the moment passes"
description="Observation: dark, blurry, or off-angle photos were accepted. Decision: the app flags the issue at capture. Evidence: record compliance moved from 92% to 98% in the 12-driver, 3-week pilot. This case does not document how the score was calculated, and does not report a result for each criterion."
caption="After: missing photo lines turn red before delivery can finish. Tap a screen to enlarge. Labels are in Portuguese."
before={{ src: "/assets/portfolio/2026/04/Mockup-03-Proof-of-Delivery-Wire.png", alt: "Before: photo slots with no quality warning" }}
after={{ src: "/assets/portfolio/2026/04/Mockup-03-Proof-of-Delivery.png", alt: "After: missing photo labels shown in red on the confirmation screen" }}
/>
</div>

{/* ── Prototype CTA ── */}
<div className="research-full" style={{ marginTop: 56, display: "flex", justifyContent: "center" }}>
<a
className="case-btn"
href="https://www.figma.com/proto/9EZDFZqXsv48JWYctCQnvx/ReDesign-Delivery?node-id=16-12&p=f&m=draw&scaling=scale-down&content-scaling=fixed&starting-point-node-id=16%3A12&page-id=0%3A1&t=18dSu0uiezoT5rJm-1"
target="_blank"
rel="noopener noreferrer"
style={{ width: "fit-content" }}
>
<span className="case-btn-icon" aria-hidden="true">
<img src="/assets/icons/figma.svg" alt="" width="12" height="18" />
</span>
<span className="case-btn-label">View prototype</span>
</a>
</div>
</motion.section>

{/* ══ KPIs ══ */}
<CaseBackToContents />
<motion.section id="kpis" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Results</TypedSectionLabel>
<div className="case-section-body">
<h3 className="case-subsection-title">Measured in the 12-driver pilot</h3>
<p>12 drivers, three weeks. 7 to 8 seconds faster per stop, 2 taps removed, and record compliance from 92% to 98%.</p>
</div>
<div className="research-full">
<div className="kpi-grid kpi-grid--measured">
<motion.div className="kpi-card" variants={childUpV}>
<div className="kpi-card-value kpi-card-value--range">7 to 8<span className="kpi-card-unit">s</span></div>
<div className="kpi-card-label">faster per stop</div>
<p className="kpi-card-desc">From the 12-driver, 3-week pilot. About 12 to 13 minutes across 100 stops is an estimate from that average, not a measured full route.</p>
</motion.div>
<motion.div className="kpi-card" variants={childUpV}>
<div className="kpi-card-value"><CountUp value={2} /><span className="kpi-card-unit"> taps</span></div>
<div className="kpi-card-label">removed per stop</div>
<p className="kpi-card-desc">Two taps that used to be required at every stop, in the same 12-driver, 3-week pilot.</p>
</motion.div>
<motion.div className="kpi-card" variants={childUpV}>
<div className="kpi-card-value"><CountUp value={98} /><span className="kpi-card-unit">%</span></div>
<div className="kpi-card-label">record compliance</div>
<p className="kpi-card-desc">Up from 92% in the 12-driver, 3-week pilot. Completed fields, photos of the package and the residence, and correct photo metadata were among the criteria.</p>
</motion.div>
</div>
<div className="projection-block">
<div className="projection-block-label">Projection</div>
<p className="projection-block-value">30 to 40% fewer PNR disputes</p>
<p className="projection-block-text">A projection based on the pilot, not a measured drop in disputes.</p>
</div>
<div className="limitations-block">
<h3 className="case-subsection-title">Limits of this evidence</h3>
<ul className="limitations-list">
<li>The 7 to 8 seconds, 2 taps, and 92% to 98% figures are from the 12-driver, 3-week pilot, not from the earlier five-driver field research.</li>
<li>The scoring method for record compliance is not documented in this case.</li>
<li>The pilot was 12 drivers for three weeks, not a full production period.</li>
<li>There was no formal usability test before rollout.</li>
<li>The pilot does not establish a measured reduction in delivery disputes.</li>
</ul>
</div>
</div>
</motion.section>

{/* ══ REFLECTIONS ══ */}
<motion.section id="reflections" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Reflections</TypedSectionLabel>
<div className="case-section-body">
<h3 className="case-subsection-title">Field work first</h3>
<p>PNR reports showed a records problem. Riding along showed where it came from.</p>
<h3 className="case-subsection-title">What I would do differently</h3>
<p>I would protect time for at least one structured usability session before high fidelity. The informal wireframe check caught the unattended-delivery gap, but it was not designed to catch every edge case.</p>
</div>
</motion.section>

<CaseBackToContents />

{/* ══ PAGINATION ══ */}
<section className="case-pagination" aria-label="Next and previous case">
<div className="case-pagination-inner">
<Link to="/duopet" className="case-pagination-card case-pagination-prev">
<div className="case-pagination-label">Previous case</div>
<div className="case-pagination-title">
<span className="case-pagination-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
DuoPet
</div>
<div className="case-pagination-desc">Making veterinary appointment scheduling stress-free.</div>
</Link>
<Link to="/doctor" className="case-pagination-card case-pagination-next">
<div className="case-pagination-label">Next case</div>
<div className="case-pagination-title">
The questions patients asked before booking
<span className="case-pagination-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
</div>
<div className="case-pagination-desc">Patients could not find procedures, prices, or insurance before booking.</div>
</Link>
</div>
</section>

</div>
</div>
</div>
</main>

<SiteFooter tagline="Thanks for visiting. Research, interface design, and prototyping." />
</>

);
}
