/**
 * STORYBOOK (dev only) — every ui component in each of its variants and states, laid out
 * like the design's Component Library. 404 in production builds and kept out of search
 * indexes. One file per component in _stories/, rendered here in build order.
 * Stories are specimens: components in fixed states, not the live site (no site header).
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { ButtonStories } from "./_stories/ButtonStories";
import { CellStories } from "./_stories/CellStories";
import { CityClockStories } from "./_stories/CityClockStories";
import { ContactBlockStories } from "./_stories/ContactBlockStories";
import { DocCardStories } from "./_stories/DocCardStories";
import { FactCellStories } from "./_stories/FactCellStories";
import { FooterStories } from "./_stories/FooterStories";
import { GridBackgroundStories } from "./_stories/GridBackgroundStories";
import { HeroEmblemStories } from "./_stories/HeroEmblemStories";
import { LocaleSwitcherStories } from "./_stories/LocaleSwitcherStories";
import { MarqueeStories } from "./_stories/MarqueeStories";
import { NavBarStories } from "./_stories/NavBarStories";
import { ProjectCardStories } from "./_stories/ProjectCardStories";
import { SectionHeaderStories } from "./_stories/SectionHeaderStories";
import { StackCellStories } from "./_stories/StackCellStories";
import { StatusDotStories } from "./_stories/StatusDotStories";
import { TechTagStories } from "./_stories/TechTagStories";
import { ThemeToggleStories } from "./_stories/ThemeToggleStories";
import { TimelineItemStories } from "./_stories/TimelineItemStories";

export const metadata: Metadata = {
  title: "Storybook",
  robots: { index: false, follow: false },
};

export default function StorybookPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className="grid-bg">
      <div className="grid-container flex flex-col gap-section py-section">
        <header className="flex flex-wrap items-end justify-between gap-6 bg-bg">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-meta text-ink-3">Component library</p>
            <h1 className="text-h1 uppercase">Storybook</h1>
          </div>
          <ThemeToggle />
        </header>

        <GridBackgroundStories />
        <CellStories />
        <SectionHeaderStories />
        <ButtonStories />
        <TechTagStories />
        <StatusDotStories />
        <CityClockStories />
        <LocaleSwitcherStories />
        <ThemeToggleStories />
        <NavBarStories />
        <MarqueeStories />
        <HeroEmblemStories />
        <ProjectCardStories />
        <StackCellStories />
        <TimelineItemStories />
        <FactCellStories />
        <DocCardStories />
        <ContactBlockStories />
        <FooterStories />
      </div>
    </main>
  );
}
