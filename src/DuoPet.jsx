import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { barGrow, DURATION, EASE, fadeIn, fadeUp, fadeUpImmediate, floatLoop, sectionStagger, useReducedMotion as getReducedMotion, viewport as motionViewport } from "@/lib/animations";
import { applySeo } from "@/lib/seo";
import CountUp from "./components/CountUp.jsx";
import SiteHeader from "./components/SiteHeader.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import ScrollspyPill from "./components/ScrollspyPill.jsx";
import PinnedStory from "./components/PinnedStory.jsx";
import Figure from "./components/mockups/Figure.jsx";
import SnapGallery from "./components/mockups/SnapGallery.jsx";
import TypedSectionLabel from "./components/TypedSectionLabel.jsx";

/**
* DuoPet - v1.0.5
* Structure matches the /doctor canonical layout (header/footer/toc/grid).
* Image URLs are placeholders - replace later.
*/

const CASE_SECTION_IDS = ["overview", "research", "decisions", "design", "results", "reflections"];

const CASE_SECTIONS = [
{ id: "overview", label: "overview" },
{ id: "research", label: "research" },
{ id: "decisions", label: "decisions" },
{ id: "design", label: "design" },
{ id: "results", label: "results" },
{ id: "reflections", label: "reflections" },
];

const SEO_TITLE = "DuoPet Vet Booking | UX Case Study | Matthias Schaefle";
const SEO_DESCRIPTION = "UX course project for a veterinary appointment prototype, covering research, information architecture, interaction design, and usability testing.";
const SEO_OG_TITLE = "DuoPet Vet Booking | UX Case Study";
const SEO_OG_DESCRIPTION = "A tested mobile concept designed to make veterinary appointment booking faster and less stressful.";

function NumberCard({ number, title, description }) {
return (
<motion.article className="research-card" variants={fadeUp}>
<div className="research-number">{number}</div>
<h4 className="research-title">{title}</h4>
<p className="research-text">{description}</p>
</motion.article>
);
}

// ─── Competitive matrix (native, replaces the exported PNG) ──────────────────
// Data transcribed from the original analysis artifact. The two highlighted
// rows are the market gaps DuoPet attacks (they map 1:1 to the Opportunities
// cards below: location-based search and emergency access).
const COMPETITIVE = {
competitors: ["11pets", "Vetster", "Vets", "MeuPet"],
rows: [
{ label: "Schedule appointment", have: [1, 1, 1, 1] },
{ label: "Reminders", have: [1, 0, 1, 1] },
{ label: "Pet medical record", have: [1, 0, 1, 1] },
{ label: "Veterinarians information", have: [0, 1, 1, 0] },
{ label: "Nearby veterinarian", have: [0, 0, 0, 1], gap: true },
{ label: "Emergency veterinarian", have: [1, 0, 0, 0], gap: true },
{ label: "Reviews", have: [0, 1, 1, 1] },
{ label: "Pet profile", have: [1, 1, 1, 1] },
],
};

function CompetitiveMatrix({ prefersReducedMotion }) {
const rowV = prefersReducedMotion ? fadeIn : fadeUp;
const containerV = {
hidden: { opacity: 0 },
visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE.out, staggerChildren: 0.05 } },
};
return (
<motion.div className="cmx" variants={containerV} initial="hidden" whileInView="visible" viewport={motionViewport}>
<table className="cmx-table">
<caption className="cmx-caption">Feature coverage across the four veterinary apps reviewed. Highlighted rows are the gaps DuoPet was designed around.</caption>
<thead>
<motion.tr variants={rowV}>
<th scope="col" className="cmx-feature-head">Feature</th>
{COMPETITIVE.competitors.map((c) => (
<th scope="col" className="cmx-comp" key={c}>{c}</th>
))}
</motion.tr>
</thead>
<tbody>
{COMPETITIVE.rows.map((row) => (
<motion.tr key={row.label} variants={rowV} className={row.gap ? "cmx-row cmx-row--gap" : "cmx-row"}>
<th scope="row" className="cmx-feature">
{row.label}
{row.gap ? <span className="cmx-gap-tag">gap</span> : null}
</th>
{row.have.map((has, i) => (
<td className="cmx-cell" key={COMPETITIVE.competitors[i]}>
{has ? (
<span className="cmx-yes" aria-hidden="true">
<svg viewBox="0 0 12 12" fill="none"><path d="M2.5 6.5l2.4 2.4L9.6 3.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
</span>
) : (
<span className="cmx-no" aria-hidden="true" />
)}
<span className="ms-visually-hidden">{has ? "has feature" : "does not have feature"}</span>
</td>
))}
</motion.tr>
))}
</tbody>
</table>
</motion.div>
);
}

// ─── Efficiency chart (native, replaces the exported PNG) ────────────────────
// Average time to schedule an appointment in the second usability test
// (5 pet owners), values from the original chart.
// Competitor flow review: the screenshots remain evidence while the
// comparison, hierarchy and callouts are native portfolio UI.
const COMPETITOR_FLOWS = [
{
app: "Vetster",
flow: "Pet profile setup",
image: "/assets/portfolio/2026/03/competitor-vetster-pet-profile.png",
alt: "Vetster pet profile form with species, breed, sex and birth date fields",
width: 280,
height: 609,
flaws: [
"Creating a pet profile requires several selections across multiple screens.",
"The repeated drill-down pattern makes a simple setup task feel longer than necessary.",
],
opportunity: "Use direct options and integrated menus so owners can complete pet details with fewer transitions.",
},
{
app: "Vets",
flow: "Appointment time selection",
image: "/assets/portfolio/2026/03/competitor-vets-time-picker.png",
alt: "Vets appointment flow showing a 24-hour analogue time picker",
width: 280,
height: 564,
flaws: [
"Filters must be selected before the list of veterinarians becomes available.",
"Choosing a date and time first prevents users from selecting their preferred veterinarian upfront.",
],
opportunity: "Show an availability calendar after the veterinarian is chosen, keeping provider and time selection in one clear sequence.",
},
];

function CompetitorFlaws({ prefersReducedMotion }) {
const itemV = prefersReducedMotion ? fadeIn : fadeUp;
return (
<motion.div
className="cfl"
initial="hidden"
whileInView="visible"
viewport={motionViewport}
variants={{
hidden: { opacity: 0 },
visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE.out, staggerChildren: 0.09 } },
}}
aria-label="Competitor booking flow review"
>
{COMPETITOR_FLOWS.map((competitor, index) => (
<motion.article className="cfl-card" variants={itemV} key={competitor.app}>
<header className="cfl-head">
<span className="cfl-index" aria-hidden="true">0{index + 1}</span>
<div className="cfl-title-wrap">
<h4 className="cfl-app">{competitor.app}</h4>
<p className="cfl-flow">{competitor.flow}</p>
</div>
<span className="cfl-chip">Competitor</span>
</header>

<figure className="cfl-evidence">
<div className="cfl-screen">
<img
src={competitor.image}
alt={competitor.alt}
loading="lazy"
decoding="async"
width={competitor.width}
height={competitor.height}
/>
</div>
<figcaption>Observed product flow</figcaption>
</figure>

<div className="cfl-panel cfl-panel--flaws">
<p className="cfl-panel-label"><span aria-hidden="true">!</span> Observed flaws</p>
<ul className="cfl-list">
{competitor.flaws.map((flaw) => <li key={flaw}>{flaw}</li>)}
</ul>
</div>

<div className="cfl-panel cfl-panel--opportunity">
<p className="cfl-panel-label"><span aria-hidden="true">↗</span> Design opportunity</p>
<p className="cfl-opportunity">{competitor.opportunity}</p>
</div>
</motion.article>
))}
</motion.div>
);
}

const DECISION_QUADRANTS = [
{
id: "quick-wins",
label: "Quick wins",
impact: "High impact",
effort: "Low effort",
ideas: [
"Create a pet profile",
"Show nearby veterinarians on the home screen",
"Show distance from the user's location",
"Show specialization and price on veterinarian profiles",
"Add a notification entry point to the home screen",
"Add search to the navigation",
"Show an emergency filter without requiring a search term",
"Ask for a preview before saving a new pet",
"Use push notifications for important updates",
"Create a personalised caregiver dashboard",
],
},
{
id: "major-projects",
label: "Major projects",
impact: "High impact",
effort: "High effort",
ideas: [
"Only show appointment times that are free in the veterinarian's schedule",
"Integrate a map with nearby veterinarian locations",
"Add ratings and written reviews",
"Create an emergency clinic finder",
"Send reminders for upcoming vaccines",
"Only show available days and times in the picker",
"Let owners share their pet's medical history with veterinarians",
"Record consultations, vaccines, exams and treatments",
"Surface customer feedback on veterinarian profiles",
],
},
{
id: "fill-ins",
label: "Fill-ins",
impact: "Low impact",
effort: "Low effort",
ideas: [
"Add a share action to veterinarian profiles",
"Make the appointment date picker easier to use",
"Add clear error and success messages",
"Send an automatic booking confirmation",
"Support two-click booking from a veterinarian profile",
"Add filters for veterinarian search",
"Send important alerts by SMS",
"Offer email notifications",
],
},
{
id: "later-bets",
label: "Later bets",
impact: "Low impact",
effort: "High effort",
ideas: [
"Streamline appointment rescheduling",
"Let veterinarians add information to pet profiles",
"Link caregiver social accounts",
"Scan and upload physical vaccination cards and test results",
"Connect vaccination schedules with appointment booking",
"Add a chatbot for caregiver questions",
"Attach photos and videos to show health progress",
"Add a scheduling assistant chatbot",
"Offer real-time support for finding suitable veterinarians",
],
},
];

function DecisionMatrix() {
return (
<figure className="dmx" aria-label="Impact and effort prioritisation matrix">
<div className="dmx-board">
{DECISION_QUADRANTS.map((quadrant) => (
<section className={`dmx-quadrant dmx-quadrant--${quadrant.id}`} key={quadrant.id}>
<header className="dmx-head">
<div>
<p className="dmx-kicker">{quadrant.impact}, {quadrant.effort}</p>
<h4 className="dmx-title">{quadrant.label}</h4>
</div>
<span className="dmx-count">{String(quadrant.ideas.length).padStart(2, "0")}</span>
</header>
<ul className="dmx-ideas">
{quadrant.ideas.map((idea) => (
<li className="dmx-idea" tabIndex="0" key={idea} title={idea}>
<span>{idea}</span>
</li>
))}
</ul>
</section>
))}
<span className="dmx-axis dmx-axis--impact" aria-hidden="true">Impact ↑</span>
<span className="dmx-axis dmx-axis--effort" aria-hidden="true">Effort →</span>
</div>
<figcaption>Compact view of the original prioritisation board. Hover or focus a card to expand it.</figcaption>
</figure>
);
}

// Os quadros cobrem DOIS momentos diferentes, por isso os rotulos sao dados e
// nao texto fixo no componente:
// - 01 e 02 saem da primeira rodada de testes, feita no wireframe, que levou a
//   versao final.
// - 03 sai da segunda rodada, feita na versao ja resolvida: os participantes
//   tiveram dificuldade com o calendario dentro do perfil e ele virou tela.
// Nenhuma das telas da direita e "mid-fidelity"; esse estagio nunca existiu.
const SOLUTION_COMPARISONS = [
{
id: "proximity",
number: "01",
title: "Proximity visible from the Home screen",
description: "The wireframe established nearby veterinarians as the primary list. The final Home added the upcoming appointment and explicit distances without hiding the core discovery flow.",
wire: "/assets/portfolio/2026/07/duopet-wireframe-01.png",
wireAlt: "DuoPet Home wireframe with pet profiles and nearby veterinarians",
wireLabel: "Wireframe",
mid: "/assets/portfolio/2026/07/duopet-mobile-02.png",
midAlt: "DuoPet Home screen showing the next appointment, saved pets, and nearby veterinarians with distances",
midLabel: "Final",
},
{
id: "emergency",
number: "02",
title: "Emergency care available without a typed query",
description: "The map wireframe introduced an emergency shortcut. The final screen keeps that action beside Nearby and adds a result card with distance, opening hours, and phone number.",
wire: "/assets/portfolio/2026/07/duopet-wireframe-03.png",
wireAlt: "DuoPet map wireframe with Emergency, Nearby, and Price filters",
wireLabel: "Wireframe",
mid: "/assets/portfolio/2026/07/duopet-mid-fi-03.png",
midAlt: "DuoPet map screen with Emergency and Nearby filters and a result card for the closest veterinarian",
midLabel: "Final",
},
{
id: "schedule",
number: "03",
title: "The calendar moved out of the profile",
description: "The second usability round tested the resolved screens. Participants struggled with the calendar embedded in the veterinarian profile, so scheduling became its own step, with the month view and the available times for the selected day.",
wire: "/assets/portfolio/2026/07/duopet-mid-fi-02.png",
wireAlt: "DuoPet veterinarian profile with ratings, location, and the calendar embedded below",
wireLabel: "Tested version",
// Mesma tela que a seccao de telas finais ja usava (duopet_final_05 no
// Design System). Nao criar arquivo novo: o asset ja existia, so estava com
// a versao antiga do subtitulo.
mid: "/assets/portfolio/2026/07/duopet-mobile-05.png",
midAlt: "DuoPet Date and Time screen with a month calendar and the appointment slots available for the selected day",
midLabel: "After the second round",
},
];

function SolutionComparisons({ prefersReducedMotion }) {
const containerV = {
hidden: { opacity: 0 },
visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE.out, staggerChildren: 0.14 } },
};
const cardV = prefersReducedMotion ? fadeIn : fadeUp;

return (
<motion.div className="solution-comparisons" variants={containerV} initial="hidden" whileInView="visible" viewport={motionViewport}>
{SOLUTION_COMPARISONS.map((solution) => (
<motion.article className="solution-compare" variants={cardV} key={solution.id}>
<header className="solution-compare-copy">
<span className="solution-compare-number">{solution.number}</span>
<div>
<h4>{solution.title}</h4>
<p>{solution.description}</p>
</div>
</header>
<div className="solution-compare-visuals">
<figure>
<figcaption>{solution.wireLabel}</figcaption>
<div className="solution-compare-stage solution-compare-stage--wire">
<img src={solution.wire} alt={solution.wireAlt} loading="lazy" decoding="async" />
</div>
</figure>
<motion.span
className="solution-compare-arrow"
aria-hidden="true"
animate={prefersReducedMotion ? undefined : { opacity: [0.68, 1, 0.68], scale: [1, 0.96, 1] }}
transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
>
<img src="/assets/portfolio/2026/03/duopet-icons/back.png" alt="" width="48" height="48" />
</motion.span>
<figure>
<figcaption>{solution.midLabel}</figcaption>
<div className="solution-compare-stage solution-compare-stage--mid">
<img src={solution.mid} alt={solution.midAlt} loading="lazy" decoding="async" />
</div>
</figure>
</div>
</motion.article>
))}
</motion.div>
);
}

const DUOPET_ICONS = [
{ name: "Search solid", file: "search-solid.png", group: "Navigation" },
{ name: "Profile solid", file: "profile-solid.png", group: "Navigation" },
{ name: "Home solid", file: "home-solid.png", group: "Navigation" },
{ name: "Notification solid", file: "notification-solid.png", group: "Navigation" },
{ name: "Back", file: "back.png", group: "Navigation" },
{ name: "Menu", file: "menu.png", group: "Navigation" },
{ name: "Chat", file: "chat.png", group: "Navigation" },
{ name: "Search", file: "search.png", group: "Navigation" },
{ name: "Home", file: "home.png", group: "Care" },
{ name: "Profile", file: "profile.png", group: "Care" },
{ name: "Gender", file: "gender.png", group: "Care" },
{ name: "Weight", file: "weight.png", group: "Care" },
{ name: "Birthday", file: "birthday.png", group: "Care" },
{ name: "Location", file: "location.png", group: "Care" },
{ name: "Clock", file: "clock.png", group: "Care" },
{ name: "Medical", file: "medical.png", group: "Care" },
{ name: "Calendar", file: "calendar.png", group: "Care" },
{ name: "Vaccine", file: "vaccine.png", group: "Care" },
{ name: "Record", file: "record.png", group: "Care" },
{ name: "Paw", file: "paw.png", group: "Care" },
{ name: "Eye", file: "eye.png", group: "Care" },
{ name: "Notification", file: "notification.png", group: "Care" },
{ name: "Help", file: "help.png", group: "Care" },
{ name: "Rabbit", file: "rabbit.png", group: "Animals & states" },
{ name: "Reptile", file: "reptile.png", group: "Animals & states" },
{ name: "Fish", file: "fish.png", group: "Animals & states" },
{ name: "Cat", file: "cat.png", group: "Animals & states" },
{ name: "Dog", file: "dog.png", group: "Animals & states" },
{ name: "Bird", file: "bird.png", group: "Animals & states" },
{ name: "Money", file: "money.png", group: "Animals & states" },
{ name: "Close", file: "close.png", group: "Animals & states" },
{ name: "Female", file: "female.png", group: "Animals & states" },
{ name: "Check", file: "check.png", group: "Animals & states" },
{ name: "Male", file: "male.png", group: "Animals & states" },
{ name: "Star", file: "star.png", group: "Animals & states" },
];

function IconCatalog() {
const groups = [...new Set(DUOPET_ICONS.map((icon) => icon.group))];
return (
<div className="icg">
<div className="icg-rules">
<div className="icg-rule-demo" aria-hidden="true">
<span className="icg-full"><span className="icg-live"><img src="/assets/portfolio/2026/03/duopet-icons/clock.png" alt="" /></span></span>
</div>
<div className="icg-rule-copy">
<p className="icg-rule-title">48 px construction</p>
<dl>
<div><dt>Live area</dt><dd>46 px</dd></div>
<div><dt>Safe area</dt><dd>2 px</dd></div>
<div><dt>Full size</dt><dd>48 px</dd></div>
</dl>
</div>
</div>
{groups.map((group) => (
<section className="icg-group" key={group}>
<h4>{group}</h4>
<ul className="icg-grid">
{DUOPET_ICONS.filter((icon) => icon.group === group).map((icon) => (
<li className="icg-item" key={icon.file}>
<span className="icg-icon"><img src={`/assets/portfolio/2026/03/duopet-icons/${icon.file}`} alt="" loading="lazy" width="48" height="48" /></span>
<span>{icon.name}</span>
</li>
))}
</ul>
</section>
))}
</div>
);
}

const EFFICIENCY = [
{ app: "DuoPet", seconds: 45, self: true },
{ app: "MeuPet", seconds: 50 },
{ app: "Vets", seconds: 53 },
];
const EFFICIENCY_MAX = 60;

function EfficiencyChart({ prefersReducedMotion }) {
const containerV = {
hidden: { opacity: 0 },
visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE.out, staggerChildren: 0.1 } },
};
const rowV = prefersReducedMotion ? fadeIn : fadeUp;
return (
<motion.div className="effc" variants={containerV} initial="hidden" whileInView="visible" viewport={motionViewport} role="img" aria-label="Average scheduling time: DuoPet 45 seconds, MeuPet 50 seconds, Vets 53 seconds">
<p className="effc-kicker">Average time to schedule an appointment</p>
{EFFICIENCY.map((row) => (
<motion.div className="effc-row" variants={rowV} key={row.app} aria-hidden="true">
<span className={row.self ? "effc-app effc-app--self" : "effc-app"}>{row.app}</span>
<span className="effc-track">
<motion.span
className={row.self ? "effc-bar effc-bar--self" : "effc-bar"}
style={{ width: `${(row.seconds / EFFICIENCY_MAX) * 100}%`, transformOrigin: "left" }}
variants={barGrow(prefersReducedMotion)}
/>
</span>
<span className={row.self ? "effc-val effc-val--self" : "effc-val"}>{row.seconds}s</span>
</motion.div>
))}
<div className="effc-axis" aria-hidden="true">
<span>0s</span><span>15s</span><span>30s</span><span>45s</span><span>60s</span>
</div>
</motion.div>
);
}

// ─── Design tokens specs (native, replace the exported PNGs) ─────────────────
// Values transcribed from the original palette and typography artifacts.
const DUOPET_PALETTE = [
{ group: "Brand", swatches: [
{ name: "Primary", hex: "#4284B0" },
{ name: "Dark shades", hex: "#2A4B74" },
{ name: "Dark accent", hex: "#7480A5" },
{ name: "Light accent", hex: "#678DD8" },
{ name: "Background", hex: "#F3F1ED" },
] },
{ group: "State", swatches: [
{ name: "Success", hex: "#49A26D" },
{ name: "Warning", hex: "#C69135" },
{ name: "Error", hex: "#EB5757" },
] },
{ group: "Neutrals", swatches: [
{ name: "Black 1", hex: "#1D1D1D" },
{ name: "Black 2", hex: "#282828" },
{ name: "Gray 1", hex: "#333333" },
{ name: "Gray 3", hex: "#828282" },
{ name: "Gray 5", hex: "#E0E0E0" },
{ name: "White", hex: "#F9F9F9" },
] },
];

function PaletteSpec({ prefersReducedMotion }) {
const rowV = prefersReducedMotion ? fadeIn : fadeUp;
const containerV = {
hidden: { opacity: 0 },
visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE.out, staggerChildren: 0.08 } },
};
return (
<motion.div className="pal" variants={containerV} initial="hidden" whileInView="visible" viewport={motionViewport}>
{DUOPET_PALETTE.map((g) => (
<motion.div className="pal-group" variants={rowV} key={g.group}>
<p className="pal-group-label">{g.group}</p>
<div className="pal-row">
{g.swatches.map((s) => (
<div className="pal-swatch" key={s.name}>
<span className="pal-chip" style={{ background: s.hex }} aria-hidden="true" />
<span className="pal-name">{s.name}</span>
<span className="pal-hex">{s.hex.toLowerCase()}</span>
</div>
))}
</div>
</motion.div>
))}
</motion.div>
);
}

const DUOPET_TYPE = [
{ face: "Plein", role: "Headings", spec: "Line height and paragraph spacing: 1.1 x font size" },
{ face: "Switzer", role: "Body", spec: "Line height and paragraph spacing: 1.4 x font size" },
];

function TypeSpec({ prefersReducedMotion }) {
const rowV = prefersReducedMotion ? fadeIn : fadeUp;
const containerV = {
hidden: { opacity: 0 },
visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE.out, staggerChildren: 0.1 } },
};
return (
<motion.div className="typs" variants={containerV} initial="hidden" whileInView="visible" viewport={motionViewport}>
{DUOPET_TYPE.map((t) => (
<motion.div className="typs-card" variants={rowV} key={t.face}>
<span className="typs-aa" style={{ fontFamily: `"${t.face}", var(--font-body)` }} aria-hidden="true">Aa</span>
<div className="typs-meta">
<span className="typs-face">{t.face}</span>
<span className="typs-role">{t.role}</span>
<span className="typs-spec">{t.spec}</span>
</div>
</motion.div>
))}
</motion.div>
);
}

// ─── Persona (native section, replaces the 6MB PNG export) ──────────────────
const PERSONA = {
name: "Bella Rios",
tag: "The Busy Pet Owner",
meta: ["33, female", "Brazil", "Personal trainer", "Married, no kids"],
quote: "I always prioritize the happiness and well-being of my dog, Nicolas. However, the process of veterinarian care can be overly frustrating and time-consuming.",
bio: "Bella loves caring for her pet while juggling her job as a personal trainer. Her busy lifestyle makes scheduling vet appointments via WhatsApp challenging due to response delays. She seeks a nearby veterinarian and a scheduling flow that fits her hectic routine.",
columns: [
{ title: "Frustrations", items: ["Difficulty in scheduling appointments", "Trouble finding emergency vets", "Inconvenient location", "Forgets appointments and vaccine dates", "Difficulty in accessing medical history"] },
{ title: "Goals", items: ["Quick and efficient scheduling", "Find nearby emergency vets easily", "Location proximity", "Reminders", "Digital medical history of the pet"] },
{ title: "Influences", items: ["Friend recommendations", "Social media", "Pet parent communities", "Credibility"] },
],
source: "Persona synthesized from a survey with 164 pet owners and 5 in-person interviews",
};

function PersonaCard({ prefersReducedMotion }) {
const childUp = prefersReducedMotion ? fadeIn : fadeUp;
const containerV = {
hidden: { opacity: 0 },
visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE.out, staggerChildren: 0.08 } },
};
return (
<motion.section className="persona-card" aria-label="Persona: Bella Rios" variants={containerV} initial="hidden" whileInView="visible" viewport={motionViewport}>
<motion.div className="persona-head" variants={childUp}>
<div className="persona-avatar" aria-hidden="true">BR</div>
<div className="persona-id">
<h4 className="persona-name">{PERSONA.name}</h4>
<div className="persona-tag">{PERSONA.tag}</div>
</div>
<div className="persona-meta">
{PERSONA.meta.map((m) => <span key={m}>{m}</span>)}
</div>
</motion.div>
<motion.blockquote className="persona-quote" variants={childUp}>&ldquo;{PERSONA.quote}&rdquo;</motion.blockquote>
<motion.p className="persona-bio" variants={childUp}>{PERSONA.bio}</motion.p>
<motion.div className="persona-grid" variants={childUp}>
{PERSONA.columns.map((col) => (
<div key={col.title}>
<p className="persona-col-title">{col.title}</p>
<ul className="persona-list">
{col.items.map((item) => <li key={item}>{item}</li>)}
</ul>
</div>
))}
</motion.div>
<motion.p className="persona-source" variants={childUp}>{PERSONA.source}</motion.p>
</motion.section>
);
}

// ─── Journey map (native section, replaces the 16MB PNG export) ──────────────
const JOURNEY = {
scenario: "Bella is a busy dog owner seeking an easy way to care for her pet by scheduling appointments with a nearby veterinarian.",
expectations: ["Receive a reliable veterinarian recommendation nearby", "Quick appointment scheduling"],
steps: [
{
goal: "Search a veterinarian",
actions: ["Seek a recommendation from a friend or nearby veterinary", "Obtain the veterinarian contact channel"],
pains: ["She is busy", "She hopes for a good veterinarian", "Worried about her pet"],
emotion: "Worried",
opportunities: ["List nearby veterinarians sorted by proximity", "Show reviews from other pet owners"],
},
{
goal: "Message a veterinarian",
actions: ["Send a message", "Wait for a response"],
pains: ["She has to wait", "Has no time to waste", "Still worried about her pet"],
emotion: "Annoyed",
opportunities: ["Create a simple way to book appointments"],
},
{
goal: "Choose a date and time",
actions: ["Inform preferred date and time", "Negotiate date and time", "Write down the appointment"],
pains: ["She does not know available dates", "Worried that she may forget the appointment"],
emotion: "Frustrated",
opportunities: ["Provide a list of available dates", "Remind users of the upcoming appointment"],
},
{
goal: "Go to the appointment",
actions: ["Go to the appointment with her pet", "Buy the prescribed medications"],
pains: ["She does not remember the entire medical record", "She answers many questions"],
emotion: "Relieved",
opportunities: ["Provide a pet medical timeline", "Profile with date of birth, weight, and gender", "Reminders and preventive care"],
},
],
};

// Emotion curve: x at each step column center, y encodes mood (low = worse).
const JOURNEY_CURVE = {
points: [[100, 42], [300, 60], [500, 84], [700, 20]],
path: "M100,42 C170,45 235,55 300,60 C365,65 435,82 500,84 C560,86 645,28 700,20",
};

function JourneyMap({ prefersReducedMotion }) {
const [isMobile, setIsMobile] = useState(false);
useEffect(() => {
const check = () => setIsMobile(window.innerWidth < 900);
check();
window.addEventListener("resize", check);
return () => window.removeEventListener("resize", check);
}, []);

const childUp = prefersReducedMotion ? fadeIn : fadeUp;
const boardV = {
hidden: { opacity: 0 },
visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE.out, staggerChildren: 0.06 } },
};
const curveV = {
hidden: { pathLength: 0, opacity: 0 },
visible: { pathLength: 1, opacity: 1, transition: { duration: 1.6, ease: EASE.inOut } },
};
const dotV = {
hidden: { scale: 0, opacity: 0 },
visible: { scale: 1, opacity: 1, transition: { duration: DURATION.base, ease: EASE.out, delay: 1.2 } },
};

const intro = (
<div className="journey-intro">
<motion.div className="journey-intro-card" variants={childUp}>
<p className="journey-intro-label">Scenario</p>
<p className="journey-intro-text">{JOURNEY.scenario}</p>
</motion.div>
<motion.div className="journey-intro-card" variants={childUp}>
<p className="journey-intro-label">Expectations</p>
{JOURNEY.expectations.map((e) => <p className="journey-intro-text" key={e}>{e}</p>)}
</motion.div>
</div>
);

if (isMobile) {
return (
<motion.div aria-label="Journey map: Bella Rios" variants={boardV} initial="hidden" whileInView="visible" viewport={motionViewport}>
{intro}
<div className="journey-steps-stacked">
{JOURNEY.steps.map((s, i) => (
<motion.div className="journey-step-card" key={s.goal} variants={childUp}>
<span className="journey-step-chip">Step {i + 1}</span>
<h4 className="journey-goal">{s.goal}</h4>
<div className="journey-emotion-chip">{s.emotion}</div>
<p className="journey-row-label">Actions</p>
<ul className="journey-list">{s.actions.map((a) => <li key={a}>{a}</li>)}</ul>
<p className="journey-row-label">Pain points</p>
<ul className="journey-list journey-list--pain">{s.pains.map((p) => <li key={p}>{p}</li>)}</ul>
<div className="journey-opp">
<p className="journey-row-label">Opportunities</p>
<ul className="journey-list">{s.opportunities.map((o) => <li key={o}>{o}</li>)}</ul>
</div>
</motion.div>
))}
</div>
<p className="journey-note">These opportunities shaped the three concepts shown in Results.</p>
</motion.div>
);
}

return (
<motion.div className="journey-board" aria-label="Journey map: Bella Rios" variants={boardV} initial="hidden" whileInView="visible" viewport={motionViewport}>
{intro}
<div className="journey-grid">
{JOURNEY.steps.map((s, i) => (
<motion.div key={s.goal} variants={childUp}>
<span className="journey-step-chip">Step {i + 1}</span>
<h4 className="journey-goal">{s.goal}</h4>
</motion.div>
))}
{JOURNEY.steps.map((s) => (
<motion.div key={s.goal} variants={childUp}>
<p className="journey-row-label">Actions</p>
<ul className="journey-list">{s.actions.map((a) => <li key={a}>{a}</li>)}</ul>
</motion.div>
))}
{JOURNEY.steps.map((s) => (
<motion.div key={s.goal} variants={childUp}>
<p className="journey-row-label">Pain points</p>
<ul className="journey-list journey-list--pain">{s.pains.map((p) => <li key={p}>{p}</li>)}</ul>
</motion.div>
))}
<div className="journey-emotions">
<svg className="journey-curve" viewBox="0 0 800 110" aria-hidden="true">
<motion.path
d={JOURNEY_CURVE.path}
fill="none"
stroke="var(--brand-500)"
strokeWidth="2.5"
strokeLinecap="round"
variants={prefersReducedMotion ? undefined : curveV}
/>
{JOURNEY_CURVE.points.map(([x, y], i) => (
<motion.circle
key={i}
cx={x}
cy={y}
r="6"
fill="var(--brand-600)"
stroke="#FFFFFF"
strokeWidth="2.5"
variants={prefersReducedMotion ? undefined : dotV}
/>
))}
</svg>
<div className="journey-emotion-labels">
{JOURNEY.steps.map((s) => <div className="journey-emotion-label" key={s.goal}>{s.emotion}</div>)}
</div>
</div>
{JOURNEY.steps.map((s) => (
<motion.div className="journey-opp" key={s.goal} variants={childUp}>
<p className="journey-row-label">Opportunities</p>
<ul className="journey-list">{s.opportunities.map((o) => <li key={o}>{o}</li>)}</ul>
</motion.div>
))}
</div>
<p className="journey-note">These opportunities shaped the three concepts shown in Results.</p>
</motion.div>
);
}

function DesignProcessDiagram({ prefersReducedMotion }) {
const steps = [
{ id: 'empathize', label: 'Empathize', detail: '164 responses + 5 interviews', icon: (
<svg viewBox="0 0 40 41" fill="none"><path d="M19.6895 12.7974V14.7104H10.2861V12.7974H19.6895ZM24.6855 7.79541V9.7085H10.2861V7.79541H24.6855ZM24.6855 2.79443V4.70752H10.2861V2.79443H24.6855Z" fill="currentColor" stroke="currentColor" strokeWidth="0.587729"/><path d="M5.14453 2.354V30.9263L10.5947 21.2261C10.7867 20.8792 11.0541 20.5799 11.377 20.3501C11.7003 20.12 12.0719 19.9653 12.4629 19.8979C12.8536 19.8307 13.2544 19.852 13.6357 19.9604C14.0169 20.069 14.3692 20.2621 14.666 20.5249L23.8262 28.5298L32.5635 15.4761L32.6445 15.354L32.7676 15.436L34.8418 16.8286L34.9639 16.9106L34.8818 17.0327L26.1768 30.0405C25.9863 30.3847 25.7221 30.6826 25.4023 30.9116C25.0788 31.1433 24.7064 31.2987 24.3145 31.3667C23.9226 31.4346 23.5201 31.4134 23.1377 31.3042C22.7557 31.1951 22.4033 31.001 22.1064 30.7368L12.958 22.7397L6.13672 34.8628H37.6172V37.6577H4.99805C4.29681 37.657 3.62373 37.3777 3.12793 36.8813C2.63229 36.3851 2.3543 35.712 2.35352 35.0103V2.354H5.14453Z" fill="currentColor" stroke="currentColor" strokeWidth="0.293864"/></svg>
)},
{ id: 'define', label: 'Define', detail: 'Patterns into priorities', icon: (
<svg viewBox="0 0 52 52" fill="none"><path d="M45.255 14.5631C45.255 12.4173 44.4036 10.3595 42.8881 8.8422C41.3726 7.32493 39.317 6.47253 37.1738 6.47253H14.5462C12.4029 6.47253 10.3474 7.32493 8.83188 8.8422C7.31635 10.3595 6.46493 12.4173 6.46493 14.5631V18.6342C8.85545 17.031 11.6688 16.177 14.5462 16.1812C18.0115 16.1812 21.1922 17.3948 23.691 19.4174H42.0225V37.2166C42.0225 38.5041 41.5117 39.7388 40.6024 40.6491C39.693 41.5595 38.4597 42.0709 37.1738 42.0709H32.7161L34.1384 43.4949C34.6653 44.0224 35.0468 44.6437 35.2827 45.3072H37.1738C39.317 45.3072 41.3726 44.4548 42.8881 42.9375C44.4036 41.4202 45.255 39.3624 45.255 37.2166V14.5631ZM14.5462 16.1812H9.69744V14.5631C9.69744 13.2756 10.2083 12.0409 11.1176 11.1306C12.0269 10.2202 13.2602 9.70875 14.5462 9.70875H37.1738C38.4597 9.70875 39.693 10.2202 40.6024 11.1306C41.5117 12.0409 42.0225 13.2756 42.0225 14.5631V16.1812H14.5462ZM21.3215 39.8153C19.0308 41.5302 16.1762 42.3128 13.3324 42.0056C10.4885 41.6983 7.86645 40.3241 5.99388 38.1594C4.1213 35.9947 3.13722 33.2002 3.23969 30.3384C3.34216 27.4766 4.52357 24.7599 6.54616 22.735C8.56875 20.71 11.2824 19.5273 14.1409 19.4247C16.9994 19.3221 19.7907 20.3073 21.9529 22.182C24.1151 24.0568 25.4878 26.6818 25.7947 29.529C26.1016 32.3761 25.3199 35.2339 23.6069 37.5273L31.8498 45.7797C32.1533 46.0831 32.324 46.4947 32.3243 46.9241C32.3246 47.3535 32.1545 47.7654 31.8514 48.0693C31.5484 48.3731 31.1372 48.544 30.7083 48.5443C30.2794 48.5446 29.8679 48.3743 29.5644 48.0709L21.3215 39.8185V39.8153ZM22.6275 30.7442C22.6275 28.5984 21.7761 26.5406 20.2605 25.0233C18.745 23.506 16.6895 22.6536 14.5462 22.6536C12.4029 22.6536 10.3474 23.506 8.83188 25.0233C7.31635 26.5406 6.46493 28.5984 6.46493 30.7442C6.46493 32.8899 7.31635 34.9478 8.83188 36.4651C10.3474 37.9823 12.4029 38.8347 14.5462 38.8347C16.6895 38.8347 18.745 37.9823 20.2605 36.4651C21.7761 34.9478 22.6275 32.8899 22.6275 30.7442Z" fill="currentColor"/></svg>
)},
{ id: 'ideate', label: 'Ideate', detail: 'Ideas into testable options', icon: (
<svg viewBox="0 0 49 49" fill="none"><path d="M10.2623 3.62744L8.14179 5.74739L11.297 8.90469L13.4145 6.78474L10.2608 3.62744H10.2623ZM37.9361 3.62744L34.7809 6.78474L36.8999 8.90469L40.0536 5.74889L37.9346 3.62744H37.9361ZM24.0984 4.5683C23.6015 4.57433 23.0984 4.60298 22.5924 4.6648C22.5773 4.6648 22.5623 4.66178 22.5472 4.6648C16.4387 5.36592 11.5771 10.3069 10.7322 16.3954C10.0575 21.2957 12.0756 25.7391 15.4386 28.6009C16.8143 29.7762 17.7448 31.3892 18.0742 33.1695V42.2162H21.508C22.0321 43.1163 22.9885 43.7239 24.0984 43.7239C25.2084 43.7239 26.1648 43.1163 26.6889 42.2162H30.1227V36.185H30.2642V34.3938C30.2642 32.1834 31.4119 29.9549 33.2764 28.2224C35.7704 25.7225 37.653 22.1717 37.653 18.0931C37.653 10.6447 31.5293 4.49894 24.0984 4.5683ZM24.0984 7.58387C29.9194 7.50245 34.6408 12.2731 34.6408 18.0931C34.6408 21.2504 33.18 24.0308 31.1573 26.0542L31.2055 26.1025C29.1955 27.9581 27.8958 30.4582 27.5308 33.171H20.9433C20.6119 30.5866 19.505 28.0852 17.4131 26.2909C14.7519 24.0293 13.166 20.6217 13.6961 16.7738C14.3543 12.0243 18.2037 8.20507 22.9207 7.68187C23.3102 7.62751 23.7024 7.5953 24.0954 7.58537L24.0984 7.58387ZM3.01367 18.0931V21.1087H7.53184V18.0931H3.01367ZM40.6651 18.0931V21.1087H45.1832V18.0931H40.6651ZM11.297 30.2971L8.1433 33.4529L10.2623 35.5744L13.413 32.4171L11.297 30.2971ZM36.8999 30.2971L34.7824 32.4171L37.9346 35.5744L40.0536 33.4529L36.8999 30.2971ZM21.0863 36.1865H27.1106V39.2021H21.0863V36.1865Z" fill="currentColor"/></svg>
)},
{ id: 'design', label: 'Design', detail: 'Wireframes into flows', icon: (
<svg viewBox="0 0 45 45" fill="none"><path d="M19.5432 30.6687C18.5754 30.5612 17.6235 30.3408 16.7069 30.0119C16.7348 29.3523 16.7515 28.6647 16.7515 27.9493V27.0074C17.617 27.421 18.5578 27.7089 19.5432 27.8514V20.962C19.5432 19.8501 19.9844 18.7837 20.7698 17.9975C21.5551 17.2113 22.6202 16.7696 23.7308 16.7696H30.6124C30.3898 15.2209 29.7993 13.7482 28.8906 12.4753C27.9819 11.2023 26.7814 10.1661 25.3899 9.45369C23.9984 8.74128 22.4566 8.37342 20.8937 8.38099C19.3309 8.38857 17.7927 8.77135 16.4082 9.49722C16.1873 8.58309 15.8236 7.70963 15.3306 6.90912C17.1403 6.00476 19.1415 5.55127 21.1639 5.58719C23.1862 5.62311 25.17 6.1474 26.9466 7.11547C28.7232 8.08354 30.2401 9.46677 31.3682 11.1476C32.4964 12.8284 33.2024 14.757 33.4264 16.7696H37.6894C38.8 16.7696 39.8651 17.2113 40.6504 17.9975C41.4358 18.7837 41.8769 19.8501 41.8769 20.962V34.9365C41.8769 36.0484 41.4358 37.1148 40.6504 37.901C39.8651 38.6872 38.8 39.1289 37.6894 39.1289H23.7308C22.6202 39.1289 21.5551 38.6872 20.7698 37.901C19.9844 37.1148 19.5432 36.0484 19.5432 34.9365V30.6687ZM33.4264 19.5645C33.1092 22.4002 31.8387 25.0438 29.8233 27.0615C27.808 29.0792 25.1674 30.3511 22.335 30.6687V34.9365C22.335 35.3072 22.482 35.6626 22.7438 35.9247C23.0056 36.1868 23.3606 36.334 23.7308 36.334H37.6894C38.0596 36.334 38.4146 36.1868 38.6764 35.9247C38.9382 35.6626 39.0852 35.3072 39.0852 34.9365V20.962C39.0852 20.5913 38.9382 20.2359 38.6764 19.9738C38.4146 19.7117 38.0596 19.5645 37.6894 19.5645H33.4264ZM30.6124 19.5645H23.7308C23.3606 19.5645 23.0056 19.7117 22.7438 19.9738C22.482 20.2359 22.335 20.5913 22.335 20.962V27.8514C24.4231 27.5493 26.3576 26.5789 27.8494 25.0853C29.3413 23.5917 30.3106 21.655 30.6124 19.5645ZM13.3875 21.1325C13.0944 20.0536 12.6198 18.972 11.8046 18.1419C13.1223 16.8926 13.9598 14.9026 13.9598 12.5772C13.9598 10.6292 13.5662 9.29039 12.8543 8.21994C12.5384 7.75954 12.1733 7.335 11.7655 6.95384C11.6092 6.80277 11.451 6.6537 11.2909 6.50666C11.1206 6.34735 10.9643 6.20201 10.7605 5.99798C10.3418 5.57874 10.2943 5.24335 10.2943 5.06727C10.2948 4.9694 10.3108 4.87223 10.3418 4.7794C10.4694 4.50305 10.5034 4.19254 10.4386 3.89507C10.3738 3.5976 10.2137 3.32947 9.98273 3.13143C9.75175 2.93339 9.46248 2.8163 9.15892 2.79795C8.85536 2.7796 8.55413 2.86101 8.30102 3.02978L8.29543 3.03258L8.28706 3.03817L8.26193 3.05493L8.17818 3.11083C7.75942 3.40986 7.35598 3.72982 6.96937 4.06949C6.27144 4.68717 5.36134 5.6011 4.71646 6.69112C4.15351 7.5948 3.7017 8.56327 3.37085 9.57547C3.03585 10.5788 2.79297 11.6661 2.79297 12.5772C2.79297 14.9026 3.63048 16.8898 4.94817 18.1447C4.13299 18.972 3.6584 20.0536 3.36527 21.1352C2.79297 23.237 2.79297 25.8363 2.79297 27.8458V27.9493C2.79297 33.7012 3.86778 37.1166 5.08496 39.1485C5.69635 40.1658 6.33286 40.8226 6.86608 41.2363C7.1502 41.4581 7.45941 41.6458 7.78734 41.7953C7.97699 41.8646 8.17514 41.9078 8.37639 41.9238C8.6109 41.9238 8.96545 41.7953 8.96545 41.7953C9.29337 41.6458 9.60259 41.4581 9.88671 41.2363C10.4171 40.8226 11.0592 40.1658 11.6678 39.1485C12.885 37.1194 13.9598 33.7012 13.9598 27.9493V27.8486C13.9598 25.8363 13.9598 23.2398 13.3875 21.1325ZM6.94425 20.0983C7.25971 19.7797 7.68126 19.5645 8.37639 19.5645C9.07432 19.5645 9.49308 19.7825 9.80854 20.0955C10.1603 20.4505 10.4646 21.0262 10.6935 21.8675C11.1569 23.5752 11.1681 25.8167 11.1681 27.9493C11.1681 33.377 10.1491 36.2502 9.27253 37.7119C8.93753 38.2709 8.62206 38.6314 8.37639 38.8578C8.02538 38.5199 7.7237 38.1341 7.48025 37.7119C6.60366 36.2474 5.58468 33.377 5.58468 27.9493C5.58468 25.8167 5.59585 23.5752 6.05927 21.8675C6.28819 21.029 6.59249 20.4505 6.94425 20.0955V20.0983ZM8.37639 16.7696C7.30158 16.7696 5.58468 15.5734 5.58468 12.5772C5.58468 12.0937 5.72985 11.3279 6.02019 10.4615C6.28477 9.64349 6.64954 8.86148 7.10616 8.1333C7.34904 7.72244 7.66451 7.32277 8.0051 6.95664C8.19772 7.29762 8.45177 7.64139 8.78678 7.97678C8.99057 8.18081 9.25578 8.42676 9.48191 8.63918L9.82808 8.96339C10.1212 9.24847 10.3473 9.49722 10.5288 9.77391C10.8638 10.2742 11.1681 11.0316 11.1681 12.5772C11.1681 15.5734 9.4512 16.7696 8.37639 16.7696Z" fill="currentColor"/></svg>
)},
{ id: 'test', label: 'Test', detail: '2 usability rounds', icon: (
<svg viewBox="0 0 46 46" fill="none"><path d="M28.4581 28.0634L26.8762 29.6363H33.1984L39.5206 35.1491H6.3222L12.6498 29.6363H17.3901L15.8083 28.0635H11.0679L0 37.5111H45.8429L34.7803 28.0634H28.4581ZM42.7594 12.3191L38.8072 8.38428L22.2055 24.9179L15.8831 18.6157L11.9311 22.5506L22.2054 32.7874L42.7595 12.3191H42.7594Z" fill="currentColor"/></svg>
)}
];

const processV = {
hidden: { opacity: 0 },
visible: { opacity: 1, transition: { duration: DURATION.fast, staggerChildren: 0.14 } },
};
const stepV = prefersReducedMotion ? fadeIn : {
hidden: { opacity: 0, y: 18, scale: 0.94 },
visible: { opacity: 1, y: 0, scale: 1, transition: { duration: DURATION.slow, ease: EASE.out } },
};

return (
<motion.div className="design-process-diagram" variants={processV} initial="hidden" whileInView="visible" viewport={motionViewport}>
<span className="design-process-track" aria-hidden="true">
<motion.span
className="design-process-track-fill"
variants={prefersReducedMotion ? undefined : { hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1.15, ease: EASE.out, delay: 0.12 } } }}
/>
</span>
{steps.map((step, index) => (
<motion.div className="design-process-step" variants={stepV} key={step.id}>
<div className="design-process-circle">
<motion.span
className="design-process-orbit"
aria-hidden="true"
animate={prefersReducedMotion ? undefined : { scale: [1, 1.1, 1], opacity: [0.22, 0.52, 0.22] }}
transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.18 }}
/>
<span className="design-process-index">{String(index + 1).padStart(2, "0")}</span>
<div className="design-process-icon">{step.icon}</div>
</div>
<div className="design-process-copy">
<div className="design-process-label">{step.label}</div>
<p>{step.detail}</p>
</div>
</motion.div>
))}
</motion.div>
);
}

const MOBILE_SCREENS = [
{
src: "/assets/portfolio/2026/07/duopet-mobile-01.png",
alt: "DuoPet mobile mockup: veterinarian profile and appointment calendar",
},
{
src: "/assets/portfolio/2026/07/duopet-mobile-02.png",
alt: "DuoPet mobile mockup: home, next appointment, pets, and nearby veterinarians",
},
{
src: "/assets/portfolio/2026/07/duopet-mobile-03.png",
alt: "DuoPet mobile mockup: veterinarian search map",
},
{
src: "/assets/portfolio/2026/07/duopet-mobile-04.png",
alt: "DuoPet mobile mockup: pet profile and health shortcuts",
},
{
src: "/assets/portfolio/2026/07/duopet-mobile-05.png",
alt: "DuoPet mobile mockup: appointment date and time selection",
},
];


// ─────────────────────────────────────────────────────────────────────────────
export default function Document() {
const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => getReducedMotion());
const [isHeroMobile, setIsHeroMobile] = useState(() => (
typeof window !== "undefined" ? window.innerWidth < 768 : false
));
const { scrollY } = useScroll();
// Hero: the text block drifts down at a single speed and fades out to 0
// while the mockup rises in the opposite direction (parallax preserved).
const rawMockupY = useTransform(scrollY, [0, 500], [0, -60]);
const rawTextY = useTransform(scrollY, [0, 500], [0, 40]);
const rawBackdropY = useTransform(scrollY, [0, 600], [0, 120]);
const heroTextFade = useTransform(scrollY, [0, 420], [1, 0]);
const parallaxDisabled = isHeroMobile || prefersReducedMotion;
const heroMockupStyle = parallaxDisabled ? undefined : { y: rawMockupY };
const heroTextStyle = parallaxDisabled ? undefined : { y: rawTextY, opacity: heroTextFade };
const heroBackdropStyle = parallaxDisabled ? undefined : { y: rawBackdropY };
// Reduced-motion variant: translate-based reveals collapse to plain fades.
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

// SEO: Set document title and meta tags
useEffect(() => {
applySeo({
title: SEO_TITLE,
description: SEO_DESCRIPTION,
path: "/duopet",
ogTitle: SEO_OG_TITLE,
ogDescription: SEO_OG_DESCRIPTION,
});
}, []);

// Mobile class on body
useEffect(() => {
function updateMobile() {
if (window.innerWidth < 900) {
document.body.classList.add('is-mobile');
} else {
document.body.classList.remove('is-mobile');
}
}
updateMobile();
window.addEventListener('resize', updateMobile);
return () => window.removeEventListener('resize', updateMobile);
}, []);

// TOC - secao ativa tracking
// Active section observer - identical behavior
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
max-width: 100vw;
}

@media (max-width: 900px) {
html, body {
overflow-x: hidden !important;
width: 100% !important;
max-width: 100% !important;
}
.result-paired-grid {
max-width: 280px !important;
margin-left: auto !important;
margin-right: auto !important;
}
.result-video-slot {
max-width: 280px !important;
}
.insight-number {
min-width: auto !important;
}
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

@media (max-width: 900px) {
.page {
min-height: auto;
padding-top: 120px;
padding-inline: 12px;
padding-bottom: 60px;
overflow-x: hidden;
}

.page-inner {
overflow-x: hidden;
width: 100%;
max-width: 100% !important;
}

.case-layout {
overflow-x: hidden;
}
}



.case-hero {
display: flex;
flex-direction: column;
gap: 24px;
margin-bottom: 0;
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

@media (max-width: 1024px) {
.case-title-main { font-size: 34px; }

.case-meta-grid {
grid-template-columns: repeat(2, minmax(0, 1fr));
}

}

@media (max-width: 768px) {
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

.case-content-column {
min-width: 0;
}

@media (max-width: 768px) {
.case-layout {
margin-top: 12px;
overflow-x: hidden;
}
}

.case-section {
display: grid;
grid-template-columns: minmax(120px, 190px) minmax(0, 1fr);
gap: 20px 40px;
padding-block: 32px;
scroll-margin-top: 140px;
}

body.is-mobile .case-section {
grid-template-columns: 1fr !important;
gap: 16px !important;
padding-block: 32px !important;
}

body.is-mobile .case-section-label {
height: auto !important;
width: auto !important;
align-self: start !important;
font-size: var(--label-1-size) !important;
opacity: 0.75 !important;
margin-bottom: 4px !important;
}

body.is-mobile .case-section-body,
body.is-mobile .case-section-body-secondary {
width: auto !important;
max-width: 100% !important;
min-width: 0 !important;
grid-column: 1 !important;
font-size: 15px;
}

body.is-mobile .page-inner {
max-width: 100% !important;
width: 100% !important;
overflow-x: hidden !important;
}

/* ── Mobile: kill all horizontal scroll ── */
body.is-mobile,
body.is-mobile .page,
body.is-mobile .case-layout,
body.is-mobile .case-content-column {
overflow-x: hidden !important;
max-width: 100vw !important;
}

/* ── Mobile fixes para todos os componentes ── */

/* HMW Box */
body.is-mobile .hmwBox {
width: 100% !important;
box-sizing: border-box !important;
padding: 16px !important;
}
body.is-mobile .hmwPhrase {
font-size: 16px !important;
line-height: 1.5 !important;
}

/* Design Process Diagram */
body.is-mobile .design-process-diagram {
grid-template-columns: 1fr !important;
width: 100% !important;
gap: 12px !important;
padding: 20px 0 4px !important;
}
body.is-mobile .design-process-step {
width: 100% !important;
min-width: 0 !important;
}
body.is-mobile .design-process-circle {
width: 64px !important;
height: 64px !important;
}
body.is-mobile .design-process-icon {
width: 28px !important;
height: 28px !important;
}
body.is-mobile .design-process-label {
font-size: 14px !important;
text-align: left !important;
}

/* Insight rows / lâmpadas */
body.is-mobile .insight-list {
align-items: stretch !important;
width: 100% !important;
}
body.is-mobile .insight-row {
width: 100% !important;
justify-content: flex-start !important;
}
body.is-mobile .insight-left {
width: 100% !important;
}
body.is-mobile .bubble--from-icon {
left: 0 !important;
right: auto !important;
top: -10px !important;
min-width: 200px !important;
max-width: calc(100vw - 32px) !important;
}

/* Persona card */
body.is-mobile .persona-card,
body.is-mobile [class*="persona-"] {
width: 100% !important;
max-width: 100% !important;
box-sizing: border-box !important;
}

/* Journey map */
body.is-mobile .journey-map,
body.is-mobile [class*="journey-"] {
overflow-x: auto !important;
-webkit-overflow-scrolling: touch !important;
width: 100% !important;
}

/* Benchmark */
body.is-mobile [class*="benchmark"] {
overflow-x: auto !important;
-webkit-overflow-scrolling: touch !important;
width: 100% !important;
}

/* Research full */
body.is-mobile .research-full {
width: 100% !important;
overflow-x: hidden !important;
}

/* Imagens e videos */
body.is-mobile img,
body.is-mobile video {
max-width: 100% !important;
height: auto !important;
}
/* Result videos share the same 9:16 source canvas on every viewport. */
body.is-mobile .result-video-slot {
aspect-ratio: 9 / 16 !important;
max-width: 280px !important;
margin: 0 auto !important;
}
body.is-mobile .result-video-slot video {
height: 100% !important;
width: 100% !important;
object-fit: cover !important;
}

/* ── Mobile: UIChangesPair — card em cima, mockups embaixo ── */
body.is-mobile .ui-changes-pair {
flex-direction: column-reverse !important;
gap: 20px !important;
padding: 0 !important;
}
body.is-mobile .ui-changes-pair-mockups,
body.is-mobile .ui-changes-pair-card {
flex: 1 1 100% !important;
width: 100% !important;
max-width: 100% !important;
min-width: 0 !important;
}

/* ── Mobile: kill ALL horizontal scroll ── */
body.is-mobile {
overflow-x: hidden !important;
width: 100% !important;
}
body.is-mobile .page,
body.is-mobile .page-inner,
body.is-mobile .case-layout,
body.is-mobile .case-content-column,
body.is-mobile .case-section,
body.is-mobile .research-full,
body.is-mobile .case-section-body,
body.is-mobile .case-section-body-secondary {
overflow-x: hidden !important;
max-width: 100% !important;
}

/* ── Mobile: research-grid children force col 1 ── */
body.is-mobile .research-grid > * {
grid-column: 1 !important;
}

/* ── UI changes pair: static before/after phone grid + annotation card ── */
.ui-changes-pair {
display: flex;
gap: 36px;
align-items: center;
padding: 8px 0;
}
.ui-changes-pair-mockups {
flex: 0 0 54%;
display: flex;
gap: 14px;
align-items: center;
min-width: 0;
}
.ui-changes-pair-slot {
flex: 1;
min-width: 0;
}
.ui-changes-pair-card {
flex: 1;
min-width: 0;
align-self: center;
}
.ui-changes-solution-label {
font-family: var(--font-mono);
font-size: var(--label-1-size);
font-weight: 700;
letter-spacing: var(--label-1-track);
text-transform: uppercase;
color: var(--brand-600);
margin: 4px 0 8px;
}

/* ── Result: paired cards + videos grid ── */
.result-paired-grid {
display: grid;
grid-template-columns: repeat(3, 1fr);
align-items: stretch;
gap: 24px;
margin-top: 18px;
}
.result-card-slot {
display: flex;
}
.result-card-slot .research-card {
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
}
.result-card-slot .research-text {
flex: 1;
}
body.is-mobile .result-paired-grid {
display: flex !important;
flex-direction: column !important;
gap: 16px !important;
max-width: 280px !important;
margin: 18px auto 0 !important;
}
body.is-mobile .result-card-slot,
body.is-mobile .result-video-slot {
grid-column: auto !important;
grid-row: auto !important;
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

/* ── PALETTE + TYPE SPECS (native, replace the exported PNGs) ── */
.pal-group { margin-bottom:22px; }
.pal-group:last-child { margin-bottom:0; }
.pal-group-label { font-family:var(--font-mono); font-size:10.5px; text-transform:uppercase; letter-spacing:0.18em; color:var(--ink-600); margin:0 0 10px; }
.pal-row { display:flex; flex-wrap:wrap; gap:14px 18px; }
.pal-swatch { display:flex; flex-direction:column; gap:4px; min-width:88px; }
.pal-chip { display:block; width:100%; height:44px; border-radius:10px; border:1px solid rgba(15,14,12,0.08); }
.pal-name { font-family:var(--font-body); font-size:12px; font-weight:500; color:var(--ink-800); }
.pal-hex { font-family:var(--font-mono); font-size:10.5px; letter-spacing:0.04em; color:var(--ink-600); }
.typs { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:18px; max-width:560px; }
@media (max-width:600px){ .typs { grid-template-columns:1fr; } }
.typs-card { display:flex; align-items:center; gap:16px; padding:18px; border:1px solid var(--ink-200); border-radius:14px; background:#FFF; }
.typs-aa { font-size:44px; font-weight:600; line-height:1; color:var(--ink-300); }
.typs-meta { display:flex; flex-direction:column; gap:2px; }
.typs-face { font-family:var(--font-display); font-size:16px; font-weight:600; color:var(--ink-900); }
.typs-role { font-family:var(--font-mono); font-size:10.5px; text-transform:uppercase; letter-spacing:0.16em; color:var(--brand-600); }
.typs-spec { font-family:var(--font-body); font-size:12px; line-height:1.5; color:var(--ink-600); margin-top:4px; }

/* ── EFFICIENCY CHART (native, replaces the exported PNG) ── */
.effc { width:100%; max-width:640px; }
.effc-kicker { font-family:var(--font-mono); font-size:10.5px; text-transform:uppercase; letter-spacing:0.18em; color:var(--ink-600); margin:0 0 16px; }
.effc-row { display:grid; grid-template-columns:64px 1fr 44px; align-items:center; gap:14px; margin-bottom:12px; }
.effc-app { font-family:var(--font-body); font-size:13px; color:var(--ink-600); }
.effc-app--self { color:var(--ink-900); font-weight:600; }
.effc-track { display:block; height:22px; border-radius:6px; background:var(--ink-100); overflow:hidden; }
.effc-bar { display:block; height:100%; border-radius:6px 0 0 6px; background:var(--ink-300); }
.effc-bar--self { background:var(--brand-500); }
.effc-val { font-family:var(--font-mono); font-size:12px; color:var(--ink-600); text-align:right; }
.effc-val--self { color:var(--brand-700); font-weight:600; }
.effc-axis { display:flex; justify-content:space-between; margin:10px 0 0 78px; padding-right:58px; font-family:var(--font-mono); font-size:10px; color:var(--ink-600); border-top:1px solid var(--ink-200); padding-top:6px; }
@media (max-width:600px) { .effc-axis { display:none; } }

/* ── COMPETITIVE MATRIX (native, replaces the exported PNG) ── */
.cmx { width:100%; overflow-x:auto; }
.cmx-table { width:100%; border-collapse:collapse; min-width:560px; }
.cmx-caption { caption-side:bottom; text-align:left; padding-top:12px; font-family:var(--font-mono); font-size:11px; letter-spacing:0.04em; line-height:1.6; color:var(--ink-600); }
.cmx-table thead th { padding:0 10px 12px; border-bottom:1px solid var(--ink-300); }
.cmx-feature-head { text-align:left; font-family:var(--font-mono); font-size:10.5px; text-transform:uppercase; letter-spacing:0.18em; color:var(--ink-600); font-weight:500; padding-left:0 !important; }
.cmx-comp { text-align:center; font-family:var(--font-display); font-size:13.5px; font-weight:600; color:var(--ink-800); }
.cmx-row th, .cmx-row td { padding:11px 10px; border-bottom:1px solid var(--ink-200); }
.cmx-feature { text-align:left; font-family:var(--font-body); font-size:13.5px; font-weight:500; color:var(--ink-800); padding-left:0 !important; white-space:nowrap; }
.cmx-cell { text-align:center; }
.cmx-yes { display:inline-flex; align-items:center; justify-content:center; width:22px; height:22px; border-radius:50%; background:var(--brand-50); color:var(--brand-600); }
.cmx-yes svg { width:12px; height:12px; }
.cmx-no { display:inline-block; width:10px; height:1.5px; background:var(--ink-300); vertical-align:middle; }
.cmx-row--gap th, .cmx-row--gap td { background:var(--gold-50); }
.cmx-row--gap .cmx-feature { color:var(--ink-900); }
.cmx-gap-tag { display:inline-block; margin-left:10px; padding:2px 8px; border-radius:999px; border:1px solid var(--gold-400); font-family:var(--font-mono); font-size:9.5px; text-transform:uppercase; letter-spacing:0.14em; color:var(--gold-700); vertical-align:middle; }
@media (max-width:900px) { .cmx-feature { white-space:normal; } }

/* ── COMPETITOR FLOW REVIEW (native, supplied screenshots only) ── */
.cfl { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:20px; width:100%; }
.cfl-card { display:grid; grid-template-rows:auto auto 1fr auto; gap:16px; min-width:0; padding:20px; border:var(--hairline); border-radius:24px; background:#FFFFFF; }
.cfl-head { display:flex; align-items:center; gap:12px; min-width:0; }
.cfl-index { display:inline-flex; align-items:center; justify-content:center; width:36px; height:36px; flex:0 0 auto; border-radius:999px; background:var(--brand-50); color:var(--brand-700); font-family:var(--font-mono); font-size:11px; font-weight:600; letter-spacing:0.08em; }
.cfl-title-wrap { min-width:0; }
.cfl-app { margin:0; font-family:var(--font-display); font-size:20px; line-height:1.15; font-weight:600; letter-spacing:-0.01em; color:var(--ink-900); }
.cfl-flow { margin:3px 0 0; font-family:var(--font-body); font-size:12px; line-height:1.4; color:var(--ink-600); }
.cfl-chip { margin-left:auto; padding:5px 9px; flex:0 0 auto; border:1px solid var(--ink-200); border-radius:999px; color:var(--ink-600); font-family:var(--font-mono); font-size:9.5px; text-transform:uppercase; letter-spacing:0.13em; }
.cfl-evidence { margin:0; padding:22px 20px 13px; border-radius:18px; background:var(--ink-100); }
.cfl-screen { height:372px; display:flex; align-items:center; justify-content:center; }
.cfl-screen img { display:block; width:auto; max-width:100%; max-height:100%; border:1px solid rgba(26,24,21,0.12); border-radius:10px; box-shadow:var(--elev-1); }
.cfl-evidence figcaption { margin-top:12px; text-align:center; color:var(--ink-600); font-family:var(--font-mono); font-size:10px; text-transform:uppercase; letter-spacing:0.14em; }
.cfl-panel { padding:16px; border-radius:16px; }
.cfl-panel--flaws { border:1px solid rgba(201,169,110,0.48); background:var(--gold-50); }
.cfl-panel--opportunity { border:1px solid rgba(95,142,82,0.34); background:var(--brand-50); }
.cfl-panel-label { display:flex; align-items:center; gap:8px; margin:0 0 10px; color:var(--ink-700); font-family:var(--font-mono); font-size:10px; font-weight:600; text-transform:uppercase; letter-spacing:0.15em; }
.cfl-panel-label span { display:inline-flex; align-items:center; justify-content:center; width:20px; height:20px; border-radius:999px; background:#FFFFFF; color:var(--brand-700); font-size:11px; letter-spacing:0; }
.cfl-panel--flaws .cfl-panel-label span { color:var(--gold-700); }
.cfl-list { display:flex; flex-direction:column; gap:8px; margin:0; padding:0; list-style:none; }
.cfl-list li { position:relative; padding-left:15px; color:var(--ink-700); font-family:var(--font-body); font-size:13px; line-height:1.55; }
.cfl-list li::before { content:""; position:absolute; top:8px; left:0; width:6px; height:6px; border-radius:999px; background:var(--gold-400); }
.cfl-opportunity { margin:0; color:var(--ink-700); font-family:var(--font-body); font-size:13px; line-height:1.6; }
@media (max-width:720px) {
.cfl { grid-template-columns:1fr; }
.cfl-card { padding:16px; }
.cfl-screen { height:360px; }
}
@media (max-width:420px) {
.cfl-chip { display:none; }
.cfl-evidence { padding-inline:14px; }
.cfl-screen { height:330px; }
}

/* ── DECISION MATRIX (native impact / effort board) ── */
.dmx { width:100%; margin:0; }
.dmx-board { position:relative; display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; padding:28px 28px 34px 38px; border:var(--hairline); border-radius:18px; background:var(--ink-50); }
.dmx-quadrant { min-width:0; padding:16px; border:1px solid var(--ink-200); border-radius:12px; background:#FFFFFF; }
.dmx-quadrant--quick-wins { background:var(--brand-50); border-color:rgba(95,142,82,0.34); }
.dmx-quadrant--major-projects { background:rgba(46,73,52,0.035); border-color:rgba(46,73,52,0.22); }
.dmx-quadrant--fill-ins { background:var(--gold-50); border-color:rgba(201,169,110,0.38); }
.dmx-head { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:12px; }
.dmx-kicker { margin:0 0 3px; color:var(--ink-600); font-family:var(--font-mono); font-size:9px; text-transform:uppercase; letter-spacing:0.13em; }
.dmx-title { margin:0; color:var(--ink-900); font-family:var(--font-display); font-size:17px; line-height:1.2; font-weight:600; }
.dmx-count { color:var(--ink-600); font-family:var(--font-mono); font-size:10px; letter-spacing:0.08em; }
.dmx-ideas { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:7px; margin:0; padding:0; list-style:none; }
.dmx-idea { position:relative; z-index:1; min-height:42px; display:flex; align-items:center; padding:8px 9px; border:1px solid var(--ink-200); border-radius:8px; background:rgba(255,255,255,0.92); color:var(--ink-700); font-family:var(--font-body); font-size:10.5px; line-height:1.35; cursor:default; transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease,color .2s ease; }
.dmx-idea span { display:-webkit-box; overflow:hidden; -webkit-line-clamp:2; -webkit-box-orient:vertical; }
.dmx-idea:hover,.dmx-idea:focus-visible { z-index:4; transform:translateY(-3px) scale(1.07); border-color:var(--brand-400); box-shadow:var(--elev-1); color:var(--ink-900); outline:none; }
.dmx-idea:hover span,.dmx-idea:focus-visible span { display:block; overflow:visible; }
.dmx-axis { position:absolute; color:var(--ink-600); font-family:var(--font-mono); font-size:9px; text-transform:uppercase; letter-spacing:0.16em; }
.dmx-axis--impact { left:13px; top:50%; transform:translate(-50%,-50%) rotate(-90deg); }
.dmx-axis--effort { left:50%; bottom:11px; transform:translateX(-50%); }
.dmx figcaption { margin-top:10px; color:var(--ink-600); font-family:var(--font-mono); font-size:10.5px; line-height:1.5; letter-spacing:0.04em; }
@media (max-width:720px) {
.dmx-board { grid-template-columns:1fr; padding:24px 12px 30px 28px; }
.dmx-ideas { grid-template-columns:1fr; }
.dmx-axis--effort { display:none; }
}

/* ── SOLUTION COMPARISONS (wireframe → mid-fidelity) ── */
.solution-comparisons { width:100%; display:flex; flex-direction:column; gap:18px; }
.solution-compare { min-width:0; padding:24px; border:var(--hairline); border-radius:14px; background:#FFFFFF; box-shadow:0 12px 34px rgba(15,14,12,0.045); }
.solution-compare-copy { display:grid; grid-template-columns:42px minmax(0,1fr); gap:14px; align-items:start; margin-bottom:20px; }
.solution-compare-number { color:var(--brand-600); font-family:var(--font-mono); font-size:11px; font-weight:700; letter-spacing:0.12em; }
.solution-compare-copy h4 { margin:0 0 6px; color:var(--ink-900); font-family:var(--font-display); font-size:19px; line-height:1.25; font-weight:600; letter-spacing:-0.015em; }
.solution-compare-copy p { max-width:68ch; margin:0; color:var(--ink-600); font-family:var(--font-body); font-size:13px; line-height:1.65; }
.solution-compare-visuals { display:grid; grid-template-columns:minmax(0,1fr) 36px minmax(0,1fr); gap:12px; align-items:center; }
.solution-compare-visuals figure { min-width:0; margin:0; }
.solution-compare-visuals figcaption { margin:0 0 8px; color:var(--ink-600); font-family:var(--font-mono); font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:0.14em; }
.solution-compare-stage { height:520px; display:flex; align-items:center; justify-content:center; padding:18px; overflow:visible; border:1px solid var(--ink-200); border-radius:10px; }
.solution-compare-stage--wire { background:linear-gradient(145deg,#F2F3F2,#E6E8E6); }
.solution-compare-stage--mid { background:linear-gradient(145deg,var(--brand-50),#FFFFFF); }
.solution-compare-stage img { display:block; max-width:100%; max-height:100%; width:auto; height:auto; object-fit:contain; filter:drop-shadow(0 8px 12px rgba(15,14,12,0.10)); }
.solution-compare-arrow { display:flex; align-items:center; justify-content:center; width:36px; height:36px; margin-top:20px; border:1px solid var(--brand-200); border-radius:999px; background:var(--brand-50); }
.solution-compare-arrow img { display:block; width:16px; height:16px; object-fit:contain; transform:rotate(180deg); }
@media (max-width:720px) {
.solution-compare { padding:18px; }
.solution-compare-copy { grid-template-columns:34px minmax(0,1fr); }
.solution-compare-visuals { grid-template-columns:1fr; gap:10px; }
.solution-compare-arrow { margin:0 auto; }
.solution-compare-arrow img { transform:rotate(270deg); }
.solution-compare-stage { height:500px; padding:14px; }
}

/* ── ICON CATALOG (exact Figma SVG assets, native layout) ── */
.icg { width:100%; display:flex; flex-direction:column; gap:24px; }
.icg-rules { display:grid; grid-template-columns:128px minmax(0,1fr); gap:24px; align-items:center; padding:20px; border:var(--hairline); border-radius:14px; background:var(--ink-50); }
.icg-rule-demo { display:flex; align-items:center; justify-content:center; }
.icg-full { width:72px; height:72px; padding:3px; display:flex; border:1px solid var(--ink-300); background:#FFFFFF; box-shadow:var(--elev-1); }
.icg-live { width:66px; height:66px; padding:9px; display:flex; align-items:center; justify-content:center; background:var(--ink-100); }
.icg-live img { display:block; width:48px; height:48px; }
.icg-rule-title { margin:0 0 10px; color:var(--ink-900); font-family:var(--font-display); font-size:16px; font-weight:600; }
.icg-rule-copy dl { display:flex; flex-direction:column; gap:6px; margin:0; }
.icg-rule-copy dl div { display:grid; grid-template-columns:minmax(90px,1fr) auto; gap:16px; max-width:260px; }
.icg-rule-copy dt { color:var(--ink-600); font-family:var(--font-body); font-size:12px; }
.icg-rule-copy dd { margin:0; color:var(--brand-700); font-family:var(--font-mono); font-size:11px; font-weight:600; }
.icg-group h4 { margin:0 0 10px; color:var(--brand-700); font-family:var(--font-mono); font-size:10.5px; text-transform:uppercase; letter-spacing:0.16em; }
.icg-grid { display:grid; grid-template-columns:repeat(6,minmax(0,1fr)); gap:8px; margin:0; padding:0; list-style:none; }
.icg-item { min-width:0; display:flex; flex-direction:column; align-items:center; gap:7px; padding:11px 6px 9px; border:1px solid var(--ink-200); border-radius:8px; background:#FFFFFF; transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease; }
.icg-item:hover { transform:translateY(-2px); border-color:var(--brand-300); box-shadow:0 8px 18px rgba(15,14,12,0.08); }
.icg-icon { width:48px; height:48px; display:flex; align-items:center; justify-content:center; }
.icg-icon img { display:block; width:48px; height:48px; object-fit:contain; }
.icg-item > span:last-child { max-width:100%; overflow:hidden; text-overflow:ellipsis; color:var(--ink-600); font-family:var(--font-mono); font-size:8px; white-space:nowrap; letter-spacing:0.02em; }
@media (max-width:720px) {
.icg-grid { grid-template-columns:repeat(4,minmax(0,1fr)); }
.icg-rules { grid-template-columns:96px minmax(0,1fr); padding:16px 12px; gap:14px; }
}

/* ── PERSONA (native, replaces the exported PNG) ── */
.persona-card { border-radius:24px; border:var(--hairline); background:#FFFFFF; padding:36px 40px 30px; }
.persona-head { display:flex; align-items:center; gap:18px; flex-wrap:wrap; }
.persona-avatar { width:64px; height:64px; border-radius:50%; background:var(--brand-600); color:#FFFFFF; display:flex; align-items:center; justify-content:center; font-family:var(--font-display); font-size:22px; font-weight:600; letter-spacing:0.02em; flex-shrink:0; }
.persona-id { min-width:0; }
.persona-name { font-family:var(--font-display); font-size:24px; font-weight:600; color:var(--ink-900); margin:0; letter-spacing:-0.01em; }
.persona-tag { font-family:var(--font-mono); font-size:var(--label-1-size); text-transform:uppercase; letter-spacing:var(--label-2-track); color:var(--brand-600); margin-top:4px; }
.persona-meta { margin-left:auto; display:flex; flex-wrap:wrap; gap:8px; }
.persona-meta span { font-family:var(--font-mono); font-size:var(--label-1-size); letter-spacing:0.04em; color:var(--ink-600); border:1px solid var(--ink-200); border-radius:999px; padding:5px 12px; background:#FFF; }
.persona-quote { margin:26px 0 22px; padding:4px 0 4px 20px; border-left:3px solid var(--gold-400); font-family:var(--font-display); font-size:19px; line-height:1.55; font-weight:500; letter-spacing:-0.01em; color:var(--ink-800); }
.persona-bio { font-size:15px; line-height:1.75; color:var(--ink-600); margin:0 0 26px; max-width:64ch; }
.persona-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:24px; padding-top:22px; border-top:var(--hairline); }
.persona-col-title { font-family:var(--font-mono); font-size:var(--label-1-size); text-transform:uppercase; letter-spacing:var(--label-2-track); color:var(--ink-600); margin:0 0 10px; }
.persona-list { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:8px; }
.persona-list li { position:relative; padding-left:16px; font-size:13px; line-height:1.55; color:var(--ink-700); }
.persona-list li::before { content:""; position:absolute; left:0; top:8px; width:6px; height:6px; border-radius:50%; background:var(--brand-300); }
.persona-source { margin:24px 0 0; font-family:var(--font-mono); font-size:var(--label-1-size); letter-spacing:0.06em; color:var(--ink-600); display:flex; align-items:center; gap:8px; }
.persona-source::before { content:""; width:7px; height:7px; border-radius:50%; background:var(--gold-400); flex-shrink:0; }
@media (max-width:900px) {
.persona-card { padding:24px 20px; }
.persona-meta { margin-left:0; }
.persona-grid { grid-template-columns:1fr; gap:20px; }
.persona-quote { font-size:16px; }
}

/* ── JOURNEY MAP (native, replaces the exported PNG) ── */
.journey-intro { display:grid; grid-template-columns:1.4fr 1fr; gap:16px; margin-bottom:18px; }
.journey-intro-card { border-radius:18px; border:var(--hairline); background:#FFF; padding:18px 20px; }
.journey-intro-label { font-family:var(--font-mono); font-size:var(--label-1-size); text-transform:uppercase; letter-spacing:var(--label-2-track); color:var(--brand-600); margin:0 0 8px; }
.journey-intro-text { font-size:13px; line-height:1.6; color:var(--ink-700); margin:0; }
.journey-intro-text + .journey-intro-text { margin-top:6px; }
.journey-board { border-radius:24px; border:var(--hairline); background:#FFFFFF; padding:28px; overflow:hidden; }
.journey-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:0 18px; }
.journey-step-chip { font-family:var(--font-mono); font-size:var(--label-1-size); text-transform:uppercase; letter-spacing:var(--label-1-track); color:var(--ink-600); border:1px solid var(--ink-200); background:#FFF; border-radius:999px; padding:4px 12px; display:inline-block; }
.journey-goal { font-family:var(--font-display); font-size:17px; font-weight:600; line-height:1.3; letter-spacing:-0.01em; color:var(--ink-900); margin:12px 0 16px; }
.journey-row-label { font-family:var(--font-mono); font-size:var(--label-1-size); text-transform:uppercase; letter-spacing:var(--label-1-track); color:var(--ink-600); margin:0 0 8px; }
.journey-list { list-style:none; margin:0 0 18px; padding:0; display:flex; flex-direction:column; gap:6px; }
.journey-list li { position:relative; padding-left:14px; font-size:12px; line-height:1.5; color:var(--ink-700); }
.journey-list li::before { content:""; position:absolute; left:0; top:7px; width:5px; height:5px; border-radius:50%; background:var(--brand-300); }
.journey-list--pain li::before { background:var(--gold-400); }
.journey-emotions { grid-column:1/-1; margin:6px 0 20px; }
.journey-curve { display:block; width:100%; height:auto; }
.journey-emotion-labels { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:0 18px; margin-top:6px; }
.journey-emotion-label { text-align:center; font-family:var(--font-mono); font-size:var(--label-1-size); letter-spacing:0.12em; text-transform:uppercase; color:var(--ink-700); }
.journey-opp { background:rgba(46,73,52,0.05); border:1px solid rgba(46,73,52,0.18); border-radius:14px; padding:14px 14px 12px; }
.journey-opp .journey-row-label { color:var(--brand-600); }
.journey-opp .journey-list { margin-bottom:0; }
.journey-note { margin:18px 0 0; font-family:var(--font-mono); font-size:var(--label-1-size); letter-spacing:0.06em; color:var(--ink-600); }
.journey-steps-stacked { display:flex; flex-direction:column; gap:16px; }
.journey-step-card { border-radius:18px; border:var(--hairline); background:#FFF; padding:18px; }
.journey-step-card .journey-opp { margin-top:4px; }
.journey-emotion-chip { display:inline-flex; align-items:center; gap:8px; font-family:var(--font-mono); font-size:var(--label-1-size); letter-spacing:0.12em; text-transform:uppercase; color:var(--ink-700); border:1px solid var(--ink-200); border-radius:999px; padding:5px 12px; margin-bottom:16px; }
.journey-emotion-chip::before { content:""; width:7px; height:7px; border-radius:50%; background:var(--brand-500); }
@media (max-width:900px) { .journey-intro { grid-template-columns:1fr; } .journey-board { padding:18px; } }

@media (max-width: 900px) {
.case-section {
grid-template-columns: 1fr !important;
gap: 10px;
padding-block: 24px;
}

.case-section-label {
font-size: var(--label-1-size);
letter-spacing: var(--label-2-track);
opacity: 0.75;
height: auto !important;
align-self: start !important;
width: auto !important;
}

.case-section-body {
width: auto !important;
max-width: 100% !important;
min-width: 0 !important;
font-size: 15px;
}

.case-section-body-secondary {
grid-column: 1 / -1;
margin-top: 16px;
width: auto !important;
max-width: 100% !important;
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
display: flex;
flex-direction: column;
}

.research-number {
font-family: var(--font-display);
font-size: 30px;
font-weight: 600;
line-height: 1.1;
letter-spacing: -0.02em;
color: var(--ink-900);
margin-bottom: 10px;
flex-shrink: 0;
}

.research-title {
font-family: var(--font-display);
font-size: 17px;
font-weight: 700;
margin: 0 0 10px;
color: var(--ink-900);
letter-spacing: -0.01em;
line-height: 1.35;
}

.research-text {
font-size: 14px;
line-height: 1.7;
color: var(--ink-600);
margin: 0;
flex: 1;
}

@media (max-width: 768px) {
.research-grid {
grid-template-columns: 1fr;
}
}

/* Design Process Diagram */
.design-process-diagram {
position: relative;
display: grid;
grid-template-columns: repeat(5, minmax(0, 1fr));
align-items: start;
gap: 12px;
width: 100%;
max-width: 100%;
margin: 0;
padding: 36px 4px 8px;
box-sizing: border-box;
}

.design-process-track {
position: absolute;
top: 76px;
left: 10%;
right: 10%;
height: 2px;
overflow: hidden;
background: var(--ink-200);
}

.design-process-track-fill {
display: block;
width: 100%;
height: 100%;
background: linear-gradient(90deg, var(--brand-400), var(--brand-700));
transform-origin: left center;
}

.design-process-step {
position: relative;
z-index: 1;
display: flex;
flex-direction: column;
align-items: center;
gap: 13px;
min-width: 0;
}

.design-process-circle {
position: relative;
width: 82px;
height: 82px;
border-radius: 9999px;
border: 1px solid rgba(95, 142, 82, 0.45);
background: #FFFFFF;
box-shadow: 0 10px 26px rgba(46, 73, 52, 0.13);
display: flex;
align-items: center;
justify-content: center;
}

.design-process-orbit {
position: absolute;
inset: -7px;
border: 1px solid rgba(95, 142, 82, 0.46);
border-radius: inherit;
pointer-events: none;
}

.design-process-index {
position: absolute;
top: -5px;
right: -5px;
display: flex;
align-items: center;
justify-content: center;
width: 25px;
height: 25px;
border-radius: 999px;
background: var(--brand-700);
color: #FFFFFF;
font-family: var(--font-mono);
font-size: 8px;
font-weight: 700;
letter-spacing: 0.05em;
}

.design-process-icon {
width: 34px;
height: 34px;
color: var(--brand-700);
}

.design-process-icon svg {
width: 100%;
height: 100%;
}

.design-process-copy {
min-width: 0;
text-align: center;
}

.design-process-label {
font-family: var(--font-display);
font-size: 14px;
font-weight: 600;
color: var(--ink-900);
text-align: center;
}

.design-process-copy p {
margin: 4px auto 0;
max-width: 18ch;
color: var(--ink-600);
font-family: var(--font-body);
font-size: 10px;
line-height: 1.45;
}

@media (max-width: 820px) {
.design-process-diagram {
grid-template-columns: 1fr;
padding: 20px 0 4px;
gap: 12px;
}

.design-process-step {
display: grid;
grid-template-columns: 70px minmax(0,1fr);
gap: 16px;
align-items: center;
}

.design-process-circle {
width: 64px;
height: 64px;
}

.design-process-icon {
width: 28px;
height: 28px;
}

.design-process-copy,
.design-process-label {
text-align: left;
}

.design-process-copy p {
margin-left: 0;
max-width: none;
}

.design-process-track {
top: 52px;
bottom: 36px;
left: 31px;
right: auto;
width: 2px;
height: auto;
}

.design-process-track-fill {
transform-origin: center top;
}
}

/* ── Case Pagination ── */
.case-pagination { margin-top: 48px; margin-bottom: 24px; }
.case-pagination-inner { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
.case-pagination-card { display: flex; flex-direction: column; gap: 6px; padding: 18px 0 0; border-top: var(--hairline); text-decoration: none; cursor: pointer; }
.case-pagination-label { font-family: var(--font-mono); font-size: var(--label-1-size); text-transform: uppercase; letter-spacing: var(--label-1-track); font-weight: 700; color: var(--ink-600); transition: color 0.24s ease; }
.case-pagination-card:hover .case-pagination-label { color: var(--accent); }
.case-pagination-title { font-family: var(--font-display); font-size: 18px; font-weight: 600; color: var(--ink-900); letter-spacing: -0.01em; display: flex; align-items: center; gap: 8px; }
.case-pagination-arrow { display: inline-flex; align-items: center; color: var(--accent); flex-shrink: 0; transition: transform 0.28s cubic-bezier(0.4,0,0.2,1); }
.case-pagination-prev:hover .case-pagination-arrow { transform: translateX(-4px); }
.case-pagination-next:hover .case-pagination-arrow { transform: translateX(4px); }
.case-pagination-desc { font-family: var(--font-body); font-size: 13px; line-height: 1.6; color: var(--ink-600); }
.case-pagination-prev { text-align: left; }
.case-pagination-prev .case-pagination-title { flex-direction: row-reverse; justify-content: flex-end; }
.case-pagination-next { text-align: right; }
.case-pagination-next .case-pagination-title { justify-content: flex-end; }
@media (max-width: 768px) {
.case-pagination-inner { grid-template-columns: 1fr; gap: 14px; }
.case-pagination-next { text-align: left; }
.case-pagination-next .case-pagination-title { justify-content: flex-start; }
}

/* ── Mobile-only / Desktop-only ── */
.mobile-only { display: none !important; }
body.is-mobile .mobile-only { display: block !important; }
body.is-mobile .desktop-only { display: none !important; }

/* ── Mobile: Insights — show bubble permanently ── */
body.is-mobile .insight-row { flex-direction: column !important; align-items: stretch !important; gap: 0 !important; }
body.is-mobile .insight-left { width: 100% !important; overflow: visible !important; }
body.is-mobile .tip--outside { order: 2 !important; margin-top: 0 !important; align-self: stretch !important; }
body.is-mobile .bubble--from-icon {
position: relative !important; display: block !important; opacity: 1 !important; visibility: visible !important;
left: auto !important; right: auto !important; top: auto !important; transform: none !important;
min-width: 0 !important; max-width: 100% !important; width: 100% !important;
border-radius: 0 0 18px 18px !important; border-top: none !important;
padding: 14px 20px !important; font-size: 13px !important; line-height: 1.55 !important; box-sizing: border-box !important;
}
body.is-mobile .bubble--from-icon::after { display: none !important; }
body.is-mobile .tip--outside img { display: none !important; }
body.is-mobile .hover-hint { display: none !important; }

/* ── Mobile: research-grid children force col 1 ── */
body.is-mobile .research-grid > * { grid-column: 1 !important; }


/* Minimal eyebrow label */
.case-label{
margin: 0 0 10px 0; /* small separation from H1, adjust only if needed */
padding: 0;
border: 0;
background: transparent;
box-shadow: none;
text-transform: uppercase;
letter-spacing: var(--label-1-track);
font-size: var(--label-2-size);
line-height: 1;
color: rgba(15,14,12,0.62);
}

/* DuoPet - CTA button (hairline grammar) */
.case-btn{
display: inline-flex;
align-items: center;
gap: 10px;
padding: 12px 16px;
border-radius: 16px;
background: transparent;
border: var(--hairline);
color: var(--ink-900);
text-decoration: none;
font-family: var(--font-display);
font-size: 13px;
font-weight: 600;
letter-spacing: -0.01em;
white-space: nowrap;
transition: border-color 0.18s ease, color 0.18s ease;
}

.case-btn:hover {
border-color: var(--ink-800);
}

.case-btn:focus-visible {
outline: 2px solid var(--brand-400);
outline-offset: 2px;
}

.case-btn-icon{
display: inline-flex;
align-items: center;
justify-content: center;
flex-shrink: 0;
}

.case-btn-icon img{
width: 16px;
height: 16px;
display: block;
object-fit: contain;
}

.case-btn-label{
display: inline-flex;
align-items: center;
}

.case-inline-link{ color:var(--ink-900); text-decoration:none; border-bottom: 1px solid rgba(46,73,52,.55); padding-bottom: 2px; }
.case-inline-link:hover{ border-bottom-color: rgba(46,73,52,.95); }

/* DuoPet - stats tooltips */
.hover-hint{
margin-top: 10px;
color: rgba(15,14,12,.72);
font-size: 14px;
display:flex;
align-items:center;
gap:8px;
}
.hover-hint__emoji{
width: 18px;
height: 18px;
display:inline-block;
transform: translateY(1px);
}

.stats-grid{
margin-top: 16px;
display:grid;
grid-template-columns: repeat(3, minmax(0, 1fr));
gap: 14px;
}
.stat-card{
border-top: var(--hairline);
padding: 16px 0 0;
}
.stat-top{
display:flex;
align-items:flex-start;
justify-content: flex-start;
gap: 10px;
}
.stat-number{
font-family: var(--font-display);
font-size: 30px;
font-weight: 600;
letter-spacing: -0.02em;
color: var(--ink-900);
line-height: 1.1;
}
.stat-title{
margin-top: 10px;
font-weight: 700;
color:var(--ink-900);
letter-spacing: -0.01em;
}
.stat-desc{
margin-top: 6px;
color: rgba(15,14,12,.72);
font-size: 14px;
line-height: 1.55;
}

.tip{
position: relative;
border: none;
background: transparent;
padding: 0;
display:inline-flex;
align-items:center;
justify-content:center;
cursor: default;
}
.tip img{
width: 18px;
height: 18px;
display:block;
opacity: .9;
transition: transform .18s ease, opacity .18s ease;
}
.tip:hover img,
.tip:focus-visible img{
transform: translateY(-1px);
opacity: 1;
}

.bubble{
position: absolute;
top: -10px;
right: -8px;
transform: translate3d(0, -8px, 0);
opacity: 0;
pointer-events: none;
min-width: 240px;
max-width: 320px;
padding: 12px 12px;
border: 1px solid rgba(15,14,12,.14);
background: rgba(255,255,255,.96);
color: rgba(15,14,12,.92);
font-size: 13px;
line-height: 1.45;
border-radius: 14px; /* less rounded */
box-shadow: 0 18px 42px rgba(15,14,12,.14);
transition: opacity .22s ease, transform .22s ease;
z-index: 5;
}
.bubble::after{
content:"";
position:absolute;
bottom: -7px;
right: 18px;
width: 12px;
height: 12px;
background: rgba(255,255,255,.96);
border-left: 1px solid rgba(15,14,12,.14);
border-bottom: 1px solid rgba(15,14,12,.14);
transform: rotate(45deg);
}
.tip:hover .bubble,
.tip:focus-visible .bubble{
opacity: 1;
transform: translate3d(0, -14px, 0);
}

@media (max-width: 880px){
.stats-grid{ grid-template-columns: 1fr; }
.bubble{ right: 0; left: auto; min-width: 220px; }
}

/* Keep body in column 2 */
.case-section-body{
grid-column: 2 / 3;
}

/* DuoPet - Empathize stats alignment */
.stats-grid{
margin-top: 16px;
display:flex;
flex-direction: column;
align-items: flex-end;
gap: 14px;
}
.stat-card{
width: min(560px, 100%);
}
.stat-top{
display:flex;
align-items:flex-start;
gap: 10px;
}
.tip{
margin-right: auto;
}
.bubble{
right: auto;
left: -320px;
}
.bubble::after{
right: auto;
left: 28px;
}

@media (max-width: 880px){
.stats-grid{ align-items: stretch; }
.stat-card{ width: 100%; }
.bubble{ left: auto; right: 0; }
.bubble::after{ left: auto; right: 18px; }
}

/* DuoPet - stats with outside icons */
.stats-grid{
margin-top: 16px;
display:flex;
flex-direction: column;
align-items: flex-end;
gap: 14px;
}
.stat-row{
width: min(640px, 100%);
display:flex;
justify-content: flex-end;
align-items: flex-start;
gap: 12px;
position: relative;
}
.tip--outside{
margin-top: 6px;
flex: 0 0 auto;
}
.stat-card{
width: min(560px, 100%);
}

.bubble--from-icon{
left: auto;
right: 34px;
top: -6px;
transform: translate3d(0, -8px, 0);
}
.bubble--from-icon::after{
bottom: auto;
top: 14px;
left: auto;
right: -7px;
width: 12px;
height: 12px;
background: rgba(255,255,255,.96);
border-left: 0;
border-right: 1px solid rgba(15,14,12,.14);
border-top: 1px solid rgba(15,14,12,.14);
border-bottom: 0;
transform: rotate(45deg);
}

@media (max-width: 880px){
.stats-grid{ align-items: stretch; }
.stat-row{ width: 100%; justify-content: flex-start; }
.stat-card{ width: 100%; }
.bubble--from-icon{ left: 0; right: auto; top: -10px; min-width: 220px; }
.bubble--from-icon::after{ left: 18px; top: auto; bottom: -7px; border-top: 0; border-right: 0; border-bottom: 1px solid rgba(15,14,12,.14); border-left: 1px solid rgba(15,14,12,.14); transform: rotate(45deg); }
}

/* DuoPet - insights (elevated cards) */
.insight-list{
margin-top: 20px;
display:flex;
flex-direction: column;
gap: 16px;
align-items: flex-end;
}
.insight-row{
width: min(640px, 100%);
display:flex;
align-items:flex-start;
justify-content:flex-end;
gap: 12px;
}
.insight-left{
position: relative;
width: min(560px, 100%);
display:flex;
gap: 16px;
padding: 20px 0 0;
border-top: var(--hairline);
}

.insight-number{
flex-shrink: 0;
font-family: var(--font-display);
font-size: 30px;
font-weight: 600;
letter-spacing: -0.02em;
color: var(--ink-900);
line-height: 1.1;
min-width: 64px;
}

.insight-title{
font-weight: 700;
color:var(--ink-900);
letter-spacing: -0.01em;
font-size: 15px;
}
.insight-desc{
margin-top: 6px;
color: var(--ink-600);
font-size: 14px;
line-height: 1.65;
}

.tip--outside{
margin-top: 14px;
flex: 0 0 auto;
}

/* Bubble from icon (pointing to the icon) */
.bubble--from-icon{
left: auto;
right: 34px;
top: 2px;
transform: translate3d(0, -8px, 0);
}
.bubble--from-icon::after{
bottom: auto;
top: 14px;
left: auto;
right: -7px;
width: 12px;
height: 12px;
background: rgba(255,255,255,.96);
border-left: 0;
border-right: 1px solid rgba(15,14,12,.14);
border-top: 1px solid rgba(15,14,12,.14);
border-bottom: 0;
transform: rotate(45deg);
}

@media (max-width: 880px){
.insight-list{ align-items: stretch; }
.insight-row{ width: 100%; justify-content:flex-start; }
.insight-left{ width: 100%; }
.bubble--from-icon{ left: 0; right: auto; top: -10px; min-width: 220px; }
.bubble--from-icon::after{
left: 18px;
top: auto;
bottom: -7px;
border-top: 0;
border-right: 0;
border-bottom: 1px solid rgba(15,14,12,.14);
border-left: 1px solid rgba(15,14,12,.14);
transform: rotate(45deg);
}
}

.hmwBox{
border: var(--hairline);
border-radius: 14px;
padding: 14px 16px;
}

.hmwPhrase{
margin: 0;
font-size: 18px;
line-height: 1.22;
}

/* Define usability review */
.define-usability-block{
margin-top: 24px;
}

`}</style>

<SiteHeader />
<ScrollspyPill sections={CASE_SECTIONS} />

<main id="main" className="page">
<div className="page-inner">
{/* HERO CASE */}
<section className="case-hero">
<motion.div className="case-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
<motion.p className="case-label" style={heroTextStyle}>COURSE PROJECT / PET CARE</motion.p>
<motion.h1 className="case-title-main" style={heroTextStyle}>
DuoPet - Veterinary Appointment Prototype
</motion.h1>
<motion.p className="case-subtitle" style={heroTextStyle}>
A UX course project exploring how pet owners could find vets and
book appointments with less waiting and guesswork.
</motion.p>

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
User research; Wireframes; UI design; Prototyping; Usability testing; Design iteration.
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
<div className="case-meta-value">2023</div>
</div>
</motion.div>
</div>

{/* [REVISÃO MATTHIAS] In short: new summary block, copy pending owner review */}
<div className="in-short">
<div className="in-short-item">
<div className="in-short-label">Problem</div>
<p className="in-short-text">Booking a vet visit meant waiting on WhatsApp replies; owners wanted to book in minutes.</p>
</div>
<div className="in-short-item">
<div className="in-short-label">My role</div>
<p className="in-short-text">Course project, end to end: research with 164 survey responses and 5 interviews, IA, UI and usability testing.</p>
</div>
<div className="in-short-item">
<div className="in-short-label">Result</div>
<p className="in-short-text">Scheduling 15.9% faster than the competitor apps in the final usability test.</p>
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
src="/assets/portfolio/2024/05/Iphone-1024x591.png"
alt="DuoPet prototype overview mockup" loading="eager" decoding="async" width="1024" height="591" />
</motion.div>
</motion.div>
</div>
</section>

{/* [REVISÃO MATTHIAS] DuoPet PinnedStory context copy, compressed from the existing Overview. */}
<PinnedStory
steps={[
{
id: "context",
label: "Context",
title: "Booking by chat meant waiting and repeating information",
body: "Pet owners had to wait for replies, repeat the same details, and guess which appointment times were available.",
img: "/assets/portfolio/2026/03/Wire-03-Pure.png",
alt: "Early DuoPet home wireframe",
},
// [REVISÃO MATTHIAS] DuoPet PinnedStory research copy, compressed from the existing Research section.
{
id: "research",
label: "Research",
title: "164 survey responses and 5 interviews",
body: "The research mapped how pet owners choose clinics, schedule appointments, and handle urgent situations.",
img: "/assets/portfolio/2026/03/Wire-01-Pure.png",
alt: "Early DuoPet veterinary profile wireframe",
},
// [REVISÃO MATTHIAS] DuoPet PinnedStory insight copy, compressed from the existing Opportunities section.
{
id: "insight",
label: "Insight",
title: "Proximity, emergency access, and scheduling shaped the direction",
body: "The strongest patterns pointed to nearby veterinarians, faster emergency access, and a clearer scheduling flow.",
img: "/assets/portfolio/2026/03/Screen-02-Pill-Final.png",
alt: "DuoPet calendar screen",
},
// [REVISÃO MATTHIAS] DuoPet PinnedStory solution copy, compressed from the existing Solutions section.
{
id: "solution",
label: "Solution",
title: "A dedicated flow for faster appointment booking",
body: "The final direction combined a simpler calendar, nearby veterinarian discovery, emergency access, and visible appointment details.",
img: "/assets/portfolio/2026/03/Screen-03-Pill.png",
alt: "DuoPet home screen with the next appointment",
},
]}
/>

<div className="case-layout">
<div className="case-content-column">
<motion.section id="overview" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Overview</TypedSectionLabel>
<div className="case-section-body">
<p>
DuoPet was a UX course project based on a common pet-care friction: booking veterinary appointments through WhatsApp often means waiting for replies, repeating information, and having little visibility over available times. In a small usability test, the prototype completed the scheduling task faster than the competitor apps we analysed.
</p>
<h3 className="case-subsection-title">The Problem</h3>
<p>
Pet owners need veterinary care regularly, but booking through chat messages means waiting for replies, repeating the same information, and guessing at available times.
</p>

<div className="hmwBox">
<p className="hmwPhrase">
"How might we make scheduling veterinary appointments stress-free and time-efficient for pet owners?"
</p>
</div>

<h3 className="case-subsection-title" style={{ marginTop: 22 }}>Design Process</h3>
<p>
We followed a simple research-to-prototype process: understand how people book today, identify the moments that slow them down, and test whether a dedicated flow could reduce that friction.
</p>
<DesignProcessDiagram prefersReducedMotion={prefersReducedMotion} />
</div>

<div className="research-full mobile-gallery-shell">
<SnapGallery className="ms-snap--exported ms-snap--large ms-snap--depth" label="Mobile screens" items={MOBILE_SCREENS} />
</div>
</motion.section>

<motion.section id="research" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Research</TypedSectionLabel>
{/* [REVISÃO MATTHIAS] Research: empathize + define merged into one section; subheads and bridge copy rewritten in reader language, pending owner review */}
<div className="case-section-body">
{/* [REVISÃO MATTHIAS] new subhead + compressed intro (was "Following in the footsteps of pet owners" + 2 paragraphs) */}
<h3 className="case-subsection-title">How pet owners book today</h3>

<p>
We started by mapping how pet owners choose clinics, book appointments, and handle urgent situations, then grouped the findings in an affinity diagram.
</p>

<div style={{ marginTop: 16 }}>
<a className="case-btn" href="https://www.figma.com/file/7k3qxR4TPjZkSt9zi5Byac/Affinity-Diagram?type=whiteboard&node-id=0%3A1&t=DeHD2TwEURvvyCPw-1" target="_blank" rel="noopener noreferrer" style={{ width: 'fit-content' }}>
<span className="case-btn-icon" aria-hidden="true">
<img src="/assets/portfolio/2026/01/twemoji_writing-hand.png" alt="" loading="lazy" decoding="async" width="24" height="24" />
</span>
<span className="case-btn-label">Affinity Diagram</span>
</a>
</div>
</div>

<div className="research-full" style={{ marginTop: 18 }}>
<div className="research-grid">
<article className="research-card">
<div className="research-number">01</div>
<h4 className="research-title">Demographic data of pet owners</h4>
<p className="research-text">
Millennials are 33% of pet owners in Brazil, mostly married women with a dog.
</p>
<p className="research-text" style={{ marginTop: 10 }}>
<a className="case-inline-link" href="https://publicacoes.apamvet.com.br/PDFs/Artigos/58.pdf" target="_blank" rel="noopener noreferrer">
Source (PDF, PT-BR) →
</a>
</p>
</article>

<article className="research-card">
<div className="research-number">02</div>
<h4 className="research-title">Frequency of vet visits</h4>
<p className="research-text">
28% of dogs and 20% of cats visit the vet at least once a month.
</p>
<p className="research-text" style={{ marginTop: 10 }}>
<a className="case-inline-link" href="https://www.institutoqualibest.com/wp-content/uploads/2020/02/Infografico-O-perfil-do-dono-de-pet-no-Brasil-v4.pdf" target="_blank" rel="noopener noreferrer">
Source (PDF, PT-BR) →
</a>
</p>
</article>
</div>
</div>

<div className="desktop-only" style={{ gridColumn: '1', marginTop: '62px' }}>
<div>
<a className="case-btn" href="https://drive.google.com/file/d/1gSYHBJogy_9tdDgBm7EMDbxamL4FVspx/view" target="_blank" rel="noopener noreferrer" style={{ width: 'fit-content' }}>
<span className="case-btn-icon" aria-hidden="true">
<img src="/assets/portfolio/2026/01/twemoji_writing-hand.png" alt="" loading="lazy" decoding="async" width="24" height="24" />
</span>
<span className="case-btn-label" style={{ textTransform: 'uppercase' }}>Full Report</span>
</a>
</div>
</div>

<div className="case-section-body case-section-body-secondary">
{/* [REVISÃO MATTHIAS] new subhead (was "Data that guides") + compressed intro sentence */}
<h3 className="case-subsection-title">Survey: 164 pet owners</h3>
<p>
We ran a survey with <strong>164 pet owners</strong> about how they schedule veterinary appointments.
</p>

<div className="mobile-only" style={{ marginTop: 16 }}>
<a className="case-btn" href="https://drive.google.com/file/d/1gSYHBJogy_9tdDgBm7EMDbxamL4FVspx/view" target="_blank" rel="noopener noreferrer" style={{ width: 'fit-content' }}>
<span className="case-btn-icon" aria-hidden="true">
<img src="/assets/portfolio/2026/01/twemoji_writing-hand.png" alt="" loading="lazy" decoding="async" width="24" height="24" />
</span>
<span className="case-btn-label" style={{ textTransform: 'uppercase' }}>Full Report</span>
</a>
</div>

<p className="hover-hint">
Some findings raised follow-up questions. Hover over the icon
<img className="hover-hint__emoji" src="/assets/portfolio/2026/07/lightbulb.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" width="24" height="24" />.
</p>

<div className="insight-list" aria-label="Survey insights">
<div className="insight-row">
<div className="insight-left">
<div className="insight-number"><CountUp value={56} suffix="%" /></div>
<div className="insight-text">
<div className="insight-title">WhatsApp scheduling</div>
<div className="insight-desc">Share of pet owners who schedule appointments through WhatsApp.</div>
</div>
</div>
<button className="tip tip--outside" type="button" aria-label="Insight about WhatsApp scheduling">
<img src="/assets/portfolio/2026/07/lightbulb.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" width="24" height="24" />
<span className="bubble bubble--from-icon">
This number stands out. It made me wonder: how satisfied are people when booking appointments through WhatsApp?
</span>
</button>
</div>

<div className="insight-row">
<div className="insight-left">
<div className="insight-number"><CountUp value={52} suffix="%" /></div>
<div className="insight-text">
<div className="insight-title">Only go when symptoms appear</div>
<div className="insight-desc">Some pet owners book routine checkups, while others only go when symptoms show up.</div>
</div>
</div>
<button className="tip tip--outside" type="button" aria-label="Insight about routine vs symptoms">
<img src="/assets/portfolio/2026/07/lightbulb.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" width="24" height="24" />
<span className="bubble bubble--from-icon">
What is the experience like when taking a pet to the vet in an emergency?
</span>
</button>
</div>

<div className="insight-row">
<div className="insight-left">
<div className="insight-number"><CountUp value={63} suffix="%" /></div>
<div className="insight-text">
<div className="insight-title">Nearby veterinarians</div>
<div className="insight-desc">Share of pet owners who take their pets to the closest veterinarian.</div>
</div>
</div>
<button className="tip tip--outside" type="button" aria-label="Insight about proximity">
<img src="/assets/portfolio/2026/07/lightbulb.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" width="24" height="24" />
<span className="bubble bubble--from-icon">
It&apos;s a big number and shows that proximity matters to a lot of people. This points to a need to explore. It is not yet time to think about solutions.
</span>
</button>
</div>
</div>
</div>

<div className="desktop-only" style={{ gridColumn: '1', marginTop: '62px' }}>
<div>
<a className="case-btn" href="https://docs.google.com/document/d/1Tpd8qc_dXaRJYhOZgxXumjD4bCVwoP7SFUEfpFkOMNc/edit?tab=t.0" target="_blank" rel="noopener noreferrer" style={{ width: 'fit-content' }}>
<span className="case-btn-icon" aria-hidden="true">
<img src="/assets/portfolio/2026/01/twemoji_writing-hand.png" alt="" loading="lazy" decoding="async" width="24" height="24" />
</span>
<span className="case-btn-label" style={{ textTransform: 'uppercase' }}>Interview guide</span>
</a>
<p style={{ marginTop: '12px', fontSize: '13px', lineHeight: '1.6', color: '#64748B' }}>
Type: In-Person<br />
Location: Brazil<br />
Participants: 5 (20-40 years old)<br />
Duration: 15 to 25 minutes each
</p>
</div>
</div>

<div className="case-section-body case-section-body-secondary">
{/* [REVISÃO MATTHIAS] new subhead (was "Connecting data and stories to impactful solutions") + compressed intro sentence */}
<h3 className="case-subsection-title">What 5 interviews added</h3>
<p>
Interviews with 5 pet owners explained the numbers behind the survey and connected the patterns to real booking stories.
</p>

<div className="mobile-only" style={{ marginTop: 16 }}>
<a className="case-btn" href="https://docs.google.com/document/d/1Tpd8qc_dXaRJYhOZgxXumjD4bCVwoP7SFUEfpFkOMNc/edit?tab=t.0" target="_blank" rel="noopener noreferrer" style={{ width: 'fit-content' }}>
<span className="case-btn-icon" aria-hidden="true">
<img src="/assets/portfolio/2026/01/twemoji_writing-hand.png" alt="" loading="lazy" decoding="async" width="24" height="24" />
</span>
<span className="case-btn-label" style={{ textTransform: 'uppercase' }}>Interview guide</span>
</a>
<p style={{ marginTop: '12px', fontSize: '13px', lineHeight: '1.6', color: '#64748B' }}>
Type: In-Person<br />
Location: Brazil<br />
Participants: 5 (20-40 years old)<br />
Duration: 15 to 25 minutes each
</p>
</div>
</div>

<div className="research-full">
<div className="research-grid">
<NumberCard number="01" title="Slow replies" description="Scheduling through WhatsApp can take too long, with some users waiting up to an hour for confirmation." />
<NumberCard number="02" title="Emergency search is stressful" description="Pet owners struggle to quickly find clinics and veterinarians that can handle urgent situations." />
<NumberCard number="03" title="Appointments are easy to miss" description="Busy routines make it hard to remember appointments, vaccines, and follow-up dates without reminders." />
{/* [REVISÃO MATTHIAS] Card "Distance matters" removido a pedido: redundante
    com o insight de proximidade do survey (63% escolhem o vet mais próximo),
    exibido logo acima na mesma seção. */}
{/* [REVISÃO MATTHIAS] side note cut: persona sourcing is stated with numbers on the persona card itself */}
</div>
</div>
<div className="case-section-body case-section-body-secondary">
<h3 className="case-subsection-title">Bella's Journey</h3>
<p>
We mapped Bella's journey to see where uncertainty, waiting time, and missing information made the experience harder than necessary.
</p>
</div>

<div className="research-full" style={{ marginTop: 18 }}>
<JourneyMap prefersReducedMotion={prefersReducedMotion} />
</div>

<div className="case-section-body case-section-body-secondary">
{/* [REVISÃO MATTHIAS] intro paragraph cut: it repeated the persona card's own source line ("synthesized from a survey with 164 pet owners and 5 in-person interviews") */}
<h3 className="case-subsection-title">Meet Bella Rios</h3>
</div>

<div className="research-full" style={{ marginTop: 24 }}>
<PersonaCard prefersReducedMotion={prefersReducedMotion} />
</div>

<div className="case-section-body case-section-body-secondary">
{/* [REVISÃO MATTHIAS] new subhead (was "Enhancing UX through competitive analysis" + "Feature analysis" h4) + compressed sentence */}
<h3 className="case-subsection-title">Competitive analysis</h3>
<p>
I compared veterinary apps to see where existing services help and where the booking flow still creates friction.
</p>
</div>

<div className="research-full" style={{ marginTop: 24 }}>
<CompetitiveMatrix prefersReducedMotion={prefersReducedMotion} />
</div>

<div className="case-section-body case-section-body-secondary">
<h3 className="case-subsection-title">Opportunities</h3>
<p>
The benchmark pointed to opportunities that matched what users had already told us: proximity, emergency access, and a clearer scheduling flow.
</p>
</div>

<div className="research-full">
<div className="research-grid">
<article className="research-card">
<div className="research-number">01</div>
<h4 className="research-title">Location-based search</h4>
<p className="research-text">
Many pet owners prefer nearby veterinarians, but competing apps did not make location the center of the experience.
</p>
</article>

<article className="research-card">
<div className="research-number">02</div>
<h4 className="research-title">Emergency access</h4>
<p className="research-text">
A quick way to find emergency veterinarians could reduce stress in moments when users have little time to compare options.
</p>
</article>
</div>
</div>

<div className="case-section-body case-section-body-secondary">
{/* [REVISÃO MATTHIAS] new subhead (was "Looking at usability") + compressed sentence naming the flows from the artifact */}
<h3 className="case-subsection-title">Usability review of competitor flows</h3>
<p>
A closer review of the Vetster and Vets booking flows showed where users lose time during booking.
</p>
</div>

<div className="research-full define-usability-block">
<CompetitorFlaws prefersReducedMotion={prefersReducedMotion} />
</div>
</motion.section>

<motion.section id="decisions" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Decisions</TypedSectionLabel>
{/* [REVISÃO MATTHIAS] empty course headline "Transforming ideas into impact" cut; intro paragraph kept as the section lead */}
<div className="case-section-body">
<p>
We translated the strongest research patterns into concept ideas, then prioritized the ones that could make booking faster without making the prototype feel heavy.
</p>
</div>

<div className="research-full">
<DecisionMatrix />
</div>

<div className="case-section-body case-section-body-secondary" style={{ marginTop: 8 }}>
<h3 className="case-subsection-title">Solutions</h3>
<p>
The three solution directions are shown from the tested wireframe to the mid-fidelity screen that followed it.
</p>
</div>

<div className="case-section-body case-section-body-secondary" style={{ marginTop: 24 }}>
{/* [REVISÃO MATTHIAS] new subhead with the evidence in it (was "Small UI changes, big UX impact") */}
<h3 className="case-subsection-title">Wireframe tests with 5 users</h3>
<p>
We tested the core flows with 5 users, then used the findings to clarify the calendar, surface proximity and keep emergency access visible.
</p>
</div>

<div className="research-full" style={{ marginTop: 32 }}>
<SolutionComparisons prefersReducedMotion={prefersReducedMotion} />
</div>

<div className="case-section-body case-section-body-secondary" style={{ marginTop: 32 }}>
<h3 className="case-subsection-title">Measuring scheduling efficiency</h3>
{/* [REVISÃO MATTHIAS] caveat folded into the main paragraph (was a separate muted paragraph) */}
<p>
In the second high-fidelity test, we compared the prototype's efficiency against competitors Vets and MeuPet, the most downloaded options, with <strong>5 pet owners</strong>, focusing on the time to schedule an appointment. The sample was small due to the course timeline, but the results indicated a promising improvement in efficiency.
</p>
<div style={{ marginTop: 20 }}>
<EfficiencyChart prefersReducedMotion={prefersReducedMotion} />
</div>
<p style={{ marginTop: 14, fontSize: 13, color: '#64748B', fontStyle: 'italic' }}>
Our goal was for the prototype to be 10% faster at scheduling compared to competitors. In this limited course test, the prototype reached an average scheduling time of 45 seconds.
</p>
</div>
</motion.section>

<motion.section id="design" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Design</TypedSectionLabel>
{/* [REVISÃO MATTHIAS] packaging headline "A lightweight system for consistency" cut; one factual intro sentence kept */}
<div className="case-section-body">
<p>
A lightweight style guide kept screens consistent and made the interface easier to extend, without slowing down iteration.
</p>
</div>

<div className="case-section-body case-section-body-secondary" style={{ marginTop: 32 }}>
{/* [REVISÃO MATTHIAS] subhead renamed to match the Color / Icons / Typography pattern (was "A friendly visual system") */}
<h3 className="case-subsection-title">Color</h3>
<p>We chose blue as the primary color to balance trust, clarity, and a calm feeling around pet care.</p>
<div style={{ marginTop: 16 }}>
<PaletteSpec prefersReducedMotion={prefersReducedMotion} />
</div>
</div>

<div className="case-section-body case-section-body-secondary" style={{ marginTop: 24 }}>
<h3 className="case-subsection-title">Icons</h3>
<p>Solid navigation icons made the main actions easier to scan, while softer illustrative icons kept the prototype approachable.</p>
<div style={{ marginTop: 16 }}>
<IconCatalog />
</div>
</div>

<div className="case-section-body case-section-body-secondary" style={{ marginTop: 24 }}>
<h3 className="case-subsection-title">Typography</h3>
<div style={{ marginTop: 16 }}>
<TypeSpec prefersReducedMotion={prefersReducedMotion} />
</div>
</div>
</motion.section>

<motion.section id="results" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Results</TypedSectionLabel>
<div className="case-section-body">
<h3 className="case-subsection-title">Design that speeds up and simplifies scheduling</h3>
<p>
The concept focuses on three moments: finding nearby veterinarians, booking quickly through a clear calendar, and registering pets from the start.
</p>
<p style={{ marginTop: 12, fontWeight: 600, fontSize: 15 }}>
15.9% faster in the course usability test.
</p>
</div>

<div className="research-full">
<div className="result-paired-grid">
{[
{ n: "01", t: "Finding nearby care", d: "Nearby clinics and vets are surfaced by location, making it easy to compare options and choose inside the prototype.", src: '/assets/portfolio/2026/07/duopet-result-01.mp4', poster: '/assets/portfolio/2026/07/duopet-result-01-poster.webp', label: "Prototype flow: finding nearby veterinarians" },
{ n: "02", t: "Scheduling made simple", d: "An updated calendar and streamlined booking flow let owners confirm appointments in fewer steps, with less back and forth.", src: '/assets/portfolio/2026/07/duopet-result-02.mp4', poster: '/assets/portfolio/2026/07/duopet-result-02-poster.webp', label: "Prototype flow: booking an appointment with the calendar" },
{ n: "03", t: "Pet profiles from the start", d: "Owners register their pets during onboarding and can add more anytime, keeping all health and scheduling info in one place.", src: '/assets/portfolio/2026/07/duopet-result-03.mp4', poster: '/assets/portfolio/2026/07/duopet-result-03-poster.webp', label: "Prototype flow: registering a pet during onboarding" },
].map(({ n, t, d, src, poster, label }, i) => (
<React.Fragment key={n}>
<div className="result-card-slot" style={{ gridColumn: i + 1, gridRow: 1 }}>
<NumberCard number={n} title={t} description={d} />
</div>
<div className="result-video-slot" style={{
gridColumn: i + 1, gridRow: 2,
borderRadius: 28, overflow: 'hidden',
boxShadow: '0 20px 48px rgba(15,14,12,0.14), 0 6px 14px rgba(15,14,12,0.06)',
aspectRatio: '9 / 16', background: '#ffffff',
}}>
<video
src={src}
poster={poster}
controls preload="metadata" muted playsInline
aria-label={label}
style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition: 'center' }}
/>
</div>
</React.Fragment>
))}
</div>
</div>
</motion.section>

<motion.section id="reflections" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Reflections</TypedSectionLabel>
{/* [REVISÃO MATTHIAS] Lessons Learned + Next Steps merged into one Reflections section with two subheads; all cards kept */}
<div className="case-section-body">
<h3 className="case-subsection-title">Lessons learned</h3>
<p>
This project helped me understand how much speed and confidence matter in service booking, especially when the user is worried about a pet.
</p>
</div>
<div className="research-full">
<div className="research-grid">
<NumberCard
number="01"
title="Prioritization matters"
description="We kept the focus on scheduling instead of expanding every pet-profile feature, because booking was the clearest pain point."
/>
<NumberCard
number="02"
title="Interviews changed the direction"
description="The interviews helped turn survey numbers into concrete design decisions, especially around emergency access and reminders."
/>
</div>
</div>
<div className="case-section-body case-section-body-secondary">
<h3 className="case-subsection-title">Next steps</h3>
<p>
With a promising concept and clear efficiency gains from a small test, the next phase would deepen the prototype and test assumptions we could not address during the initial course sprint.
</p>
</div>
<div className="research-full">
<div className="research-grid">
<NumberCard
number="01"
title="Analyse search filters"
description="Evaluate the inclusion of filters on the home page, beyond nearby veterinarians, to offer a more personalised experience."
/>
<NumberCard
number="02"
title="Test the emergency vet feature"
description="This would allow us to evaluate its usefulness and clarity in urgent situations."
/>
</div>
</div>
</motion.section>
{/* ── Paginação ── */}
<section className="case-pagination" aria-label="Next and previous case">
<div className="case-pagination-inner">
<Link to="/doctor" className="case-pagination-card case-pagination-prev">
<div className="case-pagination-label">Previous case</div>
<div className="case-pagination-title">
<span className="case-pagination-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
The Doctor&apos;s New Digital Presence
</div>
<div className="case-pagination-desc">
Building a trustworthy digital presence for a plastic surgeon.
</div>
</Link>
<Link to="/delivery" className="case-pagination-card case-pagination-next">
<div className="case-pagination-label">Next case</div>
<div className="case-pagination-title">
The New Delivery Experience
<span className="case-pagination-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
</div>
<div className="case-pagination-desc">
Redesigning the delivery confirmation flow for drivers.
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
