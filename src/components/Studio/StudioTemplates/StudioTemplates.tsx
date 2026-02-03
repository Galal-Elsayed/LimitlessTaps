"use client";

import React, { useState, useEffect, useCallback, memo, useMemo, useRef } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Monitor, Smartphone, Play, X, Lock, ChevronLeft, ChevronRight, RefreshCw, Minus, Square } from "lucide-react";
import { Header } from "@/components/ui/header";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

// Mock Data
type Category = "all" | "simple" | "medium" | "advanced";

interface Template {
    id: string;
    titleKey: string;
    descriptionKey: string;
    category: Category;
    image: string;
    desktopImage?: string;
    mobileImage?: string;
    demoUrl: string;
    tags: string[];
}

const TEMPLATES: Template[] = [
    {
        id: "1",
        titleKey: "nextsaas",
        descriptionKey: "nextsaas",
        category: "advanced",
        image: "/Studio/desktop/advanced/advanced-1.png",
        desktopImage: "/Studio/desktop/advanced/advanced-1.png",
        mobileImage: "/Studio/mobile/advanced/advanced-1.png",
        demoUrl: "https://digital-marketing-agency-ns-next.vercel.app/",
        tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"]
    },
    {
        id: "2",
        titleKey: "financial_platform",
        descriptionKey: "financial_platform",
        category: "advanced",
        image: "/Studio/desktop/advanced/advanced-2.png",
        desktopImage: "/Studio/desktop/advanced/advanced-2.png",
        mobileImage: "/Studio/mobile/advanced/advanced-2.png",
        demoUrl: "https://financial-management-platform-ns-ne.vercel.app/",
        tags: ["Fintech", "Dashboard", "SaaS", "Management"]
    },
    {
        id: "3",
        titleKey: "social_media",
        descriptionKey: "social_media",
        category: "advanced",
        image: "/Studio/desktop/advanced/advanced-3.png",
        desktopImage: "/Studio/desktop/advanced/advanced-3.png",
        mobileImage: "/Studio/mobile/advanced/advanced-3.png",
        demoUrl: "https://social-media-management-ns-next.vercel.app/",
        tags: ["Social Media", "Marketing", "SaaS", "Dashboard"]
    },
    {
        id: "4",
        titleKey: "ai_gadget",
        descriptionKey: "ai_gadget",
        category: "advanced",
        image: "/Studio/desktop/advanced/advanced-5.png",
        desktopImage: "/Studio/desktop/advanced/advanced-5.png",
        mobileImage: "/Studio/mobile/advanced/advanced-5.png",
        demoUrl: "https://ai-gadget-ns-next.vercel.app/",
        tags: ["AI", "Technology", "E-commerce", "Gadgets"]
    },
    // Medium
    {
        id: "5",
        titleKey: "time_tracking",
        descriptionKey: "time_tracking",
        category: "medium",
        image: "/Studio/desktop/medium/medium-1.png",
        desktopImage: "/Studio/desktop/medium/medium-1.png",
        mobileImage: "/Studio/mobile/medium/medium-1.png",
        demoUrl: "https://time-tracking-ns-next.vercel.app/",
        tags: ["Productivity", "SaaS", "Time Management", "React"]
    },
    {
        id: "6",
        titleKey: "property_management",
        descriptionKey: "property_management",
        category: "medium",
        image: "/Studio/desktop/medium/medium-2.png",
        desktopImage: "/Studio/desktop/medium/medium-2.png",
        mobileImage: "/Studio/mobile/medium/medium-2.png",
        demoUrl: "https://property-management-ns-next.vercel.app/",
        tags: ["Real Estate", "Management", "Platform", "Modern"]
    },
    {
        id: "7",
        titleKey: "analytics_dashboard",
        descriptionKey: "analytics_dashboard",
        category: "medium",
        image: "/Studio/desktop/medium/medium-3.png",
        desktopImage: "/Studio/desktop/medium/medium-3.png",
        mobileImage: "/Studio/mobile/medium/medium-3.png",
        demoUrl: "https://analytics-and-reporting-ns-next.vercel.app/",
        tags: ["Analytics", "Data", "Dashboard", "Visualization"]
    },
    // Simple
    {
        id: "8",
        titleKey: "construction_corp",
        descriptionKey: "construction_corp",
        category: "simple",
        image: "/Studio/desktop/simple/simple-1.png",
        desktopImage: "/Studio/desktop/simple/simple-1.png",
        mobileImage: "/Studio/mobile/simple/simple-1.png",
        demoUrl: "https://www.sogc-construction.com/en",
        tags: ["Construction", "Corporate", "Business", "Next.js"]
    },
    {
        id: "9",
        titleKey: "wealth_management",
        descriptionKey: "wealth_management",
        category: "simple",
        image: "/Studio/desktop/simple/simple-2.png",
        desktopImage: "/Studio/desktop/simple/simple-2.png",
        mobileImage: "/Studio/mobile/simple/simple-2.png",
        demoUrl: "https://wealth-management-ns-next-m99k.vercel.app/",
        tags: ["Finance", "Advisory", "Clean", "Professional"]
    },
    {
        id: "10",
        titleKey: "wealth_advisory",
        descriptionKey: "wealth_advisory",
        category: "simple",
        image: "/Studio/desktop/simple/simple-3.png",
        desktopImage: "/Studio/desktop/simple/simple-3.png",
        mobileImage: "/Studio/mobile/simple/simple-3.png",
        demoUrl: "https://wealth-management-ns-next-m99k.vercel.app/",
        tags: ["Consulting", "Finance", "Services", "Minimal"]
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
    const isDesktop = viewMode === "desktop";

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

    // PERFORMANCE: Preload images for smoother navigation
    useEffect(() => {
        const preloadImage = (src: string) => {
            const img = new window.Image();
            img.src = src;
        };

        // Preload next and previous items first (priority)
        const nextIndex = (currentIndex + 1) % items.length;
        const prevIndex = (currentIndex - 1 + items.length) % items.length;

        const priorityItems = [items[nextIndex], items[prevIndex]];
        priorityItems.forEach(item => {
            if (item.desktopImage) preloadImage(item.desktopImage);
            if (item.mobileImage) preloadImage(item.mobileImage);
            if (item.image) preloadImage(item.image);
        });

        // Then preload the rest sequentially with a slight delay to not block main thread
        const timeoutId = setTimeout(() => {
            items.forEach((item, idx) => {
                if (idx !== currentIndex && idx !== nextIndex && idx !== prevIndex) {
                    if (item.desktopImage) preloadImage(item.desktopImage);
                    if (item.mobileImage) preloadImage(item.mobileImage);
                    if (item.image) preloadImage(item.image);
                }
            });
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, [currentIndex, items]);

    if (!activeItem) return null;

    return (
        <div className="w-full flex items-center justify-center relative min-h-[70vh] md:min-h-[80vh] max-w-[1600px] mx-auto">

            {/* Previous Arrow */}
            <button
                onClick={() => paginate(isRTL ? 1 : -1)}
                className="hidden md:flex absolute -left-4 lg:-left-8 xl:-left-16 z-20 w-12 h-12 items-center justify-center rounded-full bg-white border border-neutral-200 text-black hover:bg-neutral-200 hover:text-black active:scale-95 transition-transform"
            >
                {isRTL ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
            </button>

            {/* Next Arrow */}
            <button
                onClick={() => paginate(isRTL ? -1 : 1)}
                className="hidden md:flex absolute -right-4 lg:-right-8 xl:-right-16 z-20 w-12 h-12 items-center justify-center rounded-full bg-white border border-neutral-200 text-black hover:bg-neutral-200 hover:text-black active:scale-95 transition-transform"
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
                    className="w-14 h-14 flex items-center justify-center rounded-full bg-white border border-neutral-200 text-black active:scale-95 transition-transform shadow-lg"
                >
                    {isRTL ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
                </button>
                <div className="text-base font-mono text-neutral-400 font-medium">
                    {currentIndex + 1} / {items.length}
                </div>
                <button
                    onClick={() => paginate(isRTL ? -1 : 1)}
                    className="w-14 h-14 flex items-center justify-center rounded-full bg-white border border-neutral-200 text-black active:scale-95 transition-transform shadow-lg"
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
                        <div className="flex flex-wrap justify-center gap-2 bg-neutral-900/60 p-1.5 rounded-full border border-white/5 backdrop-blur-sm">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={cn(
                                        "relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 z-10",
                                        activeCategory === cat.id ? "text-black" : "text-neutral-400 hover:text-white"
                                    )}
                                >
                                    {activeCategory === cat.id && (
                                        <m.div
                                            layoutId="activeFilter"
                                            className="absolute inset-0 bg-white rounded-full -z-10"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
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

    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        if (!isDesktop || !containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const width = entry.contentRect.width;
                if (width > 0) {
                    setScale(width / 2000);
                }
            }
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [isDesktop]);

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
                        "contain-layout contain-paint",
                        isDesktop
                            ? "w-full max-w-[1400px] h-[65vh] rounded-t-2xl border border-white/10 border-b-0 shadow-[0_0_50px_-5px_rgba(255,255,255,0.15)]"
                            : "w-[350px] h-[600px] rounded-[40px] border-8 border-[#1a1a1a] shadow-[0_0_30px_-5px_rgba(255,255,255,0.15)]"
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
                    <div ref={containerRef} className="relative w-full h-full bg-[#111] overflow-hidden">
                        {isPlaying ? (
                            <div
                                style={{
                                    width: isDesktop ? "2000px" : "100%",
                                    height: isDesktop ? `${100 / scale}%` : "100%",
                                    transform: isDesktop ? `scale(${scale})` : "none",
                                    transformOrigin: "top left",
                                }}
                            >
                                <iframe
                                    src={template.demoUrl}
                                    className="w-full h-full bg-white"
                                    title={title}
                                    loading="lazy"
                                />
                            </div>
                        ) : (
                            <div className="w-full h-full relative bg-neutral-900 group">
                                {(template.desktopImage || template.mobileImage) ? (
                                    <Image
                                        src={(isDesktop ? (template.desktopImage || template.image) : (template.mobileImage || template.image))}
                                        alt={title}
                                        fill
                                        className="object-cover object-top"
                                        sizes="(max-width: 768px) 100vw, 80vw"
                                        priority
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                                        <h3 className="text-6xl md:text-8xl font-black text-white/5 uppercase tracking-tighter select-none transform rotate-[-15deg] scale-150">{title}</h3>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Info Bar - PURE CSS TRANSITIONS */}
            <div
                className={cn(
                    "bg-[#222] border border-white/10 border-t-0 relative z-20 flex transition-all duration-300 ease-out",
                    isDesktop
                        ? "w-full max-w-[1400px] rounded-b-2xl p-5 flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[0_20px_50px_-5px_rgba(255,255,255,0.15)]"
                        : "w-[370px] mt-2 rounded-3xl p-3 flex-row items-center justify-between gap-3 shadow-[0_10px_30px_-5px_rgba(255,255,255,0.1)]"
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
