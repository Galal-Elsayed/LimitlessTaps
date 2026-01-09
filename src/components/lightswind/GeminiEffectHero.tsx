"use client";
import { useScroll, useTransform } from "motion/react";
import React from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

export function GeminiEffectHero() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLength1 = useTransform(scrollYProgress, [0, 0.4], [0.05, 1.2]);
  const pathLength2 = useTransform(scrollYProgress, [0, 0.4], [0.15, 1.4]);
  const pathLength3 = useTransform(scrollYProgress, [0, 0.4], [0.1, 1.2]);
  const pathLength4 = useTransform(scrollYProgress, [0, 0.4], [0.02, 1.3]);
  const pathLength5 = useTransform(scrollYProgress, [0, 0.4], [0.1, 1.4]);

  return (
    <div
      className="h-[180vh] bg-[#0a0a0a] w-full relative pt-40 overflow-clip"
      ref={ref}
    >
      <GoogleGeminiEffect
        pathLengths={[
          pathLength1,
          pathLength2,
          pathLength3,
          pathLength4,
          pathLength5,
        ]}
        title="Limitless Taps"
        description="Your ultimate beverage solution. Scroll to see the magic."
        
      />
    </div>
  );
}
