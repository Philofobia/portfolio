/**
 * Header nav items: { id: 'work'|'stack'|'experience'|'contact', href: '#work' ... }.
 *
 * The id is the section's id (the anchor) and the key of its label in messages
 * header.nav; number is the section's panel number, shown in the mobile menu.
 * Hero, Japan and About have panels but no nav entry.
 */
export const navItems = [
  { id: "work", href: "#work", number: "02" },
  { id: "stack", href: "#stack", number: "03" },
  { id: "experience", href: "#experience", number: "04" },
  { id: "contact", href: "#contact", number: "07" },
] as const satisfies readonly {
  id: string;
  href: `#${string}`;
  number: string;
}[];

export type NavId = (typeof navItems)[number]["id"];

export const navIds: readonly NavId[] = navItems.map(({ id }) => id);
