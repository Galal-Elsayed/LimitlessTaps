"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent, useSpring } from "motion/react";
import { IconWifi, IconBattery4, IconAntennaBars5, IconBrandApple, IconBrandAndroid, IconDevices, IconLayout } from "@tabler/icons-react";
import { useTranslations, useLocale } from "next-intl";
import Header from "../../ui/header";

// Service keys for mapping
const SERVICE_KEYS = ["ios", "android", "cross", "uiux"] as const;

// Service icons and colors (non-translatable)
const SERVICE_CONFIG = {
    ios: {
        icon: <IconBrandApple size={32} className="text-white" />,
        color: "bg-blue-950",
    },
    android: {
        icon: <IconBrandAndroid size={32} className="text-green-500" />,
        color: "bg-green-950",
    },
    cross: {
        icon: <IconDevices size={32} className="text-purple-500" />,
        color: "bg-purple-950",
    },
    uiux: {
        icon: <IconLayout size={32} className="text-pink-500" />,
        color: "bg-pink-950",
    }
};

export function ServicesMopile() {
    const t = useTranslations('mobileApplication');

    // Build services array with translations
    const services = SERVICE_KEYS.map(key => ({
        id: key,
        title: t(`services_mobile.${key}.title`),
        icon: SERVICE_CONFIG[key].icon,
        color: SERVICE_CONFIG[key].color,
        desc: t(`services_mobile.${key}.desc`),
        tagline: t(`services_mobile.${key}.tagline`),
    }));

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth physics-based scroll
    const smoothProgress = useSpring(scrollYProgress, {
        mass: 0.1,
        stiffness: 100,
        damping: 20,
        restDelta: 0.001
    });

    const [activeService, setActiveService] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showPopOut, setShowPopOut] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const locale = useLocale();
    const isAr = locale === 'ar';
    const DURATION = 3000; // Faster loop for mobile

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024); // lg breakpoint
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Monitor Scroll Progress (Only for Desktop)
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (isMobile) {
            setShowPopOut(true);
            setIsPlaying(true);
            return;
        }

        if (latest > 0.4 && !showPopOut) {
            setShowPopOut(true);
            setIsPlaying(true);
        } else if (latest <= 0.4 && showPopOut) {
            setShowPopOut(false);
            setIsPlaying(false);
        }
    });

    // Auto-loop services
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setActiveService((prev) => (prev + 1) % services.length);
            }, DURATION);
        }
        return () => clearInterval(interval);
    }, [isPlaying, activeService]); // Reset timer when activeService changes manually

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering row click
        setIsPlaying(!isPlaying);
    };

    // --- ANIMATIONS ---

    // 1. Rotation: Fully sideways (90deg) -> Vertical (0deg)
    const rotate = useTransform(smoothProgress, [0, 0.4], [90, 0]);

    // 2. Y Position - Use negative start value to pull it up closer to header in sideways state
    // 2. Y Position - Use negative start value to pull it up closer to header in sideways state
    const yParam = useTransform(smoothProgress, [0, 0.4], [-150, 40]);

    // 3. X Position
    const xParam = useTransform(smoothProgress, [0, 1], [0, 0]);

    // 4. Scale - Start bigger
    const scale = useTransform(smoothProgress, [0, 0.4], [1.3, 0.9]);

    // 5. Header Animations
    const textOpacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
    const leftTextX = useTransform(smoothProgress, [0.3, 0.5], [-100, 0]);
    const rightTextX = useTransform(smoothProgress, [0.3, 0.5], [100, 0]);


    return (
        <div ref={containerRef} className={`relative bg-[#0a0a0a] w-full overflow-clip font-sans pb-32 ${isMobile ? 'h-auto min-h-screen py-20' : 'h-[130vh]'}`}>
            {/* Sticky Container - Reduced padding to give more space for the phone */}
            <div className={`${isMobile ? 'relative h-full flex-col min-h-[800px]' : 'sticky top-0 h-screen'} w-full flex items-center justify-center perspective-1000 overflow-visible`}>

                {/* HEADERS */}
                < motion.div
                    style={isMobile ? { opacity: 1, x: 0 } : { opacity: textOpacity, x: leftTextX }}
                    className={`absolute uppercase ${isMobile ? 'z-30' : 'z-50'} pointer-events-none ${isMobile ? `${isAr ? 'top-16' : 'top-0'} left-1/2 -translate-x-1/2 text-center w-full` : 'top-[12%] left-[5%] md:left-[12%]'}`}
                >
                    <div>
                        <Header title={t('headers.mobile')} className={`md:text-8xl ${isMobile ? 'text-6xl mb-2' : ''} ${isAr ? 'pb-8 leading-normal' : 'pb-2'}`} />
                    </div>
                </motion.div >

                <motion.div
                    style={isMobile ? { opacity: 1, x: 0 } : { opacity: textOpacity, x: rightTextX }}
                    className={`absolute uppercase ${isMobile ? 'z-30' : 'z-50'} pointer-events-none ${isMobile ? `${isAr ? 'top-16' : 'top-16'} left-1/2 -translate-x-1/2 text-center w-full` : 'top-[12%] right-[5%] md:right-[7%]'}`}
                >
                    <div>
                        <Header title={t('headers.services')} className={`md:text-8xl ${isMobile ? 'text-6xl text-white/50' : ''} ${isAr ? 'pb-8 leading-normal' : 'pb-2'}`} />
                    </div>
                </motion.div>


                {/* --- REALISTIC PHONE DEVICE --- */}
                <motion.div
                    className={`relative grid place-items-center will-change-transform ${isMobile ? 'mt-42' : ''}`}
                    style={isMobile ? {
                        rotate: 0,
                        y: 0,
                        x: 0,
                        scale: 1,
                        transformStyle: "preserve-3d",
                        backfaceVisibility: "hidden"
                    } : {
                        rotate,
                        y: yParam,
                        x: xParam,
                        scale,
                        transformStyle: "preserve-3d", // Force 3D context
                        backfaceVisibility: "hidden"  // Optimization hint
                    }}
                >
                    {/* Phone Frame */}
                    <div className="relative  w-[320px] h-[650px] md:w-[380px] md:h-[780px] bg-black rounded-[55px] shadow-2xl overflow-hidden ring-1 ring-white/20 group cursor-pointer z-20 ">
                        {/* Frame Details */}
                        <div className="absolute inset-0 rounded-[55px] border-[6px] border-[#3a3a3a] z-50 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                            <div className="absolute inset-[-2px] rounded-[57px] border-[2px] border-white/20 opacity-50" />
                        </div>
                        <div className="absolute inset-[6px] rounded-[48px] border-[8px] border-black z-40 pointer-events-none" />
                        <div className="absolute top-7 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-full z-50 flex items-center justify-center gap-3 px-3 shadow-lg">
                            <div className="w-3 h-3 rounded-full bg-[#1a1a1a] shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]" />
                        </div>

                        {/* --- INTERACTIVE SCREEN CONTENT --- */}
                        <div className="relative w-full h-full bg-zinc-950 flex flex-col font-sans overflow-hidden">
                            <div className="absolute inset-0 z-0">
                                <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
                                {/* Ambient blob removed as per request to focus glow on lines only */}
                            </div>

                            <div className="relative z-50 flex justify-between items-center px-9 pt-6 text-white font-medium text-[13px] tracking-wide opacity-80">
                                <span>9:41</span>
                                <div className="flex gap-1.5 items-center">
                                    <IconAntennaBars5 size={14} />
                                    <IconWifi size={14} />
                                    <IconBattery4 size={14} />
                                </div>
                            </div>

                            {/* --- TOP DYNAMIC AREA & TIMER --- */}
                            <div className={`relative z-10 px-6 ${isMobile ? 'pt-8 pb-2 space-y-2' : 'pt-16 pb-4 space-y-4'} flex flex-col items-center justify-center text-center`}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`title-${activeService}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex flex-col items-center"
                                    >
                                        <div className="text-xs text-white/50 uppercase tracking-widest mb-2 font-semibold">
                                            {services[activeService].tagline}
                                        </div>
                                        <h3 className={`text-xl md:text-2xl font-bold text-white max-w-[90%] ${isAr ? 'leading-relaxed' : 'leading-tight'}`}>
                                            {services[activeService].title}
                                        </h3>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Interactive Glowing Timer Circle */}
                                <div
                                    className={`relative ${isMobile ? 'w-24 h-24 mt-2' : 'w-32 h-32 mt-6'} flex items-center justify-center cursor-pointer hover:scale-105 transition-transform`}
                                    onClick={togglePlay}
                                >
                                    {/* Background Circle (No Glow) */}
                                    <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
                                        {/* DEFINE GLOW FILTER - Refined for tighter stroke glow */}
                                        <defs>
                                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                                {/* Reduced blur radius for sharper glow on the line */}
                                                <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
                                                <feMerge>
                                                    <feMergeNode in="coloredBlur" />
                                                    <feMergeNode in="SourceGraphic" />
                                                </feMerge>
                                            </filter>
                                        </defs>

                                        <path
                                            className="text-white/10"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                        {/* Animated Path (GLOWS via Filter) */}
                                        {isPlaying && (
                                            <motion.path
                                                key={activeService}
                                                className="text-white"
                                                filter="url(#glow)"
                                                strokeDasharray="100, 100"
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: DURATION / 1000, ease: "linear" }}
                                            />
                                        )}
                                        {/* Static ring when paused */}
                                        {!isPlaying && (
                                            <path
                                                className="text-white/30"
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                            />
                                        )}
                                    </svg>

                                    {/* Play/Pause Icon Button */}
                                    <div className="absolute inset-0 flex items-center justify-center text-white">
                                        {isPlaying ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
                                                <path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="ml-1 opacity-80">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M7 4v16l13 -8z" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            </div>


                            {/* SERVICE LIST / CARD DISPLAY */}
                            <div className="relative z-10 w-full h-full flex flex-col justify-end pb-12 px-6">

                                {/* Mobile: Card Carousel View inside Phone */}
                                {isMobile ? (
                                    <div className="flex flex-col items-center justify-center h-full pb-20">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={services[activeService].id}
                                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                                transition={{ duration: 0.3 }}
                                                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 text-center shadow-2xl relative w-full"
                                            >
                                                {/* Navigation Dots */}
                                                <div className="flex justify-center gap-1.5 mb-4">
                                                    {services.map((_, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === activeService ? 'bg-white w-4' : 'bg-white/30'}`}
                                                        />
                                                    ))}
                                                </div>

                                                <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center ${services[activeService].color} text-white shadow-lg mb-4`}>
                                                    {services[activeService].icon}
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-2">{services[activeService].title}</h3>
                                                <p className="text-zinc-300 text-sm leading-relaxed line-clamp-4">{services[activeService].desc}</p>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    /* Desktop: Interactive Cards List Loop */
                                    <div className="flex flex-col gap-3">
                                        <AnimatePresence mode="wait">
                                            {services.map((service, index) => {
                                                const isActive = index === activeService;
                                                return (
                                                    <motion.div
                                                        key={service.id}
                                                        onClick={() => setActiveService(index)}
                                                        animate={{
                                                            scale: isActive ? 1 : 0.95,
                                                            opacity: isActive ? 1 : 0.4,
                                                        }}
                                                        className={`
                                                            p-4
                                                            relative rounded-3xl border border-white/10 backdrop-blur-md transition-all duration-300 flex items-center gap-4
                                                            ${isActive ? 'bg-white/10 shadow-2xl z-20' : 'bg-transparent hover:bg-white/5 z-10'}
                                                        `}
                                                    >
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? service.color : 'bg-zinc-800'} text-white shadow-lg transition-colors duration-300`}>
                                                            {service.icon}
                                                        </div>
                                                        <div className="text-white font-bold text-lg">{service.title}</div>
                                                    </motion.div>
                                                )
                                            })}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </div>

                            {/* Bottom Home Indicator */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1.5 bg-white/50 rounded-full z-50 backdrop-blur-sm" />
                        </div>
                    </div>


                    {/* --- POP-OUT BUBBLES (Conditionally Rendered based on Scroll) --- */}
                    <AnimatePresence mode="wait">
                        {showPopOut && !isMobile && (
                            <motion.div
                                key={`desc-${activeService}`}
                                // Position slightly LOWER than center of tap (approx +15% offset from previous)
                                style={{ top: `${38 + activeService * 10}%` }}
                                initial={{ opacity: 0, scale: 0.9, x: activeService % 2 === 0 ? -30 : 30 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ type: "spring", bounce: 0.3 }}
                                className={`
                                    absolute w-[360px] md:w-[500px] z-10 
                                    ${activeService % 2 === 0 ? '-left-[270px] md:-left-[550px]' : '-right-[270px] md:-right-[550px]'}
                                `}
                            >
                                <div className="relative bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl text-center">
                                    <svg className={`absolute top-1/2 -translate-y-1/2 w-28 h-14 text-white/30 pointer-events-none ${activeService % 2 === 0 ? '-right-24' : '-left-24 rotate-180'}`} viewBox="0 0 100 50">
                                        <path d="M0,25 C40,25 60,35 100,5" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
                                        <circle cx="0" cy="25" r="3" fill="currentColor" />
                                    </svg>
                                    <h3 className={`text-4xl font-bold mb-4 ${services[activeService].color.replace('bg-', 'text-')}`}>{services[activeService].title}</h3>
                                    <p className="text-zinc-200 text-lg leading-relaxed font-medium">{services[activeService].desc}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </motion.div>
            </div>
        </div >
    );
}
