"use client";

import React from "react";
import { BackgroundPaths } from "@/components/ui/background-paths";

export default function CareersHero() {
  return (
    <div style={{ backgroundColor: "#0a0a0a" }}>
      {/* Hero Section with No Jobs Card */}
      <BackgroundPaths title="Build The Future With Us">
        <div className="inline-block relative bg-white/5 dark:bg-black/5 p-8 rounded-2xl backdrop-blur-md border border-white/10 max-w-2xl mx-auto shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            No Open Positions
          </h3>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            We don&apos;t have any open roles at the moment. Please check back
            later for future opportunities.
          </p>
        </div>
      </BackgroundPaths>
    </div>
  );
}
