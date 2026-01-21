"use client";

import React from "react";
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

const MOBILE_SERVICES = [
    {
        title: "iOS Development",
        description: "Native iOS applications built with Swift and SwiftUI. We deliver seamless performance, polished animations, and full adherence to Apple's Human Interface Guidelines, ensuring your app feels right at home on every iPhone and iPad.",
        colSpan: "lg:col-span-4",
        shape: <IOSShape />,
    },
    {
        title: "Android Development",
        description: "Robust Android apps using Kotlin and Jetpack Compose. We cover the fragmented Android ecosystem with adaptive layouts and material design, guaranteeing a consistent and high-quality experience across thousands of device variations.",
        colSpan: "lg:col-span-8",
        shape: <AndroidShape />,
    },
    {
        title: "Cross-Platform Solutions",
        description: "Efficient multi-platform development using React Native or Flutter. Write once, deploy everywhere without compromising on native-like performance. Ideal for startups looking to capture both markets simultaneously with a unified codebase.",
        colSpan: "lg:col-span-6",
        shape: <CrossPlatformShape />,
    },
    {
        title: "AR & Emerging Tech",
        description: "Next-gen mobile experiences leveraging ARKit and ARCore. From immersive retail previews to interactive educational tools, we push the boundaries of what mobile devices can do, creating memorable and practical augmented reality applications.",
        colSpan: "lg:col-span-6",
        shape: <ARShape />,
    },
    {
        title: "Wearable & IoT Solutions",
        description: "Extending your digital presence to wrists and connected devices. We develop companion apps for WatchOS and WearOS, as well as complex IoT controllers that bridge the physical and digital worlds seamlessly.",
        colSpan: "lg:col-span-12",
        shape: <WearableShape />,
    },
];

export function MobileCards() {
    return (
        <SeoCards
            items={MOBILE_SERVICES}
            seoHeader="Expert Mobile App Development Services"
            seoList={[
                "Native iOS Application Development",
                "Android App Development",
                "Cross-Platform React Native & Flutter",
                "Augmented Reality Mobile Apps",
                "Wearable & IoT App Development"
            ]}
        />
    );
}

// Default export if needed for dynamic imports or page structure
export default MobileCards;
