"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpinnerProps {
    className?: string;
    size?: number;
    width?: number | string;
    height?: number | string;
    color?: string;
    duration?: number;
}

export function Spinner({
    className,
    width = "100%",
    height = "100%",
    color = "#ffffff",
    duration = 4 // Slower default
}: SpinnerProps) {
    return (
        <div className={cn("relative flex items-center justify-center", className)}>
            <svg
                width={width}
                height={height}
                viewBox="0 0 100 50"
                className="overflow-visible w-full h-full"
            >
                <defs>
                    <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={color} stopOpacity="0" />
                        <stop offset="50%" stopColor={color} stopOpacity="1" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                    <filter id="spinner-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    {/* Stronger blur for the background moving glow */}
                    <filter id="moving-glow-blur" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="6" />
                    </filter>
                </defs>

                {/* 1. Static Background Track - Faint */}
                <path
                    d="M2,25 C2,8 35,8 50,25 C65,42 98,42 98,25 C98,8 65,8 50,25 C35,42 2,42 2,25"
                    fill="none"
                    stroke={color}
                    strokeWidth="1"
                    strokeOpacity="0.05"
                />

                {/* 2. Dynamic Moving Glow (Backlight) */}
                <motion.path
                    d="M2,25 C2,8 35,8 50,25 C65,42 98,42 98,25 C98,8 65,8 50,25 C35,42 2,42 2,25"
                    fill="none"
                    stroke={color}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeOpacity="0.15" // Subtle glow
                    filter="url(#moving-glow-blur)"
                    initial={{ pathLength: 0.35, pathOffset: 0, opacity: 0 }}
                    animate={{
                        pathOffset: [0, 1],
                        opacity: 1
                    }}
                    transition={{
                        pathOffset: {
                            duration: duration,
                            repeat: Infinity,
                            ease: "linear",
                        },
                        opacity: { duration: 0.5 }
                    }}
                />

                {/* 3. Main Animated Glowing Segment (Foreground) */}
                <motion.path
                    d="M2,25 C2,8 35,8 50,25 C65,42 98,42 98,25 C98,8 65,8 50,25 C35,42 2,42 2,25"
                    fill="none"
                    stroke="url(#spinner-gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    filter="url(#spinner-glow)"
                    initial={{ pathLength: 0.35, pathOffset: 0, opacity: 0 }}
                    animate={{
                        pathOffset: [0, 1],
                        opacity: 1
                    }}
                    transition={{
                        pathOffset: {
                            duration: duration,
                            repeat: Infinity,
                            ease: "linear",
                        },
                        opacity: { duration: 0.5 }
                    }}
                />
            </svg>
        </div>
    );
}
