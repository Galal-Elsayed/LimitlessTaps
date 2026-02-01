"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Header from "@/components/ui/header";

interface ServicesHProps {
  header: React.ReactNode;
  description: string;
  badges: string[];
  hiddenBadges?: string[];
  height?: string; // Optional height prop (e.g., "min-h-screen", "h-[800px]")
  headerClassName?: string; // Optional class overriding for header (font size, etc.)
  descriptionClassName?: string; // Optional class overriding for description (width, etc.)
  notHoverable?: string[]; // Optional list of badges that should not have hover effects
}

export default function ServicesH({
  header,
  description,
  badges,
  hiddenBadges = [],
  height = "min-h-[70vh] md:min-h-[80vh]", // Mobile: 70vh, Desktop: screen height
  headerClassName = "", // Removed default to defer to the main class, or keep empty default
  descriptionClassName = "max-w-xl text-xl md:text-xl", // Larger description on mobile
  notHoverable = [],
}: ServicesHProps) {
  return (
    <section
      className={`relative bg-[#0a0a0a] text-[#bfbfbf] w-full ${height} flex items-center justify-center overflow-hidden perspective-2000`}
    >
      {/* Background Grid Layer - Gap based borders */}
      <div className="absolute inset-0 z-0 flex flex-col">
        <div className="w-full flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-[#1a1a1a] gap-[1px] border border-[#1a1a1a]">
          {badges.map((badge, index) => (
            <ClientItem
              key={index}
              name={badge}
              index={index}
              hidden={hiddenBadges.includes(badge)}
              isHoverable={!notHoverable?.includes(badge)}
            />
          ))}
        </div>
      </div>

      {/* Overlay Content Layer */}
      <div className="relative z-10 w-full max-w-[1800px] px-4 md:px-12 pointer-events-none flex flex-col items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-center"
        >
          <Header
            title={header}
            className={cn(
              "text-[11vw]! md:text-8xl  font-app font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50 tracking-tighter uppercase drop-shadow-2xl text-center leading-[0.85] mb-8",
              headerClassName
            )}
          />
        </motion.div>
      </div>
    </section>
  );
}

function ClientItem({ name, index, hidden, isHoverable = true }: { name: string; index: number; hidden: boolean; isHoverable?: boolean }) {
  // Disable hover if not hoverable or name is empty
  const shouldHover = isHoverable && name && name.trim() !== "";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      // Only apply 'group' class if hover is enabled
      className={cn("relative w-full min-h-[180px] md:min-h-[25vh] bg-[#0a0a0a]", shouldHover && "group")}
      style={{ perspective: "1000px" }}
    >
      {/* 
                3D key structure:
                The inner container transforms to create the pop-out effect.
                On hover, it translates Z (up) and slightly rotates.
             */}
      <div className={cn(
        "relative w-full h-full duration-300 ease-out transition-all transform-style-3d",
        shouldHover && "group-hover:-translate-y-2 group-hover:translate-z-10 group-hover:rotate-x-2 group-hover:shadow-2xl"
      )}>
        {/* The "Key Cap" surface */}
        <div className={cn(
          "absolute inset-0 bg-[#0a0a0a] flex items-center pl-8 md:pl-12 transition-colors duration-300 border border-transparent",
          shouldHover && "group-hover:bg-[#0f0f0f] group-hover:border-[#333]/30"
        )}>
          {/* Intersection Stars */}
          <div className={cn("absolute -top-[5.5px] -left-[5.5px] text-[#333] z-20 transition-opacity", shouldHover && "group-hover:opacity-50")}>
            <PlusIcon />
          </div>

          {/* Text content - Hidden if specified in props */}
          {!hidden && (
            <span className={cn(
              "text-xl md:text-2xl font-light tracking-wide text-[#444] transition-colors duration-300 uppercase z-10 relative select-none",
              shouldHover && "group-hover:text-white"
            )}>
              {name}
            </span>
          )}

          {/* Corner Brackets */}
          <div className={cn("absolute top-2 left-2 w-2 h-2 border-t border-l border-[#333] opacity-20 transition-opacity duration-300", shouldHover && "group-hover:opacity-100")} />
          <div className={cn("absolute top-2 right-2 w-2 h-2 border-t border-r border-[#333] opacity-20 transition-opacity duration-300", shouldHover && "group-hover:opacity-100")} />
          <div className={cn("absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#333] opacity-20 transition-opacity duration-300", shouldHover && "group-hover:opacity-100")} />
          <div className={cn("absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#333] opacity-20 transition-opacity duration-300", shouldHover && "group-hover:opacity-100")} />

          {/* Shiny sheen effect */}
          <div className={cn("absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500", shouldHover && "group-hover:opacity-100")} />
        </div>

        {/* Bottom Depth Face */}
        <div className={cn("absolute inset-x-0 -bottom-2 h-2 bg-[#0a0a0a] origin-top transform rotate-x-90 opacity-0 transition-opacity duration-300", shouldHover && "group-hover:opacity-100")} />
      </div>
    </motion.div>
  );
}

function PlusIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-100"
    >
      <path d="M5.5 0V11" stroke="#333" strokeWidth="1" />
      <path d="M0 5.5H11" stroke="#333" strokeWidth="1" />
    </svg>
  );
}
