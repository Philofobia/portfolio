/**
 * 'Back to top ↑': a link to #hero (a destination, so a link, not a button). No client
 * JavaScript: base.css makes in-page anchors scroll smoothly unless motion is reduced, and
 * the fragment moves the focus start point to the hero for keyboard users.
 * Props: label (from messages: footer.backToTop).
 */
import { textLinkClasses } from "@/components/atoms/Button/button.styles";
import { cn } from "@/lib/cn";

export function BackToTop({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <a href="#hero" className={cn(textLinkClasses, className)}>
      {label} <span aria-hidden="true">↑</span>
    </a>
  );
}
