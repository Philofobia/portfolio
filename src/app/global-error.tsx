"use client";

/**
 * Last-resort error page: replaces the root layout when it throws, so it renders its own
 * <html>, imports the global styles and applies the stored theme itself. The locale is
 * unknown here (it lives in the layout that failed), so the copy is bilingual and not
 * from messages. retry() re-fetches and re-renders the failed tree.
 * Next ships this file with every page, so it imports only the button classes, not
 * Button (whose i18n Link would add next-intl's navigation to every page's JS).
 */
import { useLayoutEffect } from "react";
import { buttonClasses } from "@/components/ui/button/button.styles";
import { applyResolvedTheme } from "@/lib/theme";
import "./globals.css";

export default function GlobalError({ retry }: { retry: () => void }) {
  useLayoutEffect(() => {
    applyResolvedTheme();
  }, []);

  return (
    <html lang="en">
      <body>
        <title>Error — エラー</title>
        <main className="grid-bg">
          <div className="grid-container panel flex flex-col items-start justify-center gap-6">
            <h1 className="text-h1 uppercase">Something went wrong</h1>
            <p lang="ja" className="text-h4">
              エラーが発生しました
            </p>
            <button
              type="button"
              onClick={() => retry()}
              className={buttonClasses({ variant: "secondary", size: "sm" })}
            >
              Try again · 再試行
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
