/**
 * Web app manifest; the name comes from content/profile. TODO(phase 4): localized name.
 * Icons: the halftone initial that scripts/favicon.mjs writes to public/icons (the tab
 * icon, favicon.ico, and apple-icon.png in this folder come from the same script).
 */
import type { MetadataRoute } from "next";
import { name } from "@/content/profile";
import { DEFAULT_THEME, THEME_BACKGROUND } from "@/lib/theme";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${name} — Full-Stack Engineer`,
    short_name: name,
    start_url: "/",
    display: "standalone",
    background_color: THEME_BACKGROUND[DEFAULT_THEME],
    theme_color: THEME_BACKGROUND[DEFAULT_THEME],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
