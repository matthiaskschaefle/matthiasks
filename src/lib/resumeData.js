// Fonte unica do curriculo. Consumido pela pagina /resume (src/Resume.jsx) e
// pelo gerador do PDF (branding/resume/build-pdf.mjs). Editar SO aqui: se o
// texto for duplicado num dos dois, a pagina e o PDF divergem sem aviso.
//
// Regras que valem para este arquivo (ver CLAUDE.md):
// - NDA do case Delivery: nao inventar metrica. O 30-40% de disputas e
//   PROJECAO, nao resultado medido, e o texto tem que dizer isso.
// - Posicionamento e "UX/UI Designer". Nao usar "Design Engineer".
// - Sem em-dash em texto corrido.
// - DuoPet e projeto educacional. Nao misturar com experiencia profissional.

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
    "UX/UI Designer based in Berlin with paid client experience across operational product flows and service websites. I work from field research and information architecture through interaction design, high-fidelity UI, validation, and handoff or implementation. My strongest project is a delivery confirmation redesign piloted with 12 drivers, which reduced task time and improved record compliance. I also build responsive interfaces in React and Vite.",

  experience: [
    {
      title: "UX/UI Designer: Delivery operations redesign",
      kind: "Paid freelance client project · Vulpes Studio",
      period: "2025",
      summary: "Redesign of a delivery confirmation flow for a small freight company in Barbacena, Brazil.",
      bullets: [
        "Field research with 5 couriers followed by a three-week pilot with 12 drivers.",
        "The redesigned flow was approximately 7 to 8 seconds faster per stop and increased record compliance from 92% to 98%.",
        "A 30 to 40% reduction in proof-of-delivery disputes was projected from the pilot data. This was not a measured production result.",
      ],
    },
    {
      title: "UX/UI and Web Designer: Dr. Hélio",
      kind: "Paid freelance client project",
      period: "2024",
      summary: "Research, information architecture, visual identity, responsive UI, and website delivery for a plastic surgeon.",
      bullets: [
        "Used patient interviews and recurring questions from social media to define the content hierarchy.",
        "Designed the information architecture, interface, logo, and visual system.",
        "Delivered a website the client could update independently; the identity remains in use.",
      ],
    },
  ],

  educationalProjects: [
    {
      title: "DuoPet",
      kind: "Course project",
      period: "2023",
      summary: "Concept for veterinary appointment booking developed during UX training.",
      bullets: [
        "Survey with 164 pet owners and 5 follow-up interviews.",
        "Two rounds of usability testing with small samples.",
        "In the limited course test, the prototype averaged 45 seconds for the scheduling task. This is not a validated product outcome.",
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
      body: "Portuguese (native), English (fluent), German (B1 certified; B2 professional course in progress).",
    },
  ],

  education: [
    {
      name: "Front-end Development and AI Weiterbildung",
      where: "WBS Coding School, Berlin",
      when: "2026 to present",
      note: "Current phase: three-month professional German B2 course. The front-end and AI technical curriculum begins afterward and has not started yet.",
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
      when: "2014 to 2016",
    },
  ],
};
