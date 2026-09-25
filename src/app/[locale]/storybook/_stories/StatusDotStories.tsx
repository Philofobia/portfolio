/**
 * 06 StatusDot, mirroring the design library's section: the three uses, each beside
 * the text that carries its meaning.
 */
import { StatusDot } from "@/components/ui/StatusDot";
import { Story } from "../_components/Story";

export function StatusDotStories() {
  return (
    <Story id="status-dot" index="06" name="StatusDot" file="ui/StatusDot.tsx">
      <figure className="flex flex-col gap-3">
        <ul className="flex flex-wrap gap-x-10 gap-y-4 border border-line bg-bg p-6 font-mono text-meta text-ink-2">
          <li className="flex items-center gap-2.5">
            <StatusDot />
            active · Available from [April 2027]
          </li>
          <li className="flex items-center gap-2.5">
            <StatusDot tone="muted" />
            muted · past role
          </li>
          <li className="flex items-center gap-2.5">
            <StatusDot tone="muted" size={4} />
            bullet · list item
          </li>
        </ul>
        <figcaption className="font-mono text-meta text-ink-3">
          tone: &apos;active&apos; | &apos;muted&apos; · size: 7 | 4 · square,
          never round (circles are reserved for clocks and the emblem)
        </figcaption>
      </figure>
    </Story>
  );
}
