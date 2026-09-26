/**
 * Static, locale-independent profile data: name, katakana name, email, siteUrl,
 * links { github, linkedin, wantedly, findy, lapras }, availableFrom, cv file paths (public/cv/*).
 *
 * Only siteUrl is filled in so far. It is the absolute origin for metadata, sitemap and
 * robots: SITE_URL when set (see .env.example), else the Vercel production domain, else
 * the dev server. No trailing slash.
 */

export const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  "http://localhost:3000"
).replace(/\/$/, "");
