/**
 * HOME PAGE — single-page layout. Stacks the 7 numbered sections in order:
 * 01 Hero · 02 Work · 03 Stack · 04 Experience · 05 Japan · 06 About · 07 Contact
 * Each section is a full-height panel with an id used by the header nav anchors.
 */
import {useTranslations} from 'next-intl';

export default function Page() {
  const t = useTranslations('hero');

  return (
    <main>
      <p>{t('label')}</p>
      <h1>
        {t('titleLine1')} {t('titleLine2')}
      </h1>
      <p>{t('intro')}</p>
    </main>
  );
}
