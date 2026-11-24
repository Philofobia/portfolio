/**
 * Email row (design 17 ContactBlock): the address, large, beside a 5-cell copy cell (the
 * desktop page's 13 + 5 columns; the component library draws it at 4).
 * The address is a real mailto: link, so it works with no JavaScript and is the fallback
 * when the browser has no Clipboard API; <CopyButton /> copies it and reports 'Copied ✓'
 * for 2s (announced politely), during which the address dims to ink-2.
 * Desktop: one 2-cell-high row (address │ copy cell). Mobile: the address, padded by
 * cell-pad (no fixed height), then a full-width copy button 56 high; a long address breaks
 * anywhere instead of overflowing.
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
        "group grid border border-line bg-bg md:grid-cols-[minmax(0,1fr)_calc(var(--cell)*5)]",
        className,
      )}
    >
      <a
        href={mailto}
        className="flex items-center border-b border-line p-cell-pad text-h3 wrap-anywhere group-has-[[data-state=copied]]:text-ink-2 focus-visible:focus-ring-cell motion-safe:transition-colors md:min-h-cells-2 md:border-e md:border-b-0 md:px-8 md:py-0 md:text-[2.5rem]"
      >
        {email}
      </a>
      <CopyButton
        text={email}
        label={t("copyEmail")}
        copiedLabel={t("copied")}
        failedLabel={t("copyFailed")}
        fallbackHref={mailto}
        className="h-bar border-0 md:h-auto"
      />
    </div>
  );
}
