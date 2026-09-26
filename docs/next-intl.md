# next-intl in this repo

Versions: `next` 16.3.6, `next-intl` ^4.14.5, React 19.3. Locales `en` (default) and `ja`. Every route has a prefix (`/en`, `/jp`).

## How it fits together

1. **Request** → `src/proxy.ts` runs `createMiddleware(routing)`. It redirects `/` to `/en` or `/jp` based on `Accept-Language` and makes sure every path has a prefix. Next 16 calls this file `proxy.ts`. It used to be `middleware.ts`.
2. **Routing**: `src/app/[locale]/…` receives the internal locale (`en` | `ja`). The layout checks it with `hasLocale` and prerenders both locales (`generateStaticParams` + `dynamicParams = false`).
3. **Messages**: `src/i18n/request.ts` (found by the `next-intl/plugin` in `next.config.ts`) reads the locale from `next/root-params` and loads `messages/{locale}.json`.
4. **Rendering**: server components call `useTranslations` / `getTranslations`. The layout wraps children in `<NextIntlClientProvider>` with no props, so client leaves get the same messages and locale automatically.
5. **Links**: `src/i18n/navigation.ts` exports locale-aware `Link` / `redirect` / `usePathname` / `useRouter` / `getPathname`.

## Files

| File | Role |
|---|---|
| `next.config.ts` | `createNextIntlPlugin()` wraps the config. It uses the default path, so it resolves `src/i18n/request.ts`. |
| `src/i18n/routing.ts` | `defineRouting({ locales: ['en','ja'], defaultLocale: 'en', localePrefix: { mode: 'always', prefixes: { ja: '/jp' } } })`. **This is the single source of truth.** |
| `src/i18n/request.ts` | `getRequestConfig`. Uses an explicitly passed `locale` if there is one, otherwise `await rootParams.locale()` from `next/root-params`. Validates it with `hasLocale` (falls back to `notFound()`) and dynamically imports `messages/${locale}.json`. |
| `src/i18n/navigation.ts` | `createNavigation(routing)`. All internal links import `Link` from here, **never** from `next/link`. |
| `src/proxy.ts` | `export default createMiddleware(routing)`. matcher: `/((?!api\|trpc\|_next\|_vercel\|.*\\..*).*)`. |
| `src/global.d.ts` | Augments `next-intl`'s `AppConfig`: `Locale` comes from `routing.locales`, `Messages` from `typeof messages/en.json`. This gives typed keys, so a typo is a compile error. |
| `src/app/[locale]/layout.tsx` | Root layout. `await params`, `hasLocale` / `notFound`, `<html lang={locale}>`, `generateStaticParams` from `routing.locales`, `dynamicParams = false`, `generateMetadata` via `lib/metadata`, `<NextIntlClientProvider messages={clientMessages}>` with only the namespaces client components read. |
| `src/app/[locale]/page.tsx` | Example use: `useTranslations('hero')` inside a server component. |
| `src/app/[locale]/[...rest]/page.tsx` | Catch-all that calls `notFound()`, so unknown paths render the locale's `not-found.tsx` instead of the framework's bare 404. |
| `src/app/[locale]/not-found.tsx` | Locale-scoped 404, translated with `messages.notFound`, with a `Button` back home. |
| `src/lib/metadata.ts` | `buildMetadata(locale)`: title and description from `messages.meta`, `metadataBase`, canonical and hreflang alternates (plus `x-default`). `homePaths()` builds the per-locale paths with `getPathname()`, so `ja` becomes `/jp`. |
| `src/app/sitemap.ts` | One entry per locale from `homePaths()`, each with hreflang alternates. |
| `src/components/ui/button/Button.tsx` | Uses the i18n `Link` for internal `/…` hrefs, and a plain `<a>` for `#anchors`, downloads and external URLs. |
| `src/components/layout/LocaleSwitcher.tsx` | Client component: a `Link` to the same pathname in the other locale (`usePathname` + `locale`), `prefetch={false}`. |
| `messages/en.json`, `messages/ja.json` | Catalogs with identical key trees. Top-level namespaces: `meta, header, hero, work, stack, experience, japan, about, contact, footer, notFound`. |

## Gotchas / conventions

- **The internal locale is `ja`, the URL is `/jp`.** `Intl`, `<html lang>`, hreflang and every API see `ja`. The prefix mapping is cosmetic. Never hardcode `/${locale}` in a URL; use `getPathname` / `Link`.
- **`next/root-params` replaces `setRequestLocale`.** The request config reads the `[locale]` root param directly, so pages and layouts don't call `setRequestLocale` and static rendering still works. `unstable_rootParams` was removed in Next 16.
- **Explicit locale wins**: `getTranslations({ locale: 'ja' })` arrives in `request.ts` as `locale` and skips the root-param lookup. Use this in `generateMetadata`, sitemap and other code that runs outside a request.
- **`en.json` is the reference type.** Add a key to both files, because `ja.json` has to mirror it (117 leaf keys each right now).
- Copy that changes by language goes in `messages/`. Locale-independent data (URLs, dates, tech ids, image paths) goes in `src/content/`.
- Translate in server components. Client components stay as leaves and only use `useTranslations` for their own strings. The provider sends them only the namespaces in `clientMessages` (root layout): a new client leaf adds its namespace there, or its keys are missing in the browser.
- Routes outside `[locale]` (`sitemap.ts`, `robots.ts`, `manifest.ts`) get no locale from the request and must iterate over `routing.locales` or pass a `locale` explicitly.
