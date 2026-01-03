"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import { MacbookScroll } from "../ui/macbook-scroll";

export function AboutDivs() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Text Animations synced with MacbookScroll
    // Image scrolls 0-40%, stays fixed 40-70%, fades 65-80%

    // Text 1: During lid opening and image scroll (0 - 0.35)
    const text1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.3, 0.4], [0, 1, 1, 0]);

    // Text 2: Aligned with fixed image position (0.35 - 0.7)
    const text2Opacity = useTransform(scrollYProgress, [0.35, 0.42, 0.65, 0.72], [0, 1, 1, 0]);

    // Text 3: As image fades out (0.68 - 0.9)
    const text3Opacity = useTransform(scrollYProgress, [0.68, 0.75, 0.85, 0.92], [0, 1, 1, 0]);

    // Text 4: End of scroll (0.88 - 1)
    const text4Opacity = useTransform(scrollYProgress, [0.88, 0.92, 0.98, 1], [0, 1, 1, 0.5]);


    return (
        <div ref={containerRef} className="relative h-[400vh] bg-black w-full">

            {/* Fixed Left Side: Animated Text - Aligned with Macbook */}
            <div className="fixed left-0 top-0 w-full md:w-1/2 h-screen flex items-start justify-start z-20 pointer-events-none pt-80">
                <div className="relative w-full px-8 lg:px-20">

                    {/* TEST TEXT 1 */}
                    <motion.div
                        style={{ opacity: text1Opacity }}
                        className="absolute left-0 top-0 flex flex-col"
                    >
                        <h2 className="text-4xl lg:text-7xl font-black text-white mb-6">
                            Test Text <span className="text-blue-500">ONE</span>
                        </h2>
                        <p className="text-lg text-zinc-400">
                            This is the first test text. Scroll progress: 0% - 25%
                        </p>
                    </motion.div>

                    {/* TEST TEXT 2 - Positioned lower to align with scrolled image */}
                    <motion.div
                        style={{ opacity: text2Opacity }}
                        className="absolute left-0 top-[35vh] flex flex-col px-8 lg:px-0"
                    >
                        <h2 className="text-4xl lg:text-7xl font-black text-white mb-6">
                            Test Text <span className="text-green-500">TWO</span>
                        </h2>
                        <p className="text-lg text-zinc-400">
                            Aligned with fixed image. Scroll progress: 35% - 70%
                        </p>
                    </motion.div>

                    {/* TEST TEXT 3 */}
                    <motion.div
                        style={{ opacity: text3Opacity }}
                        className="absolute left-0 top-0 flex flex-col"
                    >
                        <h2 className="text-4xl lg:text-7xl font-black text-white mb-6">
                            Test Text <span className="text-yellow-500">THREE</span>
                        </h2>
                        <p className="text-lg text-zinc-400">
                            This is the third test text. Scroll progress: 50% - 75%
                        </p>
                    </motion.div>

                    {/* TEST TEXT 4 */}
                    <motion.div
                        style={{ opacity: text4Opacity }}
                        className="absolute left-0 top-0 flex flex-col"
                    >
                        <h2 className="text-4xl lg:text-7xl font-black text-white mb-6">
                            Test Text <span className="text-red-500">FOUR</span>
                        </h2>
                        <p className="text-lg text-zinc-400">
                            This is the fourth test text. Scroll progress: 75% - 100%
                        </p>
                    </motion.div>

                </div>
            </div>

            {/* Right Side: Original MacbookScroll (scrolls naturally) */}
            <div className="hidden md:flex w-full justify-end">
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

