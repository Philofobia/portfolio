/**
 * 05 TechIcon · TechTag, mirroring the design library's section: cells in a horizontal
 * and a vertical rail (hover a cell for its label), the inline tag list, and every icon
 * in the registry so a missing or misdrawn glyph shows up here first.
 */
import { TechTag } from "@/components/ui/TechTag";
import { techIcons, type TechId } from "@/lib/tech-icons";
import { Story } from "../_components/Story";

const cellRow: TechId[] = ["typescript", "nextdotjs", "postgresql"];
const rail: TechId[] = [
  "typescript",
  "nextdotjs",
  "nodedotjs",
  "postgresql",
  "redis",
];
const tags: TechId[] = ["typescript", "react", "go", "docker"];
const all = Object.keys(techIcons) as TechId[];

export function TechTagStories() {
  return (
    <Story
      id="tech-tag"
      index="05"
      name="TechIcon · TechTag"
      file="ui/TechTag.tsx · lib/tech-icons.tsx"
    >
      <div className="flex flex-wrap items-start gap-6">
        <figure className="flex flex-col gap-3">
          <ul className="flex self-start divide-x divide-line border border-line bg-bg">
            {cellRow.map((id) => (
              <TechTag key={id} id={id} as="cell" />
            ))}
          </ul>
          <figcaption className="font-mono text-meta text-ink-3">
            as=&quot;cell&quot; · hover shows the label · rail draws the rules
          </figcaption>
        </figure>

        <figure className="flex flex-col gap-3">
          <ul className="flex w-(--cell) flex-col divide-y divide-line border border-line bg-bg">
            {rail.map((id) => (
              <TechTag key={id} id={id} as="cell" />
            ))}
          </ul>
          <figcaption className="font-mono text-meta text-ink-3">
            ProjectCard icon rail
          </figcaption>
        </figure>

        <figure className="flex flex-col gap-3">
          <ul className="flex flex-wrap gap-x-5 gap-y-2.5 border border-line bg-bg p-5">
            {tags.map((id) => (
              <TechTag key={id} id={id} />
            ))}
          </ul>
          <figcaption className="font-mono text-meta text-ink-3">
            as=&quot;tag&quot; · inline list
          </figcaption>
        </figure>
      </div>

      <figure className="flex flex-col gap-3">
        <ul className="flex flex-wrap gap-x-5 gap-y-2.5 border border-line bg-bg p-5">
          {all.map((id) => (
            <TechTag key={id} id={id} />
          ))}
        </ul>
        <figcaption className="font-mono text-meta text-ink-3">
          Registry: every icon in lib/tech-icons, mono grey, never brand colours
        </figcaption>
      </figure>
    </Story>
  );
}
