/**
 * Placement of the Stack cells on the cell grid (Stack.tsx explains when each layout
 * applies). Kept apart from the markup, as hero.styles.ts, because each cell carries its
 * grid lines for the wide layout; the look stays in the components.
 *
 * - accordion (below 12 cells): one column in source order, one 56px row per group (the
 *   design's height, not a cell); the fiber photo, second in the source, is a two-cell
 *   strip under Frontend (Portfolio Mobile); the swirl is left out.
 * - split (12–16 cells): two equal columns, each a whole number of cells (the column is an
 *   even count from md), rows at least four cells high (stackCell) that grow with their
 *   text. The fiber photo moves last (order), so the rows read A B / C D / E photo. The
 *   swirl is left out.
 * - wide (18 cells, Portfolio Desktop): 18 × 8 cells, two bands of four:
 *     A Frontend 1–8 · B Backend 8–14 · fiber 14–19
 *     swirl 1–3 · C Data 3–8 · D Web performance 8–14 · E Ways of working 14–19
 *   The design's bands are three cells high; four hold the fuller copy (two to four lines)
 *   and up to three rows of tags. Rows are at least a cell and grow if a translation runs
 *   longer, so text is never clipped.
 */

export const stackGrid =
  "grid-cols-1 auto-rows-auto @stack-split:grid-cols-2 @stack-wide:grid-cols-[repeat(18,var(--cell))] @stack-wide:grid-rows-[repeat(8,minmax(var(--cell),auto))]";

/**
 * On every group cell from 12 cells: at least four cells, so each row of the two columns
 * ends on a grid line (the cells' text needs three and a bit there).
 */
export const stackCell = "@stack-split:min-h-cells-4";

export const stackPlacement = {
  frontend: "@stack-wide:col-[1/8] @stack-wide:row-[1/5]",
  backend: "@stack-wide:col-[8/14] @stack-wide:row-[1/5]",
  fiber:
    "h-cells-2 @stack-split:order-last @stack-split:h-auto @stack-wide:order-none @stack-wide:col-[14/19] @stack-wide:row-[1/5]",
  swirl: "hidden @stack-wide:block @stack-wide:col-[1/3] @stack-wide:row-[5/9]",
  data: "@stack-wide:col-[3/8] @stack-wide:row-[5/9]",
  performance: "@stack-wide:col-[8/14] @stack-wide:row-[5/9]",
  ways: "@stack-wide:col-[14/19] @stack-wide:row-[5/9]",
} as const;
