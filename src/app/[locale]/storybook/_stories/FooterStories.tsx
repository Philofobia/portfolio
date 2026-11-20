/**
 * 18 Footer · Ruler (organisms/Footer, atoms/ScrollRuler, atoms/BackToTop), mirroring the
 * design library's section. Scroll the page: the accent needle tracks the scroll progress
 * (CSS scroll timeline; not drawn under reduced motion or without support).
 * The locale link is live; Back to top goes to #hero, which is on the home page only.
 */
import { Footer } from "@/components/organisms/Footer";
import { Story } from "../_components/Story";

export function FooterStories() {
  return (
    <Story
      id="footer"
      index="18"
      name="Footer · Ruler"
      file="organisms/Footer · atoms/ScrollRuler · atoms/BackToTop"
    >
      <figure className="flex flex-col gap-3">
        <Footer className="border-x border-b" />
        <figcaption className="font-mono text-meta leading-normal text-ink-3">
          Ruler: major tick = 1 cell, minor = cell / 5. Accent needle tracks
          scroll progress (0–100%).
        </figcaption>
      </figure>
    </Story>
  );
}
