"use client";

/**
 * Script fallback for the Work carousel: runs only for the parts the browser cannot do in
 * CSS (styles/carousel.css explains the layers). The carousel itself is a native scroll-snap
 * scroller: touch, trackpad, keyboard and drag-free swipes need no code here, and nothing
 * here moves the track except a prev/next click.
 *
 * Feature tests (client only, through useSyncExternalStore: null on the server and during
 * hydration, so the prerendered HTML never depends on support):
 * - buttons: no ::scroll-button() → the bar's <button>s call prev / next;
 * - markers: no scroll-target-group → `index` drives aria-current on the project list;
 * - caption: no scroll-driven animations on a named timeline → `index` drives the reel.
 * Where all three are native (current Chromium) no listener is added at all.
 *
 * Index: read from the scroll position, never kept apart from it (MWG carousel): the slides
 * are equal, so the snap points are evenly spread over the scroll range. Live while
 * scrolling (one read per frame), and again when scrolling settles (scrollend, or a
 * debounced scroll where scrollend is missing). A click sets a pending target, so rapid
 * clicks build on the slide already being scrolled to; the live read pauses until it
 * settles. Prev/next stop at the ends, as the native buttons do (no looping).
 * Scrolling is smooth through the track's own CSS scroll-behavior (off under reduced motion).
 *
 * trackRef: the scroller; count: the number of slides.
 */
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { RefObject } from "react";

// Order = bit in the support mask: buttons 1, markers 2, caption 4.
const NATIVE = [
  "selector(::scroll-button(*))",
  "scroll-target-group: auto",
  "(animation-timeline: scroll()) and (timeline-scope: none)",
];

export type CarouselFallback = {
  buttons: boolean;
  markers: boolean;
  caption: boolean;
};

const SETTLE_DELAY = 120;

const noSubscribe = () => () => {};

/** Bit mask of the missing features; -1 until the browser answers (server, hydration). */
const readMissing = () =>
  NATIVE.reduce((mask, test, bit) => mask | (+!CSS.supports(test) << bit), 0);

export function useCarousel(
  trackRef: RefObject<HTMLElement | null>,
  count: number,
) {
  const missing = useSyncExternalStore(noSubscribe, readMissing, () => -1);
  const fallback: CarouselFallback | null =
    missing < 0
      ? null
      : {
          buttons: !!(missing & 1),
          markers: !!(missing & 2),
          caption: !!(missing & 4),
        };
  const active = missing > 0;

  const [index, setIndex] = useState(0);
  const pending = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !active || count < 2) return;

    const read = () => {
      const max = track.scrollWidth - track.clientWidth;
      return max > 0
        ? Math.round((Math.abs(track.scrollLeft) / max) * (count - 1))
        : 0;
    };

    const scrollEnd = "onscrollend" in window;
    let frame = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const settle = () => {
      pending.current = null;
      setIndex(read());
    };
    const onScroll = () => {
      if (pending.current === null) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => setIndex(read()));
      }
      if (!scrollEnd) {
        clearTimeout(timer);
        timer = setTimeout(settle, SETTLE_DELAY);
      }
    };

    const controller = new AbortController();
    const { signal } = controller;
    track.addEventListener("scroll", onScroll, { passive: true, signal });
    track.addEventListener("scrollend", settle, { signal });
    // A restored scroll position (back navigation) is read once, on the next frame.
    frame = requestAnimationFrame(() => setIndex(read()));

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      controller.abort();
    };
  }, [trackRef, count, active]);

  const step = (direction: -1 | 1) => {
    const track = trackRef.current;
    const from = pending.current ?? index;
    const target = Math.min(count - 1, Math.max(0, from + direction));
    if (track && target !== from) {
      pending.current = target;
      setIndex(target);
      track.scrollTo({
        left: ((track.scrollWidth - track.clientWidth) / (count - 1)) * target,
      });
    }
    return target;
  };

  return {
    fallback,
    index,
    previous: () => step(-1),
    next: () => step(1),
  };
}
