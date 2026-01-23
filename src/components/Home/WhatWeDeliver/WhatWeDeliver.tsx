"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import WhatWeDeliverLines from "./WhatWeDeliverLines";
import LaunchSupportCard from "./LaunchSupportCard";
import { GlowingEffect } from "@/components/ui/glowing-effect";

// --- SHAPES (Copied from SoftwareCards) ---

const EnterpriseShape = () => (
  <div className="absolute top-0 right-0 p-8 opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
    <div className="grid grid-cols-3 gap-2 w-48 rotate-[-12deg]">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="w-12 h-12 border border-white/10 bg-white/5 rounded-lg backdrop-blur-sm" />
      ))}
      <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] to-transparent" />
    </div>
  </div>
);

const CloudShape = () => (
  <div className="absolute -right-12 -top-12 opacity-50 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none">
    <div className="relative w-80 h-80">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 border border-white/20 rounded-[50%] transform rotate-12" />
      <div className="absolute top-12 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 border border-white/10 rounded-[50%] transform -rotate-12" />
      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/50 rounded-full animate-ping" />
    </div>
  </div>
);

const ApiShape = () => (
  <div className="absolute right-8 bottom-8 opacity-50 group-hover:opacity-90 transition-all duration-500 pointer-events-none">
    <div className="flex gap-4 items-center">
      <div className="w-16 h-16 border-2 border-white/20 rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-white/50 rounded-full" />
      </div>
      <div className="w-24 h-0.5 bg-gradient-to-r from-white/20 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 w-1/2 h-full bg-white/50 animate-[shimmer_2s_infinite]" />
      </div>
      <div className="w-16 h-16 border-2 border-white/20 rounded-lg transform rotate-45" />
    </div>
  </div>
);

const WebDesignShape = () => (
  <div className="absolute inset-x-0 bottom-0 h-40 opacity-30 group-hover:opacity-60 transition-opacity duration-1000 pointer-events-none overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/20 rounded-full border-dashed animate-[spin_10s_linear_infinite]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/10 rounded-full animate-pulse" />
  </div>
);

const SERVICES = [
  {
    title: "Web Development",
    description:
      "Building robust, scalable high-performance web applications with cutting-edge technologies to drive your business forward.",
    colSpan: "lg:col-span-6",
    shape: <ApiShape />,
  },
  {
    title: "Mobile Applications",
    description:
      "Creating seamless, native and cross-platform mobile experiences for iOS and Android that engage users on the go.",
    colSpan: "lg:col-span-6",
    shape: <CloudShape />,
  },
  {
    title: "Software Solution",
    description:
      "Delivering custom enterprise software tailored to your specific business needs, optimizing operations and enabling growth.",
    colSpan: "lg:col-span-6",
    shape: <EnterpriseShape />,
  },
  {
    title: "Web Design and Wordpress",
    description:
      "Crafting visually stunning, user-centric websites and robust Wordpress solutions that capture your brand identity perfectly.",
    colSpan: "lg:col-span-6",
    shape: <WebDesignShape />,
  },
];

export default function WhatWeDeliver() {
  const t = useTranslations("home");

  return (
    <section className="w-full bg-[#0a0a0a] pt-10 pb-20 overflow-hidden relative">
      {" "}
      {/* pt-10 to give slight breath but close to hero */}
      {/* 1. Data Component (Modified to have no badge texts) */}
      {/* 1. Visualization (Restored DatabaseWithRestApi with clean mode) */}
      <div className="w-full flex items-center justify-center relative z-10 -mb-28 mt-4 md:-mb-32">
        <WhatWeDeliverLines
          className="scale-110 origin-top md:scale-125 md:origin-center max-w-none w-auto h-[400px]"
          hideBadges={true}
        />
      </div>
      <div className="px-4 md:px-8 max-w-7xl mx-auto relative z-20 -mt-24">
        <div className="absolute -top-40 left-4 md:left-8 z-20 max-w-xl text-left">
          <h2 className="text-3xl font-bold tracking-tight font-app md:text-5xl">WHAT WE DELIVER</h2>
          <p className="mt-4 text-base md:text-lg">
            Modern solutions that work everywhere, load fast, and solve real problems using clean architecture, and
            future-ready design.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: 2x2 Service Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              {SERVICES.map((service, index) => (
                <GridItem
                  key={index}
                  area="" // No specific cols needed here as parent grid handles it
                  title={service.title}
                  description={service.description}
                  shape={service.shape}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Launch Support Card */}
          <div className="lg:col-span-4 h-full">
            <div className="h-full">
              <LaunchSupportCard className="h-full" />
            </div>
          </div>
        </div>
      </div>
      {/* Gradient Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-[#0a0a0a] pointer-events-none z-10" />
    </section>
  );
}

// --- Grid Item Component (Adapted from SeoCards) ---

interface GridItemProps {
  area: string;
  title: string;
  description: string;
  shape: React.ReactNode;
}

const GridItem = ({ area, title, description, shape }: GridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
      <div className="relative h-full rounded-2xl border border-white/10 bg-black/20 p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          variant="default"
        />

        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl bg-black/40 border border-white/5 p-6 md:p-8 shadow-xl backdrop-blur-sm transition-colors hover:bg-black/60 group">
          {/* Abstract Shape Background */}
          {shape}

          <div className="relative flex flex-1 flex-col justify-between gap-3 z-10">
            <div className="space-y-4">
              <h3 className="font-sans text-2xl md:text-3xl font-bold tracking-tighter text-white leading-none">
                {title}
              </h3>
              <p className="font-sans text-sm text-neutral-400 md:text-base leading-relaxed max-w-2xl">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
