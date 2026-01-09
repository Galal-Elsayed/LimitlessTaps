"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const t = useTranslations("home");

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
          <ArrowRight className="w-3 h-3 text-gray-400 group-hover:translate-x-0.5 transition-transform ml-1" />
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
          className="flex items-center gap-4"
        >
          <button className="px-8 py-3.5 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            {t("cta_primary")}
          </button>
          <button className="px-8 py-3.5 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm text-white font-semibold hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
            {t("cta_secondary")}
          </button>
        </motion.div>
      </div>

      {/* Logos */}
      
    </section>
  );
}
