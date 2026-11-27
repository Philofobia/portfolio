/**
 * 05 — bilingual heading (Working in Japan / 日本での就労について) · 6 <FactCard /> grid · <Documents />.
 *
 * As built (Portfolio Desktop / Mobile): the heading in the page's language, the other
 * language as its aside (with its own lang), then six facts as a <dl> of cells and the CV
 * downloads (Documents). Facts: residence status (student visa), Japanese, other languages,
 * the month of the move to Tokyo (content/profile inTokyoFrom, formatted per locale), the
 * FE exam, and the role sought. The design's "Based in" and "Available from" cells became
 * "In Tokyo from" and "Certification": the site states no availability date and no
 * part-time work, and says nothing about visa procedure (Marco, 2026-11-23).
 * Layout in japan.styles.ts: two columns below 18 cells, the design's 18 × 4 composition at
 * 18 (container query on the grid column). No nav entry; no images.
 * Japanese wraps by phrase (word-break: auto-phrase, inherited by every line of the
 * section; Chromium only, elsewhere the default per-character breaks), so a value like
 * 2026年12月 or a heading like 日本での就労について never splits mid-word.
 * Server component, no client code. The facts rise into place as they scroll in
 * (motion.css .reveal-rise, CSS only).
 * An anchor jump lands with the heading under the header, or one cell of air above it on
 * tall: windows (≥ 900px high), so the section reads centred rather than top-heavy.
 * From md at least the screen's height less those cells (min-block-size-screen-0, -1 on
 * tall:; Contact opens with one cell of air, not two), so after a nav jump the Contact
 * title stays below the window (variants.css).
 */
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { FactCard } from "@/components/molecules/FactCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { Documents } from "@/components/organisms/Documents";
import { inTokyoFrom } from "@/content/profile";
import { cn } from "@/lib/cn";
import { monthDate } from "@/lib/time";
import { factCell, factPlacement, factsGrid } from "./japan.styles";

export function Japan() {
  const t = useTranslations("japan");
  const format = useFormatter();
  const locale = useLocale();

  const facts = [
    {
      key: "residence",
      size: "lg",
      value: t("facts.residence.value"),
    },
    {
      key: "japanese",
      value: t("facts.japanese.value"),
      note: t("facts.japanese.note"),
    },
    {
      key: "languages",
      value: t("facts.languages.value"),
      note: t("facts.languages.note"),
    },
    {
      key: "inTokyo",
      value: (
        <time dateTime={inTokyoFrom}>
          {format.dateTime(monthDate(inTokyoFrom), "month")}
        </time>
      ),
      note: t("facts.inTokyo.note"),
    },
    {
      key: "certification",
      value: t("facts.certification.value"),
      note: t("facts.certification.note"),
    },
    {
      key: "lookingFor",
      value: t("facts.lookingFor.value"),
      note: t("facts.lookingFor.note"),
    },
  ] as const;

  return (
    <section
      id="japan"
      aria-labelledby="japan-title"
      className="-scroll-mt-cell pt-section snap-block-cells md:-scroll-mt-section tall:-scroll-mt-cell md:min-block-size-screen-0 tall:min-block-size-screen-1 ja:[word-break:auto-phrase]"
    >
      <div className="grid-container @container">
        <SectionHeading
          index={t("number")}
          title={t("title")}
          aside={
            <span lang={locale === "ja" ? "en" : "ja"}>{t("subtitle")}</span>
          }
          titleId="japan-title"
        />
        <dl className={cn("cells reveal-rise", factsGrid)}>
          {facts.map((fact) => (
            <FactCard
              key={fact.key}
              label={t(`facts.${fact.key}.label`)}
              value={fact.value}
              note={"note" in fact ? fact.note : undefined}
              size={"size" in fact ? fact.size : "md"}
              className={cn(factCell, factPlacement[fact.key])}
            />
          ))}
        </dl>
        <Documents />
      </div>
    </section>
  );
}
