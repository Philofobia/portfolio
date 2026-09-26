/**
 * IBM Plex Sans JP, self-hosted as a subset: only the Japanese characters the site uses.
 *
 * next/font/google ships every Unicode slice of a CJK font as its own @font-face (≈120
 * per weight), a render-blocking stylesheet on every page. This script instead collects
 * the Japanese characters in messages/ and src/, asks Google Fonts for a woff2 holding
 * only those glyphs (the css2 `text=` parameter), and writes one file per weight to
 * src/fonts/, loaded by next/font/local in the root layout. The character list it used
 * is saved beside them.
 *
 *   node scripts/jp-font.mjs          download the subset again (after copy changes)
 *   node scripts/jp-font.mjs --check  fail if the copy uses a character the subset lacks
 *
 * `pnpm build` runs --check first, so new Japanese copy cannot ship without its glyphs.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const fontsDir = join(root, "src/fonts");
const charsFile = join(fontsDir, "ibm-plex-sans-jp.chars.txt");
const weights = [300, 400];

// CJK punctuation, kana, CJK ideographs (ext. A and unified), half/full-width forms.
const japanese =
  /[\u3000-\u30ff\u31f0-\u31ff\u3400-\u4dbf\u4e00-\u9fff\uff00-\uffef]/gu;

async function* sourceFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* sourceFiles(path);
    else if (/\.(json|tsx?)$/.test(entry.name)) yield path;
  }
}

async function usedCharacters() {
  const chars = new Set();
  for (const dir of ["messages", "src"]) {
    for await (const file of sourceFiles(join(root, dir))) {
      for (const char of (await readFile(file, "utf8")).match(japanese) ?? [])
        chars.add(char);
    }
  }
  return [...chars].sort().join("");
}

async function check() {
  const used = await usedCharacters();
  const subset = await readFile(charsFile, "utf8").catch(() => "");
  const missing = [...used].filter((char) => !subset.includes(char));
  if (missing.length) {
    console.error(
      `IBM Plex Sans JP subset is missing ${missing.length} character(s): ${missing.join("")}\n` +
        "Run `pnpm fonts:jp` and commit src/fonts/.",
    );
    process.exit(1);
  }
  console.log(`IBM Plex Sans JP subset covers all ${used.length} characters.`);
}

async function download() {
  const chars = await usedCharacters();
  // A current browser user agent, or Google serves TTF instead of woff2.
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36",
  };

  for (const weight of weights) {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+JP:wght@${weight}&text=${encodeURIComponent(chars)}`,
      { headers },
    ).then((res) => {
      if (!res.ok) throw new Error(`Google Fonts CSS: HTTP ${res.status}`);
      return res.text();
    });
    const url = css.match(/url\((https:[^)]+)\)\s*format\('woff2'\)/)?.[1];
    if (!url) throw new Error(`No woff2 URL for weight ${weight}:\n${css}`);

    const font = Buffer.from(
      await (await fetch(url, { headers })).arrayBuffer(),
    );
    const file = join(fontsDir, `ibm-plex-sans-jp-${weight}.woff2`);
    await writeFile(file, font);
    console.log(`${file}: ${font.length} bytes`);
  }

  await writeFile(charsFile, chars + "\n");
  console.log(`${chars.length} characters: ${chars}`);
}

await (process.argv.includes("--check") ? check() : download());
