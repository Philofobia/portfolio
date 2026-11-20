/**
 * <Marquee> with 'MARCO PARISI / マルコ・パリージ' repeated.
 *
 * Design 10 Marquee, size lg: the name in Geist 200 caps (34px, 24 on mobile) and its
 * katakana in Plex JP 300, ink-2 (28px, 20 on mobile). Both are the same in every locale
 * (content/profile), so the katakana carries lang="ja" for English pages. 30s per copy.
 */
import { Marquee } from "@/components/atoms/Marquee";
import { name, nameKatakana } from "@/content/profile";

export function HeroMarquee({ className }: { className?: string }) {
  return (
    <Marquee
      className={className}
      items={[
        <span
          key="name"
          className="text-[1.5rem] font-extralight tracking-[0.06em] uppercase md:text-[2.125rem]"
        >
          {name}
        </span>,
        <span
          key="katakana"
          lang="ja"
          className="font-jp text-[1.25rem] leading-none font-light text-ink-2 md:text-[1.75rem]"
        >
          {nameKatakana}
        </span>,
      ]}
    />
  );
}
