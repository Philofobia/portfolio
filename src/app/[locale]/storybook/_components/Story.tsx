/**
 * Storybook building blocks, laid out like the design's Component Library.
 * Story: one named <section> per component, headed by build number, name and source file.
 * StoryTable: a variant matrix as a real <table> (row = variant, column = state or example);
 * it scrolls sideways inside its own focusable region on narrow screens.
 * StoryRow: one table row; its label is the row header and each child becomes a cell.
 */
import { Children, useId, type ReactNode } from "react";

export function Story({
  id,
  index,
  name,
  file,
  children,
}: {
  id: string;
  index: string;
  name: string;
  file: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="flex scroll-mt-6 flex-col gap-4.5 bg-bg"
    >
      <header className="flex flex-wrap items-baseline gap-x-3.5 gap-y-2 border-b border-line pb-3">
        <span className="font-mono text-meta text-ink-3">{index}</span>
        <h2 id={`${id}-title`} className="text-h3 uppercase">
          {name}
        </h2>
        <code className="ms-auto font-mono text-meta text-ink-3">{file}</code>
      </header>
      {children}
    </section>
  );
}

export function StoryTable({
  caption,
  rowHeader,
  columns,
  children,
}: {
  caption: string;
  rowHeader: string;
  columns: string[];
  children: ReactNode;
}) {
  const captionId = useId();

  return (
    <div
      role="region"
      aria-labelledby={captionId}
      tabIndex={0}
      className="overflow-x-auto border border-line"
    >
      <table className="w-full border-collapse">
        <caption
          id={captionId}
          className="border-b border-line px-4 py-3 text-start font-mono text-meta text-ink-3"
        >
          {caption}
        </caption>
        <thead>
          <tr className="border-b border-line">
            {[rowHeader, ...columns].map((column) => (
              <th
                key={column}
                scope="col"
                className="px-4 py-3 text-start font-mono text-meta font-normal text-ink-3 uppercase"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function StoryRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <tr className="border-b border-line last:border-b-0">
      <th
        scope="row"
        className="px-4 py-4 text-start font-mono text-meta font-normal text-ink-2"
      >
        {label}
      </th>
      {Children.map(children, (cell) => (
        <td className="px-4 py-4">{cell}</td>
      ))}
    </tr>
  );
}
