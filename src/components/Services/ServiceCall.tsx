"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, Variants } from "framer-motion";
import { Header } from "@/components/ui/header";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ServiceCall() {
  const t = useTranslations("services");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // --- Optimized "Liquid Light" Animation ---
  // 1. Seamless Loop: The dash travels continuously around the path (0 -> 1) without resetting.
  // 2. Organic Pulse: The length of the dash breaths (stretches/compresses) for an "ease in/out" feel.

  const pathVariants: Variants = {
    hidden: {
      pathLength: 0.1,
      pathSpacing: 0,
      pathOffset: 0,
      opacity: 0,
    },
    visible: {
      pathLength: [0.1, 0.3, 0.1], // Breathing effect
      pathSpacing: 1,
      pathOffset: [0, 1], // Continuous travel
      opacity: 1,
      transition: {
        pathOffset: {
          duration: 3, // Smooth, leisurely accumulation
          ease: "linear",
          repeat: Infinity,
        },
        pathLength: {
          duration: 1.5, // Faster breathing cycle
          ease: "easeInOut",
          repeat: Infinity,
        },
        opacity: { duration: 0.5 },
      },
    },
  };

  // A correct, smooth centered infinity path
  const infinityPath =
    "M100,50 C130,50 150,25 180,25 C210,25 210,75 180,75 C150,75 130,50 100,50 C70,50 50,75 20,75 C-10,75 -10,25 20,25 C50,25 70,50 100,50 Z";

  return (
    <section
      ref={containerRef}
      className="w-full relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] py-24"
      style={{ transform: "translateZ(0)" }} // Hardware acceleration hint
    >
      {/* --- Background Ambient Glow (Reduced for sharpness) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-white/[0.01] blur-[60px] rounded-full" />
      </div>

      {/* --- Infinity Symbol & Content --- */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto"
      >
        {/* 1. The Infinity Symbol */}
        <div className="relative w-64 h-32 md:w-80 md:h-40 mb-12 flex items-center justify-center">
          <svg
            viewBox="-20 -10 240 120"
            className="w-full h-full will-change-transform"
            style={{ overflow: "visible" }}
          >
            {/* 1. Dark Background Track (Static) */}
            <path d={infinityPath} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeLinecap="round" />

            {/* 2. Glow Layer (Subtle bloom) */}
            <motion.path
              d={infinityPath}
              fill="none"
              stroke="#ffffff"
              strokeWidth="8"
              strokeLinecap="round"
              variants={pathVariants}
              initial="hidden"
              whileInView="visible"
              style={{ filter: "blur(4px)", opacity: 0.5 }}
            />

            {/* 3. Core Layer (Sharp, Bright) */}
            <motion.path
              d={infinityPath}
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
              variants={pathVariants}
              initial="hidden"
              whileInView="visible"
            />
          </svg>
        </div>

        {/* 2. Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <Header
            title={
              <>
                {t("call.unlock")} <span className="text-white">{t("call.limitless")}</span> {t("call.possibilities")}
              </>
            }
            className="text-5xl uppercase md:text-7xl lg:text-8xl font-bold tracking-tighter"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-2xl text-white/50 font-light mb-16 max-w-2xl leading-relaxed"
        >
          {t("call.description")}
        </motion.p>

        {/* 3. Actions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-6"
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center px-10 py-5 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Image
                src="/Home/infinity.apng"
                alt={t("call.startProject")}
                width={24}
                height={24}
                className="h-6 w-6 object-contain transition-transform duration-500 ease-in-out group-hover:rotate-180"
                priority
              />
              {t("call.startProject")}
            </span>
          </Link>

          <Link
            href="/services"
            className="group inline-flex items-center justify-center px-10 py-5 rounded-full font-medium text-lg text-white/70 border border-white/10 hover:bg-white/5 transition-all hover:text-white"
          >
            {t("call.viewServices")}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
