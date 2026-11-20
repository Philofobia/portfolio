/**
 * 14 TimelineItem (molecules/TimelineEntry), mirroring the design library's section: the
 * current job (accent square, "now", one bullet) and an education entry (muted square,
 * no bullets), in the ordered list the Experience section will render.
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
            title="Fullstack Engineer"
            org="[Company]"
            bullets={[
              "Built and ran the customer-facing web app and its Node.js API.",
            ]}
          />
          <TimelineEntry
            start="2017"
            end="2021"
            title="[Degree, field]"
            org="[University]"
          />
        </ol>
        <figcaption className="font-mono text-meta leading-normal text-ink-3">
          no end → current: accent square + &quot;now&quot; · bullets optional ·
          mobile: a rail list (start border, 28px apart), the date above the
          title
        </figcaption>
      </figure>
    </Story>
  );
}
