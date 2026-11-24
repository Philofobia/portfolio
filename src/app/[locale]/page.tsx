/**
 * HOME PAGE — single-page layout. Stacks the 7 numbered sections in order:
 * 01 Hero · 02 Work · 03 Stack · 04 Experience · 05 Japan · 06 About · 07 Contact
 * Each section is a full-height panel with an id used by the header nav anchors.
 * The Header comes first, above <main id="main"> (its skip link's target).
 * Built so far: 01 Hero, 02 Work, 03 Stack, 04 Experience, 05 Japan.
 */
import { Experience } from "@/components/organisms/Experience";
import { Header } from "@/components/organisms/Header";
import { Hero } from "@/components/organisms/Hero";
import { Japan } from "@/components/organisms/Japan";
import { Stack } from "@/components/organisms/Stack";
import { Work } from "@/components/organisms/Work";

export default function Page() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Work />
        <Stack />
        <Experience />
        <Japan />
      </main>
    </>
  );
}
