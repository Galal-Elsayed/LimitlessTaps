"use client";

import React from "react";
import { motion } from "motion/react";
import { Folder, HeartHandshakeIcon, SparklesIcon, BarChart3, Cloud, Users, Package, Briefcase, Database } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatabaseWithRestApiProps {
  className?: string;
  circleText?: string;
  badgeTexts?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
  buttonTexts?: {
    first?: string;
    second?: string;
    third?: string;
    fourth?: string;
  };
  title?: string;
  lightColor?: string;
  hideBadges?: boolean;
  hideTopButtons?: boolean;
  hideBottomButtons?: boolean; // Controls Analytics/Cloud buttons
  hideCore?: boolean;
  isRTL?: boolean;
}

const DatabaseWithRestApi = ({
  className,
  circleText,
  badgeTexts,
  buttonTexts,
  title,
  lightColor = "#3b82f6", // Default blue glow
  hideBadges = false,
  hideTopButtons = false, // Renamed from specific mentions to generic top/bottom control or keep logical?
  // Let's stick to the user's intent: Top "Sources" are badges. Bottom buttons are Analytics/Cloud.
  // Actually, existing code: "Top Buttons (Sources)" are the badges (first/second...). "Main Box" has "Badges inside box" (Analytics/Cloud).
  // So 'hideBadges' will hide the Top Sources.
  // 'hideBottomButtons' will hide the Analytics/Cloud/Core elements if needed.
  hideBottomButtons = false,
  hideCore = false,
  isRTL = false,
}: DatabaseWithRestApiProps) => {
  return (
    <div className={cn("relative flex h-[350px] min-[500px]:h-[400px] md:h-[450px] w-full flex-col items-center", className)}>
      {/* SVG Paths & Animation */}
      <svg
        className="h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 200 100"
        preserveAspectRatio="xMidYMin meet"
      >
        <defs>
          {/* Glow Filter */}
          <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Masks for circles (unchanged logic) - Masking might need adjustment if badges gone? No, paths rely on masks. Keep them. */}
          <mask id="db-mask-1">
            <path d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10" strokeWidth="2" stroke="white" fill="none" />
          </mask>
          <mask id="db-mask-2">
            <path d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10" strokeWidth="2" stroke="white" fill="none" />
          </mask>
          <mask id="db-mask-3">
            <path d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10" strokeWidth="2" stroke="white" fill="none" />
          </mask>
          <mask id="db-mask-4">
            <path d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10" strokeWidth="2" stroke="white" fill="none" />
          </mask>

          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={lightColor} stopOpacity="0" />
            <stop offset="50%" stopColor={lightColor} stopOpacity="1" />
            <stop offset="100%" stopColor={lightColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Base Lines (Dim) */}
        <g stroke="white" strokeOpacity="0.2" fill="none" strokeWidth="0.5">
          <path d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10" />
          <path d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10" />
          <path d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10" />
          <path d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10" />
        </g>

        {/* Animated Glowing Lines */}
        <g stroke="url(#line-gradient)" fill="none" strokeWidth="1.5" filter="url(#glow-filter)" strokeLinecap="round">
          <path d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10" strokeDasharray="100" strokeDashoffset="100">
            <animate
              attributeName="stroke-dashoffset"
              from="100"
              to="-100"
              dur="3s"
              repeatCount="indefinite"
              begin="0s"
            />
          </path>
          <path d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10" strokeDasharray="60" strokeDashoffset="60">
            <animate
              attributeName="stroke-dashoffset"
              from="60"
              to="-60"
              dur="2.5s"
              repeatCount="indefinite"
              begin="0.5s"
            />
          </path>
          <path d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10" strokeDasharray="60" strokeDashoffset="60">
            <animate
              attributeName="stroke-dashoffset"
              from="60"
              to="-60"
              dur="2.5s"
              repeatCount="indefinite"
              begin="1s"
            />
          </path>
          <path d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10" strokeDasharray="100" strokeDashoffset="100">
            <animate
              attributeName="stroke-dashoffset"
              from="100"
              to="-100"
              dur="3.2s"
              repeatCount="indefinite"
              begin="0.2s"
            />
          </path>
        </g>

        {/* Top Buttons (Sources) */}
        {!hideBadges && (
          <g stroke="none" fill="none">
            {/* First Button (ERP) */}
            <g>
              <rect fill="#111" stroke="#333" strokeWidth="0.5" x="14" y="5" width="34" height="10" rx="5" />
              <foreignObject x="16" y="7.5" width="5" height="5">
                <div className="flex items-center justify-center w-full h-full">
                  <Database className="w-full h-full text-white" strokeWidth={2} />
                </div>
              </foreignObject>
              <text x="33" y="12" fill="white" fontSize="4" fontWeight="500" textAnchor="middle">
                {badgeTexts?.first || "GET"}
              </text>
            </g>
            {/* Second Button (CRM) */}
            <g>
              <rect fill="#111" stroke="#333" strokeWidth="0.5" x="60" y="5" width="34" height="10" rx="5" />
              <foreignObject x="62" y="7.5" width="5" height="5">
                <div className="flex items-center justify-center w-full h-full">
                  <Users className="w-full h-full text-white" strokeWidth={2} />
                </div>
              </foreignObject>
              <text x="79" y="12" fill="white" fontSize="4" fontWeight="500" textAnchor="middle">
                {badgeTexts?.second || "POST"}
              </text>
            </g>
            {/* Third Button (HRM) */}
            <g>
              <rect fill="#111" stroke="#333" strokeWidth="0.5" x="108" y="5" width="34" height="10" rx="5" />
              <foreignObject x="110" y="7.5" width="5" height="5">
                <div className="flex items-center justify-center w-full h-full">
                  <Briefcase className="w-full h-full text-white" strokeWidth={2} />
                </div>
              </foreignObject>
              <text x="127" y="12" fill="white" fontSize="4" fontWeight="500" textAnchor="middle">
                {badgeTexts?.third || "PUT"}
              </text>
            </g>
            {/* Fourth Button (Inventory) */}
            <g>
              <rect fill="#111" stroke="#333" strokeWidth="0.5" x="150" y="5" width="40" height="10" rx="5" />
              <foreignObject x="152" y="7.5" width="5" height="5">
                <div className="flex items-center justify-center w-full h-full">
                  <Package className="w-full h-full text-white" strokeWidth={2} />
                </div>
              </foreignObject>
              <text x="172" y="12" fill="white" fontSize="4" fontWeight="500" textAnchor="middle">
                {badgeTexts?.fourth || "DELETE"}
              </text>
            </g>
          </g>
        )}
      </svg>

      {/* Main Box Area */}
      <div className="absolute bottom-10 flex w-full flex-col items-center px-10">
        {/* Box Title */}
        <div className="absolute -top-3 z-20 flex items-center justify-center rounded-full border border-white/10 bg-[#111] px-3 py-1 sm:-top-4">
          <SparklesIcon className="size-3 text-white/70" />
          <span className="ml-2 text-[10px] text-white/90">
            {title ? title : "Data exchange using a customized REST API"}
          </span>
        </div>

        {/* Core Circle */}
        {!hideCore && (
          <div className="absolute -bottom-8 z-30 hidden lg:grid h-[60px] w-[60px] place-items-center rounded-full border border-white/10 bg-[#050505] font-semibold text-xs text-white shadow-2xl shadow-blue-500/10">
            {circleText ? circleText : "SVG"}
          </div>
        )}

        {/* Main Content Box - Lighter #222 Background */}
        <div className="relative z-10 flex h-[200px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#222] shadow-inner shadow-black/50">
          {/* Badges inside box */}
          {!hideBottomButtons && (
            <>
              <div className="absolute bottom-8 left-12 z-10 h-7 rounded-full bg-[#111] border border-white/10 px-3 text-xs flex items-center gap-2 text-white/80 shadow-lg shadow-black/50">
                <BarChart3 className="size-3.5 text-white/70" />
                <span>{buttonTexts?.first || "Analytics"}</span>
              </div>
              <div className="absolute right-16 z-10 hidden h-7 rounded-full bg-[#111] border border-white/10 px-3 text-xs sm:flex items-center gap-2 text-white/80 shadow-lg shadow-black/50">
                <Cloud className="size-3.5 text-white/70" />
                <span>{buttonTexts?.second || "Cloud"}</span>
              </div>
            </>
          )}

          {/* Concentric Circles (Ripples) */}
          {[140, 220, 300, 380].map((size, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-white/20 bg-black/60 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              style={{
                width: size,
                height: size,
                bottom: -(size / 2.5),
                zIndex: 0,
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 1, 0.3],
                boxShadow: [
                  "0 0 10px rgba(255,255,255,0.05)",
                  "0 0 25px rgba(255,255,255,0.2)",
                  "0 0 10px rgba(255,255,255,0.05)",
                ],
                borderColor: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.1)"],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DatabaseWithRestApi;

const DatabaseIcon = ({ x = "0", y = "0", color = "white" }: { x: string; y: string; color?: string }) => {
  return (
    <svg
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
};
