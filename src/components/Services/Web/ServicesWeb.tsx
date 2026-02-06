"use client";
// Force Update
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
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
    IconMenu2,
} from "@tabler/icons-react";
import { GlowingHeader } from "../../ui/GlowingHeader";

// Dynamically import heavy WebGL component
const FloatingLines = dynamic(() => import("../../FloatingLines"), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 bg-linear-to-br from-blue-900/10 to-purple-900/10" />
    ),
});

// --- FLOATING LINES CONFIG ---
const FL_TOP_POS = { x: 10.0, y: 0.5, rotate: -0.4 };
const FL_MID_POS = { x: 5.0, y: 0.0, rotate: 0 };
const FL_BOT_POS = { x: 2.0, y: -0.7, rotate: 0.4 };
const FL_ENABLED: ("top" | "middle" | "bottom")[] = ['top', 'middle', 'bottom'];
const FL_LINES_GRADIENT = ['#ffffff', '#888888'];

// Topic keys for mapping
const TOPIC_KEYS = ["web_development", "ecommerce", "saas", "uiux"] as const;

// Icon paths for each topic
const TOPIC_ICONS = {
    web_development: [
        "/About/next.webp",
        "/About/react-svgrepo-com.svg",
        "/About/wordpress-svgrepo-com.svg",
        "/About/angular-svgrepo-com.svg",
        "/About/django-svgrepo-com.svg",
        "/About/laravel-svgrepo-com.svg",
        "/About/node-svgrepo-com.svg",
        "/About/vue-svgrepo-com.svg"
    ],
    ecommerce: [
        "/About/woo.webp",
        "/About/salla.webp",
        "/About/shopify.webp"
    ],
    saas: [
        "/About/oracle.webp",
        "/About/odoo.webp",
        "/About/spring-boot.webp"
    ],
    uiux: [
        "/About/figma-svgrepo-com.svg",
        "/About/adobe-xd-svgrepo-com.svg",
        "/About/framer-svgrepo-com.svg"
    ]
};

export default function ServicesWeb() {
    const t = useTranslations('webDevelopment.services_web');
    const locale = useLocale();
    const isArabic = locale === 'ar';

    // Rich text renderer for highlighted content
    const highlightRenderer = {
        highlight: (chunks: React.ReactNode) => <span className="text-white font-medium">{chunks}</span>
    };

    return (
        <section className="min-h-screen bg-[#0a0a0a] py-14 px-4 overflow-hidden flex flex-col items-center">

            {/* 2. Main Layout: 3 Columns - Widened */}
            <div className="w-full max-w-[1500px] grid grid-cols-1 lg:grid-cols-12 gap-2 md:gap-16 xl:gap-2 items-center">

                {/* Left Column: Narrative */}
                <div className={`lg:col-span-3 order-2 lg:order-1 space-y-4 lg:space-y-20 text-center ${isArabic ? 'lg:text-right' : 'lg:text-left'}`}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm lg:p-0 lg:bg-transparent lg:border-none lg:backdrop-blur-none"
                    >
                        <h3 className="text-xl min-[400px]:text-2xl md:text-2xl font-bold text-white mb-2 uppercase">{t('left_column.web_title')}</h3>
                        <p className="text-white/40 leading-relaxed text-sm md:text-base lg:w-[90%]">
                            {t.rich('left_column.web_description', highlightRenderer)}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                        className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm lg:p-0 lg:bg-transparent lg:border-none lg:backdrop-blur-none"
                    >
                        <h3 className="text-xl min-[400px]:text-2xl md:text-2xl font-bold text-white mb-2 uppercase">{t('left_column.ecommerce_title')}</h3>
                        <p className="text-white/40 leading-relaxed text-sm md:text-base lg:w-[90%]">
                            {t.rich('left_column.ecommerce_description', highlightRenderer)}
                        </p>
                    </motion.div>
                </div>

                {/* Center Column: MacBook (Larger) */}
                <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center perspective-[1400px] relative z-20 py-0 md:py-10 -mt-58 -mb-22 md:mb-0 md:mt-0">
                    {/* Glow effect behind laptop */}
                    <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[80%] bg-slate-500/10 blur-[120px] rounded-full pointer-events-none" />

                    <div className="scale-[0.45] min-[400px]:scale-[0.55] sm:scale-[0.7] md:scale-[0.9] lg:scale-[1] xl:scale-[1.1] transform-style-3d">
                        <MacbookPresentation t={t} />
                    </div>
                </div>

                {/* Right Column: Narrative */}
                <div className={`lg:col-span-3 order-3 lg:order-3 space-y-4 lg:space-y-20 text-center ${isArabic ? 'lg:text-right' : 'lg:text-left lg:ml-10 lg:translate-x-7'}`}>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm lg:p-0 lg:bg-transparent lg:border-none lg:backdrop-blur-none"
                    >
                        <h3 className="text-xl min-[400px]:text-2xl md:text-2xl font-bold text-white mb-2 uppercase">{t('right_column.saas_title')}</h3>
                        <p className="text-white/40 leading-relaxed text-sm md:text-base lg:w-[90%]">
                            {t.rich('right_column.saas_description', highlightRenderer)}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                        className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm lg:p-0 lg:bg-transparent lg:border-none lg:backdrop-blur-none"
                    >
                        <h3 className="text-xl min-[400px]:text-2xl md:text-2xl font-bold text-white mb-2 uppercase">{t('right_column.uiux_title')}</h3>
                        <p className="text-white/40 leading-relaxed text-sm md:text-base lg:w-[90%]">
                            {t.rich('right_column.uiux_description', highlightRenderer)}
                        </p>
                    </motion.div>
                </div>

            </div>

        </section>
    );
}

// --- MACBOOK COMPONENTS ---

interface MacbookPresentationProps {
    t: ReturnType<typeof useTranslations>;
}

function MacbookPresentation({ t }: MacbookPresentationProps) {
    const [step, setStep] = useState<"logo" | "loop">("loop");
    const [loopIndex, setLoopIndex] = useState(0);

    // Loop Timer
    useEffect(() => {
        const interval = setInterval(() => {
            setLoopIndex((prev) => (prev + 1) % TOPIC_KEYS.length);
        }, 5000); // Change text every 5 seconds
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="flex flex-col items-center py-12 relative">
            <Lid step={step} loopIndex={loopIndex} t={t} />
            <div className="-mt-1">
                <Base />
            </div>
        </div>
    );
}

interface LidProps {
    step: "logo" | "loop";
    loopIndex: number;
    t: ReturnType<typeof useTranslations>;
}

function Lid({ step, loopIndex, t }: LidProps) {
    const currentKey = TOPIC_KEYS[loopIndex];
    const title = t(`topics.${currentKey}.title`);
    const desc = t(`topics.${currentKey}.desc`);
    const icons = TOPIC_ICONS[currentKey];

    return (
        <div className="relative [perspective:800px]">
            {/* Outer Shell */}
            <div
                style={{
                    transform: "perspective(800px) rotateX(-25deg)",
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
                    transform: "perspective(800px) rotateX(-25deg)",
                    transformOrigin: "bottom",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-0 h-[15rem] w-[32rem] rounded-2xl bg-[#010101] p-2"
            >
                <div className="absolute inset-0 h-full w-full rounded-xl overflow-hidden bg-black border-[4px] border-[#1a1a1a]">

                    {/* --- SCREEN CONTENT --- */}
                    <div className="relative w-full h-full flex flex-col bg-[#111] overflow-hidden">


                        {/* Main Content Area */}
                        <div className="flex-1 relative flex flex-col items-center justify-center w-full z-10 min-h-0 bg-[#252525] overflow-hidden">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 z-0 bg-white/5" />

                            {/* Floating Lines Background */}
                            <div className="absolute inset-0 z-0">
                                <FloatingLines
                                    topWavePosition={FL_TOP_POS}
                                    middleWavePosition={FL_MID_POS}
                                    bottomWavePosition={FL_BOT_POS}
                                    enabledWaves={FL_ENABLED}
                                    lineCount={4}
                                    lineDistance={5}
                                    animationSpeed={0.5}
                                />
                            </div>

                            {/* --- MINI WEBSITE UI --- */}
                            {/* Mini Navbar */}
                            <div className="h-6 w-full bg-[#0a0a0a] flex items-center justify-center  shrink-0 z-50 px-5 absolute top-0 left-0">
                                {/* Logo */}
                                <div className="text-[6px] font-bold text-white tracking-wider">LIMITLESS TAPS</div>

                            </div>

                            {/* Mini Footer */}
                            <div className="h-5 w-full bg-[#0a0a0a]   shrink-0 z-50 flex justify-between items-center px-5 absolute bottom-0 left-0">
                                <div className="flex gap-2">
                                    <span className="text-[3px] text-white/40 font-medium">{t('footer.copyright')}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-[3px] text-white/40 hover:text-white cursor-pointer">{t('footer.privacy')}</span>
                                    <span className="text-[3px] text-white/40 hover:text-white cursor-pointer">{t('footer.terms')}</span>
                                </div>
                            </div>

                            {/* Removed previous blur/vignette layers for clarity */}

                            <AnimatePresence mode="wait">
                                {step === "logo" ? (
                                    <motion.div
                                        key="logo"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                                        transition={{ duration: 0.8 }}
                                        className="relative w-20 h-20 z-10"
                                    >
                                        <Image src="/Logo/Main-Logo-Static.png" alt="Logo" fill className="object-contain" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key={`loop-${loopIndex}`}
                                        className="flex flex-col items-center justify-center gap-6 z-10 w-full px-8 relative"
                                    >

                                        {/* Text Section */}
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                            className="text-center space-y-3 relative z-10"
                                        >
                                            {/* Main Headline - Typewriter Effect */}
                                            <motion.h3
                                                key={loopIndex} // Remount to restart animation
                                                className={cn(
                                                    "text-3xl md:text-3xl font-bold tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 filter drop-shadow-sm",
                                                    "text-white"
                                                )}
                                                variants={{
                                                    hidden: { opacity: 1 },
                                                    visible: {
                                                        opacity: 1,
                                                        transition: {
                                                            staggerChildren: 0.08
                                                        }
                                                    }
                                                }}
                                                initial="hidden"
                                                animate="visible"
                                            >
                                                {title.split("").map((char, index) => (
                                                    <motion.span
                                                        key={index}
                                                        variants={{
                                                            hidden: { opacity: 0 },
                                                            visible: { opacity: 1 }
                                                        }}
                                                    >
                                                        {char}
                                                    </motion.span>
                                                ))}
                                            </motion.h3>

                                            {/* Description */}
                                            <p className="text-[9px] md:text-[10px] text-blue-100/90 font-semibold max-w-[16rem] leading-relaxed mx-auto">
                                                {desc}
                                            </p>
                                        </motion.div>

                                        {/* Visual Connector / Tech Stack Section */}
                                        <motion.div
                                            className="relative z-10 flex flex-col items-center gap-2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.15, duration: 0.5 }}
                                        >

                                            {/* Icons Row - Individual Bubbles */}
                                            <div className="flex items-center justify-center gap-4">
                                                {icons.map((icon, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ opacity: 0, scale: 0.5, y: 10 }}
                                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                                        transition={{
                                                            delay: 0.5 + (idx * 0.08), // Faster stagger per icon
                                                            type: "spring", stiffness: 300, damping: 15
                                                        }}
                                                        className="relative w-10 h-10 md:w-11 md:h-11 bg-black/20 border border-white/10 rounded-full shadow-lg backdrop-blur-md flex items-center justify-center group"
                                                    >
                                                        {/* Inner Icon Container */}
                                                        <div className="w-full h-full rounded-full flex items-center justify-center relative overflow-hidden">
                                                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            <Image
                                                                src={icon}
                                                                alt="Tech Icon"
                                                                fill
                                                                className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                                                            />
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>



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
};

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
        <div className="mx-1 h-full rounded-md bg-[#050505] p-1" dir="ltr">
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
                <KBtn className="w-[7rem]"></KBtn> {/* Spacebar */}
                <KBtn className="w-10">cmd</KBtn>
                <KBtn className="w-8">opt</KBtn>
                <div className="grid grid-cols-3 h-6 w-[4.5rem] gap-[1px]">
                    <div /> {/* Empty top-left */}
                    <KBtn className="h-3 w-full"><IconCaretUpFilled className="w-3 h-3" /></KBtn>
                    <div /> {/* Empty top-right */}
                    <KBtn className="h-3 w-full"><IconCaretLeftFilled className="w-3 h-3" /></KBtn>
                    <KBtn className="h-3 w-full"><IconCaretDownFilled className="w-3 h-3" /></KBtn>
                    <KBtn className="h-3 w-full"><IconCaretRightFilled className="w-3 h-3" /></KBtn>
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
