/**
 * Next 16 proxy (replaces middleware.ts). Wraps next-intl createMiddleware(routing)
 * to redirect / → /{locale} based on Accept-Language and to enforce the prefix.
 * config.matcher: skip _next, api and any path with a dot (static files, sitemap.xml,
 * tech-sprite.svg), and the Open Graph images ([locale]/opengraph-image): Next writes
 * their URL in og:image with the internal locale segment (/ja/opengraph-image/card, not
 * /jp/…) and offers no way to change it, so the proxy must not redirect that path.
 */

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*/opengraph-image|.*\\..*).*)",
};
