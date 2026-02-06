"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDevicePerformance } from "@/hooks/use-performance";

/**
 * Client-side only floating elements wrapper.
 * Using dynamic imports with ssr: false is only allowed in Client Components.
 * This wrapper enables deferred loading of heavy 3D/animation components.
 * 
 * FloatingRobot (Spline 3D) is the heaviest component (~1-2MB runtime).
 * We defer its loading to improve first paint:
 * - On low-end devices: Load after 5s or skip entirely
 * - On medium devices: Load after 3s
 * - On high-end devices: Load after 2s (after main content is interactive)
 */
const FloatingRobot = dynamic(
  () =>
    import("@/components/ui/floating-robot").then((mod) => ({
      default: mod.FloatingRobot,
    })),
  {
    ssr: false,
    loading: () => null, // No loading placeholder needed for floating elements
  }
);

const FloatingIcons = dynamic(
  () =>
    import("@/components/ui/floatingIcons").then((mod) => ({
      default: mod.FloatingIcons,
    })),
  {
    ssr: false,
    loading: () => null,
  }
);

export function ClientFloatingElements() {
  const [shouldLoadRobot, setShouldLoadRobot] = useState(false);
  const { performanceTier, isMobile } = useDevicePerformance();

  useEffect(() => {
    // Skip loading FloatingRobot (Spline 3D) on low-end mobile devices
    // as it's a heavy 3D scene that impacts scrolling performance
    if (isMobile && performanceTier === "low") {
      // Don't load at all on low-end mobile
      return;
    }

    // Defer loading based on device performance to prioritize main content
    let delay = 2000; // High-end: 2 seconds after page load
    if (performanceTier === "low") {
      delay = 5000; // Low-end: 5 seconds
    } else if (performanceTier === "medium") {
      delay = 3000; // Medium: 3 seconds
    }

    // Use requestIdleCallback if available for even better timing
    if ("requestIdleCallback" in window) {
      const idleId = requestIdleCallback(
        () => {
          setShouldLoadRobot(true);
        },
        { timeout: delay }
      );
      return () => cancelIdleCallback(idleId);
    } else {
      // Fallback to setTimeout
      const timer = setTimeout(() => {
        setShouldLoadRobot(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [performanceTier, isMobile]);

  return (
    <>
      {shouldLoadRobot && <FloatingRobot />}
      <FloatingIcons />
    </>
  );
}
