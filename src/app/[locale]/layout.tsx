/**
 * ROOT LAYOUT (locale-scoped). Renders <html lang={locale}> + <body>.
 *
 * Server component: translations resolve here, so the markup ships fully
 * populated. Client behaviour (theme, clocks, carousel) belongs in leaves
 * below this file, never here. The one exception is the pre-paint theme
 * script (<ThemeScript />) that sets html[data-theme] before first paint; it is
 * a client component only so a locale switch does not re-render a live <script>.
 */
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono, IBM_Plex_Sans_JP } from "next/font/google";
import { notFound } from "next/navigation";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { routing } from "@/i18n/routing";
import { TechSprite } from "@/lib/tech-icons";
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

const plexJp = IBM_Plex_Sans_JP({
  variable: "--font-plex-jp",
  weight: ["300", "400"],
  display: "swap",
  preload: false,
});

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${geist.variable} ${geistMono.variable} ${plexJp.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <TechSprite />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
