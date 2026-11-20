/**
 * Bordered cell card base (design 02 Cell): the box every module is made of.
 * Props: as ('div' default | 'article' | 'section' | 'li' | 'a' | 'button'),
 * variant ('default' | 'media' inset 15 / 10 m | 'accent' CTA fill), col / row (grid-line
 * syntax, "1 / 4": the cell spans whole cells of its parent grid), ...native attributes of
 * the element rendered; 'section' must be named (aria-labelledby or aria-label) and 'a' must
 * have an href, both enforced by the types. Cells draw their right + bottom borders and the
 * parent its top + left (grid.css .cells), so shared edges never double.
 * Interactive cells (as 'a' | 'button') get the hover (bg +4% · 200ms) and a focus ring.
 * 'a' is for in-page anchors, downloads and external URLs: an internal route composes the
 * i18n Link with cardClasses() instead (card.styles.ts), never next/link.
 * Composed by the card variants (FactCard, DocumentCard, ProjectCard…).
 * className is for placement; the look comes from variant (card.styles.ts).
 */
import {
  createElement,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from "react";
import { cn } from "@/lib/cn";
import { cardClasses, type CardVariant } from "./card.styles";

type CardElement = "div" | "article" | "section" | "li" | "a" | "button";

// What an element needs to mean what it says: a <section> without a name is a plain box,
// and an <a> without href is not focusable (yet it would get the hover and the ring).
type ElementNeeds<T extends CardElement> = T extends "section"
  ? { "aria-labelledby": string } | { "aria-label": string }
  : T extends "a"
    ? { href: string }
    : unknown;

export type CardProps<T extends CardElement = "div"> = {
  as?: T;
  variant?: CardVariant;
  col?: string;
  row?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as"> &
  ElementNeeds<T>;

export function Card<T extends CardElement = "div">({
  as,
  variant = "default",
  col,
  row,
  className,
  style,
  ...rest
}: CardProps<T>) {
  const element = as ?? "div";
  const interactive = element === "a" || element === "button";
  // Grid placement is a per-instance value: passed as custom properties, read by col-/row-.
  const placement = {
    ...(col && { "--col": col }),
    ...(row && { "--row": row }),
    ...style,
  } as CSSProperties;

  // createElement takes the tag as a string: CardProps<T> already checked the props for it.
  return createElement(element, {
    ...(element === "button" && { type: "button" }),
    ...rest,
    style: col || row || style ? placement : undefined,
    className: cardClasses({
      variant,
      interactive,
      className: cn(col && "col-(--col)", row && "row-(--row)", className),
    }),
  });
}
