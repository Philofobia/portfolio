/**
 * Hero emblem: Tokyo Tower at night (scripts/data/hero-tower.webp, from the design's assets)
 * as a halftone on a hexagonal lattice (odd rows shifted half a cell), with the sky as a
 * complementary field of fainter dots.
 *
 * Each lattice cell holds one of two dots:
 * - a tower dot, in full ink, its area proportional to the photo's brightness;
 * - a sky dot, in ink at SKY_OPACITY (the same as --line, white or black at 15%), full size
 *   in the open sky and smaller next to the tower, so the silhouette is drawn by both.
 * The skyline at the foot is removed and the tower fades out towards the ground (FADE), so
 * its base dissolves instead of ending in a blur of lit buildings.
 *
 * Writes the two forms HeroEmblem draws, from the same numbers, so they line up dot for dot:
 *   public/images/hero-tower.svg    the poster, an <img> (the hero's LCP): server HTML, no JS,
 *                                   reduced motion. Drawn in the dark theme's --ink (INK); the
 *                                   light theme inverts it (--emblem-filter in tokens.css).
 *                                   Under forced colours HeroEmblem uses it as a CSS mask
 *                                   instead, where only its alpha counts.
 *                                   The open sky is one pattern, cut out (an SVG mask) where
 *                                   the tower and its halo are; only those dots are listed.
 *   src/content/hero-emblem.ts      the tones and constants, for the DotMatrix canvas
 *
 *   node scripts/hero-emblem.mjs    (pnpm images:hero) after changing the photo or a constant
 *
 * sharp is not a dependency of this project: it is resolved through next, which installs it
 * for image optimisation.
 */
import { writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");

const root = new URL("..", import.meta.url).pathname;

const COLUMNS = 96; // dots across the square; 4.7px apart at the desktop size (448px)
const CELL = 7; // SVG units per cell
const SAMPLE = 12; // raster px per cell, to average each cell's brightness
const WHITE = 235; // brightness drawn as the largest tower dot
const FADE = 0.8; // the tower fades out from this share of the height to the bottom
const TOWER_RADIUS = 0.56; // in cells, the brightest tower dot (they overlap a little)
const TOWER_MIN = 0.11; // in cells: a tower dot smaller than this is sky instead
const SKY_RADIUS = 0.3; // in cells, an open-sky dot
const SKY_SHRINK = 0.12; // tone at which a sky dot next to the tower would vanish
const SKY_OPACITY = 0.15; // = --line (white / black at 15%)
const INK = "#ececee"; // the dark theme's --ink; inverted, ≈ the light one (#161618)
const NOISE = 0.012; // tones below this are the photo's grain: open sky

// The photo: the tower centred, about 85% of the height. The skyline is cut away beside
// the legs (outside x 318–573 below y 750, in the crop's 890px).
const CROP = { left: 67, top: 110, width: 890, height: 890 };
const SKYLINE = { top: 750 / 890, left: 318 / 890, right: 573 / 890 };

const raster = COLUMNS * SAMPLE;
const { data } = await sharp(join(root, "scripts/data/hero-tower.webp"))
  .extract(CROP)
  .greyscale()
  .resize(raster, raster)
  .raw()
  .toBuffer({ resolveWithObject: true });

function brightness(px, py) {
  if (
    py / raster > SKYLINE.top &&
    (px / raster < SKYLINE.left || px / raster > SKYLINE.right)
  ) {
    return 0;
  }
  return data[py * raster + px];
}

// Tone of each lattice cell, 0–1: the mean of the raster square centred on its dot,
// levelled to WHITE and faded towards the bottom.
const tones = new Uint8Array(COLUMNS * COLUMNS);
for (let row = 0; row < COLUMNS; row++) {
  const y = (row + 0.5) / COLUMNS;
  const fade = y <= FADE ? 1 : Math.max(0, 1 - (y - FADE) / (1 - FADE));
  for (let col = 0; col < COLUMNS; col++) {
    const cx = (col + 0.5 + (row % 2) * 0.5) * SAMPLE;
    const cy = (row + 0.5) * SAMPLE;
    let sum = 0;
    let count = 0;
    for (let py = Math.round(cy - SAMPLE / 2); py < cy + SAMPLE / 2; py++) {
      for (let px = Math.round(cx - SAMPLE / 2); px < cx + SAMPLE / 2; px++) {
        if (px < 0 || py < 0 || px >= raster || py >= raster) continue;
        sum += brightness(px, py);
        count++;
      }
    }
    const tone = Math.min(1, sum / count / WHITE) * fade;
    // Below NOISE the photo's night sky is grain, not tower: open sky, drawn by the pattern.
    tones[row * COLUMNS + col] = tone < NOISE ? 0 : Math.round(tone * 255);
  }
}

/** The dot of a cell, in cells: [radius, tower?]; radius 0 = none. */
function dot(tone) {
  const tower = TOWER_RADIUS * Math.sqrt(tone);
  if (tower >= TOWER_MIN) return [tower, true];
  const sky = SKY_RADIUS * (1 - Math.min(1, tone / SKY_SHRINK));
  return [sky > 0.04 ? sky : 0, false];
}

const round = (value) => Math.round(value * 100) / 100;

/**
 * A group of dots as one <path> d: a few nodes instead of ~1600 <circle>s, which the browser
 * parses and lays out on the main thread before the poster (the LCP) can paint. Each dot is
 * two arcs that end where they started, so the next dot is a short relative move (m) away.
 * Numbers drop their leading zero; the arc flags need no separators (SVG 2 path grammar).
 */
function dotsPath(dots) {
  const n = (value) => {
    const text = String(round(value));
    return text.replace(/^(-?)0\./, "$1.");
  };
  // " 1" but "-1": a minus already separates two numbers.
  const join = (...values) =>
    values.map((v, i) => (i && !v.startsWith("-") ? " " : "") + v).join("");
  let d = "";
  let atX = 0;
  let atY = 0;
  for (const [x, y, r] of dots) {
    const startX = round(x - r);
    d += d
      ? "m" + join(n(startX - atX), n(y - atY))
      : "M" + join(n(startX), n(y));
    const R = n(r);
    d += `a${join(R, R)} 0 10${n(2 * r)} 0a${join(R, R)} 0 10${n(-2 * r)} 0`;
    atX = startX;
    atY = y;
  }
  return d;
}
const size = COLUMNS * CELL;
const tower = [];
const halo = [];
const holes = [];
for (let row = 0; row < COLUMNS; row++) {
  for (let col = 0; col < COLUMNS; col++) {
    const tone = tones[row * COLUMNS + col] / 255;
    if (!tone) continue; // open sky: the pattern
    const x = round((col + 0.5 + (row % 2) * 0.5) * CELL);
    const y = round((row + 0.5) * CELL);
    holes.push([x, y, round(0.55 * CELL)]);
    const [radius, isTower] = dot(tone);
    if (!radius) continue;
    (isTower ? tower : halo).push([x, y, round(radius * CELL)]);
  }
}

// The open sky: one pattern tile (two rows, the second shifted half a cell), cut out
// where the tower and its halo are.
const sky = round(SKY_RADIUS * CELL);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" fill="${INK}">
<defs><pattern id="p" width="${CELL}" height="${CELL * 2}" patternUnits="userSpaceOnUse"><circle cx="${CELL / 2}" cy="${CELL / 2}" r="${sky}"/><circle cx="0" cy="${CELL * 1.5}" r="${sky}"/><circle cx="${CELL}" cy="${CELL * 1.5}" r="${sky}"/></pattern>
<mask id="m"><rect width="100%" height="100%" fill="#fff"/><path fill="#000" d="${dotsPath(holes)}"/></mask></defs>
<g fill-opacity="${SKY_OPACITY}"><rect width="100%" height="100%" fill="url(#p)" mask="url(#m)"/><path d="${dotsPath(halo)}"/></g>
<path d="${dotsPath(tower)}"/>
</svg>
`;

const ts = `/**
 * GENERATED by scripts/hero-emblem.mjs (pnpm images:hero): do not edit.
 * The hero emblem's halftone for the DotMatrix canvas; public/images/hero-tower.svg is the
 * same dots as the poster. tones: base64, one byte per cell, row by row (odd rows shifted
 * half a cell), 0–255. A cell's dot: a tower dot of towerRadius × √tone cells if that is at
 * least towerMin, else a sky dot of skyRadius × (1 − tone / skyShrink) cells, at skyOpacity.
 */
export const heroEmblemDots = {
  columns: ${COLUMNS},
  rows: ${COLUMNS},
  towerRadius: ${TOWER_RADIUS},
  towerMin: ${TOWER_MIN},
  skyRadius: ${SKY_RADIUS},
  skyShrink: ${SKY_SHRINK},
  skyOpacity: ${SKY_OPACITY},
  tones:
    "${Buffer.from(tones).toString("base64")}",
} as const;
`;

await writeFile(join(root, "public/images/hero-tower.svg"), svg);
await writeFile(join(root, "src/content/hero-emblem.ts"), ts);
console.log(
  `hero-emblem: ${tower.length} tower dots, ${halo.length} halo dots, svg ${Buffer.byteLength(svg)} bytes`,
);
