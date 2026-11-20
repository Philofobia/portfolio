/**
 * Experience row (design 14 TimelineItem): period · <h3> role/degree · company/school ·
 * optional bullets (description, result line…).
 * Renders an <li>: place it in an <ol role="list"> (the timeline is ordered; Tailwind's
 * preflight removes list-style and Safari then drops the list semantics).
 * Desktop: a bordered row, period column 3 cells wide (border-e) │ body; bullets with 4px
 * squares. Mobile (Portfolio Mobile 04): a rail list, no row borders: the entry indented
 * 20px, the period (11px mono, uppercase) on top, the title 10px below, bullets as plain
 * lines. The list draws the rail (border-s) and the 28px gap (the Experience section).
 * A 7px square sits on the rail, level with the period: accent for the current entry,
 * ink-3 otherwise; "now" in the period says it in text too.
 * Props: start, end (ISO dates or years for <time dateTime>, shown as written; no end = the
 * current entry), title, org, bullets.
 */
import { useTranslations } from "next-intl";
import { StatusDot } from "@/components/atoms/StatusDot";
import { cn } from "@/lib/cn";

export function TimelineEntry({
  start,
  end,
  title,
  org,
  bullets,
  className,
}: {
  start: string;
  end?: string;
  title: string;
  org: string;
  bullets?: string[];
  className?: string;
}) {
  const t = useTranslations("experience");
  const current = end === undefined;

  return (
    <li
      className={cn(
        "relative ps-5 md:grid md:grid-cols-[calc(var(--cell)*3)_minmax(0,1fr)] md:border-b md:border-line md:ps-0",
        className,
      )}
    >
      <StatusDot
        tone={current ? "active" : "muted"}
        className="absolute -start-1 top-0.5 md:top-[2.0625rem]"
      />
      <p className="font-mono text-meta text-ink-2 max-md:uppercase md:border-e md:border-line md:p-6 md:text-ui-xs md:leading-normal">
        <time dateTime={start}>{start}</time> —{" "}
        {current ? t("now") : <time dateTime={end}>{end}</time>}
      </p>
      <div className="pt-2.5 md:px-8 md:pt-6 md:pb-7">
        <h3 className="text-h4 uppercase">{title}</h3>
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
