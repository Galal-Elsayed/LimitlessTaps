"use client";

import { useState, useEffect, useMemo } from "react";

/**
 * Detects if the user prefers reduced motion
 * Respects system accessibility settings
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

export interface DevicePerformance {
  isLowEnd: boolean;
  isMobile: boolean;
  hasLowMemory: boolean;
  cpuCores: number;
  devicePixelRatio: number;
  connectionType: string | null;
  performanceTier: "low" | "medium" | "high";
}

/**
 * Detects device performance capabilities
 * Helps determine what animations/effects to show
 */
export function useDevicePerformance(): DevicePerformance {
  const [performance, setPerformance] = useState<DevicePerformance>({
    isLowEnd: false,
    isMobile: false,
    hasLowMemory: false,
    cpuCores: 4,
    devicePixelRatio: 1,
    connectionType: null,
    performanceTier: "high",
  });

  useEffect(() => {
    const detectPerformance = (): DevicePerformance => {
      // Detect mobile
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768;

      // Get hardware concurrency (CPU cores)
      const cpuCores = navigator.hardwareConcurrency || 4;

      // Check device memory (if available)
      const deviceMemory = (navigator as Navigator & { deviceMemory?: number })
        .deviceMemory;
      const hasLowMemory = deviceMemory ? deviceMemory <= 4 : false;

      // Get device pixel ratio
      const devicePixelRatio = window.devicePixelRatio || 1;

      // Check connection type
      const connection = (
        navigator as Navigator & {
          connection?: {
            effectiveType?: string;
            saveData?: boolean;
          };
        }
      ).connection;
      const connectionType = connection?.effectiveType || null;
      const saveData = connection?.saveData || false;

      // Check if slow connection
      const isSlowConnection =
        connectionType === "slow-2g" ||
        connectionType === "2g" ||
        connectionType === "3g" ||
        saveData;

      // Determine performance tier
      let performanceTier: "low" | "medium" | "high" = "high";

      if (
        cpuCores <= 2 ||
        hasLowMemory ||
        isSlowConnection ||
        (isMobile && devicePixelRatio >= 3)
      ) {
        performanceTier = "low";
      } else if (
        cpuCores <= 4 ||
        isMobile ||
        (deviceMemory && deviceMemory <= 8)
      ) {
        performanceTier = "medium";
      }

      const isLowEnd = performanceTier === "low";

      return {
        isLowEnd,
        isMobile,
        hasLowMemory,
        cpuCores,
        devicePixelRatio,
        connectionType,
        performanceTier,
      };
    };

    setPerformance(detectPerformance());
  }, []);

  return performance;
}

/**
 * Combined hook for optimized animations
 * Returns animation settings based on device capabilities
 */
export function useOptimizedAnimation() {
  const prefersReducedMotion = useReducedMotion();
  const { isLowEnd, performanceTier, isMobile } = useDevicePerformance();

  const settings = useMemo(() => {
    // If reduced motion is preferred, disable all animations
    if (prefersReducedMotion) {
      return {
        shouldAnimate: false,
        shouldUseParticles: false,
        shouldUse3D: false,
        particleCount: 0,
        animationDuration: 0,
        staggerDelay: 0,
        transitionType: "none" as const,
      };
    }

    // Low-end devices: minimal but still visible animations
    // DottedSurface is lightweight enough to render on low-end devices
    if (isLowEnd || performanceTier === "low") {
      return {
        shouldAnimate: true,
        shouldUseParticles: true, // Changed: Allow particles on low-end with reduced count
        shouldUse3D: false,
        particleCount: 200, // Increased: Minimum visible particle count
        animationDuration: 0.3,
        staggerDelay: 0.02,
        transitionType: "tween" as const,
      };
    }

    // Medium devices: reduced animations
    if (performanceTier === "medium" || isMobile) {
      return {
        shouldAnimate: true,
        shouldUseParticles: true,
        shouldUse3D: false,
        particleCount: 800, // Increased for better visibility
        animationDuration: 0.5,
        staggerDelay: 0.03,
        transitionType: "spring" as const,
      };
    }

    // High-end devices: full animations
    return {
      shouldAnimate: true,
      shouldUseParticles: true,
      shouldUse3D: true,
      particleCount: 2000,
      animationDuration: 0.8,
      staggerDelay: 0.05,
      transitionType: "spring" as const,
    };
  }, [prefersReducedMotion, isLowEnd, performanceTier, isMobile]);

  return settings;
}

/**
 * Hook to detect if animations should be completely disabled
 */
export function useShouldAnimate(): boolean {
  const prefersReducedMotion = useReducedMotion();
  const { isLowEnd } = useDevicePerformance();

  return !prefersReducedMotion && !isLowEnd;
}
