/**
 * 04 Button, mirroring the design library's Button section: variant × state, sizes,
 * trailing icons, the element each href renders, and flush secondaries sharing a border.
 * Hover and focus-visible are live, not mocked: point at a button or Tab to it.
 */
import { Button } from "@/components/ui/button/Button";
import type { ButtonIcon, ButtonSize } from "@/components/ui/button/button.styles";
import { Story, StoryRow, StoryTable } from "../_components/Story";

const sizes: { size: ButtonSize; label: string; use: string }[] = [
  { size: "lg", label: "lg · 75", use: "Desktop hero" },
  { size: "md", label: "md · 56", use: "Mobile CTA" },
  { size: "sm", label: "sm · 50", use: "Card actions" },
];

const icons: { icon: ButtonIcon; text: string }[] = [
  { icon: "↓", text: "View work" },
  { icon: "⤓", text: "Download CV" },
  { icon: "→", text: "Case study" },
  { icon: "↗", text: "Code" },
];

export function ButtonStories() {
  return (
    <Story id="button" index="04" name="Button" file="ui/button/Button.tsx">
      <StoryTable
        caption="Variant × state. Hover and Tab for the live hover and focus-visible states."
        rowHeader="Variant"
        columns={["Default", "Disabled"]}
      >
        <StoryRow label="primary">
          <Button variant="primary" icon="↓">
            View work
          </Button>
          <Button variant="primary" icon="↓" disabled>
            View work
          </Button>
        </StoryRow>
        <StoryRow label="secondary">
          <Button icon="⤓">Download CV</Button>
          <Button disabled>Private —</Button>
        </StoryRow>
      </StoryTable>

      <StoryTable
        caption="Sizes. Height is one cell on desktop; always two cells wide."
        rowHeader="Size"
        columns={["Primary", "Secondary", "Use"]}
      >
        {sizes.map(({ size, label, use }) => (
          <StoryRow key={size} label={label}>
            <Button variant="primary" size={size}>
              {label}
            </Button>
            <Button size={size}>{label}</Button>
            <span className="font-mono text-meta text-ink-3">{use}</span>
          </StoryRow>
        ))}
      </StoryTable>

      <StoryTable
        caption="Trailing icons. Hover nudges each one 3px in its direction."
        rowHeader="Icon"
        columns={["Primary", "Secondary"]}
      >
        {icons.map(({ icon, text }) => (
          <StoryRow key={icon} label={icon}>
            <Button variant="primary" size="sm" icon={icon}>
              {text}
            </Button>
            <Button size="sm" icon={icon}>
              {text}
            </Button>
          </StoryRow>
        ))}
      </StoryTable>

      <StoryTable
        caption="Rendered element, chosen by href and download."
        rowHeader="href"
        columns={["Renders", "Example"]}
      >
        <StoryRow label="(none)">
          <code>{"<button>"}</code>
          <Button>Button</Button>
        </StoryRow>
        <StoryRow label={'"/"'}>
          <code>{"<Link> (i18n)"}</code>
          <Button href="/" icon="→">
            Home
          </Button>
        </StoryRow>
        <StoryRow label={'"#button"'}>
          <code>{"<a>"}</code>
          <Button href="#button" icon="↓">
            Anchor
          </Button>
        </StoryRow>
        <StoryRow label={'"/favicon.ico" + download'}>
          <code>{"<a download>"}</code>
          <Button href="/favicon.ico" download icon="⤓">
            Download
          </Button>
        </StoryRow>
        <StoryRow label={'"https://…"'}>
          <code>{"<a>"}</code>
          <Button href="https://github.com" icon="↗">
            External
          </Button>
        </StoryRow>
      </StoryTable>

      <figure className="flex flex-col gap-3">
        <div className="flex">
          <Button size="sm" icon="→">
            Case study
          </Button>
          <Button size="sm" icon="↗" href="https://github.com">
            Code
          </Button>
          <Button size="sm" disabled>
            Private —
          </Button>
        </div>
        <figcaption className="font-mono text-meta text-ink-3">
          Adjacent secondaries share a border (border-left: 0), for buttons and links alike.
        </figcaption>
      </figure>
    </Story>
  );
}
