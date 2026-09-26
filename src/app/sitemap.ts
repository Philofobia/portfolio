/**
 * sitemap.xml — the home page once per locale, each with hreflang alternates for all
 * locales. URLs come from lib/metadata's homePaths (getPathname), so `ja` is /jp.
 */
import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/profile";
import { routing } from "@/i18n/routing";
import { homePaths } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = homePaths();
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, `${siteUrl}${paths[locale]}`]),
  );

  return routing.locales.map((locale) => ({
    url: `${siteUrl}${paths[locale]}`,
    lastModified: new Date(),
    alternates: { languages },
  }));
}
