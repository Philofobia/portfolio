/**
 * Bordered cell card base (design 02 Cell): the box every module is made of.
 * Props: as ('div' default | 'article'), ...native attributes of the element rendered.
 * Cells draw their right + bottom borders and the parent its top + left (grid.css .cells),
 * so shared edges never double. Composed by FactCard and DocumentCard; elements that must
 * render their own tag in the cell's look (CopyButton, StackGroupCard) use cardClasses()
 * (card.styles.ts). className is for placement.
 */
import { createElement, type ComponentPropsWithoutRef } from "react";
import { cardClasses } from "./card.styles";

type CardElement = "div" | "article";

type CardProps<T extends CardElement = "div"> = {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function Card<T extends CardElement = "div">({
  as,
  className,
  ...rest
}: CardProps<T>) {
  return createElement(as ?? "div", {
    ...rest,
    className: cardClasses({ className }),
  });
}
