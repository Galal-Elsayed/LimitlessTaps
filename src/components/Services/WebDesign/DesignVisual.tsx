"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

export default function DesignVisual() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // 3D Rotation & Scale Animation
    // Initial: Rotated to the right (perspective view) -> Flat
    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

    // RotateY: Starts tilted (25deg) and flattens to 0deg
    const rotateY = useSpring(
        useTransform(scrollYProgress, [0, 0.4], [25, 0]),
        springConfig
    );
    // RotateX: Slight tilt from bottom up
    const rotateX = useSpring(
        useTransform(scrollYProgress, [0, 0.4], [10, 0]),
        springConfig
    );
    // Scale: Starts slightly smaller and zooms in
    const scale = useSpring(
        useTransform(scrollYProgress, [0, 0.4], [0.85, 1]),
        springConfig
    );
    // Y Position: Moves up into place
    const y = useSpring(
        useTransform(scrollYProgress, [0, 0.4], [-100, 0]),
        springConfig
    );


    return (
        <section ref={containerRef} className="w-full py-24 pb-48 px-4 min-[900px]:max-[1500px]:!px-32 bg-[#0a0a0a] flex justify-center overflow-visible perspective-[2000px] mt-8 relative z-20">
            <motion.div
                style={{
                    rotateY,
                    rotateX,
                    scale,
                    y,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-full max-w-[1400px]"
            >
                <MonitorFrame>
                    <FigmaUI />
                </MonitorFrame>
            </motion.div>
        </section>
    );
}

const MonitorFrame = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative mx-auto w-full transform-style-3d">
            {/* Monitor Stand (Hidden/Behind when tilted, adjusted for perspective) */}
            <div className="absolute -bottom-[120px] left-1/2 -translate-x-1/2 w-[240px] h-[140px] bg-[#1a1a1a] rounded-b-xl shadow-2xl skew-x-12 opacity-80" style={{ transform: "translateZ(-50px)" }} />

            {/* Base */}
            <div className="absolute -bottom-[120px] left-1/2 -translate-x-1/2 w-[400px] h-[30px] bg-[#222] rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-0 border-t border-white/5" style={{ transform: "translateZ(-20px)" }} />

            {/* Monitor Bezel */}
            <div className="relative bg-[#111] rounded-[2rem] p-5 shadow-[0_0_0_2px_#333,0_40px_80px_rgba(0,0,0,0.8)] z-20 overflow-hidden">
                {/* Branding */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[8px] font-bold text-white/10 tracking-[0.3em] uppercase">
                    Limitless Taps
                </div>

                {/* Inner Bezel (Black Border) */}
                <div className="bg-black rounded-[1.5rem] overflow-hidden relative shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] border border-white/5">
                    {/* Screen Content */}
                    <div className="relative w-full aspect-video bg-[#1e1e1e] overflow-hidden">
                        {children}

                        {/* Screen Reflection/Glare */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-30 pointer-events-none z-50 mix-blend-overlay" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- FIGMA / DESIGN TOOL UI REPLICA ---

const FigmaUI = () => {
    const t = useTranslations('WebDesign.visual');
    const locale = useLocale();
    const isRTL = locale === 'ar';

    const layerItems = [
        t('sidebar.layerItems.frame1'),
        t('sidebar.layerItems.heroSection'),
        t('sidebar.layerItems.textGroup'),
        t('sidebar.layerItems.heading'),
        t('sidebar.layerItems.subtext'),
        t('sidebar.layerItems.image'),
        t('sidebar.layerItems.footer'),
        t('sidebar.layerItems.background'),
    ];

    return (
        <div className="flex flex-col h-full w-full text-white font-sans select-none bg-[#1e1e1e]" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* 1. Top Toolbar */}
            <div className="h-10 bg-[#2c2c2c] border-b border-black flex items-center justify-between px-4 z-30 shrink-0">
                <div className="flex items-center gap-4">
                    {/* Menu Icon */}
                    <div className="w-4 h-4 rounded-sm bg-white/10 hover:bg-white/20 cursor-pointer" />
                    {/* Tools */}
                    <div className="flex gap-2">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className={`w-6 h-6 rounded hover:bg-blue-500/20 flex items-center justify-center ${i === 0 ? "bg-blue-500/20" : ""}`}>
                                <div className={`w-3 h-3 border border-white/40 ${i === 0 ? "bg-blue-500 border-blue-400" : ""}`} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-xs text-white/50 font-medium px-2">
                    {/* Short version for 300-500px screens */}
                    <span className="min-[500px]:hidden">
                        {t('toolbar.titleShort').split('-')[1]?.trim() || t('toolbar.titleShort')}
                    </span>
                    {/* Full version for larger screens */}
                    <span className="hidden min-[500px]:inline">
                        <span className="hidden md:inline">{t('toolbar.title').split('-')[0]}-</span>
                        <span>{t('toolbar.title').split('-')[1] || ''}</span>
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex -space-x-1">
                        <div className="w-5 h-5 rounded-full bg-red-500 border border-[#2c2c2c]" />
                        <div className="w-5 h-5 rounded-full bg-green-500 border border-[#2c2c2c]" />
                    </div>
                    <div className="px-2 py-1 bg-blue-600 rounded text-[10px] font-bold">{t('toolbar.share')}</div>
                    <div className="w-3 h-3 border-r-[6px] border-b-[6px] border-transparent border-t-white/50 border-l-white/50 rotate-45" /> {/* Play icon mock */}
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                {/* 2. Left Sidebar (Layers) */}
                <div className="w-48 bg-[#2c2c2c] border-r border-black flex flex-col pt-2 shrink-0 z-20 hidden md:flex">
                    <div className="px-3 py-2 text-[10px] font-bold text-white/40 uppercase tracking-wider">{t('sidebar.layers')}</div>
                    <div className="space-y-1 px-2">
                        {layerItems.map((layer, i) => (
                            <div key={i} className={`px-2 py-1 text-[11px] text-white/70 rounded hover:bg-blue-500/10 cursor-pointer flex items-center gap-2 ${layer.includes(t('sidebar.layerItems.textGroup').trim()) ? "bg-blue-500/20 text-white" : ""}`}>
                                <div className="w-2 h-2 border border-white/20" />
                                <pre className="font-sans">{layer}</pre>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Center Canvas */}
                <div className="flex-1 bg-[#1e1e1e] relative overflow-hidden flex items-center justify-center p-8">
                    {/* Canvas Background Grid */}
                    <div className="absolute inset-0 bg-[#1e1e1e]" style={{ backgroundImage: "radial-gradient(#444 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

                    {/* --- MAIN DESIGN CONTENT --- */}
                    {/* --- MAIN DESIGN CONTENT --- */}
                    <div className="relative w-full h-full md:w-[800px] md:h-[420px] bg-black border border-white/10 shadow-2xl flex flex-col items-center justify-center p-4 md:p-0 group">
                        {/* "We design your website from a to z" text */}
                        <div className="text-center z-10 relative space-y-4">
                            <motion.h2
                                className={`text-xl sm:text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter ${isRTL ? 'pb-4 leading-normal' : ''}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {t('canvas.headline')}
                                <br className="hidden sm:block" />
                                {t('canvas.headlineLine2')}
                                <br className={`block ${isRTL ? '' : 'sm:hidden'}`} />
                                <span className="inline-block">
                                    &nbsp;<span className="text-blue-500">{isRTL ? 'أ' : 'A'}</span> {isRTL ? 'إلى' : 'to'} <span className="text-purple-500">{isRTL ? 'ي' : 'Z'}</span>.
                                </span>
                            </motion.h2>
                            <motion.div
                                className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: 128 }}
                                transition={{ delay: 0.6, duration: 1 }}
                            />
                        </div>

                        {/* Abstract Floating Shapes on Canvas */}
                        <FloatingElement delay={0} className="top-10 left-10">
                            <div className="w-20 h-20 rounded-full bg-purple-500/20 blur-xl" />
                            <div className="w-12 h-12 bg-purple-600 rounded-xl rotate-12" />
                        </FloatingElement>

                        <FloatingElement delay={0.5} className="bottom-20 right-20">
                            <div className="w-24 h-24 rounded-full bg-blue-500/20 blur-xl" />
                            <div className="w-16 h-16 border-2 border-blue-500 rounded-full" />
                        </FloatingElement>

                        {/* Selection Box UI Mock */}
                        <div className="absolute inset-[-20px] border border-blue-500/50 hidden group-hover:block pointer-events-none">
                            <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 border border-white" />
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 border border-white" />
                            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 border border-white" />
                            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 border border-white" />
                            <div className="absolute -top-4 left-0 text-[10px] bg-blue-500 text-white px-1">{t('sidebar.layerItems.frame1')}</div>
                        </div>
                    </div>

                    {/* Cursor */}
                    <Cursor label={t('cursor.label')} />
                </div>

                {/* 4. Right Sidebar (Properties) */}
                <div className="w-56 bg-[#2c2c2c] border-l border-black flex flex-col pt-2 shrink-0 z-20 hidden md:flex">
                    <div className="px-4 py-2 flex items-center justify-between border-b border-white/5 pb-4">
                        <span className="text-[11px] font-bold">{t('sidebar.design')}</span>
                        <span className="text-[11px] text-white/40">{t('sidebar.prototype')}</span>
                    </div>

                    {/* Align Tools */}
                    <div className="p-4 border-b border-white/5">
                        <div className="flex justify-between mb-2">
                            {[...Array(6)].map((_, i) => <div key={i} className="w-4 h-4 bg-white/10 rounded-sm" />)}
                        </div>
                    </div>

                    {/* Properties List */}
                    <div className="p-4 space-y-4">
                        <PropertyRow label="X" value="1024" />
                        <PropertyRow label="Y" value="560" />
                        <PropertyRow label="W" value="100%" />
                        <PropertyRow label="H" value="Auto" />
                        <div className="h-px bg-white/5 w-full my-2" />
                        <div className="space-y-2">
                            <div className="text-[10px] uppercase font-bold text-white/40">{t('sidebar.fill')}</div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-white border border-white/20" />
                                <div className="text-xs text-white/80">#FFFFFF</div>
                                <div className="text-xs text-white/40 ml-auto">100%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PropertyRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex items-center justify-between text-xs">
        <span className="text-white/40">{label}</span>
        <span className="text-white/80">{value}</span>
    </div>
);

const FloatingElement = ({ children, className, delay }: { children: React.ReactNode, className?: string, delay: number }) => (
    <motion.div
        className={`absolute ${className}`}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    >
        {children}
    </motion.div>
);

const Cursor = ({ label }: { label: string }) => (
    <motion.div
        className="absolute z-50 pointer-events-none"
        initial={{ x: 200, y: 200 }}
        animate={{
            x: [200, 400, 300, 200],
            y: [200, 300, 150, 200],
        }}
        transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
        }}
    >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
            <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19169L11.7841 12.3673H5.65376Z" fill="black" stroke="white" strokeWidth="1" />
        </svg>
        <div className="absolute top-4 left-4 bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded ml-1">
            {label}
        </div>
    </motion.div>
);
