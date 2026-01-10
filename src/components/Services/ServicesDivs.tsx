"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";
import { MacbookScroll } from "../ui/macbook-scroll";

// Animated text component with impressive effects
interface AnimatedTextBlockProps {
    opacity: MotionValue<number>;
    y: MotionValue<number>;
    scale: MotionValue<number>;
    blur: MotionValue<number>;
    title: React.ReactNode;
    description: string;
    className?: string;
}

function AnimatedTextBlock({
    opacity,
    y,
    scale,
    blur,
    title,
    description,
    className = ""
}: AnimatedTextBlockProps) {
    const filterBlur = useTransform(blur, (value) => `blur(${value}px)`);

    return (
        <motion.div
            style={{
                opacity,
                y,
                scale,
                filter: filterBlur,
            }}
            className={`absolute left-0 flex flex-col px-8 lg:px-20 ${className}`}
        >
            <motion.h2
                className="text-4xl lg:text-7xl font-black text-white mb-6 leading-tight"
                style={{
                    textShadow: "0 0 40px rgba(59, 130, 246, 0.3)"
                }}
            >
                {title}
            </motion.h2>
            <motion.p
                className="text-lg lg:text-xl text-zinc-400 max-w-lg leading-relaxed"
                style={{ opacity: useTransform(opacity, [0, 0.5, 1], [0, 0.5, 1]) }}
            >
                {description}
            </motion.p>
        </motion.div>
    );
}

export function ServicesDiv() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // ═══════════════════════════════════════════════════════════════
    // TEXT 1 ANIMATIONS - Visible by default, exits smoothly
    // ═══════════════════════════════════════════════════════════════
    const text1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.40], [1, 1, 0]);
    const text1Y = useTransform(scrollYProgress, [0, 0.25, 0.40], [0, 0, -50]);
    const text1Scale = useTransform(scrollYProgress, [0, 0.25, 0.40], [1, 1, 0.85]);
    const text1Blur = useTransform(scrollYProgress, [0, 0.25, 0.40], [0, 0, 12]);

    // ═══════════════════════════════════════════════════════════════
    // TEXT 2 ANIMATIONS - Appears when MacBook is fully open, stays visible at end
    // ═══════════════════════════════════════════════════════════════
    const text2Opacity = useTransform(scrollYProgress, [0.50, 0.65, 0.90, 1], [0, 1, 1, 0]);
    const text2Y = useTransform(scrollYProgress, [0.50, 0.65, 0.90, 1], [400, 0, 0, -100]);
    const text2Scale = useTransform(scrollYProgress, [0.50, 0.65, 0.90, 1], [0.85, 1, 1, 0.8]);
    const text2Blur = useTransform(scrollYProgress, [0.50, 0.65, 0.90, 1], [10, 0, 0, 10]);

    return (
        <div ref={containerRef} className="relative h-[200vh] bg-[#0a0a0a] w-full">

            {/* Fixed Left Side: Animated Text with impressive effects */}
            <div className="sticky left-0 top-0 w-full md:w-1/2 h-screen flex items-center justify-start z-20 pointer-events-none">
                <div className="relative w-full h-full">

                    {/* TEXT 1 - Web Development Services */}
                    <AnimatedTextBlock
                        opacity={text1Opacity}
                        y={text1Y}
                        scale={text1Scale}
                        blur={text1Blur}
                        className="top-[20%]"
                        title={
                            <>
                                Web <span className="text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">Development</span>
                            </>
                        }
                        description="Crafting high-performance websites with cutting-edge technologies. From responsive designs to complex web applications, we build digital experiences that captivate and convert."
                    />

                    {/* TEXT 2 - Custom Solutions */}
                    <AnimatedTextBlock
                        opacity={text2Opacity}
                        y={text2Y}
                        scale={text2Scale}
                        blur={text2Blur}
                        className="top-[25%]"
                        title={
                            <>
                                Custom <span className="text-green-500 drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]">Solutions</span>
                            </>
                        }
                        description="Tailored digital solutions built for every platform. Web, mobile, desktop — we engineer seamless experiences with custom functionality that scales with your business."
                    />

                </div>
            </div>

            {/* Right Side: MacbookScroll - stays in position */}
            <div className="hidden md:flex w-full justify-end sticky top-0 h-[10vh] items-center">
                <div className="w-1/2">
                    <MacbookScroll
                        src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop"
                        showGradient={false}
                    />
                </div>
            </div>

        </div>
    );
}

