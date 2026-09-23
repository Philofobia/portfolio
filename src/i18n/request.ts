/**
 * next-intl request config: resolves the locale for the current request and
 * loads its message catalog.
 *
 * The locale comes from the `[locale]` segment via `next/root-params`, except
 * when an explicit one was passed (e.g. `getTranslations({locale: 'ja'})`),
 * which arrives as `locale` and takes precedence.
 */
import {hasLocale} from 'next-intl';
import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
import * as rootParams from 'next/root-params';
import {routing} from './routing';

export default getRequestConfig(async ({locale}) => {
  if (!locale) {
    const segment = await rootParams.locale();
    if (!hasLocale(routing.locales, segment)) notFound();
    locale = segment;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
