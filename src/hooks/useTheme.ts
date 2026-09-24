"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import {
  DEFAULT_THEME,
  SYSTEM_LIGHT_QUERY,
  applyResolvedTheme,
  getStoredTheme,
  readTheme,
  writeTheme,
  type Theme,
} from "@/lib/theme";

export type { Theme };

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributeFilter: ["data-theme"],
  });

  const media = matchMedia(SYSTEM_LIGHT_QUERY);
  const onSystemChange = () => {
    if (!getStoredTheme()) applyResolvedTheme();
  };
  media.addEventListener("change", onSystemChange);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", onSystemChange);
  };
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => DEFAULT_THEME);

  useLayoutEffect(() => {
    applyResolvedTheme();
  }, []);

  function toggle() {
    writeTheme(readTheme() === "dark" ? "light" : "dark");
  }

  return { theme, toggle };
}
