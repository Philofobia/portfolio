/**
 * robots.txt. TODO(phase 4): point at the real site URL from content/profile.ts.
 */
import type {MetadataRoute} from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {userAgent: '*', allow: '/'},
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
