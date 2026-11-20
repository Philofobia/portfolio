/**
 * Tailwind class map for Card (design 02 Cell), shared with molecules that must render their
 * own element in the cell's look (a heading link stretched over a card, a client button).
 * The look itself is grid.css: .cell (padding, bg, right + bottom border; the parent draws
 * top + left), .cell-media (image inset 15 / 10 m), .cell-accent (CTA fill), and the hover
 * (bg-hover, 200ms) on link and button cells, for real pointers only.
 * interactive: adds the pointer and the focus ring. The ring is drawn 2px inside: cells sit
 * flush with their neighbours, which would cover an outside ring. On the accent fill the ring
 * is on-accent (.cell-accent sets it): it sits on the fill, where ink would fall under 3:1.
 * The primary Button keeps ink, because its ring is drawn outside, on bg.
 */
import { cn } from "@/lib/cn";

export type CardVariant = "default" | "media" | "accent";

const variantClass: Record<CardVariant, string> = {
  default: "cell",
  media: "cell cell-media",
  accent: "cell cell-accent",
};

export function cardClasses({
  variant = "default",
  interactive = false,
  className,
}: {
  variant?: CardVariant;
  interactive?: boolean;
  className?: string;
}) {
  return cn(
    variantClass[variant],
    interactive && "cursor-pointer focus-visible:focus-ring-inset",
    className,
  );
}
