/**
 * Tech icon registry. techNames is the registry: TechId is a simple-icons slug, and
 * techName(id) gives the label the design shows. The glyphs themselves live in the static
 * sprite served by app/tech-sprite.svg/route.ts (built from simple-icons, never the CDN),
 * so this file carries no path data and is safe to import from client components.
 * The component that draws a glyph is atoms/TechIcon.
 */

// Keys are the simple-icons slugs (the design's `slug` prop); values the design's labels.
const techNames = {
  docker: "Docker",
  git: "Git",
  github: "GitHub",
  githubactions: "Actions",
  go: "Go",
  googlecloud: "GCP",
  graphql: "GraphQL",
  greensock: "GSAP",
  nextdotjs: "Next.js",
  nodedotjs: "Node.js",
  postgresql: "PostgreSQL",
  prisma: "Prisma",
  react: "React",
  redis: "Redis",
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
