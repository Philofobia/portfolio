/**
 * cn() helper — joins conditional class names; false / null / undefined drop out.
 * No clsx / tailwind-merge: components own their look through variant maps and
 * callers pass placement only (margin, grid position), so there is nothing to merge.
 */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
