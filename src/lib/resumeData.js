// Fonte unica do curriculo. Consumido pela pagina /resume (src/Resume.jsx) e
// pelo gerador do PDF (branding/resume/capture.mjs). Editar SO aqui: se o
// texto for duplicado num dos dois, a pagina e o PDF divergem sem aviso.
//
// Regras que valem para este arquivo:
// - NDA do case Delivery: nao inventar metrica. A projecao de 30-40% de
//   disputas fica no case, nao neste curriculo.
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
    "UX/UI Designer in Berlin. Paid client work on operational flows and service websites, from research to delivered interface design. This portfolio is built in React and Vite.",

  experience: [
    {
      title: "UX/UI Designer: Delivery workflow",
      kind: "Paid freelance client project, Vulpes Studio",
      period: "2025",
      summary: "Redesign of a delivery confirmation flow for a small freight company in Barbacena, Brazil.",
      bullets: [
        "I led the field sessions and designed the receiver confirmation flow.",
        "Field research with 5 couriers. Pilot with 12 drivers over three weeks.",
        "7 to 8 seconds faster per stop and 2 fewer taps. Record compliance from 92% to 98%, figures from the development and data team.",
      ],
    },
    {
      title: "UX/UI and Web Designer: Dr. Hélio",
      kind: "Paid freelance client project",
      period: "2024",
      summary: "Research, information architecture, visual identity, responsive UI, and website delivery for a plastic surgeon.",
      bullets: [
        "Used patient interviews and recurring social-media questions to define the information architecture, content hierarchy, and responsive interface.",
        "Created the visual identity and delivered the website for independent client updates; the identity remains in use.",
      ],
    },
  ],

  educationalProjects: [
    {
      title: "DuoPet",
      kind: "Course project",
      period: "2023",
      summary: "Educational UX course prototype for veterinary appointment booking, pair work with Leticia Magri.",
      bullets: [
        "Both of us worked across a survey of 164 pet owners, 5 interviews, and two small-sample usability rounds.",
      ],
    },
  ],

  skills: [
    {
      title: "UX Design",
      body: "Field observation and interviews, interaction design, prototyping, and a client style guide. Usability rounds on the DuoPet course project.",
    },
    {
      title: "Tools",
      body: "Figma, FigJam, React/Vite, HTML/CSS, Tailwind, Cursor, Codex, Claude, Notion, Linear.",
    },
    {
      title: "Technical prototyping",
      body: "Figma to responsive React prototypes, including this portfolio.",
    },
    {
      title: "Languages",
      body: "Portuguese (native), English (fluent), German (B1 certified, Deutsch für den Beruf in progress).",
    },
  ],

  education: [
    {
      name: "AI Software Development",
      where: "WBS Coding School, Berlin",
      when: "2026 to present",
      note: "Current phase: three months of Deutsch für den Beruf. AI Software Development comes next and has not started yet.",
    },
    {
      name: "Google UX Design Certificate",
      where: "Professional Certificate, Coursera",
      when: "2025",
    },
    {
      name: "Licenciatura in Biological Sciences",
      where: "Federal Institute of Southeast Minas Gerais",
      when: "2019",
    },
    {
      name: "Technical University of Munich",
      where: "Academic exchange",
      when: "Late 2014 to early 2016",
    },
  ],
};
