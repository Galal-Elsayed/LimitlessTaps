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
  return (
    <div className="space-y-4">
      <h1 className="font-app font-semibold leading-tight tracking-tight text-7xl md:text-6xl lg:text-8xl">
        {t("cta_title")}
      </h1>
      <p className="font-app text-lg md:text-2xl lg:text-3xl font-semibold">{t("cta_subtitle")}</p>
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
        className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-black transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:bg-zinc-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-[0.98]"
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
        className="group relative inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 text-white backdrop-blur-xl transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:border-white/20 hover:bg-white/10 active:scale-[0.98]"
      >
        <span className="font-medium">{t("cta_secondary")}</span>
        <ArrowRight
          className={`h-4 w-4 transition-transform duration-300 ${
            isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
          }`}
        />
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
