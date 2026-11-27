/**
 * Structured data as a <script type="application/ld+json">, rendered on the server so it
 * is in the prerendered HTML that crawlers which run no JavaScript read
 * (geo-agent-readiness rule 1; nextjs-react seo-geo.md, "JSON-LD").
 * Every "<" is escaped as <, so a value holding "</script>" cannot close the tag.
 * Not next/script (that is for executable scripts) and never filled in an effect.
 * A data block, not JavaScript: nothing runs it, in the server HTML or after a client
 * render (the en ⇄ jp switch re-renders the page on the client).
 * Props: data, the JSON-LD object (lib/metadata personJsonLd).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
