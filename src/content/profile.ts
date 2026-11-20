/**
 * Static, locale-independent profile data: name, katakana name, email, siteUrl,
 * links { github, linkedin, wantedly, findy, lapras }, availableFrom, cv file paths (public/cv/*).
 *
 * Filled in so far: name (the logo; a proper noun, the same in every locale), its katakana
 * reading nameKatakana (the hero marquee shows both in every locale), copyrightYear and
 * siteUrl.
 * copyrightYear is the footer's © year, fixed here and updated by hand: the pages are
 * prerendered, so a year read from the clock would freeze at build time anyway
 * (nextjs-react: no current time rendered on the server).
 * siteUrl is the absolute origin for metadata, sitemap and robots: SITE_URL when set
 * (see .env.example), else the Vercel production domain, else the dev server. No trailing slash.
 */

export const name = "Marco Parisi";
export const nameKatakana = "マルコ・パリージ";
export const copyrightYear = 2026;

export const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  "http://localhost:3000"
).replace(/\/$/, "");
