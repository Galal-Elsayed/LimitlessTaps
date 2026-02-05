"use client";

import React from "react";
import { SlidingLogoMarquee, SlidingLogoMarqueeItem } from "@/components/lightswind/sliding-logo-marquee";
import Image from "next/image";
import { motion } from "motion/react";
import { Header } from "@/components/ui/header";
import { useTranslations, useLocale } from "next-intl";

// Duplicate items to ensure infinite seamless scrolling
const sliderItems1: SlidingLogoMarqueeItem[] = [
    ...Array(5).fill([
        { id: "1", content: <Image src="/About/wordpress-svgrepo-com.svg" alt="WordPress" width={100} height={100} className="w-38 h-32 object-contain hover:scale-110 transition-transform duration-300" /> },
        { id: "2", content: <Image src="/About/woo.webp" alt="WooCommerce" width={100} height={100} className="w-38 h-38 object-contain hover:scale-110 transition-transform duration-300" /> },
        { id: "3", content: <Image src="/About/shopify-color-svgrepo-com.svg" alt="Shopify" width={100} height={100} className="w-38 h-32 object-contain hover:scale-110 transition-transform duration-300" /> },
        { id: "4", content: <Image src="/About/spring-boot.webp" alt="Spring Boot" width={100} height={100} className="w-38 h-38 object-contain hover:scale-110 transition-transform duration-300" /> },
    ]).flat().map((item, idx) => ({ ...item, id: `1-${idx}` }))
];

const sliderItems2: SlidingLogoMarqueeItem[] = [
    ...Array(5).fill([
        { id: "5", content: <Image src="/About/salla.webp" alt="Salla" width={100} height={100} className="w-38 h-38 object-contain hover:scale-110 transition-transform duration-300" /> },
        { id: "6", content: <Image src="/About/oracle.webp" alt="Oracle" width={100} height={100} className="w-38 h-38 object-contain hover:scale-110 transition-transform duration-300" /> },
        { id: "7", content: <Image src="/About/odoo.webp" alt="Odoo" width={100} height={100} className="w-38 h-38 object-contain hover:scale-110 transition-transform duration-300" /> },
        { id: "8", content: <Image src="/About/next.webp" alt="Next.js" width={100} height={100} className="w-38 h-38 object-contain hover:scale-110 transition-transform duration-300" /> },
    ]).flat().map((item, idx) => ({ ...item, id: `2-${idx}` }))
];

export default function AboutSlider() {
    const t = useTranslations("aboutUs");
    const locale = useLocale();
    const isArabic = locale === "ar";

    return (
        <section className="w-full py-16 md:py-24 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-black flex flex-col items-center justify-center overflow-hidden">

            {/* Header Content - Two Columns */}
            <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-24">

                {/* Main Header */}
                <div className="mb-12 md:mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <Header
                            title={t("slider.headline")}
                            className={`text-center mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl ${isArabic ? "pb-4" : ""}`}
                        />
                    </motion.div>
                </div>

                {/* Description Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-32 text-center">

                    {/* Column 1 */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="text-neutral-500 text-lg md:text-xl font-medium leading-relaxed [&_strong]:text-white [&_strong]:font-semibold"
                    >
                        <p dangerouslySetInnerHTML={{ __html: t.raw("slider.column1") }} />
                    </motion.div>

                    {/* Column 2 */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                        className="text-neutral-500 text-lg md:text-xl font-medium leading-relaxed [&_strong]:text-white [&_strong]:font-semibold"
                    >
                        <p dangerouslySetInnerHTML={{ __html: t.raw("slider.column2") }} />
                    </motion.div>

                </div>
            </div>

            {/* Sliders Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                className="w-full flex flex-col gap-8 md:gap-12 relative z-10"
                dir="ltr"
            >
                {/* Row 1: Right to Left (Default) */}
                <div className="w-full">
                    <SlidingLogoMarquee
                        items={sliderItems1}
                        speed={30}
                        direction="horizontal"
                        gap="4rem"
                        height="150px"
                        showGridBackground={false}
                        enableBlur={true}
                        blurIntensity={2}
                        className="bg-transparent"
                        showControls={false}
                    />
                </div>

                {/* Row 2: Left to Right */}
                <div className="w-full transform scale-x-[-1]">
                    <SlidingLogoMarquee
                        items={sliderItems2.map(item => ({
                            ...item,
                            content: <div className="transform scale-x-[-1]">{item.content}</div>
                        }))}
                        speed={30}
                        direction="horizontal"
                        gap="4rem"
                        height="150px"
                        showGridBackground={false}
                        enableBlur={true}
                        blurIntensity={2}
                        className="bg-transparent"
                        showControls={false}
                    />
                </div>
            </motion.div>
        </section>
    );
}
