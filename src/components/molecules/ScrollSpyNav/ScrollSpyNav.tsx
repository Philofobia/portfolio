"use client";

/**
 * The header bar's Nav, live: useScrollSpy marks the section in view. The client leaf is
 * this wrapper only; the Header around it stays a Server Component. The Header renders it
 * inside its scroll-target-group (with the logo's #hero) and sets its display through
 * className: it shows once the bar is wide enough, MobileMenu lists the links below that.
 */
import { useRef } from "react";
import { Nav } from "@/components/molecules/Nav";
import { navIds } from "@/content/nav";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export function ScrollSpyNav({ className }: { className?: string }) {
  const listRef = useRef<HTMLUListElement>(null);
  const current = useScrollSpy(navIds, listRef);

  return (
    <Nav
      variant="bar"
      current={current}
      listRef={listRef}
      className={className}
    />
  );
}
