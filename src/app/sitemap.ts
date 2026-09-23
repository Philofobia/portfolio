/**
 * sitemap.xml — one entry per locale.
 * TODO(phase 4): build paths with getPathname() from i18n/navigation so the
 * `ja` locale emits /jp, and add hreflang alternates.
 */
import type {MetadataRoute} from 'next';
import {routing} from '@/i18n/routing';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date()
  }));
}
