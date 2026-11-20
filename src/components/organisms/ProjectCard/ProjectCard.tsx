/**
 * Work card (design 12 ProjectCard): <MediaFrame image /> · tech icon rail · counter · title ·
 * description · 'ROLE — …' mono line · actions (Case study → / Code ↗ / Live ↗).
 * The cards stack vertically, 75px apart: no carousel (Portfolio Desktop and the design
 * library supersede the WorkCarousel scaffold).
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
 * (TechId[], max 5: empty rail slots stay blank cells), links { caseStudy?, code?, live? }
 * (caseStudy an internal path, code / live external URLs; neither code nor live → a disabled
 * "Private —"), eager (the card's image is above the fold or the LCP).
 * Motion (CSS only, motion.css): the card rises 24px as it scrolls in, the image settles
 * from 1.04 to 1 inside its inset.
 * Action links carry the title in visually hidden text ("Code: Freight tracking platform"),
 * so a list of links stays unambiguous out of context (MWG card); the "Private —" dash is
 * hidden from screen readers.
 * Image sizes assume the card spans the Work grid column: the row layout starts at a 48rem
 * card, which the even-cell column (45px gutters) reaches from a 990px viewport (12 cells);
 * below that the stacked image is nearly the column's width.
 */
import { useTranslations } from "next-intl";
import { Button } from "@/components/atoms/Button";
import { Counter } from "@/components/atoms/Counter";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { TechTag } from "@/components/molecules/TechTag";
import { cn } from "@/lib/cn";
import type { TechId } from "@/lib/tech-icons";

const RAIL_SLOTS = 5;

export type ProjectCardProps = {
  index: number;
  total: number;
  title: string;
  description: string;
  role: string;
  image: { src: string; alt: string };
  icons: TechId[];
  links: { caseStudy?: string; code?: string; live?: string };
  eager?: boolean;
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
  className,
}: ProjectCardProps) {
  const t = useTranslations("work");
  const forTitle = <span className="sr-only">: {title}</span>;

  return (
    <article
      className={cn(
        "reveal-rise @container border border-line bg-bg",
        className,
      )}
    >
      <div className="grid @3xl:min-h-cells-5 @3xl:grid-cols-[minmax(0,1fr)_var(--cell)_minmax(21.25rem,1fr)]">
        <div className="cell-media h-50 border-b border-line @3xl:h-auto @3xl:border-e @3xl:border-b-0">
          <MediaFrame
            src={image.src}
            alt={image.alt}
            sizes="(min-width: 90rem) 38rem, (min-width: 61.875rem) calc(50vw - 7rem), (min-width: 48rem) calc(100vw - 7.5rem), 100vw"
            eager={eager}
            imageClassName="reveal-zoom"
          />
        </div>

        <div className="row-start-3 flex min-w-0 flex-col @3xl:col-start-3 @3xl:row-start-1">
          <div className="flex flex-col gap-2.5 p-5 @3xl:gap-3.5 @3xl:px-8 @3xl:pt-7">
            <Counter
              current={index}
              total={total}
              label={t("counter", { index, total })}
            />
            <h3 className="text-h3 uppercase">{title}</h3>
            <p className="text-ink-2">{description}</p>
            <p className="font-mono text-meta leading-normal text-ink-3 uppercase">
              {t("role")} — {role}
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
