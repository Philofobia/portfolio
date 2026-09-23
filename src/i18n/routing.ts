/**
 * next-intl routing config.
 *
 * The internal locale for Japanese is `ja` (the ISO 639-1 language code) so that
 * `Intl`, `<html lang>` and hreflang all resolve correctly. The `prefixes` map is
 * cosmetic: it serves that locale at `/jp` while every API still sees `ja`.
 */
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ja'],
  defaultLocale: 'en',
  localePrefix: {
    mode: 'always',
    prefixes: {
      ja: '/jp'
    }
  }
});
