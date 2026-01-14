"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Zap, TrendingUp, BarChart3, Globe, Users, Target, MousePointer2, Smartphone, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
type PillCategory = "SaaS" | "Start-up" | "Agency" | "Enterprise";

interface ClientLogo {
    id: string;
    name: string;
    icon: React.ReactNode;
}

interface PillData {
    category: PillCategory;
    color: string;
    textColor: string;
    logos: ClientLogo[];
}

// --- Data ---
const PILLS: PillData[] = [
    {
        category: "SaaS",
        color: "#93D993",
        textColor: "text-black",
        logos: [
            { id: "s1", name: "Lemlist", icon: <Zap size={20} /> },
            { id: "s2", name: "Lempire", icon: <Globe size={20} /> },
            { id: "s3", name: "Salesforce", icon: <TrendingUp size={20} /> },
            { id: "s4", name: "Hubspot", icon: <Users size={20} /> },
        ]
    },
    {
        category: "Start-up",
        color: "#E6E666",
        textColor: "text-black",
        logos: [
            { id: "st1", name: "Station F", icon: <Target size={20} /> },
            { id: "st2", name: "Alan", icon: <CheckCircle2 size={20} /> },
            { id: "st3", name: "Qonto", icon: <BarChart3 size={20} /> },
            { id: "st4", name: "Swile", icon: <MousePointer2 size={20} /> },
        ]
    },
    {
        category: "Agency",
        color: "#6666E6",
        textColor: "text-white",
        logos: [
            { id: "a1", name: "Ogilvy", icon: <Monitor size={20} /> },
            { id: "a2", name: "Publicis", icon: <Smartphone size={20} /> },
            { id: "a3", name: "Havas", icon: <Globe size={20} /> },
            { id: "a4", name: "TBWA", icon: <Zap size={20} /> },
        ]
    },
    {
        category: "Enterprise",
        color: "#E699E6",
        textColor: "text-black",
        logos: [
            { id: "e1", name: "LVMH", icon: <CheckCircle2 size={20} /> },
            { id: "e2", name: "Danone", icon: <Users size={20} /> },
            { id: "e3", name: "L'Oréal", icon: <Target size={20} /> },
            { id: "e4", name: "Sanofi", icon: <BarChart3 size={20} /> },
        ]
    }
];

const SECTORS = ["AI", "Marketing", "Automation", "Growth", "Tools"];

// --- Animations ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const pillEntranceVariants: Variants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 70,
            damping: 20
        }
    }
};

const logoContainerVariants: Variants = {
    hidden: { opacity: 0 },
    hover: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05
        }
    }
};

const logoItemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    hover: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 150,
            damping: 15
        }
    }
};

// --- Components ---

function Pill({ data, index }: { data: PillData; index: number }) {
    const isDarkText = data.textColor === "text-black";
    const arrowBg = isDarkText ? "bg-black" : "bg-white";
    const arrowColor = isDarkText ? "text-white" : "text-black";

    return (
        <motion.div
            variants={pillEntranceVariants}
            className="group relative flex flex-col items-center justify-end h-[420px] w-24 md:w-28 rounded-full transition-all duration-500 hover:-translate-y-4"
            style={{
                backgroundColor: data.color,
                rotate: "-12deg",
                transformOrigin: "bottom center"
            }}
        >
            {/* Logos Container (Revealed on Hover) */}
            <motion.div
                className="absolute inset-x-0 bottom-24 top-4 flex flex-col-reverse items-center justify-start gap-3 overflow-hidden px-2 pb-4"
                variants={logoContainerVariants}
                initial="hidden"
                whileHover="hover"
            >
                {data.logos.map((logo) => (
                    <motion.div
                        key={logo.id}
                        variants={logoItemVariants}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black flex items-center justify-center shrink-0 shadow-lg relative group/logo cursor-pointer"
                    >
                        <span className="text-white relative z-10">{logo.icon}</span>
                        {/* Tooltip for Logo Name (Optional enhancement) */}
                        <span className="absolute right-full mr-2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/logo:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {logo.name}
                        </span>
                    </motion.div>
                ))}
            </motion.div>

            {/* Bottom Arrow Button */}
            <div className={cn(
                "mb-4 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-md",
                arrowBg,
                arrowColor
            )}>
                <ArrowUpRight size={24} className="transition-transform duration-300 group-hover:rotate-45" />
            </div>

            {/* Category Label (Outside Pill) */}
            <div className="absolute -bottom-12 md:-bottom-14 left-1/2 -translate-x-1/2 text-center w-32">
                <span className="text-white/80 font-medium text-sm md:text-base tracking-wide whitespace-nowrap">
                    {data.category}
                </span>
            </div>
        </motion.div>
    );
}

export default function ServicesSolution() {
    return (
        <section className="w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center py-24 px-6 overflow-hidden relative">

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">

                {/* Left Column: Text Content */}
                <motion.div
                    className="space-y-8 lg:pr-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.h2
                        variants={containerVariants}
                        className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
                    >
                        Identity <br />
                        <span className="text-white/50">driven by</span> <br />
                        Innovation
                    </motion.h2>

                    <motion.p
                        variants={containerVariants}
                        className="text-white/60 text-lg md:text-xl leading-relaxed max-w-lg"
                    >
                        For over a decade, we have partnered with B2B innovators and industry leaders to construct resilient brand identities. Our deep understanding of these economic ecosystems guides our strategy, allowing us to deliver complete, functional, and scalable solutions.
                    </motion.p>

                    {/* Sectors / Tags */}
                    <motion.div variants={containerVariants} className="space-y-4 pt-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-white/40">Our Client Sectors:</p>
                        <div className="flex flex-wrap gap-3">
                            {SECTORS.map((sector) => (
                                <span
                                    key={sector}
                                    className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                                >
                                    {sector}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Column: Interactive Pills */}
                <motion.div
                    className="flex justify-center lg:justify-end gap-4 md:gap-6 pt-12 lg:pt-0 h-[600px] items-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {PILLS.map((pill, index) => (
                        <Pill key={pill.category} data={pill} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
