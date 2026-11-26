/**
 * Bottom bar (design 18 Footer · Ruler): © year NAME — カタカナ · <LocaleSwitcher />
 * ('日本語で見る' / 'View in English') · <BackToTop />, and the <ScrollRuler />.
 * Server component. The year is content/profile copyrightYear, never the clock: the page
 * is prerendered and the server must not render the current time. The name is uppercased
 * in CSS (read as a name, not spelt out); the katakana carries lang="ja" on the English page.
 * Layout (Portfolio Desktop / Mobile): desktop one row, 2 cells high, copyright left, links
 * right; mobile the copyright, then the two links spread across the width.
 * On the page it sits in the grid column (.grid-container), over the grid like the design,
 * with no rule or fill of its own.
 * The ruler is not at the page's foot, as the design draws it, but docked to the bottom of
 * the viewport (fixed, a bg strip of 24px), so its needle shows where on the page the
 * reader is from the first screen on (Marco, 2026-11-24). It is shown only where the
 * needle is drawn (scroll-driven animations, motion allowed: motion.css), as a bare
 * scale would say nothing. The footer's own bottom padding (pb-6) is as high as the strip,
 * so the strip covers no text at the end of the page. The ruler starts 1px before the
 * column (-ms-px): the grid's lines sit on each cell's last pixel, so its major ticks fall
 * on them. The strip keeps clear of the home indicator (safe-area-inset-bottom).
 * backToTop: false where the page has no #hero (the 404).
 */
import { useTranslations } from "next-intl";
import { BackToTop } from "@/components/atoms/BackToTop";
import { LocaleSwitcher } from "@/components/atoms/LocaleSwitcher";
import { ScrollRuler } from "@/components/atoms/ScrollRuler";
import { copyrightYear, name, nameKatakana } from "@/content/profile";
import { cn } from "@/lib/cn";

export function Footer({
  backToTop = true,
  className,
}: {
  backToTop?: boolean;
  className?: string;
}) {
  const t = useTranslations("footer");

  return (
    <footer className={cn("grid-container pb-6", className)}>
      <div className="flex flex-col gap-3 pt-10 pb-6 font-mono text-meta leading-[1.4] text-ink-2 md:min-h-cells-2 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-6.5 md:py-6">
        <p>
          {t("copyright", { year: copyrightYear })}{" "}
          <span className="uppercase">{name}</span> —{" "}
          <span lang="ja">{nameKatakana}</span>
        </p>
        <div className="flex flex-wrap justify-between gap-x-6.5 gap-y-3 md:justify-start">
          <LocaleSwitcher frame="text" label={t("switchLocale")} />
          {backToTop && <BackToTop label={t("backToTop")} />}
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-10 hidden bg-bg pt-1.5 pb-[max(--spacing(1.5),env(safe-area-inset-bottom))] motion-safe:supports-[animation-timeline:scroll()]:block">
        <div className="grid-container">
          <ScrollRuler className="-ms-px" />
        </div>
      </div>
    </footer>
  );
}
