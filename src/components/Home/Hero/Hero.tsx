"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import PlasmaGlobe from "@/components/lightswind/plasma-globe";

export default function Hero() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#0a0a0a] pb-40">

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4">
        
        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-start">
            
            {/* Left Column: Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 pt-12">
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
