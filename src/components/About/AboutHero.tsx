"use client";
import React, { useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
    LayoutDashboard,
    Users,
    Settings,
    Search,
    Bell,
    Activity,
    DollarSign,
    ArrowUpRight,
    Globe,
    Server,
    BarChart3,
    ShoppingCart,
    FileText,
    Clock,
    AlertTriangle,
    CheckCircle2,
    Download,
    Filter,
    MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ArcButton } from "@/components/ui/ArcButton";

// --- Background Effects ---
const StarField = React.memo(() => {
    const [stars, setStars] = useState<{ id: number; top: string; left: string; size: number; opacity: number; animationDuration: number; }[]>([]);

    useEffect(() => {
        const starCount = window.innerWidth < 768 ? 15 : 30; // Reduced count
        const generatedStars = [...Array(starCount)].map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 2 + 1, // varied size
            opacity: Math.random() * 0.5 + 0.1,
            animationDuration: Math.random() * 3 + 2,
        }));
        setStars(generatedStars);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute rounded-full bg-white will-change-opacity"
                    style={{
                        top: star.top,
                        left: star.left,
                        width: star.size,
                        height: star.size,
                        opacity: star.opacity,
                        // Use CSS animation for better performance than JS frame-loop
                        animation: `twinkle ${star.animationDuration}s infinite ease-in-out`
                    }}
                />
            ))}
            <style jsx>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.1; }
                    50% { opacity: 0.7; }
                }
            `}</style>
        </div>
    );
});

const LightBeam = React.memo(({ delay = 0, x = "50%", y = "50%", color = "rgba(100, 100, 255, 0.15)" }: { delay?: number; x?: string; y?: string; color?: string }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{
            opacity: [0, 0.5, 0],
            scale: [0.8, 1.2, 0.8],
            x: ["-10%", "10%", "-10%"],
            y: ["-10%", "10%", "-10%"],
        }}
        transition={{
            duration: 10,
            repeat: Infinity,
            delay,
            ease: "linear",
        }}
        className="absolute blur-[120px] rounded-full pointer-events-none"
        style={{
            top: y,
            left: x,
            width: "600px",
            height: "400px",
            background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
        }}
    />
));



// --- Custom Dashboard Components ---

// Animation for "Sticker" effect - drops from top and settles
const stickerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (custom: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            delay: custom,
            type: "spring" as const,
            stiffness: 120,
            damping: 15
        }
    }),
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

interface MetricCardProps {
    title: string;
    value: string;
    subtext: string;
    icon: React.ComponentType<{ className?: string }>;
    trend?: string;
    delay?: number;
}

const MetricCard = ({ title, value, subtext, icon: Icon, trend, delay = 0 }: MetricCardProps) => (
    <motion.div
        variants={stickerVariants}
        custom={delay}
        initial="hidden"
        animate="visible"
        className="rounded-xl border border-[#8a8f98]/20 bg-[#0a0a0a] p-4 sm:p-6 shadow-sm relative overflow-hidden group hover:border-[#8a8f98]/40 transition-colors"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <h3 className="text-xs sm:text-sm font-medium text-[#ffffff]">{title}</h3>
            <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-[#8a8f98]" />
        </div>
        <div className="relative z-10 space-y-1">
            <div className="text-lg sm:text-2xl font-bold text-[#ffffff]">{value}</div>
            <p className="text-[10px] sm:text-xs text-[#8a8f98] flex items-center gap-1">
                {trend === 'up' && <span className="text-[#ffffff] font-medium">↑</span>}
                {trend === 'down' && <span className="text-[#8a8f98] font-medium">↓</span>}
                {subtext}
            </p>
        </div>
    </motion.div>
);

const ChartBar = ({ height, label, delay }: { height: number; label: string; delay: number }) => (
    <div className="flex flex-col items-center justify-end h-full gap-1 sm:gap-2 flex-1 group cursor-pointer">
        <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ duration: 1, ease: "easeOut", delay }}
            className="w-full rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity bg-[#ffffff]"
        />
        <span className="text-[8px] sm:text-[10px] text-[#8a8f98] font-medium group-hover:text-[#ffffff] transition-colors">{label}</span>
    </div>
);

const OverviewChart = () => {
    const data = useMemo(() => [
        { label: "Jan", height: 45 }, { label: "Feb", height: 72 }, { label: "Mar", height: 55 },
        { label: "Apr", height: 80 }, { label: "May", height: 60 }, { label: "Jun", height: 90 },
        { label: "Jul", height: 75 }, { label: "Aug", height: 85 }, { label: "Sep", height: 65 },
        { label: "Oct", height: 70 }, { label: "Nov", height: 95 }, { label: "Dec", height: 80 },
    ], []);
    return (
        <div className="h-[200px] sm:h-[300px] w-full flex items-end justify-between gap-1 sm:gap-2 pt-4 pl-1 pr-1 pb-2">
            {data.map((d, i) => (
                <ChartBar key={d.label} label={d.label} height={d.height} delay={0.2 + i * 0.05} />
            ))}
        </div>
    );
};

const AnalyticsChart = () => {
    const data = useMemo(() => [
        { label: "Mon", height: 30 }, { label: "Tue", height: 45 }, { label: "Wed", height: 25 },
        { label: "Thu", height: 60 }, { label: "Fri", height: 85 }, { label: "Sat", height: 40 },
        { label: "Sun", height: 50 }
    ], []);
    return (
        <div className="h-[200px] sm:h-[300px] w-full flex items-end justify-between gap-2 sm:gap-4 pt-4 px-2 sm:px-4 pb-2">
            {data.map((d, i) => (
                <ChartBar key={d.label} label={d.label} height={d.height} delay={0.2 + i * 0.05} />
            ))}
        </div>
    );
};

const RecentActivityItem = ({ name, email, amount }: { name: string; email: string; amount: string }) => (
    <div className="flex items-center group cursor-pointer p-2 rounded-lg hover:bg-[#ffffff]/5 transition-colors">
        <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-[#8a8f98]/20 flex items-center justify-center text-[#ffffff] text-[10px] sm:text-xs font-bold ltr:mr-3 rtl:ml-3 sm:ltr:mr-4 sm:rtl:ml-4 ring-2 ring-transparent group-hover:ring-[#ffffff]/20 transition-all shrink-0">
            {name.charAt(0)}{name.split(" ")[1]?.charAt(0)}
        </div>
        <div className="space-y-0.5 sm:space-y-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium leading-none text-[#ffffff] truncate">{name}</p>
            <p className="text-[10px] sm:text-xs text-[#8a8f98] group-hover:text-[#ffffff] transition-colors truncate">{email}</p>
        </div>
        <div className="ltr:ml-auto rtl:mr-auto font-medium text-[#ffffff] text-xs sm:text-sm shrink-0">{amount}</div>
    </div>
);

interface SidebarItemProps {
    active: boolean;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    onClick: () => void;
}

const SidebarItem = ({ active, icon: Icon, label, onClick }: SidebarItemProps) => (
    <motion.button
        variants={stickerVariants}
        onClick={onClick}
        className={cn(
            "w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 group relative cursor-pointer",
            active ? "text-[#ffffff] bg-[#ffffff]/10" : "text-[#8a8f98] hover:text-[#ffffff] hover:bg-[#ffffff]/5"
        )}
    >
        {active && (
            <motion.div
                layoutId="activeSidebar"
                className="absolute ltr:left-0 rtl:right-0 w-1 h-5 sm:h-6 bg-[#ffffff] ltr:rounded-r-full rtl:rounded-l-full"
            />
        )}
        <Icon className={cn("w-3 h-3 sm:w-4 sm:h-4", active ? "text-[#ffffff]" : "text-[#8a8f98] group-hover:text-[#ffffff]")} />
        <span className="hidden md:inline">{label}</span>
    </motion.button>
);

const TableRow = ({ cols, delay }: { cols: string[], delay: number }) => (
    <motion.div
        variants={stickerVariants}
        custom={delay}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 p-3 sm:p-4 border-b border-[#8a8f98]/10 text-xs sm:text-sm hover:bg-[#ffffff]/5 transition-colors cursor-pointer"
    >
        {cols.map((col, i) => (
            <span key={i} className={cn("text-[#8a8f98] truncate", i === 0 && "text-white font-medium", i > 1 && "hidden sm:block")}>{col}</span>
        ))}
    </motion.div>
);

const NotificationItem = ({ title, time, type, delay, systemText }: { title: string; time: string; type: 'alert' | 'success' | 'info'; delay: number; systemText: string }) => (
    <motion.div
        variants={stickerVariants}
        custom={delay}
        initial="hidden"
        animate="visible"
        className="flex gap-3 sm:gap-4 p-3 sm:p-4 border border-[#8a8f98]/10 rounded-xl bg-[#0a0a0a] hover:bg-[#ffffff]/5 transition-colors"
    >
        <div className={cn("w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0",
            type === 'alert' ? "bg-red-500/10 text-red-500" :
                type === 'success' ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"
        )}>
            {type === 'alert' ? <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" /> :
                type === 'success' ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Bell className="w-4 h-4 sm:w-5 sm:h-5" />}
        </div>
        <div className="flex-1 min-w-0">
            <h4 className="text-xs sm:text-sm font-medium text-white truncate">{title}</h4>
            <p className="text-[10px] sm:text-xs text-[#8a8f98] mt-1">{systemText} • {time}</p>
        </div>
    </motion.div>
);

export default function AboutHero() {
    const t = useTranslations("aboutUs");
    const locale = useLocale();
    const isRTL = locale === 'ar';
    const [isLoaded, setIsLoaded] = useState(false);
    const { scrollY } = useScroll();
    const [isMobile, setIsMobile] = useState(false);
    const [isHugeDesktop, setIsHugeDesktop] = useState(false);
    const [activeView, setActiveView] = useState("overview");

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 800);
            setIsHugeDesktop(width >= 1600);
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Add spring physics - Tweaked for responsiveness (less laggy float)
    const smoothScroll = useSpring(scrollY, {
        stiffness: 120, // Higher stiffness = follows scroll faster
        damping: 20,    // Good damping prevents bouncing
        mass: 0.1,      // Low mass = lighter/quicker movement
        restDelta: 0.001
    });

    // Parallax and Float effects
    const yFloat = useTransform(smoothScroll, [0, 500], [0, 80]);

    // Strictly clamp the scroll value to prevent spring overshoot
    const constrainedScroll = useTransform(smoothScroll, (v) => Math.max(0, Math.min(v, 600)));

    // Dynamic transforms for 3D feel on scroll
    // Rotates from initial tilt to flat (0) as user scrolls down
    const rotateXDesktop = useTransform(constrainedScroll, [0, 600], [35, 0]);
    const rotateXMobile = useTransform(constrainedScroll, [0, 600], [20, 20]);
    const rotateX = isMobile ? rotateXMobile : rotateXDesktop;

    const rotateYDesktop = useTransform(constrainedScroll, [0, 600], [6, 0]);
    const rotateYMobile = useTransform(constrainedScroll, [0, 600], [0, 0]);
    const rotateY = isMobile ? rotateYMobile : rotateYDesktop;

    const rotateZDesktop = useTransform(constrainedScroll, [0, 600], [-14, 0]);
    const rotateZMobile = useTransform(constrainedScroll, [0, 600], [0, 0]);
    const rotateZ = isMobile ? rotateZMobile : rotateZDesktop;

    // Shift X
    // Huge Desktop (>1600): Aggressive shift for "overflow" look
    const xPosHuge = useTransform(constrainedScroll, [0, 600], isRTL ? [200, 180] : [-50, -180]);
    // Laptop (800-1600): Gentle shift to keep it centered/fitted
    const xPosLaptop = useTransform(constrainedScroll, [0, 600], isRTL ? [100, -50] : [0, -40]);
    // Mobile (<800): No shift
    const xPosMobile = useTransform(constrainedScroll, [0, 600], [0, 0]);

    // Choose transform based on screen size
    const xPosition = isMobile ? xPosMobile : (isHugeDesktop ? xPosHuge : xPosLaptop);


    // Constant scale to keep size consistent requested "same height/width"
    // Slightly smaller on mobile to fit
    const scale = isMobile ? 0.95 : 0.9;

    const perspective = useTransform(constrainedScroll, [0, 600], ["2000px", "20000px"]);

    // Edge opacity - always visible on mobile since it never flattens
    const edgeOpacityDesktop = useTransform(constrainedScroll, [0, 500], [1, 0]);
    const edgeOpacity = isMobile ? 1 : edgeOpacityDesktop;


    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const headline = t("hero.headline");
    const words = headline.split(" ");

    // Staggered Slide Down for Sidebar Items & Content
    const staggerStickVariants = useMemo(() => ({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }), []);

    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-black to-black flex flex-col items-center">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                {!isMobile && <StarField />}
                <div className="absolute top-[13%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[99vw] h-[300px] sm:h-[400px] md:h-[500px] pointer-events-none z-0 opacity-60">
                    {/* Intense Center Glow Background */}
                    <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[200px] sm:h-[300px] bg-white/10 blur-[80px] sm:blur-[120px] rounded-full animate-pulse" />

                    <svg
                        viewBox="0 0 100 50"
                        className="w-full h-full overflow-visible"
                    >
                        <defs>
                            <linearGradient id="infinity-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                            </linearGradient>
                            {/* Removed expensive SVG Gaussian Blur filter in favor of CSS drop-shadow on the element */}
                        </defs>

                        {/* The Path Definition - Maximized Width Infinity Symbol */}
                        <path
                            id="infinity-path"
                            d="M2,25 C2,8 35,8 50,25 C65,42 98,42 98,25 C98,8 65,8 50,25 C35,42 2,42 2,25"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.5"
                            strokeOpacity="0.1"
                        />

                        {/* The Animated Tracing Line */}
                        <motion.path
                            d="M2,25 C2,8 35,8 50,25 C65,42 98,42 98,25 C98,8 65,8 50,25 C35,42 2,42 2,25"
                            fill="none"
                            stroke="url(#infinity-gradient)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            // filter="url(#glow)" // Removed
                            style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.8))" }} // Use CSS optimization
                            initial={{ pathLength: 0, pathOffset: 0 }}
                            animate={{
                                pathLength: [0.1, 0.4, 0.1],
                                pathOffset: [0, 1],
                                strokeOpacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                        {/* Second reversed trace for complexity */}
                        <motion.path
                            d="M2,25 C2,8 35,8 50,25 C65,42 98,42 98,25 C98,8 65,8 50,25 C35,42 2,42 2,25"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            strokeOpacity="0.3"
                            initial={{ pathLength: 0.1, pathOffset: 1 }}
                            animate={{
                                pathOffset: [1, 0],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                    </svg>
                </div>
                <LightBeam x="20%" y="20%" color="rgba(100, 100, 255, 0.1)" delay={0} />
                <LightBeam x="80%" y="80%" color="rgba(139, 92, 246, 0.08)" delay={2} />
            </div>

            {/* Main Content */}
            <motion.div
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                variants={{ visible: { opacity: 1 }, hidden: { opacity: 0 } }}
                className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-32 w-full max-w-7xl"
            >
                {/* Headline */}
                <h1
                    className="text-center text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[84px] font-semibold tracking-tight text-[#F7F8F8] max-w-5xl leading-[1.1] sm:leading-[1.02] overflow-visible"
                    style={{ letterSpacing: "-0.04em" }}
                >
                    <div className="flex flex-wrap justify-center gap-x-[0.2em] gap-y-[0.1em]">
                        {words.map((word, i) => (
                            <motion.span
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, y: 30, rotate: 5 },
                                    visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } }
                                }}
                                className="inline-block"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>
                </h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-6 sm:mt-8 text-center text-sm sm:text-lg md:text-[20px] text-[#8A8F98] max-w-xl sm:max-w-2xl leading-relaxed px-2"
                >
                    {t("hero.subtitle")}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="mt-8 sm:mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-5"
                >
                    <ArcButton
                        href="/projects"
                        variant="light"
                        radius="rounded-full"
                        className="px-6 py-3 sm:px-8 sm:py-4 h-auto text-sm sm:text-base normal-case font-medium tracking-normal"
                    >
                        {t("hero.cta_primary")}
                    </ArcButton>
                    <Link
                        href="/studio"
                        className="flex items-center gap-2 text-[#8A8F98] hover:text-[#F7F8F8] transition-colors text-sm sm:text-base font-medium group"
                    >
                        {t("hero.cta_secondary")}
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                </motion.div>

                {/* --- 3D Dashboard Interface --- */}
                {/* Improved Responsive Container */}
                <div className="relative w-full max-w-[95%] sm:max-w-[90%] md:max-w-[1200px] xl:max-w-[1800px] min-[1400px]:w-[130%] min-[1600px]:max-w-[1800px] mt-12 sm:mt-16 md:mt-4 mx-auto h-[60vh] min-h-[500px] sm:h-[650px] md:h-[850px] perspective-2000">
                    <motion.div
                        style={{
                            scale,
                            y: yFloat,
                            x: xPosition,
                            rotateX,
                            rotateY,
                            rotateZ,
                            transformStyle: "preserve-3d",
                        }}
                        initial={{ opacity: 0, scale: 0.8, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="relative rounded-xl p-1 shadow-2xl h-full will-change-transform" // Hardware acceleration
                    >
                        {/* Outer Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl blur-md" />

                        {/* Main Window Container */}
                        <div
                            className="relative rounded-xl overflow-hidden backdrop-blur-md bg-[#0a0a0a] border border-[#8a8f98]/20 h-full flex flex-row"
                            style={{
                                boxShadow: "0 50px 100px -20px rgba(0, 0, 0, 0.7)",
                            }}
                        >
                            {/* Edge Shadows */}
                            <motion.div style={{ opacity: edgeOpacity }} className="absolute ltr:right-0 rtl:left-0 top-0 bottom-0 w-16 sm:w-32 ltr:bg-gradient-to-l rtl:bg-gradient-to-r from-black/80 to-transparent pointer-events-none z-30 mix-blend-multiply" />
                            <motion.div style={{ opacity: edgeOpacity }} className="absolute left-0 right-0 bottom-0 h-16 sm:h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-30 mix-blend-multiply" />

                            {/* --- Sidebar (Black) with Sticker Animation --- */}
                            <motion.div
                                variants={staggerStickVariants}
                                initial="hidden"
                                animate="visible"
                                className="w-12 sm:w-16 md:w-64 2xl:w-80 bg-black ltr:border-r rtl:border-l border-[#8a8f98]/10 flex flex-col pt-4 sm:pt-6 pb-3 sm:pb-4 z-20 flex-shrink-0"
                            >
                                {/* Logo */}
                                <motion.div variants={stickerVariants} custom={0.1} className="px-3 sm:px-6 mb-4 sm:mb-8 flex items-center gap-2 sm:gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 relative rounded-lg overflow-hidden border border-white/10">
                                        <Image src="/Logo/social-white-black.jpg" alt="Logo" fill className="object-cover" />
                                    </div>
                                    <span className="text-xs sm:text-sm 2xl:text-base font-bold text-white hidden md:block tracking-wide">{t("dashboard.sidebar.brand")}</span>
                                </motion.div>

                                {/* Nav Items */}
                                <div className="space-y-1 sm:space-y-1.5 px-2 sm:px-3 flex-1 overflow-y-auto">
                                    <motion.p variants={stickerVariants} custom={0.2} className="px-2 sm:px-3 text-[10px] sm:text-xs 2xl:text-sm font-medium text-[#8a8f98] mb-2 mt-2 sm:mt-4 hidden md:block uppercase tracking-wider">{t("dashboard.sidebar.sections.dashboard")}</motion.p>
                                    <SidebarItem icon={LayoutDashboard} label={t("dashboard.sidebar.nav.overview")} active={activeView === "overview"} onClick={() => setActiveView("overview")} />
                                    <SidebarItem icon={BarChart3} label={t("dashboard.sidebar.nav.analytics")} active={activeView === "analytics"} onClick={() => setActiveView("analytics")} />
                                    <SidebarItem icon={FileText} label={t("dashboard.sidebar.nav.reports")} active={activeView === "reports"} onClick={() => setActiveView("reports")} />
                                    <SidebarItem icon={Bell} label={t("dashboard.sidebar.nav.notifications")} active={activeView === "notifications"} onClick={() => setActiveView("notifications")} />

                                    <motion.p variants={stickerVariants} custom={0.4} className="px-2 sm:px-3 text-[10px] sm:text-xs 2xl:text-sm font-medium text-[#8a8f98] mb-2 mt-4 sm:mt-8 hidden md:block uppercase tracking-wider">{t("dashboard.sidebar.sections.management")}</motion.p>
                                    <SidebarItem icon={Users} label={t("dashboard.sidebar.nav.customers")} active={activeView === "customers"} onClick={() => setActiveView("customers")} />
                                    <SidebarItem icon={ShoppingCart} label={t("dashboard.sidebar.nav.products")} active={activeView === "products"} onClick={() => setActiveView("products")} />
                                    <SidebarItem icon={Settings} label={t("dashboard.sidebar.nav.settings")} active={activeView === "settings"} onClick={() => setActiveView("settings")} />
                                </div>

                                {/* User */}
                                <motion.div variants={stickerVariants} custom={0.6} className="mt-auto px-2 sm:px-4 pt-3 sm:pt-4 ltr:border-r-0 rtl:border-l-0 border-t border-[#8a8f98]/10">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#8a8f98]/20 relative overflow-hidden border border-[#8a8f98]/20">
                                            <Image src="/Logo/social-white-black.jpg" alt="User" fill className="object-cover" />
                                        </div>
                                        <div className="hidden md:block">
                                            <p className="text-xs sm:text-sm 2xl:text-base font-medium text-[#ffffff]">{t("dashboard.sidebar.user.name")}</p>
                                            <p className="text-[10px] sm:text-xs 2xl:text-sm text-[#8a8f98]">{t("dashboard.sidebar.user.role")}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* --- Main Content (Near-Black) with Sticker Animation --- */}
                            <div className="flex-1 flex flex-col bg-[#0a0a0a] h-full overflow-hidden">
                                {/* Top Header */}
                                <motion.div
                                    initial={{ y: -50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
                                    className="h-12 sm:h-16 border-b border-[#8a8f98]/10 flex items-center justify-between px-3 sm:px-8 bg-[#0a0a0a]/50 backdrop-blur shrink-0 z-20 relative"
                                >
                                    <h2 className="text-sm sm:text-xl 2xl:text-2xl font-semibold text-[#ffffff] capitalize shrink-0">{t(`dashboard.sidebar.nav.${activeView}`)}</h2>

                                    {/* Central Promo Header - Hidden on small screens */}
                                    <div className="absolute left-1/2 -translate-x-1/2 hidden xl:flex items-center gap-6">
                                        <h2 className="text-base font-medium text-white/90">Our Limitless Dashboard <br className="hidden" /> Customized for your Business</h2>
                                    </div>

                                    <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                                        <div className="bg-[#0a0a0a] rounded-md px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1 sm:gap-2 border border-[#8a8f98]/20 text-xs sm:text-sm 2xl:text-base text-[#8a8f98] w-24 sm:w-64 max-w-[150px] sm:max-w-none">
                                            <Search className="w-3 h-3 sm:w-4 sm:h-4" />
                                            <span className="hidden sm:inline font-normal truncate">{t("dashboard.header.search_placeholder")}</span>
                                            <span className="sm:hidden font-normal">Search...</span>
                                            <div className="ltr:ml-auto rtl:mr-auto text-[10px] sm:text-xs bg-[#ffffff]/10 px-1 sm:px-1.5 py-0.5 rounded text-[#8a8f98] hidden sm:block">⌘K</div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Scrollable View Content */}
                                <div className="flex-1 p-3 sm:p-6 md:p-8 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                    <AnimatePresence mode="wait">
                                        {activeView === "overview" && (
                                            <motion.div
                                                key="overview"
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                variants={staggerStickVariants}
                                                className="space-y-4 sm:space-y-6"
                                            >
                                                {/* Metrics Row - Responsive Grid: 1 col on XS, 2 on SM, 4 on LG */}
                                                <div className="grid gap-3 sm:gap-6 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
                                                    <MetricCard title={t("dashboard.metrics.total_revenue")} value="$45,231.89" subtext="+20.1%" icon={DollarSign} trend="up" delay={0.1} />
                                                    <MetricCard title={t("dashboard.metrics.active_users")} value="+2350" subtext="+180.1%" icon={Users} trend="up" delay={0.2} />
                                                    <MetricCard title={t("dashboard.metrics.deployments")} value="+12,234" subtext="+19%" icon={Server} trend="up" delay={0.3} />
                                                    <MetricCard title={t("dashboard.metrics.active_sessions")} value="+573" subtext="+201" icon={Activity} trend="up" delay={0.4} />
                                                </div>

                                                {/* Chart & Recent Sales - Responsive Stacking */}
                                                <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-7 lg:h-[350px] xl:h-[450px]">
                                                    <motion.div variants={stickerVariants} custom={0.5} className="lg:col-span-4 rounded-xl border border-[#8a8f98]/20 bg-[#ffffff]/[0.02] backdrop-blur-sm p-4 sm:p-6 flex flex-col min-h-[300px]">
                                                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                                                            <h3 className="text-sm sm:text-lg 2xl:text-xl font-medium text-[#ffffff]">{t("dashboard.charts.overview_title")}</h3>
                                                            <select className="bg-transparent text-[#8a8f98] text-[10px] sm:text-xs 2xl:text-sm border border-[#8a8f98]/20 rounded p-1 outline-none">
                                                                <option>12 months</option>
                                                                <option>30 days</option>
                                                                <option>7 days</option>
                                                            </select>
                                                        </div>
                                                        <div className="flex-1 w-full relative">
                                                            {/* Ensure chart container has height */}
                                                            <OverviewChart />
                                                        </div>
                                                    </motion.div>
                                                    <motion.div variants={stickerVariants} custom={0.6} className="lg:col-span-3 rounded-xl border border-[#8a8f98]/20 bg-[#ffffff]/[0.02] backdrop-blur-sm p-4 sm:p-6 flex flex-col min-h-[300px]">
                                                        <div className="mb-4 sm:mb-6">
                                                            <h3 className="text-sm sm:text-lg font-medium text-[#ffffff]">{t("dashboard.charts.recent_activity")}</h3>
                                                            <p className="text-[10px] sm:text-sm text-[#8a8f98]">{t("dashboard.charts.commits_message")}</p>
                                                        </div>
                                                        <div className="space-y-3 sm:space-y-6 overflow-y-auto ltr:pr-2 rtl:pl-2">
                                                            <RecentActivityItem name="Ziad Ramzy" email="info@limitlesstaps.com" amount="+1,999.00" />
                                                            <RecentActivityItem name="Galal Elsayed" email="contact@limitlesstaps.com" amount="+39.00" />
                                                            <RecentActivityItem name="Ahmed Salem" email="support@limitlesstaps.com" amount="+299.00" />
                                                        </div>
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {activeView === "analytics" && (
                                            <motion.div
                                                key="analytics"
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                variants={staggerStickVariants}
                                                className="space-y-4 sm:space-y-6"
                                            >
                                                <div className="grid gap-3 sm:gap-6 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3">
                                                    <MetricCard title={t("dashboard.metrics.page_views")} value="1.2M" subtext="+2.4%" icon={Globe} trend="up" delay={0.1} />
                                                    <MetricCard title={t("dashboard.metrics.bounce_rate")} value="42.3%" subtext="-1.1%" icon={Activity} trend="down" delay={0.2} />
                                                    <MetricCard title={t("dashboard.metrics.avg_duration")} value="4m 32s" subtext="+12s" icon={Clock} trend="up" delay={0.3} />
                                                </div>
                                                <motion.div variants={stickerVariants} custom={0.4} className="rounded-xl border border-[#8a8f98]/20 bg-[#ffffff]/[0.02] backdrop-blur-sm p-4 sm:p-6 min-h-[300px]">
                                                    <h3 className="text-sm sm:text-lg font-medium text-[#ffffff] mb-4 sm:mb-6">{t("dashboard.charts.traffic_sources")}</h3>
                                                    <AnalyticsChart />
                                                </motion.div>
                                            </motion.div>
                                        )}

                                        {activeView === "reports" && (
                                            <motion.div
                                                key="reports"
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                variants={staggerStickVariants}
                                                className="space-y-4 sm:space-y-6"
                                            >
                                                <div className="flex justify-between items-center text-white mb-2 sm:mb-4">
                                                    <h3 className="text-sm sm:text-lg font-medium">{t("dashboard.reports.title")}</h3>
                                                    <button className="flex items-center gap-1 sm:gap-2 bg-white text-black px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium hover:bg-gray-200"><Download className="w-3 h-3 sm:w-4 sm:h-4" /> {t("dashboard.reports.export_all")}</button>
                                                </div>
                                                <div className="rounded-xl border border-[#8a8f98]/20 bg-[#ffffff]/[0.02] backdrop-blur-sm overflow-hidden">
                                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 p-3 sm:p-4 border-b border-[#8a8f98]/10 text-[10px] sm:text-xs font-semibold text-[#8a8f98] uppercase tracking-wider">
                                                        <span>{t("dashboard.reports.columns.report_name")}</span>
                                                        <span className="hidden sm:block">{t("dashboard.reports.columns.date_created")}</span>
                                                        <span className="hidden sm:block">{t("dashboard.reports.columns.type")}</span>
                                                        <span>{t("dashboard.reports.columns.status")}</span>
                                                    </div>
                                                    <TableRow cols={["Q4 Financial Summary", "Dec 31, 2025", "PDF", "Ready"]} delay={0.1} />
                                                    <TableRow cols={["User Growth Analysis", "Dec 28, 2025", "CSV", "Ready"]} delay={0.2} />
                                                    <TableRow cols={["System Performance Log", "Dec 25, 2025", "XLSX", "Archived"]} delay={0.3} />
                                                </div>
                                            </motion.div>
                                        )}

                                        {activeView === "notifications" && (
                                            <motion.div
                                                key="notifications"
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                variants={staggerStickVariants}
                                                className="space-y-3 sm:space-y-4"
                                            >
                                                <NotificationItem title="Deployment Successful" time="2 minutes ago" type="success" delay={0.1} systemText={t("dashboard.notifications.system_notification")} />
                                                <NotificationItem title="High Server Load Detected" time="1 hour ago" type="alert" delay={0.2} systemText={t("dashboard.notifications.system_notification")} />
                                                <NotificationItem title="New User Registration Milestone" time="4 hours ago" type="info" delay={0.3} systemText={t("dashboard.notifications.system_notification")} />
                                            </motion.div>
                                        )}

                                        {activeView === "customers" && (
                                            <motion.div
                                                key="customers"
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                variants={staggerStickVariants}
                                                className="space-y-4 sm:space-y-6"
                                            >
                                                <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-6">
                                                    <div className="relative flex-1">
                                                        <Search className="absolute ltr:left-3 rtl:right-3 top-2 sm:top-2.5 h-3 w-3 sm:h-4 sm:w-4 text-[#8a8f98]" />
                                                        <input placeholder={t("dashboard.customers.search_placeholder")} className="w-full bg-[#0a0a0a] border border-[#8a8f98]/20 rounded-lg py-1.5 sm:py-2 ltr:pl-8 rtl:pr-8 ltr:pr-2 rtl:pl-2 sm:ltr:pl-9 sm:rtl:pr-9 text-xs sm:text-sm text-white placeholder-[#8a8f98] focus:outline-none focus:border-white/20" />
                                                    </div>
                                                    <button className="flex items-center gap-1 sm:gap-2 border border-[#8a8f98]/20 text-[#8a8f98] px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm hover:text-white hover:border-white/20"><Filter className="w-3 h-3 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">{t("dashboard.customers.filter")}</span></button>
                                                </div>
                                                <div className="rounded-xl border border-[#8a8f98]/20 bg-[#ffffff]/[0.02] backdrop-blur-sm overflow-hidden">
                                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 p-3 sm:p-4 border-b border-[#8a8f98]/10 text-[10px] sm:text-xs font-semibold text-[#8a8f98] uppercase tracking-wider">
                                                        <span>{t("dashboard.customers.columns.customer")}</span>
                                                        <span className="hidden sm:block">{t("dashboard.customers.columns.status")}</span>
                                                        <span className="hidden sm:block">{t("dashboard.customers.columns.last_order")}</span>
                                                        <span>{t("dashboard.customers.columns.total_spent")}</span>
                                                    </div>
                                                    <TableRow cols={["Alice Freeman", "Active", "2 mins ago", "$1,200.00"]} delay={0.1} />
                                                    <TableRow cols={["Bob Smith", "Active", "1 hour ago", "$850.50"]} delay={0.2} />
                                                    <TableRow cols={["Charlie Davis", "Inactive", "3 days ago", "$4,300.20"]} delay={0.3} />
                                                </div>
                                            </motion.div>
                                        )}

                                        {activeView === "products" && (
                                            <motion.div
                                                key="products"
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                variants={staggerStickVariants}
                                                className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6"
                                            >
                                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                                    <motion.div
                                                        key={i}
                                                        variants={stickerVariants}
                                                        custom={i * 0.1}
                                                        className="group relative rounded-xl border border-[#8a8f98]/20 bg-[#0a0a0a] overflow-hidden aspect-square flex flex-col items-center justify-center p-3 sm:p-6 hover:border-[#8a8f98]/40 transition-all text-center"
                                                    >
                                                        <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-[#333] mb-2 sm:mb-4 group-hover:bg-[#444] transition-colors animate-pulse" />
                                                        <h3 className="text-white font-medium text-xs sm:text-base">{t("dashboard.products.product_label")} {i}</h3>
                                                        <p className="text-[#8a8f98] text-[10px] sm:text-sm mt-0.5 sm:mt-1">$99.00</p>
                                                        <div className="absolute top-2 sm:top-4 ltr:right-2 sm:ltr:right-4 rtl:left-2 sm:rtl:left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <MoreHorizontal className="text-[#8a8f98] w-4 h-4 sm:w-5 sm:h-5 cursor-pointer" />
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}

                                        {activeView === "settings" && (
                                            <motion.div
                                                key="settings"
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                variants={staggerStickVariants}
                                                className="max-w-2xl mx-auto space-y-4 sm:space-y-8 mt-2 sm:mt-4"
                                            >
                                                <div className="space-y-3 sm:space-y-4">
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 border-b border-[#8a8f98]/10 gap-3">
                                                        <div>
                                                            <h3 className="text-sm sm:text-lg font-medium text-white">{t("dashboard.settings.title")}</h3>
                                                            <p className="text-[10px] sm:text-sm text-[#8a8f98]">{t("dashboard.settings.subtitle")}</p>
                                                        </div>
                                                        <button className="bg-white text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium self-start sm:self-auto">{t("dashboard.settings.save_button")}</button>
                                                    </div>

                                                    <div className="grid gap-4 sm:gap-6">
                                                        <div className="grid gap-1.5 sm:gap-2">
                                                            <label className="text-xs sm:text-sm font-medium text-white">{t("dashboard.settings.fields.username")}</label>
                                                            <input type="text" defaultValue={t("dashboard.sidebar.user.name")} className="bg-[#0a0a0a] border border-[#8a8f98]/20 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-white/50" />
                                                        </div>
                                                        <div className="grid gap-1.5 sm:gap-2">
                                                            <label className="text-xs sm:text-sm font-medium text-white">{t("dashboard.settings.fields.email")}</label>
                                                            <input type="email" defaultValue="user@limitless.com" className="bg-[#0a0a0a] border border-[#8a8f98]/20 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-white/50" />
                                                        </div>
                                                        <div className="grid gap-1.5 sm:gap-2">
                                                            <label className="text-xs sm:text-sm font-medium text-white">{t("dashboard.settings.fields.bio")}</label>
                                                            <textarea rows={3} defaultValue={t("dashboard.settings.bio_default")} className="bg-[#0a0a0a] border border-[#8a8f98]/20 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-white/50" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Smooth Footer Transition */}
            <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </section>
    );
}
