/**
 * robots.txt: everything crawlable, pointing at the sitemap on the site URL from
 * content/profile.ts.
 */
import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/profile";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
