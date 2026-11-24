/**
 * Compact row under the carousel: '02 Headless storefront' — clicking jumps the carousel to that index.
 *
 * As built: a plain fragment link to the slide (href '#project-{slug}', content/projects),
 * so without script the jump is the browser's own: it scrolls the track to the slide (and
 * the page to the carousel). Once hydrated the carousel passes onClick, which cancels the
 * fragment and scrolls the track alone, so the page stays put. Number above title, text only:
 * Portfolio Wireframes 7a adds a 96 × 58 thumbnail, but with five projects in one row a
 * cell is about 170px wide at 1024, too narrow for both (and the thumbnails cost five
 * image requests for pictures the slides already show).
 * The links sit in a scroll-target-group list (WorkCarousel), so where supported the
 * browser marks the link of the slide in view (:target-current); elsewhere the carousel's
 * fallback passes current. Both reach the same style through the current-section: variant,
 * the header nav's mark: a 2px accent bar in place of the frame's bottom edge (edge to edge,
 * over the 1px border, so no side is heavier than another), ink title and accent number.
 * The frame stays grey: an accent frame with a bar inside it drew a 3px bottom against 1px
 * sides. The bar is a shape, so the current item is not shown by colour alone (WCAG 1.4.1).
 * current: true / false from the fallback (aria-current), undefined where the browser tracks it.
 * The title is the link's name; the number is hidden from assistive tech, as in
 * SectionHeading. Must be an <li>'s child: the caller renders the list.
 */
import type { MouseEventHandler } from "react";
import { cn } from "@/lib/cn";

export function ProjectListItem({
  href,
  number,
  title,
  current,
  onClick,
  className,
}: {
  href: `#${string}`;
  number: string;
  title: string;
  current?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  className?: string;
}) {
  return (
    <a
      href={href}
      aria-current={current === undefined ? undefined : current}
      onClick={onClick}
      className={cn(
        "relative flex h-full flex-col gap-1.5 border border-line bg-bg px-4 py-3 text-ui-sm text-ink-2 hover:bg-bg-hover hover:text-ink focus-visible:focus-ring motion-safe:transition-colors motion-safe:duration-200",
        "current-section:text-ink current-section:before:absolute current-section:before:-inset-x-px current-section:before:-bottom-px current-section:before:h-0.5 current-section:before:bg-accent current-section:before:forced-color-adjust-none forced-colors:current-section:before:bg-[CanvasText] current-section:[&_[data-number]]:text-accent",
        className,
      )}
    >
      <span
        data-number
        aria-hidden="true"
        className="font-mono text-meta text-ink-3"
      >
        {number}
      </span>
      {title}
    </a>
  );
}
