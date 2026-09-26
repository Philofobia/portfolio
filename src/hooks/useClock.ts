"use client";

/**
 * Ticking "now" for the clocks, SSR-safe. One instant feeds every clock, so the cities
 * never disagree on the minute; each CityClock formats it for its own zone.
 *
 * next-intl's useNow does the ticking. Its interval starts at mount, not on the minute,
 * so a 60s interval would show the old minute for up to 59s after it changed: it ticks
 * every second instead, and React leaves the DOM alone until the formatted text differs.
 *
 * Returns null on the server and during hydration: a statically rendered page would
 * otherwise ship the build's time and mismatch the client's.
 */
import { useNow } from "next-intl";
import { useSyncExternalStore } from "react";

const TICK_MS = 1000;

const subscribe = () => () => {};

export function useClock(): Date | null {
  const now = useNow({ updateInterval: TICK_MS });
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  return hydrated ? now : null;
}
