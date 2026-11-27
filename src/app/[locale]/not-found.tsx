/**
 * 404 inside the locale segment, translated via messages.notFound, with a Link back home.
 * Next marks it noindex on its own. The Header comes first (its section anchors only work
 * on the home page), the Footer last, without Back to top (no #hero here).
 * One screen, no scroll: header, message and footer share the viewport's height (a column
 * at least 100svh tall), the message centred in what the header and footer leave. Not a
 * .panel, which is a full screen on its own and pushed the footer below the fold.
 */
import { useTranslations } from "next-intl";
import { Button } from "@/components/atoms/Button";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
        <div className="grid-container flex flex-1 flex-col items-start justify-center gap-6 py-cell">
          <p className="font-mono text-meta text-ink-3">404</p>
          <h1 className="text-h1 uppercase">{t("title")}</h1>
          <p className="max-w-[52ch] text-ink-2">{t("body")}</p>
          <Button variant="primary" href="/" icon="→">
            {t("back")}
          </Button>
        </div>
      </main>
      <Footer backToTop={false} />
    </div>
  );
}
