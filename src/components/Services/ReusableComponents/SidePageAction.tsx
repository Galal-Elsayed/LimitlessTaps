"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const SidePageAction = () => {
    // Parent container controls the staggering
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Fast staggering
                delayChildren: 0.1,
            },
        },
    };

    // Text reveals from bottom
    const textVariants: Variants = {
        hidden: { y: "100%" },
        visible: {
            y: "0%",
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1], // Custom snappy ease
            },
        },
    };

    // Lines spread out
    const lineVariants: Variants = {
        hidden: { scaleX: 0, opacity: 0 },
        visible: {
            scaleX: 1,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "circOut",
            },
        },
    };

    return (
        <section className="relative w-full min-h-[80vh] flex flex-col justify-center bg-[#0a0a0a] px-4 md:px-10 py-24 overflow-hidden">

            {/* Stagger Container */}
            <motion.div
                className="w-full max-w-[90%] mx-auto flex flex-col space-y-4 md:space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of container is visible
                variants={containerVariants}
            >

                {/* ROW 1: READY ----- TO */}
                <div className="flex items-center justify-between gap-4 md:gap-8 w-full">
                    <div className="overflow-hidden">
                        <motion.h2 variants={textVariants} className="text-[12vw] leading-[0.85] font-black tracking-tighter text-white">
                            READY
                        </motion.h2>
                    </div>
                    <motion.div variants={lineVariants} className="h-[2px] flex-grow bg-neutral-800 origin-left" />
                    <div className="overflow-hidden">
                        <motion.h2 variants={textVariants} className="text-[12vw] leading-[0.85] font-black tracking-tighter text-white">
                            TO
                        </motion.h2>
                    </div>
                </div>

                {/* ROW 2: WORK ----- WITH */}
                <div className="flex items-center justify-between gap-4 md:gap-8 w-full">
                    <div className="overflow-hidden">
                        <motion.h2 variants={textVariants} className="text-[12vw] leading-[0.85] font-black tracking-tighter text-white">
                            WORK
                        </motion.h2>
                    </div>
                    <motion.div variants={lineVariants} className="h-[2px] flex-grow bg-neutral-800 origin-left" />
                    <div className="overflow-hidden">
                        <motion.h2 variants={textVariants} className="text-[12vw] leading-[0.85] font-black tracking-tighter text-white">
                            WITH
                        </motion.h2>
                    </div>
                </div>

                {/* ROW 3: ----- US? */}
                <div className="flex items-center justify-between gap-4 md:gap-8 w-full">
                    <motion.div variants={lineVariants} className="h-[2px] flex-grow bg-neutral-800 origin-left" />
                    <div className="overflow-hidden">
                        <motion.h2 variants={textVariants} className="text-[12vw] leading-[0.85] font-black tracking-tighter text-white">
                            US?
                        </motion.h2>
                    </div>
                </div>

            </motion.div>

            {/* CTA & Subtext - Separate Stagger Group for speed */}
            <motion.div
                className="w-full max-w-[95%] mx-auto mt-16 md:mt-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                }}
            >
                <motion.p
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                    className="text-neutral-500 text-lg md:text-xl max-w-md font-light"
                >
                    Let's create something extraordinary together.
                    Turn your vision into a digital masterpiece.
                </motion.p>

                <motion.div
                    variants={{
                        hidden: { opacity: 0, scale: 0.9 },
                        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
                    }}
                >
                    <Button
                        size="lg"
                        className="group relative h-20 px-12 text-xl md:text-2xl rounded-full bg-white text-black hover:bg-neutral-200 transition-all duration-300"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Start a Project
                            <ArrowRight className="w-6 h-6 transition-transform group-hover:-rotate-45" />
                        </span>
                    </Button>
                </motion.div>
            </motion.div>

        </section>
    );
};

export default SidePageAction;
