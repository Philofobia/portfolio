/**
 * Bottom bar (design 18 Footer · Ruler): © year NAME — カタカナ · <LocaleSwitcher />
 * ('日本語で見る' / 'View in English') · <BackToTop />, then the <ScrollRuler />.
 * Server component. The year is content/profile copyrightYear, never the clock: the page
 * is prerendered and the server must not render the current time. The name is uppercased
 * in CSS (read as a name, not spelt out); the katakana carries lang="ja" on the English page.
 * Layout (Portfolio Desktop / Mobile): desktop one row, 2 cells high, copyright left, links
 * right; mobile the copyright, then the two links spread across the width.
 */
import { useTranslations } from "next-intl";
import { BackToTop } from "@/components/atoms/BackToTop";
import { LocaleSwitcher } from "@/components/atoms/LocaleSwitcher";
import { ScrollRuler } from "@/components/atoms/ScrollRuler";
import { copyrightYear, name, nameKatakana } from "@/content/profile";
import { cn } from "@/lib/cn";

export function Footer({ className }: { className?: string }) {
  const t = useTranslations("footer");

  return (
    <footer className={cn("border-t border-line bg-bg px-6 pb-6", className)}>
      <div className="flex flex-col gap-3 pt-10 pb-6 font-mono text-meta leading-[1.4] text-ink-2 md:min-h-cells-2 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-6.5 md:py-6">
        <p>
          {t("copyright", { year: copyrightYear })}{" "}
          <span className="uppercase">{name}</span> —{" "}
          <span lang="ja">{nameKatakana}</span>
        </p>
        <div className="flex flex-wrap justify-between gap-x-6.5 gap-y-3 md:justify-start">
          <LocaleSwitcher frame="text" label={t("switchLocale")} />
          <BackToTop label={t("backToTop")} />
        </div>
      </div>
      <ScrollRuler />
    </footer>
  );
}
