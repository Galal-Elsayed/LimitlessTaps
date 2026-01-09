import Hero from "@/components/Home/Hero/Hero";
import Arc from "@/components/Home/ArcHalfGlobe/Arc";
import StickyPhone from "@/components/Home/StickyPhone/StickyPhone";
import Carousel from "@/components/Home/Carousel/Carousel";

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Hero />
      <Carousel />
      <StickyPhone />
      <Arc />
    </div>
  );
}
