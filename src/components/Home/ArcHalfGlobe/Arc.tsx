"use client";

import React from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

export function CTAArc() {
  return (
    <div className="absolute inset-x-0 top-0 w-full pointer-events-none select-none">
      {/* The Hill Shape */}
      <Image
        src="/ActionBlock/Arc.png"
        alt=""
        width={1920}
        height={1080}
        className="w-full h-auto"
        loading="lazy"
        quality={75}
        sizes="100vw"
      />
    </div>
  );
}

export function CTATitle() {
  const t = useTranslations("common");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div className="space-y-4">
      <h1
        className={`font-app text-7xl md:text-6xl lg:text-8xl ${isRTL ? "pb-4" : ""}`}
      >
        {t("cta_title")}
      </h1>
      <p className="text-lg md:text-2xl lg:text-3xl font-semibold">
        {t("cta_subtitle")}
      </p>
    </div>
  );
}

export function CTAButtons() {
  const t = useTranslations("common");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
      {/* Primary Tech Button */}
      <Link
        href="/contact"
        className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-[#eeeeee] px-8 font-extrabold text-black tracking-widest uppercase shadow-[0_5px_0_0_#bebebe] border border-white/10 transition-all duration-100 ease-out hover:bg-white hover:shadow-[0_2px_0_0_#bebebe,0_0_20px_rgba(255,255,255,0.4)] hover:translate-y-0.5 active:shadow-none active:translate-y-1"
      >
        <div className="absolute inset-0 bg-linear-to-tr from-zinc-100 via-white to-zinc-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className={`relative z-10 flex items-center gap-2`}>
          <Image
            src="/Home/infinity.apng"
            alt="Limitless"
            width={24}
            height={24}
            className="h-6 w-6 object-contain transition-transform duration-500 ease-in-out group-hover:rotate-180"
          />
          {t("cta_primary")}
        </span>
        <div className="absolute inset-0 -z-10 -translate-x-full bg-linear-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:animate-shine" />
      </Link>

      {/* Secondary Glass Button */}
      <Link
        href="/services"
        className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-neutral-900 px-8 font-extrabold text-white tracking-widest uppercase shadow-[0_5px_0_0_#262626] border border-white/10 transition-all duration-100 ease-out hover:bg-neutral-900/80 hover:shadow-[0_2px_0_0_#262626] hover:translate-y-0.5 active:shadow-none active:translate-y-1"
      >
        <span className="relative z-10 flex items-center gap-2">
          {t("cta_secondary")}
          <ArrowRight
            className={`h-4 w-4 transition-transform duration-300 ${isRTL
              ? "rotate-180 group-hover:-translate-x-1"
              : "group-hover:translate-x-1"
              }`}
          />
        </span>
      </Link>
    </div>
  );
}

export default function Arc() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a]">
      <CTAArc />
      <div className="relative max-w-6xl mx-auto px-6 py-30 md:py-42 text-center">
        <CTATitle />
        <CTAButtons />
      </div>
    </section>
  );
}
