"use client";

/**
 * Ticking "now" for the clocks, SSR-safe. One instant feeds every clock, so the cities
 * never disagree on the minute; each CityClock formats it for its own zone.
 *
 * The clocks show hours and minutes only, so the store ticks once per minute, on the
 * minute: a timeout aimed at the next boundary, re-aimed after each tick. A timer that
 * fires a little early finds the same minute, changes nothing and re-aims. The snapshot
 * is cached per minute, so every render within a minute sees the same Date.
 *
 * Returns null on the server and during hydration: a statically rendered page would
 * otherwise ship the build's time and mismatch the client's.
 */
import { useSyncExternalStore } from "react";

const MINUTE_MS = 60_000;

let current: Date | null = null;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setTimeout> | undefined;

function schedule() {
  timer = setTimeout(
    () => {
      for (const listener of listeners) listener();
      schedule();
    },
    MINUTE_MS - (Date.now() % MINUTE_MS),
  );
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) schedule();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) clearTimeout(timer);
  };
}

function getSnapshot() {
  const now = Date.now();
  const minute = Math.floor(now / MINUTE_MS);
  if (!current || Math.floor(current.getTime() / MINUTE_MS) !== minute) {
    current = new Date(now);
  }
  return current;
}

const getServerSnapshot = () => null;

export function useClock(): Date | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
