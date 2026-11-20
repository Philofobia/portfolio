/**
 * 03 SectionHeader (molecules/SectionHeading), mirroring the design library's section:
 * size md with an aside, the Japan header with a Japanese aside, and size xl (Contact).
 * Under 48rem the index sits above the title, the aside at its foot on the right. Scroll the page to see the lines
 * rise in (CSS view() timelines, not in reduced motion or browsers without them).
 */
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { Story, StoryRow, StoryTable } from "../_components/Story";

const caption = "font-mono text-meta text-ink-3";
const code = "font-mono text-meta";

export function SectionHeaderStories() {
  return (
    <Story
      id="section-header"
      index="03"
      name="SectionHeader"
      file="molecules/SectionHeading"
    >
      <div className="flex flex-col gap-6">
        <figure className="flex flex-col gap-2">
          <div className="border border-line bg-bg p-6">
            <SectionHeading
              index="02."
              title="Selected work"
              aside="04 PROJECTS · SCROLL ↓"
            />
          </div>
          <figcaption className={caption}>
            size=md · aside=&quot;meta&quot;
          </figcaption>
        </figure>
        <figure className="flex flex-col gap-2">
          <div className="border border-line bg-bg p-5">
            <SectionHeading
              index="05."
              title="Working in Japan"
              aside={<span lang="ja">日本での就労について</span>}
            />
          </div>
          <figcaption className={caption}>
            Japanese aside (lang=&quot;ja&quot;) · stacks under 48rem
          </figcaption>
        </figure>
      </div>

      <figure className="flex flex-col gap-2">
        <div className="border border-line bg-bg p-6">
          <SectionHeading index="07." title="Contact" size="xl" />
        </div>
        <figcaption className={caption}>size=xl</figcaption>
      </figure>

      <StoryTable
        caption="SectionHeader props"
        rowHeader="Prop"
        columns={["Type", "Default", "Note"]}
      >
        <StoryRow label="index">
          <code className={code}>string</code>
          <span>—</span>
          <span>&quot;02.&quot; rendered mono, hidden from assistive tech</span>
        </StoryRow>
        <StoryRow label="title">
          <code className={code}>ReactNode</code>
          <span>—</span>
          <span>
            the &lt;h2&gt;; copy from messages, switches with the locale
          </span>
        </StoryRow>
        <StoryRow label="aside">
          <code className={code}>ReactNode</code>
          <span>—</span>
          <span>right-aligned; below the title on mobile</span>
        </StoryRow>
        <StoryRow label="size">
          <code className={code}>&apos;md&apos; | &apos;xl&apos;</code>
          <span>md</span>
          <span>lines rise 24px on enter (CSS scroll timeline)</span>
        </StoryRow>
        <StoryRow label="titleId">
          <code className={code}>string</code>
          <span>—</span>
          <span>for the section&apos;s aria-labelledby</span>
        </StoryRow>
      </StoryTable>
    </Story>
  );
}
