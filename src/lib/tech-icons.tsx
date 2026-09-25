/**
 * Tech icon sprite (simple-icons) + <TechIcon id /> that references the sprite by <use>.
 * techIcons is the registry: TechId is a simple-icons slug, and only the icons listed
 * here ship; techName(id) gives the label the design shows. <TechSprite /> renders each
 * path once, as a <symbol>, in the root layout; every <TechIcon /> after that is a
 * two-element <svg>, however often a tech repeats. Imported from the package, never the
 * CDN. Glyphs are mono grey (text-icon), never brand colours.
 */
import {
  siDocker,
  siGit,
  siGithub,
  siGithubactions,
  siGo,
  siGooglecloud,
  siGraphql,
  siGreensock,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siReact,
  siRedis,
  siStripe,
  siTerraform,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

// Keys are the simple-icons slugs (the design's `slug` prop).
export const techIcons = {
  docker: siDocker,
  git: siGit,
  github: siGithub,
  githubactions: siGithubactions,
  go: siGo,
  googlecloud: siGooglecloud,
  graphql: siGraphql,
  greensock: siGreensock,
  nextdotjs: siNextdotjs,
  nodedotjs: siNodedotjs,
  postgresql: siPostgresql,
  prisma: siPrisma,
  react: siReact,
  redis: siRedis,
  stripe: siStripe,
  terraform: siTerraform,
  typescript: siTypescript,
} satisfies Record<string, SimpleIcon>;

export type TechId = keyof typeof techIcons;

// The design's labels where they differ from the simple-icons title.
const shortNames: Partial<Record<TechId, string>> = {
  githubactions: "Actions",
  googlecloud: "GCP",
  greensock: "GSAP",
};

/** Display name: proper nouns, the same in every locale. */
export function techName(id: TechId) {
  return shortNames[id] ?? techIcons[id].title;
}

const symbolId = (id: TechId) => `tech-${id}`;

/** Once per document, in the root layout. */
export function TechSprite() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      className="absolute overflow-hidden"
    >
      {Object.entries(techIcons).map(([id, icon]) => (
        <symbol key={id} id={symbolId(id as TechId)} viewBox="0 0 24 24">
          <path d={icon.path} />
        </symbol>
      ))}
    </svg>
  );
}

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
      <use href={`#${symbolId(id)}`} />
    </svg>
  );
}
