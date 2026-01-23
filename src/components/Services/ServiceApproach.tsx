"use client";

import { motion, useInView } from "framer-motion";
import { Compass, PenTool, Code2, Rocket, Target, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { Header } from "@/components/ui/header";
import { useTranslations, useLocale } from "next-intl";

// --- Background Shape Components (Animated) ---

const Glow = ({ className }: { className?: string }) => (
    <div className={cn("absolute inset-0 blur-3xl rounded-full opacity-40", className)} />
);

const DiscoveryShape = () => (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
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
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
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
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
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
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
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
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
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

// Map colors explicitly to ensure Tailwind generates the classes
const colorStyles: Record<string, {
    border: string;
    text: string;
    bg: string;
    hoverBorder: string;
    hoverShadow: string;
    hoverText: string;
    glow: string;
    numberGlow: string;
    activeShadow: string;
    lineBg: string;
    lineShadow: string;
}> = {
    blue: {
        border: "border-blue-400",
        text: "text-blue-400",
        bg: "bg-blue-400/20",
        hoverBorder: "group-hover:border-blue-500",
        hoverShadow: "group-hover:shadow-blue-500/50",
        activeShadow: "shadow-blue-500/50",
        hoverText: "group-hover:text-blue-500",
        glow: "bg-blue-400/20",
        numberGlow: "drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]",
        lineBg: "bg-blue-400",
        lineShadow: "shadow-[0_0_20px_rgba(59,130,246,1)]"
    },
    purple: {
        border: "border-purple-500",
        text: "text-purple-500",
        bg: "bg-purple-500/20",
        hoverBorder: "group-hover:border-purple-500",
        hoverShadow: "group-hover:shadow-purple-500/50",
        activeShadow: "shadow-purple-500/50",
        hoverText: "group-hover:text-purple-500",
        glow: "bg-purple-500/20",
        numberGlow: "drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]",
        lineBg: "bg-purple-500",
        lineShadow: "shadow-[0_0_20px_rgba(168,85,247,1)]"
    },
    red: {
        border: "border-red-500",
        text: "text-red-500",
        bg: "bg-red-500/20",
        hoverBorder: "group-hover:border-red-500",
        hoverShadow: "group-hover:shadow-red-500/50",
        activeShadow: "shadow-red-500/50",
        hoverText: "group-hover:text-red-500",
        glow: "bg-red-500/20",
        numberGlow: "drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]",
        lineBg: "bg-red-500",
        lineShadow: "shadow-[0_0_20px_rgba(236,72,153,1)]"
    },
    emerald: {
        border: "border-emerald-500",
        text: "text-emerald-500",
        bg: "bg-emerald-500/20",
        hoverBorder: "group-hover:border-emerald-500",
        hoverShadow: "group-hover:shadow-emerald-500/50",
        activeShadow: "shadow-emerald-500/50",
        hoverText: "group-hover:text-emerald-500",
        glow: "bg-emerald-500/20",
        numberGlow: "drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]",
        lineBg: "bg-emerald-500",
        lineShadow: "shadow-[0_0_20px_rgba(16,185,129,1)]"
    },
    orange: {
        border: "border-orange-500",
        text: "text-orange-500",
        bg: "bg-orange-500/20",
        hoverBorder: "group-hover:border-orange-500",
        hoverShadow: "group-hover:shadow-orange-500/50",
        activeShadow: "shadow-orange-500/50",
        hoverText: "group-hover:text-orange-500",
        glow: "bg-orange-500/20",
        numberGlow: "drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]",
        lineBg: "bg-orange-500",
        lineShadow: "shadow-[0_0_20px_rgba(249,115,22,1)]"
    }
};

type StepData = {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    Shape: React.FC;
    color: string;
};

const ProcessCard = ({ step, index, total, phaseText }: { step: StepData; index: number; total: number; phaseText: string }) => {
    // Tighter offset + sticky
    const topOffset = 100 + (index * 40);
    const styles = colorStyles[step.color] || colorStyles.blue;
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });

    return (
        <motion.div
            ref={ref}
            className="sticky w-full border border-white/10 overflow-hidden shadow-2xl origin-top flex flex-col md:flex-row group"
            style={{
                top: `${topOffset}px`,
                zIndex: index + 10,
                marginBottom: `${(total - index - 1) * 20}px`
            }}
        >
            {/* 1. Animated Top Border Line (Left to Right) - Spanning Entire Card */}
            <motion.div
                className="absolute top-0 left-0 h-[3px] z-50 bg-white/80 shadow-[0_0_20px_rgba(255,255,255,1)]"
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
            <div className="w-full md:w-[15%] bg-black border-b md:border-b-0 md:border-r border-white/5 p-6 md:p-10 flex items-start justify-center md:items-center relative z-10 overflow-hidden">
                <Glow className={cn("transition-opacity duration-500", isInView ? styles.glow : "opacity-0")} />
                <span className={cn(
                    "text-4xl md:text-5xl font-bold transition-colors duration-300 relative z-10",
                    isInView ? styles.text : "text-white",
                    isInView ? styles.numberGlow : "drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                )}>
                    {step.id}
                </span>
            </div>

            {/* MIDDLE COLUMN: Main Content - BG Black */}
            <div className="flex-1 bg-black p-8 md:p-12 flex flex-col justify-center relative z-10 min-h-[550px]">
                <div className="flex flex-col gap-8">
                    {/* Icon in Circle */}
                    <div className={cn(
                        "w-20 h-20 rounded-full bg-black border flex items-center justify-center transition-all duration-500 relative overflow-hidden",
                        isInView ? styles.border : "border-white/20",
                        styles.hoverBorder,
                        isInView 
                            ? `scale-110 shadow-[0_0_30px] ${styles.activeShadow}`
                            : `group-hover:scale-110 group-hover:shadow-[0_0_30px] ${styles.hoverShadow} shadow-[0_0_15px_rgba(255,255,255,0.1)]`
                    )}>
                        <div className={cn(
                            "absolute inset-0 rounded-full blur-md transition-opacity duration-500",
                            styles.bg,
                            isInView ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        )} />
                        <step.icon className={cn(
                            "w-10 h-10 transition-colors duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]",
                            isInView ? styles.text : "text-white",
                            styles.hoverText
                        )} />
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
            <div className={cn(
                "w-full md:w-[20%] bg-black border-t md:border-t-0 md:border-l border-white/5 relative z-10 overflow-hidden flex items-center justify-center transition-colors duration-500",
                isInView ? styles.text : "text-white"
            )}>
                {/* Glow Background */}
                <Glow className={cn("transition-opacity duration-500", isInView ? styles.glow : "opacity-0")} />

                {/* Decorative SVG Pattern - Restored to Right Column */}
                <step.Shape />

                {/* Vertical Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-xs font-bold tracking-[0.3em] uppercase text-white [writing-mode:horizontal-tb] md:[writing-mode:vertical-rl] rotate-180 opacity-60 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                        {phaseText} {step.id}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default function ServiceApproach() {
    const t = useTranslations('services');
    const locale = useLocale();
    const isAr = locale === 'ar';

    const steps: StepData[] = [
        {
            id: t('approach.steps.discovery.id'),
            title: t('approach.steps.discovery.title'),
            description: t('approach.steps.discovery.description'),
            icon: Compass,
            Shape: DiscoveryShape,
            color: 'blue'
        },
        {
            id: t('approach.steps.strategy.id'),
            title: t('approach.steps.strategy.title'),
            description: t('approach.steps.strategy.description'),
            icon: Target,
            Shape: StrategyShape,
            color: 'purple'
        },
        {
            id: t('approach.steps.design.id'),
            title: t('approach.steps.design.title'),
            description: t('approach.steps.design.description'),
            icon: PenTool,
            Shape: DesignShape,
            color: 'red'
        },
        {
            id: t('approach.steps.development.id'),
            title: t('approach.steps.development.title'),
            description: t('approach.steps.development.description'),
            icon: Code2,
            Shape: DevelopmentShape,
            color: 'emerald'
        },
        {
            id: t('approach.steps.launch.id'),
            title: t('approach.steps.launch.title'),
            description: t('approach.steps.launch.description'),
            icon: Rocket,
            Shape: LaunchShape,
            color: 'orange'
        }
    ];

    return (
        <section className="bg-black pt-32 pb-48 px-2 md:px-0 relative w-full min-h-screen">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0 fixed"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="w-full max-w-[95%] xl:max-w-[1500px] mx-auto relative z-10">
                {/* Header Section */}
                <div className={cn(
                    "mb-32 px-4",
                    isAr ? "text-center md:text-right" : "text-center md:text-left"
                )}>

                    <Header
                        title={t('approach.header')}
                        className={cn(
                            "text-5xl md:text-7xl lg:text-8xl mb-8",
                            // In Arabic, tracking-tighter can clip characters with some fonts/effects AND it looks bad.
                            isAr ? "tracking-normal py-2" : ""
                        )}
                    />
                    <p className={cn(
                        "text-2xl text-neutral-400 max-w-3xl",
                        isAr ? "ml-auto" : "" // Push to right if using text-right, but strictly flex/grid might be better, or just rely on inline flow. 
                        // text-right on parent aligns inline content. `max-w-3xl` limits width. 
                        // If it's block-level, we need `ml-auto` to align the box itself to the right if we want the TEXT to be on the right side of the screen visually?
                        // "on the right side of the section" implies layout position.
                    )}>
                        {t('approach.subtitle')}
                    </p>
                </div>

                {/* Stack Container - Full Width */}
                <div className="flex flex-col relative pb-[10vh] w-full max-w-[1450px] mx-auto gap-8 md:gap-0">
                    {steps.map((step, index) => (
                        <ProcessCard key={step.id} step={step} index={index} total={steps.length} phaseText={t('approach.phase')} />
                    ))}
                </div>
            </div>
        </section>
    );
}
