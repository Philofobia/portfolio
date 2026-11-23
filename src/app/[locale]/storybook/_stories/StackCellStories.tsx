/**
 * 13 StackCell (molecules/StackGroupCard). One <details> is both variants: the accordion
 * row here (the story has no @stack-split container, so it shows the mobile form; open one
 * to see the content), and the cell inside the Stack section from 12 cells, where the
 * summary is hidden and the content always shown. Tags mix techs with a glyph and
 * text-only ones, which take the square.
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
              open
              index="A."
              title="Frontend"
              description="Most projects are e-commerce sites built with React and Next.js in TypeScript."
              techs={["typescript", "react", "nextdotjs", "storybook"]}
            />
          </div>
          <figcaption className={caption}>open · glyph tags</figcaption>
        </figure>

        <figure className="flex flex-col gap-2">
          <div className="cells auto-rows-auto grid-cols-1">
            <StackGroupCard
              index="E."
              title="Ways of working"
              description="Agile teams in Italy, Germany and Spain, building from Figma designs."
              techs={["agile", "jira", "confluence", "teams", "slack", "figma"]}
            />
          </div>
          <figcaption className={caption}>
            closed · text-only techs take the square
          </figcaption>
        </figure>
      </div>
    </Story>
  );
}
