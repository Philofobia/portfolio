/**
 * One stack group (design 13 StackCell): <h3> title · description · list of <TechTag />.
 * variant 'cell' (desktop, static): a 3-cell-high Card: 'A.' index · <h3> · description at
 * the top, the tags at the foot.
 * variant 'accordion' (mobile): a native <details> row, 56 high, title + '+' / '−' marker
 * (accent when open); open, it shows the description and the tags.
 *
 * As built: one element is both variants, so the page carries each group once. It is a
 * <details> in the cell's look (card.styles.ts):
 *   below @stack-split (the Stack grid column's container size, tokens.css) it is the
 *     accordion row: the <summary> shows the title and the marker, and opens the content
 *     (index hidden, <h3> visually hidden: the summary already shows the title, and the
 *     heading keeps the group in the outline once open);
 *   from @stack-split it is the cell: the <summary> is hidden and the content is shown
 *     whether the item is open or not, by overriding ::details-content (MWG accordion:
 *     closed content is hidden with content-visibility, which an author style can undo).
 *     The heading is the visible title there.
 * ::details-content is Baseline Newly available (2025-09): where it is missing, the
 * summary stays visible from @stack-split too and the cell works as a disclosure (closed
 * groups show their title row; the <h3> stays visually hidden), so nothing is ever
 * unreachable. No script either way.
 * Not exclusive (no shared `name`): MWG accordion advises against exclusive accordions
 * (content jumps out of view for screen magnifier users). `open`: starts open (Frontend,
 * as Portfolio Mobile). The title is <summary> text, never a heading inside it: JAWS and
 * TalkBack drop headings in <summary> (MWG accordion). Closed content stays findable with
 * find-in-page (MWG search-hidden-content).
 * The index ('A.') is ordering the source order already gives: hidden from assistive tech.
 * Japanese titles are not uppercased (kana have no case; caps would only respell a Latin
 * word: 'Webパフォーマンス'), and Japanese descriptions break by phrase where supported
 * (word-break: auto-phrase, Chromium only). Tags may mix techs with a glyph and text-only
 * ones (TechTag draws a square for those).
 * Props: index, title, description, techs (TechId[]), open, className (placement).
 */
import { cardClasses } from "@/components/atoms/Card/card.styles";
import { TechTag } from "@/components/molecules/TechTag";
import { cn } from "@/lib/cn";
import type { TechId } from "@/lib/tech-icons";

// From @stack-split, where ::details-content can be styled: the content shows in a
// closed item too, filling the cell so the tags sit at its foot.
const contentShown =
  "@stack-split:supports-[selector(::details-content)]:details-content:block @stack-split:supports-[selector(::details-content)]:details-content:h-full @stack-split:supports-[selector(::details-content)]:details-content:[content-visibility:visible]";

export function StackGroupCard({
  index,
  title,
  description,
  techs,
  open = false,
  className,
}: {
  index: string;
  title: string;
  description: string;
  techs: readonly TechId[];
  open?: boolean;
  className?: string;
}) {
  return (
    <details
      open={open}
      className={cardClasses({
        className: cn("group p-0", contentShown, className),
      })}
    >
      <summary className="flex h-bar cursor-pointer list-none items-center justify-between px-5 text-h4 uppercase focus-visible:focus-ring-inset @stack-split:supports-[selector(::details-content)]:hidden ja:normal-case [&::-webkit-details-marker]:hidden">
        {title}
        <span
          aria-hidden="true"
          className="font-mono text-ui-xs text-ink-3 group-open:text-accent"
        >
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">−</span>
        </span>
      </summary>
      <div className="flex h-full flex-col justify-between gap-6 px-5 pb-5 @stack-split:supports-[selector(::details-content)]:p-cell-pad">
        <div className="flex flex-col gap-2">
          <span
            aria-hidden="true"
            className="hidden font-mono text-meta text-ink-3 @stack-split:supports-[selector(::details-content)]:block"
          >
            {index}
          </span>
          <h3 className="sr-only text-h4 uppercase @stack-split:supports-[selector(::details-content)]:not-sr-only ja:normal-case">
            {title}
          </h3>
          <p className="text-ink-2 ja:[word-break:auto-phrase]">
            {description}
          </p>
        </div>
        {/* Tag gaps: 10 / 20 in the cell, 10 / 16 in the mobile accordion (design 13). */}
        <ul
          role="list"
          className="flex flex-wrap gap-x-4 gap-y-2.5 @stack-split:gap-x-5"
        >
          {techs.map((id) => (
            <TechTag key={id} id={id} />
          ))}
        </ul>
      </div>
    </details>
  );
}
