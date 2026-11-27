/**
 * GET /tech-sprite.svg — every tech icon as a <symbol id="tech-{id}">, built once at build
 * time from simple-icons. <TechIcon /> points at it with <use href="/tech-sprite.svg#…">,
 * so the path data is downloaded and cached once instead of riding in every page's HTML
 * and RSC payload. The dot in the path keeps it clear of the locale proxy.
 * The map must cover every IconTechId in lib/tech-icons (checked by `satisfies`); two
 * keys use another product's mark (chromedevtools → Chrome, mpulse → Akamai: tech-icons).
 */
import {
  siAkamai,
  siClaude,
  siConfluence,
  siDocker,
  siExpress,
  siFigma,
  siGit,
  siGithub,
  siGithubactions,
  siGoogleanalytics,
  siGooglechrome,
  siGooglegemini,
  siGrafana,
  siGraphql,
  siJira,
  siLinux,
  siMongodb,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siSqlite,
  siStorybook,
  siTailwindcss,
  siTypeorm,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { techSymbolId, type IconTechId } from "@/lib/tech-icons";

export const dynamic = "force-static";

const icons = {
  chromedevtools: siGooglechrome,
  claude: siClaude,
  confluence: siConfluence,
  docker: siDocker,
  express: siExpress,
  figma: siFigma,
  git: siGit,
  github: siGithub,
  githubactions: siGithubactions,
  googleanalytics: siGoogleanalytics,
  googlegemini: siGooglegemini,
  grafana: siGrafana,
  graphql: siGraphql,
  jira: siJira,
  linux: siLinux,
  mongodb: siMongodb,
  mpulse: siAkamai,
  nestjs: siNestjs,
  nextdotjs: siNextdotjs,
  nodedotjs: siNodedotjs,
  postgresql: siPostgresql,
  prisma: siPrisma,
  python: siPython,
  react: siReact,
  sqlite: siSqlite,
  storybook: siStorybook,
  tailwindcss: siTailwindcss,
  typeorm: siTypeorm,
  typescript: siTypescript,
} satisfies Record<IconTechId, SimpleIcon>;

export function GET() {
  const symbols = Object.entries(icons)
    .map(
      ([id, icon]) =>
        `<symbol id="${techSymbolId(id as IconTechId)}" viewBox="0 0 24 24"><path d="${icon.path}"/></symbol>`,
    )
    .join("");

  return new Response(
    `<svg xmlns="http://www.w3.org/2000/svg">${symbols}</svg>`,
    { headers: { "Content-Type": "image/svg+xml" } },
  );
}
