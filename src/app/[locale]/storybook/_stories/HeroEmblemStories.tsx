/**
 * 11 HeroEmblem: the design's dotted Tokyo Tower, redrawn as a halftone with a
 * complementary sky, at its desktop size (six cells). Live states: hover or drag for the
 * lens (dots part inside the ring), toggle reduced motion for the still poster, switch the
 * theme.
 */
import { HeroEmblem } from "@/components/molecules/HeroEmblem";
import { Story } from "../_components/Story";

export function HeroEmblemStories() {
  return (
    <Story
      id="hero-emblem"
      index="11"
      name="HeroEmblem"
      file="molecules/HeroEmblem · atoms/DotMatrix · dynamic(), ssr:false"
    >
      <figure className="flex flex-col gap-3">
        <HeroEmblem className="w-full md:w-cells-6" />
        <figcaption className="font-mono text-meta text-ink-3">
          96-column hex lattice · tower dots in --ink by brightness · sky dots
          at 15% (= --line), smaller next to the tower · base fades out · poster
          = SVG &lt;img&gt;, the LCP (no-JS, reduced motion) · canvas wipes in
          over it · drift for 5s · dots part within one cell around the pointer
        </figcaption>
      </figure>
    </Story>
  );
}
