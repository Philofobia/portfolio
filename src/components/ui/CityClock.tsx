/**
 * Single city clock: dial + city label + HH:MM. Presentational; DualClock feeds the time.
 * The time is next-intl's named "clock" format (24h in every locale) in the city's zone;
 * the dial carries an hour hand. Not a client component itself, so it also renders on the
 * server with a fixed instant (the storybook does).
 * now = null (server, hydration): the label stays, the time shows a placeholder and the
 * hand is hidden, so the static HTML never claims a time it cannot know.
 * highlight: the target city (accent dial and hand, full ink); muted otherwise.
 * Circles are reserved for the clocks and the hero emblem.
 */
import { useFormatter, type Timezone } from "next-intl";
import { cn } from "@/lib/cn";
import { hourHandAngle, zonedTime } from "@/lib/time";

export function CityClock({
  city,
  timeZone,
  now,
  highlight = false,
  className,
}: {
  city: string;
  timeZone: Timezone;
  now: Date | null;
  highlight?: boolean;
  className?: string;
}) {
  const format = useFormatter();

  return (
    <p
      className={cn(
        "flex h-(--cell) w-37.5 shrink-0 items-center justify-center gap-2.5",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative size-6 shrink-0 rounded-full border",
          highlight ? "border-accent" : "border-line-strong",
        )}
      >
        {now && (
          <span
            className={cn(
              "absolute top-1/2 left-1/2 h-2 w-px origin-bottom -translate-x-1/2 -translate-y-full forced-color-adjust-none forced-colors:bg-[CanvasText]",
              highlight ? "bg-accent" : "bg-ink",
            )}
            style={{ rotate: `${hourHandAngle(now, timeZone)}deg` }}
          />
        )}
      </span>
      <span
        className={cn(
          "flex flex-col font-mono text-[0.6875rem]/[1.25] tabular-nums",
          highlight ? "text-ink" : "text-ink-2",
        )}
      >
        <span className="uppercase">{city}</span>
        {now ? (
          <time dateTime={zonedTime(now, timeZone)}>
            {format.dateTime(now, "clock", { timeZone })}
          </time>
        ) : (
          <span aria-hidden="true">--:--</span>
        )}
      </span>
    </p>
  );
}
