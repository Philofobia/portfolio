/**
 * ROOT LAYOUT (locale-scoped). Renders <html lang={locale}> + <body>.
 *
 * Server component: translations resolve here, so the markup ships fully
 * populated. Client behaviour (theme, clocks, carousel) belongs in leaves
 * below this file, never here. The one exception is the pre-paint theme
 * script (<ThemeScript />) that sets html[data-theme] before first paint; it is
 * a client component only so a locale switch does not re-render a live <script>.
 *
 * Only the message namespaces client components read are sent to the browser
 * (clientMessages); server components translate from the full catalog.
 * Metadata (title, description, canonical, hreflang) comes from lib/metadata.
 * Each site page (home, 404) renders the Header itself, above its <main id="main"> (the
 * skip link's target); the storybook renders none. <body> carries the cell grid (.grid-bg),
 * so its lines run behind the header row as well as the page.
 */
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { ThemeScript } from "@/components/atoms/ThemeScript";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/metadata";
import "../globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

// IBM Plex Sans JP in two subsets (scripts/jp-font.mjs): the few characters every locale
// may show (shared) and the Japanese page's complete set. The English page's stacks list
// shared first and this complete face second with a unicode-range over the Japanese
// blocks: every character it shows is in the shared file, so it never downloads the large
// one. The Japanese page's stacks leave shared out (tokens.css, :root:lang(ja)), so it
// downloads one file per weight. Neither is preloaded: no Japanese is in the first paint's
// critical path.
const plexJpShared = localFont({
  src: [
    { path: "../../fonts/ibm-plex-sans-jp-shared-300.woff2", weight: "300" },
    { path: "../../fonts/ibm-plex-sans-jp-shared-400.woff2", weight: "400" },
  ],
  variable: "--font-plex-jp-shared",
  display: "swap",
  preload: false,
  // No Arial stand-in: it would sit between the two Plex faces in the stack.
  adjustFontFallback: false,
});

const plexJp = localFont({
  src: [
    { path: "../../fonts/ibm-plex-sans-jp-300.woff2", weight: "300" },
    { path: "../../fonts/ibm-plex-sans-jp-400.woff2", weight: "400" },
  ],
  variable: "--font-plex-jp",
  display: "swap",
  preload: false,
  declarations: [
    {
      prop: "unicode-range",
      value: "U+3000-30FF, U+31F0-31FF, U+3400-4DBF, U+4E00-9FFF, U+FF00-FFEF",
    },
  ],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return buildMetadata(locale);
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages();
  // Namespaces used by client components: header (LocaleSwitcher, ThemeToggle, DualClock,
  // ScrollSpyNav, MobileMenu) and marquee (Marquee's pause button).
  // Add one here when a new client component calls useTranslations.
  const clientMessages = { header: messages.header, marquee: messages.marquee };

  return (
    <html
      lang={locale}
      // base.css scrolls smoothly (motion-safe); this makes Next jump instantly on route changes.
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${geistMono.variable} ${plexJpShared.variable} ${plexJp.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="grid-bg">
        <NextIntlClientProvider messages={clientMessages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
