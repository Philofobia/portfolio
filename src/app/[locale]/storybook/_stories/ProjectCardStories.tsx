/**
 * 12 ProjectCard (organisms/ProjectCard), mirroring the design library's section: the row
 * layout (desktop), the stack layout (the same card in a narrow container: the layout
 * follows the card's own width), and a card with no public link ("Private —").
 * Specimen copy is the design's; the Work section takes its copy from messages and shows the
 * cards in its carousel (organisms/WorkCarousel). The photos are mood pictures, not the
 * products, so their alt is empty (decorative).
 */
import { ProjectCard } from "@/components/organisms/ProjectCard";
import { Story, StoryRow, StoryTable } from "../_components/Story";

const caption = "font-mono text-meta text-ink-3";
const code = "font-mono text-meta";

export function ProjectCardStories() {
  return (
    <Story
      id="project-card"
      index="12"
      name="ProjectCard"
      file="organisms/ProjectCard · uses 02, 04, 05"
    >
      <p className="max-w-measure text-ink-2">
        The design library stacks the cards;{" "}
        <span className="text-ink">
          the site shows them in the Work carousel
        </span>{" "}
        (Portfolio Wireframes 7a), one card per slide. Only motion: the image
        scales 1.04 → 1 inside its inset as the card slides into the carousel.
      </p>

      <figure className="flex flex-col gap-2">
        <ProjectCard
          index={1}
          total={4}
          title="Freight tracking platform"
          description="Realtime shipment tracking: event ingestion, a Postgres timeline and a map-first dashboard."
          role="Solo build, [2025]"
          image={{
            src: "/images/work-performance.webp",
            alt: "",
          }}
          icons={[
            "typescript",
            "nextdotjs",
            "nodedotjs",
            "postgresql",
            "docker",
          ]}
          links={{ code: "https://github.com/" }}
        />
        <figcaption className={caption}>
          layout=row · ≥ 48rem card · image 9 cells · icon rail 1 cell · body 8
          cells
        </figcaption>
      </figure>

      <div className="flex flex-wrap items-start gap-8">
        <figure className="flex w-96 max-w-full flex-col gap-2">
          <ProjectCard
            index={2}
            total={4}
            title="Headless storefront"
            description="[One-line summary.]"
            role="Frontend lead, [2024]"
            image={{
              src: "/images/work-fashion.webp",
              alt: "",
            }}
            icons={["typescript", "react", "graphql", "storybook"]}
            links={{ code: "https://github.com/" }}
          />
          <figcaption className={caption}>
            layout=stack · narrow card · icon rail goes horizontal · empty slot
            stays blank
          </figcaption>
        </figure>

        <StoryTable
          caption="ProjectCard props"
          rowHeader="Prop"
          columns={["Type"]}
        >
          <StoryRow label="index / total">
            <code className={code}>number (1-based)</code>
          </StoryRow>
          <StoryRow label="title · description · role">
            <code className={code}>string (messages)</code>
          </StoryRow>
          <StoryRow label="image">
            <code className={code}>{"{ src, alt }"}</code>
          </StoryRow>
          <StoryRow label="links">
            <code className={code}>{"{ code? }"}</code>
          </StoryRow>
          <StoryRow label="icons">
            <code className={code}>TechId[] (max 5)</code>
          </StoryRow>
        </StoryTable>
      </div>

      <figure className="flex flex-col gap-2">
        <ProjectCard
          index={3}
          total={4}
          title="Clinic booking"
          description="[One-line summary.]"
          role="Fullstack, [2023]"
          image={{
            src: "/images/work-ticketing.webp",
            alt: "",
          }}
          icons={["python", "postgresql"]}
          links={{}}
        />
        <figcaption className={caption}>
          no code → secondary disabled &quot;Private —&quot; · layout by the
          card&apos;s width, not the viewport
        </figcaption>
      </figure>
    </Story>
  );
}
