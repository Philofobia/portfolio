/**
 * 16 DocCard (molecules/DocumentCard), mirroring the design library's section: the three
 * CV cards. Hover or Tab to a card for its hover state (the file size appears, ⤓ turns
 * accent and drops 3px); under 48rem each card is a 56-high row.
 * The PDFs are not in public/cv yet: the links point at their future paths.
 */
import { DocumentCard } from "@/components/molecules/DocumentCard";
import { Story } from "../_components/Story";

export function DocCardStories() {
  return (
    <Story
      id="doc-card"
      index="16"
      name="DocCard"
      file="molecules/DocumentCard · uses 02"
    >
      <figure className="flex flex-col gap-3">
        <ul
          role="list"
          className="cells auto-rows-auto grid-cols-1 md:grid-cols-[repeat(auto-fill,calc(var(--cell)*5))]"
        >
          <li>
            <DocumentCard
              href="/cv/rirekisho.pdf"
              title="履歴書"
              titleLang="ja"
              description="Rirekisho, JIS format"
              format="PDF"
              size="180 KB"
            />
          </li>
          <li>
            <DocumentCard
              href="/cv/shokumukeirekisho.pdf"
              title="職務経歴書"
              titleLang="ja"
              description="Work history, Japanese"
              format="PDF"
              size="240 KB"
            />
          </li>
          <li>
            <DocumentCard
              href="/cv/resume.pdf"
              title="Résumé"
              description="CV, English"
              format="PDF"
              size="150 KB"
            />
          </li>
        </ul>
        <figcaption className="font-mono text-meta leading-normal text-ink-3">
          default · hover / focus: file size appears, ⤓ accent · mobile: a row,
          title · PDF ⤓ · one link per card, named by its title
        </figcaption>
      </figure>
    </Story>
  );
}
