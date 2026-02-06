"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useReducedMotion, useDevicePerformance } from "@/hooks/use-performance";

// Session key to track if preloader has been shown
const PRELOADER_SHOWN_KEY = "preloader_shown";

export const Preloader = () => {
  // Check if preloader was already shown this session
  const hasShownPreloader = useRef(
    typeof window !== "undefined" && sessionStorage.getItem(PRELOADER_SHOWN_KEY) === "true"
  );
  
  const [isLoading, setIsLoading] = useState(!hasShownPreloader.current);
  
  // Use centralized performance hooks
  const prefersReducedMotion = useReducedMotion();
  const { performanceTier } = useDevicePerformance();

  useEffect(() => {
    // Skip preloader entirely on repeat visits in same session
    if (hasShownPreloader.current) {
      document.body.style.overflow = "auto";
      return;
    }

    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    // Adaptive load time based on performance tier:
    // - Reduced motion: 1s (just fade in/out)
    // - Low-end devices: 1.5s (faster for better experience)
    // - Medium devices: 2s
    // - High-end devices: 2.5s (original intent but still faster than 3.5s)
    let loadTime = 2500;
    if (prefersReducedMotion) {
      loadTime = 1000;
    } else if (performanceTier === "low") {
      loadTime = 1500;
    } else if (performanceTier === "medium") {
      loadTime = 2000;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
      // Mark preloader as shown for this session
      sessionStorage.setItem(PRELOADER_SHOWN_KEY, "true");
    }, loadTime);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, [prefersReducedMotion, performanceTier]);

  // Skip animation entirely for reduced motion preference
  if (prefersReducedMotion && !isLoading) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center"
        >
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.1 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.8, ease: "easeOut" }}
            className="relative w-[120vw] h-[120vh] md:w-[900px] md:h-[900px]"
          >
            <Image
              src="/Logo/Main-Logo-Moving-Glow-Opt.gif"
              alt="Limitless Taps"
              fill
              className="object-contain"
              priority
              unoptimized // GIFs need unoptimized flag
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
