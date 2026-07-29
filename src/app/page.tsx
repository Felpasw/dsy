import { AboutSection } from "@/components/ui/about-section";
import { ExperienceHero } from "@/components/ui/experience-hero";
import { InstaFixed } from "@/components/ui/insta-fixed";
// import { DemoOne } from "@/components/ui/music-reactive-hero-section-demo";
import { ProcessSection } from "@/components/ui/process-section";
import { ServicesSection } from "@/components/ui/services-section";
import { ToolsOrbitSection } from "@/components/ui/tools-orbit-section";
// import { Demo as RulerCarouselDemo } from "@/components/ui/ruler-carousel-demo";

export default function Home() {
  return (
    <>
      <ExperienceHero />
      {/* <DemoOne /> */}
      {/* <RulerCarouselDemo /> */}
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <ToolsOrbitSection />
      <InstaFixed />
    </>
  );
}
