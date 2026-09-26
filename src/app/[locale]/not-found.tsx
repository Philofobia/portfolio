/**
 * 404 inside the locale segment, translated via messages.notFound, with a Link back home.
 * Next marks it noindex on its own. Header and footer join it once the layout has them.
 */
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button/Button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="grid-bg">
      <div className="grid-container panel flex flex-col items-start justify-center gap-6">
        <p className="font-mono text-meta text-ink-3">404</p>
        <h1 className="text-h1 uppercase">{t("title")}</h1>
        <p className="max-w-[52ch] text-ink-2">{t("body")}</p>
        <Button variant="primary" href="/" icon="→">
          {t("back")}
        </Button>
      </div>
    </main>
  );
}
