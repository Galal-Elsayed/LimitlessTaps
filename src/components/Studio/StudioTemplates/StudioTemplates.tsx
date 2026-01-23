"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Monitor, Smartphone, Play, Plus, X, Lock, ChevronLeft, ChevronRight, RefreshCw, Minus, Square } from "lucide-react";
import { Header } from "@/components/ui/header";
import { useTranslations, useLocale } from "next-intl";

// Mock Data
type Category = "all" | "simple" | "medium" | "advanced";

interface Template {
    id: string;
    titleKey: string;
    descriptionKey: string;
    category: Category;
    image: string;
    demoUrl: string;
    tags: string[];
}

const TEMPLATES: Template[] = [
    // Simple
    {
        id: "1",
        titleKey: "zenith",
        descriptionKey: "zenith",
        category: "simple",
        image: "/placeholder-zenith.png",
        demoUrl: "https://example.com/demo1",
        tags: ["Portfolio", "Minimal", "React 19", "Tailwind"]
    },
    {
        id: "2",
        titleKey: "aura",
        descriptionKey: "aura",
        category: "simple",
        image: "/placeholder-aura.png",
        demoUrl: "https://example.com/demo2",
        tags: ["Wellness", "Landing Page", "Framer Motion", "Next.js"]
    },
    // Medium
    {
        id: "3",
        titleKey: "nexus",
        descriptionKey: "nexus",
        category: "medium",
        image: "/placeholder-nexus.png",
        demoUrl: "https://example.com/demo3",
        tags: ["SaaS", "Analytics", "Dashboard", "Charts"]
    },
    {
        id: "4",
        titleKey: "flow",
        descriptionKey: "flow",
        category: "medium",
        image: "/placeholder-flow.png",
        demoUrl: "https://example.com/demo4",
        tags: ["E-commerce", "Shopify", "Animations", "Stripe"]
    },
    // Advanced
    {
        id: "5",
        titleKey: "momentum",
        descriptionKey: "momentum",
        category: "advanced",
        image: "/placeholder-momentum.png",
        demoUrl: "https://example.com/demo5",
        tags: ["Project Management", "Next.js 15", "React 19", "Tailwind CSS 4"]
    },
    {
        id: "6",
        titleKey: "quantum",
        descriptionKey: "quantum",
        category: "advanced",
        image: "/placeholder-quantum.png",
        demoUrl: "https://example.com/demo6",
        tags: ["WebGL", "Three.js", "3D", "Immersive"]
    },
];

export default function StudioTemplates() {
    const t = useTranslations("studio.templates");
    const locale = useLocale();
    const isArabic = locale === "ar";
    const [activeCategory, setActiveCategory] = useState<Category>("all");

    const categories: { id: Category; labelKey: string }[] = [
        { id: "all", labelKey: "filters.all" },
        { id: "simple", labelKey: "filters.simple" },
        { id: "medium", labelKey: "filters.medium" },
        { id: "advanced", labelKey: "filters.advanced" },
    ];

    // Filter templates
    const filteredTemplates = TEMPLATES.filter(
        (tpl) => activeCategory === "all" || tpl.category === activeCategory
    );

    return (
        <section className="min-h-screen bg-neutral-950 py-24 px-4 md:px-8 relative overflow-hidden flex flex-col items-center">

            {/* 3-Part Header Section (Replicating AboutTap layout) */}
            <div className="w-full max-w-[90%] mx-auto mb-16 z-10 flex flex-col gap-12">

                {/* Top Row: CHOOSE - YOUR - TEMPLATE */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
                    <div className="text-left w-1/3 flex justify-start">
                        <Header title={t("header.choose")} className={`text-[6vw] md:text-[5vw] leading-none ${isArabic ? "pb-4" : ""}`} />
                    </div>

                    <div className="text-center w-1/3 flex justify-center">
                        <Header title={t("header.your")} className={`text-[8vw] md:text-[6.5vw] leading-none z-10 ${isArabic ? "pb-4" : ""}`} />
                    </div>

                    <div className="text-right w-1/3 flex justify-end">
                        <Header title={t("header.template")} className={`text-[6vw] md:text-[5vw] leading-none ${isArabic ? "pb-4" : ""}`} />
                    </div>
                </div>

                {/* Filters Row (Bigger, Less Rounded) */}
                <div className="flex justify-center">
                    <div className="flex flex-wrap justify-center gap-3 bg-neutral-900/50 p-2 rounded-2xl border border-white/5 backdrop-blur-sm">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={cn(
                                    "px-8 py-3 rounded-xl text-sm md:text-base font-semibold transition-all duration-300 border",
                                    activeCategory === cat.id
                                        ? "bg-white text-black border-white shadow-lg"
                                        : "bg-transparent text-neutral-400 border-transparent hover:text-white hover:bg-white/5"
                                )}
                            >
                                {t(cat.labelKey)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>


            {/* Vertical List of Templates */}
            <div className="w-full max-w-[1400px] flex flex-col items-center gap-24 md:gap-32 relative z-10 pb-20">
                <AnimatePresence mode="popLayout">
                    {filteredTemplates.map((template, index) => (
                        <TemplateItem key={template.id} template={template} index={index} t={t} />
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
}

function TemplateItem({ template, index, t }: { template: Template; index: number; t: ReturnType<typeof useTranslations> }) {
    const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
    const [isPlaying, setIsPlaying] = useState(false);

    const title = t(`items.${template.titleKey}.title`);
    const description = t(`items.${template.descriptionKey}.description`);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="w-full flex flex-col items-center"
        >

            {/* Device Toggle Controls (Centered Above with Text Labels) */}
            <div className="mb-6 z-30 flex items-center justify-center">
                <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-white/10">
                    <button
                        onClick={() => setViewMode("desktop")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-md transition-all text-xs font-medium",
                            viewMode === 'desktop' ? "bg-white text-black shadow-sm" : "text-neutral-400 hover:text-white"
                        )}
                    >
                        <Monitor size={14} />
                        <span>{t("toggle.desktop")}</span>
                    </button>
                    <button
                        onClick={() => setViewMode("mobile")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-md transition-all text-xs font-medium",
                            viewMode === 'mobile' ? "bg-white text-black shadow-sm" : "text-neutral-400 hover:text-white"
                        )}
                    >
                        <Smartphone size={14} />
                        <span>{t("toggle.mobile")}</span>
                    </button>
                </div>
            </div>

            {/* Device Window */}
            <div className="relative w-full flex justify-center perspective-1000 group">
                <motion.div
                    layout
                    className={cn(
                        "relative bg-[#222] shadow-2xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] border border-white/10",
                        // Seamless Design
                        "rounded-t-2xl rounded-b-none border-b-0",
                        viewMode === "desktop"
                            ? "w-full aspect-[16/10]"
                            : "w-[400px] aspect-[9/18] rounded-[3rem] border-[8px] border-[#1a1a1a]"
                    )}
                >
                    {/* Safari-Style Window Header (Desktop Only) */}
                    {viewMode === "desktop" && (
                        <div className="h-[48px] bg-[#333] flex items-end justify-between px-4 border-b border-black/20 select-none relative">

                            {/* Navigation Arrows + Refresh (Left) */}
                            <div className="absolute top-3.5 left-4 flex gap-4 text-neutral-400 items-center z-10">
                                <div className="flex gap-2">
                                    <ChevronLeft size={16} className="hover:text-white cursor-pointer transition-colors" />
                                    <ChevronRight size={16} className="hover:text-white cursor-pointer transition-colors" />
                                </div>
                                <RefreshCw size={14} className="hover:text-white cursor-pointer transition-colors" />
                            </div>

                            {/* Tabs Container */}
                            <div className="flex-1 flex items-end justify-center px-20 h-full">


                                {/* Active Tab */}
                                <div className="relative w-full max-w-lg h-[34px] bg-[#222] rounded-t-lg flex items-center justify-center px-4 -mb-px shadow-[0_-2px_10px_rgba(0,0,0,0.2)]">
                                    {/* Left/Right Slopes for that specific Safari tab look (Simplified here with rounded-t) */}

                                    {/* URL / Title in Tab */}
                                    <div className="flex items-center gap-2 text-[11px] text-neutral-300 font-medium">
                                        <Lock size={10} className="text-neutral-500" />
                                        <span>limitless.studio/{title.toLowerCase()}</span>
                                    </div>

                                    {/* Close Tab Icon */}
                                    <X size={12} className="absolute right-3 text-neutral-500 hover:text-white cursor-pointer" />
                                </div>
                            </div>

                            {/* Window Controls (Right - Windows Style) */}
                            <div className="absolute top-3.5 right-4 flex gap-4 text-neutral-400 items-center">
                                <Minus size={16} className="hover:text-white cursor-pointer transition-colors" />
                                <Square size={14} className="hover:text-white cursor-pointer transition-colors" />
                                <X size={16} className="hover:text-white cursor-pointer transition-colors" />
                            </div>
                        </div>
                    )}

                    {/* Mobile Notch & Status Bar */}
                    {viewMode === "mobile" && (
                        <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#1a1a1a] rounded-b-[1rem] flex items-center justify-center">
                                <div className="w-16 h-2 bg-black/50 rounded-full" />
                            </div>
                            {/* Status Bar */}
                            <div className="flex justify-between items-center px-6 pt-3 text-[10px] font-medium text-black/50 dark:text-white/50">
                                <span>9:41</span>
                                <div className="flex items-center gap-1.5">
                                    <div className="flex gap-0.5">
                                        <div className="w-0.5 h-1.5 bg-current rounded-sm" />
                                        <div className="w-0.5 h-2 bg-current rounded-sm" />
                                        <div className="w-0.5 h-2.5 bg-current rounded-sm" />
                                    </div>
                                    <div className="w-4 h-2 border border-current rounded-[2px] relative ml-1">
                                        <div className="absolute inset-0 bg-current left-0 right-[20%]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Content Area */}
                    <div className="relative w-full h-full bg-[#111] overflow-hidden group-hover:shadow-[0_0_50px_rgba(255,255,255,0.05)] transition-shadow duration-500">
                        <AnimatePresence mode="wait">
                            {isPlaying ? (
                                <motion.iframe
                                    key={`iframe-${template.id}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    src={template.demoUrl}
                                    className="w-full h-full bg-white"
                                    title={title}
                                />
                            ) : (
                                <motion.div
                                    key={`preview-${template.id}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="w-full h-full flex flex-col items-center justify-center relative bg-neutral-900"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                                    <h3 className="text-8xl font-black text-white/5 uppercase tracking-tighter select-none scale-150 rotate-[-15deg]">{title}</h3>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Info Bar - Connected to Window */}
            <div
                className={cn(
                    "bg-[#222] border border-white/10 border-t-0 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl relative z-20 transition-all duration-700",
                    // Seamless Design
                    "rounded-b-2xl rounded-t-none",
                    viewMode === "desktop"
                        ? "w-full"
                        : "w-[400px] rounded-[2.5rem] mt-4 border-t"
                )}
            >
                <div className="flex flex-col gap-3 max-w-2xl">
                    <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-bold text-white">{title}</h3>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-black bg-white px-2 py-0.5 rounded-sm">
                            {t(`filters.${template.category}`)}
                        </span>
                    </div>
                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {template.tags.map(tag => (
                            <span key={tag} className="text-xs font-mono text-neutral-500 bg-neutral-900 border border-white/5 px-2 py-1 rounded-md">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={cn(
                        "group relative px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 overflow-hidden",
                        viewMode === "mobile" ? "w-full" : "",
                        isPlaying
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-white text-black hover:bg-neutral-200"
                    )}
                >
                    <div className="relative z-10 flex items-center justify-center gap-2">
                        {isPlaying ? (
                            t("cta.stop_demo")
                        ) : (
                            <>
                                <Play size={16} fill="currentColor" />
                                {t("cta.view_demo")}
                            </>
                        )}
                    </div>
                </button>
            </div>

        </motion.div>
    )
}
