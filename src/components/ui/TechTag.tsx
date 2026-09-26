/**
 * A tech as a list item: <TechIcon /> + name. Renders an <li>, so place it in a <ul>.
 * as='tag' (default): icon + name inline, for the Stack groups; icon 16 / 14 m, sized in em.
 * as='cell': one grid cell with the icon centred, for the ProjectCard icon rail; the name
 * sits in the DOM as its label and shows on hover (bg +4% · 200ms). The rail draws the
 * rules between cells (divide-y / divide-x on the <ul>), not the cell.
 * Icons are mono grey (text-icon), never brand colours.
 */
import { cn } from "@/lib/cn";
import { TechIcon, techName, type TechId } from "@/lib/tech-icons";

export function TechTag({
  id,
  as = "tag",
  className,
}: {
  id: TechId;
  as?: "tag" | "cell";
  className?: string;
}) {
  const name = techName(id);

  if (as === "cell") {
    return (
      <li
        className={cn(
          "group relative grid h-(--cell) min-w-(--cell) place-items-center hover:bg-bg-hover motion-safe:transition-colors motion-safe:duration-200",
          className,
        )}
      >
        <TechIcon id={id} size="cell" />
        {/* Design: 9px mono, 6px from the bottom. Visually hidden until hover, still read as the item's name. */}
        <span className="absolute bottom-1.5 font-mono text-[0.5625rem] leading-none whitespace-nowrap text-ink opacity-0 group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-200">
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
      <TechIcon id={id} size="tag" />
      {name}
    </li>
  );
}
