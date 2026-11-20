/**
 * 13 StackCell (molecules/StackGroupCard), mirroring the design library's section: the
 * desktop cell (static) and the mobile accordion (one group open at a time: the groups
 * share a <details> name). The accordion is live: open Backend and Frontend closes.
 */
import { StackGroupCard } from "@/components/molecules/StackGroupCard";
import { Story } from "../_components/Story";

const caption = "font-mono text-meta text-ink-3";

export function StackCellStories() {
  return (
    <Story
      id="stack-cell"
      index="13"
      name="StackCell"
      file="molecules/StackGroupCard · uses 02, 05"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(20.625rem,100%),1fr))] items-start gap-6">
        <figure className="flex flex-col gap-2">
          <div className="cells auto-rows-auto grid-cols-1">
            <StackGroupCard
              index="A."
              title="Frontend"
              description="Typed, accessible interfaces that stay fast on mid-range phones."
              techs={["typescript", "react"]}
            />
          </div>
          <figcaption className={caption}>
            variant=&quot;cell&quot; · desktop · static
          </figcaption>
        </figure>

        <figure className="flex flex-col gap-2">
          <div className="border-x border-t border-line">
            <StackGroupCard
              variant="accordion"
              name="stack-story"
              open
              index="A."
              title="Frontend"
              description="Typed, accessible interfaces that stay fast on mid-range phones."
              techs={["typescript", "react", "nextdotjs", "greensock"]}
            />
            <StackGroupCard
              variant="accordion"
              name="stack-story"
              index="B."
              title="Backend"
              description="APIs with clear contracts, solid tests and uneventful deploys."
              techs={["nodedotjs", "go", "graphql"]}
            />
          </div>
          <figcaption className={caption}>
            variant=&quot;accordion&quot; · mobile · open / closed · one open at
            a time (shared name)
          </figcaption>
        </figure>
      </div>
    </Story>
  );
}
