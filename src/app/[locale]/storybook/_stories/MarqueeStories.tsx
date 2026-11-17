/**
 * 10 Marquee, mirroring the design library's section: the hero band (size lg) and a
 * generic sm band with '·' separators running the other way. Live: Tab to the pause cell;
 * with reduced motion on, the bands stand still and the pause cell is gone.
 */
import { Marquee } from "@/components/atoms/Marquee";
import { HeroMarquee } from "@/components/molecules/HeroMarquee";
import { Story } from "../_components/Story";

export function MarqueeStories() {
  return (
    <Story
      id="marquee"
      index="10"
      name="Marquee"
      file="atoms/Marquee · molecules/HeroMarquee · styles/motion.css"
    >
      <figure className="flex flex-col gap-3">
        <HeroMarquee className="border-x" />
        <figcaption className="font-mono text-meta text-ink-3">
          size=lg · 56 → 75 tall · 30s per copy (×0.75 below md) · pause cell
          added for WCAG 2.2.2
        </figcaption>
      </figure>
      <figure className="flex flex-col gap-3">
        <Marquee
          size="sm"
          separator="·"
          direction="right"
          speed={40}
          repeat={2}
          className="border-x"
          items={["Frontend", "Backend", "Data", "Infrastructure"].map(
            (group) => (
              <span key={group} className="text-h4 uppercase">
                {group}
              </span>
            ),
          )}
        />
        <figcaption className="font-mono text-meta text-ink-3">
          size=sm · separator=· · direction=right · speed=40
        </figcaption>
      </figure>
    </Story>
  );
}
