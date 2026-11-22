/**
 * Hero emblem poster: Tokyo Tower at night as a halftone (an SVG shown as an <img>, the
 * hero's LCP), generated with the canvas data (content/hero-emblem.ts) by
 * scripts/hero-emblem.mjs from scripts/data/hero-tower.webp. width/height are the SVG's own.
 * Locale-independent; its alt text is in messages (hero.emblemAlt).
 */
export const heroEmblem = {
  src: "/images/hero-tower.svg",
  width: 672,
  height: 672,
} as const;

/**
 * Hero band (molecules/HeroMarquee): the specialisms from the CV, each in English and in
 * Japanese, shown as a pair in every locale (like the name and its katakana it replaced),
 * so they live here rather than in messages. The English term is uppercased in CSS.
 * Tech names stay out: they are the Stack section's band.
 */
export const heroSpecialisms = [
  { en: "Web performance", ja: "Webパフォーマンス" },
  { en: "Front end", ja: "フロントエンド" },
  { en: "E-commerce", ja: "Eコマース" },
  { en: "Full stack", ja: "フルスタック" },
] as const;
