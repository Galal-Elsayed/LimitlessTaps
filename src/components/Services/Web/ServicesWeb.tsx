"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
    IconBrightnessDown,
    IconBrightnessUp,
    IconCaretRightFilled,
    IconCaretUpFilled,
    IconChevronUp,
    IconMicrophone,
    IconMoon,
    IconPlayerSkipForward,
    IconPlayerTrackNext,
    IconPlayerTrackPrev,
    IconTable,
    IconVolume,
    IconVolume2,
    IconVolume3,
    IconSearch,
    IconWorld,
    IconCommand,
    IconCaretLeftFilled,
    IconCaretDownFilled,
} from "@tabler/icons-react";
import { GlowingHeader } from "../../ui/GlowingHeader";

// --- TEXT CONTENT CONSTANTS ---
const TOPICS = [
    {
        title: "Web Development",
        desc: "Pixel-perfect, responsive web solutions.",
        color: "text-white"
    },
    {
        title: "eCommerce",
        desc: "Scalable storefronts that convert.",
        color: "text-white"
    },
    {
        title: "SaaS Platforms",
        desc: "Robust architecture for modern software.",
        color: "text-white"
    },
    {
        title: "UI/UX Design",
        desc: "Interactive experiences that engage users.",
        color: "text-white"
    }
];

export default function ServicesWeb() {
    return (
        <section className="min-h-screen bg-[#0a0a0a] py-24 px-4 overflow-hidden flex flex-col items-center">


            {/* 2. Main Layout: 3 Columns - Widened */}
            <div className="w-full max-w-[1800px] grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-center">

                {/* Left Column: Narrative */}
                <div className="lg:col-span-3 order-2 lg:order-1 space-y-12 text-right lg:text-right">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl font-bold text-white mb-4">Precision Engineering</h3>
                        <p className="text-white/40 leading-relaxed text-lg">
                            We build with clean, maintainable code that scales. Performance is not an afterthought, it's our baseline.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl font-bold text-white mb-4">Modern Stack</h3>
                        <p className="text-white/40 leading-relaxed text-lg">
                            Leveraging Next.js, React, and cutting-edge tools to deliver blazing fast applications.
                        </p>
                    </motion.div>
                </div>

                {/* Center Column: MacBook (Larger) */}
                <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center perspective-[1200px] relative z-20 py-10">
                    {/* Glow effect behind laptop */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[80%] bg-slate-500/10 blur-[120px] rounded-full pointer-events-none" />

                    <div className="scale-[0.8] md:scale-[1.2] xl:scale-[1.3] transform-gpu">
                        <MacbookPresentation />
                    </div>
                </div>

                {/* Right Column: Narrative */}
                <div className="lg:col-span-3 order-3 lg:order-3 space-y-12 text-left">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl font-bold text-white mb-4">Global Reach</h3>
                        <p className="text-white/40 leading-relaxed text-lg">
                            Applications designed to perform globally, with CDNs and edge computing integration.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl font-bold text-white mb-4">Interactive UI</h3>
                        <p className="text-white/40 leading-relaxed text-lg">
                            Immersive interfaces that delight users and keep them engaged longer.
                        </p>
                    </motion.div>
                </div>

            </div>

        </section>
    );
}

// --- MACBOOK COMPONENTS ---

function MacbookPresentation() {
    const [step, setStep] = useState<"logo" | "loop">("logo");
    const [loopIndex, setLoopIndex] = useState(0);

    // Initial Logo Timer
    useEffect(() => {
        const timer = setTimeout(() => {
            setStep("loop");
        }, 3000); // Show logo for 3 seconds
        return () => clearTimeout(timer);
    }, []);

    // Loop Timer
    useEffect(() => {
        if (step !== "loop") return;
        const interval = setInterval(() => {
            setLoopIndex((prev) => (prev + 1) % TOPICS.length);
        }, 3000); // Change text every 3 seconds
        return () => clearInterval(interval);
    }, [step]);


    return (
        <div className="flex flex-col items-center py-12 relative">
            <Lid step={step} loopIndex={loopIndex} />
            <div className="-mt-1">
                <Base />
            </div>
        </div>
    );
}


function Lid({ step, loopIndex }: { step: "logo" | "loop", loopIndex: number }) {
    return (
        <div className="relative [perspective:800px]">
            {/* Outer Shell */}
            <div
                style={{
                    transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
                    transformOrigin: "bottom",
                    transformStyle: "preserve-3d",
                }}
                className="relative h-[12rem] w-[32rem] rounded-2xl bg-[#010101] p-2"
            >
                <div
                    style={{
                        boxShadow: "0px 2px 0px 2px #171717 inset",
                    }}
                    className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#010101]"
                >
                    {/* Lid Logo (Apple style but custom) */}
                    <span className="text-white/20 font-bold uppercase tracking-widest text-xs">Limitless</span>
                </div>
            </div>

            {/* Screen */}
            <div
                style={{
                    transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
                    transformOrigin: "bottom",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-0 h-[15rem] w-[32rem] rounded-2xl bg-[#010101] p-2"
            >
                <div className="absolute inset-0 h-full w-full rounded-xl overflow-hidden bg-black border-[4px] border-[#1a1a1a]">

                    {/* --- SCREEN CONTENT --- */}
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                        <AnimatePresence mode="wait">
                            {step === "logo" ? (
                                <motion.div
                                    key="logo"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                                    transition={{ duration: 0.8 }}
                                    className="relative w-40 h-40"
                                >
                                    <Image src="/Logo/Main-Logo-Static.png" alt="Logo" fill className="object-contain" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={`loop-${loopIndex}`}
                                    className="text-center"
                                >
                                    {/* Pop-Out Effect Container */}
                                    <motion.div
                                        initial={{ z: 0, scale: 0.9, opacity: 0 }}
                                        animate={{
                                            z: 50, // "Pop out" (simulated via scale since real z-transform needs preserve-3d parent setup carefully)
                                            scale: 1,
                                            opacity: 1
                                        }}
                                        exit={{ z: 0, scale: 1.1, opacity: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 20
                                        }}
                                        className="relative z-10"
                                    >
                                        <h3 className={cn("text-5xl font-black mb-2", TOPICS[loopIndex].color)}>
                                            {TOPICS[loopIndex].title}
                                        </h3>
                                        <p className="text-xl text-white font-medium">
                                            {TOPICS[loopIndex].desc}
                                        </p>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Background Grid inside Screen */}
                        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />

                        {/* Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80 z-0 pointer-events-none" />
                    </div>

                </div>
            </div>
        </div>
    );
}

function Base() {
    return (
        <div className="relative -z-10 h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-[#272729]">
            {/* Above keyboard bar */}
            <div className="relative h-10 w-full">
                <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
            </div>

            <div className="relative flex">
                <div className="mx-auto h-full w-[10%] overflow-hidden">
                    <SpeakerGrid />
                </div>
                <div className="mx-auto h-full w-[80%]">
                    <Keypad />
                </div>
                <div className="mx-auto h-full w-[10%] overflow-hidden">
                    <SpeakerGrid />
                </div>
            </div>

            <Trackpad />

            <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />
        </div>
    );
}

// --- KEYBOARD PARTS (Copied from macbook-scroll.tsx) ---

const Trackpad = () => {
    return (
        <div
            className="mx-auto my-1 h-32 w-[40%] rounded-xl"
            style={{ boxShadow: "0px 0px 1px 1px #00000020 inset" }}
        />
    );
};

const SpeakerGrid = () => {
    return (
        <div
            className="mt-2 flex h-40 gap-[2px] px-[0.5px]"
            style={{
                backgroundImage: "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
                backgroundSize: "3px 3px",
            }}
        />
    );
};

const Keypad = () => {
    return (
        <div className="mx-1 h-full rounded-md bg-[#050505] p-1">
            {/* Row 1 */}
            <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
                <KBtn className="w-10 text-[6px]">esc</KBtn>
                <KBtn><IconBrightnessDown className="h-[6px] w-[6px]" /></KBtn>
                <KBtn><IconBrightnessUp className="h-[6px] w-[6px]" /></KBtn>
                <KBtn><IconTable className="h-[6px] w-[6px]" /></KBtn>
                <KBtn><IconSearch className="h-[6px] w-[6px]" /></KBtn>
                <KBtn><IconMicrophone className="h-[6px] w-[6px]" /></KBtn>
                <KBtn><IconMoon className="h-[6px] w-[6px]" /></KBtn>
                <KBtn><IconPlayerTrackPrev className="h-[6px] w-[6px]" /></KBtn>
                <KBtn><IconPlayerSkipForward className="h-[6px] w-[6px]" /></KBtn>
                <KBtn><IconPlayerTrackNext className="h-[6px] w-[6px]" /></KBtn>
                <KBtn><IconVolume3 className="h-[6px] w-[6px]" /></KBtn>
                <KBtn><IconVolume2 className="h-[6px] w-[6px]" /></KBtn>
                <KBtn><IconVolume className="h-[6px] w-[6px]" /></KBtn>
                <KBtn><div className="h-4 w-4 rounded-full bg-neutral-900" /></KBtn>
            </div>

            {/* Row 2 */}
            <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
                {["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="].map(char => (
                    <KBtn key={char}>{char}</KBtn>
                ))}
                <KBtn className="w-10 text-[6px] items-end justify-end pr-1 pb-1">delete</KBtn>
            </div>

            {/* Row 3 */}
            <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
                <KBtn className="w-10 text-[6px] items-end justify-start pl-1 pb-1">tab</KBtn>
                {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"].map(char => (
                    <KBtn key={char}>{char}</KBtn>
                ))}
            </div>

            {/* Row 4 */}
            <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
                <KBtn className="w-[2.8rem] text-[6px] items-end justify-start pl-1 pb-1">caps lock</KBtn>
                {["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"].map(char => (
                    <KBtn key={char}>{char}</KBtn>
                ))}
                <KBtn className="w-[2.85rem] text-[6px] items-end justify-end pr-1 pb-1">return</KBtn>
            </div>

            {/* Row 5 */}
            <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
                <KBtn className="w-[3.65rem] text-[6px] items-end justify-start pl-1 pb-1">shift</KBtn>
                {["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"].map(char => (
                    <KBtn key={char}>{char}</KBtn>
                ))}
                <KBtn className="w-[3.65rem] text-[6px] items-end justify-end pr-1 pb-1">shift</KBtn>
            </div>

            {/* Row 6 */}
            <div className="mb-[2px] flex w-full shrink-0 gap-[2px] items-end">
                <KBtn className="w-8">fn</KBtn>
                <KBtn className="w-8">ctrl</KBtn>
                <KBtn className="w-8">opt</KBtn>
                <KBtn className="w-10">cmd</KBtn>
                <KBtn className="w-[8.2rem]"></KBtn> {/* Spacebar */}
                <KBtn className="w-10">cmd</KBtn>
                <KBtn className="w-8">opt</KBtn>
                <div className="flex h-6 w-[4.9rem] flex-col justify-end gap-[1px]">
                    <div className="flex justify-center"><KBtn className="h-3 w-full"><IconCaretUpFilled className="w-2 h-2" /></KBtn></div>
                    <div className="flex gap-[1px]">
                        <KBtn className="h-3 w-full"><IconCaretLeftFilled className="w-2 h-2" /></KBtn>
                        <KBtn className="h-3 w-full"><IconCaretDownFilled className="w-2 h-2" /></KBtn>
                        <KBtn className="h-3 w-full"><IconCaretRightFilled className="w-2 h-2" /></KBtn>
                    </div>
                </div>
            </div>

        </div>
    );
};

const KBtn = ({
    className,
    children,
    backlit = true,
}: {
    className?: string;
    children?: React.ReactNode;
    backlit?: boolean;
}) => {
    return (
        <div className={cn("p-[0.5px] rounded-[4px]", backlit && "bg-white/[0.2] shadow-xl shadow-white")}>
            <div className={cn(
                "h-6 w-6 flex items-center justify-center rounded-[3.5px] bg-[#0A090D] text-[10px] text-white/70",
                className
            )}>
                {children}
            </div>
        </div>
    );
};
