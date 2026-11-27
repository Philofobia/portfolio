/**
 * 10 Marquee, mirroring the design library's section: the hero band. Live: Tab to the
 * pause cell; with reduced motion on, the band stands still and the pause cell is gone.
 */
import { HeroMarquee } from "@/components/molecules/HeroMarquee";
import { Story } from "../_components/Story";

export function MarqueeStories() {
  return (
    <Story
      id="marquee"
      index="10"
      name="Marquee"
      file="atoms/Marquee · molecules/HeroMarquee (bilingual specialisms) · styles/motion.css"
    >
      <figure className="flex flex-col gap-3">
        <HeroMarquee className="border-x" />
        <figcaption className="font-mono text-meta text-ink-3">
          56 → 75 tall · 30s per copy (×0.75 below md) · pause cell added for
          WCAG 2.2.2
        </figcaption>
      </figure>
    </Story>
  );
}
