"use client";

import { motion, useInView } from "framer-motion";
import { Compass, PenTool, Code2, Rocket, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { Header } from "@/components/ui/header";

// --- Background Shape Components (Adapted for Right Column) ---

// --- Background Shape Components (Animated) ---

const DiscoveryShape = () => (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Pulsating Radar Rings */}
            {[1, 2, 3].map((i) => (
                <motion.circle
                    key={i}
                    cx="100"
                    cy="200"
                    r={i * 30}
                    stroke="currentColor"
                    strokeWidth="1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: [0, 0.5, 0], scale: 1.2 }}
                    transition={{
                        duration: 3,
                        delay: i * 0.5,
                        repeat: Infinity,
                        ease: "easeOut"
                    }}
                />
            ))}
            {/* Scanning Line */}
            <motion.line
                x1="100" y1="200" x2="100" y2="50"
                stroke="currentColor"
                strokeWidth="2"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{ originX: "100px", originY: "200px" }}
            />
        </svg>
    </div>
);

const StrategyShape = () => (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
                d="M100 50 L160 150 L40 150 Z"
                stroke="currentColor"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.circle cx="100" cy="50" r="4" fill="currentColor" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1.5 }} />
            <motion.circle cx="160" cy="150" r="4" fill="currentColor" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1.7 }} />
            <motion.circle cx="40" cy="150" r="4" fill="currentColor" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1.9 }} />

            <motion.path
                d="M100 250 L100 350"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="5 5"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            />
        </svg>
    </div>
);

const DesignShape = () => (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <svg className="w-full h-full" viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
                d="M-50 100 C 50 100, 50 300, 150 300"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path
                d="M50 100 C 150 100, 150 300, 250 300"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            />
        </svg>
    </div>
);

const DevelopmentShape = () => (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.rect
                x="40" y="100" width="120" height="200"
                rx="8"
                stroke="currentColor"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2 }}
            />
            {[1, 2, 3, 4].map(i => (
                <motion.line
                    key={i}
                    x1="60" y1={120 + i * 20} x2={100 + ((i * 15) % 40)} y2={120 + i * 20}
                    stroke="currentColor"
                    strokeWidth="2"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 1 + i * 0.2, duration: 0.5 }}
                    style={{ originX: 0 }}
                />
            ))}
        </svg>
    </div>
);

const LaunchShape = () => (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <svg className="w-full h-full" viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {[1, 2, 3].map(i => (
                <motion.line
                    key={i}
                    x1={80 + i * 20} y1="400" x2={80 + i * 20} y2="0"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="10 20"
                    initial={{ y: 0 }}
                    animate={{ y: -400 }}
                    transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}
            <motion.circle
                cx="100"
                cy="350"
                r="40"
                fill="currentColor"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
            />
        </svg>
    </div>
);

const steps = [
    {
        id: "01",
        title: "Discovery",
        description: "We begin by understanding your vision, goals, and audience. Deep research and strategic analysis form the foundation of every project.",
        icon: Compass,
        Shape: DiscoveryShape,
    },
    {
        id: "02",
        title: "Strategy",
        description: "Insights transform into actionable plans. We define the approach, set milestones, and align on success metrics.",
        icon: Target,
        Shape: StrategyShape,
    },
    {
        id: "03",
        title: "Design",
        description: "Ideas take visual form. Our design process is iterative, collaborative, and focused on creating meaningful experiences.",
        icon: PenTool,
        Shape: DesignShape,
    },
    {
        id: "04",
        title: "Development",
        description: "Designs become reality. We build with precision, performance, and scalability as core principles.",
        icon: Code2,
        Shape: DevelopmentShape,
    },
    {
        id: "05",
        title: "Launch",
        description: "The culmination of our work. We ensure a seamless launch and provide ongoing support for continued success.",
        icon: Rocket,
        Shape: LaunchShape,
    }
];

const ProcessCard = ({ step, index, total }: { step: typeof steps[0], index: number, total: number }) => {
    // Tighter offset + sticky
    const topOffset = 100 + (index * 40);

    return (
        <motion.div
            className="sticky w-full border border-white/10 overflow-hidden shadow-2xl origin-top flex flex-col md:flex-row group"
            style={{
                top: `${topOffset}px`,
                zIndex: index + 10,
                marginBottom: `${(total - index - 1) * 20}px`
            }}
        >
            {/* 1. Animated Top Border Line (Left to Right) - Spanning Entire Card */}
            <motion.div
                className="absolute top-0 left-0 h-[2px] z-50 bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: false }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            />



            {/* 
                LAYOUT GRID: 
                - Left: Sides BG #0a0a0a
                - Middle: Center BG Black (#000000)
                - Right: Sides BG #0a0a0a
             */}

            {/* LEFT COLUMN: Number */}
            <div className="w-full md:w-[15%] bg-[#0a0a0a] border-b md:border-b-0 md:border-r border-white/5 p-6 md:p-10 flex items-start justify-center md:items-center relative z-10">
                <span className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    {step.id}
                </span>
            </div>

            {/* MIDDLE COLUMN: Main Content - BG Black */}
            <div className="flex-1 bg-black p-8 md:p-12 flex flex-col justify-center relative z-10 min-h-[550px]">
                <div className="flex flex-col gap-8">
                    {/* Icon in Circle */}
                    <div className="w-20 h-20 rounded-full bg-[#111] border border-white/20 flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                        <step.icon className="w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    </div>

                    <div>
                        <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            {step.title}
                        </h3>
                        <p className="text-neutral-400 text-xl md:text-2xl leading-relaxed max-w-2xl">
                            {step.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: Phase Vertical Text + SVG - BG #0a0a0a */}
            <div className="w-full md:w-[20%] bg-[#0a0a0a] border-t md:border-t-0 md:border-l border-white/5 relative z-10 overflow-hidden flex items-center justify-center">
                {/* Decorative SVG Pattern - Restored to Right Column */}
                <step.Shape />

                {/* Vertical Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-xs font-bold tracking-[0.3em] uppercase text-white [writing-mode:horizontal-tb] md:[writing-mode:vertical-rl] rotate-180 opacity-60 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                        Phase {step.id}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default function ServiceApproach() {
    return (
        <section className="bg-black pt-32 pb-48 px-2 md:px-0 relative w-full min-h-screen">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0 fixed"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="w-full max-w-[95%] xl:max-w-[1600px] mx-auto relative z-10">
                {/* Header Section */}
                <div className="mb-32 text-center md:text-left px-4">

                    <Header title="OUR PROCESS UNVEILED." className="text-5xl md:text-7xl lg:text-8xl mb-8" />
                    <p className="text-2xl text-neutral-400 max-w-3xl">
                        A rigorous, transparent journey from abstract concept to market-ready reality.
                    </p>
                </div>

                {/* Stack Container - Full Width */}
                <div className="flex flex-col relative pb-[10vh] w-full gap-8 md:gap-0">
                    {steps.map((step, index) => (
                        <ProcessCard key={step.id} step={step} index={index} total={steps.length} />
                    ))}
                </div>
            </div>
        </section>
    );
}
