/**
 * Performance check through Chrome's DevTools protocol (no Lighthouse): loads each page in
 * headless Chrome, as a throttled phone, and reads what the browser actually measured.
 *
 *   pnpm build && pnpm perf:check                 serve the build on :3100 and check it
 *   node scripts/perf-check.mjs --url <origin>    check a server that is already running
 *     --runs <n>          loads per page, default 5; each one in a fresh profile (cold cache)
 *     --trace-dir <dir>   also save one DevTools trace per page (open it in the
 *                         Performance panel: "Load profile…")
 *
 * Chrome comes from CHROME_PATH or a usual install path; puppeteer-core downloads none.
 *
 * What fails the check is what does not move between runs on a shared CI machine:
 * - bytes over the wire per type for what every page shares (JavaScript, CSS, fonts),
 *   against the web-performance skill's budgets tuned to this project (BUDGETS);
 * - each section of <main> at most 20 KB (30 KB for Work, the image showcase: its HTML
 *   share + the images it loads), and
 *   everything a visit loads once every section has scrolled in: a separate, unthrottled
 *   load per page at a phone and a retina desktop viewport (measureSections);
 * - the LCP element: not lazy-loaded, and inside #hero once the page renders the Hero;
 * - CLS ≤ 0.1, the median of the runs (layout shift barely varies in a lab run);
 * - render-blocking requests: no more than BUDGETS.renderBlocking.
 * Timings (TTFB, FCP, LCP and its four parts, TBT) are only reported, as medians: on a
 * shared runner they swing by a third from one run to the next, whatever the tool.
 *
 * Throttling is applied, not simulated: DevTools' "Slow 4G" network and a 4× slower CPU,
 * on a 412 × 823 phone viewport. Bytes are those `next start` sends (gzip; Vercel serves
 * brotli, a little smaller), headers included. On GitHub Actions the report is also
 * written to the job summary.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { gzipSync } from "node:zlib";
import puppeteer, { PredefinedNetworkConditions } from "puppeteer-core";

const root = new URL("..", import.meta.url).pathname;
// The URLs, not the locale codes: ja is served under /jp (src/i18n/routing.ts).
const pages = ["/en", "/jp"];

// Bytes over the wire (web-performance SKILL.md, "Budgets", tuned to this project), and
// the largest number of render-blocking requests (today: the one CSS file).
// The page is budgeted in two layers, as Marco set them (2026-11-23):
// - what every page shares: Next/React JavaScript, CSS, fonts;
// - each section of <main>, at most 20 KB: its share of the HTML plus the images it loads
//   once it scrolls into view (measureSections).
// The page-wide HTML figure is reported, not checked: it grows by design with every
// section, and the section budget is what guards it now.
const KB = 1024;
const BUDGETS = {
  section: 20 * KB,
  // Sections allowed more, by id. Work is the image showcase: one project photo is ~19 KB
  // at 2x on its own (Marco, 2026-11-23).
  sectionOverrides: { work: 30 * KB },
  css: 60 * KB,
  // The skill's 150 KB is below this stack's floor: the Next 16 + React 19 runtime alone
  // is ~160 KB, and the page measured 165 KB (2026-11-20). The budget guards growth:
  // +1 KB on 2026-11-23 for the Work carousel's photo loading (WorkCarousel, ~0.3 KB),
  // measured 175.1 KB.
  js: 176 * KB,
  // Per page: Geist and Geist Mono everywhere, plus IBM Plex Sans JP's small shared subset
  // on /en and its complete subset on /jp (scripts/jp-font.mjs). Measured + ~10%
  // (2026-11-23: 69.5 / 125 KB).
  fonts: { "/en": 75 * KB, "/jp": 135 * KB },
  heroImage: 150 * KB,
  thirdPartyJs: 100 * KB,
  // Every byte a visit can load: the first view, then every section scrolled into view
  // (the lazy images), at the heavier of the two section viewports. Shared ~310 KB
  // (2026-11-23) + seven sections.
  totalScrolled: 450 * KB,
  cls: 0.1,
  renderBlocking: 1,
};

// What a section adds to the page's gzipped HTML, per byte of its own markup gzipped
// alone: its markup and the RSC payload's copy of it, which compress against each other.
// Measured by building the page with and without the Stack section (2026-11-23): /en
// +3.7 KB for 2.3 KB alone (1.6), /jp +4.0 KB for 2.6 KB (1.54). Re-measure when a
// section differs much in kind (a long list, mostly attributes).
const HTML_SHARE = 1.6;

// The section pass (one load per viewport, unthrottled: bytes do not depend on the
// network): a phone, as the vitals runs, and a retina desktop, where the layouts load
// their largest images (the Stack grid's second photo, 2x sources).
const SECTION_VIEWPORTS = {
  phone: { width: 412, height: 823, deviceScaleFactor: 1.75, isMobile: true },
  desktop: { width: 1600, height: 1000, deviceScaleFactor: 2 },
};

// The LCP must be inside this element, once the page has it (the Hero section is not on
// the page yet); and never a lazy-loaded image.
const LCP_CONTAINER = "#hero";

const { values: options } = parseArgs({
  options: {
    url: { type: "string" },
    runs: { type: "string", default: "5" },
    "trace-dir": { type: "string" },
  },
});
const runs = Number(options.runs);

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/usr/bin/google-chrome-stable",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ];
  const found = candidates.find((path) => path && existsSync(path));
  if (!found) throw new Error("Chrome not found: set CHROME_PATH.");
  return found;
}

/** Starts `next start` on a free-ish port and resolves once it answers. */
async function startServer() {
  const port = 3100;
  const server = spawn(
    join(root, "node_modules/.bin/next"),
    ["start", "-p", `${port}`],
    {
      cwd: root,
      stdio: ["ignore", "ignore", "inherit"],
    },
  );
  const origin = `http://localhost:${port}`;
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null)
      throw new Error("next start exited: run pnpm build first.");
    try {
      if ((await fetch(`${origin}${pages[0]}`)).ok) return { origin, server };
    } catch {
      // not listening yet
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  server.kill();
  throw new Error("next start did not answer within 30 s.");
}

/**
 * Runs in the page before any of its scripts: collects LCP (with its element), CLS (the
 * largest session window, as web-vitals counts it) and long tasks.
 */
function observeVitals(lcpContainer) {
  const vitals = { lcp: null, cls: 0, longTasks: [] };
  window.__vitals = vitals;

  new PerformanceObserver((list) => {
    const entry = list.getEntries().at(-1);
    const element = entry.element;
    vitals.lcp = {
      time: entry.startTime,
      url: entry.url,
      // null: the page has no such container yet, so there is nothing to check.
      inContainer: document.querySelector(lcpContainer)
        ? Boolean(element?.closest(lcpContainer))
        : null,
      lazy: element?.getAttribute("loading") === "lazy",
      element: element
        ? `<${element.tagName.toLowerCase()}>${entry.url ? ` ${entry.url}` : ` "${element.textContent.trim().slice(0, 40)}"`}`
        : "(removed from the page)",
    };
  }).observe({ type: "largest-contentful-paint", buffered: true });

  let session = 0;
  let first = 0;
  let last = 0;
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.hadRecentInput) continue;
      if (
        session &&
        entry.startTime - last < 1000 &&
        entry.startTime - first < 5000
      ) {
        session += entry.value;
      } else {
        session = entry.value;
        first = entry.startTime;
      }
      last = entry.startTime;
      vitals.cls = Math.max(vitals.cls, session);
    }
  }).observe({ type: "layout-shift", buffered: true });

  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      vitals.longTasks.push({
        start: entry.startTime,
        duration: entry.duration,
      });
    }
  }).observe({ type: "longtask", buffered: true });
}

/** Reads the collected entries back, with navigation and resource timing. */
function readVitals() {
  const { lcp, cls, longTasks } = window.__vitals;
  const [navigation] = performance.getEntriesByType("navigation");
  const fcp =
    performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0;
  const resources = performance.getEntriesByType("resource");
  const lcpResource = lcp?.url
    ? resources.find((entry) => entry.name === lcp.url)
    : null;
  return {
    ttfb: navigation.responseStart,
    fcp,
    lcp,
    cls,
    // Total blocking time after FCP, until the page went quiet.
    tbt: longTasks
      .filter((task) => task.start >= fcp)
      .reduce((sum, task) => sum + Math.max(0, task.duration - 50), 0),
    lcpResource: lcpResource && {
      start: lcpResource.requestStart || lcpResource.startTime,
      end: lcpResource.responseEnd,
    },
    renderBlocking: resources
      .filter((entry) => entry.renderBlockingStatus === "blocking")
      .map((entry) => new URL(entry.name).pathname),
  };
}

function byteType(type) {
  return (
    {
      Document: "html",
      Stylesheet: "css",
      Script: "js",
      Image: "image",
      Font: "font",
    }[type] ?? "other"
  );
}

/** One cold load of `url`; returns the measurements. */
async function load(browser, url, tracePath) {
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await page.setViewport({
    width: 412,
    height: 823,
    deviceScaleFactor: 1.75,
    isMobile: true,
    hasTouch: true,
  });
  await page.emulateNetworkConditions(PredefinedNetworkConditions["Slow 4G"]);
  await page.emulateCPUThrottling(4);
  await page.evaluateOnNewDocument(observeVitals, LCP_CONTAINER);

  const requests = new Map();
  const cdp = await page.createCDPSession();
  await cdp.send("Network.enable");
  cdp.on("Network.responseReceived", ({ requestId, type, response }) => {
    requests.set(requestId, {
      url: response.url,
      type: byteType(type),
      bytes: 0,
    });
  });
  cdp.on("Network.loadingFinished", ({ requestId, encodedDataLength }) => {
    const request = requests.get(requestId);
    if (request) request.bytes = encodedDataLength;
  });

  if (tracePath)
    await page.tracing.start({ path: tracePath, screenshots: true });
  const response = await page.goto(url, {
    waitUntil: "networkidle0",
    timeout: 60_000,
  });
  if (response?.status() !== 200) {
    throw new Error(
      `${url} answered ${response?.status()}: not a page to measure.`,
    );
  }
  // Let hydration-time work (the emblem's canvas) land in the long-task list.
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (tracePath) await page.tracing.stop();

  const vitals = await page.evaluate(readVitals);
  await context.close();

  const origin = new URL(url).origin;
  const bytes = {
    html: 0,
    css: 0,
    js: 0,
    image: 0,
    font: 0,
    other: 0,
    total: 0,
    thirdPartyJs: 0,
  };
  for (const request of requests.values()) {
    if (request.url.startsWith("data:")) continue;
    bytes[request.type] += request.bytes;
    bytes.total += request.bytes;
    if (request.type === "js" && new URL(request.url).origin !== origin) {
      bytes.thirdPartyJs += request.bytes;
    }
  }
  const hero = [...requests.values()].find(
    (request) => request.url === vitals.lcp?.url,
  );
  bytes.heroImage = hero?.bytes ?? 0;
  return { ...vitals, bytes };
}

/**
 * Loads `url` once at `viewport` and scrolls every section of <main> into view, so its lazy
 * images load. Per section: its HTML share, the section's markup in the server HTML gzipped
 * on its own, times HTML_SHARE (the RSC payload after </body> repeats it, but the two
 * copies compress together), and the bytes of the images it shows
 * (each <img>'s currentSrc: hidden ones load nothing). An image in a horizontal scroller
 * (the Work carousel) counts once its slide is near: what a visitor who does not swipe
 * loads. Also returns every byte the page loaded by then.
 */
async function measureSections(browser, url, viewport) {
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await page.setViewport(viewport);
  // Instant scrolling: no smooth-scroll animation between sections.
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  const urls = new Map();
  const bytesByUrl = new Map();
  let total = 0;
  const cdp = await page.createCDPSession();
  await cdp.send("Network.enable");
  cdp.on("Network.responseReceived", ({ requestId, response }) =>
    urls.set(requestId, response.url),
  );
  cdp.on("Network.loadingFinished", ({ requestId, encodedDataLength }) => {
    const requestUrl = urls.get(requestId);
    if (!requestUrl || requestUrl.startsWith("data:")) return;
    bytesByUrl.set(
      requestUrl,
      (bytesByUrl.get(requestUrl) ?? 0) + encodedDataLength,
    );
    total += encodedDataLength;
  });

  const response = await page.goto(url, {
    waitUntil: "networkidle0",
    timeout: 60_000,
  });
  const html = await response.text();
  const ids = await page.$$eval("main section[id]", (sections) =>
    sections.map((section) => section.id),
  );
  for (const id of ids) {
    // From the section's top to its bottom, a screen at a time.
    await page.evaluate(async (sectionId) => {
      const section = document.getElementById(sectionId);
      section.scrollIntoView({ block: "start" });
      const bottom = section.getBoundingClientRect().bottom + scrollY;
      while (
        scrollY + innerHeight < bottom &&
        scrollY + innerHeight < document.documentElement.scrollHeight
      ) {
        scrollBy(0, innerHeight * 0.8);
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }, id);
    await page.waitForNetworkIdle({ idleTime: 500, timeout: 30_000 });
  }

  const sections = await page.evaluate((serverHtml) => {
    const server = new DOMParser().parseFromString(serverHtml, "text/html");
    return [...document.querySelectorAll("main section[id]")].map(
      (section) => ({
        id: section.id,
        html: server.getElementById(section.id)?.outerHTML ?? "",
        images: [
          ...new Set(
            [...section.querySelectorAll("img")]
              .map((image) => image.currentSrc)
              .filter(Boolean),
          ),
        ],
      }),
    );
  }, html);
  await context.close();

  return {
    total,
    sections: sections.map((section) => {
      const htmlBytes = Math.round(gzipSync(section.html).length * HTML_SHARE);
      const imageBytes = section.images.reduce(
        (sum, image) => sum + (bytesByUrl.get(image) ?? 0),
        0,
      );
      return {
        id: section.id,
        html: htmlBytes,
        images: imageBytes,
        total: htmlBytes + imageBytes,
      };
    }),
  };
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
}

const kb = (bytes) => `${(bytes / KB).toFixed(1)} KB`;
const ms = (time) => `${Math.round(time)} ms`;

/** Turns the runs of one page into report rows and failures. */
function evaluate(path, results) {
  const rows = [];
  const failures = [];
  const check = (name, value, budget, format) => {
    const ok = value <= budget;
    rows.push([name, format(value), format(budget), ok ? "ok" : "**over**"]);
    if (!ok)
      failures.push(`${path}: ${name} ${format(value)} > ${format(budget)}`);
  };
  const report = (name, value) => rows.push([name, value, "", "report"]);

  const bytes = (key) => median(results.map((result) => result.bytes[key]));
  report("HTML (whole page)", kb(bytes("html")));
  check("CSS", bytes("css"), BUDGETS.css, kb);
  check("JavaScript", bytes("js"), BUDGETS.js, kb);
  check("Third-party JS", bytes("thirdPartyJs"), BUDGETS.thirdPartyJs, kb);
  if (results[0].lcp?.url)
    check("LCP image", bytes("heroImage"), BUDGETS.heroImage, kb);
  check("Fonts", bytes("font"), BUDGETS.fonts[path], kb);
  report("Total, first view", kb(bytes("total")));

  check("CLS", median(results.map((result) => result.cls)), BUDGETS.cls, (v) =>
    v.toFixed(3),
  );
  const blocking = results[0].renderBlocking;
  check(
    "Render-blocking requests",
    blocking.length,
    BUDGETS.renderBlocking,
    String,
  );
  if (blocking.length > BUDGETS.renderBlocking)
    failures.push(`  blocking: ${blocking.join(", ")}`);

  const lcpElements = [
    ...new Set(results.map((result) => result.lcp?.element)),
  ].join(" / ");
  const hasContainer = results.some(
    (result) => result.lcp?.inContainer !== null,
  );
  const expected = hasContainer
    ? `in ${LCP_CONTAINER}, eager`
    : `eager (no ${LCP_CONTAINER} yet)`;
  const wrongLcp = results.filter(
    (result) =>
      !result.lcp || result.lcp.inContainer === false || result.lcp.lazy,
  );
  rows.push([
    "LCP element",
    lcpElements,
    expected,
    wrongLcp.length ? "**wrong**" : "ok",
  ]);
  if (wrongLcp.length)
    failures.push(`${path}: LCP element ${lcpElements}, expected ${expected}`);

  const time = (pick) => ms(median(results.map(pick)));
  report(
    "TTFB",
    time((r) => r.ttfb),
  );
  report(
    "FCP",
    time((r) => r.fcp),
  );
  report(
    "LCP",
    time((r) => r.lcp?.time ?? 0),
  );
  if (results.every((r) => r.lcpResource)) {
    report(
      "· load delay",
      time((r) => r.lcpResource.start - r.ttfb),
    );
    report(
      "· load duration",
      time((r) => r.lcpResource.end - r.lcpResource.start),
    );
    report(
      "· render delay",
      time((r) => r.lcp.time - r.lcpResource.end),
    );
  }
  report(
    "TBT (after FCP)",
    time((r) => r.tbt),
  );
  return { rows, failures };
}

/**
 * The section budget: per section, the heavier of the two viewports. Also the total a
 * visit can load once every section has scrolled in.
 */
function evaluateSections(path, byViewport) {
  const failures = [];
  const lines = [
    `#### ${path} sections (HTML share + images, heavier viewport)`,
    "",
    "| Section | HTML (est.) | Images | Total | Budget | |",
    "| --- | --- | --- | --- | --- | --- |",
  ];
  const ids = byViewport.phone.sections.map((section) => section.id);
  for (const id of ids) {
    const [viewport, worst] = Object.entries(byViewport)
      .map(([name, result]) => [
        name,
        result.sections.find((section) => section.id === id),
      ])
      .filter(([, section]) => section)
      .reduce((a, b) => (b[1].total > a[1].total ? b : a));
    const budget = BUDGETS.sectionOverrides[id] ?? BUDGETS.section;
    const ok = worst.total <= budget;
    lines.push(
      `| #${id} (${viewport}) | ${kb(worst.html)} | ${kb(worst.images)} | ${kb(worst.total)} | ${kb(budget)} | ${ok ? "ok" : "**over**"} |`,
    );
    if (!ok)
      failures.push(
        `${path}: #${id} ${kb(worst.total)} > ${kb(budget)} (${viewport})`,
      );
  }
  const [viewport, scrolled] = Object.entries(byViewport).reduce((a, b) =>
    b[1].total > a[1].total ? b : a,
  );
  const ok = scrolled.total <= BUDGETS.totalScrolled;
  lines.push(
    `| Total, every section scrolled in (${viewport}) | | | ${kb(scrolled.total)} | ${kb(BUDGETS.totalScrolled)} | ${ok ? "ok" : "**over**"} |`,
    "",
  );
  if (!ok)
    failures.push(
      `${path}: total scrolled ${kb(scrolled.total)} > ${kb(BUDGETS.totalScrolled)} (${viewport})`,
    );
  return { markdown: lines.join("\n"), failures };
}

function table(path, rows) {
  return [
    `### ${path}`,
    "",
    "| Metric | Median | Budget | |",
    "| --- | --- | --- | --- |",
    ...rows.map((row) => `| ${row.join(" | ")} |`),
    "",
  ].join("\n");
}

const { origin, server } = options.url
  ? { origin: options.url.replace(/\/$/, ""), server: null }
  : await startServer();
const stopServer = () => server?.kill();
process.on("SIGINT", () => {
  stopServer();
  process.exit(130);
});

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  // GitHub's Ubuntu images block the user namespaces Chrome's sandbox needs.
  args: process.env.CI ? ["--no-sandbox"] : [],
});

const failures = [];
let markdown = `## Performance (Chrome DevTools protocol, Slow 4G, 4× CPU, ${runs} runs, medians)\n\n`;
try {
  if (options["trace-dir"])
    await mkdir(options["trace-dir"], { recursive: true });
  for (const path of pages) {
    const results = [];
    for (let run = 0; run < runs; run++)
      results.push(await load(browser, origin + path));
    if (options["trace-dir"]) {
      // A separate load: tracing slows the page, so it is not counted.
      const name = path.replace(/\W+/g, "") || "root";
      await load(
        browser,
        origin + path,
        join(options["trace-dir"], `${name}.json`),
      );
    }
    const result = evaluate(path, results);
    failures.push(...result.failures);
    markdown += table(path, result.rows) + "\n";

    const byViewport = {};
    for (const [name, viewport] of Object.entries(SECTION_VIEWPORTS))
      byViewport[name] = await measureSections(
        browser,
        origin + path,
        viewport,
      );
    const sections = evaluateSections(path, byViewport);
    failures.push(...sections.failures);
    markdown += sections.markdown + "\n";
  }
} finally {
  await browser.close();
  stopServer();
}

console.log(markdown);
if (process.env.GITHUB_STEP_SUMMARY)
  await appendFile(process.env.GITHUB_STEP_SUMMARY, markdown);
if (failures.length) {
  console.error(`Performance budgets failed (${failures.length}):`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}
console.log("Performance budgets met.");
