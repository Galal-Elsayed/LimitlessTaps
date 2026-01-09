"use client";

import ContentCarousel from "./ContentCarousel";
import { useTranslations, useLocale } from "next-intl";

export default function Carousel2() {
    const t = useTranslations("home");
    const locale = useLocale();
    const isRTL = locale === "ar";

    const carousel2Items = [
        {
            type: "video" as const,
            src: "/Home/Carousel/video-carousel.mp4",
            alt: "Display 1",
            autoPlay: true,
            loop: true,
            muted: true,
            text: t("carousel2_item_1_text")
        },
        {
            type: "image" as const,
            src: "/Home/Carousel/imageCarousel1.jpg",
            alt: "Display 2",
            text: t("carousel2_item_2_text")
        },
        {
            type: "image" as const,
            src: "/Home/Carousel/imageCarousel2.jpg",
            alt: "Display 3",
            text: t("carousel2_item_3_text")
        },
        {
            type: "image" as const,
            src: "/Home/Carousel/imageCarousel3.jpg",
            alt: "Display 4",
            text: t("carousel2_item_4_text")
        },
        {
            type: "image" as const,
            src: "/Home/Carousel/imageCarousel4.jpg",
            alt: "Display 5",
            text: t("carousel2_item_5_text")
        }
    ];

    return (
        <section className="w-full bg-[#0a0a0a] pt-20 pb-20 overflow-hidden relative">
            {/* Image Carousel */}
            <div className="mb-20 md:mb-32">
                <ContentCarousel items={carousel2Items} textVariant="linear" />
            </div>

            {/* Bottom Text Block - Two Columns */}
            <div className="px-6 md:px-12 md:mt-20 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                    <div>
                        <p className="text-[#86868b] md:text-2xl leading-relaxed tracking-wide font-semibold">
                            {t("carousel2_bottom_text_1")} <span className="text-white font-semibold">{t("carousel2_bottom_highlight_1")}</span> {t("carousel2_bottom_suffix_1")}
                        </p>
                    </div>
                    <div>
                        <p className="text-[#86868b] md:text-2xl leading-relaxed tracking-tight font-semibold">
                            {t("carousel2_bottom_text_2")} <span className="text-white font-semibold">{t("carousel2_bottom_highlight_2")}</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
