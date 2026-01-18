"use client";

import React, { useEffect, useRef, useState } from "react";
import { Header } from "@/components/ui/header";
import { motion, useAnimation, useInView } from "framer-motion";
import {
    AppWindow,
    GalleryVerticalEnd,
    Lightbulb,
    MousePointer2,
    PenTool,
    SwatchBook,
    User,
    Search,
    MessageSquare,
    Zap,
    LayoutTemplate,
    CheckCircle2,
    ArrowRight,
    Share2,
    Globe,
    Layers,
    Smartphone,
    BarChart3,
    PieChart,
    Activity,
    Users,
    Settings,
    MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Utility Components ---

const GridPattern = () => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute inset-0 opacity-[0.2] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
    </div>
);

// --- Visual Components ---

const InteractionDesignVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center relative overflow-visible group/visual px-2 md:px-0">
            {/* Subtle Glow - Blue */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative flex items-end justify-center gap-2 w-full h-[90%] md:h-full pb-0 md:pb-3 scale-90 md:scale-95 origin-bottom">

                {/* 1. Phone (Left) - Detailed Mobile Website */}
                <motion.div
                    className="relative z-20 w-[90px] h-[180px] bg-[#050505] rounded-[1rem] border-[2px] border-[#222] shadow-xl flex flex-col overflow-hidden shrink-0"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                >
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-[#222] rounded-full z-20" />

                    {/* Screen Content */}
                    <div className="flex-1 flex flex-col pt-4 px-1.5 bg-neutral-900/50">
                        {/* Mobile Header */}
                        <div className="flex justify-between items-center mb-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            </div>
                            <div className="w-3 h-0.5 bg-neutral-700 rounded-full" />
                        </div>

                        {/* Mobile Hero */}
                        <div className="w-full h-10 rounded-sm bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/5 mb-2 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:4px_4px]" />
                            <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center relative z-10">
                                <Zap className="w-3 h-3 text-blue-500" />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="space-y-1 mb-2">
                            <div className="h-0.5 w-full bg-neutral-700 rounded-full" />
                            <div className="h-0.5 w-3/4 bg-neutral-800 rounded-full" />
                            <div className="h-0.5 w-5/6 bg-neutral-800 rounded-full" />
                        </div>

                        {/* Mini Grid / Data with Text */}
                        <div className="grid grid-cols-2 gap-1 mt-auto pb-1">
                            <div className="h-5 rounded-[3px] bg-[#151515] border border-white/5 flex flex-col justify-center px-1.5 gap-0.5">
                                <div className="text-[3px] text-neutral-500">Revenue</div>
                                <div className="text-[4px] font-bold text-white">$4.2k</div>
                            </div>
                            <div className="h-5 rounded-[3px] bg-[#151515] border border-white/5 flex flex-col justify-center px-1.5 gap-0.5">
                                <div className="text-[3px] text-neutral-500">Users</div>
                                <div className="text-[4px] font-bold text-white">850+</div>
                            </div>
                        </div>

                        <div className="w-full mt-1 mb-2">
                            <div className="w-full bg-blue-600 text-white text-[3px] font-bold py-0.5 rounded text-center">
                                ACTION
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 2. Web Preview (Right) - Content Only (No Top Bar) */}
                <motion.div
                    className="relative z-10 w-[170px] h-[190px] bg-[#050505] rounded-t-lg border border-[#333] shadow-2xl overflow-hidden shrink-0 flex flex-col"
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                    whileHover={{ y: -5 }}
                >
                    {/* Removed Top Bar as requested */}

                    {/* Website Content - Full Height */}
                    <div className="flex-1 bg-black p-2 flex flex-col gap-2 pt-3">
                        {/* Nav */}
                        <div className="flex justify-between items-center px-1">
                            <div className="w-16 h-2 rounded-sm bg-neutral-900 border border-white/5 flex items-center px-1">
                                <span className="text-[3px] text-neutral-500 font-mono">limitless.design</span>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="w-4 h-1 bg-neutral-800 rounded-sm" />
                                <div className="w-4 h-1 bg-neutral-800 rounded-sm" />
                                <div className="w-2 h-2 rounded-full bg-blue-600" />
                            </div>
                        </div>

                        {/* Hero Section */}
                        <div className="w-full h-16 rounded border border-[#222] bg-[#080808] flex flex-col justify-center px-3 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_50%)]" />
                            <div className="relative z-10 space-y-1">
                                <div className="text-[6px] font-bold text-white tracking-tight">Scale Your Design</div>
                                <div className="text-[3px] text-neutral-400 max-w-[80px] leading-relaxed">
                                    Ship projects faster with our unified platform.
                                </div>
                                <div className="flex gap-1 mt-1">
                                    <div className="bg-white text-black text-[3px] px-1.5 py-0.5 rounded-[2px] font-bold">Start</div>
                                </div>
                            </div>
                        </div>

                        {/* Info Grid with Real Text */}
                        <div className="grid grid-cols-2 gap-1.5">
                            <div className="h-8 rounded border border-[#222] bg-[#0a0a0a] p-1.5 flex flex-col justify-center gap-0.5 hover:border-blue-500/20 transition-colors">
                                <div className="text-[4px] font-bold text-white">Project Alpha</div>
                                <div className="flex items-center gap-1">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500" />
                                    <span className="text-[3px] text-neutral-500">Active</span>
                                </div>
                            </div>
                            <div className="h-8 rounded border border-[#222] bg-[#0a0a0a] p-1.5 flex flex-col justify-center gap-0.5 hover:border-blue-500/20 transition-colors">
                                <div className="text-[4px] font-bold text-white">Design Sys</div>
                                <div className="flex items-center gap-1">
                                    <div className="w-1 h-1 rounded-full bg-blue-500" />
                                    <span className="text-[3px] text-neutral-500">In Progress</span>
                                </div>
                            </div>
                            <div className="h-8 rounded border border-[#222] bg-[#0a0a0a] p-1.5 flex flex-col justify-center gap-0.5 hover:border-blue-500/20 transition-colors">
                                <div className="text-[4px] font-bold text-white">Analytics</div>
                                <div className="flex items-center gap-1">
                                    <div className="w-1 h-1 rounded-full bg-purple-500" />
                                    <span className="text-[3px] text-neutral-500">Review</span>
                                </div>
                            </div>
                            <div className="h-8 rounded border border-[#222] bg-[#0a0a0a] p-1.5 flex flex-col justify-center gap-0.5 hover:border-blue-500/20 transition-colors">
                                <div className="text-[4px] font-bold text-white">Frontend</div>
                                <div className="flex items-center gap-1">
                                    <div className="w-1 h-1 rounded-full bg-amber-500" />
                                    <span className="text-[3px] text-neutral-500">Pending</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const VisualDesignVisual = () => {
    // Reference Match: List Style (Icon - Title - Subtitle)
    // Tightly packed to fit height
    const items = [
        { title: "Motion Design", sub: "Animation", icon: MoreHorizontal, color: "bg-blue-500" },
        { title: "Brand Identity", sub: "Identity", icon: SwatchBook, color: "bg-pink-500" },
        { title: "UI/UX Design", sub: "Interface", icon: LayoutTemplate, color: "bg-amber-500" },
        { title: "Design Systems", sub: "Systems", icon: Layers, color: "bg-emerald-500" },
    ];

    return (
        <div className="w-full h-full flex flex-col items-center justify-start pt-4 space-y-1.5 overflow-visible relative px-4">
            {/* Masking for clean exit */}
            <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-[#111] to-transparent z-20 pointer-events-none" />

            {items.map((item, i) => (
                <motion.div
                    key={item.title}
                    className="flex items-center gap-3 w-full p-2.5 bg-[#1a1a1a] rounded-xl shadow-lg z-10 relative cursor-default group/item hover:scale-[1.02] transition-transform origin-center"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                >
                    {/* Icon Circle */}
                    <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white shadow-sm",
                        item.color
                    )}>
                        <item.icon className="w-4 h-4 fill-current opacity-90" />
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-xs font-bold text-white leading-tight">
                            {item.title}
                        </span>
                        <span className="text-[10px] font-medium text-neutral-400 leading-tight">
                            {item.sub}
                        </span>
                    </div>

                    {/* Arrow/Indicator */}
                    <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <ArrowRight className="w-3 h-3 text-neutral-400" />
                    </div>
                </motion.div>
            ))}

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] z-0 pointer-events-none" />
        </div>
    );
};

const WireframingVisual = () => {
    return (
        <div className="w-full h-full flex items-end justify-center pb-6 relative">
            <div className="flex items-center gap-6 relative z-10">
                {/* Icon 1 - Idea */}
                <motion.div
                    className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center shadow-lg relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                >
                    <Lightbulb className="w-6 h-6 text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                    <div className="absolute -bottom-5 text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Idea</div>
                </motion.div>

                {/* Connecting Line */}
                <div className="absolute top-1/2 left-10 right-10 h-[1px] bg-white/10 -z-10 overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent w-full"
                        initial={{ x: "-100%" }}
                        whileInView={{ x: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                {/* Icon 2 - Sketch */}
                <motion.div
                    className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center shadow-lg relative"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                >
                    <PenTool className="w-6 h-6 text-sky-500 drop-shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
                    <div className="absolute -bottom-5 text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Sketch</div>
                </motion.div>

                {/* Icon 3 - Final */}
                <motion.div
                    className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center shadow-lg relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                >
                    <AppWindow className="w-6 h-6 text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    <div className="absolute -bottom-5 text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Final</div>
                </motion.div>
            </div>
        </div>
    );
};

const UserResearchVisual = () => {
    // Multi-column badges - Adjusted size
    const badgeColumns = [
        ["Strategy", "Planning", "Goals"],
        ["Analysis", "Data", "Metrics"],
        ["Users", "Personas", "Flows"],
        ["Testing", "Feedback", "Iterate"]
    ];

    return (
        <div className="w-full h-full relative overflow-hidden flex items-end justify-center group/research">
            {/* Masking gradients */}
            <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-[#111] to-transparent z-10" />
            <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#111] to-transparent z-10" />

            <div className="transform -rotate-12 translate-y-8 scale-90 opacity-60 flex gap-4">
                {badgeColumns.map((col, colIndex) => (
                    <div key={colIndex} className={cn(
                        "flex flex-col animate-skew-scroll-v2 group-hover/research:[animation-play-state:paused] transition-all",
                        colIndex % 2 === 0 ? "animate-skew-scroll-v2" : "animate-skew-scroll-reverse-v2"
                    )}>
                        {[...col, ...col, ...col].map((item, i) => (
                            <div key={`${colIndex}-${i}`} className="w-28 bg-[#1a1a1a] border border-white/10 px-3 py-2 rounded-lg shadow-sm flex items-center gap-2 hover:border-blue-500/30 transition-colors mb-3">
                                <div className="w-4 h-4 rounded-full bg-blue-900/20 shrink-0 flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                </div>
                                <span className="text-[9px] text-neutral-300 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

const EverythingElseVisual = () => {
    // Detailed Dashboard Mockup - Scaled Down
    return (
        <div className="w-full h-full flex items-end justify-center pb-0 md:pr-0">
            <motion.div
                className="w-full max-w-[260px] h-[140px] bg-[#1a1a1a] border border-white/10 rounded-t-xl shadow-2xl overflow-hidden flex flex-col relative"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {/* Header */}
                <div className="h-5 w-full bg-neutral-900 border-b border-white/5 px-2 flex items-center justify-between">
                    <div className="flex gap-1.5 opacity-50">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                    </div>
                </div>

                {/* Body - Detailed Grid */}
                <div className="p-2 grid grid-cols-3 gap-1.5 h-full bg-[#0a0a0a]">
                    {/* Widget 1: Stats */}
                    <div className="col-span-1 bg-[#151515] rounded border border-white/5 p-1.5 flex flex-col justify-between">
                        <div className="flex items-center gap-1">
                            <Activity className="w-2.5 h-2.5 text-blue-500" />
                            <span className="text-[4px] text-neutral-400">Traffic</span>
                        </div>
                        <div className="text-[8px] font-bold text-white">12.5k</div>
                        <div className="h-4 w-full bg-gradient-to-t from-blue-500/20 to-transparent rounded-b mt-auto" />
                    </div>

                    {/* Widget 2: Pie Chart */}
                    <div className="col-span-1 bg-[#151515] rounded border border-white/5 p-1.5 flex flex-col items-center justify-center relative">
                        <PieChart className="w-5 h-5 text-indigo-500 opacity-80 mb-0.5" />
                        <span className="text-[4px] text-neutral-400">Sources</span>
                    </div>

                    {/* Widget 3: Task List */}
                    <div className="col-span-1 bg-[#151515] rounded border border-white/5 p-1.5 flex flex-col gap-0.5">
                        <div className="text-[4px] text-neutral-500 mb-0.5">Tasks</div>
                        {["Review", "Deploy", "Test"].map((task, i) => (
                            <div key={i} className="flex items-center gap-1">
                                <div className="w-1 h-1 rounded-full bg-pink-500/50" />
                                <span className="text-[3px] text-neutral-300">{task}</span>
                            </div>
                        ))}
                    </div>

                    {/* Widget 4: Graph */}
                    <div className="col-span-2 bg-[#151515] rounded border border-white/5 p-1.5 flex flex-col justify-end relative">
                        <div className="absolute top-1.5 left-1.5 text-[4px] text-neutral-400">Revenue</div>
                        <div className="flex items-end gap-1 h-full pt-3">
                            {[40, 70, 50, 90, 60, 80].map((h, i) => (
                                <motion.div
                                    key={i}
                                    className="flex-1 bg-blue-600/40 rounded-t-[1px] hover:bg-blue-500/80 transition-colors"
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${h}%` }}
                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Widget 5: Profile */}
                    <div className="col-span-1 bg-[#151515] rounded border border-white/5 p-1.5 flex flex-col items-center justify-center gap-0.5">
                        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                            <User className="w-2.5 h-2.5 text-white/50" />
                        </div>
                        <span className="text-[4px] text-neutral-400">Alex M.</span>
                        <div className="px-1 py-0.5 bg-green-500/10 text-green-500 text-[3px] rounded">Online</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// --- Main Card Component (Unchanged) ---

type CardProps = {
    title: string;
    description: string;
    children: React.ReactNode;
    className?: string; // For Grid sizing
    icon?: React.ReactNode;
    layout?: "vertical" | "horizontal";
};

const ServiceCard = ({ title, description, children, className, icon, layout = "vertical" }: CardProps) => {
    return (
        <div className={cn(
            // LIGHTER BACKGROUND: bg-[#111] instead of #0a0a0a
            "group relative overflow-hidden rounded-3xl bg-[#111] border border-white/10 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:border-white/20",
            layout === "horizontal" ? "flex flex-col md:flex-row" : "flex flex-col",
            className
        )}>
            {/* Background Grid (Generic) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-50" />

            {/* Subtle Hover Gradient - Blue */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* 1. Header Section (Icon + Text) */}
            <div className={cn(
                "relative z-10 p-4 flex flex-col items-start min-w-0 transition-all",
                layout === "horizontal" ? "w-full md:w-[45%] shrink-0 justify-start pt-5" : "w-full shrink-0"
            )}>
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black shadow-md group-hover:scale-110 transition-transform duration-300">
                    {icon || <AppWindow className="h-5 w-5" />}
                </div>
                <h3 className="mb-2 text-lg md:text-xl font-bold text-white group-hover:text-blue-500 transition-colors">
                    {title}
                </h3>
                <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-[90%]">
                    {description}
                </p>

                {/* Learn More Link - Blue */}
                <div className="mt-4 md:mt-auto pt-2 flex items-center text-blue-500 text-sm font-medium opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out delay-75">
                    Learn more <ArrowRight className="ml-1 w-4 h-4" />
                </div>
            </div>

            {/* 2. Visual Section */}
            <div className={cn(
                "relative z-0 min-h-[160px] md:min-h-0 flex-1 w-full overflow-hidden",
                layout === "horizontal" ? "h-[300px] md:h-auto" : "h-[200px]"
            )}>
                {children}
            </div>
        </div>
    );
};

export default function ServicesGridCards() {
    return (
        <section className="pb-44 pt-24 px-4 md:px-8 bg-[#0a0a0a] relative overflow-hidden">
            {/* Simplified Background */}
            <div className="absolute inset-0 bg-[#0a0a0a]" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="mx-auto max-w-5xl text-center pb-12 md:pb-16">
                    <Header title="WE HANDLE JUST ABOUT EVERYTHING" className="text-4xl md:text-4xl lg:text-7xl mb-6" />
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto"
                    >
                        We handle everything from design to deployment to get your website shipped and ready to go!
                    </motion.p>
                </div>

                {/* Compact Bento Grid - STRICT FLUXIS LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-3 gap-5 max-w-[1240px] mx-auto auto-rows-[300px] lg:auto-rows-[240px] h-[90vh]">

                    {/* 1. Interaction Design (Row 1, Col 1-2) - HORIZONTAL */}
                    <ServiceCard
                        title="Interaction Design"
                        description="Create engaging interactions that captivate and delight users."
                        className="lg:col-span-2 lg:row-start-1 lg:col-start-1"
                        icon={<MousePointer2 className="h-5 w-5" />}
                        layout="horizontal"
                    >
                        <InteractionDesignVisual />
                    </ServiceCard>

                    {/* 2. Visual Design (Row 1-2, Col 3) - VERTICAL TALL */}
                    <ServiceCard
                        title="Visual Design and Branding"
                        description="Craft compelling visuals that define and elevate your brand."
                        className="lg:col-start-3 lg:row-start-1 lg:row-span-2"
                        icon={<Share2 className="h-5 w-5" />}
                    >
                        <VisualDesignVisual />
                    </ServiceCard>

                    {/* 3. User Research (Row 2-3, Col 1) - VERTICAL TALL */}
                    <ServiceCard
                        title="User Research and SEO"
                        description="Understand your users deeply through research and insights."
                        className="lg:col-start-1 lg:row-start-2 lg:row-span-2"
                        icon={<Search className="h-5 w-5" />}
                    >
                        <UserResearchVisual />
                    </ServiceCard>

                    {/* 4. Wireframing (Row 2, Col 2) - SQUARE-ISH */}
                    <ServiceCard
                        title="Wireframing and Prototyping"
                        description="Transform ideas into tangible prototypes."
                        className="lg:col-start-2 lg:row-start-2"
                        icon={<Layers className="h-5 w-5" />}
                    >
                        <WireframingVisual />
                    </ServiceCard>

                    {/* 5. Everything Else (Row 3, Col 2-3) - HORIZONTAL */}
                    <ServiceCard
                        title="And Everything else"
                        description="Usability Testing, Information Architecture, Accessibility Design. You name it."
                        className="lg:col-start-2 lg:row-start-3 lg:col-span-2"
                        icon={<Globe className="h-5 w-5" />}
                        layout="horizontal" // User requested this to look like the first one
                    >
                        <EverythingElseVisual />
                    </ServiceCard>
                </div>
            </div>

            {/* Bottom Fade to Black */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-0" />

            {/* CSS for custom animations if not in global CSS */}
            <style jsx global>{`
        @keyframes skew-scroll-v2 {
            0% { transform: translateY(0) skewY(12deg); }
            100% { transform: translateY(-33.33333%) skewY(12deg); }
        }
        @keyframes skew-scroll-reverse-v2 {
            0% { transform: translateY(-33.33333%) skewY(12deg); }
            100% { transform: translateY(0) skewY(12deg); }
        }
        .animate-skew-scroll-v2 {
            animation: skew-scroll-v2 20s linear infinite;
        }
        .animate-skew-scroll-reverse-v2 {
            animation: skew-scroll-reverse-v2 20s linear infinite;
        }
      `}</style>
        </section>
    );
}
