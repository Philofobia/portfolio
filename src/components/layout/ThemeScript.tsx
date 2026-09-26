"use client";

/**
 * 'use client' — the pre-paint theme script (lib/theme themeScript) for <head> in the root layout.
 * On a hard load it runs while the HTML parses and sets html[data-theme] before first paint.
 * Switching locale re-renders the root layout on the client, and React warns about every
 * <script> it renders there ("Encountered a script tag…"). So the type is text/javascript
 * on the server and text/plain in the browser, which React renders without warning and the
 * browser never runs; data-theme is already set by then. suppressHydrationWarning covers the
 * type mismatch. Pattern from Next's "Preventing flash before hydration" guide.
 */
import { themeScript } from "@/lib/theme";

export function ThemeScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />
  );
}
