import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { Story } from "../_components/Story";

export function LocaleSwitcherStories() {
  return (
    <Story
      id="locale-switcher"
      index="08"
      name="LocaleSwitcher"
      file="layout/LocaleSwitcher.tsx"
    >
      <figure className="flex flex-col gap-3">
        <div className="flex border border-line bg-bg p-4">
          <LocaleSwitcher />
        </div>
        <figcaption className="font-mono text-meta text-ink-3">
          Shows the language you can switch TO, in that language · same
          pathname, other locale (/en ⇄ /jp) · 56 mobile · 75 desktop
        </figcaption>
      </figure>
    </Story>
  );
}
