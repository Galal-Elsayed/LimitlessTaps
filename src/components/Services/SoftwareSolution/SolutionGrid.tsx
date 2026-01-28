"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import {
  AnimatedDatabase,
  AnimatedChart,
  AnimatedScale,
  AnimatedWorkflow,
  AnimatedShield,
  AnimatedCloud,
} from "./AnimatedIcons";

export const SolutionGrid = ({ className }: { className?: string }) => {
  const t = useTranslations("SoftwareSolutions.grid.items");

  const gridItems = [
    {
      title: t("unified.title"),
      description: t("unified.description"),
      shape: <AnimatedDatabase />,
    },
    {
      title: t("realtime.title"),
      description: t("realtime.description"),
      shape: <AnimatedChart />,
    },
    {
      title: t("scalable.title"),
      description: t("scalable.description"),
      shape: <AnimatedScale />,
    },
    {
      title: t("automated.title"),
      description: t("automated.description"),
      shape: <AnimatedWorkflow />,
    },
    {
      title: t("security.title"),
      description: t("security.description"),
      shape: <AnimatedShield />,
    },
    {
      title: t("cloud.title"),
      description: t("cloud.description"),
      shape: <AnimatedCloud />,
    },
  ];

  return (
    <div className="relative w-full flex flex-col items-center mt-4 min-[500px]:mt-8 md:mt-24 bg-[#0a0a0a] pb-44">
      {/* Connecting Line from Data Component to Grid - hidden between 500px and 900px */}
      <div className="absolute -top-4 min-[900px]:-top-24 left-1/2 w-px h-4 min-[900px]:h-24 bg-gradient-to-b from-white/20 via-white/40 to-white/10 -translate-x-1/2 min-[500px]:hidden min-[900px]:block" />
      <div className="absolute -top-1 left-1/2 w-3 h-3 bg-white/50 rounded-full blur-sm -translate-x-1/2 min-[500px]:hidden min-[900px]:block" />

      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[90rem] mx-auto px-6 z-10", className)}>
        {gridItems.map((item, index) => (
          <div
            key={index}
            className="group relative flex flex-col justify-end p-8 min-h-[300px]  bg-neutral-900/50 border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
          >
            {/* Card Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Abstract Shape Positioned like SeoCards (Top Right or Background) */}
            <div className="absolute top-0 right-0 p-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700">
              {item.shape}
            </div>

            <div className="relative z-10 mt-auto">
              <h3 className="mb-3 text-2xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">
                {item.title}
              </h3>

              <p className="text-sm leading-relaxed text-white/60 group-hover:text-white/90 transition-colors duration-300 max-w-sm">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default SolutionGrid;
