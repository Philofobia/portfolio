"use client";

/**
 * TORINO hh:mm · TOKYO hh:mm using useClock; renders two <CityClock />, Tokyo highlighted.
 * One ticking instant for both, so they turn the minute together. Each clock opens with
 * a rule on its start side, like the header cells beside it. Both clocks stretch to this
 * component's height. mutedClassName goes on the muted clock only (Torino): the Header
 * uses it to drop that clock first when the bar is short of room, keeping the target city
 * (the design library's narrower NavBar shows Tokyo alone).
 */
import { useTranslations } from "next-intl";
import { CityClock } from "@/components/molecules/CityClock";
import { useClock } from "@/hooks/useClock";
import { cn } from "@/lib/cn";
import { clocks } from "@/lib/time";

export function DualClock({
  className,
  mutedClassName,
}: {
  className?: string;
  mutedClassName?: string;
}) {
  const t = useTranslations("header.clocks");
  const now = useClock();

  return (
    <div className={cn("flex", className)}>
      {clocks.map(({ id, timeZone, highlight }) => (
        <CityClock
          key={id}
          city={t(id)}
          timeZone={timeZone}
          now={now}
          highlight={highlight}
          className={cn("border-s border-line", !highlight && mutedClassName)}
        />
      ))}
    </div>
  );
}
