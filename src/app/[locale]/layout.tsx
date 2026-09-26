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
 */
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { ThemeScript } from "@/components/layout/ThemeScript";
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

const plexJp = localFont({
  src: [
    { path: "../../fonts/ibm-plex-sans-jp-300.woff2", weight: "300" },
    { path: "../../fonts/ibm-plex-sans-jp-400.woff2", weight: "400" },
  ],
  variable: "--font-plex-jp",
  display: "swap",
  preload: false,
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
  // Namespaces used by client components (LocaleSwitcher, ThemeToggle, DualClock).
  // Add one here when a new client component calls useTranslations.
  const clientMessages = { header: messages.header };

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
        <NextIntlClientProvider messages={clientMessages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
