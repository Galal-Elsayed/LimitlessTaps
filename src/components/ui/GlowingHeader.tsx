"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface GlowingHeaderProps {
    children: React.ReactNode;
    className?: string;
    textSize?: string;
}

export function GlowingHeader({ children, className, textSize = "text-4xl md:text-7xl" }: GlowingHeaderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"]
    });

    // Make opacity persist once visible
    const opacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

    return (
        <div ref={containerRef} className={cn("relative z-10 mb-6 ", className)}>
            <h2 className={cn(textSize, "uppercase font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/20 to-white/10 opacity-50 ")}>
                {children}
            </h2>
            <motion.h2
                style={{ opacity }}
                className={cn("absolute inset-0 uppercase font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]", textSize)}
                aria-hidden="true"
            >
                {children}
            </motion.h2>
        </div>
    );
}
