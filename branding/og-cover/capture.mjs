// Gera a imagem de Open Graph (1200x630) a partir do index.html desta pasta.
// Rodar: node branding/og-cover/capture.mjs
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const WIDTH = 1200;
const HEIGHT = 630;

const dir = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(dir, "index.html");
const outputPath = join(dir, "og-cover.png");

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
  await page.evaluate(async () => { await document.fonts.ready; });

  const v = await page.evaluate(() => {
    const og = document.querySelector("#og");
    const r = og.getBoundingClientRect();
    return {
      w: r.width, h: r.height,
      texto: og.textContent.replace(/\s+/g, " ").trim(),
      // o motivo desta peca existir: nao pode voltar mid point nenhum
      temMidPoint: /·|•|‧|・|∙|⋅/.test(og.textContent),
      fontes: Array.from(document.fonts).map((f) => f.family.replaceAll('"', "") + ":" + f.status),
      fundo: getComputedStyle(og).backgroundColor,
      corNome: getComputedStyle(document.querySelector(".og-name")).color,
      corRole: getComputedStyle(document.querySelector(".og-role")).color,
      fonteNome: getComputedStyle(document.querySelector(".og-name")).fontFamily,
    };
  });

  if (!v.fontes.some((f) => f === "Space Grotesk:loaded")) {
    throw new Error(`Space Grotesk nao carregou: ${JSON.stringify(v.fontes)}`);
  }
  if (v.temMidPoint) throw new Error("A peca voltou a ter mid point.");
  if (v.w !== WIDTH || v.h !== HEIGHT) throw new Error(`Raiz ${v.w}x${v.h}, esperado ${WIDTH}x${HEIGHT}.`);

  await page.locator("#og").screenshot({ path: outputPath, type: "png", scale: "device" });

  const png = readFileSync(outputPath);
  const w = png.readUInt32BE(16);
  const h = png.readUInt32BE(20);
  if (w !== WIDTH || h !== HEIGHT) throw new Error(`PNG ${w}x${h}, esperado ${WIDTH}x${HEIGHT}.`);

  console.log(JSON.stringify({
    saida: outputPath,
    dimensoes: `${w}x${h}`,
    kb: +(statSync(outputPath).size / 1024).toFixed(0),
    texto: v.texto,
    temMidPoint: v.temMidPoint,
    fundo: v.fundo,
    corNome: v.corNome,
    corRole: v.corRole,
    fonteNome: v.fonteNome,
  }, null, 2));
} finally {
  await browser.close();
}
