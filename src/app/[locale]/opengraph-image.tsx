/**
 * Open Graph image, one per locale (1200×630 PNG, generated at build time): the preview
 * LinkedIn, Slack and messaging apps show for a shared link (nextjs-react seo-geo.md).
 * Next adds og:image, its size, type and alt to each page's <head>; buildMetadata sets the
 * Twitter card to summary_large_image so X shows it large too.
 *
 * The dark theme on the site's 75px cell grid, with the hero's facts and nothing else:
 * the name (and its katakana on /jp), the h1's job title on its two lines, the subtitle
 * and the availability line, all read from content/profile and the hero messages, so the
 * card says what the page says (geo-agent-readiness rule 5). No client name, no photo.
 *
 * Fonts: next/og draws text with satori, which reads TTF/OTF/WOFF but not the site's
 * WOFF2. Latin text uses next/og's default font, Geist (the site's sans). Satori set
 * some of its word spaces too wide ("In Tokyo  from"); with no-break spaces the words
 * are shaped as one run and the spacing is even, so the one-line texts use them (oneLine).
 * Japanese uses the TrueType subset of IBM Plex Sans JP that
 * scripts/jp-font.mjs writes (og subset: every character of the Japanese page), read
 * from disk at build time, never sent to a browser, and loaded only for the Japanese
 * image. One weight only, so the title is regular, not the site's light.
 * alt is per locale (generateImageMetadata), as the page's language.
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hasLocale, type Locale } from "next-intl";
import { getFormatter, getTranslations } from "next-intl/server";
import { inTokyoFrom, name, nameKatakana } from "@/content/profile";
import { routing } from "@/i18n/routing";
import { monthDate } from "@/lib/time";

const size = { width: 1200, height: 630 };
const cell = 75;

// The dark theme's tokens (src/styles/tokens.css).
const color = {
  bg: "#1b1b1c",
  ink: "#ececee",
  ink2: "#a3a3ab",
  line: "rgba(255, 255, 255, 0.08)",
  lineStrong: "rgba(255, 255, 255, 0.15)",
  accent: "#8a97ff",
};

/** A one-line text with no-break spaces, so satori spaces its words evenly. */
const oneLine = (text: string) => text.replace(/ /g, "\u00a0");

function toLocale(value: string): Locale {
  return hasLocale(routing.locales, value) ? value : routing.defaultLocale;
}

/** The hero's facts in this locale, as plain text. */
async function heroText(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "hero" });
  const format = await getFormatter({ locale });
  const date = format.dateTime(monthDate(inTokyoFrom), "monthLong");
  return {
    // The h1 and subtitle break with <br></br> in the messages: one line per part.
    title: (t.raw("title") as string)
      .split("<br></br>")
      .map((line) => line.trim()),
    subtitle: t.markup("subtitle", { br: () => "" }),
    jobTitle: t.markup("title", { br: () => "" }),
    availability: t.markup("availability", {
      date,
      time: (chunks) => chunks,
    }),
  };
}

export async function generateImageMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const locale = toLocale(params.locale);
  const { jobTitle, availability } = await heroText(locale);
  const alt =
    locale === "ja"
      ? `${nameKatakana}、${jobTitle}。${availability}。`
      : `${name}, ${jobTitle}. ${availability}.`;
  return [{ id: "card", alt, size, contentType: "image/png" }];
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale((await params).locale);
  const { title, subtitle, availability } = await heroText(locale);
  // The Japanese image needs a font list (for Plex), and a font list replaces next/og's
  // default Geist: Geist is passed again from next/og's own copy, or satori would fetch a
  // fallback for the Latin text over the network at build time.
  const fonts =
    locale === "ja"
      ? [
          {
            name: "Geist",
            data: await readFile(
              join(
                process.cwd(),
                "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf",
              ),
            ),
          },
          {
            name: "IBM Plex Sans JP",
            data: await readFile(
              join(process.cwd(), "src/fonts/ibm-plex-sans-jp-og-400.ttf"),
            ),
          },
        ].map((font) => ({
          ...font,
          weight: 400 as const,
          style: "normal" as const,
        }))
      : undefined;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: `${cell}px ${cell}px ${cell * 0.8}px`,
        background: color.bg,
        // The site's cell grid: one vertical and one horizontal line every 75px.
        backgroundImage: `linear-gradient(to right, ${color.line} 1px, transparent 1px), linear-gradient(to bottom, ${color.line} 1px, transparent 1px)`,
        backgroundSize: `${cell}px ${cell}px`,
        color: color.ink,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          fontSize: 28,
          letterSpacing: "0.08em",
        }}
      >
        <span>{oneLine(name.toUpperCase())}</span>
        {locale === "ja" && (
          <span style={{ color: color.ink2, letterSpacing: "0.02em" }}>
            {nameKatakana}
          </span>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 26,
            color: color.ink2,
          }}
        >
          <div style={{ width: 12, height: 12, background: color.accent }} />
          {oneLine(availability)}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: locale === "ja" ? 96 : 112,
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          {title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            paddingTop: 24,
            borderTop: `2px solid ${color.accent}`,
            fontSize: 34,
            color: color.ink2,
            textTransform: "uppercase",
          }}
        >
          {oneLine(subtitle)}
        </div>
      </div>
    </div>,
    {
      ...size,
      ...(fonts && { fonts }),
    },
  );
}
