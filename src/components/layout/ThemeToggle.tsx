"use client";

/**
 * 'use client' — sun/moon icon button toggling dark/light via useTheme.
 * Replaces the design's ◐ (08b) at the owner's request: the icon shows the current theme,
 * moon on dark and sun on light; the label names the action ("Switch to light theme").
 * Both icons are in the markup and html[data-theme] picks one in CSS, so the right icon
 * paints before hydration; only the label waits for useTheme.
 */
import { useTranslations } from "next-intl";
import { IconButton } from "@/components/ui/button/IconButton";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations("header.themeToggle");
  const { theme, toggle } = useTheme();

  return (
    <IconButton
      label={t(theme === "dark" ? "toLight" : "toDark")}
      onClick={toggle}
      className={className}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="size-4 fill-none stroke-current stroke-[1.5] in-data-[theme=light]:hidden"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="hidden size-4 fill-none stroke-current stroke-[1.5] in-data-[theme=light]:block"
      >
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.58 4.58l2.12 2.12M17.3 17.3l2.12 2.12M4.58 19.42l2.12-2.12M17.3 6.7l2.12-2.12" />
      </svg>
    </IconButton>
  );
}
