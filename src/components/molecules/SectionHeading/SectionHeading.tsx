/**
 * Number ('02.') + big uppercase 200-weight <h2> + optional aside line (design 03
 * SectionHeader). size 'md' (h2 46 / 32 m) | 'xl' (display 80 / 52 m, Contact).
 * Props: index, title (from messages: switches with the locale), aside (right-aligned on the
 * title's bottom edge), size, titleId (the id the Section's aria-labelledby points at).
 * Layout: mobile, the index above the title, the aside at the title's foot on the right
 * (Portfolio Mobile, Work); an aside with no room beside the title wraps below it. From
 * 48rem one row on the cell's bottom edge: index · title · aside pushed right; the mono
 * index padded down onto the title's baseline (0.5em md, 0.83em xl).
 * The index is numbering the order already gives: hidden from assistive tech, so the
 * heading is not read as "zero two dot Selected work".
 * Title and aside rise 24px into place as they scroll in (motion.css .reveal-rise, CSS only).
 * Japanese text inside an English title or aside carries its own lang (the caller's markup).
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  index,
  title,
  aside,
  size = "md",
  titleId,
  className,
}: {
  index: string;
  title: ReactNode;
  aside?: ReactNode;
  size?: "md" | "xl";
  titleId?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-end gap-x-4 gap-y-1.5 md:flex-nowrap md:pb-3.5",
        size === "xl" ? "md:min-h-cells-2" : "md:min-h-cell",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "basis-full font-mono text-meta text-ink-3 md:basis-auto",
          size === "xl" ? "md:pb-[0.83em]" : "md:pb-[0.5em]",
        )}
      >
        {index}
      </span>
      <h2
        id={titleId}
        className={cn(
          "reveal-rise uppercase",
          size === "xl" ? "text-display" : "text-h2",
        )}
      >
        {title}
      </h2>
      {aside && (
        <p className="reveal-rise ms-auto font-mono text-meta text-ink-3">
          {aside}
        </p>
      )}
    </div>
  );
}
