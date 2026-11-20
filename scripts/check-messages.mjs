/**
 * Message parity: messages/en.json and messages/ja.json must hold the same key tree, and
 * each string must use the same ICU arguments ({date}, {count, plural, …}) in both.
 *
 * next-intl reports a missing key only at runtime, as the raw key on the page; a renamed
 * argument renders as nothing. This catches both before merge.
 *
 *   node scripts/check-messages.mjs   exit 1 and list every mismatch
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const locales = ["en", "ja"];
const [base, ...others] = locales;

/** Flattens a message tree to `a.b.c` → value (arrays use their indices). */
function flatten(node, prefix = "", out = new Map()) {
  if (node !== null && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      flatten(value, prefix ? `${prefix}.${key}` : key, out);
    }
  } else {
    out.set(prefix, node);
  }
  return out;
}

/** ICU argument names in a message: `{date}`, `{count, plural, …}` → date, count. */
function argumentsOf(value) {
  if (typeof value !== "string") return "";
  const names = [...value.matchAll(/\{\s*([A-Za-z_]\w*)/g)].map((m) => m[1]);
  return [...new Set(names)].sort().join(", ");
}

const trees = Object.fromEntries(
  await Promise.all(
    locales.map(async (locale) => {
      const file = join(root, "messages", `${locale}.json`);
      return [locale, flatten(JSON.parse(await readFile(file, "utf8")))];
    }),
  ),
);

const problems = [];
for (const other of others) {
  for (const [a, b] of [
    [base, other],
    [other, base],
  ]) {
    for (const key of trees[a].keys()) {
      if (!trees[b].has(key))
        problems.push(`${key}: in ${a}.json, missing in ${b}.json`);
    }
  }
  for (const [key, value] of trees[base]) {
    if (!trees[other].has(key)) continue;
    const want = argumentsOf(value);
    const got = argumentsOf(trees[other].get(key));
    if (want !== got) {
      problems.push(
        `${key}: arguments {${want}} in ${base}.json, {${got}} in ${other}.json`,
      );
    }
  }
}

if (problems.length > 0) {
  console.error(`Message files differ (${problems.length}):`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}
console.log(
  `Messages match: ${trees[base].size} keys in ${locales.join(", ")}.`,
);
