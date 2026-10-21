/**
 * Tailwind class maps for Button (both its <button> and <a> forms): variant, size and icon nudge.
 * The look lives here so every element that "looks like a button" stays in step;
 * components add the markup and the placement className.
 * Hover is gated with not-disabled: (not enabled:) because :enabled never matches <a>,
 * and Button renders an <a> when it has an href.
 */
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "lg" | "md" | "sm";
export type ButtonIcon = "↓" | "↗" | "→" | "⤓";

const base =
  "group inline-flex w-37.5 shrink-0 cursor-pointer items-center justify-center gap-[0.25em] focus-visible:outline focus-visible:outline-offset-3 disabled:cursor-not-allowed motion-safe:transition-colors motion-safe:duration-200";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-accent font-normal text-on-accent focus-visible:outline-ink not-disabled:hover:bg-accent-hover disabled:bg-accent-dim disabled:text-ink-3",
  secondary:
    "border border-line focus-visible:outline-accent not-disabled:hover:bg-bg-hover disabled:border-line-faint disabled:text-ink-3 [[data-variant=secondary]+&]:border-l-0",
};

const sizeClass: Record<ButtonSize, string> = {
  lg: "h-18.75 text-[0.9375rem]",
  md: "h-14 text-[0.9375rem]",
  sm: "h-12.5 text-[0.875rem]",
};

const nudgeClass: Record<ButtonIcon, string> = {
  "↓": "group-not-disabled:group-hover:translate-y-[3px]",
  "⤓": "group-not-disabled:group-hover:translate-y-[3px]",
  "→": "group-not-disabled:group-hover:translate-x-[3px]",
  "↗": "group-not-disabled:group-hover:translate-x-[3px] group-not-disabled:group-hover:-translate-y-[3px]",
};

export function buttonClasses({
  variant,
  size,
  className,
}: {
  variant: ButtonVariant;
  size: ButtonSize;
  className?: string;
}) {
  return cn(base, variantClass[variant], sizeClass[size], className);
}

export function buttonIconClasses(icon: ButtonIcon) {
  return cn(
    "inline-block motion-safe:transition-transform motion-safe:duration-200",
    nudgeClass[icon],
  );
}

/**
 * One grid cell for single-glyph controls: IconButton and the LocaleSwitcher link.
 * 56 on mobile (the design's mobile header row), one 75 cell from md.
 */
export const squareClasses =
  "grid size-14 shrink-0 cursor-pointer place-items-center border border-line focus-visible:outline focus-visible:outline-offset-3 focus-visible:outline-accent not-disabled:hover:bg-bg-hover disabled:cursor-not-allowed disabled:text-ink-3 md:size-cell motion-safe:transition-colors motion-safe:duration-200";
