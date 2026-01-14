"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowingHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export function GlowingHeader({ children, className }: GlowingHeaderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"]
    });

    // Make opacity persist once visible
    const opacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

    return (
        <div ref={containerRef} className={cn("relative z-10 mb-6", className)}>
            <h2 className="text-4xl md:text-7xl uppercase font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/20 to-white/10 opacity-50">
                {children}
            </h2>
            <motion.h2
                style={{ opacity }}
                className="absolute inset-0 text-4xl md:text-7xl uppercase font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                aria-hidden="true"
            >
                {children}
            </motion.h2>
        </div>
    );
}
