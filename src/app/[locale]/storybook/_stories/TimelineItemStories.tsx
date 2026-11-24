/**
 * 14 TimelineItem (molecules/TimelineEntry), mirroring the design library's section: the
 * current job (accent square, "now", one bullet), a past one (month dates, muted square)
 * and an education entry (years, no bullets), in the ordered list the Experience section
 * renders.
 */
import { TimelineEntry } from "@/components/molecules/TimelineEntry";
import { Story } from "../_components/Story";

export function TimelineItemStories() {
  return (
    <Story
      id="timeline-item"
      index="14"
      name="TimelineItem"
      file="molecules/TimelineEntry · uses 06"
    >
      <figure className="flex flex-col gap-3">
        <ol
          role="list"
          className="flex flex-col gap-7 border-s border-line bg-bg md:gap-0 md:border-x md:border-t"
        >
          <TimelineEntry
            start="2023"
            current
            title="Fullstack Engineer"
            org="[Company]"
            bullets={[
              "Built and ran the customer-facing web app and its Node.js API.",
            ]}
          />
          <TimelineEntry
            start="2021-04"
            end="2023-01"
            title="Frontend Developer"
            org="[Company]"
          />
          <TimelineEntry
            start="2017"
            end="2021"
            title="[Degree, field]"
            org="[University]"
          />
        </ol>
        <figcaption className="font-mono text-meta leading-normal text-ink-3">
          current: accent square (+ &quot;now&quot; with no end) · YYYY-MM shown
          as a month, YYYY as written · bullets optional · mobile: a rail list
          (start border, 28px apart), the date above the title
        </figcaption>
      </figure>
    </Story>
  );
}
