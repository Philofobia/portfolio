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
 * Two subsets, so the English page does not download the Japanese page's glyphs:
 *   shared  the characters a page in any locale may show: messages/en.json and the code
 *           in src/ (the hero band's terms, the language switcher, the name; comments
 *           left out, they never render). About 50 characters, ~8 KB per weight.
 *   ja      every character either page uses: the Japanese page's own, complete file.
 *   og      the ja characters again, as TrueType, at 400 only: for the Open Graph image
 *           (app/[locale]/opengraph-image.tsx). next/og draws text with satori, which
 *           reads TTF, OTF or WOFF but not WOFF2. Read at build time only, never sent to
 *           a browser.
 * The English page's font stacks list the shared face, then the ja face with a
 * unicode-range over the Japanese blocks: every character it shows is in the shared file,
 * so it never requests the ja one. The Japanese page's stacks (tokens.css,
 * :root:lang(ja)) leave the shared face out, so it downloads one file per weight, as
 * before the split: splitting its glyphs over two files would add each file's fixed
 * overhead (measured +9 KB). Measured 2026-11-23: /en fonts 123 → 70 KB, /jp unchanged.
 *
 *   node scripts/jp-font.mjs          download both subsets again (after copy changes)
 *   node scripts/jp-font.mjs --check  fail if the copy uses a character its subset lacks
 *
 * `pnpm build` runs --check first, so new Japanese copy cannot ship without its glyphs. A
 * character newly used on the English page must be in the shared subset, or that page
 * would quietly fetch the whole ja file for it: --check fails on that too.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const fontsDir = join(root, "src/fonts");
// format: the font format Google Fonts is asked for; uses: which character set it holds.
const subsets = {
  shared: {
    file: (weight) => `ibm-plex-sans-jp-shared-${weight}.woff2`,
    chars: join(fontsDir, "ibm-plex-sans-jp-shared.chars.txt"),
    weights: [300, 400],
    format: "woff2",
    uses: "shared",
  },
  ja: {
    file: (weight) => `ibm-plex-sans-jp-${weight}.woff2`,
    chars: join(fontsDir, "ibm-plex-sans-jp.chars.txt"),
    weights: [300, 400],
    format: "woff2",
    uses: "ja",
  },
  og: {
    file: (weight) => `ibm-plex-sans-jp-og-${weight}.ttf`,
    chars: join(fontsDir, "ibm-plex-sans-jp-og.chars.txt"),
    weights: [400],
    format: "truetype",
    uses: "ja",
  },
};

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

/** Code without its comments: Japanese in a doc comment is never rendered. */
function withoutComments(code) {
  return code.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
}

/** The characters each subset must hold, sorted: { shared, ja }. */
async function usedCharacters() {
  const shared = new Set();
  const ja = new Set();
  const add = (set, text) => {
    for (const char of text.match(japanese) ?? []) set.add(char);
  };
  add(shared, await readFile(join(root, "messages/en.json"), "utf8"));
  for await (const file of sourceFiles(join(root, "src"))) {
    const text = await readFile(file, "utf8");
    add(shared, file.endsWith(".json") ? text : withoutComments(text));
  }
  add(ja, await readFile(join(root, "messages/ja.json"), "utf8"));
  for (const char of shared) ja.add(char);
  const sorted = (set) => [...set].sort().join("");
  return { shared: sorted(shared), ja: sorted(ja) };
}

async function check() {
  const used = await usedCharacters();
  let failed = false;
  for (const [name, subset] of Object.entries(subsets)) {
    const have = await readFile(subset.chars, "utf8").catch(() => "");
    const missing = [...used[subset.uses]].filter(
      (char) => !have.includes(char),
    );
    if (missing.length) {
      console.error(
        `IBM Plex Sans JP ${name} subset is missing ${missing.length} character(s): ${missing.join("")}`,
      );
      failed = true;
    }
  }
  if (failed) {
    console.error("Run `pnpm fonts:jp` and commit src/fonts/.");
    process.exit(1);
  }
  console.log(
    `IBM Plex Sans JP subsets cover all characters: ${used.shared.length} shared, ${used.ja.length} on the Japanese page.`,
  );
}

async function download() {
  const used = await usedCharacters();
  // A current browser user agent gets woff2; with none, Google serves TrueType.
  const browser = {
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36",
  };

  for (const [name, subset] of Object.entries(subsets)) {
    const chars = used[subset.uses];
    const headers = subset.format === "woff2" ? browser : {};
    for (const weight of subset.weights) {
      const css = await fetch(
        `https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+JP:wght@${weight}&text=${encodeURIComponent(chars)}`,
        { headers },
      ).then((res) => {
        if (!res.ok) throw new Error(`Google Fonts CSS: HTTP ${res.status}`);
        return res.text();
      });
      const url = css.match(
        new RegExp(`url\\((https:[^)]+)\\)\\s*format\\('${subset.format}'\\)`),
      )?.[1];
      if (!url)
        throw new Error(
          `No ${subset.format} URL for ${name} ${weight}:\n${css}`,
        );

      const font = Buffer.from(
        await (await fetch(url, { headers })).arrayBuffer(),
      );
      const file = join(fontsDir, subset.file(weight));
      await writeFile(file, font);
      console.log(`${file}: ${font.length} bytes`);
    }
    await writeFile(subset.chars, chars + "\n");
    console.log(`${name}: ${chars.length} characters: ${chars}`);
  }
}

await (process.argv.includes("--check") ? check() : download());
