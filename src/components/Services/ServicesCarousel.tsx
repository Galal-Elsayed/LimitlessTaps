"use client";

import React, { useState } from "react";
import Lottie from "lottie-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { motion } from "framer-motion";
import { GlowingHeader } from "@/components/ui/GlowingHeader";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";

interface ApproachItem {
    id: string;
    title: string;
    description: string;
    mediaUrl: string; // Can be .json (Lottie) or .mp4 (Video)
}

const APPROACH_ITEMS: ApproachItem[] = [
    {
        id: "plan",
        title: "PLAN",
        description: "WFN creates a plan that covers the project's scope, strategy, goals, deliverables, timeline and resources.",
        mediaUrl: "/Services/Illustrations/plan.json",
    },
    {
        id: "design",
        title: "DESIGN",
        description: "We design an intuitive interface that effectively communicates your brand's message and engages with the target audience.",
        mediaUrl: "/Services/Illustrations/design.json",
    },
    {
        id: "develop",
        title: "DEVELOP",
        description: "Our team builds a high-performing website by leveraging the latest development methods, tools, and technologies.",
        mediaUrl: "/Services/Illustrations/develop.mp4",
    },
    {
        id: "test",
        title: "TEST",
        description: "We test what we create thoroughly with methods such as functional, usability, performance testing, and more.",
        mediaUrl: "/Services/Illustrations/test.mp4",
    },
    {
        id: "support",
        title: "SUPPORT",
        description: "Our team provides ongoing technical assistance and troubleshooting to ensure that the platform remains functional, secure, and up-to-date.",
        mediaUrl: "/Services/Illustrations/support.mp4",
    },
    {
        id: "scale",
        title: "SCALE",
        description: "We help to create new strategies, expand reach, enhance functionality, and optimize performance based on your ongoing roadmap and goals.",
        mediaUrl: "/Services/Illustrations/scale.mp4",
    },
];

const SHAPES: Record<string, string> = {
    plan: "M50,5 C80,5 98,25 98,50 C98,75 80,95 50,95 C20,95 2,75 2,50 C2,25 20,5 50,5 Z",
    design: "M50,2 L60,15 L75,10 L80,25 L95,25 L90,40 L100,50 L90,60 L95,75 L80,75 L75,90 L60,85 L50,98 L40,85 L25,90 L20,75 L5,75 L10,60 L0,50 L10,40 L5,25 L20,25 L25,10 L40,15 Z",
    develop: "M20,5 L80,5 C90,5 98,15 98,50 C98,85 90,95 80,95 L20,95 C10,95 2,85 2,50 C2,15 10,5 20,5 Z",
    test: "M5,5 L95,5 L95,95 L5,95 Z",
    support: "M5,95 L95,95 L95,50 C95,20 75,5 50,5 C25,5 5,20 5,50 Z",
    scale: "M20,85 L80,85 C90,85 95,75 95,60 C95,45 85,35 75,35 C75,20 60,10 50,10 C40,10 25,20 25,35 C15,35 5,45 5,60 C5,75 10,85 20,85 Z",
};

export default function ServicesCarousel() {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);

    // Preload all media on component mount (before user scrolls down)
    React.useEffect(() => {
        APPROACH_ITEMS.forEach(item => {
            if (item.mediaUrl.endsWith(".json")) {
                // Prefetch Lottie JSON
                fetch(item.mediaUrl).catch(() => { });
            } else if (item.mediaUrl.endsWith(".mp4")) {
                // Preload video
                const video = document.createElement("video");
                video.src = item.mediaUrl;
                video.preload = "auto";
            }
        });
    }, []);

    return (
        <section
            className="w-full bg-[linear-gradient(180deg,#0a0a0a_0%,#000000_15%)] text-white py-32 overflow-hidden"
        >
            <div className="mx-auto">
                {/* Header */}
                <div className="mb-24 relative px-4 md:px-12 lg:px-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <GlowingHeader textSize="text-[12vw] md:text-[7vw] tracking-tighter leading-[.9]">
                        OUR <br />
                        <span className="flex items-center gap-4">
                            APPROACH
                        </span>
                    </GlowingHeader>

                    {/* Navigation Arrows (Right aligned) */}
                    <div className="flex items-center gap-4 relative z-20 pb-2">
                        <button
                            onClick={() => swiper?.slidePrev()}
                            className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white hover:bg-white/5 hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-sm group"
                            aria-label="Previous slide"
                        >
                            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <button
                            onClick={() => swiper?.slideNext()}
                            className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white hover:bg-white/5 hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-sm group"
                            aria-label="Next slide"
                        >
                            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Carousel */}
                <div className="w-full pl-[5vw] md:pl-[15vw] lg:pl-[25vw] cursor-grab active:cursor-grabbing">
                    <Swiper
                        onSwiper={setSwiper}
                        modules={[FreeMode]}
                        freeMode={true}
                        spaceBetween={120}
                        slidesPerView="auto"
                        className="w-full py-20 !overflow-visible"
                    >
                        {APPROACH_ITEMS.map((item, index) => (
                            <SwiperSlide key={item.id} className="!w-[300px] md:!w-[400px] lg:!w-[450px] !h-auto">
                                <ApproachCard item={item} index={index + 1} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

function ApproachCard({ item, index }: { item: ApproachItem; index: number }) {
    const [animationData, setAnimationData] = useState<any>(null);
    const [mediaLoaded, setMediaLoaded] = useState(false);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    const isLottie = item.mediaUrl.endsWith(".json");
    const isVideo = item.mediaUrl.endsWith(".mp4");

    // Preload Lottie JSON
    React.useEffect(() => {
        if (isLottie) {
            fetch(item.mediaUrl)
                .then(res => {
                    if (!res.ok) throw new Error("Failed to fetch");
                    return res.json();
                })
                .then(data => {
                    setAnimationData(data);
                    setMediaLoaded(true);
                })
                .catch(err => {
                    console.error("Failed to load lottie", err);
                    setMediaLoaded(true); // Show card even if failed
                });
        }
    }, [item.mediaUrl, isLottie]);

    // Handle video loaded state
    React.useEffect(() => {
        if (isVideo && videoRef.current) {
            const video = videoRef.current;
            if (video.readyState >= 3) {
                setMediaLoaded(true);
            }
        }
    }, [isVideo]);

    // Fallback path if not defined
    const dPath = SHAPES[item.id] || SHAPES.test;

    return (
        <div className="flex flex-col gap-8 group select-none w-full relative">

            {/* Drag Hint (Only for first item) */}
            {index === 1 && (
                <div className="absolute -left-32 md:-left-48 top-[40%] -translate-y-1/2 w-24 md:w-32 flex flex-col items-center gap-2 text-white/50 pointer-events-none z-20">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 animate-pulse">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                    </svg>
                    <div className="text-[10px] md:text-xs uppercase tracking-widest text-center font-medium opacity-70">
                        Drag <br /> to Explore
                    </div>
                    {/* Connector Line */}
                    <div className="absolute left-full top-1/2 w-8 md:w-12 h-[1px] bg-white/20">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-white/50 rounded-full"></div>
                    </div>
                </div>
            )}

            {/* Shape Container (Icon + Title) */}
            <div className="relative w-full aspect-square p-8 flex flex-col items-center justify-center bg-transparent transition-transform duration-500 group-hover:scale-[1.02]">

                {/* SVG Shape Border */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <svg
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        className="w-full h-full transition-all duration-500"
                    >
                        <path
                            d={dPath}
                            vectorEffect="non-scaling-stroke"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="text-white/20 group-hover:text-white transition-colors duration-500"
                        />
                    </svg>
                </div>

                {/* Content Container */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">

                    {/* Media Container */}
                    <div className="w-32 h-32 md:w-40 md:h-40 relative transition-all duration-500 mb-4 opacity-70 group-hover:opacity-100 flex items-center justify-center">
                        {/* Loading Spinner */}
                        {!mediaLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            </div>
                        )}

                        {/* Lottie Animation */}
                        {isLottie && animationData && (
                            <Lottie
                                animationData={animationData}
                                loop={true}
                                autoplay={true}
                                className="w-full h-full"
                            />
                        )}

                        {/* Video */}
                        {isVideo && (
                            <video
                                ref={videoRef}
                                src={item.mediaUrl}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="auto"
                                onCanPlay={() => setMediaLoaded(true)}
                                className={`w-full h-full object-contain transition-opacity duration-500 mix-blend-lighten ${mediaLoaded ? 'opacity-100' : 'opacity-0'}`}
                            />
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-wide text-white/40 group-hover:text-white transition-colors duration-300 text-center">
                        {item.title}
                    </h3>
                </div>
            </div>

            {/* Description (Below the shape) */}
            <div className="px-4">
                <p className="text-gray-500 text-sm md:text-base leading-relaxed text-center group-hover:text-gray-300 transition-colors duration-300">
                    {item.description}
                </p>
            </div>
        </div>
    )
}
