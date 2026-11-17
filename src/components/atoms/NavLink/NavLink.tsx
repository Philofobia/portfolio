/**
 * Header/mobile nav anchor with `active` prop (current section via IntersectionObserver in Nav).
 *
 * A plain <a href="#work">: an in-page anchor works without script and needs no locale
 * prefix (state.md). active sets aria-current="true"; the highlight itself is the
 * current-section: variant (styles/variants.css), which follows :target-current where the
 * browser tracks sections natively and aria-current elsewhere (hooks/useScrollSpy).
 * variant 'bar': one two-cell slot of the header bar; ink-2, current = ink + a 2px accent
 * underline (not colour alone). Takes the bar's height.
 * variant 'row': a row of the mobile menu sheet: label (h3, caps) + the section's mono
 * number, accent when current. 56 high, one cell from md.
 * No 'use client': renders on the server, and inside client components (Nav, MobileMenu).
 */
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

const focusClass =
  "focus-visible:outline focus-visible:-outline-offset-3 focus-visible:outline-accent";

const variantClass = {
  bar: "relative flex w-section items-center justify-center border-e border-line text-ink-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-accent after:opacity-0 after:forced-color-adjust-none hover:bg-bg-hover hover:text-ink current-section:text-ink current-section:after:opacity-100 forced-colors:after:bg-[CanvasText]",
  row: "flex h-14 items-center justify-between border-b border-line px-cell-pad text-h3 text-ink-2 uppercase hover:bg-bg-hover hover:text-ink current-section:text-ink current-section:[&_[data-number]]:text-accent md:h-cell",
} as const;

type NavLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "aria-current" | "children"
> & {
  href: `#${string}`;
  variant: keyof typeof variantClass;
  active?: boolean;
  number?: string;
  children: ReactNode;
};

export function NavLink({
  href,
  variant,
  active = false,
  number,
  className,
  children,
  ...rest
}: NavLinkProps) {
  return (
    <a
      {...rest}
      href={href}
      aria-current={active ? "true" : undefined}
      className={cn(
        variantClass[variant],
        focusClass,
        "motion-safe:transition-colors motion-safe:duration-200",
        className,
      )}
    >
      {children}
      {number && (
        <span
          data-number
          aria-hidden="true"
          className="font-mono text-meta text-ink-3"
        >
          {number}
        </span>
      )}
    </a>
  );
}
