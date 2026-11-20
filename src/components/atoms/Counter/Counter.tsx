/**
 * '01 / 04' mono counter with zero-padding. Props: current, total (1-based), label (what a
 * screen reader hears instead, from messages: "Project 1 of 4"). The digits are visual only,
 * so "zero one slash zero four" is never read.
 */
import { cn } from "@/lib/cn";

const pad = (n: number) => String(n).padStart(2, "0");

export function Counter({
  current,
  total,
  label,
  className,
}: {
  current: number;
  total: number;
  label: string;
  className?: string;
}) {
  return (
    <span className={cn("font-mono text-meta text-ink-3", className)}>
      <span aria-hidden="true">
        {pad(current)} / {pad(total)}
      </span>
      <span className="sr-only">{label}</span>
    </span>
  );
}
