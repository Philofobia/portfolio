import type { Timezone } from "next-intl";

export const clocks = [
  { id: "torino", timeZone: "Europe/Rome", highlight: false },
  { id: "tokyo", timeZone: "Asia/Tokyo", highlight: true },
] as const satisfies readonly {
  id: string;
  timeZone: Timezone;
  highlight: boolean;
}[];

export type ClockId = (typeof clocks)[number]["id"];

const partsFormatters = new Map<string, Intl.DateTimeFormat>();

function wallClock(date: Date, timeZone: Timezone) {
  let formatter = partsFormatters.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en", {
      timeZone,
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    });
    partsFormatters.set(timeZone, formatter);
  }

  const parts = formatter.formatToParts(date);
  const read = (type: "hour" | "minute") =>
    Number(parts.find((part) => part.type === type)?.value);

  return { hours: read("hour"), minutes: read("minute") };
}

export function zonedTime(date: Date, timeZone: Timezone) {
  const { hours, minutes } = wallClock(date, timeZone);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}`;
}

export function hourHandAngle(date: Date, timeZone: Timezone) {
  const { hours, minutes } = wallClock(date, timeZone);
  return (hours % 12) * 30 + minutes * 0.5;
}
