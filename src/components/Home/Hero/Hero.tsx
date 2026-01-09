"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, Link } from "@/i18n/routing";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-start justify-center bg-[#0a0a0a] pt-32 pb-20 md:pt-40">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
        src="/Home/Hero/Hero.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay Gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#0a0a0a]" />
        
        {/* Grid overlay mostly aesthetic */}
        {/* <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30" /> */}
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="inline-flex items-center gap-3 px-4 py-2 rounded-lg border border-white/10 bg-[#1A1A1A] text-xs font-mono text-gray-300 mb-8 hover:bg-[#252525] transition-colors cursor-pointer group tracking-wider"
        >
          <span className="w-3 h-3 bg-blue-600" />
          <span className="uppercase">{t("hero_badge")}</span>
          <ArrowRight className={`w-3 h-3 text-gray-400 transition-transform ml-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
        >
          {t("hero_title")}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed"
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

      {/* Logos */}
      
    </section>
  );
}
