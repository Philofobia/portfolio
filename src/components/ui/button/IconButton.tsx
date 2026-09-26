/**
 * Square icon-only button with aria-label. Used by ThemeToggle, carousel ←/→, Copy email, mobile burger.
 * Props: label (the accessible name; the icon has none of its own), children (the icon,
 * decorative: mark SVGs aria-hidden), ...native <button> attributes (aria-expanded for the burger).
 * className is for placement; the look is squareClasses in button.styles.ts.
 * No 'use client': renders on the server, and inside client components when it needs onClick.
 */
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { squareClasses } from "./button.styles";

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
