/**
 * HOME PAGE — single-page layout. Stacks the 6 numbered sections in order:
 * 01 Hero · 02 Work · 03 Stack · 04 Experience · 05 Japan · 06 Contact
 * Each section is a full-height panel with an id used by the header nav anchors.
 * The design's 06 About was dropped (2026-11-24): the hero, the Japan facts and the
 * downloadable CVs already cover it, so Contact is 06 instead of the design's 07.
 * The Header comes first, above <main id="main"> (its skip link's target); the Footer
 * closes the page after <main>.
 * <main> ends with one empty grid cell (pb-cell) after the last section (Contact), so the
 * page does not stop on its edge: the air the sections keep above their headings, given
 * once below the last one, before the footer.
 * The page's structured data (lib/metadata personJsonLd: the person, the site, this
 * profile page and its projects) comes first, as a <script type="application/ld+json">
 * in the prerendered HTML.
 */
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/atoms/JsonLd";
import { Contact } from "@/components/organisms/Contact";
import { Experience } from "@/components/organisms/Experience";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { Hero } from "@/components/organisms/Hero";
import { Japan } from "@/components/organisms/Japan";
import { Stack } from "@/components/organisms/Stack";
import { Work } from "@/components/organisms/Work";
import { routing } from "@/i18n/routing";
import { personJsonLd } from "@/lib/metadata";

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <>
      <JsonLd data={await personJsonLd(locale)} />
      <Header />
      <main id="main" tabIndex={-1} className="pb-cell">
        <Hero />
        <Work />
        <Stack />
        <Experience />
        <Japan />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
