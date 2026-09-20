// Gera o PDF do curriculo IMPRIMINDO a rota /resume do site.
//
// Nao existe HTML de CV aqui: a pagina e a unica fonte. Se o PDF precisar
// mudar, mude src/Resume.jsx (layout, dentro do @media print) ou
// src/lib/resumeData.js (conteudo). Assim a pagina e o arquivo baixado nao
// tem como divergir.
//
// Uso:
//   npm run build && npm run preview      (na raiz, deixa rodando)
//   node branding/resume/capture.mjs
//
// Falha controlada (nao substitui as copias atuais):
//   RESUME_FORCE_PDF_FAIL=1 node branding/resume/capture.mjs
import {
  copyFileSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const BASE = process.env.RESUME_BASE_URL ?? "http://localhost:4173";
const currentDirectory = dirname(fileURLToPath(import.meta.url));
const brandingPdfPath = join(currentDirectory, "CV_Matthias_Schaefle.pdf");
const publicPdfPath = join(
  currentDirectory,
  "../../public/assets/portfolio/2026/07/CV_Matthias_Schaefle_2026-07.pdf",
);

const edgeCandidates = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];
const executablePath = edgeCandidates.find(existsSync);
if (!executablePath) {
  throw new Error("Microsoft Edge was not found. Update edgeCandidates in capture.mjs.");
}

function countPdfPages(pdfLatin1) {
  return (pdfLatin1.match(/\/Type\s*\/Page[^s]/g) || []).length;
}

function countPdfImages(pdfLatin1) {
  return (pdfLatin1.match(/\/Subtype\s*\/Image/g) || []).length;
}

function assertGeneratedPdf(tempPath) {
  if (process.env.RESUME_FORCE_PDF_FAIL === "1") {
    throw new Error("Validacao forçada: RESUME_FORCE_PDF_FAIL=1");
  }

  const pdf = readFileSync(tempPath, "latin1");
  const paginas = countPdfPages(pdf);
  const imagens = countPdfImages(pdf);
  if (paginas !== 1) {
    throw new Error(`PDF saiu com ${paginas} paginas, esperado 1. Ajustar a escala no @media print de src/Resume.jsx.`);
  }
  // Um CV rasterizado nao e lido por ATS. Se aparecer imagem aqui, algo virou bitmap.
  if (imagens !== 0) {
    throw new Error(`PDF contem ${imagens} imagens; deveria ser so texto.`);
  }
  return { paginas, imagens, kb: +(statSync(tempPath).size / 1024).toFixed(0) };
}

const tempDir = mkdtempSync(join(tmpdir(), "resume-pdf-"));
const tempPath = join(tempDir, "CV_Matthias_Schaefle.pdf");
let browser;

try {
  browser = await chromium.launch({ executablePath, headless: true });
  const page = await browser.newPage();
  const response = await page.goto(`${BASE}/resume`, { waitUntil: "networkidle" });
  if (!response || !response.ok()) {
    throw new Error(`Nao consegui abrir ${BASE}/resume. O preview esta rodando? (npm run preview)`);
  }
  // Playwright page.evaluate callbacks run in the browser.
  /* eslint-disable no-undef -- browser document inside Playwright evaluate */
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.waitForSelector(".resume-doc");

  const validation = await page.evaluate(() => {
    const root = document.querySelector(".resume-doc");
    const text = root.textContent;
    const hrefs = [...root.querySelectorAll("a")].map((a) => a.getAttribute("href"));
    return {
      faces: Array.from(document.fonts).map((f) => ({ family: f.family.replaceAll('"', ""), status: f.status })),
      nameFont: getComputedStyle(document.querySelector(".resume-name")).fontFamily,
      role: document.querySelector(".resume-role").textContent.trim(),
      projecaoMarcada: /projected 30 to 40%/.test(text),
      medidoSeparado: /92% to 98%/.test(text) && /7 to 8 seconds/.test(text),
      dataPresente: /2026 to present/.test(text),
      semProductDesigner: !/Product Designer/.test(text),
      educacaoUnica: document.querySelectorAll(".resume-edu").length === 4,
      licenciatura: /Licenciatura in Biological Sciences/.test(text),
      semBsc: !/\bB\.?\s*Sc\.?\b/i.test(text),
      intercambio: /Late 2014 to early 2016/.test(text),
      wbsAlemao: /Deutsch für den Beruf/.test(text),
      faseTecnicaNaoComecou: /has not started yet/.test(text),
      links: {
        tel: hrefs.includes("tel:+4915205830511"),
        mail: hrefs.includes("mailto:matthias.k.schaefle@gmail.com"),
        site: hrefs.includes("https://matthiasks.com"),
      },
    };
  });
  /* eslint-enable no-undef */

  const expected = ["Space Grotesk", "Inter", "JetBrains Mono"];
  const fontsLoaded = expected.every((fam) =>
    validation.faces.some((f) => f.family === fam && f.status === "loaded"),
  );
  if (!fontsLoaded) {
    throw new Error(`Fontes nao carregaram: ${JSON.stringify(validation.faces)}`);
  }
  const htmlKeys = [
    "projecaoMarcada",
    "medidoSeparado",
    "dataPresente",
    "semProductDesigner",
    "educacaoUnica",
    "licenciatura",
    "semBsc",
    "intercambio",
    "wbsAlemao",
    "faseTecnicaNaoComecou",
  ];
  for (const chave of htmlKeys) {
    if (!validation[chave]) throw new Error(`Validacao de conteudo falhou: ${chave}`);
  }
  for (const [chave, ok] of Object.entries(validation.links)) {
    if (!ok) throw new Error(`Validacao de link falhou: ${chave}`);
  }
  if (validation.role !== "UX/UI Designer") {
    throw new Error(`Cargo inesperado: ${validation.role}`);
  }

  await page.pdf({ path: tempPath, format: "A4", printBackground: true });
  const pdfStats = assertGeneratedPdf(tempPath);

  copyFileSync(tempPath, brandingPdfPath);
  copyFileSync(tempPath, publicPdfPath);

  console.log(JSON.stringify({
    origem: `${BASE}/resume`,
    temporario: tempPath,
    saida: brandingPdfPath,
    publico: publicPdfPath,
    kb: pdfStats.kb,
    paginas: pdfStats.paginas,
    imagens: pdfStats.imagens,
    cargo: validation.role,
    fonteDoNome: validation.nameFont,
    links: validation.links,
  }, null, 2));
} finally {
  if (browser) await browser.close();
  rmSync(tempDir, { recursive: true, force: true });
}
