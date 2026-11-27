/**
 * 02 Cell (atoms/Card), mirroring the design library's section: a 9 × 4 cell grid where
 * the parent draws top + left and every cell right + bottom. The link and button cells are
 * live: point at them for the hover, Tab to them for the focus ring.
 */
import { Card } from "@/components/atoms/Card";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Story, StoryRow, StoryTable } from "../_components/Story";

const note = "font-mono text-meta text-ink-3";
const value = "font-mono text-meta text-ink-2";

export function CellStories() {
  return (
    <Story id="cell" index="02" name="Cell" file="atoms/Card · card.styles.ts">
      <p className="max-w-measure text-ink-2">
        The bordered box every module is made of. Spans whole cells via{" "}
        <code className="font-mono text-meta">col</code> /{" "}
        <code className="font-mono text-meta">row</code>. Parents draw top +
        left borders, cells draw right + bottom, so shared edges never double.
      </p>

      <figure className="flex flex-col gap-3">
        <section
          aria-label="Cell specimens"
          tabIndex={0}
          className="overflow-x-auto border border-line p-7.5"
        >
          <div className="cells w-max grid-cols-[repeat(9,var(--cell))]">
            <Card
              col="1 / 4"
              row="1 / 3"
              className="flex flex-col justify-between"
            >
              <span className={note}>variant=default</span>
              <span className={value}>col 3 · row 2</span>
            </Card>
            <Card
              as="a"
              href="#cell"
              col="4 / 7"
              row="1 / 3"
              className="flex flex-col justify-between"
            >
              <span className={note}>as=&quot;a&quot; · :hover</span>
              <span className={value}>bg +4% · 200ms</span>
            </Card>
            <Card variant="media" col="7 / 10" row="1 / 3">
              <MediaFrame
                src="/images/stack-fiber.webp"
                alt=""
                sizes="(min-width: 48rem) 225px, 150px"
              />
            </Card>
            <Card
              as="button"
              variant="accent"
              col="1 / 4"
              row="3 / 5"
              className="text-start"
            >
              variant=accent · as=&quot;button&quot;
            </Card>
          </div>
        </section>
        <figcaption className={note}>
          default · hover · variant=media (inset 15) · variant=accent (CTA fill)
        </figcaption>
      </figure>

      <StoryTable
        caption="Cell props"
        rowHeader="Prop"
        columns={["Type", "Default", "Note"]}
      >
        <StoryRow label="col / row">
          <code className="font-mono text-meta">string</code>
          <span>—</span>
          <span>&quot;1 / 8&quot; grid line syntax</span>
        </StoryRow>
        <StoryRow label="variant">
          <code className="font-mono text-meta">
            &apos;default&apos; | &apos;media&apos; | &apos;accent&apos;
          </code>
          <span>default</span>
          <span>media = image inset 15 / 10 m · accent = CTA fill</span>
        </StoryRow>
        <StoryRow label="as">
          <code className="font-mono text-meta">
            &apos;div&apos; | &apos;article&apos; | &apos;section&apos; |
            &apos;li&apos; | &apos;a&apos; | &apos;button&apos;
          </code>
          <span>div</span>
          <span>a / button cells get hover and a focus ring</span>
        </StoryRow>
      </StoryTable>
    </Story>
  );
}
