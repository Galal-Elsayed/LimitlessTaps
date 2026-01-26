import Hero from "@/components/Home/Hero/Hero";
import Arc from "@/components/Home/ArcHalfGlobe/Arc";
import StickyPhone from "@/components/Home/Responsive/Responsive";
import Carousel from "@/components/Home/ProjectsCarousel/Carousel";
import WhatWeDeliver from "@/components/Home/WhatWeDeliver/WhatWeDeliver";
import LayoutDesign from "@/components/Home/Desgin/LayoutDesign";
export default async function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Hero />
      <WhatWeDeliver />
      <LayoutDesign />
      <Carousel />
      <StickyPhone />
      <Arc />
    </div>
  );
}
