/**
 * One tech glyph: an <svg> that references the sprite by <use>, so every <TechIcon /> is a
 * two-element <svg>, however often a tech repeats. Registry and sprite ids: lib/tech-icons.
 * Decorative, hidden from assistive tech: the tech's name must be in the surrounding text
 * (see molecules/TechTag). Size comes from the map, not from className.
 * Glyphs are mono grey (text-icon), never brand colours.
 */
import { techSymbolId, type TechId } from "@/lib/tech-icons";

const sizeClass = {
  // Design: 16 on 12px text, 14 on 11px (m); scales with the tag's text.
  tag: "size-[1.3333em]",
  // Design: 20, 18 on mobile.
  cell: "size-4.5 md:size-5",
} as const;

export type TechIconSize = keyof typeof sizeClass;

export function TechIcon({ id, size }: { id: TechId; size: TechIconSize }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`${sizeClass[size]} shrink-0 fill-current text-icon`}
    >
      <use href={`/tech-sprite.svg#${techSymbolId(id)}`} />
    </svg>
  );
}
