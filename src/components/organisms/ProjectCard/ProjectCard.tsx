/**
 * Work card (design 12 ProjectCard): <MediaFrame image /> · tech icon rail · counter · title ·
 * description · 'ROLE — …' mono line · actions (Case study → / Code ↗ / Live ↗).
 * Placed by the Work section in its carousel (organisms/WorkCarousel), one card per slide;
 * the card fills the slide's height, so cards of different lengths keep their actions on
 * the same line. (Portfolio Desktop and the design library stack the cards instead; the
 * carousel of Portfolio Wireframes 7a was chosen for the site.)
 * Layout by the card's own width (container query, MWG size-aware-styling), one markup:
 *   row   (≥ 48rem container): image 9 cells (inset 15) │ rail 1 cell × 5 │ body ≥ 340,
 *         actions 75 high at the body's foot; at least 5 cells high.
 *   stack (narrower): image 200 high (inset 10) · rail across, 5 equal cells · body ·
 *         actions sharing the row, 50 high.
 * Source order: image · body (counter, <h3>, description, role, actions) · rail, so the
 * heading comes before the tech list (MWG card: media, header, content, footer); the grid
 * places the rail visually between image and body. The rail is a list named by visually
 * hidden text ("Built with"), not aria-label (ignored on a list by some screen readers).
 * Props: index / total (1-based), title, description, role, image { src, alt: '' for a
 * mood photo that does not show the product (WAI decorative images: ambiance / eye candy),
 * a description for a screenshot }, icons
 * (IconTechId[]: techs with a glyph, max 5: empty rail slots stay blank cells), links { caseStudy?, code?, live? }
 * (caseStudy an internal path, code / live external URLs; neither code nor live → a disabled
 * "Private —"), eager (the card's image is above the fold or the LCP).
 * Motion (CSS only, motion.css), by where the card sits (motion prop):
 *   page  (default) the card rises 24px as it scrolls in, the image settles from 1.04 to 1
 *         inside its inset, on the page's scroll;
 *   slide inside a horizontal scroller (the carousel): only the image settles, as the
 *         card slides in (view(inline)); the carousel rises as a whole.
 * Action links carry the title in visually hidden text ("Code: Freight tracking platform"),
 * so a list of links stays unambiguous out of context (MWG card); the "Private —" dash is
 * hidden from screen readers.
 * Image sizes assume the card spans the Work grid column: the row layout starts at a 48rem
 * card, which the even-cell column (45px gutters) reaches from a 990px viewport (12 cells);
 * below that the stacked image is nearly the column's width. The widest value is 37.5rem
 * (600px), not the image's 605: at 2x that is exactly the 1200w candidate, where 608 asked
 * for the 1920w file (about twice the bytes for no visible gain).
 */
import { useTranslations } from "next-intl";
import { Button } from "@/components/atoms/Button";
import { Counter } from "@/components/atoms/Counter";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { TechTag } from "@/components/molecules/TechTag";
import { cn } from "@/lib/cn";
import type { IconTechId } from "@/lib/tech-icons";

const RAIL_SLOTS = 5;

type ProjectCardProps = {
  index: number;
  total: number;
  title: string;
  description: string;
  role: string;
  image: { src: string; alt: string };
  icons: IconTechId[];
  links: { caseStudy?: string; code?: string; live?: string };
  eager?: boolean;
  motion?: "page" | "slide";
  className?: string;
};

export function ProjectCard({
  index,
  total,
  title,
  description,
  role,
  image,
  icons,
  links,
  eager = false,
  motion = "page",
  className,
}: ProjectCardProps) {
  const t = useTranslations("work");
  const forTitle = <span className="sr-only">: {title}</span>;

  return (
    <article
      className={cn(
        "@container border border-line bg-bg",
        motion === "page" && "reveal-rise",
        className,
      )}
    >
      <div className="grid h-full grid-rows-[auto_auto_1fr] @3xl:min-h-cells-5 @3xl:grid-cols-[minmax(0,1fr)_var(--cell)_minmax(21.25rem,1fr)] @3xl:grid-rows-1">
        <div className="cell-media h-50 border-b border-line @3xl:h-auto @3xl:border-e @3xl:border-b-0">
          <MediaFrame
            src={image.src}
            alt={image.alt}
            sizes="(min-width: 90rem) 37.5rem, (min-width: 61.875rem) calc(50vw - 7rem), (min-width: 48rem) calc(100vw - 7.5rem), 100vw"
            eager={eager}
            imageClassName={
              motion === "page" ? "reveal-zoom" : "reveal-zoom-inline"
            }
          />
        </div>

        <div className="row-start-3 flex min-w-0 flex-col @3xl:col-start-3 @3xl:row-start-1">
          <div className="flex flex-col gap-2.5 p-5 @3xl:gap-3.5 @3xl:px-8 @3xl:pt-7">
            <Counter
              current={index}
              total={total}
              label={t("counter", { index, total })}
            />
            <h3 className="text-h3 uppercase ja:normal-case">{title}</h3>
            <p className="text-ink-2">{description}</p>
            {/* Japanese keeps its Latin words as written ("Web", not "WEB"); the role line's
                separator is the message's (Role — … / 担当：…). */}
            <p className="font-mono text-meta leading-normal text-ink-3 uppercase ja:normal-case">
              {t("role", { role })}
            </p>
          </div>

          <footer className="mt-auto flex border-t border-line *:-my-px *:first:-ms-px">
            {links.caseStudy && (
              <Button href={links.caseStudy} size="card" icon="→">
                {t("caseStudy")}
                {forTitle}
              </Button>
            )}
            {links.code && (
              <Button href={links.code} size="card" icon="↗">
                {t("code")}
                {forTitle}
              </Button>
            )}
            {links.live && (
              <Button href={links.live} size="card" icon="↗">
                {t("live")}
                {forTitle}
              </Button>
            )}
            {!links.code && !links.live && (
              <Button size="card" disabled>
                {t("private")}
                <span aria-hidden="true"> —</span>
              </Button>
            )}
          </footer>
        </div>

        <p className="sr-only">{t("stackLabel")}</p>
        <ul
          role="list"
          className="row-start-2 grid grid-cols-5 border-b border-line @3xl:col-start-2 @3xl:row-start-1 @3xl:flex @3xl:flex-col @3xl:border-e @3xl:border-b-0"
        >
          {icons.slice(0, RAIL_SLOTS).map((id, slot) => (
            <TechTag
              key={id}
              id={id}
              as="cell"
              className={cn(
                slot < RAIL_SLOTS - 1 &&
                  "border-e border-line @3xl:border-e-0 @3xl:border-b",
              )}
            />
          ))}
        </ul>
      </div>
    </article>
  );
}
