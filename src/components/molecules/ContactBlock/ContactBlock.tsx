/**
 * Email row (design 17 ContactBlock): the address, large, beside a 5-cell copy cell (the
 * desktop page's 13 + 5 columns; the component library draws it at 4).
 * The address is a real mailto: link, so it works with no JavaScript and is the fallback
 * when the browser has no Clipboard API; <CopyButton /> copies it and reports 'Copied ✓'
 * for 2s (announced politely), during which the address dims to ink-2.
 * Split (@contact-split:, a grid column of 14 cells or more; needs an @container ancestor,
 * the Contact section's column): one 2-cell-high row (address at 40px │ copy cell).
 * Below it, stacked: the address (h3), padded by cell-pad on mobile and one cell high from
 * md, then a full-width copy button, 56 high on mobile and one cell from md, so the block
 * stays on the grid's rows. A long address breaks anywhere instead of overflowing.
 * Edges as the cell grid draws them (.cells): top and left 1px outside the box (a shadow),
 * on the grid's lines; right and bottom as borders on the box's last pixel. The address
 * carries the bottom line inside its own height (a two-cell row is 150 high, not 152), and
 * the copy cell's fill is its own edge.
 * Props: email. Labels from messages (contact.copyEmail, copied, copyFailed).
 */
import { useTranslations } from "next-intl";
import { CopyButton } from "@/components/atoms/CopyButton";
import { cn } from "@/lib/cn";

export function ContactBlock({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  const t = useTranslations("contact");
  const mailto = `mailto:${email}`;

  return (
    <div
      className={cn(
        "group grid border-e border-line bg-bg shadow-[-1px_-1px_0_var(--line)] @contact-split:grid-cols-[minmax(0,1fr)_calc(var(--cell)*5)]",
        className,
      )}
    >
      <a
        href={mailto}
        className="flex items-center border-b border-line p-cell-pad text-h3 wrap-anywhere group-has-[[data-state=copied]]:text-ink-2 focus-visible:focus-ring-cell motion-safe:transition-colors md:min-h-cell md:px-8 md:py-0 @contact-split:min-h-cells-2 @contact-split:border-e @contact-split:text-[2.5rem]"
      >
        {email}
      </a>
      <CopyButton
        text={email}
        label={t("copyEmail")}
        copiedLabel={t("copied")}
        failedLabel={t("copyFailed")}
        fallbackHref={mailto}
        className="h-bar border-0 md:h-cell @contact-split:h-auto"
      />
    </div>
  );
}
