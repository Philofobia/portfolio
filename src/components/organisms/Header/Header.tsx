/**
 * Sticky top bar (server shell + client islands).
 * Left: <Logo /> · <ScrollSpyNav /> — Right: <DualClock /> · <LocaleSwitcher /> · <ThemeToggle /> · <MobileMenu /> (burger)
 *
 * Design: full bleed and 56 high on mobile; from md the grid column's width and one cell
 * high. The bar is border-box with its bottom border on the cell's last pixel, like every
 * grid line, so each slot stretches to the bar's height (frame 'bar' for the squares).
 * What shows depends on the bar's own width (a container query, MWG size-aware-styling),
 * because the grid column snaps to an even number of cells: the inline Nav needs 13 cells
 * (975px), so it replaces the burger from a 61rem bar (14 cells); Tokyo's clock needs 15
 * (1125px, shown from 70.3125rem: 16 cells), Torino's 17 (1275px, from 80rem: 18 cells).
 * The widths are the @nav:, @clock: and @clocks: tokens (--container-* in tokens.css).
 * With a classic scrollbar a 1440 window gets 16 cells, so Tokyo only, as in the design
 * library's narrower NavBar.
 * The left group is the scroll-target-group: with the logo's #hero in it, the browser
 * counts the hero as a section, so no nav link is current while the hero is in view
 * (as in the IntersectionObserver fallback). The logo has no current-section style.
 * The design keeps the AvailabilityPill in the hero, not here.
 * The skip link comes first and jumps to <main id="main"> (every page renders one).
 */
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/atoms/LocaleSwitcher";
import { Logo } from "@/components/atoms/Logo";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { DualClock } from "@/components/molecules/DualClock";
import { ScrollSpyNav } from "@/components/molecules/ScrollSpyNav";
import { MobileMenu } from "@/components/organisms/MobileMenu";

export function Header() {
  const t = useTranslations("header");

  return (
    <header className="sticky top-0 z-10">
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:start-2 focus-visible:top-2 focus-visible:z-20 focus-visible:bg-accent focus-visible:px-4 focus-visible:py-3 focus-visible:text-on-accent focus-visible:outline focus-visible:outline-offset-3 focus-visible:outline-ink"
      >
        {t("skipToContent")}
      </a>
      <div className="grid-container @container flex h-14 border-b border-line bg-bg max-md:ms-0 max-md:w-full md:h-cell">
        <div className="flex min-w-0 flex-1 scroll-target-group">
          <Logo className="flex-1 ps-cell-pad @nav:w-logo @nav:flex-none @nav:border-e @nav:border-line" />
          <ScrollSpyNav className="hidden @nav:flex" />
        </div>
        <div className="flex">
          <div className="hidden @clock:flex">
            <DualClock mutedClassName="hidden @clocks:flex" />
          </div>
          <LocaleSwitcher frame="bar" />
          <ThemeToggle frame="bar" />
          <MobileMenu className="@nav:hidden" />
        </div>
      </div>
    </header>
  );
}
