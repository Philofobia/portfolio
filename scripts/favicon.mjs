/**
 * Site icons: the initial "M" as a halftone, in the hero emblem's language
 * (scripts/hero-emblem.mjs): a hexagonal lattice of dots where each lattice cell holds
 * either an ink dot, its area proportional to how much of the letter it covers, or a sky
 * dot in ink at 15% (= --line), smaller next to the letter. The letter is lit from the top
 * and fades towards the bottom (FADE), as the tower does towards the ground. The dark
 * theme's colours, on its background.
 *
 * The letter is a stroked path, blurred before it is sampled, so the dots shrink across
 * each stroke's edges instead of stopping dead: the gradation is what reads as halftone.
 *
 * Optical sizes: dots smaller than a pixel average out to a grey smudge, so each size has
 * its own lattice, coarser the smaller the icon (SIZES); a single SVG cannot do that,
 * which is why there is no icon.svg. Every image is drawn at its final size, not resampled.
 *
 * Writes:
 *   src/app/favicon.ico            16, 32 and 48px PNGs: the tab icon (Next adds its <link>)
 *   src/app/apple-icon.png         180px home-screen icon (iOS rounds the corners itself)
 *   public/icons/icon-192.png      web manifest icons (src/app/manifest.ts)
 *   public/icons/icon-512.png
 *   public/icons/icon-maskable-512.png   the art scaled into the maskable safe zone (the
 *                                        central 80% circle Android may crop to)
 *
 *   node scripts/favicon.mjs    (pnpm images:icons) after changing the letter or a constant
 *
 * sharp is not a dependency of this project: it is resolved through next, which installs it
 * for image optimisation.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");

const root = new URL("..", import.meta.url).pathname;

// The dark theme's tokens (src/styles/tokens.css): change both together.
const BG = "#1b1b1c";
const INK = "#ececee";
const SKY_OPACITY = 0.15; // = --line

const SAMPLE = 16; // raster px per lattice cell, to average each cell's coverage
const DOT_MIN = 0.14; // in cells: an ink dot smaller than this is sky instead
const SKY_RADIUS = 0.3; // in cells, an open-sky dot
const SKY_SHRINK = 0.12; // coverage at which a sky dot next to the letter would vanish

// Per output size: lattice columns, stroke (in the letter's 100-unit square), blur (in
// cells), FADE (share of the light lost from top to bottom) and the largest ink dot (in
// cells; above 0.5 neighbours overlap). Small sizes: fewer, bigger dots, a heavier stroke
// and less fade, so the letter keeps its contrast.
const SIZES = {
  16: { columns: 12, stroke: 15, blur: 0.4, fade: 0.4, radius: 0.58 },
  32: { columns: 14, stroke: 14, blur: 0.45, fade: 0.45, radius: 0.55 },
  48: { columns: 16, stroke: 13, blur: 0.55, fade: 0.5, radius: 0.52 },
  large: { columns: 20, stroke: 12, blur: 0.7, fade: 0.6, radius: 0.5 },
};

/**
 * The M in a 100-unit square: one stroked line (stems up, V down to y 72), clipped to its
 * box so the miters at the top and the butt ends at the bottom are cut flat.
 */
function letter(stroke) {
  const [x0, x1, y0, y1] = [16, 84, 18, 82];
  const half = stroke / 2;
  return `<clipPath id="c"><rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}"/></clipPath><path clip-path="url(#c)" fill="none" stroke="#fff" stroke-width="${stroke}" stroke-miterlimit="20" d="M${x0 + half} ${y1 + 5}V${y0}L50 ${y1 - 10}L${x1 - half} ${y0}V${y1 + 5}"/>`;
}

/** How much of each raster pixel the blurred letter covers, 0–255, one byte per pixel. */
async function coverage({ columns, stroke, blur }) {
  const raster = columns * SAMPLE;
  const mask = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${raster}" height="${raster}"><rect width="100" height="100"/>${letter(stroke)}</svg>`;
  const data = await sharp(Buffer.from(mask))
    .blur(blur * SAMPLE)
    .extractChannel(0)
    .raw()
    .toBuffer();
  return { data, raster };
}

const round = (value) => Math.round(value * 100) / 100;

/** The halftone as an SVG document, scale < 1 shrinking the art about the centre. */
async function halftone(settings, { size, scale = 1 }) {
  const { columns, fade, radius } = settings;
  const { data, raster } = await coverage(settings);
  const CELL = 10;
  const side = columns * CELL;
  const rowHeight = (CELL * Math.sqrt(3)) / 2; // hexagonal: rows closer than columns
  const ink = [];
  const sky = [];
  for (let row = 0; (row + 0.5) * rowHeight < side; row++) {
    const cy = (row + 0.5) * rowHeight;
    for (let col = 0; (col + 0.5 + (row % 2) * 0.5) * CELL < side; col++) {
      const cx = (col + 0.5 + (row % 2) * 0.5) * CELL;
      // Mean coverage of the raster square centred on the dot.
      const px0 = (cx / side) * raster;
      const py0 = (cy / side) * raster;
      let sum = 0;
      let count = 0;
      for (let py = Math.round(py0 - SAMPLE / 2); py < py0 + SAMPLE / 2; py++) {
        for (
          let px = Math.round(px0 - SAMPLE / 2);
          px < px0 + SAMPLE / 2;
          px++
        ) {
          if (px < 0 || py < 0 || px >= raster || py >= raster) continue;
          sum += data[py * raster + px];
          count++;
        }
      }
      const tone = (sum / count / 255) * (1 - fade * (cy / side));
      const r = radius * Math.sqrt(tone);
      if (r >= DOT_MIN) {
        ink.push([cx, cy, r * CELL]);
        continue;
      }
      const skyR = SKY_RADIUS * (1 - Math.min(1, tone / SKY_SHRINK));
      if (skyR > 0.05) sky.push([cx, cy, skyR * CELL]);
    }
  }
  const circles = (dots) =>
    dots
      .map(
        ([x, y, r]) =>
          `<circle cx="${round(x)}" cy="${round(y)}" r="${round(r)}"/>`,
      )
      .join("");
  const art = `<g fill="${INK}"><g fill-opacity="${SKY_OPACITY}">${circles(sky)}</g>${circles(ink)}</g>`;
  const c = side / 2;
  const placed =
    scale === 1
      ? art
      : `<g transform="translate(${c} ${c}) scale(${scale}) translate(${-c} ${-c})">${art}</g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side} ${side}" width="${size}" height="${size}"><rect width="${side}" height="${side}" fill="${BG}"/>${placed}</svg>`;
}

/**
 * A square PNG of the icon, rendered at its final size. Two colours and their blends need
 * no more than a 64-colour palette: about 40% lighter than full colour, with no visible
 * difference. An ICO must hold RGBA images (Next's build rejects a palette one), so the
 * favicon's images are full colour.
 */
async function png(size, { scale, palette = true } = {}) {
  const svg = await halftone(SIZES[size] ?? SIZES.large, { size, scale });
  return sharp(Buffer.from(svg))
    .ensureAlpha()
    .png(
      palette
        ? { compressionLevel: 9, palette: true, colours: 64, dither: 0 }
        : { compressionLevel: 9 },
    )
    .toBuffer();
}

/** An ICO file holding PNG images (supported by every browser that reads ICO). */
function ico(images) {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const entry = 6 + 16 * i;
    header.writeUInt8(size % 256, entry); // 0 means 256
    header.writeUInt8(size % 256, entry + 1);
    header.writeUInt16LE(1, entry + 4); // colour planes
    header.writeUInt16LE(32, entry + 6); // bits per pixel
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map(({ data }) => data)]);
}

const favicon = await Promise.all(
  [16, 32, 48].map(async (size) => ({
    size,
    data: await png(size, { palette: false }),
  })),
);

await mkdir(join(root, "public/icons"), { recursive: true });
await Promise.all([
  writeFile(join(root, "src/app/favicon.ico"), ico(favicon)),
  writeFile(join(root, "src/app/apple-icon.png"), await png(180)),
  writeFile(join(root, "public/icons/icon-192.png"), await png(192)),
  writeFile(join(root, "public/icons/icon-512.png"), await png(512)),
  // The M's top corners are 47 units from the centre of the 100-unit square; the safe
  // zone's radius is 40, so 0.8 brings them to 37 with a margin.
  writeFile(
    join(root, "public/icons/icon-maskable-512.png"),
    await png(512, { scale: 0.8 }),
  ),
]);

console.log("Wrote favicon.ico, apple-icon.png and public/icons/*.png");
