/**
 * 04 — <SectionHeading> · '2021 — NOW' range + intro · WORK list of <TimelineEntry /> · EDUCATION list.
 *
 * As built (Portfolio Desktop / Mobile): the heading ('04.' · Experience · a line pointing
 * to the 職務経歴書 among the CVs, Japanese marked with lang on the English page), the range
 * of years (read from content/experience) and a two-sentence intro, then the timeline: a
 * Work and an Education group, each an ordered list of entries (<h4>s), newest first. Data
 * in content/experience, copy in messages experience (bullets are arrays, each rendered with
 * t.rich, so a bullet can mark Japanese words with <ja>, as the subtitle does). The education
 * group also holds the FE exam ("Education and certification").
 * Each group is an accordion item at every width (Marco, 2026-11-23): a native <details>,
 * Work open and Education closed on load, not exclusive (MWG accordion: both may be open).
 * Its <summary> is the group's row ('−' / '+' marker, then the label); the label is summary
 * text, never a heading inside it (JAWS and TalkBack drop headings in <summary>), and a
 * visually hidden <h3> repeats it inside the content, so an open group keeps its place in
 * the outline (as StackGroupCard). Closed content stays findable with find-in-page. No
 * script: the browser opens and closes it.
 * One structure at every width, three layouts (experience.styles.ts): a rail below md, the
 * bordered list with the intro above it from md, the design's two columns from 16 cells
 * (container query on the grid column). The design's mobile puts "· EDUCATION" into each
 * period; here the group rows show on the rail instead, so the page carries them once.
 * Japanese wraps by phrase (word-break: auto-phrase, inherited by every line of the
 * section; Chromium only, elsewhere the default per-character breaks), so a value like
 * 2026年12月 or a heading like 日本での就労について never splits mid-word.
 * Server component, no client code. The list rises into place as it scrolls in
 * (motion.css .reveal-rise, CSS only).
 */
import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { TimelineEntry } from "@/components/molecules/TimelineEntry";
import {
  education,
  timelineRange,
  type TimelineItem,
  work,
} from "@/content/experience";
import { cn } from "@/lib/cn";
import {
  experienceEntry,
  experienceGrid,
  experienceGroup,
  experienceIntro,
  experienceList,
  experienceMarker,
  experienceSummary,
} from "./experience.styles";

export function Experience() {
  const t = useTranslations("experience");
  const locale = useLocale();
  const { from, to } = timelineRange([...work, ...education]);
  // Japanese words on the English page carry lang="ja" (on /jp the page is already ja).
  const ja = (chunks: ReactNode) =>
    locale === "ja" ? chunks : <span lang="ja">{chunks}</span>;
  // Each bullet by its index in the array, through t.rich (t.raw would show <ja> as text).
  const bullets = (path: Parameters<typeof t.raw>[0]) =>
    (t.raw(path) as string[]).map((_, index) =>
      t.rich(`${path}.${index}` as Parameters<typeof t.rich>[0], { ja }),
    );

  // Each group translated with its own literal keys (content/experience mirrors the
  // message tree, so a missing entry is a type error).
  const workEntries = work.map((item) => ({
    ...item,
    title: t(`work.${item.key}.title`),
    org: t(`work.${item.key}.org`),
    bullets: bullets(`work.${item.key}.bullets`),
  }));
  const educationEntries = education.map((item) => ({
    ...item,
    title: t(`education.${item.key}.title`),
    org: t(`education.${item.key}.org`),
    bullets: bullets(`education.${item.key}.bullets`),
  }));

  const group = (
    label: string,
    entries: (TimelineItem & {
      title: string;
      org: string;
      bullets: ReactNode[];
    })[],
    open: boolean,
  ) => (
    <details open={open} className="group">
      <summary className={experienceSummary}>
        <span aria-hidden="true" className={experienceMarker}>
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">−</span>
        </span>
        {label}
      </summary>
      <h3 className="sr-only">{label}</h3>
      <ol role="list" className={experienceGroup}>
        {entries.map(({ key, ...entry }) => (
          <TimelineEntry
            key={key}
            {...entry}
            headingLevel="h4"
            className={experienceEntry}
          />
        ))}
      </ol>
    </details>
  );

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="-scroll-mt-cell pt-section snap-block-cells md:-scroll-mt-section ja:[word-break:auto-phrase]"
    >
      <div className="grid-container @container">
        <SectionHeading
          index={t("number")}
          title={t("title")}
          aside={t.rich("subtitle", { ja })}
          titleId="experience-title"
        />
        <div className={experienceGrid}>
          <div className={experienceIntro}>
            <p className="font-mono text-meta text-ink-3">
              {t.rich("range", { from: () => from, to: () => to })}
            </p>
            <p className="max-w-measure text-ink-2">{t("intro")}</p>
          </div>
          <div className={cn(experienceList, "reveal-rise")}>
            {group(t("workLabel"), workEntries, true)}
            {group(t("educationLabel"), educationEntries, false)}
          </div>
        </div>
      </div>
    </section>
  );
}
