"use client";

/**
 * Infinite horizontal band; duplicates children for seamless loop; pauses on reduced motion.
 * Props (design 10 Marquee): items (one cycle, ReactNode[]), speed (seconds per copy),
 * repeat (cycles per copy, so one copy outruns the widest screen; a copy is never narrower
 * than the band either, so short ones still loop). 56 tall, 75 from md; '/' separators.
 * The motion is CSS only (.marquee-track in styles/motion.css): no GSAP, so the design's
 * "scroll velocity adds ±speed" is left out. Under reduced motion the band is static.
 *
 * 'use client' only for the pause button. Accessibility over the design (WCAG 2.2.2,
 * MWG "motion"): the band moves for longer than five seconds next to other content, so
 * it ends in a pause/play cell, which the design does not draw; it is hidden when reduced
 * motion already keeps the band still. Assistive tech reads the first cycle once; the
 * repeats, the second copy and the separators are aria-hidden.
 * The first separator of each cycle is the accent one (design: "accent … the marquee slash").
 * Items come from a server component (HeroMarquee) and stay server-rendered.
 */
import { useTranslations } from "next-intl";
import { Fragment, useState, type CSSProperties, type ReactNode } from "react";
import { IconButton } from "@/components/atoms/IconButton";
import { cn } from "@/lib/cn";

type MarqueeProps = {
  items: ReactNode[];
  speed?: number;
  repeat?: number;
  className?: string;
};

export function Marquee({
  items,
  speed = 30,
  repeat = 3,
  className,
}: MarqueeProps) {
  const t = useTranslations("marquee");
  const [paused, setPaused] = useState(false);

  const copy = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex min-w-[100cqi] shrink-0 items-center justify-around"
    >
      {Array.from({ length: repeat }, (_, cycle) =>
        items.map((item, index) => (
          <Fragment key={`${cycle}-${index}`}>
            <span aria-hidden={(!hidden && cycle > 0) || undefined}>
              {item}
            </span>
            <span
              aria-hidden
              className={cn(
                "font-mono leading-none",
                index === 0 ? "text-accent" : "text-ink-3",
                // design 18/30 · 20/30px
                "px-4.5 text-[1.25rem] md:px-7.5 md:text-[1.875rem]",
              )}
            >
              /
            </span>
          </Fragment>
        )),
      )}
    </div>
  );

  return (
    <div
      className={cn(
        "flex h-bar border-y border-line bg-bg md:h-cell",
        className,
      )}
    >
      <div className="@container flex min-w-0 flex-1 items-center overflow-hidden whitespace-nowrap">
        <div
          className="marquee-track flex w-max"
          data-paused={paused || undefined}
          style={{ "--marquee-speed": `${speed}s` } as CSSProperties}
        >
          {copy(false)}
          {copy(true)}
        </div>
      </div>
      <IconButton
        label={t(paused ? "play" : "pause")}
        onClick={() => setPaused((value) => !value)}
        className="motion-reduce:hidden"
      >
        {paused ? (
          <svg viewBox="0 0 16 16" aria-hidden className="size-4 fill-current">
            <path d="M4 2.5v11l9-5.5z" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" aria-hidden className="size-4 fill-current">
            <path d="M4 2.5h2.5v11H4zM9.5 2.5H12v11H9.5z" />
          </svg>
        )}
      </IconButton>
    </div>
  );
}
