/**
 * The menu glyph: two 1px lines, 18 × 7 (design), in the text colour. Decorative: the
 * button around it carries the name ("Open menu").
 */
export function BurgerIcon() {
  return (
    <span
      aria-hidden="true"
      className="block h-1.75 w-4.5 border-y border-current"
    />
  );
}
