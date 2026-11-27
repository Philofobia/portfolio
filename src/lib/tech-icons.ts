/**
 * Tech icon registry. techNames is the registry: TechId is a simple-icons slug, and
 * techName(id) gives the label the design shows. The glyphs themselves live in the static
 * sprite served by app/tech-sprite.svg/route.ts (built from simple-icons, never the CDN),
 * so this file carries no path data and is safe to import from client components.
 * The component that draws a glyph is atoms/TechIcon.
 *
 * As built: two lists. iconTechNames have a glyph in the sprite (IconTechId, the only ids
 * TechIcon and the ProjectCard rail take); textTechNames have none, because simple-icons
 * holds no mark for them (Microsoft Teams and Slack were removed at the brands' request;
 * Agile is a method; WebPageTest and Contentsquare are not in the set), so TechTag draws
 * them with a plain square. TechId is either.
 * Two keys name a product rather than its slug, drawn with its maker's mark:
 * chromedevtools (Chrome's glyph: the tool is DevTools, not the browser) and mpulse
 * (Akamai's glyph: mPulse is Akamai's real-user monitoring).
 */

// Keys are the simple-icons slugs (the design's `slug` prop) unless noted above; values
// the design's labels, except three that name the product in full (2026-11-27, GEO: a
// crawler or a person reading "DevTools", "Actions" or "Analytics" can't tell which
// product it is): Chrome DevTools, GitHub Actions, Google Analytics. The JSON-LD
// knowsAbout reads the same names.
const iconTechNames = {
  chromedevtools: "Chrome DevTools",
  claude: "Claude",
  confluence: "Confluence",
  docker: "Docker",
  express: "Express",
  figma: "Figma",
  git: "Git",
  github: "GitHub",
  githubactions: "GitHub Actions",
  googleanalytics: "Google Analytics",
  googlegemini: "Gemini",
  grafana: "Grafana",
  graphql: "GraphQL",
  jira: "Jira",
  linux: "Linux",
  mongodb: "MongoDB",
  mpulse: "mPulse",
  nestjs: "NestJS",
  nextdotjs: "Next.js",
  nodedotjs: "Node.js",
  postgresql: "PostgreSQL",
  prisma: "Prisma",
  python: "Python",
  react: "React",
  sqlite: "SQLite",
  storybook: "Storybook",
  tailwindcss: "Tailwind",
  typeorm: "TypeORM",
  typescript: "TypeScript",
} as const;

const textTechNames = {
  agile: "Agile",
  contentsquare: "Contentsquare",
  slack: "Slack",
  teams: "Teams",
  webpagetest: "WebPageTest",
} as const;

export type IconTechId = keyof typeof iconTechNames;
export type TechId = IconTechId | keyof typeof textTechNames;

/** The ids with a glyph in the sprite (the storybook draws them all). */
export const techIds = Object.keys(iconTechNames) as IconTechId[];

export function hasIcon(id: TechId): id is IconTechId {
  return id in iconTechNames;
}

/** Display name: proper nouns, the same in every locale. */
export function techName(id: TechId) {
  return hasIcon(id) ? iconTechNames[id] : textTechNames[id];
}

export const techSymbolId = (id: IconTechId) => `tech-${id}`;

/**
 * The sprite's URL, versioned by the icon set (a short hash of the ids). The sprite is
 * cached by browsers (next.config.ts); without the version, a visitor holding yesterday's
 * copy would get blank cells for every icon added since. Adding or removing an icon
 * changes the URL, so the new sprite is fetched; the route ignores the query.
 */
export const spriteHref = `/tech-sprite.svg?v=${[...techIds.join()]
  .reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7)
  .toString(36)}`;
