/**
 * 06 — display-size heading · intro · email + <CopyButton /> (<ContactBlock />) · a row of
 * <SocialLink /> cells (the profiles in content/profile links: GitHub, LinkedIn).
 *
 * As built (Portfolio Desktop / Mobile, 2026-11-24): the design's 07, now 06, since the About
 * panel was dropped (the hero, the Japan facts and the CVs already say what it said).
 * Heading xl (80 / 52 m), two cells high from md: so from md the section opens with one
 * cell of air (pt-cell), not two, and its title lands as far below the Japan section as
 * every other title below the section before it (two cells of air + a one-cell heading).
 * Anchor jumps skip that cell (-scroll-mt-cell), as the others skip theirs. The intro one
 * line under the heading, on its own whole cell from md
 * (min-block-size-cells-1), so the email box starts on a grid line as in the design (the
 * 38px gap there). Then one bordered block: the email row (ContactBlock: address beside
 * the copy cell from a 14-cell column, @contact-split:, stacked below) and, under it, the link row: three-cell links from md, the rest of the row empty;
 * on mobile the links share the width. The row is a <ul> (a list of profiles), one cell
 * high with its bottom line inside (left edge 1px outside, on the grid's line, as .cells),
 * its cells divided by end borders. Every edge of the block falls on a grid line from md
 * (7 cells in all at 18: two of air and heading, one intro, two email, one links).
 * The address is a mailto: link that works with no JavaScript; CopyButton is the only
 * client leaf, and it takes its labels from this server tree, so clientMessages does not grow.
 * The block rises into place as it scrolls in (motion.css .reveal-rise, CSS only).
 * No images; server component.
 */
import { useTranslations } from "next-intl";
import { ContactBlock } from "@/components/molecules/ContactBlock";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { SocialLink } from "@/components/molecules/SocialLink";
import { email, links } from "@/content/profile";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="-scroll-mt-cell pt-section snap-block-cells md:pt-cell ja:[word-break:auto-phrase]"
    >
      <div className="grid-container @container">
        <SectionHeading
          index={t("number")}
          title={t("title")}
          size="xl"
          titleId="contact-title"
        />
        <p className="reveal-rise max-w-measure pt-3 pb-5 text-ink-2 md:pb-0 md:min-block-size-cells-1">
          {t("intro")}
        </p>
        <div className="reveal-rise">
          <ContactBlock email={email} />
          <ul
            role="list"
            className="flex h-cell border-e border-b border-line bg-bg shadow-[-1px_0_0_var(--line)]"
          >
            {links.map(({ id, name, href }) => (
              <li
                key={id}
                className="flex-1 border-line not-last:border-e md:flex-none md:border-e"
              >
                <SocialLink name={name} href={href} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
