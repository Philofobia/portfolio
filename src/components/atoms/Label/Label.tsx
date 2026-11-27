/**
 * Mono uppercase caption (12 / 11 m, .16em) — '01. POSITIONING', 'ROLE — Solo build', 'RESIDENCE STATUS'…
 * Props: as ('p' | 'dt': the caller picks the element its context needs),
 * tone ('ink-2' default | 'ink-3'), children.
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const toneClass = {
  "ink-2": "text-ink-2",
  "ink-3": "text-ink-3",
} as const;

export function Label({
  as: Element,
  tone = "ink-2",
  className,
  children,
}: {
  as: "p" | "dt";
  tone?: keyof typeof toneClass;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Element
      className={cn(
        "font-mono text-meta tracking-[.16em] uppercase",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </Element>
  );
}
