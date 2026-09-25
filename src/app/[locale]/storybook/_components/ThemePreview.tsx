"use client";

/**
 * Dev-only stand-in for 08b ThemeToggle: flips html[data-theme] so every story can be
 * checked in both themes. Persists like the real toggle will, so the pre-paint theme
 * script keeps the choice on reload. Replace with <ThemeToggle /> once it exists.
 */
import { Button } from "@/components/ui/button/Button";
import { THEME_STORAGE_KEY } from "@/lib/theme";

export function ThemePreview() {
  function toggleTheme() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
  }

  return (
    <Button size="sm" onClick={toggleTheme}>
      Switch theme
    </Button>
  );
}
