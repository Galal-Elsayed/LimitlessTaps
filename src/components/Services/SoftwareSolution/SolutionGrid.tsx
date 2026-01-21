"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
    AnimatedDatabase,
    AnimatedChart,
    AnimatedScale,
    AnimatedWorkflow,
    AnimatedShield,
    AnimatedCloud
} from "./AnimatedIcons";

const gridItems = [
    {
        title: "Unified Data Ecosystem",
        description: "Break down silos. Ensure seamless data flow between ERP, CRM, and HRM systems for a single source of truth.",
        shape: <AnimatedDatabase />,
    },
    {
        title: "Real-Time Intelligence",
        description: "Make decisions faster. Live analytics and customizable dashboards visualize your enterprise performance instantly.",
        shape: <AnimatedChart />,
    },
    {
        title: "Scalable Architecture",
        description: "Built to grow. Our modular infrastructure handles increasing data loads and user volume without compromising speed.",
        shape: <AnimatedScale />,
    },
    {
        title: "Automated Workflows",
        description: "Efficiency first. Automate repetitive tasks and approval processes to reduce human error and operational costs.",
        shape: <AnimatedWorkflow />,
    },
    {
        title: "Bank-Grade Security",
        description: "Protect what matters. Enterprise-level encryption, role-based access control, and compliance protocols standard.",
        shape: <AnimatedShield />,
    },
    {
        title: "Cloud-Native Agility",
        description: "Access anywhere. Secure, high-availability cloud deployment ensures your team stays connected from any device.",
        shape: <AnimatedCloud />,
    },
];

export const SolutionGrid = ({ className }: { className?: string }) => {
    return (
        <div className="relative w-full flex flex-col items-center mt-24 bg-[#0a0a0a]">
            {/* Connecting Line from Data Component to Grid */}
            <div className="absolute -top-24 left-1/2 w-px h-24 bg-gradient-to-b from-white/20 via-white/40 to-white/10 -translate-x-1/2" />
            <div className="absolute -top-1 left-1/2 w-3 h-3 bg-white/50 rounded-full blur-sm -translate-x-1/2" />

            <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[90rem] mx-auto px-6 z-10", className)}>
                {gridItems.map((item, index) => (
                    <div
                        key={index}
                        className="group relative flex flex-col justify-end p-8 min-h-[300px]  bg-neutral-900/50 border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
                    >
                        {/* Card Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Abstract Shape Positioned like SeoCards (Top Right or Background) */}
                        <div className="absolute top-0 right-0 p-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700">
                            {item.shape}
                        </div>

                        <div className="relative z-10 mt-auto">
                            <h3 className="mb-3 text-2xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">
                                {item.title}
                            </h3>

                            <p className="text-sm leading-relaxed text-white/60 group-hover:text-white/90 transition-colors duration-300 max-w-sm">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Black Bottom Gradient to connect with next section */}
            <div className="w-full h-28 mt-48 bg-gradient-to-b from-[#0a0a0a] to-black" />
        </div>
    );
};

export default SolutionGrid;
