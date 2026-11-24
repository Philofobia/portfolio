/**
 * The footer ruler (design 18): a major tick every cell, a minor one every cell / 5, and an
 * accent needle that tracks how far the page has scrolled (0–100%).
 * Decorative and empty: nothing for assistive tech to read, so no aria-hidden (MWG
 * scroll-progress-indicator). Ticks and needle are CSS (grid.css .scroll-ruler,
 * motion.css .scroll-ruler-needle): the needle runs on a scroll(root) timeline
 * (MWG scroll-progress-indicator), so no script; without scroll-driven animations, or under
 * reduced motion, the needle is not drawn. Its travel is a percentage of its own box (as wide
 * as the ruler), so it follows the ruler's width through a window resize with no script.
 * It moved by container units at first, which the compositor kept from the first width.
 */
import { cn } from "@/lib/cn";

export function ScrollRuler({ className }: { className?: string }) {
  return (
    <div className={cn("scroll-ruler", className)}>
      <span className="scroll-ruler-needle" />
    </div>
  );
}
