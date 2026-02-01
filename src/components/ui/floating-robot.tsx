"use client";

import { SplineScene } from "@/components/ui/splite";

export function FloatingRobot() {
  return (
    <div className="fixed bottom-0 right-0 w-40 h-40 md:w-60 md:h-60 z-50 pointer-events-none">
      <div className="relative w-full h-full brightness-[2.5] contrast-[0.9] saturate-[0]">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full pointer-events-auto"
        />
      </div>
    </div>
  );
}
