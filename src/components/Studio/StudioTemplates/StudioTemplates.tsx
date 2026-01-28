"use client";

import React, { useState, useEffect, useCallback, memo, useMemo } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Monitor, Smartphone, Play, X, Lock, ChevronLeft, ChevronRight, RefreshCw, Minus, Square } from "lucide-react";
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

// PERFORMANCE: Slide variants (only x and opacity - GPU accelerated)
const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 100 : -100,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 100 : -100,
        opacity: 0,
    })
};

// PERFORMANCE: Smooth spring for carousel
const carouselSpring = { type: "spring" as const, stiffness: 200, damping: 28 };
const fadeTransition = { duration: 0.12 };

// Memoized Carousel Component
const Carousel = memo(({ items, t, isRTL }: { items: Template[]; t: ReturnType<typeof useTranslations>; isRTL: boolean }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

    useEffect(() => {
        setCurrentIndex(0);
        setDirection(0);
    }, [items]);

    const activeItem = items[currentIndex];

    const paginate = useCallback((newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex(prev => {
            let nextIndex = prev + newDirection;
            if (nextIndex < 0) nextIndex = items.length - 1;
            if (nextIndex >= items.length) nextIndex = 0;
            return nextIndex;
        });
    }, [items.length]);

    if (!activeItem) return null;

    return (
        <div className="w-full flex items-center justify-center relative min-h-[70vh] md:min-h-[80vh] max-w-[1600px] mx-auto">

            {/* Previous Arrow */}
            <button
                onClick={() => paginate(isRTL ? 1 : -1)}
                className="hidden md:flex absolute -left-4 lg:-left-8 xl:-left-16 z-20 w-12 h-12 items-center justify-center rounded-full bg-neutral-900/90 border border-white/10 text-white/60 hover:bg-neutral-800 hover:text-white active:scale-95 transition-transform"
            >
                {isRTL ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
            </button>

            {/* Next Arrow */}
            <button
                onClick={() => paginate(isRTL ? -1 : 1)}
                className="hidden md:flex absolute -right-4 lg:-right-8 xl:-right-16 z-20 w-12 h-12 items-center justify-center rounded-full bg-neutral-900/90 border border-white/10 text-white/60 hover:bg-neutral-800 hover:text-white active:scale-95 transition-transform"
            >
                {isRTL ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
            </button>

            {/* Content Container */}
            <div className="w-full h-full relative flex items-center justify-center px-4 md:px-16 lg:px-20">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <m.div
                        key={activeItem.id}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={carouselSpring}
                        className="w-full flex justify-center"
                        style={{ willChange: "transform, opacity" }}
                    >
                        <TemplateItem template={activeItem} t={t} viewMode={viewMode} setViewMode={setViewMode} />
                    </m.div>
                </AnimatePresence>
            </div>

            {/* Mobile Navigation (Bottom) */}
            <div className="absolute -bottom-24 flex md:hidden gap-10 items-center z-20 pb-8">
                <button
                    onClick={() => paginate(isRTL ? 1 : -1)}
                    className="w-14 h-14 flex items-center justify-center rounded-full bg-neutral-900 border border-white/10 text-white active:scale-95 transition-transform shadow-lg"
                >
                    {isRTL ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
                </button>
                <div className="text-base font-mono text-neutral-400 font-medium">
                    {currentIndex + 1} / {items.length}
                </div>
                <button
                    onClick={() => paginate(isRTL ? -1 : 1)}
                    className="w-14 h-14 flex items-center justify-center rounded-full bg-neutral-900 border border-white/10 text-white active:scale-95 transition-transform shadow-lg"
                >
                    {isRTL ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
                </button>
            </div>

        </div>
    );
});
Carousel.displayName = "Carousel";

export default function StudioTemplates() {
    const t = useTranslations("studio.templates");
    const locale = useLocale();
    const isArabic = locale === "ar";
    const [activeCategory, setActiveCategory] = useState<Category>("all");

    const categories: { id: Category; labelKey: string }[] = useMemo(() => [
        { id: "all", labelKey: "filters.all" },
        { id: "simple", labelKey: "filters.simple" },
        { id: "medium", labelKey: "filters.medium" },
        { id: "advanced", labelKey: "filters.advanced" },
    ], []);

    const filteredTemplates = useMemo(() =>
        TEMPLATES.filter(tpl => activeCategory === "all" || tpl.category === activeCategory),
        [activeCategory]
    );

    return (
        <LazyMotion features={domAnimation}>
            <section className="min-h-screen bg-neutral-950 py-4 pb-32 md:py-12 relative overflow-hidden flex flex-col items-center">

                {/* Header Section */}
                <div className="w-full max-w-[95%] md:max-w-[90%] mx-auto mb-10 z-10 flex flex-col gap-8 md:gap-12 px-4 md:px-0">

                    {/* Top Row: CHOOSE - YOUR - TEMPLATE */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">
                        <div className="text-center md:text-left w-full md:w-1/3 flex justify-center md:justify-start">
                            <Header title={t("header.choose")} className={`text-[12vw] md:text-[5vw] leading-none ${isArabic ? "pb-4" : ""}`} />
                        </div>
                        <div className="text-center w-full md:w-1/3 flex justify-center">
                            <Header title={t("header.your")} className={`text-[14vw] md:text-[6.5vw] leading-none z-10 ${isArabic ? "pb-4" : ""}`} />
                        </div>
                        <div className="text-center md:text-right w-full md:w-1/3 flex justify-center md:justify-end">
                            <Header title={t("header.template")} className={`text-[12vw] md:text-[5vw] leading-none ${isArabic ? "pb-4" : ""}`} />
                        </div>
                    </div>

                    {/* Filters Row */}
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex flex-wrap justify-center gap-3 bg-neutral-900/50 p-2 rounded-2xl border border-white/5">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={cn(
                                        "px-8 py-3 rounded-xl text-sm md:text-base font-semibold transition-colors duration-150 border",
                                        activeCategory === cat.id
                                            ? "bg-white text-black border-white"
                                            : "bg-transparent text-neutral-400 border-transparent hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {t(cat.labelKey)}
                                </button>
                            ))}
                        </div>

                        {/* Filter Text Indicator */}
                        <AnimatePresence mode="wait">
                            <m.div
                                key={activeCategory}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={fadeTransition}
                                className="text-neutral-500 text-sm font-medium tracking-widest uppercase"
                            >
                                {t(`filters.showing`)}: <span className="text-white font-bold">{t(`filters.${activeCategory}`)}</span>
                            </m.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Single Item Carousel */}
                <Carousel items={filteredTemplates} t={t} isRTL={isArabic} />

            </section>
        </LazyMotion>
    );
}

// PERFORMANCE: TemplateItem using CSS transitions instead of Framer Motion for layout changes
const TemplateItem = memo(({ template, t, viewMode, setViewMode }: {
    template: Template;
    t: ReturnType<typeof useTranslations>;
    viewMode: "desktop" | "mobile";
    setViewMode: React.Dispatch<React.SetStateAction<"desktop" | "mobile">>;
}) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const title = t(`items.${template.titleKey}.title`);
    const description = t(`items.${template.descriptionKey}.description`);

    const handleDesktopClick = useCallback(() => setViewMode("desktop"), []);
    const handleMobileClick = useCallback(() => setViewMode("mobile"), []);
    const handlePlayClick = useCallback(() => setIsPlaying(prev => !prev), []);

    const isDesktop = viewMode === "desktop";
    const isMobile = viewMode === "mobile";

    return (
        <div className="w-full flex flex-col items-center">

            {/* Device Toggle Controls */}
            <div className="mb-4 z-30 flex items-center justify-center">
                <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-white/10">
                    <button
                        onClick={handleDesktopClick}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-150 text-xs font-medium",
                            isDesktop ? "bg-white text-black" : "text-neutral-400 hover:text-white"
                        )}
                    >
                        <Monitor size={14} />
                        <span>{t("toggle.desktop")}</span>
                    </button>
                    <button
                        onClick={handleMobileClick}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-150 text-xs font-medium",
                            isMobile ? "bg-white text-black" : "text-neutral-400 hover:text-white"
                        )}
                    >
                        <Smartphone size={14} />
                        <span>{t("toggle.mobile")}</span>
                    </button>
                </div>
            </div>

            {/* Device Window - PURE CSS TRANSITIONS for max performance */}
            <div className="relative w-full flex justify-center">
                <div
                    className={cn(
                        "relative bg-[#222] overflow-hidden transition-all duration-300 ease-out",
                        // CSS containment for performance
                        "contain-layout contain-paint",
                        isDesktop
                            ? "w-full max-w-[1400px] h-[65vh] rounded-t-2xl border border-white/10 border-b-0 shadow-lg"
                            : "w-[350px] h-[600px] rounded-[40px] border-8 border-[#1a1a1a] shadow-md"
                    )}
                >
                    {/* Safari-Style Window Header (Desktop Only) - No AnimatePresence */}
                    <div
                        className={cn(
                            "bg-[#333] flex items-end justify-between px-4 border-b border-black/20 select-none relative w-full overflow-hidden transition-all duration-200",
                            isDesktop ? "h-12 opacity-100" : "h-0 opacity-0"
                        )}
                    >
                        {/* Navigation Arrows + Refresh (Left) */}
                        <div className="absolute top-3.5 left-4 flex gap-4 text-neutral-400 items-center z-10">
                            <div className="flex gap-2">
                                <ChevronLeft size={16} />
                                <ChevronRight size={16} />
                            </div>
                            <RefreshCw size={14} />
                        </div>

                        {/* Active Tab */}
                        <div className="flex-1 flex items-end justify-center px-20 h-full">
                            <div className="relative w-full max-w-lg h-[34px] bg-[#222] rounded-t-lg flex items-center justify-center px-4 -mb-px">
                                <div className="flex items-center gap-2 text-[11px] text-neutral-300 font-medium">
                                    <Lock size={10} className="text-neutral-500" />
                                    <span>limitless.studio/{title.toLowerCase()}</span>
                                </div>
                                <X size={12} className="absolute right-3 text-neutral-500" />
                            </div>
                        </div>

                        {/* Window Controls (Right) */}
                        <div className="absolute top-3.5 right-4 flex gap-4 text-neutral-400 items-center">
                            <Minus size={16} />
                            <Square size={14} />
                            <X size={16} />
                        </div>
                    </div>

                    {/* Mobile Notch & Status Bar - No AnimatePresence */}
                    <div
                        className={cn(
                            "absolute top-0 left-0 right-0 z-20 pointer-events-none transition-opacity duration-150",
                            isMobile ? "opacity-100" : "opacity-0"
                        )}
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 md:w-28 md:h-7 bg-[#1a1a1a] rounded-b-[1rem] flex items-center justify-center">
                            <div className="w-12 h-1.5 md:w-16 md:h-2 bg-black/50 rounded-full" />
                        </div>
                        <div className="flex justify-between items-center px-5 pt-2 md:px-6 md:pt-3 text-[10px] font-medium text-white/50">
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

                    {/* Content Area */}
                    <div className="relative w-full h-full bg-[#111] overflow-hidden">
                        {isPlaying ? (
                            <iframe
                                src={template.demoUrl}
                                className="w-full h-full bg-white"
                                title={title}
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center relative bg-neutral-900">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                                <h3 className="text-6xl md:text-8xl font-black text-white/5 uppercase tracking-tighter select-none transform rotate-[-15deg] scale-150">{title}</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Info Bar - PURE CSS TRANSITIONS */}
            <div
                className={cn(
                    "bg-[#222] border border-white/10 border-t-0 relative z-20 flex transition-all duration-300 ease-out shadow-md",
                    isDesktop
                        ? "w-full max-w-[1400px] rounded-b-2xl p-5 flex-col md:flex-row items-start md:items-center justify-between gap-4"
                        : "w-[370px] mt-2 rounded-3xl p-3 flex-row items-center justify-between gap-3"
                )}
            >
                <div className={cn("flex flex-col gap-3 max-w-2xl", isMobile && "gap-1 flex-1 overflow-hidden")}>
                    <div className="flex items-center gap-3">
                        <h3 className={cn("text-2xl font-bold text-white", isMobile && "text-base")}>{title}</h3>
                        <span className={cn("text-[10px] uppercase font-bold tracking-wider text-black bg-white px-2 py-0.5 rounded-sm", isMobile && "px-1.5 py-0 text-[9px]")}>
                            {t(`filters.${template.category}`)}
                        </span>
                    </div>

                    <p className={cn("text-neutral-400 text-sm md:text-base leading-relaxed line-clamp-2", isMobile && "text-[10px] leading-tight line-clamp-1")}>
                        {description}
                    </p>

                    <div className={cn("flex flex-wrap gap-2 mt-2", isMobile && "mt-1 gap-1 flex-nowrap overflow-hidden")}>
                        {template.tags.map(tag => (
                            <span key={tag} className={cn("text-xs font-mono text-neutral-500 bg-neutral-900 border border-white/5 px-2 py-1 rounded-md", isMobile && "px-1.5 py-0.5 text-[9px] whitespace-nowrap")}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <button
                    onClick={handlePlayClick}
                    className={cn(
                        "group relative rounded-full font-bold text-sm overflow-hidden shrink-0 transition-colors duration-150",
                        isMobile ? "w-10 h-10 flex items-center justify-center p-0" : "px-8 py-3 w-full md:w-auto",
                        isPlaying
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-white text-black hover:bg-neutral-200"
                    )}
                >
                    <div className="relative z-10 flex items-center justify-center gap-2">
                        {isPlaying ? (
                            isMobile ? <Square size={14} fill="currentColor" /> : t("cta.stop_demo")
                        ) : (
                            <>
                                <Play size={16} fill="currentColor" />
                                {!isMobile && t("cta.view_demo")}
                            </>
                        )}
                    </div>
                </button>
            </div>

        </div>
    );
});
TemplateItem.displayName = "TemplateItem";
