"use client";

/**
 * 'use client' — toggles en ⇄ ja keeping the same pathname (i18n/navigation Link / useRouter).
 * Label shows the OTHER language: '日本語' on en, 'English' on ja.
 * A link, not a button: it goes to the other locale's URL. lang/hrefLang name the target
 * language so screen readers pronounce the label in it. One grid cell, like IconButton.
 * No prefetch: the header keeps it on screen on every page, and prefetching would fetch
 * the other locale's page on every visit for a link few people click.
 */
import { useLocale, useTranslations } from "next-intl";
import { squareClasses } from "@/components/ui/button/button.styles";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LocaleSwitcher({ className }: { className?: string }) {
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
        squareClasses,
        "text-[0.8125rem] font-normal md:text-[0.875rem]",
        className,
      )}
    >
      {t("localeSwitch")}
    </Link>
  );
}
