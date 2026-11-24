/**
 * Placement of the Japan facts and CV cells on the cell grid (Japan.tsx and Documents.tsx
 * explain when each layout applies). Kept apart from the markup, as stack.styles.ts.
 *
 * Facts:
 * - two columns (below 18 cells): halves on whole cells, round(down, 50%, cell) | the rest,
 *   so on a phone with an odd cell count the middle border still falls on a grid line
 *   (plain 1fr 1fr where round() is unsupported). Residence and Looking for span both
 *   columns; from md each cell is at least two cells high.
 * - wide (18 cells, Portfolio Desktop): 18 × 4 cells:
 *     residence 1–7 (four rows) · japanese 7–13 · languages 13–19   (rows 1–2)
 *                                 inTokyo 7–11 · certification 11–15 · lookingFor 15–19
 *   Rows are at least a cell and grow if a translation runs longer, so text is never
 *   clipped.
 * The CV cells below the facts are Documents (documents.styles.ts).
 */

export const factsGrid =
  "mt-5 md:mt-0 grid-cols-2 auto-rows-auto supports-[width:round(1px,1px)]:grid-cols-[round(down,50%,var(--cell))_minmax(0,1fr)] @japan-wide:grid-cols-[repeat(18,var(--cell))] @japan-wide:grid-rows-[repeat(4,minmax(var(--cell),auto))]";

/**
 * On every fact: the mobile design's tighter padding, with label, value and note stacked
 * from the top (a row's taller neighbour would otherwise spread them); from md at least two
 * cells high, the note on the cell's foot (FactCard's justify-between). A fact whose text
 * wraps further (the certification's note on a four-cell card) rounds its row up to whole
 * cells (min-block-size-cells), so the rows below stay on the grid lines.
 */
export const factCell =
  "py-4 max-md:justify-start md:min-block-size-cells-2 md:py-5";

export const factPlacement = {
  residence: "col-span-2 @japan-wide:col-[1/7] @japan-wide:row-[1/5]",
  japanese: "@japan-wide:col-[7/13] @japan-wide:row-[1/3]",
  languages: "@japan-wide:col-[13/19] @japan-wide:row-[1/3]",
  inTokyo: "@japan-wide:col-[7/11] @japan-wide:row-[3/5]",
  certification: "@japan-wide:col-[11/15] @japan-wide:row-[3/5]",
  lookingFor: "col-span-2 @japan-wide:col-[15/19] @japan-wide:row-[3/5]",
} as const;
