"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

// Dynamic import for heavy WebGL component - loads only on client
const PlasmaGlobe = dynamic(
  () => import("@/components/lightswind/plasma-globe"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[300px] sm:min-h-[450px] lg:min-h-[550px] rounded-xl bg-gradient-to-b from-blue-500/10 to-purple-500/10 animate-pulse" />
    )
  }
);

export default function Hero() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#0a0a0a] pb-40">

      {/* Global Background Waves */}
      <div className="absolute inset-0 z-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,#0a0a0a_30%,#0a0a0a_80%,transparent)]">
        <Image
          src="/Home/wave.png"
          alt="Color Waves"
          fill
          className="object-cover opacity-30"
          loading="lazy"
          quality={75}
        />
      </div>



      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4">

        {/* Badge */}
        <div className="flex justify-center mb-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-4 rounded-xl border border-white/10 bg-zinc-900/50 px-4 py-3 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/5 hover:border-white/20 group"
          >
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-[1px] bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.8)] animate-pulse"></span>
            <span className="font-[family-name:var(--font-jetbrains-mono)] tracking-wider uppercase text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors">
              {t("hero_badge")}
            </span>
            <ArrowRight className={`h-4 w-4 text-gray-400 group-hover:text-white transition-all ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
          </Link>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-start">

          {/* Left Column: Content */}
          <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 pt-12">
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1]"
            >
              {t("hero_title")}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed"
            >
              {t("hero_subtitle")}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              {/* Primary Button */}
              <Link
                href="/contact"
                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-xl bg-white px-8 font-semibold text-black transition-all duration-500 ease-out hover:px-12 hover:bg-zinc-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100 via-white to-zinc-200 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className={`relative z-10 flex items-center gap-2 transition-transform duration-500 ${isRTL ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`}>
                  <Image
                    src="/Home/infinity.apng"
                    alt="Limitless"
                    width={24}
                    height={24}
                    className="h-6 w-6 object-contain transition-transform duration-700 ease-in-out group-hover:scale-110"
                    unoptimized
                  />
                  {t("cta_primary")}
                </span>
                {/* Shine Effect */}
                <div className="absolute inset-0 -z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 group-hover:animate-shine" />
              </Link>

              {/* Secondary Button */}
              <Link
                href="/services"
                className="group relative inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 text-white backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:pr-10 active:scale-95"
              >
                <span className="font-semibold">{t("cta_secondary")}</span>
                <ArrowRight className={`h-5 w-5 transition-all duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Placeholder for future content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full"
          >
            {/* Future content will go here */}
            <PlasmaGlobe />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
