/**
 * 17 ContactBlock (molecules/ContactBlock + atoms/CopyButton), mirroring the design library's
 * section. Live: press "Copy email" to see the copied state (2s, then it reverts; the status
 * is announced through a polite live region). The address is a mailto: link, the fallback
 * without the Clipboard API.
 */
import { ContactBlock } from "@/components/molecules/ContactBlock";
import { Story } from "../_components/Story";

export function ContactBlockStories() {
  return (
    <Story
      id="contact-block"
      index="17"
      name="ContactBlock"
      file="molecules/ContactBlock · atoms/CopyButton · uses 02, 04"
    >
      <figure className="@container flex flex-col gap-3">
        <ContactBlock email="hello@example.com" />
        <figcaption className="font-mono text-meta leading-normal text-ink-3">
          idle: accent cell &quot;Copy email&quot; · copied (2s, then reverts):
          bg + accent inset ring, &quot;Copied ✓&quot;, address dims ·
          role=&quot;status&quot; · mailto fallback without the Clipboard API
        </figcaption>
      </figure>
    </Story>
  );
}
