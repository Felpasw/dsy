import { AboutSection } from "@/components/ui/about-section";
import { InstaFixed } from "@/components/ui/insta-fixed";
import { DemoOne } from "@/components/ui/music-reactive-hero-section-demo";
// import { Demo as RulerCarouselDemo } from "@/components/ui/ruler-carousel-demo";

export default function Home() {
  return (
    <>
      <DemoOne />
      {/* <RulerCarouselDemo /> */}
      <AboutSection />
      <InstaFixed />
    </>
  );
}
