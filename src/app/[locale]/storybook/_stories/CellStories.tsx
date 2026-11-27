/**
 * 02 Cell (atoms/Card), mirroring the design library's section: cells on the cell grid,
 * where the parent draws top + left and every cell right + bottom. The accent fill
 * (cardClasses variant accent) is live in the Contact section's copy button.
 */
import { Card } from "@/components/atoms/Card";
import { Story, StoryRow, StoryTable } from "../_components/Story";

const note = "font-mono text-meta text-ink-3";
const value = "font-mono text-meta text-ink-2";

export function CellStories() {
  return (
    <Story id="cell" index="02" name="Cell" file="atoms/Card · card.styles.ts">
      <p className="max-w-measure text-ink-2">
        The bordered box every module is made of. Parents draw top + left
        borders, cells draw right + bottom, so shared edges never double.
      </p>

      <figure className="flex flex-col gap-3">
        <section
          aria-label="Cell specimens"
          tabIndex={0}
          className="overflow-x-auto border border-line p-7.5"
        >
          <div className="cells w-max grid-cols-[repeat(6,var(--cell))]">
            <Card className="col-span-3 row-span-2 flex flex-col justify-between">
              <span className={note}>as=&quot;div&quot;</span>
              <span className={value}>FactCard</span>
            </Card>
            <Card
              as="article"
              className="col-span-3 row-span-2 flex flex-col justify-between"
            >
              <span className={note}>as=&quot;article&quot;</span>
              <span className={value}>DocumentCard</span>
            </Card>
          </div>
        </section>
        <figcaption className={note}>
          default cell · the parent (.cells) draws the outer top and left edges
        </figcaption>
      </figure>

      <StoryTable
        caption="Cell props"
        rowHeader="Prop"
        columns={["Type", "Default"]}
      >
        <StoryRow label="as">
          <code className="font-mono text-meta">
            &apos;div&apos; | &apos;article&apos;
          </code>
          <span>div</span>
        </StoryRow>
      </StoryTable>
    </Story>
  );
}
