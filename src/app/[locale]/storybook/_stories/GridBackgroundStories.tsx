/**
 * 01 GridBackground, mirroring the design library's section. The grid is CSS, not a
 * component: .grid-bg in styles/grid.css paints it behind the whole page (the storybook's
 * <main> included). Each specimen pins --cell to show the desktop and mobile sizes.
 */
import type { CSSProperties } from "react";
import { Story, StoryRow, StoryTable } from "../_components/Story";

const specimens = [
  { cell: "4.6875rem", caption: "cell=75 · desktop" },
  { cell: "3.125rem", caption: "cell=50 · mobile" },
];

export function GridBackgroundStories() {
  return (
    <Story
      id="grid-background"
      index="01"
      name="GridBackground"
      file="styles/grid.css · .grid-bg"
    >
      <p className="max-w-measure text-ink-2">
        Wraps the whole page, not only the hero: the cell grid runs behind every
        section. Modules sit on top with an opaque{" "}
        <code className="font-mono text-meta">--bg</code> fill so lines stop at
        their borders.
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(18.75rem,100%),1fr))] gap-6">
        {specimens.map(({ cell, caption }) => (
          <figure key={caption} className="flex flex-col gap-2">
            <div
              style={{ "--cell": cell } as CSSProperties}
              className="grid-bg h-56 min-h-0 border border-line"
            />
            <figcaption className="font-mono text-meta text-ink-3">
              {caption}
            </figcaption>
          </figure>
        ))}
        <figure className="flex flex-col gap-2">
          <div className="grid-bg grid h-56 min-h-0 place-items-center border border-line">
            <div className="grid h-cell w-cell-pair place-items-center border border-line bg-bg font-mono text-meta text-ink-2">
              opaque module
            </div>
          </div>
          <figcaption className="font-mono text-meta text-ink-3">
            with content on top
          </figcaption>
        </figure>
      </div>

      <StoryTable
        caption="Tokens. CSS background only, no DOM per cell."
        rowHeader="Design prop"
        columns={["Token", "Value", "Note"]}
      >
        <StoryRow label="cell">
          <code className="font-mono text-meta">--cell</code>
          <span>75 / 50</span>
          <span>switches at 768 (48rem)</span>
        </StoryRow>
        <StoryRow label="offsetX">
          <code className="font-mono text-meta">--grid-shift</code>
          <span>cell / 2</span>
          <span>aligns lines to the 18-col container</span>
        </StoryRow>
        <StoryRow label="children">
          <code className="font-mono text-meta">.grid-bg</code>
          <span>—</span>
          <span>a class on the page&apos;s own element, no wrapper</span>
        </StoryRow>
      </StoryTable>
    </Story>
  );
}
