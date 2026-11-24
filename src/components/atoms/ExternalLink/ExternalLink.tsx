/**
 * A link to another site: its text, then a trailing '↗' glyph that nudges up and out on
 * hover (the Button icon's motion). Used for the Contact section's profiles.
 * Opens in the same tab: nextjs-react security.md keeps links to GitHub, LinkedIn and
 * similar in the tab unless the design says otherwise, and the design only draws the
 * arrow, which marks the link as external. So no target=_blank and no "new tab" notice;
 * the arrow is decorative (aria-hidden), the name is the link's text.
 * href is typed https: only, so a link from content data can never carry another scheme
 * (security.md). The scaffold's '—' state for a missing URL is gone: a profile without a
 * URL is left out of content/profile links instead (2026-11-24).
 * Props: href, children (the link text), className (the look and placement; the arrow
 * follows the text's colour unless iconClassName says otherwise), iconClassName.
 */
import type { ReactNode } from "react";
import { buttonIconClasses } from "@/components/atoms/Button/button.styles";
import { cn } from "@/lib/cn";

// U+FE0E after the arrow: the text glyph, not the colour emoji some fonts map it to.
const ARROW = "↗" + String.fromCharCode(0xfe0e);

export function ExternalLink({
  href,
  children,
  className,
  iconClassName,
}: {
  href: `https://${string}`;
  children: ReactNode;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <a href={href} className={cn("group", className)}>
      {children}
      <span
        aria-hidden="true"
        className={cn(buttonIconClasses("↗"), iconClassName)}
      >
        {ARROW}
      </span>
    </a>
  );
}
