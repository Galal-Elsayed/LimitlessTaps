"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Send, ArrowUpRight, Check } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function AboutTap() {
    const t = useTranslations("aboutUs");
    const locale = useLocale();
    const isRTL = locale === "ar";
    const [screenState, setScreenState] = useState<"logo" | "form" | "sent">("logo");
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [typedText, setTypedText] = useState("");
    const targetText = t("tap.form.typed_message");

    // Scroll detection
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Cycle the animation loop - only starts when section is in view
    useEffect(() => {
        if (!isInView) return; // Don't start until in view

        let isMounted = true;

        const runSequence = async () => {
            // 1. Start at Logo Screen
            setScreenState("logo");
            setTypedText("");

            // Initial delay showing logo
            await new Promise(r => setTimeout(r, 2000));
            if (!isMounted) return;

            // 2. Transition to Form
            setScreenState("form");

            // 3. Auto-Type Text
            await new Promise(r => setTimeout(r, 800)); // Short delay before typing
            for (let i = 0; i <= targetText.length; i++) {
                if (!isMounted) return;
                setTypedText(targetText.slice(0, i));
                // Randomize typing speed slightly for realism
                await new Promise(r => setTimeout(r, 40 + Math.random() * 20));
            }

            // 4. Click Button & Send
            await new Promise(r => setTimeout(r, 500)); // Pause after typing
            if (!isMounted) return;

            // Simulate click
            setIsButtonPressed(true);
            await new Promise(r => setTimeout(r, 150)); // Hold click
            if (!isMounted) return;
            setIsButtonPressed(false);

            // Wait slightly before showing success
            await new Promise(r => setTimeout(r, 200));
            if (!isMounted) return;
            setScreenState("sent");

            // 5. Reset Loop
            await new Promise(r => setTimeout(r, 3000)); // Show success
            if (isMounted) runSequence();
        };

        runSequence();

        return () => { isMounted = false; };
    }, [targetText, isInView]);

    return (
        <section ref={sectionRef} className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center pt-0 md:pt-20 pb-40 min-[900px]:pb-0 overflow-hidden">

            {/* Header Text */}
            {/* Header Content - Split Layout */}
            <div className={`relative mt-12 md:absolute md:top-12 md:mt-0 left-0 right-0 z-20 px-4 md:px-12 w-full max-w-[1400px] mx-auto ${isRTL ? 'md:px-20' : ''}`}>
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col md:flex-row justify-between items-center text-white w-full gap-4 md:gap-0"
                >
                    {/* Left Part: "It all starts" (Arabic: Right side visually) */}
                    <h2 className={`text-3xl sm:text-4xl md:text-7xl font-bold tracking-tight w-full md:w-1/3 text-center order-1 md:order-1 ${isRTL ? 'md:text-center' : 'md:text-start'}`}>
                        {t("tap.header_left")} <br /> {t("tap.header_left_line2")}
                    </h2>

                    {/* Mobile: "With One Tap" Row (Combined) */}
                    <div className="flex flex-row items-center justify-center gap-2 md:hidden order-2 w-full">
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                            {t("tap.header_center")} {t("tap.header_right")} {t("tap.header_right_line2")}
                        </h2>
                    </div>


                    {/* Middle Part (Desktop only): Title + Button */}
                    <div className="hidden md:flex flex-col items-center w-full md:w-1/3 mt-6 md:mt-0 order-2">
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">
                            {t("tap.header_center")}
                        </h2>
                        <Link href="/contact">
                            <button className="group px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-neutral-200 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-white/10">
                                {t("tap.cta")}
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </Link>
                    </div>

                    {/* Right Part (Desktop only) */}
                    <h2 className={`hidden md:block text-4xl md:text-7xl font-bold tracking-tight w-full md:w-1/3 mt-4 md:mt-0 order-3 ${isRTL ? 'md:text-center' : 'md:text-right'}`}>
                        {t("tap.header_right")} <br /> {t("tap.header_right_line2")}
                    </h2>

                    {/* Mobile: Button (Bottom) */}
                    <div className="md:hidden order-3 w-full flex justify-center mt-2">
                        <Link href="/contact">
                            <button className="group px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-neutral-200 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-white/10">
                                {t("tap.cta")}
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--light-grey)]/10 blur-[120px] rounded-full" />
            </div>

            {/* --- Phone Frame --- */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="relative w-[90vw] max-w-[320px] md:w-[320px] h-[550px] md:h-[650px] bg-black rounded-[50px] border-[8px] border-neutral-800 shadow-2xl z-10 overflow-hidden ring-1 ring-white/10 mb-[-50px] md:mb-22 mt-12 md:mt-48"
            >

                {/* Dynamic Island / Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50 flex items-center justify-center gap-2">
                    <div className="w-16 h-4 bg-neutral-900 rounded-full" />
                </div>
                {/* Screen Content Wrapper */}
                <div className="relative w-full h-full pt-12 pb-8 px-6 flex flex-col justify-between font-sans">

                    {/* Header Status */}
                    <div className="flex justify-between items-center text-xs text-neutral-500 mb-4 px-2">
                        <span>9:41</span>
                        <div className="flex gap-1">
                            <div className="w-4 h-2.5 bg-neutral-700 rounded-sm" />
                            <div className="w-4 h-2.5 bg-neutral-700 rounded-sm" />
                        </div>
                    </div>

                    {/* --- Animated Screen Views --- */}
                    <AnimatePresence mode="wait">

                        {/* VIEW 1: LOGO SCREEN */}
                        {screenState === "logo" && (
                            <motion.div
                                key="logo"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div className="w-40 h-40 relative">
                                    <Image
                                        src="/Logo/Main-Logo-Static.png"
                                        alt="Limitless Taps Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* VIEW 2: CONTACT FORM (Typing) */}
                        {screenState === "form" && (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="absolute inset-0 pt-20 px-6 flex flex-col"
                            >
                                <h3 className="text-2xl font-bold text-white mb-6">{t("tap.form.title")}</h3>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs text-neutral-500 uppercase">{t("tap.form.email_label")}</label>
                                        <div className="h-12 w-full bg-neutral-900 rounded-xl border border-white/10 flex items-center px-4 text-neutral-400 text-sm">
                                            {t("tap.form.email_value")}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-neutral-500 uppercase">{t("tap.form.message_label")}</label>
                                        <div className="h-32 w-full bg-neutral-900 rounded-xl border border-white/10 p-4 text-white text-sm font-mono leading-relaxed relative overflow-hidden whitespace-pre-wrap">
                                            {typedText}
                                            <span className="animate-pulse">|</span>
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    animate={{
                                        scale: isButtonPressed ? 0.95 : 1,
                                        backgroundColor: isButtonPressed ? "#e5e5e5" : "#ffffff"
                                    }}
                                    transition={{ duration: 0.1 }}
                                    className="mt-6 w-full h-14 bg-white text-black rounded-2xl font-bold shadow-lg shadow-white/10 z-1"
                                >
                                    {t("tap.form.send_button")}
                                </motion.button>
                            </motion.div>
                        )}

                        {/* VIEW 3: SUCCESS */}
                        {screenState === "sent" && (
                            <motion.div
                                key="sent"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center text-center"
                            >
                                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-green-900/20">
                                    <Check className="w-10 h-10 text-white stroke-[3]" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{t("tap.success.title")}</h3>
                                <p className="text-neutral-400 text-sm">{t("tap.success.subtitle")}</p>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </motion.div>

            {/* --- Hand Static --- */}
            <motion.div
                initial={{ opacity: 0, x: 50, y: 50 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                className="absolute bottom-0 pointer-events-none flex items-end justify-center z-[9999]"
            >
                {/* E
                  Hand Position Logic:
                  Mobile:
                    - width: 80vw (relative to screen)
                    - translate-x: 10% (relative to hand width)
                    - translate-y: 5% (relative to hand height) 
                    - This ensures it scales comfortably with the phone
                  Desktop (md+):
                    - w-[500px]
                    - translate-y-1 (~0.25rem)
                    - translate-x-[17.5rem] (~280px or 70 units)
                    - Matches user-specified position (finger on button)
                */}
                <div className="relative w-[80vw] max-w-[400px] md:w-[500px] h-[80vw] max-h-[400px] md:h-[500px] translate-y-[10%] translate-x-[70%] min-[900px]:translate-y-0 md:translate-x-[17.5rem]">
                    <motion.div
                        animate={{
                            x: isButtonPressed ? -25 : 0,
                            y: isButtonPressed ? -5 : 0,
                        }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="w-full h-full relative"
                    >
                        <Image
                            src="/About/hand-tap.png"
                            alt="Hand Holding Phone"
                            fill
                            className="object-contain drop-shadow-2xl opacity-100"
                        />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
