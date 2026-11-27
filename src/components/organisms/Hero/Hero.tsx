/**
 * 01 POSITIONING — <Label> · stacked headline 'Fullstack / Engineer' · 'Open to roles / in Japan' · intro · CTAs
 * (Button href: primary 'View work ↓', secondary 'Download CV ⤓') · <DotMatrix /> canvas · <HeroMarquee /> at bottom.
 *
 * As built (Portfolio Desktop / Mobile): <AvailabilityPill /> on top, the headline as the
 * page's <h1> ('Full-Stack / Engineer', the title used in Japan, where 'developer' is not;
 * the CVs carry the same title, so the page and the PDFs agree: geo-agent-readiness),
 * label and subtitle, <HeroEmblem /> (the poster <img>
 * is the LCP; DotMatrix is its canvas layer), intro, the CTA pair, then the marquee, full
 * bleed. The section is named by the <h1> (aria-labelledby) and is the Logo's #hero target.
 * Server component: the text is all in the prerendered HTML; the canvas and the marquee's
 * pause button are the only client leaves.
 *
 * Layout, by the grid column's own width (container queries, tokens --container-hero-*;
 * the column snaps to whole cells, so a viewport query would miss it). The placements and
 * the composition rules behind them are in hero.styles.ts:
 * - stacked, below 12 cells: one column in the mobile design's order, which is also the
 *   DOM and reading order (availability, headline, subtitle, emblem, intro, CTAs);
 * - @hero-split, 12–15 cells: 5-cell text column · gap cell · emblem, with the CTA pair
 *   under the intro (the emblem aligned to the headline's top and the CTAs' bottom);
 * - @hero-wide, 16+ cells: the design's three columns, tightened: the left text as one
 *   group centred on the emblem, the subtitle on the headline's middle, the CTA pair on the
 *   emblem's bottom row, both right-hand parts ending on the same grid line.
 * Rows are cells but may grow (minmax), so longer copy pushes the grid down instead of
 * running into the next row.
 *
 * Japanese (ja: variant): full-width glyphs fill their em box, so the same size reads larger
 * and denser than Latin. On Japanese pages the headline steps down to 40 / 32 m, the
 * subtitle to 20 / 16 m, the intro to 15 / 14 m with 1.8 leading. The intro also wraps by
 * phrase (word-break: auto-phrase, Chromium only; elsewhere the default per-character
 * breaks), so a word like フルタイム is not split across lines.
 *
 * Details over the design: the subtitle breaks onto two lines only in @hero-wide, where it
 * stands alone in its column (the mobile design sets it on one line, and in @hero-split one
 * line leaves the text column room); the break is a <br> in the message, so word order
 * and spacing stay per language. The headline's break is a <br> in its message too, with a
 * space before it in English ('Full-Stack Engineer' in textContent, for crawlers and
 * copy-paste) and none in Japanese (フルスタックエンジニア, as the page title spells it). The CV button shows 'CV' on mobile, as the design does, but
 * keeps the full label as its accessible name (the visible word is part of it: WCAG 2.5.3).
 * The CV is a PDF download, one per locale (content/profile heroCv): the English CV on /en,
 * the 応募書類 on /jp (履歴書 + 職務経歴書 in one file); hreflang is the document's
 * language, type="application/pdf".
 * The '01.' number is hidden from assistive tech, as in SectionHeading.
 * The label is the name (content/profile: "Marco Parisi" on /en, its katakana on /jp;
 * 2026-11-27), in place of the design's 'Positioning'. The hero is where a reader and an
 * answer engine look for who the page is about, and a sentence about "Marco" in the intro
 * read like a third-party bio: as a label it reads like the other sections' ("02.
 * Selected work") and adds no prose. The h1 stays the job title.
 * Typography (MWG improve-text-layout-and-legibility): text-wrap: pretty on the intro, a
 * progressive enhancement (Limited availability; ignored elsewhere). The headline and
 * subtitle break by hand, so they need no balance.
 * From md the hero is at least the first screen under the header (min-block-size-first-screen,
 * whole cells rounded down), the marquee pinned to its foot (mt-auto): on a screen taller
 * than the composition the extra cells open above the marquee, and the next section's
 * title no longer shows in the first view (1920 × 1080, 2026-11-27).
 */
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/atoms/Button";
import { Label } from "@/components/atoms/Label";
import { AvailabilityPill } from "@/components/molecules/AvailabilityPill";
import { HeroEmblem } from "@/components/molecules/HeroEmblem";
import { HeroMarquee } from "@/components/molecules/HeroMarquee";
import { cv, heroCv, inTokyoFrom, name, nameKatakana } from "@/content/profile";
import { cn } from "@/lib/cn";
import { heroGrid, heroPlacement } from "./hero.styles";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const cvDocument = cv[heroCv[locale]];

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="snap-block-cells md:flex md:min-block-size-first-screen md:flex-col"
    >
      <div className="grid-container @container">
        <div className={heroGrid}>
          <AvailabilityPill
            from={inTokyoFrom}
            className={heroPlacement.availability}
          />

          <h1
            id="hero-title"
            className={cn(
              "text-h1 uppercase ja:text-[2rem] md:ja:text-[2.5rem]",
              heroPlacement.title,
            )}
          >
            {t.rich("title", { br: () => <br /> })}
          </h1>

          <div
            className={cn(
              "flex flex-col gap-2 @hero-wide:gap-3",
              heroPlacement.subtitle,
            )}
          >
            <Label as="p" tone="ink-3">
              <span aria-hidden="true">01. </span>
              {locale === "ja" ? nameKatakana : name}
            </Label>
            <p className="text-[1.125rem] leading-[1.1] font-extralight text-ink-2 uppercase md:text-h4 md:leading-[1.1] ja:text-base md:ja:text-[1.25rem] md:ja:leading-[1.3]">
              {t.rich("subtitle", {
                br: () => <br className="@max-hero-wide:hidden" />,
              })}
            </p>
          </div>

          <HeroEmblem className={heroPlacement.emblem} />

          <p
            className={cn(
              "max-w-[38ch] text-ui text-pretty text-ink-2 md:text-base md:leading-[1.6] @hero-split:max-w-none ja:text-ui-sm ja:leading-[1.8] ja:[word-break:auto-phrase] md:ja:text-ui md:ja:leading-[1.8]",
              heroPlacement.intro,
            )}
          >
            {t("intro")}
          </p>

          <div className={cn("flex", heroPlacement.ctas)}>
            <Button
              variant="primary"
              size="cta"
              href="#work"
              icon="↓"
              // Below 48rem the pair shares the row: whole cells for the first, the rest
              // for the second, so their border falls on a grid line (7 cells: 4 + 3).
              className="max-md:w-half-cells max-md:flex-none"
            >
              {t("ctaWork")}
            </Button>
            <Button
              size="cta"
              href={cvDocument.href}
              download={cvDocument.fileName}
              hrefLang={cvDocument.lang}
              type="application/pdf"
              icon="⤓"
            >
              <span aria-hidden="true" className="md:hidden">
                {t("ctaCvShort")}
              </span>
              <span className="max-md:sr-only">{t("ctaCv")}</span>
            </Button>
          </div>
        </div>
      </div>

      <HeroMarquee className="md:mt-auto" />
    </section>
  );
}
