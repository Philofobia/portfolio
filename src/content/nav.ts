/**
 * Header nav items: { id: 'work'|'stack'|'experience'|'japan'|'contact', href: '#work' ... }.
 *
 * The id is the section's id (the anchor) and the key of its label in messages
 * header.nav; number is the section's panel number, shown in the mobile menu.
 * Hero has a panel but no nav entry. Japan has one (2026-11-24): what recruiters
 * in Japan check first, and without it the bar marked Experience while Japan was in view.
 * The design's About panel was dropped (2026-11-24), so Contact is 06.
 */
export const navItems = [
  { id: "work", href: "#work", number: "02" },
  { id: "stack", href: "#stack", number: "03" },
  { id: "experience", href: "#experience", number: "04" },
  { id: "japan", href: "#japan", number: "05" },
  { id: "contact", href: "#contact", number: "06" },
] as const satisfies readonly {
  id: string;
  href: `#${string}`;
  number: string;
}[];

type NavId = (typeof navItems)[number]["id"];

export const navIds: readonly NavId[] = navItems.map(({ id }) => id);
