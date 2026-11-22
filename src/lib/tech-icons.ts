/**
 * Tech icon registry. techNames is the registry: TechId is a simple-icons slug, and
 * techName(id) gives the label the design shows. The glyphs themselves live in the static
 * sprite served by app/tech-sprite.svg/route.ts (built from simple-icons, never the CDN),
 * so this file carries no path data and is safe to import from client components.
 * The component that draws a glyph is atoms/TechIcon.
 */

// Keys are the simple-icons slugs (the design's `slug` prop); values the design's labels.
const techNames = {
  claude: "Claude",
  docker: "Docker",
  git: "Git",
  github: "GitHub",
  githubactions: "Actions",
  go: "Go",
  googleanalytics: "Analytics",
  googlechrome: "Chrome",
  googlecloud: "GCP",
  googlegemini: "Gemini",
  grafana: "Grafana",
  graphql: "GraphQL",
  greensock: "GSAP",
  jira: "Jira",
  nestjs: "NestJS",
  nextdotjs: "Next.js",
  nodedotjs: "Node.js",
  postgresql: "PostgreSQL",
  prisma: "Prisma",
  python: "Python",
  react: "React",
  redis: "Redis",
  sqlite: "SQLite",
  storybook: "Storybook",
  stripe: "Stripe",
  terraform: "Terraform",
  typescript: "TypeScript",
} as const;

export type TechId = keyof typeof techNames;

export const techIds = Object.keys(techNames) as TechId[];

/** Display name: proper nouns, the same in every locale. */
export function techName(id: TechId) {
  return techNames[id];
}

export const techSymbolId = (id: TechId) => `tech-${id}`;

/**
 * The sprite's URL, versioned by the icon set (a short hash of the ids). The sprite is
 * cached by browsers (next.config.ts); without the version, a visitor holding yesterday's
 * copy would get blank cells for every icon added since. Adding or removing an icon
 * changes the URL, so the new sprite is fetched; the route ignores the query.
 */
export const spriteHref = `/tech-sprite.svg?v=${[...techIds.join()]
  .reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7)
  .toString(36)}`;
