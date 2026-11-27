/**
 * 03 — <SectionHeading> · <StackMarquee /> ('Frontend · Backend · Infra') · grid of <StackGroupCard />.
 *
 * As built (Portfolio Desktop / Mobile): the heading ('03.' · Stack · one line as its
 * aside), then the five groups from content/stack (tech ids) and messages stack.groups
 * (copy) as cells, with the design's two photo cells. No band: StackMarquee repeated the
 * group titles the cells already show (removed 2026-11-23, with Marco).
 * One structure at every width, three layouts by container query on the grid column
 * (stack.styles.ts): the accordion below 12 cells, two columns from 12, the design's
 * 18 × 8 composition at 18. Each group is a single <details> that is the accordion row on
 * mobile and the cell from 12 cells (StackGroupCard), so the page carries it once.
 * Cells draw their right and bottom borders, the grid its top and left (.cells).
 * Photos: decorative Unsplash photos in the accent's blue (alt ""), lazy, below the first
 * view; a lazy image under display: none (the swirl below 18 cells) is never fetched.
 * Fixed sizing (MediaFrame width / height: a 1x / 2x srcset) keeps each <img> to two
 * candidates, at quality 60 (content/stack: the section's photos stay under 20 KB).
 * Photo cells take contain-size: they add no height of their own and fill the row the
 * group cells size (or their fixed two cells on mobile).
 * Server component, no client code. The grid rises into place as it scrolls in
 * (motion.css .reveal-rise, CSS only).
 * Japanese wraps by phrase (word-break: auto-phrase, as in Japan and Experience; Chromium
 * only), so no word splits across lines.
 * An anchor jump lands with the heading under the header, or one cell of air above it on
 * tall: windows (≥ 900px high), so the section reads centred rather than top-heavy.
 * From md at least the screen less those cells (min-block-size-screen-1, -2 on tall:), so
 * after a nav jump the next section's title stays below the window (variants.css).
 */
import { useTranslations } from "next-intl";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { StackGroupCard } from "@/components/molecules/StackGroupCard";
import { stackGroups, stackPhotos } from "@/content/stack";
import { cn } from "@/lib/cn";
import { stackCell, stackGrid, stackPlacement } from "./stack.styles";

const photoCell = "border-r border-b border-line contain-size";

export function Stack() {
  const t = useTranslations("stack");

  const [first, ...rest] = stackGroups.map(({ key, techs }, i) => (
    <StackGroupCard
      key={key}
      // Mobile accordion: Frontend starts open (Portfolio Mobile).
      open={i === 0}
      // 'A.', 'B.'…: decorative ordering, the same in every locale.
      index={`${String.fromCharCode(65 + i)}.`}
      title={t(`groups.${key}.title`)}
      description={t(`groups.${key}.description`)}
      techs={techs}
      className={cn(stackCell, stackPlacement[key])}
    />
  ));

  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="-scroll-mt-cell pt-section snap-block-cells md:-scroll-mt-section tall:-scroll-mt-cell md:min-block-size-screen-1 tall:min-block-size-screen-2 ja:[word-break:auto-phrase]"
    >
      <div className="grid-container @container">
        <SectionHeading
          index={t("number")}
          title={t("title")}
          aside={t("subtitle")}
          titleId="stack-title"
        />
        <div className={cn("cells reveal-rise", stackGrid)}>
          {first}
          <div className={cn(photoCell, stackPlacement.fiber)}>
            <MediaFrame {...stackPhotos.fiber} alt="" quality={60} />
          </div>
          {rest}
          <div className={cn(photoCell, stackPlacement.swirl)}>
            <MediaFrame {...stackPhotos.swirl} alt="" quality={60} />
          </div>
        </div>
      </div>
    </section>
  );
}
