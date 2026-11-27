"use client";

/**
 * 'use client' — toggles en ⇄ ja keeping the same pathname (i18n/navigation Link).
 * Label shows the OTHER language: '日本語' on en, 'English' on ja.
 * A link, not a button: it goes to the other locale's URL. lang/hrefLang name the target
 * language so screen readers pronounce the label in it. frame 'bar': one cell of the header,
 * like IconButton; frame 'text': a plain mono link (the footer's
 * '日本語で見る'). label overrides the header's short label (the footer passes its own).
 * No prefetch: the header keeps it on screen on every page, and prefetching would fetch
 * the other locale's page on every visit for a link few people click.
 */
import { useLocale, useTranslations } from "next-intl";
import {
  squareClasses,
  textLinkClasses,
} from "@/components/atoms/Button/button.styles";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LocaleSwitcher({
  frame,
  label,
  className,
}: {
  frame: "bar" | "text";
  label?: string;
  className?: string;
}) {
  const t = useTranslations("header");
  const locale = useLocale();
  const pathname = usePathname();
  const target =
    routing.locales.find((other) => other !== locale) ?? routing.defaultLocale;

  return (
    <Link
      href={pathname}
      locale={target}
      prefetch={false}
      lang={target}
      hrefLang={target}
      className={cn(
        frame === "text"
          ? textLinkClasses
          : cn(squareClasses, "text-ui-xs font-normal md:text-ui-sm"),
        className,
      )}
    >
      {label ?? t("localeSwitch")}
    </Link>
  );
}
