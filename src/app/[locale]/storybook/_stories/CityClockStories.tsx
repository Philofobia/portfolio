/**
 * 07 CityClock, mirroring the design library's section: the live pair as the header shows
 * it, then fixed instants that pin down the formatting (next-intl "clock" format, h23, per
 * city zone): the design's own 15:41 / 22:41, a just-past-midnight time that must read
 * 00:05 and never 24:05, a winter date when Torino is UTC+1 instead of +2, and the
 * placeholder the server renders before hydration. Switch to /jp for the Japanese labels.
 */
import { useTranslations } from "next-intl";
import { DualClock } from "@/components/layout/DualClock";
import { CityClock } from "@/components/ui/CityClock";
import { clocks } from "@/lib/time";
import { Story, StoryRow, StoryTable } from "../_components/Story";

const instants: { label: string; now: Date | null }[] = [
  { label: "2026-09-26 13:41Z · design", now: new Date("2026-09-26T13:41:00Z") },
  { label: "2026-09-26 22:05Z · midnight", now: new Date("2026-09-26T22:05:00Z") },
  { label: "2026-01-15 11:00Z · winter", now: new Date("2026-01-15T11:00:00Z") },
  { label: "null · server, hydration", now: null },
];

export function CityClockStories() {
  const t = useTranslations("header.clocks");

  return (
    <Story
      id="city-clock"
      index="07"
      name="CityClock"
      file="ui/CityClock.tsx · layout/DualClock.tsx · hooks/useClock.ts"
    >
      <figure className="flex flex-col gap-3">
        <DualClock className="self-start border-y border-e border-line bg-bg" />
        <figcaption className="font-mono text-meta text-ink-3">
          Live · useClock → next-intl useNow, one instant for both · muted ·
          highlight (target city) · hidden &lt; 1024 in the header
        </figcaption>
      </figure>

      <StoryTable
        caption="Fixed instants: format.dateTime(now, 'clock', { timeZone }), 24h in every locale."
        rowHeader="now"
        columns={clocks.map(
          ({ id, timeZone, highlight }) =>
            `${id} · ${timeZone} · ${highlight ? "highlight" : "muted"}`,
        )}
      >
        {instants.map(({ label, now }) => (
          <StoryRow key={label} label={label}>
            {clocks.map(({ id, timeZone, highlight }) => (
              <CityClock
                key={id}
                city={t(id)}
                timeZone={timeZone}
                now={now}
                highlight={highlight}
                className="border border-line"
              />
            ))}
          </StoryRow>
        ))}
      </StoryTable>
    </Story>
  );
}
