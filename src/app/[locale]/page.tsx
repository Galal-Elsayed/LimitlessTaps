import Hero from "@/components/Home/Hero/Hero";
import Arc from "@/components/Home/ArcHalfGlobe/Arc";
import StickyPhone from "@/components/Home/StickyPhone/StickyPhone";
import HowWeBuild from "@/components/Home/HowWeBuild/HowWeBuild";
import WhatWeDeliver from "@/components/Home/WhatWeDeliver/WhatWeDeliver";
export default async function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Hero />
      <WhatWeDeliver />
      <StickyPhone />
      <HowWeBuild />
      <Arc />
    </div>
  );
}
