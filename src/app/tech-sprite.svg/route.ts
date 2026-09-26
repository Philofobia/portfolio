/**
 * GET /tech-sprite.svg — every tech icon as a <symbol id="tech-{id}">, built once at build
 * time from simple-icons. <TechIcon /> points at it with <use href="/tech-sprite.svg#…">,
 * so the path data is downloaded and cached once instead of riding in every page's HTML
 * and RSC payload. The dot in the path keeps it clear of the locale proxy.
 * The map must cover every TechId in lib/tech-icons (checked by `satisfies`).
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
import { techSymbolId, type TechId } from "@/lib/tech-icons";

export const dynamic = "force-static";

const icons = {
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
} satisfies Record<TechId, SimpleIcon>;

export function GET() {
  const symbols = Object.entries(icons)
    .map(
      ([id, icon]) =>
        `<symbol id="${techSymbolId(id as TechId)}" viewBox="0 0 24 24"><path d="${icon.path}"/></symbol>`,
    )
    .join("");

  return new Response(
    `<svg xmlns="http://www.w3.org/2000/svg">${symbols}</svg>`,
    { headers: { "Content-Type": "image/svg+xml" } },
  );
}
