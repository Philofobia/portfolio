"use client";

/**
 * TORINO hh:mm · TOKYO hh:mm using useClock; renders two <CityClock />, Tokyo highlighted.
 * One ticking instant for both, so they turn the minute together. Each clock opens with
 * a rule on its start side, like the header cells beside it. The Header hides the pair
 * below 1024 (design); this component does not.
 */
import { useTranslations } from "next-intl";
import { CityClock } from "@/components/ui/CityClock";
import { useClock } from "@/hooks/useClock";
import { cn } from "@/lib/cn";
import { clocks } from "@/lib/time";

export function DualClock({ className }: { className?: string }) {
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
          className="border-s border-line"
        />
      ))}
    </div>
  );
}
