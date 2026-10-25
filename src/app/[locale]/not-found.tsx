/**
 * 404 inside the locale segment, translated via messages.notFound, with a Link back home.
 * Next marks it noindex on its own. The Header comes first (its section anchors only work
 * on the home page); the footer joins once it exists.
 */
import { useTranslations } from "next-intl";
import { Button } from "@/components/atoms/Button";
import { Header } from "@/components/organisms/Header";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="grid-bg">
        <div className="grid-container panel flex flex-col items-start justify-center gap-6">
          <p className="font-mono text-meta text-ink-3">404</p>
          <h1 className="text-h1 uppercase">{t("title")}</h1>
          <p className="max-w-[52ch] text-ink-2">{t("body")}</p>
          <Button variant="primary" href="/" icon="→">
            {t("back")}
          </Button>
        </div>
      </main>
    </>
  );
}
