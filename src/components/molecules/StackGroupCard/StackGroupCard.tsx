/**
 * One stack group (design 13 StackCell): <h3> title · description · list of <TechTag />.
 * variant 'cell' (desktop, static): a 3-cell-high Card: 'A.' index · <h3> · description at
 * the top, the tags at the foot.
 * variant 'accordion' (mobile): a native <details> row, 56 high, title + '+' / '−' marker
 * (accent when open); open, it shows the description and the tags. Groups sharing a `name`
 * open one at a time (MWG accordion: <details name>, Baseline 2024; where unsupported several
 * stay open, still a working accordion, so no script). The title is <summary> text, not a
 * heading: JAWS and TalkBack drop headings inside <summary> (MWG accordion); the Stack
 * section's <h2> still heads the list. The Stack organism picks the variant per breakpoint.
 * Props: index ('A.', decorative ordering, hidden from assistive tech), title, description,
 * techs (TechId[]), variant, name (accordion group), open (accordion starts open).
 */
import { Card } from "@/components/atoms/Card";
import { TechTag } from "@/components/molecules/TechTag";
import { cn } from "@/lib/cn";
import type { TechId } from "@/lib/tech-icons";

type StackGroupCardProps = {
  index: string;
  title: string;
  description: string;
  techs: TechId[];
  className?: string;
} & (
  | { variant?: "cell"; name?: undefined; open?: undefined }
  | { variant: "accordion"; name: string; open?: boolean }
);

export function StackGroupCard({
  index,
  title,
  description,
  techs,
  className,
  ...accordion
}: StackGroupCardProps) {
  const isAccordion = accordion.variant === "accordion";
  // Tag gaps: 10 / 20 in the cell, 10 / 16 in the mobile accordion (Portfolio Mobile).
  const tags = (
    <ul
      role="list"
      className={cn(
        "flex flex-wrap gap-y-2.5",
        isAccordion ? "gap-x-4" : "gap-x-5",
      )}
    >
      {techs.map((id) => (
        <TechTag key={id} id={id} />
      ))}
    </ul>
  );

  if (accordion.variant === "accordion") {
    return (
      <details
        name={accordion.name}
        open={accordion.open}
        className={cn("group border-b border-line bg-bg", className)}
      >
        <summary className="flex h-bar cursor-pointer list-none items-center justify-between px-5 text-h4 uppercase focus-visible:focus-ring-inset [&::-webkit-details-marker]:hidden">
          {title}
          <span
            aria-hidden="true"
            className="font-mono text-ui-xs text-ink-3 group-open:text-accent"
          >
            <span className="group-open:hidden">+</span>
            <span className="hidden group-open:inline">−</span>
          </span>
        </summary>
        <div className="flex flex-col gap-3 px-5 pb-5">
          <p className="text-ink-2">{description}</p>
          {tags}
        </div>
      </details>
    );
  }

  return (
    <Card
      as="article"
      className={cn(
        "flex min-h-cells-3 flex-col justify-between gap-6",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <span aria-hidden="true" className="font-mono text-meta text-ink-3">
          {index}
        </span>
        <h3 className="text-h4 uppercase">{title}</h3>
        <p className="text-ink-2">{description}</p>
      </div>
      {tags}
    </Card>
  );
}
