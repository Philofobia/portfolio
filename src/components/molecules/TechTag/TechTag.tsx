/**
 * A tech as a list item: <TechIcon /> + name. Renders an <li>, so place it in a <ul role="list">
 * (Tailwind's preflight removes list-style, and Safari then drops the list semantics).
 * as='tag' (default): icon + name inline, for the Stack groups; icon 16 / 14 m, sized in em.
 * as='cell': one grid cell with the icon centred, for the ProjectCard icon rail; the name
 * sits in the DOM as its label and shows on hover (bg +4% · 200ms). The rail draws the
 * rules between cells (divide-y / divide-x on the <ul>), not the cell.
 * Icons are mono grey (text-icon), never brand colours.
 * A tech without a glyph (lib/tech-icons textTechNames: Teams, Agile…) takes, as a tag, a
 * 4px square centred in the icon's box (the design's list bullet, Experience), so names
 * stay aligned in a list that mixes both. The cell rail exists to show glyphs, so as='cell'
 * takes only an IconTechId (checked by the types).
 */
import { cn } from "@/lib/cn";
import { TechIcon } from "@/components/atoms/TechIcon";
import {
  hasIcon,
  techName,
  type IconTechId,
  type TechId,
} from "@/lib/tech-icons";

type TechTagProps = { className?: string } & (
  { id: TechId; as?: "tag" } | { id: IconTechId; as: "cell" }
);

export function TechTag({ id, as = "tag", className }: TechTagProps) {
  const name = techName(id);

  if (as === "cell" && hasIcon(id)) {
    return (
      <li
        className={cn(
          "group relative grid h-cell min-w-cell place-items-center hover:bg-bg-hover motion-safe:transition-colors motion-safe:duration-200",
          className,
        )}
      >
        {/* Below md the rail's cells are 50px tall, too short for a two-line name under the
            icon: there the name takes the icon's place on hover (or tap) instead of covering it. */}
        <span className="grid place-items-center motion-safe:transition-opacity motion-safe:duration-200 max-md:group-hover:opacity-0">
          <TechIcon id={id} size="cell" />
        </span>
        {/* Design: 9px mono, 6px from the bottom. Visually hidden until hover, still read as
            the item's name. A long name ("Google Analytics", ~86px) breaks onto a second line,
            centred, instead of running into the next cell. */}
        <span className="absolute inset-x-1 bottom-1.5 text-center font-mono text-[0.5625rem] leading-[1.15] text-ink opacity-0 group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-200">
          {name}
        </span>
      </li>
    );
  }

  return (
    <li
      className={cn(
        // Design: 8px icon gap on 12px text (6 on 11 m).
        "inline-flex items-center gap-[0.6667em] font-mono text-meta text-ink-2",
        className,
      )}
    >
      {hasIcon(id) ? (
        <TechIcon id={id} size="tag" />
      ) : (
        <span
          aria-hidden="true"
          className="grid size-[1.3333em] shrink-0 place-items-center"
        >
          <span className="size-1 bg-icon" />
        </span>
      )}
      {name}
    </li>
  );
}
