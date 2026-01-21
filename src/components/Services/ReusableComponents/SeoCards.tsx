"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export interface ServiceItem {
    title: string;
    description: string;
    colSpan: string;
    shape: React.ReactNode;
}

interface SeoCardsProps {
    items: ServiceItem[];
    seoHeader: string;
    seoList: string[];
    gradientBottom?: boolean;
}

export default function SeoCards({ items, seoHeader, seoList, gradientBottom = true }: SeoCardsProps) {
    return (
        <section className="w-full pt-24 pb-48 px-4 md:px-8 bg-[#0a0a0a] relative overflow-hidden">
            {/* SEO Hidden Header Structure */}
            <div className="sr-only">
                <h2>{seoHeader}</h2>
                <ul>
                    {seoList.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="max-w-7xl mx-auto">
                <ul className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {items.map((service, index) => (
                        <GridItem
                            key={index}
                            area={service.colSpan}
                            title={service.title}
                            description={service.description}
                            shape={service.shape}
                        />
                    ))}
                </ul>
            </div>

            {/* Gradient fade to black at the bottom */}
            {gradientBottom && (
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-black pointer-events-none z-20" />
            )}
        </section>
    );
}

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
                    variant="default" // Multi-color gradient
                />

                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl bg-black/40 border border-white/5 p-6 md:p-8 shadow-xl backdrop-blur-sm transition-colors hover:bg-black/60 group">

                    {/* Abstract Shape Background */}
                    {shape}

                    <div className="relative flex flex-1 flex-col justify-between gap-3 z-10">
                        <div className="space-y-4">
                            <h3 className="font-sans text-3xl md:text-5xl font-bold tracking-tighter text-white leading-none">
                                {title}
                            </h3>
                            <p className="font-sans text-sm text-neutral-400 md:text-base leading-relaxed max-w-2xl">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};
