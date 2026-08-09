import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { applySeo } from "@/lib/seo";
import SiteHeader from "./components/SiteHeader.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import StoryHero from "./components/StoryHero.jsx";
import TypedSectionLabel from "./components/TypedSectionLabel.jsx";

// Story hero frames: 1 foto + 1 frase por quadro. A parte comum das frases
// ("Hi! I'm Matthias and I ") fica fixa; o typewriter digita so o restante.
// As fotos ja estao recortadas em 4:5, o mesmo aspect-ratio do card, entao o
// object-fit do CSS nao corta mais nada.
const FRAMES = [
{
img: "/assets/portfolio/2026/07/story-berlin.webp",
alt: "Matthias by the Spree river in Berlin on a sunny day",
phrase: "Hi! I'm Matthias and I am a UX/UI Designer",
},
{
img: "/assets/portfolio/2026/07/story-spitz-bridge.webp",
alt: "Matthias with his German Spitz on a wooden bridge in a park",
phrase: "Hi! I'm Matthias and I am German and Brazilian",
},
{
img: "/assets/portfolio/2026/07/story-spitz-daisy.webp",
alt: "Matthias's German Spitz sniffing a daisy in the grass",
phrase: "Hi! I'm Matthias and I was a Biology teacher",
},
{
img: "/assets/portfolio/2026/07/story-cars.webp",
alt: "Matthias sitting in front of classic sports cars at an exhibition",
phrase: "Hi! I'm Matthias and I design in Figma and build in React",
},
];

export default function Document() {
const shouldReduceMotion = useReducedMotion();

useEffect(() => {
applySeo({
title: "About Matthias Schaefle | UX/UI Designer in Berlin",
description: "About Matthias Schaefle, a Brazilian-German UX/UI Designer in Berlin focused on user research, interface design, prototyping, and design systems.",
path: "/about",
ogTitle: "About Matthias Schaefle | UX/UI Designer in Berlin",
ogDescription: "A research-driven UX/UI Designer in Berlin with a Brazilian-German background.",
});
}, []);

return (
<>
<style>
{`
* {
box-sizing: border-box;
}

html {
scroll-behavior: smooth;
}

body {
margin: 0;
padding: 0;
font-family: var(--font-body);
color: var(--ink);
background: var(--bg);
min-height: 100vh;
overflow-x: hidden;
}

a {
color: inherit;
text-decoration: none;
}

img {
max-width: 100%;
display: block;
}

/* LAYOUT BASE */
.page {
min-height: 100vh;
width: 100%;
padding: 152px 16px 104px;
display: flex;
flex-direction: column;
align-items: center;
}

.page-inner {
width: 100%;
max-width: 872px;
}

@media (max-width: 768px) {
.page {
min-height: auto;
padding-top: 120px;
padding-inline: 12px;
padding-bottom: 120px;
}
}

/* Hero antigo (avatar circular) removido: o StoryHero traz seus proprios
   estilos co-localizados no componente. */

/* SEÇÕES ABOUT */
.about-sections {
display: flex;
flex-direction: column;
gap: 40px;
margin-bottom: 72px;
}

.about-row {
display: flex;
gap: 40px;
align-items: flex-start;
}

.about-label {
flex: 0 0 190px;
padding-top: 4px;
margin: 0;
font-family: var(--font-mono);
font-size: var(--label-2-size);
text-transform: uppercase;
letter-spacing: var(--label-2-track);
color: var(--ink-600);
}

.about-label.case-section-label--multiline,
.about-label .case-section-label-text--multiline,
.about-label .case-section-label-line {
align-items: flex-start;
justify-content: flex-start;
text-align: left;
}

.about-body {
flex: 1 1 auto;
font-size: 16px;
line-height: 1.7;
color: var(--ink-700);
}

.about-body p {
margin: 0 0 12px;
}

.about-body p:last-child {
margin-bottom: 0;
}

.about-body a {
color: var(--ink);
text-decoration: underline;
text-decoration-color: var(--ink-300);
text-underline-offset: 3px;
}

.about-body a:hover {
text-decoration-color: var(--ink);
}

.about-highlights {
display: flex;
flex-direction: column;
gap: 18px;
}

.about-highlight-title {
font-family: var(--font-display);
font-size: 16px;
font-weight: 600;
margin: 0;
margin-bottom: 4px;
}

.about-highlight-text {
font-size: 15px;
line-height: 1.7;
color: var(--ink-600);
}

.about-skills-subtitle {
font-size: 15px;
line-height: 1.6;
color: var(--ink-600);
}

.about-skill-groups {
display: flex;
flex-direction: column;
gap: 20px;
margin-top: 20px;
}

.about-skill-title {
margin: 0 0 9px;
font-family: var(--font-display);
font-size: 15px;
font-weight: 600;
color: var(--ink-900);
}

.about-skill-note {
margin: -2px 0 10px;
font-size: 13px;
line-height: 1.6;
color: var(--ink-600);
}

.about-skill-list {
list-style: none;
margin: 0;
padding: 0;
display: flex;
flex-wrap: wrap;
gap: 8px;
}

.about-skill-chip {
padding: 5px 9px;
border: var(--hairline);
border-radius: 999px;
font-family: var(--font-mono);
font-size: 11px;
line-height: 1.45;
color: var(--ink-700);
background: var(--ink-100);
}

@media (max-width: 768px) {
.about-row {
flex-direction: column;
gap: 12px;
}

.about-label {
flex: 0 0 auto;
font-size: 12px;
letter-spacing: var(--label-2-track);
}
.about-body {
font-size: 15px;
}
}

/* COLOPHON */
.about-colophon {
margin-top: 40px;
padding-top: 40px;
border-top: var(--hairline);
}

.about-colophon-list {
list-style: none;
margin: 0;
padding: 0;
display: flex;
flex-direction: column;
gap: 8px;
font-family: var(--font-mono);
font-size: 12px;
line-height: 1.7;
letter-spacing: 0.02em;
color: var(--ink-600);
}

.about-colophon-key {
color: var(--ink-700);
}

`}
</style>

<SiteHeader active="about" />

<main id="main" className="page">
<div className="page-inner">
<StoryHero frames={FRAMES} />

<section className="about-sections">
<div className="about-row">
<TypedSectionLabel className="about-label" prefersReducedMotion={shouldReduceMotion} standalone>
About
</TypedSectionLabel>
<div className="about-body">
<p>
I started in Biology, doing field research: watching what
animals actually do instead of what the hypothesis predicts.
It trained me to observe real behavior before drawing
conclusions.
</p>
<p>
When I moved into design I kept the method: research first,
screens second. I work as a freelancer today and I am looking
for a product team where research drives decisions.
</p>
</div>
</div>

<div className="about-row">
<TypedSectionLabel
className="about-label"
lineBreakAfter="Brazil"
prefersReducedMotion={shouldReduceMotion}
standalone
>
From Brazil to Berlin
</TypedSectionLabel>
<div className="about-body">
<p>
I was selected in Brazil for a two-year exchange in Munich,
studying Biology at TUM. I earned my German B1 certificate,
improved my English, and got to know my German relatives. I
live in Berlin now, and that time abroad is why I adapt fast
and take different perspectives seriously.
</p>
</div>
</div>

<div className="about-row">
<TypedSectionLabel
className="about-label"
lineBreakAfter="differentiates"
prefersReducedMotion={shouldReduceMotion}
standalone
>
What differentiates me as a designer
</TypedSectionLabel>
<div className="about-body">
<div className="about-highlights">
<div>
<h3 className="about-highlight-title">
Research in the field, not the deck
</h3>
<div className="about-highlight-text">
<Link to="/delivery">Delivery</Link> started with driver
routes and interviews in Barbacena, not with wireframes. The
flows came from routes of 80 to 130 stops a day.
</div>
</div>

<div>
<h3 className="about-highlight-title">
Design that survives the client
</h3>
<div className="about-highlight-text">
I designed and delivered the <Link to="/doctor">Doctor</Link>{" "}
site in 2024. The client has updated it on their own ever
since.
</div>
</div>

<div>
<h3 className="about-highlight-title">
I build what I design
</h3>
<div className="about-highlight-text">
This site is my own React build, from the design tokens to the
deploy. The <a href="#colophon">colophon below</a> lists the
stack.
</div>
</div>
</div>
</div>
</div>

<div className="about-row">
<TypedSectionLabel className="about-label" prefersReducedMotion={shouldReduceMotion} standalone>
Skills and tools
</TypedSectionLabel>
<div className="about-body">
<p className="about-skills-subtitle">What I use today and what I am building next.</p>
<div className="about-skill-groups">
<div>
<h3 className="about-skill-title">Design</h3>
<ul className="about-skill-list">
<li className="about-skill-chip">User research</li>
<li className="about-skill-chip">Interviews</li>
<li className="about-skill-chip">Field observation</li>
<li className="about-skill-chip">Wireframing</li>
<li className="about-skill-chip">Prototyping</li>
<li className="about-skill-chip">Design systems</li>
<li className="about-skill-chip">Accessibility (WCAG AA)</li>
</ul>
</div>
<div>
<h3 className="about-skill-title">Build</h3>
<ul className="about-skill-list">
<li className="about-skill-chip">Figma</li>
<li className="about-skill-chip">React</li>
<li className="about-skill-chip">Vite</li>
<li className="about-skill-chip">framer-motion</li>
<li className="about-skill-chip">HTML/CSS</li>
<li className="about-skill-chip">JavaScript</li>
<li className="about-skill-chip">Git</li>
</ul>
</div>
<div>
<h3 className="about-skill-title">Skills in development</h3>
<p className="about-skill-note">
AI Software Development program at WBS Coding School. Berufssprachkurs B2 followed by the coding curriculum.
</p>
<ul className="about-skill-list">
<li className="about-skill-chip">TypeScript</li>
<li className="about-skill-chip">Node.js</li>
<li className="about-skill-chip">Express</li>
<li className="about-skill-chip">MongoDB</li>
<li className="about-skill-chip">REST APIs</li>
<li className="about-skill-chip">LLM integration</li>
<li className="about-skill-chip">AI agents</li>
<li className="about-skill-chip">n8n automation</li>
<li className="about-skill-chip">AI-assisted development</li>
</ul>
</div>
<div>
<h3 className="about-skill-title">Languages</h3>
<ul className="about-skill-list">
<li className="about-skill-chip">Portuguese (native)</li>
<li className="about-skill-chip">English</li>
<li className="about-skill-chip">German (B1)</li>
</ul>
</div>
</div>
</div>
</div>
</section>

<section className="about-colophon" id="colophon" aria-labelledby="colophon-heading">
<div className="about-row">
<TypedSectionLabel
className="about-label"
id="colophon-heading"
lineBreakAfter="site"
prefersReducedMotion={shouldReduceMotion}
standalone
>
How this site was built
</TypedSectionLabel>
<div className="about-body">
<ul className="about-colophon-list">
<li>
<span className="about-colophon-key">Stack:</span>{" "}
React 19, Vite 7, framer-motion 12
</li>
<li>
<span className="about-colophon-key">Styling:</span>{" "}
custom design tokens, no UI framework
</li>
<li>
<span className="about-colophon-key">Motion:</span>{" "}
respects prefers-reduced-motion in CSS and in components
</li>
<li>
<span className="about-colophon-key">Imagery:</span>{" "}
custom mockup components, no stock screenshots
</li>
<li>
<span className="about-colophon-key">Loading:</span>{" "}
code-splitting per route
</li>
<li>
<span className="about-colophon-key">Deploy:</span>{" "}
build pushed to a deploy branch, published automatically
</li>
</ul>
</div>
</div>
</section>
</div>
</main>

<SiteFooter />
</>
);
}
