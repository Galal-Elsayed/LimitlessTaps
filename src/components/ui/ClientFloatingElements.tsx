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
 * - Mobile low-end: Load after 6s (smaller size for performance)
 * - Mobile medium: Load after 4s
 * - Mobile high-end: Load after 3s
 * - Desktop low-end: Load after 5s
 * - Desktop medium: Load after 3s
 * - Desktop high-end: Load after 2s
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
    // Defer loading based on device performance to prioritize main content
    // Mobile devices get longer delays but still show the robot
    let delay = 2000; // High-end desktop: 2 seconds after page load
    
    if (isMobile) {
      // Mobile devices: longer delays for better initial load
      if (performanceTier === "low") {
        delay = 6000; // Low-end mobile: 6 seconds
      } else if (performanceTier === "medium") {
        delay = 4000; // Medium mobile: 4 seconds
      } else {
        delay = 3000; // High-end mobile: 3 seconds
      }
    } else {
      // Desktop devices
      if (performanceTier === "low") {
        delay = 5000; // Low-end desktop: 5 seconds
      } else if (performanceTier === "medium") {
        delay = 3000; // Medium desktop: 3 seconds
      }
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
