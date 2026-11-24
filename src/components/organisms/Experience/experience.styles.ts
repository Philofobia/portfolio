/**
 * Experience layout classes (Experience.tsx explains when each applies). Kept apart from the
 * markup, as stack.styles.ts: one structure, restyled per width.
 *
 * Each group is a <details> (Experience.tsx): its <summary> is the group's row.
 * - rail (below md, Portfolio Mobile): the intro, then one rail (its left edge) holding both
 *   groups; each summary a 56px row on the rail (the touch target), entries 28px apart.
 * - list (md up to 16 cells): the intro above, its height rounded up to whole cells, then
 *   the bordered list: summary rows one cell high, entries as rows (period column three
 *   cells | body), each rounded up to whole cells, so every row line falls on a grid line;
 *   a closed group leaves only its summary row.
 *   Whole-cell rounding is calc-size() (block-size-cells, Chromium only): elsewhere rows
 *   keep their own height, only off the grid lines.
 * - split (16 cells, Portfolio Desktop): range and intro in a six-cell column, the list
 *   beside it (twelve cells at 18).
 */

export const experienceGrid =
  "mt-6 grid gap-8 md:mt-0 md:gap-0 @experience-split:grid-cols-[calc(var(--cell)*6)_minmax(0,1fr)]";

export const experienceIntro =
  "grid content-start gap-3 md:block-size-cells md:py-6 @experience-split:pe-8";

/**
 * The rail / the list's left edge is drawn 1px outside (as .cells draws its top and left),
 * so it lands on the background's grid line, the last pixel of the cell before; a border
 * would sit 1px inside it. The right and top borders already fall on a line.
 * self-start: in split the list shares a grid row with the intro, and stretched to it the
 * frame ran on below the last row with no bottom edge (both groups closed: an empty cell).
 * The list is as tall as its rows, whose bottom borders close it.
 */
export const experienceList =
  "flex flex-col self-start shadow-[-1px_0_0_var(--line)] md:border-e md:border-t md:border-line md:bg-bg";

/**
 * Group summary: the label after a '+' / '−' marker (accent when open). The marker sits
 * before the label, not at the row's far end: rows are up to twelve cells wide, and MWG
 * accordion keeps the marker by its label for screen-magnifier users. Hover tint on real
 * pointers, focus ring drawn inside (the row sits flush with the list's borders).
 */
export const experienceSummary =
  "flex h-bar cursor-pointer list-none items-center gap-3 ps-5 font-mono text-meta tracking-[.16em] text-ink-2 uppercase focus-visible:focus-ring-cell md:h-cell md:border-b md:border-line md:ps-6 md:hover:bg-bg-hover motion-safe:md:transition-colors motion-safe:md:duration-200 [&::-webkit-details-marker]:hidden";

export const experienceMarker = "w-[1ch] text-ink-3 group-open:text-accent";

export const experienceGroup = "flex flex-col gap-7 pt-1 pb-7 md:gap-0 md:py-0";

export const experienceEntry = "md:block-size-cells";
