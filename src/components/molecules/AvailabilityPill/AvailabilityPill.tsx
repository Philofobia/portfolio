/**
 * 'Available from [date]' line. The scaffold planned a pill in the header; as built, after the design (Portfolio Desktop / Mobile, design library StatusDot "active"):
 * not a pill and not in the header. The hero's top line: an accent <StatusDot /> and a mono
 * line of text, 12 / 11 m, ink-2. The Header's doc notes the move ("the design keeps the
 * AvailabilityPill in the hero"); the folder keeps the scaffold's name.
 * The words are messages hero.availability ("In Tokyo from …"), the month is content/profile
 * inTokyoFrom, formatted with the named format monthLong for the page's locale
 * ("December 2026", "2026年12月") inside a <time datetime="YYYY-MM">, so the date is text
 * for crawlers and assistants (geo-agent-readiness: availability as text). Server component.
 * Props: from (YYYY-MM), className (placement).
 */
import { useFormatter, useTranslations } from "next-intl";
import { StatusDot } from "@/components/atoms/StatusDot";
import { cn } from "@/lib/cn";
import { monthDate } from "@/lib/time";

export function AvailabilityPill({
  from,
  className,
}: {
  from: string;
  className?: string;
}) {
  const t = useTranslations("hero");
  const format = useFormatter();
  const date = format.dateTime(monthDate(from), "monthLong");

  return (
    <p
      className={cn(
        "flex items-center gap-2.5 font-mono text-meta leading-[1.4] text-ink-2",
        className,
      )}
    >
      <StatusDot />
      <span>
        {t.rich("availability", {
          date,
          time: (chunks) => <time dateTime={from}>{chunks}</time>,
        })}
      </span>
    </p>
  );
}
