/**
 * Square status marker placed before a line of text. Square, never round: circles are
 * reserved for the clocks and the hero emblem.
 * tone: 'active' (accent: availability, current role) | 'muted' (ink-3: past role).
 * size: 7 (status) | 4 (list bullet).
 * Decorative: the text beside it carries the status, so it is hidden from assistive tech.
 */
import { cn } from "@/lib/cn";

const toneClass = {
  active: "bg-accent",
  muted: "bg-ink-3",
} as const;

const sizeClass = {
  7: "size-1.75",
  4: "size-1",
} as const;

export function StatusDot({
  tone = "active",
  size = 7,
  className,
}: {
  tone?: keyof typeof toneClass;
  size?: keyof typeof sizeClass;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        // Forced colours drop backgrounds; keep the square visible as text colour.
        "inline-block shrink-0 forced-color-adjust-none forced-colors:bg-[CanvasText]",
        toneClass[tone],
        sizeClass[size],
        className,
      )}
    />
  );
}
