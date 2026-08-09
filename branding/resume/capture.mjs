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
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const BASE = process.env.RESUME_BASE_URL ?? "http://localhost:4173";
const currentDirectory = dirname(fileURLToPath(import.meta.url));
const outputPath = join(currentDirectory, "CV_Matthias_Schaefle.pdf");

const edgeCandidates = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];
const executablePath = edgeCandidates.find(existsSync);
if (!executablePath) {
  throw new Error("Microsoft Edge was not found. Update edgeCandidates in capture.mjs.");
}

const browser = await chromium.launch({ executablePath, headless: true });

try {
  const page = await browser.newPage();
  const response = await page.goto(`${BASE}/resume`, { waitUntil: "networkidle" });
  if (!response || !response.ok()) {
    throw new Error(`Nao consegui abrir ${BASE}/resume. O preview esta rodando? (npm run preview)`);
  }
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.waitForSelector(".resume-doc");

  const validation = await page.evaluate(() => {
    const root = document.querySelector(".resume-doc");
    const text = root.textContent;
    return {
      faces: Array.from(document.fonts).map((f) => ({ family: f.family.replaceAll('"', ""), status: f.status })),
      nameFont: getComputedStyle(document.querySelector(".resume-name")).fontFamily,
      role: document.querySelector(".resume-role").textContent.trim(),
      // O 30-40% e projecao, nao resultado medido. Ver CLAUDE.md (NDA).
      projecaoMarcada: /projected to fall 30 to 40%/.test(text),
      medidoSeparado: /Measured results:/.test(text),
      dataPresente: /Aug\. 2024 – Present/.test(text),
      semProductDesigner: !/Product Designer/.test(text),
      educacaoUnica: document.querySelectorAll(".resume-edu").length === 4,
    };
  });

  const expected = ["Space Grotesk", "Inter", "JetBrains Mono"];
  const fontsLoaded = expected.every((fam) =>
    validation.faces.some((f) => f.family === fam && f.status === "loaded"),
  );
  if (!fontsLoaded) {
    throw new Error(`Fontes nao carregaram: ${JSON.stringify(validation.faces)}`);
  }
  for (const chave of ["projecaoMarcada", "medidoSeparado", "dataPresente", "semProductDesigner", "educacaoUnica"]) {
    if (!validation[chave]) throw new Error(`Validacao de conteudo falhou: ${chave}`);
  }
  if (validation.role !== "UX/UI Designer") {
    throw new Error(`Cargo inesperado: ${validation.role}`);
  }

  await page.pdf({ path: outputPath, format: "A4", printBackground: true });

  const pdf = readFileSync(outputPath, "latin1");
  const paginas = (pdf.match(/\/Type\s*\/Page[^s]/g) || []).length;
  const imagens = (pdf.match(/\/Subtype\s*\/Image/g) || []).length;
  if (paginas !== 1) {
    throw new Error(`PDF saiu com ${paginas} paginas, esperado 1. Ajustar a escala no @media print de src/Resume.jsx.`);
  }
  // Um CV rasterizado nao e lido por ATS. Se aparecer imagem aqui, algo virou bitmap.
  if (imagens !== 0) {
    throw new Error(`PDF contem ${imagens} imagens; deveria ser so texto.`);
  }

  console.log(JSON.stringify({
    origem: `${BASE}/resume`,
    saida: outputPath,
    kb: +(statSync(outputPath).size / 1024).toFixed(0),
    paginas,
    imagens,
    cargo: validation.role,
    fonteDoNome: validation.nameFont,
  }, null, 2));
} finally {
  await browser.close();
}
