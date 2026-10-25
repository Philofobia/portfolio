/**
 * Square icon-only button with aria-label. Used by ThemeToggle, carousel ←/→, Copy email, mobile burger.
 * Props: label (the accessible name; the icon has none of its own), children (the icon,
 * decorative: mark SVGs aria-hidden), frame ('box' freestanding | 'bar' a header cell),
 * ...native <button> attributes (aria-haspopup and commandfor for the burger).
 * className is for placement; the look is squareClasses(frame) in button.styles.ts.
 * No 'use client': renders on the server, and inside client components when it needs onClick.
 */
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  squareClasses,
  type SquareFrame,
} from "@/components/atoms/Button/button.styles";

type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-label" | "children"
> & {
  label: string;
  frame?: SquareFrame;
  children: ReactNode;
};

export function IconButton({
  label,
  frame,
  className,
  children,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(squareClasses(frame), className)}
      {...props}
    >
      {children}
    </button>
  );
}
