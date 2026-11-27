/**
 * The mobile menu's sheet (design): a row with the logo and ×, then one row per nav entry
 * (label + section number, accent when current).
 * Laid out like the Header, so opening the menu moves nothing: the top row is full bleed,
 * as high as the bar, with its bottom border edge to edge, and the logo and the × sit in the
 * header's span (.grid-wide; full width on mobile), where the logo and the burger were. The
 * nav rows are full width too (dividers edge to edge), their text in the same span
 * (NavLink 'row').
 * Presentational: MobileMenu shows it in a modal <dialog> and passes the live section,
 * the list ref and onNavigate (closing the dialog); the storybook renders it in place with
 * a fixed section. × submits a <form method="dialog">: it closes the dialog around the
 * sheet, and does nothing outside one.
 * No 'use client': renders on the server, and inside MobileMenu.
 */
import { useTranslations } from "next-intl";
import type { Ref } from "react";
import { IconButton } from "@/components/atoms/IconButton";
import { Logo } from "@/components/atoms/Logo";
import { Nav } from "@/components/molecules/Nav";

export function MenuSheet({
  current,
  listRef,
  onNavigate,
  className,
}: {
  current?: string | null;
  listRef?: Ref<HTMLUListElement>;
  onNavigate?: () => void;
  className?: string;
}) {
  const t = useTranslations("header");

  return (
    <div className={className}>
      <div className="h-bar border-b border-line md:h-cell">
        <div className="grid-wide flex h-full max-md:ms-0 max-md:w-full">
          <Logo onClick={onNavigate} className="flex-1 ps-cell-pad" />
          <form method="dialog" className="contents">
            <IconButton type="submit" label={t("menu.close")}>
              <span aria-hidden="true" className="text-lg leading-none">
                ×
              </span>
            </IconButton>
          </form>
        </div>
      </div>
      <Nav
        variant="row"
        current={current}
        listRef={listRef}
        onNavigate={onNavigate}
      />
    </div>
  );
}
