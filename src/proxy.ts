/**
 * Next 16 proxy (replaces middleware.ts). Wraps next-intl createMiddleware(routing)
 * to redirect / → /{locale} based on Accept-Language and to enforce the prefix.
 * config.matcher: skip _next, api, static files.
 *
 * Stub: Next validates this file at startup, so it must export a function.
 * Replace the body with the next-intl proxy once the package is installed.
 */

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
