import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { removeBackground } from "@imgly/background-removal-node";
import sharp from "sharp";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_INPUT =
  "C:\\Users\\matth\\Downloads\\WhatsApp Image 2026-08-13 at 14.16.38.jpeg";

const INPUT_PATH = path.resolve(process.argv[2] ?? DEFAULT_INPUT);
const SIZE = 1200;
const CROP = { left: 65, top: 96, width: 790, height: 790 };
const GRADIENT_TOP = [0xf3, 0xf2, 0xf0];
const GRADIENT_BOTTOM = [0xfa, 0xfa, 0xf9];

const OUTPUTS = {
  final: path.join(SCRIPT_DIR, "linkedin-avatar.png"),
  preview400: path.join(SCRIPT_DIR, "preview-400.png"),
  preview152: path.join(SCRIPT_DIR, "preview-152.png"),
  preview48: path.join(SCRIPT_DIR, "preview-48.png"),
};

const clampByte = (value) => Math.max(0, Math.min(255, Math.round(value)));

function makeGradient() {
  const buffer = Buffer.alloc(SIZE * SIZE * 3);

  for (let y = 0; y < SIZE; y += 1) {
    const t = y / (SIZE - 1);
    const color = GRADIENT_TOP.map((start, channel) =>
      Math.round(start + (GRADIENT_BOTTOM[channel] - start) * t),
    );

    for (let x = 0; x < SIZE; x += 1) {
      const offset = (y * SIZE + x) * 3;
      buffer[offset] = color[0];
      buffer[offset + 1] = color[1];
      buffer[offset + 2] = color[2];
    }
  }

  return buffer;
}

function looksLikeSkin(red, green, blue) {
  const brightest = Math.max(red, green, blue);
  const darkest = Math.min(red, green, blue);

  return (
    red > 80 &&
    green > 45 &&
    blue > 28 &&
    red > green * 1.025 &&
    red > blue * 1.08 &&
    brightest - darkest > 18
  );
}

function glassesProtectionWeight(x, y) {
  const left = 330;
  const right = 870;
  const top = 490;
  const bottom = 710;
  const feather = 28;
  const dx = Math.max(left - x, 0, x - right);
  const dy = Math.max(top - y, 0, y - bottom);
  const distance = Math.hypot(dx, dy);

  return Math.max(0, Math.min(1, 1 - distance / feather));
}

async function refineForeground(segmentedBuffer) {
  const { data: rgba, info } = await sharp(segmentedBuffer)
    .ensureAlpha()
    .toColourspace("srgb")
    .raw()
    .toBuffer({ resolveWithObject: true });

  if (info.width !== SIZE || info.height !== SIZE || info.channels !== 4) {
    throw new Error(
      `Unexpected foreground dimensions: ${info.width}x${info.height}, ${info.channels} channels`,
    );
  }

  const originalAlpha = Buffer.alloc(SIZE * SIZE);
  for (let pixel = 0; pixel < SIZE * SIZE; pixel += 1) {
    originalAlpha[pixel] = rgba[pixel * 4 + 3];
  }

  const [erodedResult, protectedResult, innerResult] = await Promise.all([
    sharp(originalAlpha, { raw: { width: SIZE, height: SIZE, channels: 1 } })
        .erode(2)
        .blur(0.7)
        .linear(1.04, -3)
        .toColourspace("b-w")
        .raw()
        .toBuffer({ resolveWithObject: true }),
    sharp(originalAlpha, { raw: { width: SIZE, height: SIZE, channels: 1 } })
        .blur(0.45)
        .toColourspace("b-w")
        .raw()
        .toBuffer({ resolveWithObject: true }),
    sharp(originalAlpha, { raw: { width: SIZE, height: SIZE, channels: 1 } })
        .erode(4)
        .toColourspace("b-w")
        .raw()
        .toBuffer({ resolveWithObject: true }),
  ]);

  for (const [name, result] of [
    ["eroded", erodedResult],
    ["protected", protectedResult],
    ["inner", innerResult],
  ]) {
    if (result.info.channels !== 1 || result.data.length !== SIZE * SIZE) {
      throw new Error(
        `${name} mask is ${result.info.channels} channels and ${result.data.length} bytes`,
      );
    }
  }

  const erodedAlpha = erodedResult.data;
  const protectedAlpha = protectedResult.data;
  const innerAlpha = innerResult.data;

  const refined = Buffer.alloc(rgba.length);
  const finalAlpha = Buffer.alloc(SIZE * SIZE);

  for (let y = 0; y < SIZE; y += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      const pixel = y * SIZE + x;
      const offset = pixel * 4;
      const protectGlasses = glassesProtectionWeight(x, y);
      let alpha = clampByte(
        erodedAlpha[pixel] * (1 - protectGlasses) +
          protectedAlpha[pixel] * protectGlasses,
      );
      const edgeWeight = Math.max(
        0,
        Math.min(1, (originalAlpha[pixel] - innerAlpha[pixel]) / 180),
      );

      let red = rgba[offset];
      let green = rgba[offset + 1];
      let blue = rgba[offset + 2];

      if (protectGlasses < 1 && alpha > 0) {
        const greenDominance = green - Math.max(red, blue);
        const greenSaturation = green - Math.min(red, blue);

        if (greenDominance > 4 && greenSaturation > 12) {
          alpha = clampByte(alpha * protectGlasses);
        }
      }

      if (edgeWeight > 0 && alpha > 0) {
        if (protectGlasses < 1) {
          let bestPixel = pixel;
          let bestScore = innerAlpha[pixel];

          for (let dy = -6; dy <= 6; dy += 1) {
            const nearbyY = y + dy;
            if (nearbyY < 0 || nearbyY >= SIZE) continue;

            for (let dx = -6; dx <= 6; dx += 1) {
              const nearbyX = x + dx;
              if (nearbyX < 0 || nearbyX >= SIZE) continue;

              const nearbyPixel = nearbyY * SIZE + nearbyX;
              const distance = Math.hypot(dx, dy);
              const score = innerAlpha[nearbyPixel] - distance * 4;
              if (score > bestScore) {
                bestScore = score;
                bestPixel = nearbyPixel;
              }
            }
          }

          if (bestPixel !== pixel) {
            const bestOffset = bestPixel * 4;
            const interiorMix = 0.42 * edgeWeight * (1 - protectGlasses);
            red = red * (1 - interiorMix) + rgba[bestOffset] * interiorMix;
            green =
              green * (1 - interiorMix) + rgba[bestOffset + 1] * interiorMix;
            blue = blue * (1 - interiorMix) + rgba[bestOffset + 2] * interiorMix;
          }
        }

        const luma = red * 0.2126 + green * 0.7152 + blue * 0.0722;
        const desaturation = 0.28 * edgeWeight;
        red = red * (1 - desaturation) + luma * desaturation;
        green = green * (1 - desaturation) + luma * desaturation;
        blue = blue * (1 - desaturation) + luma * desaturation;

        const neutralGreen = ((red + blue) / 2) * 1.02;
        const greenExcess = Math.max(0, green - neutralGreen);
        green -= greenExcess * Math.min(1, 0.15 + 0.95 * edgeWeight);
      }

      if (alpha > 120 && looksLikeSkin(red, green, blue)) {
        red = red * 1.006 + 0.5;
        green *= 0.997;
        blue *= 1.004;
      }

      refined[offset] = clampByte(red);
      refined[offset + 1] = clampByte(green);
      refined[offset + 2] = clampByte(blue);
      refined[offset + 3] = alpha;
      finalAlpha[pixel] = alpha;
    }
  }

  return { refined, alpha: finalAlpha };
}

function findHairTop(alpha) {
  for (let y = 0; y < SIZE; y += 1) {
    let count = 0;
    let xTotal = 0;

    for (let x = 160; x < SIZE - 160; x += 1) {
      if (alpha[y * SIZE + x] >= 64) {
        count += 1;
        xTotal += x;
      }
    }

    if (count >= 12) {
      return { x: Math.round(xTotal / count), y };
    }
  }

  throw new Error("Could not find the top of the foreground subject");
}

async function writeCirclePreview(size, outputPath) {
  const circleMask = Buffer.from(
    `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
      `<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/>` +
      "</svg>",
  );

  await sharp(OUTPUTS.final)
    .resize(size, size, { fit: "fill", kernel: sharp.kernel.lanczos3 })
    .ensureAlpha()
    .composite([{ input: circleMask, blend: "dest-in" }])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outputPath);
}

function expectedGradientAt(y) {
  const t = y / (SIZE - 1);
  return GRADIENT_TOP.map((start, channel) =>
    Math.round(start + (GRADIENT_BOTTOM[channel] - start) * t),
  );
}

async function validateFinal(hairTop) {
  const metadata = await sharp(OUTPUTS.final).metadata();
  if (metadata.width !== SIZE || metadata.height !== SIZE) {
    throw new Error(`Final image is ${metadata.width}x${metadata.height}`);
  }
  if (metadata.hasAlpha) {
    throw new Error("Final image must not contain an alpha channel");
  }
  if (metadata.space !== "srgb") {
    throw new Error(`Final image colourspace is ${metadata.space}, expected srgb`);
  }

  const { data, info } = await sharp(OUTPUTS.final)
    .toColourspace("srgb")
    .raw()
    .toBuffer({ resolveWithObject: true });

  if (info.channels !== 3) {
    throw new Error(`Final image has ${info.channels} channels, expected 3`);
  }

  const borderSamples = [
    [0, 0],
    [120, 0],
    [240, 0],
    [360, 0],
    [480, 0],
    [600, 0],
    [720, 0],
    [840, 0],
    [960, 0],
    [1199, 0],
    [0, 90],
    [1199, 90],
    [0, 180],
    [1199, 180],
    [0, 270],
    [1199, 270],
    [0, 360],
    [1199, 360],
    [0, 450],
    [1199, 450],
  ];

  for (const [x, y] of borderSamples) {
    const offset = (y * SIZE + x) * 3;
    const actual = [data[offset], data[offset + 1], data[offset + 2]];
    const expected = expectedGradientAt(y);
    const maximumDelta = Math.max(
      ...actual.map((value, channel) => Math.abs(value - expected[channel])),
    );
    if (maximumDelta > 3) {
      throw new Error(
        `Border sample ${x},${y} is ${actual.join(",")}, expected ${expected.join(",")}`,
      );
    }
  }

  const centre = { x: SIZE / 2, y: SIZE / 2 };
  const hairDistance = Math.hypot(
    hairTop.x - centre.x,
    hairTop.y - centre.y,
  );
  if (hairDistance >= SIZE / 2) {
    throw new Error(
      `Hair top falls outside the LinkedIn circle: distance ${hairDistance.toFixed(1)}`,
    );
  }

  console.log(`Validated final: ${SIZE}x${SIZE}, sRGB, opaque RGB`);
  console.log("Validated border: 20 gradient samples passed");
  console.log(
    `Validated circle: hair top ${hairTop.x},${hairTop.y}, distance ${hairDistance.toFixed(1)} < 600`,
  );
}

async function main() {
  await fs.access(INPUT_PATH);

  const sourceMetadata = await sharp(INPUT_PATH).metadata();
  console.log(
    `Input: ${INPUT_PATH} (${sourceMetadata.width}x${sourceMetadata.height})`,
  );
  console.log(
    `Crop: left ${CROP.left}, top ${CROP.top}, ${CROP.width}x${CROP.height}`,
  );

  const cropped = await sharp(INPUT_PATH)
    .rotate()
    .extract(CROP)
    .resize(SIZE, SIZE, { fit: "fill", kernel: sharp.kernel.lanczos3 })
    .toColourspace("srgb")
    .withIccProfile("srgb")
    .png({ compressionLevel: 6 })
    .toBuffer();

  const croppedBlob = new Blob([cropped], { type: "image/png" });
  const segmentedBlob = await removeBackground(croppedBlob, {
    model: "medium",
    output: { format: "image/png", quality: 1 },
    progress: (key, current, total) => {
      const percent = total > 0 ? Math.round((current / total) * 100) : 0;
      process.stdout.write(`\rLoading ${key}: ${percent}%`);
      if (current >= total) process.stdout.write("\n");
    },
  });
  const segmented = Buffer.from(await segmentedBlob.arrayBuffer());
  if (process.env.DEBUG_AVATAR === "1") {
    await fs.writeFile(path.join(SCRIPT_DIR, "debug-segmented.png"), segmented);
  }
  const { refined, alpha } = await refineForeground(segmented);
  const hairTop = findHairTop(alpha);

  const foregroundPng = await sharp(refined, {
    raw: { width: SIZE, height: SIZE, channels: 4 },
  })
    .png({ compressionLevel: 6 })
    .toBuffer();

  await sharp(makeGradient(), {
    raw: { width: SIZE, height: SIZE, channels: 3 },
  })
    .composite([{ input: foregroundPng, left: 0, top: 0 }])
    .removeAlpha()
    .toColourspace("srgb")
    .withIccProfile("srgb")
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(OUTPUTS.final);

  await Promise.all([
    writeCirclePreview(400, OUTPUTS.preview400),
    writeCirclePreview(152, OUTPUTS.preview152),
    writeCirclePreview(48, OUTPUTS.preview48),
  ]);

  await validateFinal(hairTop);
  console.log("Generated linkedin-avatar.png and circular previews");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
