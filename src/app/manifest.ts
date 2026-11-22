/**
 * Web app manifest; the name comes from content/profile. TODO(phase 4): real icons, localized name.
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
    icons: [],
  };
}
