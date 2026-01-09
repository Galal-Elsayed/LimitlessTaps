import Hero from "@/components/Home/Hero/Hero";
import Arc from "@/components/Home/ArcHalfGlobe/Arc";
import ScrollCarousel from "@/components/Home/StickyPhone/ScrollCarousel";
import Carousel from "@/components/Home/Carousel/Carousel";

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Hero />
      <Carousel />
      <ScrollCarousel />
      <Arc />
    </div>
  );
}
