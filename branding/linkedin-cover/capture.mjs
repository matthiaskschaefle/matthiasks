import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const WIDTH = 1584;
const HEIGHT = 396;
const SCALE = 2;

const variants = [
  {
    key: "a",
    filename: "linkedin-cover-a.png",
    title: "UX/UI Designer",
    subtitle: "Research first, prototype close to the build.",
  },
  {
    key: "b",
    filename: "linkedin-cover-b.png",
    title: "Research first, prototype close to the build.",
    subtitle: "",
  },
];

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(currentDirectory, "index.html");

const edgeCandidates = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];
const executablePath = edgeCandidates.find(existsSync);

if (!executablePath) {
  throw new Error("Microsoft Edge was not found. Update edgeCandidates in capture.mjs.");
}

const browser = await chromium.launch({
  executablePath,
  headless: true,
});

try {
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: SCALE,
    colorScheme: "light",
  });
  const page = await context.newPage();
  const results = [];
  let titleAnchor;

  for (const variant of variants) {
    const pageUrl = new URL(pathToFileURL(htmlPath).href);
    pageUrl.searchParams.set("variant", variant.key);
    await page.goto(pageUrl.href, { waitUntil: "load" });
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    await page.locator(".brand-mark").evaluate((image) => {
      if (!image.complete || image.naturalWidth === 0) {
        throw new Error("The brand mark did not load.");
      }
    });

    const validation = await page.evaluate(() => {
      const cover = document.querySelector("#linkedin-cover");
      const grid = document.querySelector(".cover-grid");
      const title = document.querySelector(".hero-title");
      const subtitle = document.querySelector(".hero-subtitle");
      const market = document.querySelector(".cover-market");
      const mark = document.querySelector(".brand-mark");
      const titleRect = title.getBoundingClientRect();
      const gridRect = grid.getBoundingClientRect();
      const directChildren = Array.from(cover.children);
      const loadedFaces = Array.from(document.fonts).map((face) => ({
        family: face.family.replaceAll('"', ""),
        status: face.status,
        weight: face.weight,
      }));

      return {
        variant: cover.dataset.variant,
        cover: cover.getBoundingClientRect().toJSON(),
        title: title.textContent,
        subtitle: subtitle.textContent,
        subtitleDisplay: getComputedStyle(subtitle).display,
        market: market.textContent,
        titleFont: getComputedStyle(title).fontFamily,
        titleFontSize: getComputedStyle(title).fontSize,
        titleWhiteSpace: getComputedStyle(title).whiteSpace,
        subtitleFont: getComputedStyle(subtitle).fontFamily,
        marketFont: getComputedStyle(market).fontFamily,
        loadedFaces,
        background: getComputedStyle(cover).backgroundColor,
        titleColor: getComputedStyle(title).color,
        subtitleColor: getComputedStyle(subtitle).color,
        gridLeft: gridRect.left,
        gridRight: innerWidth - gridRect.right,
        titleLeft: titleRect.left,
        titleTop: titleRect.top,
        titleRight: titleRect.right,
        titleFits: titleRect.right <= gridRect.right,
        markRight: innerWidth - mark.getBoundingClientRect().right,
        markSize: mark.getBoundingClientRect().width,
        gridPatternSize: getComputedStyle(cover, "::before").backgroundSize,
        gridPatternOpacity: getComputedStyle(cover, "::before").opacity,
        contentZoneClear: directChildren
          .filter((element) => !element.matches("script"))
          .every((element) => element.getBoundingClientRect().left >= 420),
      };
    });

    const expectedFaces = ["Space Grotesk", "Inter", "JetBrains Mono"];
    const fontsLoaded = expectedFaces.every((family) =>
      validation.loadedFaces.some(
        (face) => face.family === family && face.status === "loaded",
      ),
    );

    if (!fontsLoaded) {
      throw new Error(`Local font validation failed: ${JSON.stringify(validation.loadedFaces)}`);
    }
    if (validation.cover.width !== WIDTH || validation.cover.height !== HEIGHT) {
      throw new Error(`Root is ${validation.cover.width}x${validation.cover.height}, expected ${WIDTH}x${HEIGHT}.`);
    }
    if (validation.variant !== variant.key) {
      throw new Error(`Rendered variant ${validation.variant}, expected ${variant.key}.`);
    }
    if (validation.title !== variant.title || validation.subtitle !== variant.subtitle) {
      throw new Error(`Text validation failed: ${JSON.stringify(validation)}`);
    }
    if (
      (variant.key === "a" && validation.subtitleDisplay === "none")
      || (variant.key === "b" && validation.subtitleDisplay !== "none")
    ) {
      throw new Error(`Subtitle visibility failed: ${JSON.stringify(validation)}`);
    }
    if (
      validation.market !== "DE/BR"
      || !validation.contentZoneClear
      || validation.gridLeft !== 460
      || validation.gridRight !== 70
      || validation.markRight !== 70
      || validation.markSize !== 64
      || validation.gridPatternSize !== "48px 48px, 48px 48px"
      || validation.gridPatternOpacity !== "0.34"
    ) {
      throw new Error(`Editorial grid validation failed: ${JSON.stringify(validation)}`);
    }
    if (!validation.titleFits || validation.titleWhiteSpace !== "nowrap") {
      throw new Error(`The title does not fit on one line: ${JSON.stringify(validation)}`);
    }
    if (
      validation.background !== "rgb(250, 250, 249)"
      || validation.titleColor !== "rgb(26, 24, 21)"
      || validation.subtitleColor !== "rgb(91, 87, 78)"
    ) {
      throw new Error(`Token color validation failed: ${JSON.stringify(validation)}`);
    }

    if (!titleAnchor) {
      titleAnchor = {
        left: validation.titleLeft,
        top: validation.titleTop,
      };
    } else if (
      validation.titleLeft !== titleAnchor.left
      || validation.titleTop !== titleAnchor.top
    ) {
      throw new Error(`Variant title anchors differ: ${JSON.stringify({ titleAnchor, validation })}`);
    }

    const outputPath = join(currentDirectory, variant.filename);
    await page.locator("#linkedin-cover").screenshot({
      path: outputPath,
      type: "png",
      animations: "disabled",
      scale: "device",
    });

    const png = readFileSync(outputPath);
    const pngWidth = png.readUInt32BE(16);
    const pngHeight = png.readUInt32BE(20);

    if (pngWidth !== WIDTH * SCALE || pngHeight !== HEIGHT * SCALE) {
      throw new Error(`${variant.filename} is ${pngWidth}x${pngHeight}, expected ${WIDTH * SCALE}x${HEIGHT * SCALE}.`);
    }

    results.push({
      variant: variant.key,
      output: outputPath,
      dimensions: `${pngWidth}x${pngHeight}`,
      title: validation.title,
      subtitle: validation.subtitle,
      titleFontSize: validation.titleFontSize,
      titleFits: validation.titleFits,
      titleAnchor: {
        left: validation.titleLeft,
        top: validation.titleTop,
      },
      fonts: {
        title: validation.titleFont,
        subtitle: validation.subtitleFont,
        market: validation.marketFont,
      },
    });
  }

  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
