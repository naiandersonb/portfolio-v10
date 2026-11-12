import { SiteFooter } from "@/layout/site-footer";
import { SiteHeader } from "@/layout/site-header";
import { Hero } from "@/sections/hero";

// Anchors the later sections fill in (US4, US5); kept now so in-page links already resolve.
const PENDING_SECTION_IDS = [
  "about",
  "services",
  "experience",
  "education",
  "contact",
] as const;

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="flex-1">
        <Hero />
        {PENDING_SECTION_IDS.map((id) => (
          <div key={id} id={id} />
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
