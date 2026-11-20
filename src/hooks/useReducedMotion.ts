"use client";

/**
 * prefers-reduced-motion media query as a boolean.
 *
 * null on the server and during hydration (the preference is unknown until the browser
 * answers), so callers start nothing until it is false. Follows the setting live.
 * CSS handles the declarative animations (marquee, reveals) with motion-safe: /
 * @media; this hook is for the JavaScript ones (the hero canvas).
 */
import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const getSnapshot = () => matchMedia(query).matches;
const getServerSnapshot = () => null;

export function useReducedMotion(): boolean | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
