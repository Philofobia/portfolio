/**
 * Square icon-only button with aria-label. Used by ThemeToggle, the marquee's pause and the
 * mobile menu's open and close.
 * Props: label (the accessible name; the icon has none of its own), children (the icon,
 * decorative: mark SVGs aria-hidden), ...native <button> attributes (aria-haspopup and commandfor for the burger).
 * One cell of a bar (header, marquee, menu sheet): squareClasses in button.styles.ts.
 * className is for placement.
 * No 'use client': renders on the server, and inside client components when it needs onClick.
 */
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { squareClasses } from "@/components/atoms/Button/button.styles";

type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-label" | "children"
> & {
  label: string;
  children: ReactNode;
};

export function IconButton({
  label,
  className,
  children,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(squareClasses, className)}
      {...props}
    >
      {children}
    </button>
  );
}
