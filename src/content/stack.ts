/**
 * Stack groups → ordered list of tech ids per group (frontend/backend/data/infra/ways).
 * Each id maps to an icon in lib/tech-icons.
 *
 * As built: frontend · backend · data · performance · ways. The design's 'infra' group
 * (Docker, Actions, Terraform, GCP) became 'performance': the CV backs web performance
 * (the eyewear role, performance-report) and not Terraform or a cloud provider; Docker and
 * Linux moved to backend, Actions to ways. Ids are TechIds, with a glyph or text only
 * (lib/tech-icons). Every tech is one the CV, a project or Marco names (DevTools as the
 * performance tool, mPulse, Confluence, Teams, Agile, Slack and Figma came from Marco,
 * 2026-11-23).
 * Order is the page's: cells A.–E. key is the group's key in messages stack.groups (title,
 * description).
 */
import type { TechId } from "@/lib/tech-icons";

export type StackGroup = {
  key: string;
  techs: readonly TechId[];
};

export const stackGroups = [
  {
    key: "frontend",
    techs: ["typescript", "react", "nextdotjs", "tailwindcss", "storybook"],
  },
  {
    key: "backend",
    techs: ["nodedotjs", "nestjs", "express", "docker", "linux"],
  },
  {
    key: "data",
    techs: ["graphql", "prisma", "typeorm", "mongodb", "sqlite"],
  },
  {
    key: "performance",
    techs: [
      "chromedevtools",
      "webpagetest",
      "mpulse",
      "grafana",
      "contentsquare",
      "python",
    ],
  },
  {
    key: "ways",
    techs: [
      "agile",
      "jira",
      "confluence",
      "teams",
      "slack",
      "figma",
      "git",
      "githubactions",
      "claude",
    ],
  },
] as const satisfies readonly StackGroup[];

export type StackGroupKey = (typeof stackGroups)[number]["key"];

/**
 * The two photo cells (design: one beside Backend, one beside Data). Unbranded Unsplash
 * photos picked for the accent's blue-violet, decorative (alt ""); sources in
 * public/images/README.md. width / height: the CSS size MediaFrame builds its 1x / 2x
 * srcset from, kept so the section's photos stay under 20 KB: fiber 400 → 640w and 828w
 * (its widest frame, 375 on desktop and 390 on a phone, gets a sharp 2x; the 600 of the
 * two-column layout a slightly soft one), swirl 150 → 256w and 384w. Both at quality 60:
 * dark, filtered textures, where its slight softening does not show (served as AVIF:
 * about 12 KB + 2 KB at 2x, less at 1x).
 */
export const stackPhotos = {
  fiber: { src: "/images/stack-fiber.webp", width: 400, height: 320 },
  swirl: { src: "/images/stack-swirl.webp", width: 150, height: 300 },
} as const;
