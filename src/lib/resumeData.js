// Fonte unica do curriculo. Consumido pela pagina /resume (src/Resume.jsx) e
// pelo gerador do PDF (branding/resume/build-pdf.mjs). Editar SO aqui: se o
// texto for duplicado num dos dois, a pagina e o PDF divergem sem aviso.
//
// Regras que valem para este arquivo (ver CLAUDE.md):
// - NDA do case Delivery: nao inventar metrica. O 30-40% de disputas e
//   PROJECAO, nao resultado medido, e o texto tem que dizer isso.
// - Posicionamento e "UX/UI Designer". Nao usar "Design Engineer".
// - Sem em-dash em texto corrido.

export const RESUME_PDF_URL = "/assets/portfolio/2026/07/CV_Matthias_Schaefle_2026-07.pdf";

export const resume = {
  name: "Matthias Karl Schaefle",
  role: "UX/UI Designer",

  contact: [
    { label: "Phone", value: "+49 1520 5830511", href: "tel:+4915205830511" },
    { label: "Email", value: "matthias.k.schaefle@gmail.com", href: "mailto:matthias.k.schaefle@gmail.com" },
    { label: "Location", value: "Berlin, Germany" },
  ],
  site: { value: "www.matthiasks.com", href: "https://matthiasks.com" },

  intro:
    "UX/UI Designer with a research-led approach and hands-on delivery from " +
    "discovery to implementation. My background in Biological Sciences shapes " +
    "how I frame problems, test assumptions, and work with evidence. I combine " +
    "field research, interaction design, high-fidelity UI, design systems, and " +
    "technical prototyping in React/Vite. German-Brazilian citizen based in " +
    "Berlin, available immediately.",

  experience: [
    {
      title: "UX/UI Designer, Vulpes Studio",
      kind: "Freelance",
      period: "Aug. 2024 – Present",
      summary: "Freelance product design practice covering the full product lifecycle.",
      bullets: [
        "Redesigned a courier delivery confirmation flow after field research with 5 couriers, piloted with 12 drivers over 3 weeks. Measured results: around 8 seconds faster per stop and record compliance up from 92% to 98%. Proof-of-delivery disputes are projected to fall 30 to 40% based on the pilot data.",
        "Co-led DuoPet, a conceptual veterinary booking app, using a survey with 164 pet owners, personas, prototyping, and usability testing. The prototype reduced scheduling time by 15.9% against benchmark apps.",
        "Designed and shipped websites for small businesses from Figma to React/Vite, maintaining responsive behavior, accessibility, and brand consistency.",
      ],
    },
  ],

  skills: [
    {
      title: "UX Design",
      body: "Product discovery, qualitative and quantitative research, usability testing, interaction design, prototyping, mobile UX, design systems.",
    },
    {
      title: "Tools",
      body: "Figma, FigJam, React/Vite, HTML/CSS, Tailwind, Codex, Cursor, Claude, Notion, Linear.",
    },
    {
      title: "Technical prototyping",
      body: "From Figma to responsive React prototypes. AI-assisted workflows used to explore and validate faster.",
    },
    {
      title: "Languages",
      body: "Portuguese (native), English (fluent), German (B1, B2 professional course in progress).",
    },
  ],

  education: [
    {
      name: "AI Software Development",
      where: "WBS Coding School, Berlin",
      when: "2026 – present",
      // Um programa em duas fases, nao duas formacoes: o curso de codigo ainda
      // nao comecou, entao nao pode virar entrada separada.
      note: "Berufssprachkurs B2 followed by the coding curriculum.",
    },
    {
      name: "Google UX Design Certificate",
      where: "Professional Certificate, Coursera",
      when: "2025",
    },
    {
      name: "B.Sc. Biological Sciences",
      where: "Federal Institute of Southeast Minas Gerais",
      when: "2019",
    },
    {
      name: "Technical University of Munich",
      where: "Academic exchange",
      when: "2014 – 2016",
    },
  ],
};
