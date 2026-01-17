"use client";

import React, { useLayoutEffect, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { GlowingHeader } from "@/components/ui/GlowingHeader";
import Laptop3D from "./ReusableComponents/Laptop3D";
import SamsungPhone3D from "./ReusableComponents/SamsungPhone3D";
import Monitor3D from "./ReusableComponents/Monitor3D";

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
    title: string;
    description: string;
    image: string; // Used for fallback items (index > 1)
    accentColor: string;
    underlineColor: string;
}

const EXPERIENCES: ServiceItem[] = [
    {
        title: "Web experiences",
        description:
            "First-class immersive experience websites that help your business to achieve sustained, long-term success.",
        image: "/assets/poppr/Laptop.jpg",
        accentColor: "text-blue-400",
        underlineColor: "bg-blue-400",
    },
    {
        title: "Mobile Applications",
        description:
            "We build high-performance native and cross-platform apps using React Native, Flutter, and Swift/Kotlin. Scalable, secure, and intuitive solutions tailored to your needs.",
        image: "/assets/poppr/AR_phone.jpg", // Not used, 3D model is rendered instead
        accentColor: "text-orange-400",
        underlineColor: "bg-orange-400",
    },
    {
        title: "Web Design & Templates",
        description:
            "Stunning, responsive designs and premium templates tailored to elevate your brand's digital presence.",
        image: "/assets/poppr/VR.jpg",
        accentColor: "text-cyan-400",
        underlineColor: "bg-cyan-400",
    },
    {
        title: "Mobile experiences",
        description:
            "Interactive AR experiences that combine 3D content, photos and video - including data tracking, analytics and calls to action.",
        image: "/Services/Illustrations/develop.mp4",
        accentColor: "text-purple-400",
        underlineColor: "bg-purple-400",
    },
];

export default function ServicesDesc() {
    const containerRef = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(".service-row").forEach((row) => {
                const imgContainer = row.querySelector(".img-container");

                if (imgContainer) {
                    gsap.fromTo(
                        imgContainer,
                        { y: 40 },
                        {
                            y: -40,
                            ease: "none",
                            scrollTrigger: {
                                trigger: row,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true,
                            },
                        }
                    );
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full relative z-10 bg-[#0a0a0a] overflow-hidden"
        >

            <section className="w-full text-white py-24 px-4 md:px-12 lg:px-24 relative z-10">
                <div className="max-w-[1500px] mx-auto flex flex-col items-center">
                    <div className="mb-48 text-center w-full">
                        <GlowingHeader textSize="text-3xl md:text-4xl lg:text-8xl">
                            IMERSIVE
                            <br />
                            EXPERIENCES
                        </GlowingHeader>
                    </div>
                    <div className="flex flex-col gap-48 w-full">
                        {EXPERIENCES.map((item, index) => (
                            <ServiceRowItem key={index} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

function ServiceRowItem({ item, index }: { item: ServiceItem; index: number }) {
    const rowRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (rowRef.current && glowRef.current) {
                gsap.fromTo(
                    glowRef.current,
                    { opacity: 0, scale: 0.8 },
                    {
                        opacity: 1,
                        scale: 1.2,
                        duration: 0.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: rowRef.current,
                            start: "top center+=10%", // Trigger when top of element hits center of viewport
                            end: "bottom center-=10%", // End when bottom hits center
                            toggleActions: "play reverse play reverse", // Fade in/out
                        },
                    }
                );
            }
        }, rowRef);
        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={rowRef}
            className={cn(
                "service-row relative flex items-center gap-8 md:gap-16 w-full md:w-[60%] lg:w-[50%]",
                index % 2 === 0 ? "self-start" : "self-end"
            )}
        >
            {/* Scroll-Triggered Glow Background */}
            <div
                ref={glowRef}
                className="absolute inset-0 pointer-events-none rounded-full bg-white/20 blur-[100px] z-0 mix-blend-screen opacity-0"
                style={{ transform: "scale(0.8)" }}
            />

            {/* Image/3D Model Side */}
            <div className="relative shrink-0 w-[150px] h-[150px] md:w-[220px] md:h-[220px] flex items-center justify-center overflow-visible z-10">
                <div className="img-container relative w-full h-full flex items-center justify-center overflow-visible">
                    {index === 0 ? (
                        <div className="absolute w-[200%] h-[200%] md:w-[280%] md:h-[250%] top-1/2 left-[50%] md:left-full -translate-x-[85%] -translate-y-[60%] z-10">
                            <Laptop3D />
                        </div>
                    ) : index === 1 ? (
                        <div className="absolute w-[200%] h-[200%] md:w-[200%] md:h-[180%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            <SamsungPhone3D />
                        </div>
                    ) : index === 2 ? (
                        <div className="absolute w-[200%] h-[200%] md:w-[250%] md:h-[220%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            <Monitor3D />
                        </div>
                    ) : item.image.endsWith(".mp4") ? (
                        <video
                            src={item.image}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-contain mix-blend-lighten transform scale-125 pointer-events-none"
                        />
                    ) : (
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-contain"
                        />
                    )}
                </div>
            </div>

            {/* Text Side */}
            <div className="service-text flex-1 space-y-6 z-10">
                <div className="service-text-content transition-all duration-500 text-gray-400">
                    <h3
                        className={cn(
                            "text-3xl md:text-5xl font-bold mb-4 transition-colors duration-300",
                            item.accentColor
                        )}
                    >
                        {item.title}
                    </h3>
                    <p className="text-xl md:text-2xl leading-relaxed">
                        {item.description}
                    </p>
                </div>
                <button className="group flex items-center gap-2 text-lg font-medium text-white pt-2 relative">
                    <span className="relative py-1">
                        Continue reading
                        <span
                            className={cn(
                                "absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full",
                                item.underlineColor
                            )}
                        />
                    </span>
                </button>
            </div>
        </div>
    );
}
