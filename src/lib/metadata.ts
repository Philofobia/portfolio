/**
 * Shared metadata builders: buildMetadata(locale), personJsonLd(locale).
 */
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { siteUrl } from "@/content/profile";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const openGraphLocale: Record<Locale, string> = { en: "en_US", ja: "ja_JP" };

export function homePaths() {
  return Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      getPathname({ href: "/", locale }),
    ]),
  ) as Record<Locale, string>;
}

export async function buildMetadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const paths = homePaths();

  return {
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: paths[locale],
      languages: { ...paths, "x-default": paths[routing.defaultLocale] },
    },
    openGraph: {
      type: "website",
      url: paths[locale],
      title: t("title"),
      description: t("description"),
      locale: openGraphLocale[locale],
      alternateLocale: routing.locales
        .filter((other) => other !== locale)
        .map((other) => openGraphLocale[other]),
    },
  };
}
