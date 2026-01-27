"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import WhatWeDeliverLines from "./WhatWeDeliverLines";
import LaunchSupportCard from "./LaunchSupportCard";
import { GlowingEffect } from "@/components/ui/glowing-effect";

// --- SHAPES ---

const EnterpriseShape = () => (
  <div className="absolute top-0 right-0 p-8 opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
    <div className="grid grid-cols-3 gap-2 w-48 rotate-[-12deg]">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="w-12 h-12 border border-white/20 bg-white/5 rounded-lg backdrop-blur-sm" />
      ))}
      <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] to-transparent" />
    </div>
  </div>
);

const CloudShape = () => (
  <div className="absolute -right-12 -top-12 opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
    <div className="relative w-80 h-80">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 border border-white/30 rounded-[50%] transform rotate-12" />
      <div className="absolute top-12 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 border border-white/20 rounded-[50%] transform -rotate-12" />
      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/80 rounded-full animate-ping" />
    </div>
  </div>
);

const ApiShape = () => (
  <div className="absolute right-8 bottom-8 opacity-80 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
    <div className="flex gap-4 items-center">
      <div className="w-16 h-16 border-2 border-white/40 rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-white/80 rounded-full" />
      </div>
      <div className="w-24 h-0.5 bg-gradient-to-r from-white/40 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 w-1/2 h-full bg-white/80 animate-[shimmer_2s_infinite]" />
      </div>
      <div className="w-16 h-16 border-2 border-white/40 rounded-lg transform rotate-45" />
    </div>
  </div>
);

const WebDesignShape = () => (
  <div className="absolute inset-x-0 bottom-0 h-40 opacity-80 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/40 rounded-full border-dashed animate-[spin_10s_linear_infinite]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/20 rounded-full animate-pulse" />
  </div>
);

const CmsShape = () => (
  <div className="absolute inset-x-0 bottom-0 h-40 opacity-80 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/30 rotate-45 animate-[spin_15s_linear_infinite]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/40 rounded-full animate-pulse" />
  </div>
);

const SERVICES = [
  {
    title: "Web Development",
    description: "Building robust, scalable high-performance web applications with cutting-edge technologies.",
    shape: <ApiShape />,
    href: "/services/web-development",
  },
  {
    title: "Mobile Applications",
    description: "Creating seamless, native and cross-platform mobile experiences for iOS and Android.",
    shape: <CloudShape />,
    href: "/services/mobile-applications",
  },
  {
    title: "Software Solutions",
    description: "Delivering custom enterprise software tailored to your specific business needs.",
    shape: <EnterpriseShape />,
    href: "/services/software-solutions",
  },
  {
    title: "Web Design",
    description: "Crafting visually stunning, user-centric websites that capture your brand identity perfectly.",
    shape: <WebDesignShape />,
    href: "/services/web-design",
  },
  {
    title: "Wordpress and CMS",
    description: "Robust content management solutions designed for ease of use and flexibility.",
    shape: <CmsShape />,
    href: "/services/wordpress-cms",
  },
];

// Dark Purple Plasma Gradient
const PURPLE_GRADIENT = `radial-gradient(circle, #8b5cf6 10%, #8b5cf600 20%),
radial-gradient(circle at 40% 40%, #7c3aed 5%, #7c3aed00 15%),
radial-gradient(circle at 60% 60%, #6d28d9 10%, #6d28d900 20%), 
radial-gradient(circle at 40% 60%, #5b21b6 10%, #5b21b600 20%),
repeating-conic-gradient(
  from 236.84deg at 50% 50%,
  #8b5cf6 0%,
  #7c3aed calc(25% / var(--repeating-conic-gradient-times)),
  #6d28d9 calc(50% / var(--repeating-conic-gradient-times)), 
  #5b21b6 calc(75% / var(--repeating-conic-gradient-times)),
  #8b5cf6 calc(100% / var(--repeating-conic-gradient-times))
)`;

export default function WhatWeDeliver() {
  return (
    <section className="w-full bg-[#0a0a0a] pt-10 pb-20 overflow-hidden relative">
      <div className="w-full flex items-center justify-center relative z-10 -mb-28 mt-4 md:-mb-32">
        <WhatWeDeliverLines
          className="scale-110 origin-top md:scale-125 md:origin-center max-w-none w-auto h-[400px]"
          hideBadges={true}
        />
      </div>
      <div className="px-4 md:px-8 max-w-[100rem] mx-auto relative z-20 -mt-24">
        <div className="absolute -top-40 left-4 md:left-8 z-20 max-w-xl text-left">
          <h2 className="text-3xl font-bold tracking-tight font-app md:text-5xl">WHAT WE DELIVER</h2>
          <p className="mt-4 text-base md:text-lg">
            Modern solutions that work everywhere, load fast, and solve real problems using clean architecture, and
            future-ready design.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[repeat(24,minmax(0,1fr))] gap-6 relative z-30">
          {/* Services Column */}
          <div className="xl:col-span-17">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 h-full">
              {SERVICES.map((service, index) => (
                <GridItem
                  key={index}
                  area={index < 2 ? "md:col-span-3" : "md:col-span-2"}
                  title={service.title}
                  description={service.description}
                  shape={service.shape}
                  href={service.href}
                />
              ))}
            </div>
          </div>

          {/* Launch Support Column */}
          <div className="xl:col-span-7 h-full">
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

// --- Grid Item Component ---

interface GridItemProps {
  area: string;
  title: string;
  description: string;
  shape: React.ReactNode;
  href: string;
}

const GridItem = ({ area, title, description, shape, href }: GridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
      <Link href={href} className="block h-full">
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
            gradient={PURPLE_GRADIENT}
          />

          <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl bg-black/40 border border-white/5 p-6 md:p-8 shadow-xl backdrop-blur-sm transition-colors hover:bg-black/60 group">
            {/* Abstract Shape Background */}
            {shape}

            <div className="relative flex flex-1 flex-col justify-between gap-3 z-10">
              <div className="space-y-4">
                <h3 className="font-sans text-2xl md:text-3xl font-bold tracking-tighter text-white leading-none">
                  {title}
                </h3>
                <p className="font-sans text-sm text-neutral-400 md:text-base leading-relaxed max-w-2xl">
                  {description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-white/50 group-hover:text-white transition-colors mt-auto pt-4">
                <span className="text-sm font-medium">Learn more</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
