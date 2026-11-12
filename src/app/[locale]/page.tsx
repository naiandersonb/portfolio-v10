import { Logo } from "@/layout/logo";
import { SiteFooter } from "@/layout/site-footer";
import { Hero } from "@/sections/hero";

// Anchors the later sections fill in (US4, US5); kept now so in-page links already resolve.
const PENDING_SECTION_IDS = ["about", "services", "experience", "education", "contact"] as const;

export default function HomePage() {
  return (
    <>
      {/* Placeholder header until the command menu lands (US2, T046). */}
      <div className="mx-auto w-full max-w-page px-6 pt-2 lg:px-12">
        <header className="flex min-h-20 items-center border-b border-line">
          <Logo />
        </header>
      </div>
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
