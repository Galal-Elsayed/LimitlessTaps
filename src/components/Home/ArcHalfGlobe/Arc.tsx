"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

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
        priority
      />
    </div>
  );
}

export function CTATitle() {
  const t = useTranslations("common");
  return (
    <h2 className="text-white font-semibold leading-tight tracking-tight text-4xl md:text-5xl lg:text-6xl">
      {t("cta_title")}
    </h2>
  );
}

export function CTAButtons() {
  const t = useTranslations("common");
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <Link
        href="/contact"
        className="inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:brightness-95 transition-all"
      >
        {t("cta_primary")}
      </Link>
      <Link
        href="/contact"
        className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white opacity-80 hover:opacity-100 transition-opacity"
      >
        {t("cta_secondary")} <span className="ml-1">→</span>
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
