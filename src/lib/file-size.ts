/**
 * Size in bytes of a file served from public/ (a CV in public/cv), read when the page is
 * prerendered: the Documents cards show it, and it stays right whenever the PDFs are
 * rebuilt, with no number kept by hand. Server only (node:fs); format it with next-intl's
 * format.number (unit kilobyte) in the component.
 */
import "server-only";
import { statSync } from "node:fs";
import { join } from "node:path";

export function publicFileSize(href: string) {
  return statSync(join(process.cwd(), "public", href)).size;
}
