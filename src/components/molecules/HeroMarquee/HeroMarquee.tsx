/**
 * <Marquee> with 'MARCO PARISI / マルコ・パリージ' repeated.
 *
 * As built: the specialisms from the CV in place of the name (content/hero
 * heroSpecialisms), each as an English / Japanese pair: 'WEB PERFORMANCE / Webパフォーマンス
 * / FRONT END / フロントエンド / …'. The name already heads the page (header logo, title),
 * so the band carries what the hero's headline is about instead.
 *
 * Design 10 Marquee, size lg, the same type pairing the design gave the name: the English
 * term in Geist 200 caps (34px, 24 on mobile), the Japanese in Plex JP 300, ink-2 (28px, 20
 * on mobile). Both are the same in every locale, so each carries its own lang ("en" on
 * the Japanese page, "ja" on the English one: screen readers switch voice, fonts and line
 * breaking follow). One cycle (four pairs) is already wider than any screen, so it is not
 * repeated inside a copy; 40s per copy (about 2370px on desktop) keeps the name band's
 * pace, about 60px/s.
 */
import { Marquee } from "@/components/atoms/Marquee";
import { heroSpecialisms } from "@/content/hero";

export function HeroMarquee({ className }: { className?: string }) {
  return (
    <Marquee
      className={className}
      repeat={1}
      speed={40}
      items={heroSpecialisms.flatMap(({ en, ja }) => [
        <span
          key={en}
          lang="en"
          className="text-[1.5rem] font-extralight tracking-[0.06em] uppercase md:text-[2.125rem]"
        >
          {en}
        </span>,
        <span
          key={ja}
          lang="ja"
          className="font-jp text-[1.25rem] leading-none font-light text-ink-2 md:text-[1.75rem]"
        >
          {ja}
        </span>,
      ])}
    />
  );
}
