/**
 * Compact row under the carousel: '02 Headless storefront' — clicking jumps the carousel to that index.
 *
 * As built: a plain fragment link to the slide (href '#project-{slug}', content/projects),
 * so the jump is the browser's own: it scrolls the carousel's track to the slide (and the
 * page to the carousel) with no script, in every browser. Number above title, text only:
 * Portfolio Wireframes 7a adds a 96 × 58 thumbnail, but with five projects in one row a
 * cell is about 170px wide at 1024, too narrow for both (and the thumbnails cost five
 * image requests for pictures the slides already show).
 * The links sit in a scroll-target-group list (WorkCarousel), so where supported the
 * browser marks the link of the slide in view (:target-current); elsewhere the carousel's
 * fallback passes current. Both reach the same style through the current-section: variant:
 * an accent frame and a 2px accent rule along the bottom, plus ink text, so the current item
 * is not shown by colour alone (WCAG 1.4.1).
 * current: true / false from the fallback (aria-current), undefined where the browser tracks it.
 * The title is the link's name; the number is hidden from assistive tech, as in
 * SectionHeading. Must be an <li>'s child: the caller renders the list.
 */
import { cn } from "@/lib/cn";

export function ProjectListItem({
  href,
  number,
  title,
  current,
  className,
}: {
  href: `#${string}`;
  number: string;
  title: string;
  current?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      aria-current={current === undefined ? undefined : current}
      className={cn(
        "relative flex h-full flex-col gap-1.5 border border-line bg-bg px-4 py-3 text-ui-sm text-ink-2 hover:bg-bg-hover hover:text-ink focus-visible:focus-ring motion-safe:transition-colors motion-safe:duration-200",
        "current-section:border-accent current-section:text-ink current-section:before:absolute current-section:before:inset-x-0 current-section:before:bottom-0 current-section:before:h-0.5 current-section:before:bg-accent",
        className,
      )}
    >
      <span aria-hidden="true" className="font-mono text-meta text-ink-3">
        {number}
      </span>
      {title}
    </a>
  );
}
