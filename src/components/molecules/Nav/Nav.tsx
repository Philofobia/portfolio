/**
 * Horizontal anchor nav from content/nav.ts using <NavLink /> with active-section highlight.
 *
 * Presentational: a labelled <nav> with the list of plain anchors; current names the
 * section to mark (aria-current on its NavLink). The live callers feed it the section in
 * view: ScrollSpyNav in the header bar, MobileMenu in the sheet. The storybook passes a
 * fixed one.
 * variant 'bar': the header bar's slots, two cells each, as high as the bar; labelled
 * header.navLabel.
 * variant 'row': the mobile menu sheet's rows (label + section number), labelled
 * header.menu.title (landmark names must be unique on the page); each row is a full-width
 * cell, 56 high and one cell from md, its divider (bottom border) edge to edge on the
 * cell's last pixel. They have no motion of their own: the sheet unrolls over them
 * (MobileMenu), the same way in and out.
 * listRef reaches the <ul> (useScrollSpy reads the browser's current link there);
 * onNavigate runs when a link is chosen (the sheet closes).
 * No 'use client': renders on the server, and inside client components.
 */
import { useTranslations } from "next-intl";
import type { Ref } from "react";
import { NavLink } from "@/components/atoms/NavLink";
import { navItems } from "@/content/nav";

const rowClass = "h-bar border-b border-line md:h-cell";

export function Nav({
  variant,
  current = null,
  listRef,
  onNavigate,
  className,
}: {
  variant: "bar" | "row";
  current?: string | null;
  listRef?: Ref<HTMLUListElement>;
  onNavigate?: () => void;
  className?: string;
}) {
  const t = useTranslations("header");

  return (
    <nav
      aria-label={t(variant === "bar" ? "navLabel" : "menu.title")}
      className={className}
    >
      <ul
        ref={listRef}
        role="list"
        className={variant === "bar" ? "flex h-full" : undefined}
      >
        {navItems.map(({ id, href, number }) => (
          <li key={id} className={variant === "bar" ? "flex" : rowClass}>
            <NavLink
              href={href}
              variant={variant}
              number={variant === "row" ? number : undefined}
              active={current === id}
              onClick={onNavigate}
            >
              {t(`nav.${id}`)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
