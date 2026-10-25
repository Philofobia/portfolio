"use client";

/**
 * Scrollspy for the nav links (MWG "scrollspy"): which section is in view, for aria-current.
 *
 * Where scroll-target-group is supported, the browser itself picks the current link of
 * the list (:target-current, styled through the current-section: variant), and this hook
 * mirrors it at scrollend so assistive tech hears the same thing. A list inside a <dialog>
 * (the mobile menu) is not tracked while the dialog is closed, so it is re-read when the
 * dialog opens (its toggle event, which every browser with scroll-target-group fires).
 * Elsewhere an IntersectionObserver watches the sections against a zero-height band at
 * mid-viewport: the section crossing the middle is current, and none is while the hero
 * (not in the nav) holds the middle.
 *
 * ids: the sections (content/nav.ts); listRef: the list of links, inside a
 * scroll-target-group container. Returns the current id, or null.
 */
import { useEffect, useState, type RefObject } from "react";

const SCROLL_TARGET_GROUP = "scroll-target-group: auto";

function readCurrent(list: HTMLElement | null) {
  const link = list?.querySelector<HTMLAnchorElement>("a:target-current");
  return link ? decodeURIComponent(link.hash.slice(1)) : null;
}

export function useScrollSpy(
  ids: readonly string[],
  listRef: RefObject<HTMLElement | null>,
) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    if (CSS.supports(SCROLL_TARGET_GROUP)) {
      // :target-current updates on the frame after scrollend: read it then.
      let frame = 0;
      const sync = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() =>
          setCurrent(readCurrent(listRef.current)),
        );
      };
      sync();
      const controller = new AbortController();
      const { signal } = controller;
      addEventListener("scrollend", sync, { signal });
      listRef.current
        ?.closest("dialog")
        ?.addEventListener("toggle", sync, { signal });
      return () => {
        cancelAnimationFrame(frame);
        controller.abort();
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          setCurrent((id) =>
            isIntersecting ? target.id : id === target.id ? null : id,
          );
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    // The sections are other components' elements: observed, never changed.
    for (const id of ids) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [ids, listRef]);

  return current;
}
