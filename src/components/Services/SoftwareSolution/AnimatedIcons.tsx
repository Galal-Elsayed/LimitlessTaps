"use client";

import React from "react";
import { motion } from "motion/react";

// --- Helper Components ---
const Glow = ({ color }: { color: string }) => (
    <div className={`absolute inset-0 bg-${color}-500/20 blur-2xl rounded-full opacity-50`} />
);

// 1. Unified Data Ecosystem (Blue) -> Abstract Network/Grid
export const AnimatedDatabase = () => (
    <div className="relative w-24 h-24 flex items-center justify-center">
        <Glow color="blue" />
        <div className="grid grid-cols-2 gap-2 transform rotate-45">
            {[0, 1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className="w-8 h-8 border border-blue-400/30 bg-blue-500/10 rounded-lg backdrop-blur-sm"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
        <motion.div
            className="absolute inset-0 border border-blue-500/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
    </div>
);

// 2. Real-Time Intelligence (Purple) -> Abstract Pulse/Radar
export const AnimatedChart = () => (
    <div className="relative w-24 h-24 flex items-center justify-center">
        <Glow color="purple" />
        <motion.div
            className="absolute inset-2 border-t-2 border-r-2 border-purple-500/50 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
            className="absolute inset-6 border-b-2 border-l-2 border-purple-400/50 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <div className="flex items-end gap-1 h-12">
            {[0.4, 0.8, 0.6, 1, 0.5].map((h, i) => (
                <motion.div
                    key={i}
                    className="w-2 bg-purple-500/80 rounded-t-sm"
                    initial={{ height: 10 }}
                    animate={{ height: [10, h * 30, 10] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    </div>
);

// 3. Scalable Architecture (Green) -> Expanding Layers/Hexagons
export const AnimatedScale = () => (
    <div className="relative w-24 h-24 flex items-center justify-center">
        <Glow color="green" />
        {[0, 1, 2].map((i) => (
            <motion.div
                key={i}
                className="absolute border border-green-500/30 rounded-xl"
                style={{ width: (i + 1) * 20 + 20, height: (i + 1) * 20 + 20 }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.5, 0.2],
                    rotate: [0, 90, 180]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay: i * 1,
                    ease: "easeInOut",
                }}
            />
        ))}
        <motion.div
            className="w-10 h-10 bg-green-500/20 rounded-lg border border-green-400/50"
            animate={{ rotate: -180 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
    </div>
);

// 4. Automated Workflows (Orange) -> Moving Particles/Flow
export const AnimatedWorkflow = () => (
    <div className="relative w-24 h-24 flex items-center justify-center">
        <Glow color="orange" />
        <svg width="100" height="100" viewBox="0 0 100 100" className="opacity-80">
            <motion.path
                d="M10,50 Q30,20 50,50 T90,50"
                fill="none"
                stroke="rgba(251, 146, 60, 0.2)"
                strokeWidth="2"
            />
            <motion.circle
                r="4"
                fill="#fb923c"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                style={{ offsetPath: "path('M10,50 Q30,20 50,50 T90,50')" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
                d="M10,80 Q30,50 50,80 T90,80"
                fill="none"
                stroke="rgba(251, 146, 60, 0.2)"
                strokeWidth="2"
            />
            <motion.circle
                r="3"
                fill="#fb923c"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                style={{ offsetPath: "path('M10,80 Q30,50 50,80 T90,80')" }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
            />
        </svg>
        <div className="absolute inset-0 flex justify-center items-center gap-4">
            <motion.div className="w-2 h-2 rounded-full bg-orange-500" animate={{ y: [-10, 10, -10] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.div className="w-2 h-2 rounded-full bg-orange-500" animate={{ y: [10, -10, 10] }} transition={{ duration: 2, repeat: Infinity }} />
        </div>
    </div>
);

// 5. Bank-Grade Security (Red) -> Shield/Lock Abstract
export const AnimatedShield = () => (
    <div className="relative w-24 h-24 flex items-center justify-center">
        <Glow color="red" />
        <motion.div
            className="absolute inset-0 border-2 border-dashed border-red-500/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
            className="w-12 h-16 border-2 border-red-500/50 rounded-b-3xl rounded-t-lg relative flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0.8 }}
            whileHover={{ scale: 1.1, borderColor: "rgba(239, 68, 68, 1)" }}
        >
            <motion.div
                className="absolute w-full h-full bg-red-500/20"
                animate={{ top: ["100%", "-100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <div className="w-4 h-4 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
        </motion.div>
    </div>
);

// 6. Cloud-Native Agility (Teal) -> Floating/Morphing Shapes
export const AnimatedCloud = () => (
    <div className="relative w-24 h-24 flex items-center justify-center">
        <Glow color="teal" />
        <motion.div
            className="absolute w-16 h-16 bg-teal-500/10 rounded-full blur-md"
            animate={{
                x: [-10, 10, -10],
                y: [-5, 5, -5],
                scale: [1, 1.2, 1],
            }}
            transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
        <motion.div
            className="absolute w-12 h-12 bg-teal-400/20 rounded-full blur-sm"
            animate={{
                x: [10, -10, 10],
                y: [5, -5, 5],
                scale: [1.2, 1, 1.2],
            }}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
        <div className="z-10 w-20 h-10 border border-teal-500/30 rounded-full flex items-center justify-center backdrop-blur-sm relative">
            <div className="w-1 h-1 bg-teal-500 rounded-full animate-ping absolute right-4" />
            <div className="w-2 h-2 bg-teal-500 rounded-full absolute left-4" />
        </div>
    </div>
);
