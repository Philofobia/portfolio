/**
 * Tailwind class maps for Button (both its <button> and <a> forms): variant, size and icon nudge.
 * The look lives here so every element that "looks like a button" stays in step;
 * components add the markup and the placement className.
 * Hover is gated with not-disabled: (not enabled:) because :enabled never matches <a>,
 * and Button renders an <a> when it has an href.
 */
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "lg" | "md" | "sm" | "card" | "cta";
export type ButtonIcon = "↓" | "↗" | "→" | "⤓";

const base =
  "group inline-flex w-cell-pair shrink-0 cursor-pointer items-center justify-center gap-[0.25em] disabled:cursor-not-allowed motion-safe:transition-colors motion-safe:duration-200";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-accent font-normal text-on-accent not-disabled:hover:bg-accent-hover disabled:bg-accent-dim disabled:text-ink-3",
  secondary:
    "border border-line not-disabled:hover:bg-bg-hover disabled:border-line-faint disabled:text-ink-3 [[data-variant=secondary]+&]:border-l-0",
};

const sizeClass: Record<ButtonSize, string> = {
  lg: "h-cell-lg text-ui",
  md: "h-bar text-ui",
  sm: "h-cell-sm text-ui-sm",
  // Card actions that follow the card's own width (an @container ancestor): sm and sharing
  // the row below a 48rem container (ProjectCard stack), lg at 150 wide from it (row).
  card: "h-cell-sm flex-1 text-ui-sm @3xl:h-cell-lg @3xl:flex-none @3xl:text-ui",
  // The hero's CTA pair: one cell high (50, 75 from 48rem) so it sits on the grid's rows,
  // sharing the row on mobile; 150 wide from 48rem. (Portfolio Mobile: 56 high, the bar; one
  // cell instead, still a large touch target.)
  cta: "h-cell flex-1 text-ui md:flex-none",
};

const nudgeClass: Record<ButtonIcon, string> = {
  "↓": "group-not-disabled:group-hover:translate-y-nudge",
  "⤓": "group-not-disabled:group-hover:translate-y-nudge",
  "→": "group-not-disabled:group-hover:translate-x-nudge",
  "↗": "group-not-disabled:group-hover:translate-x-nudge group-not-disabled:group-hover:-translate-y-nudge",
};

/**
 * Focus ring by placement. card and cta sit flush in cells (card footers, the hero pair):
 * the ring inside, 4px from the lines (focus-ring-cell), where an outer ring would cross the
 * neighbour or be clipped by the card; on the accent fill it is on-accent (~7:1; ink would
 * be 2.2 to 2.6, under 3:1). The other sizes stand free: the outer ring, ink around a fill.
 */
const flushSize = new Set<ButtonSize>(["card", "cta"]);

function focusClass(variant: ButtonVariant, size: ButtonSize) {
  if (!flushSize.has(size)) {
    return cn(
      "focus-visible:focus-ring",
      variant === "primary" && "focus-ring-ink",
    );
  }
  return cn(
    "focus-visible:focus-ring-cell",
    variant === "primary" && "[--focus-ring-color:var(--on-accent)]",
  );
}

export function buttonClasses({
  variant,
  size,
  className,
}: {
  variant: ButtonVariant;
  size: ButtonSize;
  className?: string;
}) {
  return cn(
    base,
    variantClass[variant],
    sizeClass[size],
    focusClass(variant, size),
    className,
  );
}

export function buttonIconClasses(icon: ButtonIcon) {
  return cn(
    "inline-block motion-safe:transition-transform motion-safe:duration-200",
    nudgeClass[icon],
  );
}

/**
 * One grid cell for single-glyph controls: IconButton and the LocaleSwitcher link.
 * 56 wide on mobile (the design's mobile header row), one 75 cell from md.
 * frame 'box': freestanding, its own four borders, square.
 * frame 'bar': a cell of a bar (the header): only the start border, and the bar's height,
 * so the bar's bottom border stays on the last pixel of the grid cell; its focus ring is
 * drawn inside, 4px from every line (focus-ring-cell), not outside across the bar's border.
 */
export type SquareFrame = "box" | "bar";

const squareFrameClass: Record<SquareFrame, string> = {
  box: "size-bar border focus-visible:focus-ring md:size-cell",
  bar: "w-bar border-s focus-visible:focus-ring-cell md:w-cell",
};

export function squareClasses(frame: SquareFrame = "box") {
  return cn(
    "grid shrink-0 cursor-pointer place-items-center border-line not-disabled:hover:bg-bg-hover disabled:cursor-not-allowed disabled:text-ink-3 motion-safe:transition-colors motion-safe:duration-200",
    squareFrameClass[frame],
  );
}

/**
 * A quiet mono text link (the footer's locale switch and Back to top): ink-2, ink on
 * hover, accent focus ring. Kept here with the other control looks.
 */
export const textLinkClasses =
  "font-mono text-meta text-ink-2 hover:text-ink focus-visible:focus-ring motion-safe:transition-colors motion-safe:duration-200";
