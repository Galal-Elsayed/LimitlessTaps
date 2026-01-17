"use client";

import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";
import { useTranslations } from "next-intl";

const ScrollCarousel = () => {
  const t = useTranslations("home");

  // Build sticky scroll content with translations
  const stickyContent = [
    {
      title: t("sticky_title_1"),
      description: (
        <span className="text-xl md:text-2xl font-semibold text-[#86868b] whitespace-pre-line">
          {t.raw("sticky_desc_1").split("{highlight}")[0]}
          <span className="text-white font-bold">{t("sticky_highlight_1")}</span>
          {t.raw("sticky_desc_1").split("{highlight}")[1]}
        </span>
      ),
      content: (
        <div className="h-full w-full flex items-center justify-center text-white relative">
          <Image
            src="/Home/StickyPhone/Limitless-Phone.png"
            alt={t("sticky_title_1")}
            width={1200}
            height={800}
            className="h-full w-full object-contain scale-125"
            quality={75}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ),
    },
    {
      title: t("sticky_title_2"),
      description: (
        <span className="text-xl md:text-2xl font-semibold text-[#86868b] whitespace-pre-line">
          {t.raw("sticky_desc_2").split("{highlight}")[0]}
          <span className="text-white font-bold">{t("sticky_highlight_2")}</span>
          {t.raw("sticky_desc_2").split("{highlight}")[1]}
        </span>
      ),
      content: (
        <div className="h-full w-full flex items-center justify-center text-white relative">
          <Image
            src="/Home/StickyPhone/Limitless-Laptop.png"
            alt={t("sticky_title_2")}
            width={1200}
            height={800}
            className="h-full w-full object-contain scale-125"
            quality={75}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ),
    },
    {
      title: t("sticky_title_3"),
      description: (
        <span className="text-xl md:text-2xl font-semibold text-[#86868b] whitespace-pre-line">
          {t.raw("sticky_desc_3").split("{highlight}")[0]}
          <span className="text-white font-bold">{t("sticky_highlight_3")}</span>
          {t.raw("sticky_desc_3").split("{highlight}")[1]}
        </span>
      ),
      content: (
        <div className="h-full w-full flex items-center justify-center text-white relative">
          <Image
            src="/Home/StickyPhone/Limitless-Tablet.png"
            alt={t("sticky_title_3")}
            width={1200}
            height={800}
            className="h-full w-full object-contain scale-125"
            quality={75}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* Header Section */}
      <div className="pt-24 text-center max-w-4xl mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent font-app">
          {t("sticky_header")}
        </h2>
        <p className="text-xl md:text-2xl text-[#86868b] font-medium font-app">{t("sticky_subheader")}</p>
      </div>

      {/* Sticky Scroll Reveal Section */}
      <section className="md:pb-20 w-full md:max-w-335 mx-auto">
        <StickyScroll content={stickyContent} />
      </section>
    </div>
  );
};

export default ScrollCarousel;
