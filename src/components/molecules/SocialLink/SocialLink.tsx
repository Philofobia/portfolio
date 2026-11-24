/**
 * One profile cell of the Contact section's link row (Portfolio Desktop / Mobile): the
 * platform name and a '↗', the whole cell a link (<ExternalLink />).
 * The cell is as high as the parent row (one cell, the row's bottom line included).
 * Mobile: the cells share the row equally (the parent gives each a flex-1 item), name and
 * arrow centred together, 13px. From md: three cells wide (225), name at the start and the arrow ink-3 at the end, 15px, 20px in from the
 * lines (the design's padding, under the 24px cell-pad).
 * Hover fills the cell bg-hover on real pointers; the focus ring sits inside the cell,
 * 4px from the lines (focus-ring-cell), as on every control flush in a cell.
 * Server component. Props: name (a proper noun, the same in every locale), href, className
 * (placement; borders come from the parent row).
 */
import { ExternalLink } from "@/components/atoms/ExternalLink";
import { cn } from "@/lib/cn";

export function SocialLink({
  name,
  href,
  className,
}: {
  name: string;
  href: `https://${string}`;
  className?: string;
}) {
  return (
    <ExternalLink
      href={href}
      className={cn(
        "flex h-full items-center justify-center gap-[0.35em] px-5 text-ui-xs hover:bg-bg-hover focus-visible:focus-ring-cell motion-safe:transition-colors motion-safe:duration-200 md:w-cells-3 md:justify-between md:text-ui",
        className,
      )}
      iconClassName="md:text-ink-3 md:group-hover:text-ink"
    >
      {name}
    </ExternalLink>
  );
}
