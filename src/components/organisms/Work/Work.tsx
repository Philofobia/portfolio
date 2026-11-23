/**
 * 02 — <SectionHeading> · <Counter> · <WorkCarousel /> · <ProjectListItem /> list.
 *
 * As built (Portfolio Wireframes 7a): the heading ('02.' · Selected work · the one-line
 * pitch as its aside), then the carousel, which holds the project list itself.
 * Server component: it renders every <ProjectCard /> here, from content/projects (data) and
 * messages work.projects (copy), and hands them to WorkCarousel as elements, so the cards'
 * text is in the prerendered HTML and none of it ships as client JavaScript; the carousel
 * gets its strings as props too (no client messages namespace).
 * The section is named by its <h2> (aria-labelledby) and is the nav's #work target.
 * No card image is eager: the hero's emblem is the page's LCP, and the cards sit below the
 * first view, so they load lazily (slides 2–4 when they near the track's viewport).
 * The carousel rises into place as it scrolls in (motion.css .reveal-rise, CSS only); the
 * cards inside run the slide motion (ProjectCard motion="slide").
 */
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ProjectCard } from "@/components/organisms/ProjectCard";
import { WorkCarousel } from "@/components/organisms/WorkCarousel";
import { projectAnchor, projects } from "@/content/projects";

export function Work() {
  const t = useTranslations("work");
  const total = projects.length;

  const items = projects.map((project, i) => {
    const index = i + 1;
    const title = t(`projects.${project.slug}.title`);
    return {
      anchor: projectAnchor(project.slug),
      title,
      slideLabel: t("slideLabel", { index, total }),
      card: (
        <ProjectCard
          index={index}
          total={total}
          title={title}
          description={t(`projects.${project.slug}.description`)}
          role={t(`projects.${project.slug}.role`, { year: project.year })}
          image={{ src: project.image, alt: "" }}
          icons={[...project.tech]}
          links={project.links}
          motion="slide"
          className="h-full"
        />
      ),
    };
  });

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="-scroll-mt-cell pt-section md:-scroll-mt-section"
    >
      <div className="grid-container">
        <SectionHeading
          index={t("number")}
          title={t("title")}
          aside={t("subtitle")}
          titleId="work-title"
        />
        <WorkCarousel
          className="reveal-rise"
          items={items}
          labels={{
            carousel: t("carousel"),
            slide: t("slide"),
            track: t("trackLabel"),
            list: t("listLabel"),
            previous: t("previous"),
            next: t("next"),
            previousLabel: t("previousLabel"),
            nextLabel: t("nextLabel"),
          }}
        />
      </div>
    </section>
  );
}
