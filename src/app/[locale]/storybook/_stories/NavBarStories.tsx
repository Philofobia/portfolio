/**
 * 09 NavBar, mirroring the design library's section: specimens, not the live header.
 * Built from the header's own parts (Logo, Nav, CityClock, LocaleSwitcher, ThemeToggle,
 * IconButton + BurgerIcon, MenuSheet) in fixed states: Work current, the design's 22:41
 * in Tokyo. Nothing here tracks the scroll, ticks or opens. Cell sizes follow the window
 * like the real header: 56 below md, one 75 cell from md.
 * Desktop: the bar as a 1440 window shows it (16 cells: Tokyo's clock only). Mobile
 * closed: the bar below the nav's width. Mobile open: the sheet, in place of its dialog.
 * The table lists what the live bar shows at each of its widths.
 */
import { useTranslations } from "next-intl";
import { BurgerIcon } from "@/components/atoms/BurgerIcon";
import { IconButton } from "@/components/atoms/IconButton";
import { LocaleSwitcher } from "@/components/atoms/LocaleSwitcher";
import { Logo } from "@/components/atoms/Logo";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { CityClock } from "@/components/molecules/CityClock";
import { Nav } from "@/components/molecules/Nav";
import { MenuSheet } from "@/components/organisms/MenuSheet";
import { Story, StoryRow, StoryTable } from "../_components/Story";

const designInstant = new Date("2026-09-26T13:41:00Z");

const widths = [
  { label: "< 768 · mobile", shows: "logo · 日本語 · theme · burger → sheet" },
  { label: "bar < 61rem", shows: "logo · 日本語 · theme · burger → sheet" },
  { label: "bar ≥ 61rem (@nav)", shows: "logo · nav · 日本語 · theme" },
  {
    label: "bar ≥ 70.3125rem (@clock)",
    shows: "logo · nav · Tokyo · 日本語 · theme",
  },
  {
    label: "bar ≥ 80rem (@clocks)",
    shows: "logo · nav · Torino · Tokyo · 日本語 · theme",
  },
];

export function NavBarStories() {
  const t = useTranslations("header");

  return (
    <Story
      id="navbar"
      index="09"
      name="NavBar"
      file="organisms/Header · molecules/Nav · organisms/MenuSheet · uses 07, 08"
    >
      <figure className="flex flex-col gap-3">
        <div className="overflow-x-auto border border-line bg-bg">
          <div className="flex h-cell min-w-max">
            <Logo className="w-logo border-e border-line ps-cell-pad" />
            <Nav variant="bar" current="work" className="flex" />
            <div className="ms-auto flex">
              <CityClock
                city={t("clocks.tokyo")}
                timeZone="Asia/Tokyo"
                now={designInstant}
                highlight
                className="border-s border-line"
              />
              <LocaleSwitcher frame="bar" />
              <ThemeToggle frame="bar" />
            </div>
          </div>
        </div>
        <figcaption className="font-mono text-meta text-ink-3">
          desktop · sticky · active item = 2px accent underline, set by the
          scrollspy (useScrollSpy)
        </figcaption>
      </figure>

      <div className="flex flex-wrap items-start gap-x-section gap-y-6">
        <figure className="flex flex-col gap-3">
          <div className="flex h-14 w-96 border border-line bg-bg md:h-cell">
            <Logo className="flex-1 ps-cell-pad" />
            <LocaleSwitcher frame="bar" />
            <ThemeToggle frame="bar" />
            <IconButton frame="bar" label={t("menu.open")}>
              <BurgerIcon />
            </IconButton>
          </div>
          <figcaption className="font-mono text-meta text-ink-3">
            mobile · closed
          </figcaption>
        </figure>

        <figure className="flex flex-col gap-3">
          <MenuSheet
            current="work"
            className="w-96 border-x border-t border-line bg-bg"
          />
          <figcaption className="font-mono text-meta text-ink-3">
            mobile · open · full-screen sheet, rows stagger in 40ms
          </figcaption>
        </figure>
      </div>

      <StoryTable
        caption="The live bar, by its own width (container queries)."
        rowHeader="Bar width"
        columns={["Shows"]}
      >
        {widths.map(({ label, shows }) => (
          <StoryRow key={label} label={label}>
            <span className="font-mono text-meta text-ink-2">{shows}</span>
          </StoryRow>
        ))}
      </StoryTable>
    </Story>
  );
}
