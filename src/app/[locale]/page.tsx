import { SiteFooter } from "@/layout/site-footer";
import { SiteHeader } from "@/layout/site-header";
import { AboutSection } from "@/sections/about-section";
import { EducationSection } from "@/sections/education-section";
import { ExperienceSection } from "@/sections/experience-section";
import { Hero } from "@/sections/hero";
import { ServicesSection } from "@/sections/services-section";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="flex-1">
        <Hero />
        <AboutSection />
        <ServicesSection />
        <ExperienceSection />
        <EducationSection />
        {/* Anchor the contact section fills in (US5); kept now so in-page links already resolve. */}
        <div id="contact" />
      </main>
      <SiteFooter />
    </>
  );
}
