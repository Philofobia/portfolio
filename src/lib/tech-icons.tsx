/**
 * Tech icon registry + <TechIcon id /> that references the sprite by <use>.
 * techNames is the registry: TechId is a simple-icons slug, and techName(id) gives the
 * label the design shows. The glyphs themselves live in the static sprite served by
 * app/tech-sprite.svg/route.ts (built from simple-icons, never the CDN), so this file
 * carries no path data and is safe to import from client components. Every <TechIcon />
 * is a two-element <svg>, however often a tech repeats. Glyphs are mono grey (text-icon),
 * never brand colours.
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

const sizeClass = {
  // Design: 16 on 12px text, 14 on 11px (m); scales with the tag's text.
  tag: "size-[1.3333em]",
  // Design: 20, 18 on mobile.
  cell: "size-4.5 md:size-5",
} as const;

export type TechIconSize = keyof typeof sizeClass;

/**
 * Decorative glyph, hidden from assistive tech: the tech's name must be in the
 * surrounding text (see ui/TechTag). Size comes from the map, not from className.
 */
export function TechIcon({ id, size }: { id: TechId; size: TechIconSize }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`${sizeClass[size]} shrink-0 fill-current text-icon`}
    >
      <use href={`/tech-sprite.svg#${techSymbolId(id)}`} />
    </svg>
  );
}
