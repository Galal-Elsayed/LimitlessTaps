"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import SeoCards from "../ReusableComponents/SeoCards";

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

export default function WebCards() {
    const t = useTranslations('webDevelopment.web_cards');

    const WEB_SERVICES = [
        {
            title: t('cards.high_performance.title'),
            description: t('cards.high_performance.description'),
            colSpan: "lg:col-span-4",
            shape: <StaticShape />,
        },
        {
            title: t('cards.saas.title'),
            description: t('cards.saas.description'),
            colSpan: "lg:col-span-8",
            shape: <SaaSShape />,
        },
        {
            title: t('cards.ecommerce.title'),
            description: t('cards.ecommerce.description'),
            colSpan: "lg:col-span-6",
            shape: <EcommerceShape />,
        },
        {
            title: t('cards.cms.title'),
            description: t('cards.cms.description'),
            colSpan: "lg:col-span-6",
            shape: <CMSShape />,
        },
        {
            title: t('cards.pwa.title'),
            description: t('cards.pwa.description'),
            colSpan: "lg:col-span-12",
            shape: <PWAShape />,
        },
    ];

    return (
        <SeoCards
            items={WEB_SERVICES}
            seoHeader={t('seo_header')}
            seoList={[
                t('seo_list.item1'),
                t('seo_list.item2'),
                t('seo_list.item3'),
                t('seo_list.item4')
            ]}
            gradientBottom={false}
        />
    );
}
