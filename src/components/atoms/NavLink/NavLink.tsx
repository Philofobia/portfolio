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
 * number, accent when current. Fills its row (Nav sets the height and the full-width
 * divider), so hover and the focus ring span the window; the label and number sit in the
 * header's span inside it (.grid-wide; full width on mobile), under the header's logo.
 * No 'use client': renders on the server, and inside client components (Nav, MobileMenu).
 */
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

const focusClass = "focus-visible:focus-ring-cell";

const variantClass = {
  bar: "relative flex w-section items-center justify-center border-e border-line text-ink-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-accent after:opacity-0 after:forced-color-adjust-none hover:bg-bg-hover hover:text-ink current-section:text-ink current-section:after:opacity-100 forced-colors:after:bg-[CanvasText]",
  row: "flex h-full text-h3 text-ink-2 uppercase hover:bg-bg-hover hover:text-ink current-section:text-ink current-section:[&_[data-number]]:text-accent",
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
  const sectionNumber = number && (
    <span
      data-number
      aria-hidden="true"
      className="font-mono text-meta text-ink-3"
    >
      {number}
    </span>
  );

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
      {variant === "row" ? (
        <span className="grid-wide flex items-center justify-between px-cell-pad max-md:ms-0 max-md:w-full">
          {children}
          {sectionNumber}
        </span>
      ) : (
        <>
          {children}
          {sectionNumber}
        </>
      )}
    </a>
  );
}
