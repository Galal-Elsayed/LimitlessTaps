"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface WhatWeDeliverLinesProps {
  className?: string;
  badgeTexts?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
  lightColor?: string;
  hideBadges?: boolean;
}

const WhatWeDeliverLines = ({
  className,
  badgeTexts,
  lightColor = "#3b82f6", // Default blue glow
  hideBadges = false,
}: WhatWeDeliverLinesProps) => {
  return (
    <div className={cn("relative flex h-[450px] w-full flex-col items-center", className)}>
      {/* SVG Paths & Animation */}
      <svg
        className="h-full sm:w-full"
        width="100%"
        height="100%"
        viewBox="0 0 200 100"
        preserveAspectRatio="xMidYMin slice"
      >
        <defs>
          {/* Glow Filter */}
          <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Fade Mask Gradient */}
          <linearGradient id="fade-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="15%" stopColor="white" stopOpacity="1" />
          </linearGradient>

          <mask id="fade-mask">
            <rect x="0" y="0" width="200" height="100" fill="url(#fade-gradient)" />
          </mask>

          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={lightColor} stopOpacity="0" />
            <stop offset="50%" stopColor={lightColor} stopOpacity="1" />
            <stop offset="100%" stopColor={lightColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Base Lines Removed as per request */}

        {/* Animated Glowing Lines */}
        {/* Animated Glowing Lines - Layer 1 (Outer Glow) */}
        <g
          stroke="url(#line-gradient)"
          fill="none"
          strokeWidth="3"
          opacity="0.4"
          filter="url(#glow-filter)"
          strokeLinecap="round"
          mask="url(#fade-mask)"
        >
          <path d="M 31 0 v 25 q 0 5 5 5 h 59 q 5 0 5 5 v 35" strokeDasharray="100" strokeDashoffset="100">
            <animate
              attributeName="stroke-dashoffset"
              from="100"
              to="-100"
              dur="3s"
              repeatCount="indefinite"
              begin="0s"
            />
          </path>
          <path d="M 77 0 v 20 q 0 5 5 5 h 13 q 5 0 5 5 v 35" strokeDasharray="60" strokeDashoffset="60">
            <animate
              attributeName="stroke-dashoffset"
              from="60"
              to="-60"
              dur="2.5s"
              repeatCount="indefinite"
              begin="0.5s"
            />
          </path>
          <path d="M 124 0 v 20 q 0 5 -5 5 h -14 q -5 0 -5 5 v 35" strokeDasharray="60" strokeDashoffset="60">
            <animate
              attributeName="stroke-dashoffset"
              from="60"
              to="-60"
              dur="2.5s"
              repeatCount="indefinite"
              begin="1s"
            />
          </path>
          <path d="M 170 0 v 25 q 0 5 -5 5 h -60 q -5 0 -5 5 v 35" strokeDasharray="100" strokeDashoffset="100">
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

        {/* Animated Glowing Lines - Layer 2 (Core Brightness) */}
        <g
          stroke="url(#line-gradient)"
          fill="none"
          strokeWidth="1.5"
          filter="url(#glow-filter)"
          strokeLinecap="round"
          mask="url(#fade-mask)"
        >
          <path d="M 31 0 v 25 q 0 5 5 5 h 59 q 5 0 5 5 v 35" strokeDasharray="100" strokeDashoffset="100">
            <animate
              attributeName="stroke-dashoffset"
              from="100"
              to="-100"
              dur="3s"
              repeatCount="indefinite"
              begin="0s"
            />
          </path>
          <path d="M 77 0 v 20 q 0 5 5 5 h 13 q 5 0 5 5 v 35" strokeDasharray="60" strokeDashoffset="60">
            <animate
              attributeName="stroke-dashoffset"
              from="60"
              to="-60"
              dur="2.5s"
              repeatCount="indefinite"
              begin="0.5s"
            />
          </path>
          <path d="M 124 0 v 20 q 0 5 -5 5 h -14 q -5 0 -5 5 v 35" strokeDasharray="60" strokeDashoffset="60">
            <animate
              attributeName="stroke-dashoffset"
              from="60"
              to="-60"
              dur="2.5s"
              repeatCount="indefinite"
              begin="1s"
            />
          </path>
          <path d="M 170 0 v 25 q 0 5 -5 5 h -60 q -5 0 -5 5 v 35" strokeDasharray="100" strokeDashoffset="100">
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
              <DatabaseIcon x="18" y="7.5" color="white" />
              <text x="28" y="12" fill="white" fontSize="5" fontWeight="500">
                {badgeTexts?.first || "GET"}
              </text>
            </g>
            {/* Second Button (CRM) */}
            <g>
              <rect fill="#111" stroke="#333" strokeWidth="0.5" x="60" y="5" width="34" height="10" rx="5" />
              <DatabaseIcon x="64" y="7.5" color="white" />
              <text x="74" y="12" fill="white" fontSize="5" fontWeight="500">
                {badgeTexts?.second || "POST"}
              </text>
            </g>
            {/* Third Button (HRM) */}
            <g>
              <rect fill="#111" stroke="#333" strokeWidth="0.5" x="108" y="5" width="34" height="10" rx="5" />
              <DatabaseIcon x="112" y="7.5" color="white" />
              <text x="122" y="12" fill="white" fontSize="5" fontWeight="500">
                {badgeTexts?.third || "PUT"}
              </text>
            </g>
            {/* Fourth Button (Inventory) */}
            <g>
              <rect fill="#111" stroke="#333" strokeWidth="0.5" x="150" y="5" width="40" height="10" rx="5" />
              <DatabaseIcon x="154" y="7.5" color="white" />
              <text x="165" y="12" fill="white" fontSize="5" fontWeight="500">
                {badgeTexts?.fourth || "DELETE"}
              </text>
            </g>
          </g>
        )}
      </svg>

      {/* Main Box Area Removed as per request to have only lines */}
    </div>
  );
};

export default WhatWeDeliverLines;

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
