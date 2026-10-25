/**
 * Name mark 'MARCO FOBIA' linking to top (#hero).
 *
 * The name comes from content/profile (a proper noun, the same in every locale); caps
 * and .08em tracking are styling, so assistive tech reads the name, not letters.
 * Body size (14 mobile, 15 from md). The caller sizes and pads it for its slot: the
 * header bar and the mobile menu sheet. Extra anchor attributes pass through (the menu
 * closes on click).
 */
import type { AnchorHTMLAttributes } from "react";
import { name } from "@/content/profile";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  ...rest
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">) {
  return (
    <a
      {...rest}
      href="#hero"
      className={cn(
        "flex items-center text-body tracking-[0.08em] whitespace-nowrap uppercase focus-visible:outline focus-visible:-outline-offset-3 focus-visible:outline-accent",
        className,
      )}
    >
      {name}
    </a>
  );
}
