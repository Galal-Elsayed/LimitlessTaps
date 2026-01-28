"use client";

import React from "react";
import SeoCards from "../ReusableComponents/SeoCards";
import { useTranslations } from "next-intl";

// --- SHAPES ---

const UIShape = () => (
    <div className="absolute top-0 right-0 p-8 opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="relative w-64 h-64 rotate-6">
            <div className="absolute top-0 right-0 w-48 h-32 bg-white/5 border border-white/20 rounded-xl backdrop-blur-md" />
            <div className="absolute top-16 right-16 w-48 h-32 bg-white/5 border border-white/20 rounded-xl backdrop-blur-md transform -rotate-3" />
            <div className="absolute top-8 right-8 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl" />
        </div>
    </div>
);

const BrandingShape = () => (
    <div className="absolute -right-4 -bottom-4 opacity-50 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none">
        <div className="relative w-72 h-72">
            <div className="absolute bottom-16 right-16 w-32 h-32 border-2 border-white/10 rounded-full" />
            <div className="absolute bottom-16 right-16 w-32 h-32 border-2 border-white/10 rounded-full transform translate-x-12" />
            <div className="absolute bottom-8 right-8 w-4 h-4 bg-white/40 rounded-full animate-bounce" />
        </div>
    </div>
);

const UXShape = () => (
    <div className="absolute right-0 top-1/4 opacity-50 group-hover:opacity-90 transition-all duration-500 pointer-events-none">
        <div className="relative w-64 h-64 transform skew-y-12">
            <div className="absolute w-full h-1 bg-white/10 top-1/4" />
            <div className="absolute w-full h-1 bg-white/10 top-2/4" />
            <div className="absolute w-full h-1 bg-white/10 top-3/4" />
            <div className="absolute left-1/4 top-0 w-1 h-full bg-white/10" />
            <div className="absolute left-3/4 top-0 w-1 h-full bg-white/10" />
            <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-white/30 rounded-full animate-ping" />
        </div>
    </div>
);

const PrototypeShape = () => (
    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity duration-1000 pointer-events-none">
        <div className="w-56 h-40 border border-dashed border-white/20 rounded-lg transform -rotate-6" />
        <div className="absolute w-56 h-40 border border-white/10 rounded-lg transform rotate-3 bg-white/5 backdrop-blur-sm flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border border-white/20 animate-spin" />
        </div>
    </div>
);

const MotionShape = () => (
    <div className="absolute right-4 top-4 opacity-50 group-hover:opacity-90 transition-all duration-500 pointer-events-none">
        <div className="relative w-64 h-32">
            <div className="absolute top-0 right-0 w-8 h-8 bg-white/20 rounded-full animate-[bounce_1s_infinite]" />
            <div className="absolute top-0 right-12 w-8 h-8 bg-white/20 rounded-full animate-[bounce_1.2s_infinite]" />
            <div className="absolute top-0 right-24 w-8 h-8 bg-white/20 rounded-full animate-[bounce_1.4s_infinite]" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 rounded-full" />
        </div>
    </div>
);


export function DesignCards() {
    const t = useTranslations('WebDesign.cards');

    const DESIGN_SERVICES = [
        {
            title: t('items.ui.title'),
            description: t('items.ui.description'),
            colSpan: "lg:col-span-4",
            shape: <UIShape />,
        },
        {
            title: t('items.branding.title'),
            description: t('items.branding.description'),
            colSpan: "lg:col-span-8",
            shape: <BrandingShape />,
        },
        {
            title: t('items.ux.title'),
            description: t('items.ux.description'),
            colSpan: "lg:col-span-6",
            shape: <UXShape />,
        },
        {
            title: t('items.prototype.title'),
            description: t('items.prototype.description'),
            colSpan: "lg:col-span-6",
            shape: <PrototypeShape />,
        },
        {
            title: t('items.motion.title'),
            description: t('items.motion.description'),
            colSpan: "lg:col-span-12",
            shape: <MotionShape />,
        },
    ];

    return (
        <SeoCards
            items={DESIGN_SERVICES}
            seoHeader={t('seoHeader')}
            seoList={[
                t('seoList.item1'),
                t('seoList.item2'),
                t('seoList.item3'),
                t('seoList.item4'),
                t('seoList.item5')
            ]}
            gradientBottom={false}

        />
    );
}

export default DesignCards;
