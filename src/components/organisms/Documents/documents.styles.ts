/**
 * Layout of the CV cells (Documents.tsx), on the same container query as the Japan facts
 * (@japan-wide: the Japan section's grid column):
 * - list (below md, Portfolio Mobile): one 56px row per CV; the heading is visually hidden.
 * - stacked (md, below 10 cells): the heading a one-cell band, the CVs below it full width,
 *   two cells high each.
 * - three columns (10 to 18 cells, @japan-thirds): the CVs in thirds on whole cells
 *   (round() of a third plus 0.5px, so 900px gives 300 and not 299.99 → 225; plain thirds
 *   where unsupported). md-only: a phone column can reach 15 small
 *   cells (750px), where the CVs stay rows.
 * - wide (18 cells, Portfolio Desktop): the heading cell 1–5, the CVs 5–10, 10–15, 15–19.
 */

export const documentsGrid =
  "cells mt-cell grid-cols-1 auto-rows-auto @japan-wide:grid-cols-[calc(var(--cell)*4)_minmax(0,1fr)]";

export const documentsHeading =
  "cell text-h4 uppercase max-md:sr-only md:flex md:h-cell md:items-center md:py-0 @japan-wide:h-auto @japan-wide:items-end @japan-wide:py-6";

export const documentsList =
  "grid grid-cols-1 md:@japan-thirds:grid-cols-3 md:@japan-thirds:supports-[width:round(1px,1px)]:grid-cols-[repeat(2,round(down,100%/3_+_0.5px,var(--cell)))_minmax(0,1fr)] @japan-wide:grid-cols-[repeat(2,calc(var(--cell)*5))_minmax(0,1fr)]";
