"use client";

import { motion, LayoutGroup, useScroll, useTransform, Variants } from "motion/react";
import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Monitor,
  Type,
  Palette,
  Layout,
  Globe,
  ChevronDown,
  Maximize2,
  BarChart3,
  PieChart,
  Activity,
  Box,
  Circle,
  Square,
  Zap,
  TrendingUp,
  Users,
  MousePointer2,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

// --- Configuration Types ---
type FontOption = "sans" | "serif" | "mono";
type ThemeOption = "white" | "green" | "purple" | "blue";
type LayoutMode = "minimal" | "grid" | "split";
type ButtonStyle = "pill" | "rect";
type CardStyle = "glass" | "solid" | "bordered";
type SizeOption = "sm" | "md" | "lg";

const FONTS = {
  sans: "font-sans",
  serif: "font-serif",
  mono: "font-mono",
};

const SIZES = {
  sm: { title: "text-4xl md:text-6xl", body: "text-base md:text-lg", nav: "text-xs" },
  md: { title: "text-5xl md:text-7xl", body: "text-lg md:text-xl", nav: "text-sm" },
  lg: { title: "text-6xl md:text-8xl", body: "text-xl md:text-2xl", nav: "text-base" },
};

const THEMES = {
  white: {
    primary: "bg-white",
    text: "text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50",
    border: "border-white/20",
    glow: "shadow-[0_0_50px_-12px_rgba(255,255,255,0.5)]",
    textGlow: "drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]",
    buttonText: "text-black",
    card: "bg-white/5",
    accent: "bg-white",
    accentGradient: "from-white/40 to-transparent",
  },
  green: {
    primary: "bg-emerald-500",
    text: "text-emerald-500",
    border: "border-emerald-500/20",
    glow: "shadow-[0_0_50px_-12px_rgba(16,185,129,0.5)]",
    textGlow: "drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]",
    buttonText: "text-white",
    card: "bg-emerald-500/10",
    accent: "bg-emerald-500",
    accentGradient: "from-emerald-500/40 to-transparent",
  },
  purple: {
    primary: "bg-violet-500",
    text: "text-violet-500",
    border: "border-violet-500/20",
    glow: "shadow-[0_0_50px_-12px_rgba(139,92,246,0.5)]",
    textGlow: "drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]",
    buttonText: "text-white",
    card: "bg-violet-500/10",
    accent: "bg-violet-500",
    accentGradient: "from-violet-500/40 to-transparent",
  },
  blue: {
    primary: "bg-[#3737E6]",
    text: "text-[#3737E6]",
    border: "border-[#3737E6]/20",
    glow: "shadow-[0_0_50px_-12px_rgba(55,55,230,0.5)]",
    textGlow: "drop-shadow-[0_0_15px_rgba(55,55,230,0.5)]",
    buttonText: "text-white",
    card: "bg-[#3737E6]/10",
    accent: "bg-[#3737E6]",
    accentGradient: "from-[#3737E6]/40 to-transparent",
  },
};

const NAV_LINKS = ["Services", "Studio", "Work", "About Us", "START A PROJECT"];

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const cardStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
  exit: { opacity: 0 },
};

const floatVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const slideRightVariant: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// --- Mock Data for Dashboard ---
const STATS = [
  {
    label: "Total Users",
    value: "124,592",
    change: "+12.5%",
    icon: <Users size={16} />,
    data: [40, 30, 45, 50, 45, 60, 55, 70],
  },
  {
    label: "Revenue",
    value: "$4.2M",
    change: "+8.2%",
    icon: <BarChart3 size={16} />,
    data: [60, 65, 60, 75, 70, 85, 80, 95],
  },
  {
    label: "Active Sessions",
    value: "1,430",
    change: "+24%",
    icon: <Zap size={16} />,
    data: [20, 40, 30, 50, 45, 65, 60, 80],
  },
];

export default function LayoutDesign() {
  // State
  const [selectedFont, setSelectedFont] = useState<FontOption>("sans");
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>("purple");
  const [selectedSize, setSelectedSize] = useState<SizeOption>("md");
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("split");
  const [buttonStyle, setButtonStyle] = useState<ButtonStyle>("pill");
  const [cardStyle, setCardStyle] = useState<CardStyle>("glass");
  const [brandName, setBrandName] = useState("");
  const [showHint, setShowHint] = useState(false);
  const controlsRef = useRef<HTMLDivElement>(null);

  // Scroll Hint Logic
  const { scrollYProgress } = useScroll({
    target: controlsRef,
    offset: ["start 80%", "center center"],
  });

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v > 0 && !showHint) {
        // Trigger hint once
        // but we need a better "on view" trigger.
        // Let's use whileInView on the motion div, but we need state to dismiss it.
      }
    });
    return unsubscribe;
  }, [scrollYProgress, showHint]);

  // Dynamic Classes
  const theme = THEMES[selectedTheme];
  const size = SIZES[selectedSize];
  const [linePath, setLinePath] = useState("");
  const dotRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Update Line Logic
  React.useEffect(() => {
    const updateLine = () => {
      if (dotRef.current && controlsRef.current && sectionRef.current) {
        const dotRect = dotRef.current.getBoundingClientRect();
        const controlsRect = controlsRef.current.getBoundingClientRect();
        const sectionRect = sectionRef.current.getBoundingClientRect();

        const startX = dotRect.left + dotRect.width / 2 - sectionRect.left;
        const startY = dotRect.bottom - sectionRect.top;

        const endX = controlsRect.left + controlsRect.width / 2 - sectionRect.left;
        const endY = controlsRect.top - sectionRect.top;

        // Simple curve
        const cpX = startX;
        const cpY = endY;

        // If mobile (stacked), line goes straight down
        // If desktop (side by side), line curves
        const isDesktop = window.innerWidth >= 1024;

        if (isDesktop) {
          // Curve from center header to top of sidebar
          setLinePath(
            `M ${startX},${startY} C ${startX},${(startY + endY) / 2} ${endX},${(startY + endY) / 2} ${endX},${endY}`,
          );
        } else {
          // Straight line down on mobile
          setLinePath(`M ${startX},${startY} L ${endX},${endY}`);
        }
      }
    };

    updateLine();
    window.addEventListener("resize", updateLine);
    const interval = setInterval(updateLine, 1000); // Poll for layout shifts
    return () => {
      window.removeEventListener("resize", updateLine);
      clearInterval(interval);
    };
  }, []);

  const cardClass = cn(
    cardStyle === "glass" && "bg-white/5 backdrop-blur-md border-white/5",
    cardStyle === "solid" && "bg-[#111]",
    cardStyle === "bordered" && "bg-transparent border-white/20",
    "border transition-colors duration-300 overflow-hidden relative",
  );
  // Radius Logic: 'pill' => full rounding, 'rect' => small rounding
  const radiusClass = buttonStyle === "pill" ? "rounded-3xl" : "rounded-none";
  const buttonRadius = buttonStyle === "pill" ? "rounded-full" : "rounded-sm";

  // Brand Name Logic
  const displayBrand = brandName || "BRAND";

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center py-10 md:py-16 px-4 md:px-10 lg:px-20 gap-8 overflow-hidden relative"
    >
      {/* Header */}
      <motion.div
        className="text-center relative z-10 w-full max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-xl md:text-7xl font-app">
          DESIGN THE FIRST IMPRESSION
          <span ref={dotRef} className="inline-block relative">
            .
          </span>
        </h2>
        <p className="text-xl md:text-3xl p-4 text-[#86868b] font-medium">
          Make your website’s first section truly yours.
        </p>
      </motion.div>

      {/* Connecting Line SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d={linePath}
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
          filter="url(#glow)"
        />
        {/* Moving Dot on Line */}
        <motion.circle r="3" fill="white" filter="url(#glow)">
          <animateMotion dur="3s" repeatCount="indefinite" path={linePath} />
        </motion.circle>
      </svg>

      {/* Content Row: Layout Preview + Sidebar */}
      <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center gap-6 w-full">
        {/* Controls moved to sidebar */}

        {/* Main Preview Container */}
        <LayoutGroup>
          <motion.div
            layout
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn(
              "w-full lg:flex-1 lg:max-w-7xl bg-[#030303] border overflow-hidden relative shadow-2xl flex flex-col min-h-[400px] md:min-h-[550px] lg:min-h-[600px] transition-all duration-500",
              theme.border,
              theme.glow,
              // Apply radius to the CONTAINER too if desired, or keep it fixed.
              // User said: "rect and pill drop down on the bar now do nothing make it effect that side"
              // I'll make the main container slightly responsive to it too, or at least the INNER cards.
              "rounded-3xl",
            )}
          >
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {/* Navbar */}
            <div className="w-full border-b border-white/5 bg-black/40 backdrop-blur-md p-5 flex items-center justify-between z-20 sticky top-0 h-20">
              <div className="relative w-32 h-8 opacity-90">
                <Image src="/Logo/Main-Logo-Static.png" alt="Logo" fill className="object-contain object-left" />
              </div>
              <div className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map((item, i) => (
                  <span
                    key={item}
                    className={cn(
                      "font-medium cursor-pointer transition-colors hover:text-white",
                      size.nav,
                      i === 1 ? cn("text-white", theme.textGlow) : "text-white/50",
                    )}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div
                className={cn(
                  "flex items-center gap-2 text-white/60 border border-white/10 px-3 py-1.5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer",
                  buttonRadius,
                )}
              >
                <Globe size={14} />
                <span className="text-[10px] font-bold uppercase">En</span>
                <ChevronDown size={10} />
              </div>
            </div>

            {/* Dynamic Content Layout */}
            <div className={cn("flex-1 p-8 md:p-12 relative z-10 w-full overflow-hidden", FONTS[selectedFont])}>
              {/* 1. Minimal Layout */}
              {layoutMode === "minimal" && (
                <motion.div
                  className="h-full flex flex-col items-center justify-center text-center gap-8 max-w-4xl mx-auto mt-20"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div layoutId="hero-text" className="space-y-6" variants={itemVariants}>
                    <motion.h1
                      layout
                      variants={itemVariants}
                      className={cn("font-bold text-white tracking-tight leading-[0.9]", size.title, theme.textGlow)}
                    >
                      {displayBrand} <span className={cn("inline-block", theme.text)}>System</span>
                    </motion.h1>
                    <motion.p
                      layout
                      variants={itemVariants}
                      className={cn("text-white/50 max-w-xl mx-auto", size.body)}
                    >
                      Adaptable. Scalable. Beautiful.
                    </motion.p>
                  </motion.div>

                  <motion.div variants={slideRightVariant} className="w-fit mx-auto">
                    <ActionButton primary theme={theme} radius={buttonRadius}>
                      Start Now
                    </ActionButton>
                  </motion.div>
                </motion.div>
              )}

              {/* 2. Grid Layout */}
              {layoutMode === "grid" && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full content-center max-w-6xl mx-auto">
                  {/* Header Span */}
                  <div className="md:col-span-8 flex flex-col justify-center text-left">
                    <motion.div
                      layoutId="hero-text"
                      className="mb-8"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <motion.h1 layout className={cn("font-bold text-white mb-4", size.title, theme.textGlow)}>
                        {displayBrand} <span className={cn("inline-block", theme.text)}>Analytics</span>
                      </motion.h1>
                      <motion.p layout className={cn("text-white/50 max-w-md", size.body)}>
                        Real-time analytics for the modern {displayBrand} ecosystem.
                      </motion.p>
                    </motion.div>
                    <motion.div layoutId="hero-actions" className="flex gap-4">
                      <ActionButton primary theme={theme} radius={buttonRadius}>
                        Dashboard
                      </ActionButton>
                      <ActionButton theme={theme} radius={buttonRadius}>
                        Reports
                      </ActionButton>
                    </motion.div>
                  </div>

                  {/* Stats Grid */}
                  <div className="md:col-span-4 grid grid-cols-1 gap-4">
                    {STATS.map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className={cn(
                          "p-5 flex items-center justify-between group cursor-pointer hover:border-white/20",
                          cardClass,
                          radiusClass,
                        )} // radiusClass applied
                      >
                        <div>
                          <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                          <p className={cn("font-bold text-white", size.body)}>{stat.value}</p>
                        </div>
                        <div className={cn("p-2 rounded-full", theme.card, theme.text)}>{stat.icon}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Graph Area */}
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 }}
                    className={cn(
                      "md:col-span-12 h-64 p-8 relative overflow-hidden flex items-end gap-2",
                      cardClass,
                      radiusClass,
                    )}
                  >
                    <div className="absolute top-6 left-6 text-white/40 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                      <TrendingUp size={16} className={theme.text} />
                      {displayBrand} Growth
                    </div>
                    {[30, 45, 35, 60, 55, 75, 60, 80, 70, 90, 85, 100].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.4 + i * 0.05, type: "spring" }}
                        className={cn(
                          "flex-1 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity relative group",
                          theme.accent,
                        )}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          {h}%
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              )}

              {/* 3. Split Layout */}
              {layoutMode === "split" && (
                <div className="flex flex-col md:flex-row items-center gap-12 h-full max-w-6xl mx-auto">
                  <motion.div
                    className="flex-1 text-left space-y-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div layoutId="hero-text" variants={itemVariants}>
                      <div
                        className={cn(
                          "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6",
                          theme.card,
                          theme.text,
                        )}
                      >
                        <span className="relative flex h-2 w-2 mr-1">
                          <span
                            className={cn(
                              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                              theme.accent,
                            )}
                          ></span>
                          <span className={cn("relative inline-flex rounded-full h-2 w-2", theme.accent)}></span>
                        </span>
                        {displayBrand} System
                      </div>
                      <motion.h1
                        layout
                        className={cn("font-bold text-white mb-6 leading-tight", size.title, theme.textGlow)}
                      >
                        {displayBrand} <br />
                        <span className={cn("inline-block", theme.text)}>Experience</span>
                      </motion.h1>
                      <motion.p className={cn("text-white/50 max-w-md", size.body)}>
                        Control every pixel with {displayBrand}. Typography, color, and layout that adapts to your brand
                        identity instantly.
                      </motion.p>
                    </motion.div>
                    <motion.div
                      layoutId="hero-actions"
                      className="flex flex-col sm:flex-row gap-4"
                      variants={itemVariants}
                    >
                      <ActionButton primary theme={theme} radius={buttonRadius}>
                        Start Now{" "}
                      </ActionButton>
                      <ActionButton theme={theme} radius={buttonRadius}>
                        Contact Us
                      </ActionButton>
                    </motion.div>
                  </motion.div>

                  <div className="flex-1 w-full relative">
                    <motion.div
                      variants={cardStaggerVariants}
                      initial="hidden"
                      animate="visible"
                      viewport={{ once: true }}
                      className="w-full aspect-[4/3] relative flex items-center justify-center overflow-visible"
                    >
                      {/* Simplified Spotlight - Static for performance */}
                      <div
                        className={cn(
                          "absolute inset-0 rounded-full blur-[80px] opacity-10 pointer-events-none transition-colors duration-500",
                          theme.accent,
                        )}
                      />

                      {/* Main Hero Content - Floating */}
                      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
                        {/* Centerpiece Container */}
                        <div className="relative w-64 h-80 md:w-80 md:h-96">
                          {/* --- CENTER BIG CARD --- */}
                          <motion.div
                            layout
                            className={cn(
                              "absolute inset-0 z-10 flex flex-col justify-between p-8 mt-12 shadow-2xl transition-all duration-300",
                              cardClass,
                              radiusClass,
                            )}
                          >
                            {cardStyle === "glass" && (
                              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                            )}

                            {(() => {
                              const innerBg = cardStyle === "solid" ? "bg-white/10" : "bg-white/5";
                              const innerBorder = cardStyle === "bordered" ? "border-white/20" : "border-white/10";
                              const innerClass = cn(
                                innerBg,
                                "border",
                                innerBorder,
                                "backdrop-blur-sm transition-colors",
                              );

                              return (
                                <>
                                  <div className="flex justify-between items-start z-10 ">
                                    <div
                                      className={cn(
                                        "w-12 h-12 flex items-center justify-center shadow-lg transition-all",
                                        theme.accent,
                                        radiusClass === "rounded-3xl" ? "rounded-xl" : "rounded-sm",
                                      )}
                                    >
                                      <Box size={24} className="text-black" />
                                    </div>
                                    <div
                                      className={cn(
                                        "px-4 py-2 text-xs font-bold text-black shadow-lg",
                                        theme.accent,
                                        buttonRadius,
                                      )}
                                    >
                                      Action
                                    </div>
                                  </div>

                                  <div className="space-y-4 z-10 mt-auto">
                                    <motion.h3
                                      layout
                                      className={cn(
                                        "text-4xl md:text-5xl font-black text-white leading-none tracking-tight mb-2",
                                        theme.textGlow,
                                      )}
                                    >
                                      SYSTEM <br /> CORE
                                    </motion.h3>
                                    <p className="text-white/50 text-xs font-medium max-w-[150px] leading-relaxed">
                                      Architecture optimized for high-performance scaling.
                                    </p>
                                    <div className="flex gap-2 pt-2">
                                      <div
                                        className={cn(
                                          "w-24 h-1.5 rounded-full overflow-hidden bg-white/10",
                                          buttonRadius,
                                        )}
                                      >
                                        <div className={cn("h-full w-full", theme.accent)} />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })()}
                          </motion.div>

                          {/* --- CORNER CARDS --- */}

                          {/* Top Left: Zap */}
                          <motion.div
                            layout
                            variants={floatVariants}
                            custom={0}
                            className={cn(
                              "absolute -left-4 top-4 w-14 h-14 flex items-center justify-center shadow-lg z-20 hover:scale-110 transition-transform cursor-pointer backdrop-blur-md",
                              cardStyle === "solid" ? "bg-[#1a1a1a]" : "bg-white/10",
                              "border border-white/10",
                              radiusClass === "rounded-3xl" ? "rounded-2xl" : "rounded-md",
                            )}
                          >
                            <Zap size={20} className={cn(theme.text)} />
                          </motion.div>

                          {/* Top Right: Growth */}
                          <motion.div
                            layout
                            variants={floatVariants}
                            custom={1}
                            className={cn(
                              "absolute -right-6 -top-2 w-36 py-3 px-4 shadow-lg z-20 hover:translate-y-[-5px] transition-transform backdrop-blur-md",
                              cardStyle === "solid" ? "bg-[#1a1a1a]" : "bg-white/10",
                              "border border-white/10",
                              radiusClass === "rounded-3xl" ? "rounded-2xl" : "rounded-md",
                            )}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[9px] text-white/50 font-bold uppercase">Uptime</span>
                              <Activity size={12} className={cn(theme.text)} />
                            </div>
                            <div className="text-lg font-bold text-white mb-1.5">99.9%</div>
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                              <div className={cn("h-full w-[99%]", theme.accent)} />
                            </div>
                          </motion.div>

                          {/* Bottom Left: Users */}
                          <motion.div
                            layout
                            variants={floatVariants}
                            custom={2}
                            className={cn(
                              "absolute -left-4 bottom-14 py-2 px-3 shadow-lg z-20 flex items-center gap-3 hover:scale-105 transition-transform backdrop-blur-md",
                              cardStyle === "solid" ? "bg-[#1a1a1a]" : "bg-white/10",
                              "border border-white/10",
                              buttonRadius,
                            )}
                          >
                            <div className="flex -space-x-2">
                              {[1, 2, 3].map((i) => (
                                <div
                                  key={i}
                                  className={cn(
                                    "w-6 h-6 border border-[#0a0a0a] bg-zinc-800",
                                    theme.accent,
                                    buttonRadius,
                                  )}
                                />
                              ))}
                            </div>
                            <div className="text-[10px] font-bold text-white opacity-80">Active</div>
                          </motion.div>

                          {/* Bottom Right: Activity */}
                          <motion.div
                            layout
                            variants={floatVariants}
                            custom={3}
                            className={cn(
                              "absolute -right-6 bottom-14 w-28 p-3 shadow-lg z-20 hover:rotate-1 transition-transform backdrop-blur-md",
                              cardStyle === "solid" ? "bg-[#1a1a1a]" : "bg-white/10",
                              "border border-white/10",
                              radiusClass === "rounded-3xl" ? "rounded-2xl" : "rounded-md",
                            )}
                          >
                            <div className="flex items-end gap-1 h-6">
                              {[30, 60, 40, 80, 50, 70].map((h, i) => (
                                <div
                                  key={i}
                                  className={cn("w-full opacity-60", theme.accent)}
                                  style={{ height: `${h}%`, borderRadius: buttonStyle === "pill" ? "1px" : "0px" }}
                                />
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </LayoutGroup>

        {/* Sidebar Controls */}
        <motion.div
          ref={controlsRef} // Moved ref here
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full lg:w-[220px] shrink-0 relative z-30 self-center"
        >
          {/* Interactive Tooltip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 z-50 hidden lg:block pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="bg-white text-black text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)] whitespace-nowrap relative">
                Try it yourself!
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45" />
              </div>
            </motion.div>
          </motion.div>

          <div className="flex flex-col gap-4 p-4 rounded-[1.5rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl w-full">
            {/* Layout Mode */}
            <ControlGroup label="Choose Layout" icon={<Layout size={14} />}>
              {(["minimal", "grid", "split"] as LayoutMode[]).map((mode) => (
                <ControlButton
                  key={mode}
                  isActive={layoutMode === mode}
                  onClick={() => setLayoutMode(mode)}
                  label={mode}
                />
              ))}
            </ControlGroup>

            <Divider />

            {/* Typography */}
            <ControlGroup label="Typography" icon={<Type size={14} />}>
              {(["sans", "serif", "mono"] as FontOption[]).map((f) => (
                <ControlButton key={f} isActive={selectedFont === f} onClick={() => setSelectedFont(f)} label={f} />
              ))}
            </ControlGroup>

            <Divider />

            {/* Size */}
            <ControlGroup label="Interface Scale" icon={<Maximize2 size={14} />}>
              {(["sm", "md", "lg"] as SizeOption[]).map((s) => (
                <ControlButton
                  key={s}
                  isActive={selectedSize === s}
                  onClick={() => setSelectedSize(s)}
                  label={s === "sm" ? "S" : s === "md" ? "M" : "L"}
                />
              ))}
            </ControlGroup>

            <Divider />

            {/* Color Theme */}
            <ControlGroup label="Color Theme" icon={<Palette size={14} />}>
              {(["white", "green", "purple", "blue"] as ThemeOption[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTheme(t)}
                  className={cn(
                    "w-8 h-8 rounded-full border border-white/10 transition-all",
                    THEMES[t].primary,
                    selectedTheme === t
                      ? cn("ring-2 ring-white scale-110", THEMES[t].glow)
                      : "opacity-50 hover:opacity-100",
                  )}
                />
              ))}
            </ControlGroup>

            <Divider />

            {/* Brand Name Input */}
            <ControlGroup label="Brand Name" icon={<Type size={14} />}>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value.toUpperCase().slice(0, 8))}
                className="bg-transparent border-b border-white/20 text-white font-bold w-full py-1 focus:outline-none focus:border-white transition-colors placeholder-white/20 text-sm"
                placeholder="BRAND"
                maxLength={8}
              />
            </ControlGroup>

            <Divider />

            {/* Details - Compact */}
            <ControlGroup label="Style" icon={<MousePointer2 size={14} />}>
              <div className="flex gap-2 w-full">
                <ControlDropdown
                  label="Btn"
                  value={buttonStyle}
                  options={[
                    { label: "Pill", value: "pill" },
                    { label: "Rect", value: "rect" },
                  ]}
                  onChange={(val) => setButtonStyle(val as ButtonStyle)}
                  icon={<Circle size={14} />}
                  radius={buttonStyle === "pill" ? "rounded-full" : "rounded-md"}
                  compact
                />
                <ControlDropdown
                  label="Card"
                  value={cardStyle}
                  options={[
                    { label: "Glass", value: "glass" },
                    { label: "Solid", value: "solid" },
                    { label: "Bordered", value: "bordered" },
                  ]}
                  onChange={(val) => setCardStyle(val as CardStyle)}
                  icon={<Box size={14} />}
                  radius={buttonStyle === "pill" ? "rounded-full" : "rounded-md"}
                  compact
                />
              </div>
            </ControlGroup>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- Sub-Components ---

function ActionButton({
  children,
  primary,
  theme,
  radius,
}: {
  children: React.ReactNode;
  primary?: boolean;
  theme: any;
  radius: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "px-8 py-4 font-bold tracking-wide transition-all shadow-lg hover:shadow-xl text-sm md:text-base",
        radius,
        primary
          ? cn(theme.primary, theme.glow, theme.buttonText)
          : "bg-white/5 hover:bg-white/10 border border-white/10 text-white",
      )}
    >
      {children}
    </motion.button>
  );
}

function ItemsHint({ show }: { show: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: show ? 1 : 0, x: show ? 0 : -20 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3"
    >
      <div className="flex flex-col items-end">
        <span className="text-white text-sm font-bold tracking-widest uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          Edit Here
        </span>
      </div>
      <div className="relative">
        <ArrowRight className="text-white w-6 h-6 animate-pulse" />
        <div className="absolute inset-0 bg-white blur-lg opacity-50 animate-pulse" />
      </div>
    </motion.div>
  );
}

function ControlGroup({ label, children, icon }: { label: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-[10px] md:text-xs font-bold text-white/50 uppercase tracking-widest flex items-center gap-2">
        {icon} <span className="text-white/70">{label}</span>
      </span>
      <div className="flex flex-nowrap gap-1 items-center w-full">{children}</div>
    </div>
  );
}

function ControlButton({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 text-[10px] font-bold tracking-wider rounded-xl transition-all duration-300 uppercase relative overflow-hidden",
        isActive
          ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105 z-10"
          : "text-white/60 hover:text-white hover:bg-white/10 border border-white/5 hover:border-white/20",
      )}
    >
      {label}
    </button>
  );
}

function Divider() {
  return <div className="h-px w-full bg-white/5 my-0" />;
}

function ControlDropdown({
  label,
  value,
  options,
  onChange,
  icon,
  radius = "rounded-xl",
  compact,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
  icon: React.ReactNode;
  radius?: string;
  compact?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Close on blur delay
        className={cn(
          "flex items-center gap-2 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group justify-between hover:border-white/30",
          radius,
          compact ? "px-2.5 py-1.5 min-w-[80px]" : "px-3 py-2 min-w-[100px]",
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-white/60 group-hover:text-white transition-colors">{icon}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 group-hover:text-white transition-colors">
            {options.find((o) => o.value === value)?.label || value}
          </span>
        </div>
        <ChevronDown
          size={12}
          className={cn("text-white/40 transition-transform duration-300", isOpen && "rotate-180")}
        />
      </button>

      {/* Dropdown Menu */}
      <div className="absolute top-full left-0 mt-2 w-full min-w-[120px] z-50">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col"
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "px-4 py-2 text-left text-xs font-bold uppercase tracking-wider transition-colors hover:bg-white/10",
                  value === option.value ? "text-white bg-white/5" : "text-white/50",
                )}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
