/**
 * Hero emblem (design 11 HeroEmblem): Tokyo Tower at night as a halftone, in a bordered box
 * six cells tall (300 mobile, 450 desktop, where it is also six cells wide).
 *
 * The design's dotted photo, redrawn by its owner's choice (scripts/hero-emblem.mjs makes it
 * once, as the SVG poster and as the canvas data in content/hero-emblem): a hexagonal lattice
 * of 96 columns where each cell holds either a tower dot (full ink, area by brightness) or a
 * sky dot (ink at 15%, = --line; smaller next to the tower, so the silhouette is drawn by
 * both). The skyline is gone and the tower fades out towards the ground.
 * In the dark theme it reads as a lit tower at night, in the light one as an ink print.
 *
 * Two layers, both cropped like object-fit: cover:
 * - the poster: a real <img> of the SVG, the hero's largest element and so its LCP
 *   (web-performance: the LCP element is an <img> in the server HTML, eager, with
 *   fetchpriority="high"; no CSS image, no preload, as the preload scanner finds it). Drawn
 *   in the dark theme's ink; the light theme inverts it (--emblem-filter in tokens.css). It
 *   is also the whole emblem without JavaScript or under reduced motion. Plain <img>, not
 *   next/image: an SVG needs no resizing (nextjs-react, performance.md);
 * - <DotMatrix>: the same dots on a canvas, wiping in over the poster after hydration (the
 *   poster is painted, and measured, untouched first); the dots part around the pointer (or a
 *   finger dragging sideways) inside an accent ring.
 *
 * Accessibility: one image with alt text; nothing takes focus, as there is nothing to do
 * with it. Forced colours (Windows contrast themes) do not recolour images, so light dots
 * could vanish on a light system background: there the <img> turns transparent (it stays
 * in the accessibility tree) and the same SVG, as a CSS mask, paints the system's
 * CanvasText (forced-color-adjust: none keeps the painted background). The mask is set only
 * under forced colours, so no other visitor fetches it twice.
 * Props: className (placement and width).
 */
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { DotMatrix } from "@/components/atoms/DotMatrix";
import { heroEmblem } from "@/content/hero";
import { cn } from "@/lib/cn";

export function HeroEmblem({ className }: { className?: string }) {
  const t = useTranslations("hero");

  return (
    <div
      className={cn(
        "relative h-[calc(var(--cell)*6)] overflow-hidden border border-line bg-bg",
        className,
      )}
    >
      <DotMatrix />
      <div className="relative size-full peer-data-ready:motion-safe:animate-emblem-out">
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG poster and LCP: no optimisation to gain from next/image */}
        <img
          src={heroEmblem.src}
          width={heroEmblem.width}
          height={heroEmblem.height}
          alt={t("emblemAlt")}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="size-full object-cover filter-(--emblem-filter) forced-colors:opacity-0"
        />
        <div
          aria-hidden
          style={{ "--emblem": `url(${heroEmblem.src})` } as CSSProperties}
          className="absolute inset-0 hidden forced-color-adjust-none forced-colors:block forced-colors:bg-[CanvasText] forced-colors:[mask:var(--emblem)_center/cover_no-repeat]"
        />
      </div>
    </div>
  );
}
