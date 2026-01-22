"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const data = [
  {
    id: 1,
    titleKey: "build_step_1_title",
    textKey: "build_step_1_text",
    type: "image",
    src: "/Home/How-We-Build/wireframe-apps-and-tools.png",
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    id: 2,
    titleKey: "build_step_2_title",
    textKey: "build_step_2_text",
    type: "image",
    src: "/Home/How-We-Build/board-with-mobile-app-development.png",
    gradient: "from-purple-600 to-pink-600",
  },
  {
    id: 3,
    titleKey: "build_step_3_title",
    textKey: "build_step_3_text",
    type: "video",
    src: "/Home/How-We-Build/building-website-with-interface-elements-1.mp4",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 4,
    titleKey: "build_step_4_title",
    textKey: "build_step_4_text",
    type: "video",
    src: "/Home/How-We-Build/laptop-tablet-and-phone-with-synced-screens-multi-device-compatibility-cross-platform-functionality.mp4",
    gradient: "from-emerald-600 to-teal-500",
  },
  {
    id: 5,
    titleKey: "build_step_5_title",
    textKey: "build_step_5_text",
    type: "image",
    src: "/Home/How-We-Build/a-b-testing-for-business-optimization-comparing-strategies-with-performance-metrics.png",
    gradient: "from-cyan-500 to-blue-500",
  },
];

export default function HowWeBuild() {
  const t = useTranslations("home");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-4">
        {/* Header */}
        <div className="text-center uppercase mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {t("how_we_build_title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-400 max-w-2xl mx-auto"
          >
            {t("timeline_description")}
          </motion.p>
        </div>

        {/* Accordion / Expanding Cards Layout */}
        <div className="flex flex-col md:flex-row gap-4 h-[600px] w-full">
          {data.map((item, index) => (
            <motion.div
              key={item.id}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => setHoveredIndex(index)} // For mobile tap
              className={cn(
                "relative rounded-3xl overflow-hidden cursor-pointer transition-[flex] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group",
                hoveredIndex === index ? "flex-[3]" : "flex-[1]",
              )}
            >
              {/* Background & Media */}
              <div className="absolute inset-0 bg-neutral-900">
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={t(item.titleKey)}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  />
                )}
                {/* Gradient Overlay */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t via-black/20 to-transparent transition-opacity duration-500",
                    hoveredIndex === index ? "from-black/80 opacity-90" : "from-black/90 opacity-100",
                  )}
                />
              </div>

              {/* Collapsed State (Vertical Text) */}
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                  hoveredIndex === index ? "opacity-0 pointer-events-none" : "opacity-100",
                )}
              >
                <div className="transform -rotate-90 whitespace-nowrap">
                  <span className="text-2xl font-bold text-white/50 tracking-widest uppercase">
                    0{item.id} • {t(item.titleKey)}
                  </span>
                </div>
              </div>

              {/* Expanded State Content */}
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end transition-all duration-500",
                  hoveredIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                )}
              >
                {/* Badge */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4 shadow-lg bg-gradient-to-br",
                    item.gradient,
                  )}
                >
                  0{item.id}
                </div>

                <h3 className="text-3xl font-bold text-white mb-3">{t(item.titleKey)}</h3>
                <p className="text-lg text-neutral-300 leading-relaxed max-w-xl">{t(item.textKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
