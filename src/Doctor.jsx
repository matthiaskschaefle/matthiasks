import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUpImmediate, floatLoop, gridStagger, sectionStagger, tiltIn, useReducedMotion as getReducedMotion, viewport as motionViewport } from "@/lib/animations";
import { applySeo } from "@/lib/seo";
import SiteHeader from "./components/SiteHeader.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import ScrollspyPill from "./components/ScrollspyPill.jsx";
import PinnedStory from "./components/PinnedStory.jsx";
import Figure from "./components/mockups/Figure.jsx";
import Frame from "./components/mockups/Frame.jsx";
import SnapGallery from "./components/mockups/SnapGallery.jsx";
import { HotspotMap, HotspotList } from "./components/mockups/Hotspot.jsx";
import TypedSectionLabel from "./components/TypedSectionLabel.jsx";

/* ---------------------------
ANNOTATED MOCKUP (PINGS)
---------------------------- */

// Image: 1256 x 4071 (current homepage evaluation)

const bulletPoints = [
{
id: 1,
x: "59.60%",
y: "2.89%",
title: "Blog section",
description:
"Maintaining the blog section is advisable, as our interviews indicate that patients often rely on this resource for information.",
},
{
id: 2,
x: "87.20%",
y: "16.88%",
title: "Surgeries list",
description: "The list of surgeries could be clearer and better structured.",
},
{
id: 3,
x: "83.00%",
y: "2.11%",
title: "FAQ section",
description:
"Including an FAQ section can be valuable for addressing common questions from prospective patients.",
},
{
id: 4,
x: "7.24%",
y: "33.42%",
title: "Grid system",
description:
"A grid system could be implemented, as the current site lacks consistency in layout.",
},
{
id: 5,
x: "87.20%",
y: "31.71%",
title: "Specialization & technique",
description:
"There is little emphasis on the doctor's specialization and technique, which limits differentiation and trust.",
},
{
id: 6,
x: "65.70%",
y: "38.59%",
title: "Doctor's page link",
description:
"There is no direct link to the page about the doctor. Adding this link builds trust and provides key information about his credentials.",
},
{
id: 7,
x: "13.60%",
y: "80.60%",
title: "Typography & blog cards",
description:
"Low contrast in fonts and inconsistencies in blog boxes can be improved to make content easier to read and scan.",
},
{
id: 8,
x: "47.70%",
y: "98.80%",
placement: "top",
title: "Clinic address",
description:
"The clinic address is missing. Including it can help users find the clinic and enhance site credibility.",
},
];

// Segundo mockup – homepage redesenhada

const bulletPointsSecondary = [
{
id: 1,
x: "70.40%",
y: "49.79%",
title: "Learn more button",
description:
'I added the "learn more" button to allow users to discover more about the doctor and his innovative technique.',
},
{
id: 2,
x: "11.33%",
y: "66.18%",
title: "Popular procedures",
description:
"I chose to feature the most popular procedures on the homepage with photos to capture users' attention and make them easier to find.",
},
{
id: 3,
x: "56.48%",
y: "88.55%",
title: "Consultation information",
description:
"I added a dedicated homepage section, guiding users to detailed information about the initial consultation process, based on our interviews highlighting its importance to patients.",
},
];
const bulletPointsSubpages = [
{
id: 1,
x: "7.50%",
y: "7.82%",
title: "Breadcrumbs navigation",
description: "Implemented breadcrumbs for enhanced navigation.",
},
{
id: 2,
x: "50.50%",
y: "65.61%",
title: "Step-by-step timeline",
description:
"I created a simple and easy-to-understand step-by-step guide, designed as a timeline, to streamline the first consultation process.",
},
// [REVISÃO MATTHIAS] Bullet "Technique explanation" removido deste mapa: na
// colagem antiga ele apontava para a SEGUNDA página (Conheça o Doutor), que
// não existe mais no print único da Primeira Consulta. O conteúdo (técnica
// exclusiva do doutor) vive na página do doutor; se quiser manter essa
// decisão anotada no case, adicionamos um print anotado daquela página.
// {
// id: 3,
// x: "85.32%",
// y: "70.21%",
// title: "Technique explanation",
// description: "Enhanced explanation of the doctor's unique technique.",
// },
];

const bulletPointsSubpages2 = [
{
id: 1,
x: "50.00%",
y: "38.00%",
title: "FAQ based on research",
description: "FAQ content shaped by insights from user research.",
},
];
const bulletPointsSubpages3 = [
{
id: 1,
x: "50.00%",
y: "35.00%",
title: "Categorized surgeries with visuals",
description:
"I organized the surgeries into categories with images to make them easier to identify, and future usability tests will validate this approach.",
},
];

const bulletPointsSubpages4 = [
{
id: 1,
x: "50.00%",
y: "60.00%",
title: "New clinic timeline",
description:
"At the doctor’s request, I highlighted the construction of the new clinic in a clear and easy-to-understand timeline.",
},
];
const MOBILE_SCREENS = [
{
src: "/assets/portfolio/2025/09/doctor-mobile-01.png",
alt: "Mobile homepage of the redesigned plastic surgeon website",
},
{
src: "/assets/portfolio/2025/09/doctor-mobile-02.png",
alt: "Mobile surgeries page with procedures grouped by category",
},
{
src: "/assets/portfolio/2025/09/doctor-mobile-03.png",
alt: "Mobile first-consultation page with the step-by-step timeline",
},
{
src: "/assets/portfolio/2025/09/doctor-mobile-04.png",
alt: "Mobile page showing other regions and the new clinic location",
},
{
src: "/assets/portfolio/2025/09/doctor-mobile-05.png",
alt: "Mobile post-operative care page",
},
];

// Native style-guide specs. Values are transcribed from the original handoff
// boards so the system stays readable, responsive, and selectable in the case.
const DOCTOR_PALETTE = [
{
group: "Primary",
swatches: [
{ name: "Base", token: "Primary-base", hex: "#092C4C" },
{ name: "Light", token: "Primary-light", hex: "#095399" },
],
},
{
group: "Secondary",
swatches: [
{ name: "Base", token: "Secondary-base", hex: "#CE8000" },
{ name: "Dark", token: "Secondary-dark", hex: "#995F00" },
],
},
{
group: "Neutral",
swatches: [
{ name: "100", token: "Neutral-100", hex: "#4F4F4F" },
{ name: "200", token: "Neutral-200", hex: "#828282" },
{ name: "300", token: "Neutral-300", hex: "#BDBDBD" },
{ name: "400", token: "Neutral-400", hex: "#E0E0E0" },
{ name: "White", token: "White", hex: "#F9F9F9" },
],
},
];

function DoctorSystemPreview() {
return (
<div
className="doctor-system-preview"
role="img"
aria-label="Live preview of the Doctor website header, typography, buttons, form field, and consultation timeline"
>
<div className="doctor-system-topbar" aria-hidden="true">
<span className="doctor-system-mark">HA</span>
<div className="doctor-system-nav">
<span>Cirurgias</span>
<span>Sobre</span>
<span>Blog</span>
</div>
<span className="doctor-ui-button doctor-ui-button--primary">Agendar consulta</span>
</div>
<div className="doctor-system-canvas" aria-hidden="true">
<div className="doctor-system-copy">
<span className="doctor-system-eyebrow">Primeira consulta</span>
<h4>Informação clara antes da primeira conversa.</h4>
<p>Uma hierarquia calma ajuda pacientes a entender o processo, preparar perguntas e decidir o próximo passo.</p>
<div className="doctor-system-actions">
<span className="doctor-ui-button doctor-ui-button--primary">Agendar consulta</span>
<span className="doctor-ui-button doctor-ui-button--secondary">Conhecer o doutor</span>
</div>
<label className="doctor-ui-field">
<span>Procedimento de interesse</span>
<span className="doctor-ui-field-value">Selecione uma opção</span>
</label>
</div>
<div className="doctor-system-panel">
<span className="doctor-system-panel-label">Como funciona</span>
<ol>
<li><span>01</span><strong>Conte sua necessidade</strong></li>
<li><span>02</span><strong>Converse com a equipe</strong></li>
<li><span>03</span><strong>Prepare sua consulta</strong></li>
</ol>
</div>
</div>
</div>
);
}

function DoctorTypography() {
return (
<div className="doctor-type-grid">
<article className="doctor-type-card doctor-type-card--barlow">
<div className="doctor-type-head">
<span className="doctor-type-aa" aria-hidden="true">Aa</span>
<div>
<h4>Barlow</h4>
<p>Headings and navigation</p>
</div>
</div>
<div className="doctor-type-scale" aria-label="Barlow heading scale">
<span className="doctor-type-h1">Heading 1</span>
<span className="doctor-type-h2">Heading 2</span>
<span className="doctor-type-h3">Heading 3</span>
<span className="doctor-type-spaced">Heading with space</span>
</div>
</article>
<article className="doctor-type-card doctor-type-card--montserrat">
<div className="doctor-type-head">
<span className="doctor-type-aa" aria-hidden="true">Aa</span>
<div>
<h4>Montserrat</h4>
<p>Body copy and interface text</p>
</div>
</div>
<div className="doctor-type-scale" aria-label="Montserrat body text scale">
<span className="doctor-type-body-lg"><strong>Large text</strong> / Regular</span>
<span className="doctor-type-body-md"><strong>Medium text</strong> / Regular</span>
<span className="doctor-type-body-base"><strong>Normal text</strong> / Regular</span>
<span className="doctor-type-body-sm"><strong>Small text</strong> / Regular</span>
</div>
</article>
</div>
);
}

function DoctorPalette() {
return (
<div className="doctor-palette">
{DOCTOR_PALETTE.map((group) => (
<div className="doctor-palette-group" key={group.group}>
<p className="doctor-palette-label">{group.group}</p>
<div className="doctor-palette-row">
{group.swatches.map((swatch) => (
<div className="doctor-swatch" key={swatch.token}>
<span className="doctor-swatch-chip" style={{ background: swatch.hex }} aria-hidden="true" />
<span className="doctor-swatch-name">{swatch.name}</span>
<span className="doctor-swatch-token">{swatch.token}</span>
<span className="doctor-swatch-hex">{swatch.hex}</span>
</div>
))}
</div>
</div>
))}
</div>
);
}

const CASE_SECTIONS = [
{ id: "overview", label: "overview" },
{ id: "style-guide", label: "style guide" },
{ id: "research", label: "research" },
{ id: "evaluation", label: "evaluation" },
{ id: "wireframes", label: "wireframes" },
{ id: "ia", label: "ia" },
{ id: "the-redesign", label: "redesign" },
{ id: "outcome", label: "outcome" },
];

// ─── Annotated mockup (hotspot system) ──────────────────────────────────────
// The annotation container (.relative w-full max-w-[872px]) is locked: the
// HotspotMap stays a direct child so the dots keep their legacy percentage
// geometry. The parity HotspotList lives outside the relative container (in
// flow inside the Frame) so it never shifts the dots' containing block.
function AnnotatedMockup({ src, alt, width, height, bullets, mapId }) {
return (
<div className="w-full flex justify-center">
{/* A lista de anotacoes fica FORA do browser frame: dentro dele lia como
    parte da pagina mockada. Fora, vira legenda editorial do artefato. */}
<div className="ms-annotated">
<Frame variant="browser">
<div className="relative w-full max-w-[872px]">
<img
src={src}
alt={alt}
className="w-full h-auto object-contain" loading="lazy" decoding="async" width={width} height={height} />
<HotspotMap bullets={bullets} mapId={mapId} />
</div>
</Frame>
<HotspotList bullets={bullets} mapId={mapId} />
</div>
</div>
);
}

export function AnimatedBullets() {
return (
<AnnotatedMockup
src="/assets/portfolio/2025/08/doctor-evaluation.webp"
alt="Current homepage annotated with the eight evaluation findings"
width="1256"
height="4071"
bullets={bulletPoints}
mapId="evaluation"
/>
);
}

function AnimatedBulletsSecondary() {
return (
<AnnotatedMockup
src="/assets/portfolio/2025/09/doctor-redesign-home.webp"
alt="Redesigned homepage annotated with three design decisions"
width="912"
height="1940"
bullets={bulletPointsSecondary}
mapId="redesign-home"
/>
);
}

function AnimatedBulletsSubpages() {
return (
<AnnotatedMockup
src="/assets/portfolio/2025/09/doctor-consultation.webp"
alt="Redesigned first-consultation subpage annotated with the design decisions"
width="1366"
height="1712"
bullets={bulletPointsSubpages}
mapId="consultation"
/>
);
}

function AnimatedBulletsSubpages2() {
return (
<AnnotatedMockup
src="/assets/portfolio/2025/09/doctor-faq.webp"
alt="Redesigned FAQ subpage annotated with one design decision"
width="1366"
height="2524"
bullets={bulletPointsSubpages2}
mapId="faq"
/>
);
}

function AnimatedBulletsSubpages3() {
return (
<AnnotatedMockup
src="/assets/portfolio/2025/09/doctor-surgeries.webp"
alt="Redesigned surgeries subpage annotated with one design decision"
width="1366"
height="5165"
bullets={bulletPointsSubpages3}
mapId="surgeries"
/>
);
}

function AnimatedBulletsSubpages4() {
return (
<AnnotatedMockup
src="/assets/portfolio/2025/09/doctor-clinic.webp"
alt="Redesigned new-clinic subpage annotated with one design decision"
width="1366"
height="5042"
bullets={bulletPointsSubpages4}
mapId="new-clinic"
/>
);
}

/* ---------------------------
PÁGINA /HELIO
---------------------------- */

export default function Document() {
const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => getReducedMotion());
const [isHeroMobile, setIsHeroMobile] = useState(() => (
typeof window !== "undefined" ? window.innerWidth < 768 : false
));
const { scrollY } = useScroll();
// Layered hero: the text block drifts as ONE layer at a single speed and
// fades all the way out while the mockup rises in the opposite direction.
const rawMockupY = useTransform(scrollY, [0, 500], [0, -60]);
const rawHeroTextY = useTransform(scrollY, [0, 500], [0, 34]);
const rawBackdropY = useTransform(scrollY, [0, 600], [0, 120]);
const heroTextFade = useTransform(scrollY, [0, 420], [1, 0]);
const parallaxDisabled = isHeroMobile || prefersReducedMotion;
const heroMockupStyle = parallaxDisabled ? undefined : { y: rawMockupY };
const heroTextStyle = parallaxDisabled ? undefined : { y: rawHeroTextY, opacity: heroTextFade };
const heroBackdropStyle = parallaxDisabled ? undefined : { y: rawBackdropY };
// Reduced-motion variants: translate-based reveals collapse to plain fades.
// Float loop only runs while the hero mockup is on screen.
const heroMockupRef = useRef(null);
const heroMockupInView = useInView(heroMockupRef);
useEffect(() => {
const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const updateMotionSettings = () => {
const prefersReduced = getReducedMotion();
setPrefersReducedMotion(prefersReduced);
setIsHeroMobile(window.innerWidth < 768);
};

updateMotionSettings();
reducedQuery.addEventListener("change", updateMotionSettings);
window.addEventListener("resize", updateMotionSettings);

return () => {
reducedQuery.removeEventListener("change", updateMotionSettings);
window.removeEventListener("resize", updateMotionSettings);
};
}, []);

useEffect(() => {
applySeo({
title: "Brand Identity for a Surgeon | UX Case Study | Matthias Schaefle",
description: "Case study of a small identity system, logo, typography and colour, built for a plastic surgeon alongside the research and information architecture for his site.",
path: "/doctor",
ogTitle: "An identity that outlived its website",
ogDescription: "A small identity system, logo, typography and colour, built alongside the research and information architecture for a plastic surgeon's site.",
});
}, []);

// TOC – seção ativa

return (
<>
<style>{`
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

.page {
min-height: 100vh;
width: 100%;
padding: 152px 16px 40px;
display: flex;
flex-direction: column;
align-items: center;
}

.page-inner {
width: 100%;
max-width: 872px;
}

@media (max-width: 768px){
.page {
min-height: auto;
padding-top: 120px;
padding-inline: 12px;
padding-bottom: 60px;
}
}

.case-hero {
position: relative;
}

.case-hero-backdrop {
position: absolute;
top: -140px;
right: -180px;
width: 560px;
height: 560px;
border-radius: 50%;
background: radial-gradient(circle at 35% 35%, rgba(var(--accent-rgb),0.10) 0%, rgba(var(--accent-rgb),0.045) 40%, transparent 70%);
pointer-events: none;
z-index: 0;
}

@media (max-width: 900px){
.case-hero-backdrop { display: none; }
}

.case-title-main {
font-family: var(--font-display);
font-size: 40px;
font-weight: 500;
letter-spacing: -0.02em;
margin: 0;
color: var(--ink);
line-height: 1.1;
}

.case-subtitle {
font-family: var(--font-body);
font-size: 16px;
line-height: 1.7;
font-weight: 400;
max-width: 520px;
color: var(--ink-600);
margin: 0;
}

.case-meta-grid {
display: grid;
grid-template-columns: repeat(4, minmax(0, 1fr));
gap: 16px;
margin-top: 8px;
position: relative;
z-index: 3;
}

.case-meta-motion {
min-width: 0;
display: flex;
}

.case-meta-motion .case-meta-item {
width: 100%;
}

.case-meta-item {
padding: 12px 0;
border-top: var(--hairline);
}

.case-meta-label {
font-family: var(--font-mono);
font-size: var(--label-1-size);
text-transform: uppercase;
letter-spacing: var(--label-1-track);
color: var(--ink-600);
margin-bottom: 6px;
}

.case-meta-value {
font-family: var(--font-body);
font-size: 14px;
color: var(--ink-800);
}

/* ── IN SHORT (hero summary) ── */
.in-short {
display: grid;
grid-template-columns: repeat(3, minmax(0, 1fr));
gap: 36px;
margin-top: 28px;
padding-top: 24px;
border-top: var(--hairline);
position: relative;
z-index: 3;
}

.in-short-label {
font-family: var(--font-mono);
font-size: var(--label-1-size);
text-transform: uppercase;
letter-spacing: var(--label-1-track);
color: var(--ink-600);
margin-bottom: 8px;
}

.in-short-text {
font-family: var(--font-body);
font-size: 15px;
line-height: 1.6;
color: var(--ink-700);
margin: 0;
}

@media (max-width: 900px){
.in-short {
grid-template-columns: 1fr;
}
}

.case-hero-mockup-wrap {
margin-top: 16px;
display: flex;
align-items: center;
justify-content: center;
position: relative;
padding: 24px 0 0;
z-index: 1;
}

/* Ondas concêntricas do radar */

.case-hero-mockup {
position: relative;
z-index: 3;
}

.case-hero-mockup img {
display: block;
max-width: 540px;
width: 100%;
height: auto;
}

@media (max-width: 1024px){
.case-title-main { font-size: 34px; }

.case-meta-grid {
grid-template-columns: repeat(2, minmax(0, 1fr));
}

}

@media (max-width: 768px){
.case-title-main { font-size: 32px; }

.case-hero-mockup-wrap {
padding: 20px 0 14px;
}

}

/* LAYOUT COM MENU LATERAL */
.case-layout {
position: relative;
margin-top: 32px;
}

@media (max-width: 768px){
.case-layout {
margin-top: 12px;
}






}

.case-section {
display: grid;
grid-template-columns: minmax(120px, 190px) minmax(0, 1fr);
gap: 20px 40px;
padding-block: 32px;
scroll-margin-top: 140px;
}

.case-section:not(:first-child) {
border-top: var(--hairline);
}

.case-section:last-of-type {
border-bottom: var(--hairline);
margin-bottom: 32px;
}

.case-section-label {
font-family: var(--font-mono);
font-size: var(--label-2-size);
text-transform: uppercase;
letter-spacing: var(--label-2-track);
color: var(--ink-600);
opacity: 0.75;
padding-top: 4px;
margin: 0;
}

.case-section-label::before {
content: "";
display: inline-block;
width: 22px;
height: 1.5px;
background: var(--brand-600);
margin-right: 10px;
vertical-align: middle;
}

.case-section-body {
font-family: var(--font-body);
font-size: 16px;
line-height: 1.8;
color: var(--ink-800);
max-width: var(--measure-body);
}

.case-section-body-secondary {
grid-column: 2 / 3;
margin-top: 24px;
}

.case-section-body p {
margin: 0 0 14px;
}

.case-section-body p:last-child {
margin-bottom: 0;
}

.case-disclaimer {
margin-top: 4px;
font-size: 13px;
line-height: 1.6;
font-style: italic;
color: var(--ink-600);
}

.case-section-body ul {
margin: 0 0 14px 18px;
padding: 0;
}

.case-section-body li {
margin-bottom: 6px;
}

.case-subsection-title {
font-family: var(--font-display);
font-size: 17px;
font-weight: 600;
margin: 18px 0 6px;
color: var(--ink-800);
}

.case-subsection-title:first-child {
margin-top: 0;
}

@media (max-width: 768px){
.case-section {
grid-template-columns: 1fr;
gap: 16px;
padding-block: 24px;
}

.case-section-label {
font-size: var(--label-1-size);
letter-spacing: var(--label-1-track);
opacity: 0.75;
}

.case-section-body-secondary {
grid-column: 1 / -1;
margin-top: 16px;
}

.case-section-body {
font-size: 15px;
}
}

.research-full {
grid-column: 1 / -1;
max-width: 872px;
margin: 0 auto;
width: 100%;
}

.research-grid {
display: grid;
grid-template-columns: repeat(3, minmax(0, 1fr));
gap: 16px;
margin-top: 18px;
}

.research-card {
position: relative;
padding: 20px 0 0;
border-top: var(--hairline);
}

.research-number {
font-family: var(--font-display);
font-size: 30px;
font-weight: 600;
line-height: 1.1;
letter-spacing: -0.02em;
color: var(--ink-900);
margin-bottom: 10px;
}

.research-title {
font-family: var(--font-display);
font-size: 16px;
font-weight: 700;
margin: 0 0 10px;
color: var(--ink-900);
letter-spacing: -0.01em;
line-height: 1.4;
}

.research-text {
font-size: 14px;
line-height: 1.75;
color: var(--ink-600);
margin: 0;
}

@media (max-width: 768px){
.research-grid {
grid-template-columns: 1fr;
}
}

.case-gallery {
margin-top: 26px;
}

.case-gallery-grid {
display: grid;
grid-template-columns: repeat(2, minmax(0, 1fr));
gap: 16px;
}

.case-gallery-hint {
margin-top: 10px;
font-size: 13px;
color: var(--ink-600);
}

@media (max-width: 768px){
.case-gallery-grid {
grid-template-columns: 1fr;
gap: 20px;
}
.case-gallery-hint {
font-weight: 600;
color: var(--ink-900);
}
}

.case-wireframes {
margin-top: 24px;
}

.case-wireframes-text {
font-size: 14px;
color: var(--ink-600);
margin: 4px 0 14px;
}

.case-wireframes-grid {
display: grid;
grid-template-columns: repeat(3, minmax(0, 1fr));
gap: 16px;
}

@media (max-width: 768px){
.case-wireframes-grid {
grid-template-columns: 1fr;
}
.case-wireframes-grid .ms-figure {
transform: none !important;
}
}

.case-ia {
margin-top: 20px;
}

.style-guide-image {
margin-top: 20px;
}

.style-guide-image-inner {
background: #FFFFFF;
border: var(--hairline);
border-radius: 16px;
overflow: hidden;
}

.style-guide-image-inner img {
width: 100%;
height: auto;
display: block;
}

/* The vertical lockup is the primary mark: it is the one applied to the
physical items, so it gets the full column. The horizontal variant sits
under it at a smaller scale. */
.style-guide-logo-hero {
margin-top: 20px;
background: #FFFFFF;
border: var(--hairline);
border-radius: 16px;
padding: 80px 32px;
display: flex;
align-items: center;
justify-content: center;
}

.style-guide-logo-hero img {
width: min(420px, 100%);
height: auto;
display: block;
}

.style-guide-logo-variant {
margin-top: 16px;
background: #FFFFFF;
border: var(--hairline);
border-radius: 16px;
padding: 40px 24px;
display: flex;
align-items: center;
justify-content: center;
}

.style-guide-logo-variant img {
width: min(280px, 100%);
height: auto;
display: block;
}

/* Native Doctor style guide. These are real interface elements rather than
   screenshots of the handoff board, so they stay crisp and responsive. */
.doctor-system-preview {
margin-top: 22px;
border: 1px solid #D9DDE1;
border-radius: 18px;
overflow: hidden;
background: #F9F9F9;
color: #092C4C;
}

.doctor-system-topbar {
min-height: 62px;
display: flex;
align-items: center;
gap: 20px;
padding: 12px 16px;
background: #FFFFFF;
border-bottom: 1px solid #E0E0E0;
font-family: "Montserrat", var(--font-body);
}

.doctor-system-mark {
width: 34px;
height: 34px;
display: inline-flex;
align-items: center;
justify-content: center;
border: 1px solid #092C4C;
border-radius: 50%;
font-family: "Barlow", var(--font-display);
font-size: 12px;
font-weight: 700;
letter-spacing: 0.04em;
flex: 0 0 auto;
}

.doctor-system-nav {
display: flex;
gap: 18px;
margin-right: auto;
font-size: 9px;
font-weight: 600;
letter-spacing: 0.08em;
text-transform: uppercase;
}

.doctor-ui-button {
display: inline-flex;
align-items: center;
justify-content: center;
min-height: 34px;
padding: 8px 13px;
border-radius: 2px;
font-family: "Montserrat", var(--font-body);
font-size: 9px;
font-weight: 700;
letter-spacing: 0.06em;
line-height: 1.2;
text-transform: uppercase;
white-space: nowrap;
}

.doctor-ui-button--primary {
background: #995F00;
color: #FFFFFF;
}

.doctor-ui-button--secondary {
border: 1px solid #092C4C;
background: #FFFFFF;
color: #092C4C;
}

.doctor-system-canvas {
display: grid;
grid-template-columns: minmax(0, 1.15fr) minmax(210px, 0.85fr);
gap: 24px;
padding: 30px;
background:
radial-gradient(circle at 8% 12%, rgba(206,128,0,0.08), transparent 35%),
#F9F9F9;
}

.doctor-system-copy {
display: flex;
flex-direction: column;
align-items: flex-start;
}

.doctor-system-eyebrow,
.doctor-system-panel-label {
font-family: "Montserrat", var(--font-body);
font-size: 9px;
font-weight: 700;
letter-spacing: 0.16em;
text-transform: uppercase;
}

.doctor-system-eyebrow { color: #995F00; }
.doctor-system-panel-label { color: #CE8000; }

.doctor-system-copy h4 {
margin: 8px 0 10px;
max-width: 15ch;
font-family: "Barlow", var(--font-display);
font-size: clamp(27px, 4vw, 38px);
font-weight: 600;
line-height: 1.02;
letter-spacing: -0.02em;
color: #092C4C;
}

.doctor-system-copy p {
margin: 0;
max-width: 45ch;
font-family: "Montserrat", var(--font-body);
font-size: 11px;
line-height: 1.65;
color: #4F4F4F;
}

.doctor-system-actions {
display: flex;
flex-wrap: wrap;
gap: 8px;
margin-top: 18px;
}

.doctor-ui-field {
width: 100%;
display: flex;
flex-direction: column;
gap: 6px;
margin-top: 24px;
font-family: "Montserrat", var(--font-body);
font-size: 9px;
font-weight: 600;
color: #4F4F4F;
}

.doctor-ui-field-value {
display: flex;
align-items: center;
min-height: 38px;
padding: 8px 11px;
border: 1px solid #BDBDBD;
background: #FFFFFF;
font-size: 10px;
font-weight: 400;
color: #828282;
}

.doctor-system-panel {
padding: 22px;
background: #092C4C;
color: #FFFFFF;
align-self: stretch;
}

.doctor-system-panel ol {
display: flex;
flex-direction: column;
gap: 0;
margin: 16px 0 0;
padding: 0;
list-style: none;
}

.doctor-system-panel li {
display: grid;
grid-template-columns: 28px 1fr;
gap: 10px;
align-items: center;
min-height: 58px;
margin: 0;
border-top: 1px solid rgba(255,255,255,0.22);
font-family: "Montserrat", var(--font-body);
}

.doctor-system-panel li span {
font-size: 10px;
color: #CE8000;
}

.doctor-system-panel li strong {
font-size: 11px;
font-weight: 600;
line-height: 1.4;
}

.doctor-type-grid {
display: grid;
grid-template-columns: repeat(2, minmax(0, 1fr));
gap: 16px;
margin-top: 16px;
}

.doctor-type-card {
min-width: 0;
padding: 20px;
border: var(--hairline);
border-radius: 16px;
background: #FFFFFF;
color: #092C4C;
}

.doctor-type-card--barlow { font-family: "Barlow", var(--font-display); }
.doctor-type-card--montserrat { font-family: "Montserrat", var(--font-body); }

.doctor-type-head {
display: flex;
align-items: center;
gap: 14px;
padding-bottom: 16px;
border-bottom: 1px solid #E0E0E0;
}

.doctor-type-aa {
font-size: 46px;
font-weight: 400;
line-height: 0.9;
color: #BDBDBD;
}

.doctor-type-head h4 {
margin: 0;
font: inherit;
font-size: 18px;
font-weight: 600;
color: #092C4C;
}

.doctor-type-head p {
margin: 2px 0 0;
font: inherit;
font-size: 10px;
line-height: 1.4;
color: #828282;
}

.doctor-type-scale {
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 9px;
padding-top: 17px;
color: #092C4C;
}

.doctor-type-h1 { font-size: 26px; font-weight: 700; line-height: 1; }
.doctor-type-h2 { font-size: 21px; font-weight: 500; line-height: 1.1; }
.doctor-type-h3 { font-size: 17px; font-weight: 500; }
.doctor-type-spaced { font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; }
.doctor-type-body-lg { font-size: 15px; }
.doctor-type-body-md { font-size: 13px; }
.doctor-type-body-base { font-size: 11px; }
.doctor-type-body-sm { font-size: 9px; }

.doctor-palette {
margin-top: 16px;
}

.doctor-palette-group {
margin-bottom: 22px;
}

.doctor-palette-group:last-child { margin-bottom: 0; }

.doctor-palette-label {
margin: 0 0 10px !important;
font-family: var(--font-mono);
font-size: 10px;
font-weight: 500;
letter-spacing: 0.18em;
text-transform: uppercase;
color: var(--ink-600);
}

.doctor-palette-row {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
gap: 12px;
}

.doctor-swatch {
min-width: 0;
display: flex;
flex-direction: column;
gap: 3px;
}

.doctor-swatch-chip {
display: block;
height: 54px;
margin-bottom: 3px;
border: 1px solid rgba(9,44,76,0.12);
border-radius: 10px;
}

.doctor-swatch-name {
font-family: "Montserrat", var(--font-body);
font-size: 11px;
font-weight: 600;
color: #092C4C;
}

.doctor-swatch-token,
.doctor-swatch-hex {
overflow-wrap: anywhere;
font-family: var(--font-mono);
font-size: 9px;
line-height: 1.4;
color: var(--ink-600);
}

.doctor-swatch-hex { color: #995F00; }

@media (max-width: 768px){
.style-guide-logo-hero { padding: 48px 20px; }
.style-guide-logo-variant { padding: 28px 20px; }

.doctor-system-nav { display: none; }
.doctor-system-topbar { gap: 12px; }
.doctor-system-topbar .doctor-ui-button { margin-left: auto; }
.doctor-system-canvas { grid-template-columns: 1fr; padding: 20px; }
.doctor-type-grid { grid-template-columns: 1fr; }
.doctor-palette-row { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

/* ── Case Pagination ── */
.case-pagination { margin-top: 48px; margin-bottom: 24px; }
.case-pagination-inner { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
.case-pagination-card {
display: flex; flex-direction: column; gap: 6px;
padding: 20px 0 0; border-top: var(--hairline);
text-decoration: none;
}
.case-pagination-label {
font-family: var(--font-mono); font-size: var(--label-1-size);
text-transform: uppercase; letter-spacing: var(--label-1-track); color: var(--ink-600);
transition: color .18s ease;
}
.case-pagination-card:hover .case-pagination-label { color: var(--brand-500); }
.case-pagination-title {
display: flex; align-items: center; gap: 8px;
font-family: var(--font-display); font-size: 15px; font-weight: 600; color: var(--ink-900);
}
.case-pagination-arrow {
display: inline-flex; align-items: center; flex-shrink: 0;
color: var(--ink-900);
transition: transform .18s ease;
}
.case-pagination-prev:hover .case-pagination-arrow { transform: translateX(-4px); }
.case-pagination-next:hover .case-pagination-arrow { transform: translateX(4px); }
.case-pagination-desc { font-family: var(--font-body); font-size: 13px; line-height: 1.6; color: var(--ink-600); }
.case-pagination-prev { text-align: left; }
.case-pagination-prev .case-pagination-title { flex-direction: row-reverse; justify-content: flex-end; }
.case-pagination-next { text-align: right; }
.case-pagination-next .case-pagination-title { justify-content: flex-end; }
@media (max-width: 768px){
.case-pagination-inner { grid-template-columns: 1fr; gap: 14px; }
.case-pagination-next { text-align: left; }
.case-pagination-next .case-pagination-title { justify-content: flex-start; }
}

/* MOBILE VERSION – SnapGallery spacing */
.mobile-version-block {
margin-top: 24px;
}

/* Minimal eyebrow label */
.case-label{
margin: 0 0 10px 0; /* small separation from H1, adjust only if needed */
padding: 0;
border: 0;
background: transparent;
box-shadow: none;
text-transform: uppercase;
letter-spacing: var(--label-2-track);
font-size: var(--label-2-size);
line-height: 1;
color: rgba(15,14,12,0.62);
}

/* ── MOBILE ── */
@media (max-width: 768px){
html, body { overflow-x: hidden !important; max-width: 100% !important; }
.page { padding-inline: 12px !important; overflow-x: hidden; }
.page-inner { overflow-x: hidden; max-width: 100% !important; }
.case-layout,.case-content-column,.case-section,.research-full { overflow-x: hidden !important; max-width: 100% !important; }
.case-section { grid-template-columns: 1fr !important; }
.case-section-body-secondary { grid-column: 1 !important; }

.research-grid { grid-template-columns: 1fr !important; }
.case-meta-grid { grid-template-columns: repeat(2,minmax(0,1fr)) !important; }
.case-pagination-inner { grid-template-columns: 1fr !important; }
}

.research-grid--two {
grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
}
@media (max-width: 768px){
.research-grid--two {
grid-template-columns: 1fr !important;
}
}

`}</style>

<SiteHeader />
<ScrollspyPill sections={CASE_SECTIONS} />

<main id="main" className="page">
<div className="page-inner">
{/* HERO CASE */}
<section className="case-hero">
<motion.div className="case-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
<motion.div style={heroTextStyle}>
<p className="case-label">CLIENT PROJECT, BRAND IDENTITY, 2024</p>
<h1 className="case-title-main">
An identity that outlived its website
</h1>
<p className="case-subtitle">
Dr. H&eacute;lio needed a mark patients would trust before they ever
met him. I built a small identity system, logo, typography and colour,
alongside the research, information architecture and the WordPress build we
delivered for his site. The site has since been rebuilt by another team. The
identity stayed.
</p>
</motion.div>

<div className="case-meta-grid">
<motion.div className="case-meta-motion" {...fadeUpImmediate(0, prefersReducedMotion)}>
<div className="case-meta-item">
<div className="case-meta-label">Team</div>
<div className="case-meta-value">
Matthias Karl Schaefle / Leticia Magri
</div>
</div>
</motion.div>
<motion.div className="case-meta-motion" {...fadeUpImmediate(1, prefersReducedMotion)}>
<div className="case-meta-item">
<div className="case-meta-label">Scope of work</div>
<div className="case-meta-value">
User research, wireframes, UI design, prototyping, WordPress build
</div>
</div>
</motion.div>
<motion.div className="case-meta-motion" {...fadeUpImmediate(2, prefersReducedMotion)}>
<div className="case-meta-item">
<div className="case-meta-label">Role</div>
<div className="case-meta-value">UX/UI Designer</div>
</div>
</motion.div>
<motion.div className="case-meta-motion" {...fadeUpImmediate(3, prefersReducedMotion)}>
<div className="case-meta-item">
<div className="case-meta-label">Year</div>
<div className="case-meta-value">2024</div>
</div>
</motion.div>
</div>

{/* [REVISÃO MATTHIAS] In short: new summary block, copy pending owner review */}
<div className="in-short">
<div className="in-short-item">
<div className="in-short-label">Problem</div>
<p className="in-short-text">Patients arrived with the same questions before booking: procedures, prices, insurance.</p>
</div>
<div className="in-short-item">
<div className="in-short-label">My role</div>
<p className="in-short-text">UX/UI design from research to launch: IA, page system, mobile, WordPress build.</p>
</div>
<div className="in-short-item">
<div className="in-short-label">Result</div>
<p className="in-short-text">Logo and palette in use since 2024.</p>
</div>
</div>

<div className="case-hero-mockup-wrap" aria-hidden="true" ref={heroMockupRef}>
<motion.div style={heroMockupStyle}>
<motion.div
className="case-hero-mockup"
variants={floatLoop}
animate={!prefersReducedMotion && heroMockupInView ? "animate" : undefined}
>
<img
src="/assets/portfolio/2025/11/mockup-helio.png"
alt="Website redesign mockup for Dr. Hélio" loading="eager" decoding="async" width="1200" height="760" />
</motion.div>
</motion.div>
</div>
</section>

{/* [REVISÃO MATTHIAS] Doctor PinnedStory context copy, compressed from the existing Overview. */}
<PinnedStory
steps={[
{
id: "context",
label: "Context",
title: "The website was not supporting patient decisions",
body: "The existing site had unclear navigation, inconsistent hierarchy, and gaps in the information patients expected before booking.",
img: "/assets/portfolio/2025/08/doctor-evaluation.webp",
alt: "Previous Doctor homepage evaluated against patient needs",
},
// [REVISÃO MATTHIAS] Doctor PinnedStory research copy, compressed from the existing Research section.
{
id: "research",
label: "Research",
title: "Five patient interviews mapped the questions before booking",
body: "Interviews and Instagram question stickers revealed recurring doubts about insurance, pricing, payment, procedures, and recovery.",
img: "/assets/portfolio/2025/09/doctor-consultation.webp",
alt: "First-consultation page shaped by patient research",
},
// [REVISÃO MATTHIAS] Doctor PinnedStory insight copy, compressed from the existing Research findings.
{
id: "insight",
label: "Insight",
title: "The same doubts kept returning",
body: "Patients needed clearer answers, stronger trust signals, and content structured around the questions they ask before contacting a clinic.",
img: "/assets/portfolio/2025/09/doctor-faq.webp",
alt: "FAQ page organized around recurring patient questions",
},
// [REVISÃO MATTHIAS] Doctor PinnedStory solution copy, compressed from the existing Overview highlights.
{
id: "solution",
label: "Solution",
title: "A calmer page system built around patient questions",
body: "We reorganized the information architecture and designed responsive pages that made services, consultation details, and credentials easier to understand.",
img: "/assets/portfolio/2025/09/doctor-redesign-home.webp",
alt: "Redesigned Doctor homepage",
},
]}
/>

{/* LAYOUT PRINCIPAL */}
<div className="case-layout">

<div className="case-content-column">
{/* OVERVIEW */}
<motion.section id="overview" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Overview</TypedSectionLabel>
<div className="case-section-body">
<h3 className="case-subsection-title">Background</h3>
<p>
The doctor is a plastic surgeon in Sao Paulo,
Brazil, with 16 years of experience. Specializing in
corrective body surgeries, his website showcases his
expertise, attracts new patients, and provides detailed
service information.
</p>

<h3 className="case-subsection-title">Problem</h3>
<p>
The existing website had unclear navigation, inconsistent
visual hierarchy, and gaps in the information patients
expected to find before booking. The result was a digital
experience that did not fully reflect the doctor's expertise
or support the trust-building process patients need in a
healthcare context.
</p>

<h3 className="case-subsection-title">My role</h3>
{/* [REVISÃO MATTHIAS] rewritten with ownership verbs */}
<p>
I designed the information architecture and the page
system, synthesized the patient research into content
priorities, and created the visual identity, including
the logo. I also prepared the style guide, then built the
site in WordPress.
</p>

<p>
<strong>Highlights</strong>
<br />
We reorganized information around patient questions, created
a calmer visual system, and designed responsive pages that
made services, consultation details, and the doctor's
credentials easier to understand.
</p>
</div>

</motion.section>

{/* STYLE GUIDE */}
<motion.section id="style-guide" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Style guide</TypedSectionLabel>
<div className="case-section-body">
<h4 className="case-subsection-title">
One reference for the whole team
</h4>
<p>
I put together a structured style guide so future pages
could follow the same visual logic. It gave the team a
shared reference for spacing, typography, colors, and core
components.
</p>

<DoctorSystemPreview />

<h3 className="case-subsection-title">Brand identity</h3>
<p>
I designed the logo to feel professional, personal, and
appropriate for a healthcare context, then used it as a core
element of the visual system.
</p>

<div className="style-guide-logo-hero">
<img
src="/assets/portfolio/2025/12/Logo-Vertical.png"
alt="Primary logo, the HA monogram stacked above the doctor's full name" loading="lazy" decoding="async" width="1200" height="800" />
</div>
<div className="style-guide-logo-variant">
<img
src="/assets/portfolio/2025/12/Logo-horizontal.png"
alt="Horizontal variant of the logo, the monogram beside the doctor's full name" loading="lazy" decoding="async" width="1200" height="800" />
</div>

<p>
The identity was also prepared for physical touchpoints,
including items given to patients.
</p>

<div className="style-guide-image">
<div className="style-guide-image-inner">
<img
src="/assets/portfolio/2025/09/Logobags-image.png"
alt="Brand applied to physical items such as bags given to patients" loading="lazy" decoding="async" width="1200" height="800" />
</div>
</div>

<h3 className="case-subsection-title">Typography</h3>
<p>
We chose Barlow for the header for its modern aesthetic and
clean lines, and Montserrat for the body text for its
legibility on various devices.
</p>

<DoctorTypography />

<h3 className="case-subsection-title">Colors</h3>
<p>
Blue, requested by the stakeholder, for trust and
professionalism; gray for an elegant backdrop; and orange
for dynamic contrast and attention.
</p>

<DoctorPalette />
</div>
</motion.section>

{/* RESEARCH */}
<motion.section id="research" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Research</TypedSectionLabel>

<div className="case-section-body">
<h3 className="case-subsection-title">
Exploring needs and perspectives
</h3>
<p>
The stakeholder interview helped us understand the business
goals, the doctor's differentiators, and which parts of the
old website were no longer supporting the clinic's growth.
</p>
</div>

<div className="research-full">
<div className="research-grid">
<article className="research-card">
<div className="research-number">01</div>
<h4 className="research-title">Primary objectives</h4>
<p className="research-text">
Present the doctor's expertise clearly, attract new
patients, keep existing clients informed, and strengthen
the clinic's online presence.
</p>
</article>

<article className="research-card">
<div className="research-number">02</div>
<h4 className="research-title">
Highlighting medical innovations
</h4>
<p className="research-text">
The doctor wanted his technique and specialization to be
easier to understand and more visible in the experience.
</p>
</article>

<article className="research-card">
<div className="research-number">03</div>
<h4 className="research-title">
Blue as part of the brand
</h4>
<p className="research-text">
Blue was important to the stakeholder, so we kept it as
part of the system while making the palette calmer and
more consistent.
</p>
</article>
</div>
</div>

<div className="case-section-body case-section-body-secondary">
<h3 className="case-subsection-title">
Understanding patient needs
</h3>
<p>
To understand what patients look for before contacting a
clinic, I interviewed five patients and mapped their most
frequent questions.
</p>
<p>
Together with the social media and marketing team, we used
Instagram question stickers to collect common doubts quickly
and then grouped them into themes.
</p>
</div>

<div className="research-full">
<div className="case-gallery">
<div className="case-gallery-grid">
<Figure
src="/assets/portfolio/2025/08/Feedback-Insurance-1.png"
alt="Feedback about insurance information"
zoom
caption={{ text: "Insurance feedback" }}
/>
<Figure
src="/assets/portfolio/2025/08/Feedback-Prices-768x726.png"
alt="Feedback about prices"
zoom
caption={{ text: "Price feedback" }}
/>
<Figure
src="/assets/portfolio/2025/08/Feedback-Information-1-768x726.png"
alt="Feedback about information clarity"
zoom
caption={{ text: "Information feedback" }}
/>
<Figure
src="/assets/portfolio/2025/08/Feedback-Others-768x722.png"
alt="Other qualitative feedback"
zoom
caption={{ text: "Other insights" }}
/>
</div>

<p className="case-gallery-hint">
Click any screen to see it in detail.
</p>
</div>
</div>

<div className="case-section-body case-section-body-secondary">
<p>
These methods revealed recurring patterns in patient
doubts and expectations. Those patterns shaped the new
website structure, content hierarchy, and visual priorities.
</p>
</div>

<div className="research-full">
<div className="research-grid">
<article className="research-card">
<div className="research-number">01</div>
<h4 className="research-title">Common inquiries</h4>
<p className="research-text">
Patients often have recurring questions about insurance,
pricing and payment. Making this information easy to
find became a priority.
</p>
</article>

<article className="research-card">
<div className="research-number">02</div>
<h4 className="research-title">
Transparency and feedback
</h4>
<p className="research-text">
Testimonials and visual proof are strong decision
drivers. At the same time, the content must respect
local regulations on before-and-after photos.
</p>
</article>

<article className="research-card">
<div className="research-number">03</div>
<h4 className="research-title">
Pre-procedure research
</h4>
<p className="research-text">
Many patients study blogs and posts before booking,
looking for indications, risks, recovery and realistic
results. The website needed to support this journey with
clearer, structured content.
</p>
</article>
</div>
</div>
</motion.section>

{/* EVALUATION */}
<motion.section id="evaluation" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Evaluation</TypedSectionLabel>
<div className="case-section-body">
<h3 className="case-subsection-title">
Analyzing the current interface
</h3>
<p>
I reviewed the current homepage against the research
findings, looking for places where navigation, trust signals,
and content hierarchy could better support patient decisions.
</p>
</div>

<div className="research-full">
<AnimatedBullets />
</div>
</motion.section>

{/* WIREFRAMES */}
<motion.section id="wireframes" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Wireframes</TypedSectionLabel>
<div className="case-section-body">
<h3 className="case-subsection-title">
Turning research into page structure
</h3>
<p className="case-wireframes-text">
The wireframes helped translate patient questions into clear
page flows before visual design decisions took over.
</p>
</div>

<div className="research-full">
<div className="case-wireframes">

<motion.div className="case-wireframes-grid" variants={gridStagger}>
<Figure
src="/assets/portfolio/2025/12/Wireframe-Agendar-consulta.png"
alt="Wireframe – appointment booking flow"
zoom
variants={tiltIn(-1.2, prefersReducedMotion)}
/>
<Figure
src="/assets/portfolio/2025/12/Wireframe-Procedure-2.png"
alt="Wireframe – procedure detail page"
zoom
variants={tiltIn(0, prefersReducedMotion)}
/>
<Figure
src="/assets/portfolio/2025/12/Wireframe-Landing-Page-1.png"
alt="Wireframe – landing page structure"
zoom
variants={tiltIn(1.2, prefersReducedMotion)}
/>
</motion.div>
</div>
</div>
</motion.section>

{/* IA */}
<motion.section id="ia" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion} lineBreakAfter="Information">Information architecture</TypedSectionLabel>

<div className="case-section-body">
<h3 className="case-subsection-title">
Restructuring navigation
</h3>
<p>
We redesigned the website structure so patients could move
from general interest to specific procedures, consultation
details, and contact information with fewer detours.
</p>
</div>

<div className="research-full">
<div className="case-ia">
<Figure
src="/assets/portfolio/2025/12/IA-image.png"
alt="Information architecture diagram for the redesigned website"
zoom
/>
</div>
</div>
</motion.section>

{/* THE REDESIGN */}
<motion.section id="the-redesign" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>The redesign</TypedSectionLabel>

<div className="case-section-body">
<h3 className="case-subsection-title">
Crafting a Cohesive Experience
</h3>
<p>
The redesign makes the site feel calmer, easier to scan, and
more aligned with the level of trust patients need before
booking a consultation.
</p>
<p className="case-disclaimer">
Please note that the current live version of the website is
no longer under my control.
</p>
</div>

<div className="research-full" style={{ marginTop: "24px" }}>
<AnimatedBulletsSecondary />
</div>

{/* Subpages – título + novo mockup com bullets */}
<div
className="case-section-body case-section-body-secondary"
style={{ marginTop: "32px" }}
>
<h3 className="case-subsection-title">Subpages</h3>
</div>

<div className="research-full" style={{ marginTop: "16px" }}>
<AnimatedBulletsSubpages />
</div>

<div className="research-full" style={{ marginTop: "24px" }}>
<AnimatedBulletsSubpages2 />
</div>

<div className="research-full" style={{ marginTop: "24px" }}>
<AnimatedBulletsSubpages3 />
</div>

<div className="research-full" style={{ marginTop: "24px" }}>
<AnimatedBulletsSubpages4 />
</div>
{/* Mobile version */}
<div className="case-section-body case-section-body-secondary" style={{ marginTop: "32px" }}>
<h3 className="case-subsection-title">Mobile version</h3>
</div>

<div className="research-full mobile-gallery-shell">
<div className="mobile-version-block">
<SnapGallery label="Mobile screens" items={MOBILE_SCREENS} className="ms-snap--exported ms-snap--large ms-snap--depth" />
</div>
</div>

</motion.section>

{/* OUTCOME */}

<motion.section id="outcome" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Outcome</TypedSectionLabel>

<div className="case-section-body">
{/* [REVISÃO MATTHIAS] new Outcome section; absorbs the old "next steps" block and the delivery status note */}
<p>
The redesign was delivered as a complete system: a new
information architecture, a page system covering the
homepage and the key subpages, a mobile version, and a
style guide documenting the visual system. I built the site
in WordPress. The screens shown here reflect the design as
delivered.
</p>
</div>
</motion.section>

{/* ── Paginação ── */}
<section className="case-pagination" aria-label="Next and previous case">
<div className="case-pagination-inner">
<Link to="/delivery" className="case-pagination-card case-pagination-prev">
<div className="case-pagination-label">Previous case</div>
<div className="case-pagination-title">
<span className="case-pagination-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
The New Delivery Experience
</div>
<div className="case-pagination-desc">
Redesigning the delivery confirmation flow for drivers.
</div>
</Link>
<Link to="/duopet" className="case-pagination-card case-pagination-next">
<div className="case-pagination-label">Next case</div>
<div className="case-pagination-title">
DuoPet
<span className="case-pagination-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
</div>
<div className="case-pagination-desc">
Making veterinary appointment scheduling stress-free.
</div>
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
