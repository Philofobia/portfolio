"use client";

/**
 * 'use client' — cursor-reactive dot-matrix <canvas> behind the hero; clip-path inset reveal; idle on reduced motion.
 *
 * The gate in front of DotMatrixCanvas (design 11 HeroEmblem: "dynamic(), ssr:false").
 * The canvas is decorative and lives in no server HTML: HeroEmblem's poster <img> is the
 * server-rendered picture (and the LCP). Its code is fetched only once the browser reports
 * that motion is allowed; under reduced motion, or before hydration, nothing mounts and the
 * still poster is the emblem. If the setting changes to reduce, the canvas unmounts and the
 * poster returns. No props: the dots are content/hero-emblem.
 */
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const DotMatrixCanvas = dynamic(
  () => import("./DotMatrixCanvas").then((module) => module.DotMatrixCanvas),
  { ssr: false, loading: () => null },
);

export function DotMatrix() {
  const reducedMotion = useReducedMotion();
  return reducedMotion === false ? <DotMatrixCanvas /> : null;
}
