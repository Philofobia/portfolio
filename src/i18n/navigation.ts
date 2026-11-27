/**
 * Locale-aware navigation helpers: createNavigation(routing) → { Link, usePathname, getPathname }
 * (the ones the app uses; redirect and useRouter come from the same call when needed).
 * All internal links in the app import Link from here, NOT from next/link.
 */

import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, usePathname, getPathname } = createNavigation(routing);
