/**
 * 08b ThemeToggle, mirroring the design library's section, with the owner's sun/moon in
 * place of the design's ◐. Live: it is the same toggle as the page header's, so clicking
 * either flips the whole storybook. Hover and Tab for the live states; resize past md for 56 → 75.
 */
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Story } from "../_components/Story";

export function ThemeToggleStories() {
  return (
    <Story
      id="theme-toggle"
      index="08b"
      name="ThemeToggle"
      file="layout/ThemeToggle.tsx · ui/button/IconButton.tsx · hooks/useTheme.ts"
    >
      <figure className="flex flex-col gap-3">
        <div className="flex border border-line bg-bg p-4">
          <ThemeToggle />
        </div>
        <figcaption className="font-mono text-meta text-ink-3">
          Icon = current theme: moon on dark, sun on light · label = the action
          · sets html[data-theme], persists to localStorage, first visit
          follows prefers-color-scheme
        </figcaption>
      </figure>
    </Story>
  );
}
