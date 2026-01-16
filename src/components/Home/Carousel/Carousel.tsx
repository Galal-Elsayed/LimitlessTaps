"use client";

import { useTranslations } from "next-intl";
import Lottie from "lottie-react";
import bugsAnimation from "@/../public/Home/Carousel/techny-finding-bugs-in-the-code.json";
import tradingAnimation from "@/../public/Home/Carousel/techny-stock-trading-online-on-stock-market.json";

export default function Carousel2() {
    const t = useTranslations("home");

    const cards = [
        {
            header: t("web_dev_header"),
            desc: t("web_dev_desc"),
            type: "video" as const,
            src: "/Home/Carousel/3d-techny-lettering-css-and-laptop-with-program-code-text.mp4",
        },
        {
            header: t("mobile_apps_header"),
            desc: t("mobile_apps_desc"),
            type: "video" as const,
            src: "/Home/Carousel/devops-software-development-and-framework.mp4",
        },
        {
            header: t("software_solutions_header"),
            desc: t("software_solutions_desc"),
            type: "lottie" as const,
            animationData: tradingAnimation,
        },
        {
            header: t("design_maintenance_header"),
            desc: t("design_maintenance_desc"),
            type: "lottie" as const,
            animationData: bugsAnimation,
        },
    ];

    return (
        <section className="w-full bg-transparent pt-20 pb-20 overflow-hidden relative">
            <div className="px-4 md:px-8 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {cards.map((card, idx) => (
                        <div
                            key={idx}
                            className="rounded-2xl border border-white/10 hover:border-white/20 transition-colors bg-transparent overflow-hidden"
                        >
                            {/* Media */}
                            <div className="relative w-full aspect-[9/16] md:aspect-[4/5] flex items-center justify-center">
                                {card.type === "video" ? (
                                    <video
                                        src={card.src}
                                        className="w-full h-full object-cover"
                                        muted
                                        autoPlay
                                        loop
                                        playsInline
                                        controlsList="nodownload"
                                    />
                                ) : (
                                    <Lottie
                                        animationData={card.animationData}
                                        loop
                                        autoplay
                                        style={{ width: '100%', height: '100%' }}
                                        rendererSettings={{
                                            preserveAspectRatio: 'xMidYMid slice',
                                            progressiveLoad: true,
                                        }}
                                    />
                                )}
                            </div>

                            {/* Text */}
                            <div className="p-6 md:p-8">
                                <h3 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "#F1F5F9" }}>
                                    {card.header}
                                </h3>
                                <p className="mt-4 text-lg md:text-xl leading-relaxed font-medium" style={{ color: "#86868B" }}>
                                    {card.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
