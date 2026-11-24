/**
 * Experience row (design 14 TimelineItem): period · <h3> role/degree · company/school ·
 * optional bullets (description, result line…).
 * Renders an <li>: place it in an <ol role="list"> (the timeline is ordered; Tailwind's
 * preflight removes list-style and Safari then drops the list semantics).
 * Desktop: a bordered row, period column 3 cells wide │ body (the divider drawn on the row,
 * its full height); bullets with 4px
 * squares. Mobile (Portfolio Mobile 04): a rail list, no row borders: the entry indented
 * 20px, the period (11px mono, uppercase) on top, the title 10px below, bullets as plain
 * lines. The list draws the rail (border-s) and the 28px gap (the Experience section).
 * A 7px square sits on the rail, level with the period: accent for the current entry,
 * ink-3 otherwise. The dates say it in text: the end month, or "now" when it has none.
 * Props: start, end (YYYY-MM, formatted with the named format month: "Jul 2026" /
 * 「2026年7月」; or YYYY, shown as written; both are the <time dateTime>; no end and not
 * current = a single date, an exam), current (accent square; with no end, "now"), title,
 * org, bullets, headingLevel ('h3' default | 'h4' under a group heading).
 */
import { useFormatter, useTranslations } from "next-intl";
import { StatusDot } from "@/components/atoms/StatusDot";
import { cn } from "@/lib/cn";
import { monthDate } from "@/lib/time";

export function TimelineEntry({
  start,
  end,
  current = false,
  title,
  org,
  bullets,
  headingLevel = "h3",
  className,
}: {
  start: string;
  end?: string;
  current?: boolean;
  title: string;
  org: string;
  bullets?: string[];
  headingLevel?: "h3" | "h4";
  className?: string;
}) {
  const t = useTranslations("experience");
  const format = useFormatter();
  const Heading = headingLevel;
  const date = (value: string) => (
    <time dateTime={value}>
      {value.length > 4 ? format.dateTime(monthDate(value), "month") : value}
    </time>
  );

  return (
    <li
      className={cn(
        "relative ps-5 md:grid md:grid-cols-[calc(var(--cell)*3)_minmax(0,1fr)] md:border-b md:border-line md:ps-0",
        // The period column's divider, the row's full height: drawn on the row, as the
        // row may be taller than its grid track (rounded up to whole cells by the caller).
        // A border, not a background: forced colours keep borders and drop backgrounds.
        "md:before:absolute md:before:inset-y-0 md:before:start-[calc(var(--cell)*3-1px)] md:before:border-s md:before:border-line",
        className,
      )}
    >
      <StatusDot
        tone={current ? "active" : "muted"}
        className="absolute -start-1 top-0.5 md:top-[2.0625rem]"
      />
      <p className="font-mono text-meta text-ink-2 max-md:uppercase md:p-6 md:text-ui-xs md:leading-normal">
        {date(start)}
        {end ? <> — {date(end)}</> : current && <> — {t("now")}</>}
      </p>
      <div className="pt-2.5 md:px-8 md:pt-6 md:pb-7">
        <Heading className="text-h4 uppercase">{title}</Heading>
        <p className="mt-1 text-ink-2">{org}</p>
        {bullets && bullets.length > 0 && (
          <ul role="list" className="mt-2.5 grid gap-2 text-ink-2 md:mt-4">
            {bullets.map((bullet) => (
              <li key={bullet} className="relative md:ps-5">
                <StatusDot
                  tone="muted"
                  size={4}
                  className="absolute start-0 top-[0.5625rem] max-md:hidden"
                />
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
