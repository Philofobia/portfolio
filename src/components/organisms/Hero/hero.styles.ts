/**
 * Placement of the hero's parts on the cell grid, one entry per part, in the three layouts
 * (Hero.tsx explains when each applies). Kept apart from the markup because every part
 * carries three layouts' worth of grid lines; the look (type, colour) stays in Hero.tsx.
 *
 * Grid: 1fr · N cells · 1fr. At an even column count the 1fr margins are 0, otherwise one
 * cell each, so the text column always starts one cell from the edge at 14 and 18 cells
 * and on the edge at 12 and 16, and the right column ends symmetrically.
 *
 * Composition rules (the design's, made strict):
 * - one column, one edge: everything in a column starts (left) or ends (right) on the
 *   same grid line, so the subtitle and the CTA pair share their right edge;
 * - one cell between a text column and the emblem, never less;
 * - wide: the left text spans the emblem's height (450). Its rows are: one cell of air ·
 *   1fr · availability · 24px · headline · 1fr · intro · 1fr · one cell of air. The emblem
 *   spans the middle seven, so the three 1fr tracks share whatever the text leaves of its
 *   450px: equal space above the group, between headline and intro, and below it, in any
 *   language (about 59px in English, 63px in Japanese). The availability line stays 24px
 *   above the headline it labels. The subtitle shares the headline's row (same middle),
 *   the CTA pair ends on the emblem's bottom edge; the outer rows keep the composition off
 *   the header and the marquee;
 * - tablet (md, below 12 cells: 8 or 10): the emblem beside the text instead of under it,
 *   so the column is not left half empty. Two columns: the text, then the emblem in two
 *   fifths of the column on whole cells (3 cells of 8, 4 of 10; round(), 3 cells where
 *   unsupported), one cell apart. The emblem keeps its six-cell height (450), a tall crop
 *   of the tower, and the rows hang on it: availability, headline and subtitle from its
 *   top, a flexible row, then the intro ending on its bottom edge (the emblem spans all
 *   five, so the flexible row takes what the text leaves). The CTA pair spans the column
 *   one cell under the emblem. Every edge is then a whole number of cells from the top,
 *   with no rounding needed; the text needs about 400 of the 450px in either language;
 * - stacked (phones, below md): the text flows, so its height is any number of pixels; the
 *   column is rounded up to whole cells (block-size-cells) and the CTA pair, one cell high,
 *   is pushed to its foot above one cell of padding, so the pair and the marquee under it
 *   sit on grid lines. The rounding slack (under one cell) goes above the CTAs. Chromium
 *   only (calc-size()); elsewhere the column keeps its content height;
 * - split: the emblem moves down one row so its top meets the headline's and its bottom
 *   the CTA pair's (rows 3–8); the subtitle follows the headline at the top of its row; the
 *   CTAs stay in the text column, one cell clear of the emblem, never under it.
 */

export const heroGrid =
  "flex flex-col gap-5 pt-7.5 pb-cell md:gap-6 md:py-cell @max-hero-split:block-size-cells md:@max-hero-split:grid md:@max-hero-split:grid-cols-[minmax(0,1fr)_calc(var(--cell)*3)] md:@max-hero-split:supports-[width:round(1px,1px)]:grid-cols-[minmax(0,1fr)_round(down,40%,var(--cell))] md:@max-hero-split:grid-rows-[auto_auto_auto_1fr_auto_auto] md:@max-hero-split:gap-x-cell md:@max-hero-split:gap-y-6 @hero-split:grid @hero-split:grid-cols-[1fr_repeat(12,var(--cell))_1fr] @hero-split:grid-rows-[repeat(9,minmax(var(--cell),auto))] @hero-split:gap-0 @hero-split:py-0 @hero-wide:grid-cols-[1fr_repeat(16,var(--cell))_1fr] @hero-wide:grid-rows-[var(--cell)_1fr_auto_var(--cell-pad)_auto_1fr_auto_1fr_var(--cell)]";

export const heroPlacement = {
  availability:
    "md:@max-hero-split:col-start-1 md:@max-hero-split:row-start-1 @hero-split:col-[2/7] @hero-split:row-start-2 @hero-split:self-end @hero-wide:col-[2/6] @hero-wide:row-start-3",
  title:
    "md:@max-hero-split:col-start-1 md:@max-hero-split:row-start-2 @hero-split:col-[2/7] @hero-split:row-[3/5] @hero-split:self-center @hero-wide:col-[2/6] @hero-wide:row-[5/6]",
  subtitle:
    "md:@max-hero-split:col-start-1 md:@max-hero-split:row-start-3 @hero-split:col-[2/7] @hero-split:row-start-5 @hero-split:self-start @hero-wide:col-[13/18] @hero-wide:row-[5/6] @hero-wide:items-end @hero-wide:self-center @hero-wide:text-end",
  emblem:
    "w-full md:w-cells-6 md:@max-hero-split:col-start-2 md:@max-hero-split:row-[1/6] md:@max-hero-split:w-full @hero-split:col-[8/14] @hero-split:row-[3/9] @hero-wide:col-[7/13] @hero-wide:row-[2/9]",
  intro:
    "md:@max-hero-split:col-start-1 md:@max-hero-split:row-start-5 md:@max-hero-split:self-end @hero-split:col-[2/7] @hero-split:row-[6/8] @hero-split:self-start @hero-wide:col-[2/6] @hero-wide:row-[7/8]",
  ctas: "@max-hero-split:mt-auto md:@max-hero-split:col-span-2 md:@max-hero-split:row-start-6 md:@max-hero-split:mt-[calc(var(--cell)-1.5rem)] @hero-split:col-[2/7] @hero-split:row-start-8 @hero-wide:col-[13/18] @hero-wide:row-[7/9] @hero-wide:self-end @hero-wide:justify-end",
} as const;
