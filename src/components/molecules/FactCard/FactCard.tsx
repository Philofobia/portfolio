/**
 * Japan fact cell (design 15 FactCell): <Label> · value · note (e.g. RESIDENCE STATUS /
 * [Visa status] / sponsorship line).
 * A fact is a term and its description: renders a Card <div> holding <dt> (label) + <dd>
 * (value) + optional <dd> (note), so place it in a <dl> (a <div> around dt/dd is valid
 * there). Props: label, value (text, or a <time> for a date), note, size ('lg' 48 / 40 m |
 * 'md' 30 / 22 m: the type tokens h1, h3). The value never animates as a counter.
 * A label that wraps (OTHER LANGUAGES in a half-width cell on a phone) keeps 1.4 leading,
 * not the meta type's 1. A value longer than its cell hyphenates, or breaks inside a word
 * where the browser has no hyphenation for the language, instead of running through the
 * padding into the border (Fundamental at 320px, the WCAG reflow width).
 */
import type { ReactNode } from "react";
import { Card } from "@/components/atoms/Card";
import { Label } from "@/components/atoms/Label";
import { cn } from "@/lib/cn";

const sizeClass = {
  lg: "text-h1",
  md: "text-h3",
} as const;

export function FactCard({
  label,
  value,
  note,
  size = "md",
  className,
}: {
  label: string;
  value: ReactNode;
  note?: string;
  size?: keyof typeof sizeClass;
  className?: string;
}) {
  return (
    <Card className={cn("flex flex-col justify-between gap-4", className)}>
      <Label as="dt" className="leading-[1.4]">
        {label}
      </Label>
      <dd className={cn(sizeClass[size], "wrap-break-word hyphens-auto")}>
        {value}
      </dd>
      {note && <dd className="text-ui-sm text-ink-2">{note}</dd>}
    </Card>
  );
}
