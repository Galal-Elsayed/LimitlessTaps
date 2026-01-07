"use client";
import React, { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/CanvasRevealEffect";
import { ArrowUpRight, X, Code, Smartphone, Cloud, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

// ------------------------------------------------------------------
// Sub-components & Shapes (Defined first to avoid hoisting issues)
// ------------------------------------------------------------------

const HoverEffect = ({ canvasProps }: { canvasProps: any }) => {
    return (
        <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">
            <div className="absolute inset-0 bg-neutral-900/90 mix-blend-overlay" />
            <div className="absolute -inset-16">
                <CanvasRevealEffect {...canvasProps} />
            </div>
        </div>
    )
}

// Shape 1: Code/Structure (White/Gray/Silver)
const CodeShape = () => {
    return (
        <div dir="ltr" className="relative w-48 h-32 transform rotate-[-12deg] group-hover:rotate-[-5deg] group-hover:scale-105 transition-all duration-700 will-change-transform transform-gpu">
            {/* Base Glass */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-[0_0_30px_rgba(255,255,255,0.05)]" />

            {/* Animated Code Lines */}
            <div className="p-5 space-y-3 opacity-60">
                <div className="w-1/3 h-2 bg-white/20 rounded animate-pulse" />
                <div className="w-3/4 h-2 bg-white/10 rounded" />
                <div className="w-full h-2 bg-white/10 rounded" />
                <div className="w-5/6 h-2 bg-white/10 rounded" />
                <div className="flex gap-2 pt-2">
                    <div className="w-8 h-8 rounded bg-white/10" />
                    <div className="w-8 h-8 rounded bg-white/10" />
                </div>
            </div>

            {/* Floating Element with Animated Neon Tags */}
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-black/80 border border-white/20 rounded-lg backdrop-blur-xl flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.1)] group-hover:-translate-y-2 transition-transform duration-500 delay-100 transform-gpu overflow-hidden">
                {/* Opening Tag */}
                <span dir="ltr" className="text-4xl font-mono font-bold text-white transition-all duration-500 group-hover:-translate-x-3 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]">
                    &lt;
                </span>

                {/* Closing Tag */}
                <span dir="ltr" className="text-4xl font-mono font-bold text-white transition-all duration-500 group-hover:translate-x-3 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]">
                    &gt;
                </span>

                {/* Hidden Neon Pulse Center */}
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-mono font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    /
                </span>
            </div>
        </div>
    )
}

// Shape 2: Mobile Interface (White/Gray/Silver)
const MobileShape = () => {
    return (
        <div dir="ltr" className="relative w-32 h-56 transform rotate-[10deg] translate-y-4 group-hover:rotate-[5deg] group-hover:translate-y-0 transition-all duration-700 will-change-transform transform-gpu">
            {/* Phone Body */}
            <div className="absolute inset-0 bg-black border-2 border-white/20 rounded-[2rem] shadow-[0_0_40px_rgba(255,255,255,0.1)] overflow-hidden">
                {/* Screen Content */}
                <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 via-white/5 to-transparent" />

                {/* UI Elements */}
                <div className="absolute top-12 left-4 right-4 space-y-3">
                    <div className="flex gap-2">
                        <div className="w-10 h-10 rounded-full bg-white/20" />
                        <div className="space-y-1 flex-1 py-1">
                            <div className="w-full h-2 bg-white/20 rounded-full" />
                            <div className="w-2/3 h-2 bg-white/10 rounded-full" />
                        </div>
                    </div>
                    <div className="w-full h-24 bg-white/10 rounded-xl" />
                    <div className="grid grid-cols-2 gap-2">
                        <div className="h-16 bg-white/10 rounded-lg" />
                        <div className="h-16 bg-white/10 rounded-lg" />
                    </div>
                </div>

                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-white/10 rounded-b-xl border border-white/10" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -left-8 bottom-12 px-4 py-2 bg-white text-black font-bold text-xs rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform duration-300 transform-gpu">
                NATIVE
            </div>
        </div>
    )
}

// Shape 3: Cloud Network (White/Gray/Silver)
const CloudShape = () => {
    return (
        <div dir="ltr" className="relative w-48 h-48 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-1000 will-change-transform transform-gpu">
            {/* Central Core */}
            <div className="absolute w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
            <div className="relative w-16 h-16 bg-black border border-white/20 rounded-full flex items-center justify-center z-20 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                <Cloud className="text-white size-8 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
            </div>

            {/* Orbiting Nodes */}
            {[0, 120, 240].map((deg, i) => (
                <div
                    key={i}
                    className="absolute w-full h-full animate-[spin_10s_linear_infinite]"
                    style={{ animationDelay: `-${i * 3.33}s` }}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black border border-white/20 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform">
                        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    </div>
                    {/* Connecting Line */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-px h-[calc(50%-2rem)] bg-gradient-to-b from-white/20 to-transparent" />
                </div>
            ))}

            {/* Outer Ring */}
            <div className="absolute inset-0 border border-dashed border-white/10 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
        </div>
    )
}

// ------------------------------------------------------------------
// Canvas Props Config
// ------------------------------------------------------------------

const canvasPropsConfig = {
    custom: {
        animationSpeed: 5.1,
        containerClassName: "bg-black",
        colors: [[255, 255, 255], [138, 143, 152]],
        dotSize: 2,
        opacities: [0.1, 0.2, 0.3, 0.5, 0.8],
    },
    mobile: {
        animationSpeed: 3,
        containerClassName: "bg-black",
        colors: [[200, 200, 200], [255, 255, 255]],
        dotSize: 4,
        opacities: [0, 0, 0, 0.3, 0.5, 0.8],
    },
    cloud: {
        animationSpeed: 3,
        containerClassName: "bg-black",
        colors: [[100, 100, 100], [180, 180, 180]],
        dotSize: 3,
        opacities: [0.1, 0.1, 0.2, 0.3, 0.5],
    },
};

// ------------------------------------------------------------------
// Main Component
// ------------------------------------------------------------------

const springTransition = {
    type: "spring",
    damping: 25,
    stiffness: 120,
    mass: 0.5
} as const;

export default function AboutCards() {
    const t = useTranslations("aboutUs");
    const [activeCard, setActiveCard] = useState<any | null>(null);
    const id = useId();

    const services = [
        {
            key: "custom",
            icon: <Code className="size-10 text-white/50 group-hover:text-white transition-colors" />,
            canvasProps: canvasPropsConfig.custom,
            shape: <CodeShape />,
        },
        {
            key: "mobile",
            icon: <Smartphone className="size-10 text-white/50 group-hover:text-white transition-colors" />,
            canvasProps: canvasPropsConfig.mobile,
            shape: <MobileShape />,
        },
        {
            key: "cloud",
            icon: <Cloud className="size-10 text-white/50 group-hover:text-white transition-colors" />,
            canvasProps: canvasPropsConfig.cloud,
            shape: <CloudShape />,
        },
    ];

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActiveCard(null);
            }
        }
        if (activeCard) {
            document.body.style.overflow = "hidden";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [activeCard]);

    // Handle outside click close
    const handleOutsideClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setActiveCard(null);
        }
    };

    // Parse section title with gradient
    const sectionTitle = t.raw("cards.section_title");
    const titleMatch = sectionTitle.match(/<gradient>(.*?)<\/gradient>/);
    const titleParts = titleMatch ? {
        before: sectionTitle.split('<gradient>')[0],
        gradient: titleMatch[1],
        after: sectionTitle.split('</gradient>')[1] || ''
    } : { before: sectionTitle, gradient: '', after: '' };

    return (
        <section className="w-full bg-gradient-to-b from-black via-black to-[#0a0a0a] py-16 md:py-24 relative overflow-hidden">
            <div className="mx-auto w-full max-w-7xl px-2 md:px-8">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 md:mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        {titleParts.before}
                        {titleParts.gradient && (
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--white)] to-[var(--light-grey)]">
                                {titleParts.gradient}
                            </span>
                        )}
                        {titleParts.after}
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        {t("cards.section_subtitle")}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.key}
                            layoutId={`card-${service.key}-${id}`}
                            layout
                            onClick={() => setActiveCard(service)}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ ...springTransition, delay: index * 0.2 }}
                            className="group relative flex h-[450px] md:h-[500px] w-3/4 md:w-full mx-auto flex-col overflow-hidden border border-white/10 bg-gradient-to-b from-white/10 via-neutral-900/50 to-black hover:border-white/20 hover:shadow-2xl hover:shadow-neutral-500/10 rounded-[2rem] cursor-pointer"
                        >
                            {/* Unique Reveal Effect per card */}
                            <HoverEffect canvasProps={service.canvasProps} />

                            <div className="relative z-20 flex flex-col h-full p-8">
                                <div className="mb-auto">
                                    <motion.h3
                                        layoutId={`title-${service.key}-${id}`}
                                        layout
                                        className="mb-3 text-3xl font-bold text-white tracking-tight"
                                    >
                                        {t(`cards.services.${service.key}.title`)}
                                    </motion.h3>
                                    <motion.p
                                        layoutId={`desc-${service.key}-${id}`}
                                        layout
                                        className="max-w-xs text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors leading-relaxed"
                                    >
                                        {t(`cards.services.${service.key}.description`)}
                                    </motion.p>
                                </div>

                                {/* Integrated Shape Container */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-30 group-hover:opacity-100 transition-opacity duration-700 ease-in-out will-change-[opacity,transform]">
                                    {service.shape}
                                </div>

                                <div className="mt-8 relative z-30 flex items-end justify-between">
                                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                                        {service.icon}
                                    </div>

                                    <button className="flex items-center gap-1 text-xs font-bold text-neutral-500 group-hover:text-white transition-colors border border-white/5 group-hover:border-white/20 px-4 py-2 rounded-full uppercase tracking-wider bg-black/50 backdrop-blur-md">
                                        {t(`cards.services.${service.key}.cta`)} <ArrowUpRight className="size-3" />
                                    </button>
                                </div>
                            </div>

                            {/* Animated Border Gradient on Hover */}
                            <div className="absolute inset-0 pointer-events-none border border-transparent group-hover:border-white/10 transition-colors duration-300 rounded-lg" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence
                onExitComplete={() => {
                    document.body.style.overflow = "auto";
                }}
            >
                {activeCard && (
                    <div className="fixed inset-0 z-[100] grid place-items-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleOutsideClick}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm h-full w-full"
                        />
                        <motion.div
                            layoutId={`card-${activeCard.key}-${id}`}
                            layout
                            transition={springTransition}
                            className="w-3/4 md:w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden relative z-[101] m-4 shadow-2xl shadow-black/50"
                            style={{ maxHeight: "85vh", display: "flex", flexDirection: "column" }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setActiveCard(null)}
                                className="absolute top-4 right-4 z-50 p-2 bg-black/40 hover:bg-neutral-800 rounded-full text-white transition-colors border border-white/10"
                            >
                                <X className="size-5" />
                            </button>

                            {/* Modal Header */}
                            <div className="relative h-60 w-full overflow-hidden shrink-0">
                                <div className="absolute inset-0">
                                    <CanvasRevealEffect
                                        {...activeCard.canvasProps}
                                        animationSpeed={3}
                                        containerClassName="bg-[#0a0a0a]"
                                        opacities={[0.5, 0.5, 0.5, 0.8, 1]} // Higher opacity for modal header
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                                <div className="absolute bottom-6 left-8">
                                    <motion.h3
                                        layoutId={`title-${activeCard.key}-${id}`}
                                        layout
                                        className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight"
                                    >
                                        {t(`cards.services.${activeCard.key}.title`)}
                                    </motion.h3>
                                    <p className="text-neutral-400 text-lg">{t(`cards.services.${activeCard.key}.description`)}</p>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-8 overflow-y-auto custom-scrollbar">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="prose prose-invert max-w-none"
                                >
                                    <h4 className="text-2xl font-semibold text-white mb-6">{t(`cards.services.${activeCard.key}.details_heading`)}</h4>
                                    <div className="space-y-4 text-neutral-300">
                                        <p>{t(`cards.services.${activeCard.key}.details_content`)}</p>
                                        <ul className="space-y-2">
                                            {(t.raw(`cards.services.${activeCard.key}.features`) as string[]).map((item: string) => (
                                                <li key={item} className="flex items-start gap-2">
                                                    <CheckCircle2 className="mt-1 size-4 text-white" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="mt-10 pt-6 border-t border-white/10 flex justify-end gap-4"
                                >
                                    <button onClick={() => setActiveCard(null)} className="px-6 py-2.5 text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                                        {t("cards.modal.close")}
                                    </button>
                                    <button className="px-8 py-2.5 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                        {t("cards.modal.inquire")}
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
