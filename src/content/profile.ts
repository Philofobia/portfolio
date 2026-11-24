/**
 * Static, locale-independent profile data: name, katakana name, email, siteUrl,
 * links { github, linkedin, wantedly, findy, lapras }, inTokyoFrom, cv file paths (public/cv/*).
 *
 * Filled in so far: name (the logo; a proper noun, the same in every locale), its katakana
 * reading nameKatakana (the footer shows both in every locale), copyrightYear,
 * inTokyoFrom, cv and siteUrl.
 * inTokyoFrom is the month of the move to Tokyo (YYYY-MM, also its <time datetime>), named
 * by the hero's status line and the Japan section's "In Tokyo from" cell. The words around
 * it are in messages (hero.availability, japan.facts.inTokyo); the month is formatted per
 * locale with Intl.
 * cv maps each CV to its PDF in public/cv/, the file name it downloads as and the
 * language of the document (the link's hreflang): the English CV (en), and the Japanese
 * 履歴書 and 職務経歴書, built from docs/cv/, alone and joined into one PDF (oubo, the
 * 応募書類 set, 履歴書 first). heroCv picks the one the hero's button links per page
 * locale: the English CV on /en, the 応募書類 on /jp (Japanese employers expect the two
 * together; the single files are for the Documents section).
 * copyrightYear is the footer's © year, fixed here and updated by hand: the pages are
 * prerendered, so a year read from the clock would freeze at build time anyway
 * (nextjs-react: no current time rendered on the server).
 * siteUrl is the absolute origin for metadata, sitemap and robots: SITE_URL when set
 * (see .env.example), else the Vercel production domain, else the dev server. No trailing slash.
 */

import type { Locale } from "next-intl";

export const name = "Marco Parisi";
export const nameKatakana = "マルコ・パリージ";
export const copyrightYear = 2026;

export const inTokyoFrom = "2026-12";

export const cv = {
  en: {
    href: "/cv/En_Parisi_Marco.pdf",
    fileName: "Marco-Parisi-CV.pdf",
    lang: "en",
  },
  rirekisho: {
    href: "/cv/rirekisho.pdf",
    fileName: "Marco-Parisi-Rirekisho.pdf",
    lang: "ja",
  },
  shokumukeirekisho: {
    href: "/cv/shokumukeirekisho.pdf",
    fileName: "Marco-Parisi-Shokumukeirekisho.pdf",
    lang: "ja",
  },
  oubo: {
    href: "/cv/rirekisho-shokumukeirekisho.pdf",
    fileName: "Marco-Parisi-Rirekisho-Shokumukeirekisho.pdf",
    lang: "ja",
  },
} as const;

export const heroCv = {
  en: "en",
  ja: "oubo",
} as const satisfies Record<Locale, keyof typeof cv>;

export const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  "http://localhost:3000"
).replace(/\/$/, "");
