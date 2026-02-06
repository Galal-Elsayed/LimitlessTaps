"use client";

import { SplineScene } from "@/components/ui/splite";

export function FloatingRobot() {
  return (
    // Responsive sizing: Mobile: 32x32 (original), Desktop: 48x48
    <div className="fixed bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 z-50 pointer-events-none">
      <div className="relative w-full h-full brightness-[1.5] contrast-100 saturate-[0]">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full pointer-events-auto"
        />
      </div>
    </div>
  );
}
