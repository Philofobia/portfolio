/**
 * CV download card (design 16 DocCard): format line ('PDF' · size · ⤓) · title (履歴書 /
 * 職務経歴書 / Résumé, Plex JP) · description · download link.
 * A single-destination card (MWG card): an <article> whose <h3> holds the one link, its
 * ::after stretched over the card, so the whole card is clickable while the link's name stays
 * the title; aria-describedby adds the format line ("PDF · 240 KB"). Hover and the focus ring
 * are drawn on the card with :has() (link-hover: / group-link-hover:, real pointers only).
 * The size is always in the DOM, shown on hover and focus (always on touch screens, which
 * have no hover).
 * Desktop: a 2-cell-high cell, format line on top. Mobile (< 48rem): a 56-high row, title ·
 * 'PDF ⤓'; the description stays for screen readers only.
 * Props: href (a file in public/cv), fileName (the name it downloads as), hrefLang (the document's language, always set),
 * title, titleLang (only when the title's language differs from the page's: 'ja' for
 * 履歴書 / 職務経歴書 on the English page), description, format ('PDF'), size ('240 KB'),
 * headingLevel ('h3' default | 'h4' under a group heading).
 * No Badge pill: the design shows plain mono text.
 */
import { useId } from "react";
import { Card } from "@/components/atoms/Card";
import { cn } from "@/lib/cn";

export function DocumentCard({
  href,
  fileName,
  hrefLang,
  title,
  titleLang,
  description,
  format,
  size,
  headingLevel = "h3",
  className,
}: {
  href: string;
  fileName?: string;
  hrefLang?: string;
  title: string;
  titleLang?: string;
  description: string;
  format: string;
  size?: string;
  headingLevel?: "h3" | "h4";
  className?: string;
}) {
  const metaId = useId();
  const Heading = headingLevel;

  return (
    <Card
      as="article"
      className={cn(
        "group relative flex items-center justify-between gap-4 max-md:h-bar max-md:py-0 md:h-cells-2 md:flex-col md:items-stretch",
        "has-[a:focus-visible]:focus-ring-inset motion-safe:transition-colors motion-safe:duration-200 link-hover:bg-bg-hover",
        className,
      )}
    >
      <Heading className="font-jp text-[1.0625rem] leading-[1.3] font-normal md:text-[1.375rem]">
        <a
          href={href}
          download={fileName ?? true}
          lang={titleLang}
          hrefLang={hrefLang}
          aria-describedby={metaId}
          className="after:absolute after:inset-0 focus-visible:outline-none"
        >
          {title}
        </a>
      </Heading>
      <p
        id={metaId}
        className="flex shrink-0 justify-between gap-2 font-mono text-meta text-ink-2 md:order-first group-link-hover:text-ink"
      >
        <span>
          {format}
          {size && (
            <span className="opacity-0 group-has-[a:focus-visible]:opacity-100 motion-safe:transition-opacity motion-safe:duration-200 max-md:sr-only group-link-hover:opacity-100 [@media(hover:none)]:opacity-100">
              {` · ${size}`}
            </span>
          )}
        </span>
        <span
          aria-hidden="true"
          className="group-has-[a:focus-visible]:text-accent motion-safe:transition-[color,translate] motion-safe:duration-200 group-link-hover:translate-y-nudge group-link-hover:text-accent"
        >
          ⤓
        </span>
      </p>
      <p className="font-mono text-meta text-ink-2 max-md:sr-only">
        {description}
      </p>
    </Card>
  );
}
