"use client";

import React from "react";
import { motion } from "motion/react";

interface ServicesHProps {
    header: React.ReactNode;
    description: string;
    badges: string[];
    hiddenBadges?: string[];
    height?: string; // Optional height prop (e.g., "min-h-screen", "h-[800px]")
    headerClassName?: string; // Optional class overriding for header (font size, etc.)
    descriptionClassName?: string; // Optional class overriding for description (width, etc.)
}

export default function ServicesH({
    header,
    description,
    badges,
    hiddenBadges = [],
    height = "min-h-screen",
    headerClassName = "text-[13vw] leading-[0.8]", // Default styles
    descriptionClassName = "max-w-xl text-lg md:text-xl" // Default styles
}: ServicesHProps) {
    return (
        <section className={`relative bg-[#0a0a0a] text-[#bfbfbf] w-full ${height} flex items-start justify-start overflow-hidden perspective-2000`}>

            {/* Background Grid Layer - Gap based borders */}
            <div className="absolute inset-0 z-0 flex flex-col">
                <div className="w-full flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-[#1a1a1a] gap-[1px] border border-[#1a1a1a]">
                    {badges.map((badge, index) => (
                        <ClientItem key={index} name={badge} index={index} hidden={hiddenBadges.includes(badge)} />
                    ))}
                </div>
            </div>

            {/* Overlay Content Layer */}
            <div className="relative z-10 w-full max-w-[1800px] px-4 md:px-12 pointer-events-none flex flex-col justify-start h-full pt-24 lg:pt-18">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                >
                    <h2 className={`font-medium uppercase tracking-[-0.02em] font-sans text-white/90 mix-blend-difference mb-8 ${headerClassName}`}>
                        {header}
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className={`text-white/80 font-light leading-relaxed pl-2 pointer-events-auto ${descriptionClassName}`}
                    >
                        {description}
                    </motion.p>
                </motion.div>
            </div>

        </section>
    );
}

function ClientItem({ name, index, hidden }: { name: string; index: number; hidden: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.6,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1]
            }}
            // Container with perspective for 3D effect
            className="group relative w-full min-h-[180px] md:min-h-[25vh] bg-[#0a0a0a]"
            style={{ perspective: "1000px" }}
        >
            {/* 
                3D key structure:
                The inner container transforms to create the pop-out effect.
                On hover, it translates Z (up) and slightly rotates.
             */}
            <div className="relative w-full h-full duration-300 ease-out transition-all transform-style-3d group-hover:-translate-y-2 group-hover:translate-z-10 group-hover:rotate-x-2 group-hover:shadow-2xl">

                {/* The "Key Cap" surface */}
                <div className="absolute inset-0 bg-[#0a0a0a] flex items-center pl-8 md:pl-12 transition-colors duration-300 group-hover:bg-[#0f0f0f] border border-transparent group-hover:border-[#333]/30">

                    {/* Intersection Stars */}
                    <div className="absolute -top-[5.5px] -left-[5.5px] text-[#333] z-20 group-hover:opacity-50 transition-opacity">
                        <PlusIcon />
                    </div>

                    {/* Text content - Hidden if specified in props */}
                    {!hidden && (
                        <span
                            className="text-xl md:text-2xl font-light tracking-wide text-[#444] group-hover:text-white transition-colors duration-300 uppercase z-10 relative select-none"
                        >
                            {name}
                        </span>
                    )}

                    {/* Corner Brackets - Faint initially, sharp on hover */}
                    <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#333] opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#333] opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#333] opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#333] opacity-20 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Shiny sheen effect on top edge for 3D realism */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Bottom Depth Face (simulates the side of the key) */}
                <div
                    className="absolute inset-x-0 -bottom-2 h-2 bg-[#050505] origin-top transform rotate-x-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
            </div>

        </motion.div>
    );
}

function PlusIcon() {
    return (
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-100">
            <path d="M5.5 0V11" stroke="#333" strokeWidth="1" />
            <path d="M0 5.5H11" stroke="#333" strokeWidth="1" />
        </svg>
    );
}
