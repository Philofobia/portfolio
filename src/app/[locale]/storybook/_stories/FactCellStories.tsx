/**
 * 15 FactCell (molecules/FactCard), mirroring the design library's section: the Japan
 * facts grid in a <dl>, with the two sizes.
 * The grid scrolls sideways on narrow screens (the section lays it out per breakpoint).
 */
import { FactCard } from "@/components/molecules/FactCard";
import { Story } from "../_components/Story";

export function FactCellStories() {
  return (
    <Story
      id="fact-cell"
      index="15"
      name="FactCell"
      file="molecules/FactCard · uses 02"
    >
      <figure className="flex flex-col gap-3">
        <section
          aria-label="Fact cell specimens"
          tabIndex={0}
          className="overflow-x-auto ps-px pt-px"
        >
          <dl className="cells min-w-3xl auto-rows-[calc(var(--cell)*2)] grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)_minmax(0,1fr)]">
            <FactCard
              label="Residence status"
              value="[Visa status]"
              note="size=lg"
              size="lg"
              className="row-span-2"
            />
            <FactCard label="Japanese" value="N5 →" note="size=md" />
            <FactCard label="Based in" value="Milano" note="size=md" />
          </dl>
        </section>
        <figcaption className="font-mono text-meta leading-normal text-ink-3">
          label · value · note · size: &apos;lg&apos; | &apos;md&apos; · the
          value never animates as a counter
        </figcaption>
      </figure>
    </Story>
  );
}
