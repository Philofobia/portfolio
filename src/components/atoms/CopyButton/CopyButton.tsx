"use client";

/**
 * 'use client' — copy button around useCopyToClipboard; swaps its label to 'Copied ✓' for ~2s
 * (design 17: the accent cell turns bg with an accent inset ring), 'Copy failed' when the
 * write is refused. Not colour alone: the text changes too.
 * Props: text (what is copied), label, copiedLabel, failedLabel (from the server parent's
 * messages, so clientMessages does not grow), fallbackHref (where to go when the browser has
 * no Clipboard API, e.g. a mailto: link), className (placement and the cell's size).
 * MWG copy-button: the status lives in a role="status" region next to the button, not inside
 * it (a button's children are presentational, so a live region there is not reliably
 * announced); the region is always rendered and only its text changes; a repeated message
 * gets a trailing no-break space so VoiceOver reads it again. The button is never disabled
 * while the feedback shows. A React onClick replaces the guide's invoker command: this is
 * the client leaf the project allows, and it needs no document-level listener.
 * Looks like an accent Card cell (card.styles.ts). While copied the fill is bg, so the focus
 * ring goes back to accent (the cell's on-accent ring would not show on bg).
 */
import { cardClasses } from "@/components/atoms/Card/card.styles";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "@/lib/cn";

// U+00A0, built from its code point so the source shows no invisible character.
const NO_BREAK_SPACE = String.fromCharCode(0xa0);

export function CopyButton({
  text,
  label,
  copiedLabel,
  failedLabel,
  fallbackHref,
  className,
}: {
  text: string;
  label: string;
  copiedLabel: string;
  failedLabel: string;
  fallbackHref?: string;
  className?: string;
}) {
  const { state, attempt, copy } = useCopyToClipboard();
  const message = { idle: "", copied: copiedLabel, failed: failedLabel }[state];

  function onClick() {
    if (!navigator.clipboard && fallbackHref) {
      window.location.assign(fallbackHref);
      return;
    }
    void copy(text);
  }

  return (
    <>
      <button
        type="button"
        data-state={state}
        onClick={onClick}
        className={cn(
          cardClasses({ variant: "accent", interactive: true }),
          "grid place-items-center text-ui font-normal data-[state=copied]:bg-bg data-[state=copied]:text-accent data-[state=copied]:inset-ring data-[state=copied]:inset-ring-accent data-[state=copied]:[--focus-ring-color:var(--accent)]",
          className,
        )}
      >
        <span>
          {state === "idle" ? label : message}
          {state === "copied" && <span aria-hidden="true"> ✓</span>}
        </span>
      </button>
      <span role="status" className="sr-only">
        {message && message + (attempt % 2 ? "" : NO_BREAK_SPACE)}
      </span>
    </>
  );
}
