/**
 * Project registry: slug, image (public/images/work-*.webp), year, repo/live URLs, tech tags.
 * Copy (title/description/role) lives in messages.work.projects[slug].
 *
 * Order is the carousel's order: newest first, as a Japanese career history (shokumukeirekisho) lists work. The slug is
 * also the slide's anchor (#project-{slug}), the target of the project list under the
 * carousel.
 * Client work never links out and never names the client: a link would name the brand,
 * so those cards show "Private —". Only "ai" links out: performance-report, Marco's own
 * tool (born in the eyewear performance role, usable on any site), public on GitHub.
 * Images are unbranded mood photos (Unsplash licence, cropped to 5:3, labels blurred),
 * not the products, so their alt is empty (decorative): the card's heading names the work.
 * year is the role line's {year} (messages role: "Frontend engineer, {year}").
 * tech: at most five, the card's icon rail; for fashion, appliances and ticketing a draft
 * from the CV still to be confirmed by Marco; eyewear from the CV's tool list; ai from the
 * repository.
 */
import type { TechId } from "@/lib/tech-icons";

export type Project = {
  slug: string;
  image: string;
  year: string;
  tech: readonly TechId[];
  links: { code?: string; live?: string };
};

export const projects = [
  {
    slug: "eyewear",
    image: "/images/work-eyewear.webp",
    year: "2026",
    tech: ["typescript", "nextdotjs", "grafana", "googlechrome", "jira"],
    links: {},
  },
  {
    slug: "ai",
    image: "/images/work-performance.webp",
    year: "2026",
    tech: ["python", "claude", "googlegemini", "sqlite", "githubactions"],
    links: { code: "https://github.com/Philofobia/performance-report" },
  },
  {
    slug: "fashion",
    image: "/images/work-fashion.webp",
    year: "2025–26",
    tech: ["typescript", "react", "nextdotjs", "graphql", "storybook"],
    links: {},
  },
  {
    slug: "appliances",
    image: "/images/work-appliances.webp",
    year: "2025–26",
    tech: ["typescript", "react", "graphql", "googlechrome", "googleanalytics"],
    links: {},
  },
  {
    slug: "ticketing",
    image: "/images/work-ticketing.webp",
    year: "2023–25",
    tech: ["typescript", "nestjs", "react", "postgresql", "docker"],
    links: {},
  },
] as const satisfies readonly Project[];

export type ProjectSlug = (typeof projects)[number]["slug"];

/** The slide's id, the target of its link in the project list. */
export const projectAnchor = (slug: ProjectSlug) => `project-${slug}`;
