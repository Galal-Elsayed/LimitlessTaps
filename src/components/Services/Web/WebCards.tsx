"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";

// --- SHAPES ---

// --- SHAPES ---

const StaticShape = () => (
    <div className="absolute top-0 right-0 p-8 opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="relative w-64 h-64 rotate-12">
            <div className="absolute inset-0 border-t-2 border-r-2 border-white/20 rounded-tr-[5rem]" />
            <div className="absolute inset-8 border-t-2 border-r-2 border-white/10 rounded-tr-[3rem]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-2 bg-gradient-to-r from-transparent to-white/50 blur-sm animate-pulse" />
        </div>
    </div>
);

const SaaSShape = () => (
    <div className="absolute -right-8 -top-8 opacity-50 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none">
        <div className="relative w-80 h-80">
            <div className="absolute top-16 right-16 w-48 h-48 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md transform rotate-6 group-hover:rotate-12 transition-transform duration-700" />
            <div className="absolute top-8 right-8 w-48 h-48 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md transform -rotate-3 group-hover:-rotate-6 transition-transform duration-700" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md z-10" />
        </div>
    </div>
);

const EcommerceShape = () => (
    <div className="absolute right-0 bottom-0 opacity-50 group-hover:opacity-90 transition-all duration-500 pointer-events-none">
        <div className="relative w-56 h-72 border-l border-t border-white/10 rounded-tl-[3rem] p-8">
            <div className="w-16 h-16 rounded-full border border-white/20 mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 animate-ping" />
            </div>
            <div className="w-32 h-4 bg-white/10 rounded-full mb-4" />
            <div className="w-20 h-4 bg-white/10 rounded-full" />
        </div>
    </div>
);

const CMSShape = () => (
    <div className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-90 transition-all duration-500 pointer-events-none scale-150">
        <div className="grid grid-cols-2 gap-4 transform -skew-y-12">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-xl" />
            <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-xl animate-pulse" />
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-xl" />
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-xl" />
        </div>
    </div>
);

const PWAShape = () => (
    <div className="absolute inset-0 w-full h-full overflow-hidden opacity-30 group-hover:opacity-60 transition-opacity duration-1000 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        {/* Animated Grid */}
        <div className="absolute inset-0"
            style={{
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
                maskImage: 'linear-gradient(to bottom, transparent, black, transparent)'
            }}
        />
        {/* Floating Icons/Nodes */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/40 rounded-full animate-bounce delay-75" />
        <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-white/30 rounded-full animate-ping delay-300" />
        <div className="absolute top-1/2 right-20 w-48 h-64 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm -rotate-12 group-hover:-rotate-0 transition-transform duration-700" />
        <div className="absolute bottom-20 left-32 w-80 h-48 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm rotate-6 group-hover:rotate-0 transition-transform duration-700" />
    </div>
);

// --- DATA ---

const WEB_SERVICES = [
    {
        title: "High-Performance Static Websites",
        description: "We engineer blazing-fast, SEO-optimized static websites using Next.js and React. Our architecture ensures near-instant load times, superior search engine ranking, and a flawless user experience for marketing pages, portfolios, and blogs.",
        colSpan: "lg:col-span-4",
        shape: <StaticShape />,
    },
    {
        title: "Scalable SaaS Platforms",
        description: "From MVP to enterprise scale, we build robust Software-as-a-Service applications. Featuring multi-tenant architecture, secure authentication, real-time data processing, and seamless third-party integrations, our platforms are designed to grow with your business.",
        colSpan: "lg:col-span-8",
        shape: <SaaSShape />,
    },
    {
        title: "Custom E-commerce Solutions",
        description: "Drive conversions with bespoke e-commerce experiences. Whether it's a headless Shopify build or a completely custom storefront, we create seamless, high-converting shopping journeys that truly reflect your brand identity and maximize sales.",
        colSpan: "lg:col-span-6",
        shape: <EcommerceShape />,
    },
    {
        title: "Headless CMS & Dynamic Content",
        description: "Empower your team with flexible content management using Sanity, Contentful, or Strapi. We decouple the frontend to give you ultimate creative freedom, lightning-fast performance, and an intuitive editing experience without technical bottlenecks.",
        colSpan: "lg:col-span-6",
        shape: <CMSShape />,
    },
    {
        title: "Progressive Web Apps (PWA)",
        description: "Bridge the gap between web and mobile. Our Progressive Web Apps deliver native-app-like experiences—offline capabilities, push notifications, and home screen installation—ensuring engagement anytime, anywhere, on any device.",
        colSpan: "lg:col-span-12",
        shape: <PWAShape />,
    },
];

export default function WebCards() {
    return (
        <section className="w-full py-24 px-4 md:px-8 bg-[#0a0a0a] relative overflow-hidden">
            {/* SEO Hidden Header Structure */}
            <div className="sr-only">
                <h2>Comprehensive Web Development Services</h2>
                <ul>
                    <li>Custom Website Development</li>
                    <li>SaaS Application Building</li>
                    <li>E-commerce Store Development</li>
                    <li>CMS Integration</li>
                </ul>
            </div>

            <div className="max-w-7xl mx-auto">
                <ul className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {WEB_SERVICES.map((service, index) => (
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
