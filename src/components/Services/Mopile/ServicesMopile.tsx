"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent, useSpring } from "motion/react";
import { IconWifi, IconBattery4, IconAntennaBars5, IconBrandApple, IconBrandAndroid, IconDeviceMobile, IconPalette } from "@tabler/icons-react";
import Header from "../../ui/header";

// Service Data for the Phone Loop
const services = [
    {
        id: "ios",
        title: "iOS Development",
        icon: <IconBrandApple size={32} className="text-white" />,
        color: "bg-blue-600",
        desc: "We engineer native Swift applications that define the standard for performance and fluidity on the App Store. By leveraging the latest iOS frameworks like SwiftUI and ARKit, we ensure your app feels right at home on every iPhone and iPad, delivering the premium experience users expect.",
        tagline: "Limitless Provide"
    },
    {
        id: "android",
        title: "Android Apps",
        icon: <IconBrandAndroid size={32} className="text-green-500" />,
        color: "bg-green-600",
        desc: "Our Android development strategy focuses on creating robust, scalable applications using Kotlin. We meticulously optimize for the vast landscape of devices and screen sizes, ensuring consistent performance and a Material Design aesthetic that feels modern and intuitive.",
        tagline: "Limitless Provide"
    },
    {
        id: "cross",
        title: "Cross Platform",
        icon: <IconDeviceMobile size={32} className="text-purple-500" />,
        color: "bg-purple-600",
        desc: "Reach a wider audience faster with our unified React Native and Flutter solutions. We build a single, high-quality codebase that compiles to native binaries, offering a seamless experience on both platforms without compromising on speed, touch responsiveness, or native feature access.",
        tagline: "Limitless Provide"
    },
    {
        id: "uiux",
        title: "Mobile UI/UX",
        icon: <IconPalette size={32} className="text-pink-500" />,
        color: "bg-pink-600",
        desc: "We don't just build apps; we craft experiences. Our design process is rooted in user research and behavioral patterns, creating interfaces that are not only visually stunning but also logical and easy to navigate, reducing friction and maximizing user retention.",
        tagline: "Limitless Provide"
    }
];

export function ServicesMopile() {
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
    const DURATION = 5000;

    // Monitor Scroll Progress
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
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
    const yParam = useTransform(smoothProgress, [0, 0.4], [-150, 20]);

    // 3. X Position
    const xParam = useTransform(smoothProgress, [0, 1], [0, 0]);

    // 4. Scale - Start bigger
    const scale = useTransform(smoothProgress, [0, 0.4], [1.3, 1]);

    // 5. Header Animations
    const textOpacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
    const leftTextX = useTransform(smoothProgress, [0.3, 0.5], [-100, 0]);
    const rightTextX = useTransform(smoothProgress, [0.3, 0.5], [100, 0]);


    return (
        <div ref={containerRef} className="relative h-[160vh] bg-[#0a0a0a] w-full overflow-clip font-sans">
            {/* Sticky Container - Reduced padding to give more space for the phone */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center perspective-1000 overflow-visible">

                {/* HEADERS */}
                < motion.div
                    style={{ opacity: textOpacity, x: leftTextX }
                    }
                    className="absolute uppercase top-[8%] left-[5%] md:left-[12%] z-50 pointer-events-none"
                >
                    <Header title="Mobile" className="md:text-8xl" />
                </motion.div >

                <motion.div style={{ opacity: textOpacity, x: rightTextX }} className="absolute uppercase top-[8%] right-[5%] md:right-[7%] z-50 pointer-events-none">
                    <Header title="Services" className="md:text-8xl" />
                </motion.div>


                {/* --- REALISTIC PHONE DEVICE --- */}
                <motion.div
                    className="relative grid place-items-center will-change-transform"
                    style={{
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
                            <div className="relative z-10 px-6 pt-16 pb-4 flex flex-col items-center justify-center text-center space-y-4">
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
                                        <h3 className="text-2xl font-bold text-white leading-tight max-w-[80%]">
                                            {services[activeService].title}
                                        </h3>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Interactive Glowing Timer Circle */}
                                <div
                                    className="relative w-32 h-32 flex items-center justify-center mt-6 cursor-pointer hover:scale-105 transition-transform"
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


                            {/* SERVICE LIST */}
                            <div className="relative z-10 w-full h-full flex flex-col justify-end pb-12 px-6">

                                {/* Interactive Cards Loop */}
                                <div className="flex flex-col gap-3">
                                    <AnimatePresence mode="wait">
                                        {/* List of services inside phone (Just Title/Icon) */}
                                        {services.map((service, index) => {
                                            // Only show current and next 2 for stack effect
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
                                                        relative p-4 rounded-3xl border border-white/10 backdrop-blur-md transition-all duration-300 flex items-center gap-4
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
                            </div>

                            {/* Bottom Home Indicator */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1.5 bg-white/50 rounded-full z-50 backdrop-blur-sm" />
                        </div>
                    </div>


                    {/* --- POP-OUT BUBBLES (Conditionally Rendered based on Scroll) --- */}
                    <AnimatePresence mode="wait">
                        {showPopOut && (
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
