/**
 * Shared metadata builders: buildMetadata(locale), personJsonLd(locale).
 *
 * personJsonLd (2026-11-27, geo-agent-readiness references/structured-data.md): one
 * @graph per locale, printed by atoms/JsonLd on the home page. Person (the same @id on
 * both pages) → WebSite → ProfilePage (mainEntity: the person) → ItemList of the five
 * Work cards. Every value comes from what the page renders, so the markup cannot say
 * something the page does not (rule 4, visible parity): the name and katakana, links and
 * email from content/profile; job title and summary from hero; skills from the Stack
 * groups' tech names; education and the FE exam from experience; projects from
 * content/projects and work.projects.
 * Left out on purpose: image (the page shows no photo), worksFor (the current role ends in
 * December 2026 and the markup would outlive it; the timeline shows the employer) and
 * homeLocation (the page says Torino until December, Tokyo after: add Tokyo once moved).
 */
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { education } from "@/content/experience";
import {
  contentUpdated,
  email,
  links,
  name,
  nameKatakana,
  siteUrl,
} from "@/content/profile";
import { projects } from "@/content/projects";
import { stackGroups } from "@/content/stack";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { techName } from "@/lib/tech-icons";

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
    twitter: { card: "summary_large_image" },
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

/** A card's year ("2026", "2025–26") as an ISO 8601 year or interval ("2025/2026"). */
function isoYears(year: string) {
  const [from, to] = year.split("–");
  if (!to) return from;
  return `${from}/${to.length === 2 ? from.slice(0, 2) + to : to}`;
}

export async function personJsonLd(locale: Locale) {
  const [tMeta, tHero, tWork, tExperience] = await Promise.all([
    getTranslations({ locale, namespace: "meta" }),
    getTranslations({ locale, namespace: "hero" }),
    getTranslations({ locale, namespace: "work" }),
    getTranslations({ locale, namespace: "experience" }),
  ]);
  const pageUrl = `${siteUrl}${homePaths()[locale]}`;
  const person = { "@id": `${siteUrl}/#person` };
  const fe = education.find((item) => item.key === "fe");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        ...person,
        name,
        alternateName: nameKatakana,
        // The h1 without its line break: "Full-Stack Engineer", フルスタックエンジニア.
        jobTitle: tHero.markup("title", { br: () => "" }),
        description: tHero("intro"),
        url: `${siteUrl}/`,
        email,
        sameAs: links.map((link) => link.href),
        knowsAbout: [
          ...new Set(stackGroups.flatMap((group) => group.techs.map(techName))),
        ],
        // The Japan section's languages: Italian (native), English (C1), Japanese.
        knowsLanguage: ["it", "en", "ja"],
        alumniOf: (["its", "enaip"] as const).map((key) => ({
          "@type": "EducationalOrganization",
          name: tExperience(`education.${key}.org`),
        })),
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "certification",
          name: tExperience("education.fe.title"),
          dateCreated: fe?.start,
          recognizedBy: {
            "@type": "Organization",
            name: tExperience("education.fe.org"),
          },
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name,
        author: person,
        inLanguage: routing.locales,
      },
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: tMeta("title"),
        inLanguage: locale,
        dateModified: contentUpdated,
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: person,
        hasPart: { "@id": `${pageUrl}#projects` },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#projects`,
        name: tWork("title"),
        itemListElement: projects.map((project, index) => {
          const code = "code" in project.links ? project.links.code : undefined;
          return {
            "@type": "ListItem",
            position: index + 1,
            item: {
              // A public repository is source code; client work has no public URL.
              "@type": code ? "SoftwareSourceCode" : "CreativeWork",
              name: tWork(`projects.${project.slug}.title`),
              description: tWork(`projects.${project.slug}.description`),
              ...(code && { codeRepository: code }),
              temporalCoverage: isoYears(project.year),
              keywords: project.tech.map(techName),
              creator: person,
            },
          };
        }),
      },
    ],
  };
}
