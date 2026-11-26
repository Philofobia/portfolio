"use client";

/**
 * 'use client' — translate3d track of <ProjectCard />, drag/← → via useCarousel, prev/next <IconButton />s,
 * '01 — Freight tracking platform' caption between the arrows.
 *
 * As built: CSS first (styles/carousel.css holds the layers and their feature tests). The
 * track is a native scroll-snap scroller, not a translated strip: it scrolls with touch,
 * trackpad, keyboard and Tab with no script, and every card is in the server HTML (the
 * cards arrive as server-rendered elements in items[].card; this file only frames them).
 * - Control bar under the track: ← Previous · caption reel · Next → (Portfolio Wireframes
 *   7a; arrows only below 48rem). Where ::scroll-button() exists the browser draws the
 *   two buttons over the bar's end cells and the <button>s here are hidden; elsewhere
 *   these are the buttons, driven by useCarousel. They render disabled until the script
 *   has checked support, so without JavaScript they never look usable and do nothing.
 *   When a click reaches an end and its button disables, focus moves to the other one (MWG
 *   carousel), so it is never dropped to <body>.
 * - Caption reel: every "01 — Title" stacked in a one-line window, moved by the track's
 *   scroll timeline (or useCarousel's index). Decorative (aria-hidden): each slide is a
 *   labelled group ("1 of 4") holding the card's own heading.
 * - Project list (<ProjectListItem />): fragment links to the slides, the carousel's
 *   markers, in a scroll-target-group list; the current one is the browser's
 *   :target-current, or aria-current from useCarousel where that is missing. A click
 *   scrolls only the track (useCarousel show): following the fragment would also scroll
 *   the page to bring the slide into view. Without JavaScript it stays a plain link. From lg
 *   only, one row of five: narrower, the list wrapped into rows that made the page longer
 *   for little gain (on a phone, a row per project). Nothing is lost there: the same projects are the slides,
 *   each reachable by swipe, the arrows, Tab into its links, or a screen reader reading the
 *   track in order; the list is a shortcut, not the only way to a project.
 * - Photos: until the visitor engages with the carousel (pointer over it, focus in it, the
 *   track scrolled), only the slide on screen shows its photo, so a visitor who scrolls
 *   past downloads one, not the two or three lazy loading would fetch (the slides sit
 *   within its ~1250px margin). data-engaged then lets lazy loading work as usual, which
 *   keeps about one slide ahead: on slide 1, photo 2 is already loading. The rule and its
 *   no-JavaScript fallback are in styles/carousel.css.
 * From md the track's height rounds up to whole cells (snap-block-cells; the cards stretch
 * to it), so the control bar under it and the section below stay on the grid's lines.
 * Semantics (MWG carousel): the track is a focusable group with role description
 * "carousel" and a name; each slide a group, role description "slide", named by position.
 * The section around it is already the region (Work, aria-labelledby), so the carousel is
 * not a second landmark. All strings come in as props (labels, items), so the client gets
 * no messages namespace (clientMessages stays as it is).
 * Divergences from MWG carousel, named for review: native ::scroll-button() where supported
 * (the guide says not yet; the repository's web-performance skill and the brief ask for
 * CSS first); prev/next stop at the ends instead of looping, as the native buttons do;
 * the bar follows the track in DOM order, as it does on screen; no live status region,
 * since every slide stays in the accessibility tree and nothing but the user moves them.
 */
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ProjectListItem } from "@/components/molecules/ProjectListItem";
import { useCarousel } from "@/hooks/useCarousel";
import { cn } from "@/lib/cn";

export type WorkCarouselItem = {
  /** The slide's id, the list link's target. */
  anchor: string;
  title: string;
  /** The slide's accessible name: "1 of 4". */
  slideLabel: string;
  card: ReactNode;
};

export type WorkCarouselLabels = {
  carousel: string;
  slide: string;
  track: string;
  list: string;
  previous: string;
  next: string;
  previousLabel: string;
  nextLabel: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

// The look the native ::scroll-button() repeats in styles/carousel.css: change both together.
const controlClasses =
  "flex cursor-pointer items-center justify-center gap-[0.25em] text-ui not-disabled:hover:bg-bg-hover focus-visible:focus-ring-cell disabled:cursor-not-allowed disabled:text-ink-3 motion-safe:transition-colors motion-safe:duration-200 scroll-buttons:hidden";

export function WorkCarousel({
  items,
  labels,
  className,
}: {
  items: WorkCarouselItem[];
  labels: WorkCarouselLabels;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const previousRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const count = items.length;
  const { fallback, index, previous, next, show } = useCarousel(
    trackRef,
    count,
  );
  const buttons = fallback?.buttons === true;

  // The other slides' photos load once the visitor engages with the carousel
  // (styles/carousel.css): the pointer enters it, focus arrives, or the track scrolls.
  // From then on lazy loading keeps about one slide ahead. Checked once on mount too, for
  // a visitor who hovered, tabbed in or swiped before hydration, when no listener existed.
  const rootRef = useRef<HTMLDivElement>(null);
  const [engaged, setEngaged] = useState(false);
  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track || engaged) return;
    if (
      track.scrollLeft !== 0 ||
      root.matches(":hover") ||
      root.matches(":focus-within")
    ) {
      setEngaged(true);
      return;
    }
    const controller = new AbortController();
    const engage = () => setEngaged(true);
    const options = { once: true, passive: true, signal: controller.signal };
    root.addEventListener("pointerenter", engage, options);
    root.addEventListener("focusin", engage, options);
    track.addEventListener("scroll", engage, options);
    return () => controller.abort();
  }, [engaged]);

  return (
    <div ref={rootRef} className={className}>
      <div
        className="carousel"
        style={
          {
            "--carousel-count": count,
            "--carousel-index": index,
          } as CSSProperties
        }
      >
        <div
          ref={trackRef}
          tabIndex={0}
          role="group"
          aria-roledescription={labels.carousel}
          aria-label={labels.track}
          data-previous={labels.previous}
          data-previous-label={labels.previousLabel}
          data-next={labels.next}
          data-next-label={labels.nextLabel}
          data-engaged={engaged || undefined}
          className="carousel-track focus-visible:outline-none md:snap-block-cells"
        >
          {items.map((item) => (
            <div
              key={item.anchor}
              id={item.anchor}
              role="group"
              aria-roledescription={labels.slide}
              aria-label={item.slideLabel}
            >
              {item.card}
            </div>
          ))}
        </div>

        <div className="grid h-(--carousel-bar) grid-cols-[var(--carousel-control)_minmax(0,1fr)_var(--carousel-control)] border border-t-0 border-line bg-bg">
          <button
            ref={previousRef}
            type="button"
            aria-label={labels.previousLabel}
            disabled={!buttons || index === 0}
            onClick={() => {
              if (previous() === 0) nextRef.current?.focus();
            }}
            className={cn(controlClasses, "col-start-1 border-e border-line")}
          >
            <span aria-hidden="true">←</span>
            <span aria-hidden="true" className="max-md:hidden">
              {labels.previous}
            </span>
          </button>

          <div aria-hidden="true" className="col-start-2 overflow-hidden">
            <ol className="carousel-reel">
              {items.map((item, i) => (
                <li
                  key={item.anchor}
                  className="flex h-(--carousel-bar) items-center justify-center px-4 text-ui font-light md:text-[1.25rem]"
                >
                  <span className="truncate">
                    {pad(i + 1)} — {item.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <button
            ref={nextRef}
            type="button"
            aria-label={labels.nextLabel}
            disabled={!buttons || index === count - 1}
            onClick={() => {
              if (next() === count - 1) previousRef.current?.focus();
            }}
            className={cn(controlClasses, "col-start-3 border-s border-line")}
          >
            <span aria-hidden="true" className="max-md:hidden">
              {labels.next}
            </span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <nav aria-label={labels.list} className="mt-inset max-lg:hidden">
        <ol
          role="list"
          className="grid grid-cols-5 gap-inset scroll-target-group"
        >
          {items.map((item, i) => (
            <li key={item.anchor}>
              <ProjectListItem
                href={`#${item.anchor}`}
                number={pad(i + 1)}
                title={item.title}
                current={fallback?.markers ? index === i : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  show(i);
                }}
              />
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
