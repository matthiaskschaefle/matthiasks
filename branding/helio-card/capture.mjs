// Gera a imagem do card do case 02 (identidade Dr. Helio) a partir do
// index.html desta pasta. Rodar: node branding/helio-card/capture.mjs
//
// 1500x1125 e a mesma dimensao do card vizinho (DuoPet), que divide a linha
// de dois com este. Fundo chapado na primaria da marca, logo vetorial em
// 45% da largura, faixa de amostras alinhada as bordas do logo.
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const WIDTH = 1500;
const HEIGHT = 1125;
const BRAND = "rgb(9, 44, 76)"; // #092C4C

const dir = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(dir, "index.html");
// PNG, nao JPEG: a peca e cor chapada com bordas vetoriais, o pior caso do
// JPEG, que espalha artefato em volta de cada borda de alto contraste. Aqui o
// PNG sai menor E sem perda, entao nao ha troca a fazer.
const outputPath = join(dir, "..", "..", "public", "media", "helio-identity.png");

const edge = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].find(existsSync);
if (!edge) throw new Error("Microsoft Edge nao encontrado.");

const browser = await chromium.launch({ executablePath: edge, headless: true });

try {
  const ctx = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
    colorScheme: "light",
  });
  const page = await ctx.newPage();
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });

  const v = await page.evaluate(() => {
    const card = document.querySelector("#card");
    const mark = document.querySelector("#card .mark");
    const band = document.querySelector("#swatches");
    const r = card.getBoundingClientRect();
    const m = mark.getBoundingClientRect();
    const b = band.getBoundingClientRect();
    return {
      w: r.width, h: r.height,
      fundo: getComputedStyle(card).backgroundColor,
      logoLargura: Math.round(m.width),
      logoPct: +(m.width / r.width * 100).toFixed(1),
      margemEsquerdaLogo: Math.round(m.left),
      margemEsquerdaFaixa: Math.round(b.left),
      folgaAcimaDaFaixa: Math.round(b.top - m.bottom),
      folgaAbaixoDaFaixa: Math.round(r.bottom - b.bottom),
      // a peca nao pode ter texto proprio: so o lockup, que e vetor
      textoSolto: card.textContent.replace(/\s+/g, "").length,
      rasterEmbutido: document.querySelectorAll("image, img").length,
    };
  });

  if (v.w !== WIDTH || v.h !== HEIGHT) throw new Error(`Card ${v.w}x${v.h}, esperado ${WIDTH}x${HEIGHT}.`);
  if (v.fundo !== BRAND) throw new Error(`Fundo ${v.fundo}, esperado ${BRAND}.`);
  if (Math.abs(v.logoPct - 45) > 1) throw new Error(`Logo em ${v.logoPct}% da largura, esperado ~45%.`);
  if (v.margemEsquerdaLogo !== v.margemEsquerdaFaixa) {
    throw new Error(`Faixa em ${v.margemEsquerdaFaixa}px, logo em ${v.margemEsquerdaLogo}px: nao alinhados.`);
  }
  if (v.textoSolto !== 0) throw new Error("A peca ganhou texto fora do logo.");
  if (v.rasterEmbutido !== 0) throw new Error("A peca ganhou raster: o logo tem que ser o SVG.");

  // omitBackground preserva o alfa dos cantos arredondados.
  await page.locator("#card").screenshot({ path: outputPath, type: "png", scale: "device", omitBackground: true });

  const png = readFileSync(outputPath);
  const w = png.readUInt32BE(16);
  const h = png.readUInt32BE(20);
  if (w !== WIDTH || h !== HEIGHT) throw new Error(`PNG ${w}x${h}, esperado ${WIDTH}x${HEIGHT}.`);

  console.log(JSON.stringify({
    saida: outputPath,
    dimensoes: `${w}x${h}`,
    kb: +(statSync(outputPath).size / 1024).toFixed(0),
    ...v,
  }, null, 2));
} finally {
  await browser.close();
}
