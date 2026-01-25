"use client";

import React from "react";
import { useTranslations } from "next-intl";
import SeoCards from "../ReusableComponents/SeoCards";

// --- SHAPES ---

const IOSShape = () => (
    <div className="absolute top-0 right-0 p-8 opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="relative w-64 h-64 rotate-12">
            <div className="absolute inset-0 border-2 border-white/20 rounded-[3rem]" />
            <div className="absolute inset-4 border border-white/10 rounded-[2.5rem]" />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-6 bg-black/50 rounded-full border border-white/10 backdrop-blur-md" />
        </div>
    </div>
);

const AndroidShape = () => (
    <div className="absolute -left-8 -bottom-8 opacity-50 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none">
        <div className="relative w-72 h-72">
            <div className="absolute bottom-0 left-0 w-48 h-64 border border-white/10 bg-white/5 rounded-3xl backdrop-blur-md transform -rotate-12 group-hover:-rotate-6 transition-transform duration-700" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full animate-pulse" />
        </div>
    </div>
);

const CrossPlatformShape = () => (
    <div className="absolute right-0 top-0 opacity-50 group-hover:opacity-90 transition-all duration-500 pointer-events-none">
        <div className="relative w-64 h-64">
            <div className="absolute top-8 right-8 w-32 h-32 border border-white/20 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute top-16 right-16 w-32 h-32 border border-white/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute top-4 right-20 w-8 h-8 bg-white/10 rounded-full blur-sm" />
        </div>
    </div>
);

const ARShape = () => (
    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity duration-1000 pointer-events-none">
        <div className="w-64 h-64 border border-white/10 rounded-xl transform rotate-45 animate-pulse" />
        <div className="absolute w-48 h-48 border border-white/10 rounded-full animate-ping" />
    </div>
);

const WearableShape = () => (
    <div className="absolute bottom-8 right-8 opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="relative w-48 h-48">
            <div className="absolute inset-0 border-[3px] border-white/20 rounded-[2rem]" />
            <div className="absolute inset-2 border border-white/10 rounded-[1.8rem]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-md" />
        </div>
    </div>
);

export function MobileCards() {
    const t = useTranslations('mobileApplication.mobile_cards');

    const MOBILE_SERVICES = [
        {
            title: t('cards.ios.title'),
            description: t('cards.ios.description'),
            colSpan: "lg:col-span-4",
            shape: <IOSShape />,
        },
        {
            title: t('cards.android.title'),
            description: t('cards.android.description'),
            colSpan: "lg:col-span-8",
            shape: <AndroidShape />,
        },
        {
            title: t('cards.cross_platform.title'),
            description: t('cards.cross_platform.description'),
            colSpan: "lg:col-span-6",
            shape: <CrossPlatformShape />,
        },
        {
            title: t('cards.ar.title'),
            description: t('cards.ar.description'),
            colSpan: "lg:col-span-6",
            shape: <ARShape />,
        },
        {
            title: t('cards.wearable.title'),
            description: t('cards.wearable.description'),
            colSpan: "lg:col-span-12",
            shape: <WearableShape />,
        },
    ];

    return (
        <SeoCards
            items={MOBILE_SERVICES}
            seoHeader={t('seo_header')}
            seoList={[
                t('seo_list.item1'),
                t('seo_list.item2'),
                t('seo_list.item3'),
                t('seo_list.item4'),
                t('seo_list.item5')
            ]}
            gradientBottom={false}
        />
    );
}

// Default export if needed for dynamic imports or page structure
export default MobileCards;
