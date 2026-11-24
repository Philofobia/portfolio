/**
 * Timeline entries (ids + dates) for work and education; text lives in messages.experience.
 *
 * As built: newest first, from the English CV (public/cv). key is the entry's key in
 * messages experience.work / experience.education (title, org, bullets). Dates are YYYY-MM
 * (shown as "Jul 2026" / 「2026年7月」) or YYYY (shown as written), and are the
 * <time dateTime>. current marks the latest role (accent square); with no end it reads
 * "now". The performance role ends with the move to Tokyo: its end month is shown (Marco,
 * 2026-11-23), so the page stays true after December. An entry with no end that is not
 * current is a single date (the FE exam).
 * The section's range ("2020 — 2026") is read from these dates.
 */

export type TimelineItem = {
  key: string;
  start: string;
  end?: string;
  current?: boolean;
};

export const work = [
  { key: "performance", start: "2026-07", end: "2026-12", current: true },
  { key: "frontend", start: "2025-04", end: "2026-06" },
  { key: "synesthesia", start: "2023-02", end: "2025-03" },
] as const satisfies readonly TimelineItem[];

export const education = [
  { key: "fe", start: "2026-04" },
  { key: "its", start: "2021", end: "2023" },
  { key: "enaip", start: "2020", end: "2021" },
] as const satisfies readonly TimelineItem[];

/** First and last year the timeline covers. */
export function timelineRange(items: readonly TimelineItem[]) {
  const years = items.flatMap(({ start, end }) =>
    [start, end]
      .filter((date) => date !== undefined)
      .map((date) => date.slice(0, 4)),
  );
  return {
    from: years.reduce((a, b) => (a < b ? a : b)),
    to: years.reduce((a, b) => (a > b ? a : b)),
  };
}
