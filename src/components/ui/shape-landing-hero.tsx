"use client";

import { motion } from "framer-motion";
import { Circle, Smartphone, Wifi, Share2, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";

function FloatingElement({
    className,
    delay = 0,
    width = 160,
    height = 55,
    rotate = 0,
    glowColor = "rgba(99, 102, 241, 0.15)", // Default indigo
    children,
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    glowColor?: string;
    children?: React.ReactNode;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
            style={{
                willChange: "transform",
                perspective: "1000px"
            }}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative group transition-transform duration-500 hover:scale-105"
            >
                {/* 3D Keyboard Button Structure */}
                <div className="relative w-full h-full transform-gpu transition-transform duration-200 group-active:translate-y-[4px]">

                    {/* Shadow / Depth Effect */}
                    <div className="absolute inset-x-0 -bottom-[6px] h-full bg-neutral-900 rounded-xl shadow-lg border-b-2 border-neutral-950/50" />

                    {/* Bottom Edge (Side of the key) */}
                    <div className="absolute inset-x-0 bottom-0 h-[10px] bg-neutral-800 rounded-b-xl border-x border-neutral-700/30" />

                    {/* Main Key Cap Surface */}
                    <div
                        className={cn(
                            "absolute inset-0 rounded-xl",
                            "bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950",
                            "border border-white/5",
                            "shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_6px_rgba(0,0,0,0.5)]",
                            "flex items-center justify-start px-4",
                            "overflow-hidden"
                        )}
                    >
                        {/* Glow Accent */}
                        <div
                            className="absolute inset-0 opacity-20 blur-2xl pointer-events-none"
                            style={{ backgroundColor: glowColor }}
                        />

                        {/* Top-left Indicator (Mechanical Key vibe) */}
                        <div className="absolute top-2 left-2 w-1 h-3 rounded-full opacity-30" style={{ backgroundColor: glowColor }} />

                        {/* Content */}
                        <div className="relative z-10 flex items-center gap-3 w-full">
                            <div className="flex-shrink-0 opacity-80" style={{ color: glowColor }}>
                                {children ? children : <Circle className="w-4 h-4" />}
                            </div>
                            <div className="flex flex-col items-start leading-none gap-1">
                                <span className="text-[10px] uppercase tracking-tighter text-white/20 font-bold select-none">
                                    Functional Key
                                </span>
                                <span className="text-sm font-semibold text-white/90 select-none">
                                    {className?.includes("taps") ? "TAPS" : "INPUT"}
                                </span>
                            </div>
                        </div>

                        {/* Highlight Reflection */}
                        <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/[0.03] to-transparent" />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function HeroGeometric({
    badge = "Limitless Taps",
    title1 = "Elevate Your",
    title2 = "Digital Connection",
}: {
    badge?: string;
    title1?: string;
    title2?: string;
}) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.08] via-transparent to-rose-500/[0.08] blur-3xl opacity-60" />
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/[0.1] blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-500/[0.1] blur-[120px] rounded-full" />

            {/* Floating 3D Keyboard Buttons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <FloatingElement
                    delay={0.3}
                    width={180}
                    height={65}
                    rotate={-12}
                    glowColor="#6366f1" // Indigo
                    className="left-[5%] md:left-[10%] top-[15%] md:top-[20%] taps"
                >
                    <MousePointer2 className="w-5 h-5 translate-x-1" />
                </FloatingElement>

                <FloatingElement
                    delay={0.5}
                    width={190}
                    height={65}
                    rotate={15}
                    glowColor="#f43f5e" // Rose
                    className="right-[5%] md:right-[10%] top-[70%] md:top-[75%]"
                >
                    <Smartphone className="w-5 h-5" />
                </FloatingElement>

                <FloatingElement
                    delay={0.4}
                    width={200}
                    height={70}
                    rotate={-8}
                    glowColor="#8b5cf6" // Violet
                    className="left-[15%] md:left-[20%] bottom-[10%] md:bottom-[15%]"
                >
                    <Wifi className="w-6 h-6" />
                </FloatingElement>

                <FloatingElement
                    delay={0.6}
                    width={180}
                    height={60}
                    rotate={20}
                    glowColor="#f59e0b" // Amber
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                >
                    <Share2 className="w-5 h-5" />
                </FloatingElement>

                <FloatingElement
                    delay={0.7}
                    width={160}
                    height={60}
                    rotate={-25}
                    glowColor="#06b6d4" // Cyan
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                >
                    <div className="font-bold text-xs">NFC</div>
                </FloatingElement>
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12 backdrop-blur-md shadow-2xl"
                    >
                        <Circle className="h-2 w-2 fill-rose-500 animate-pulse" />
                        <span className="text-sm font-medium text-white/70 tracking-[0.2em] uppercase">
                            {badge}
                        </span>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black mb-6 md:mb-10 tracking-tighter leading-none">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/20 select-none">
                                {title1}
                            </span>
                            <br />
                            <span
                                className={cn(
                                    "bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-rose-300 to-violet-400 select-none animate-gradient"
                                )}
                            >
                                {title2}
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className="text-lg sm:text-xl md:text-2xl text-white/30 mb-8 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4 select-none">
                            Connecting hardware and software through <span className="text-white/60 font-medium">limitless</span> innovation and <span className="text-white/60 font-medium">seamless</span> digital architecture.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/5 pointer-events-none" />
        </div>
    );
}

export { HeroGeometric }
