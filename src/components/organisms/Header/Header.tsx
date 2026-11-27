/**
 * Sticky top bar (server shell + client islands).
 * Left: <Logo /> · <ScrollSpyNav /> — Right: <DualClock /> · <LocaleSwitcher /> · <ThemeToggle /> · <MobileMenu /> (burger)
 *
 * The <header> is the bar: full bleed at every width (over the design, which narrows it to
 * the grid column from md: the page then scrolled past beside it), 56 high on mobile and
 * one cell from md, one background and one bottom border edge to edge. Its contents use the
 * width too (full on mobile; from md .grid-wide: the grid column grown by as many whole
 * cells as fit on each side, so every divider still falls on a background line and only a
 * strip under one cell stays empty at each edge). From wider windows the logo and the
 * controls thus sit a cell or more outside the sections' column, framing the page; the
 * extra room pays for the fifth link (Japan). The header is border-box with its bottom
 * border on the cell's last pixel, like
 * every grid line, so each slot stretches to the height above it (frame 'bar' for the
 * squares; their focus ring sits inside the cell, focus-ring-cell).
 * What shows depends on the bar's own width (a container query, MWG size-aware-styling),
 * because the bar snaps to an even number of cells: the inline Nav needs 15 cells
 * (1125px), so it replaces the burger from a 75rem bar (16 cells); Tokyo's clock needs 17
 * (1275px, shown from 84.375rem: 18 cells), Torino's 19 (1425px, from 93.75rem: 20 cells).
 * The widths are the @nav:, @clock: and @clocks: tokens (--container-* in tokens.css).
 * With a classic scrollbar a 1440 window gets 18 cells: nav and Tokyo's clock.
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
    <header className="sticky top-0 z-10 h-bar border-b border-line bg-bg md:h-cell">
      <a
        href="#main"
        className="sr-only focus-ring-ink focus-visible:not-sr-only focus-visible:absolute focus-visible:start-2 focus-visible:top-2 focus-visible:z-20 focus-visible:bg-accent focus-visible:px-4 focus-visible:py-3 focus-visible:text-on-accent focus-visible:focus-ring"
      >
        {t("skipToContent")}
      </a>
      <div className="grid-wide @container flex h-full max-md:ms-0 max-md:w-full">
        <div className="flex min-w-0 flex-1 scroll-target-group">
          <Logo className="flex-1 ps-cell-pad @nav:w-logo @nav:flex-none @nav:border-e @nav:border-line" />
          <ScrollSpyNav className="hidden @nav:flex" />
        </div>
        <div className="flex">
          <div className="hidden @clock:flex">
            <DualClock mutedClassName="hidden @clocks:flex" />
          </div>
          <LocaleSwitcher frame="bar" />
          <ThemeToggle />
          <MobileMenu className="@nav:hidden" />
        </div>
      </div>
    </header>
  );
}
