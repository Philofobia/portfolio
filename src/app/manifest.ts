/**
 * Web app manifest; the name comes from content/profile. TODO(phase 4): real icons, localized name.
 */
import type { MetadataRoute } from "next";
import { name } from "@/content/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${name} — Fullstack Engineer`,
    short_name: name,
    start_url: "/",
    display: "standalone",
    background_color: "#1b1b1c",
    theme_color: "#1b1b1c",
    icons: [],
  };
}
