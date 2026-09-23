/**
 * Locale-aware navigation helpers: createNavigation(routing) → { Link, redirect, usePathname, useRouter, getPathname }.
 * All internal links in the app import Link from here, NOT from next/link.
 */

import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
