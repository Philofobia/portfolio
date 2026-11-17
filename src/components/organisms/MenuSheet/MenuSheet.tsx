/**
 * The mobile menu's sheet (design): a row with the logo and ×, then one row per nav entry
 * (label + section number, accent when current).
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
      <div className="flex h-14 border-b border-line md:h-cell">
        <Logo onClick={onNavigate} className="flex-1 ps-cell-pad" />
        <form method="dialog" className="contents">
          <IconButton type="submit" frame="bar" label={t("menu.close")}>
            <span aria-hidden="true" className="text-lg leading-none">
              ×
            </span>
          </IconButton>
        </form>
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
