/**
 * 'Download CV' block: three <DocumentCard /> (rirekisho, shokumukeirekisho, resume).
 *
 * As built (Portfolio Desktop / Mobile, inside the Japan section): an <h3> ("Download CV" /
 * 応募書類) and a list of the three PDFs from content/profile cv: 履歴書, 職務経歴書 and
 * the English CV (the joined 応募書類 file stays the hero's). Each card is an <h4> link
 * that downloads the file under its cv fileName; hreflang is the document's language, and
 * a title in another script than the page's carries lang (履歴書 on the English page).
 * File sizes are read from public/ when the page is prerendered (lib/file-size) and
 * formatted per locale, so they follow every rebuild of the PDFs.
 * Layout in documents.styles.ts. Server component, no client code.
 */
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { DocumentCard } from "@/components/molecules/DocumentCard";
import { cv } from "@/content/profile";
import { cn } from "@/lib/cn";
import { publicFileSize } from "@/lib/file-size";
import {
  documentsGrid,
  documentsHeading,
  documentsList,
} from "./documents.styles";

const documents = ["rirekisho", "shokumukeirekisho", "en"] as const;

export function Documents({ className }: { className?: string }) {
  const t = useTranslations("japan.documents");
  const format = useFormatter();
  const locale = useLocale();

  return (
    <div className={cn(documentsGrid, className)}>
      <h3 className={documentsHeading}>{t("title")}</h3>
      <ul role="list" className={documentsList}>
        {documents.map((key) => {
          const { href, fileName, lang } = cv[key];
          return (
            <li key={key}>
              <DocumentCard
                href={href}
                fileName={fileName}
                hrefLang={lang}
                title={t(`${key}.title`)}
                titleLang={lang === "ja" && locale !== "ja" ? lang : undefined}
                description={t(`${key}.description`)}
                format="PDF"
                size={format.number(publicFileSize(href) / 1024, {
                  style: "unit",
                  unit: "kilobyte",
                  maximumFractionDigits: 0,
                })}
                headingLevel="h4"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
