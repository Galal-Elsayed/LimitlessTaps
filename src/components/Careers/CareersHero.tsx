"use client";

import React from "react";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Header } from "@/components/ui/header";
import { motion } from "framer-motion";

const AnimatedResume = ({ className }: { className?: string }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    {/* Subtle white glow */}
    <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full opacity-20" />

    {/* Document Shape */}
    <motion.div
      className="relative w-48 h-64 border border-white/10 bg-white/5 rounded-2xl overflow-hidden backdrop-blur-sm"
      initial={{ y: 0, rotate: -12 }}
      animate={{ y: [-10, 10, -10], rotate: [-12, -8, -12] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Header Line */}
      <div className="absolute top-6 left-6 right-6 h-3 bg-white/20 rounded-sm" />

      {/* Content Lines */}
      <div className="absolute top-16 left-6 right-12 h-2 bg-white/10 rounded-sm" />
      <div className="absolute top-24 left-6 right-6 h-2 bg-white/10 rounded-sm" />
      <div className="absolute top-32 left-6 right-10 h-2 bg-white/10 rounded-sm" />
      <div className="absolute top-40 left-6 right-6 h-2 bg-white/10 rounded-sm" />

      {/* Animated Scan Line */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"
        animate={{ top: ["-100%", "200%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
      />
    </motion.div>

    {/* Floating Elements (Abstract additions) */}
    <motion.div
      className="absolute -right-8 top-12 w-16 h-16 border border-white/10 bg-[#0a0a0a]/50 backdrop-blur-md rounded-xl flex items-center justify-center"
      animate={{
        y: [10, -10, 10],
        rotate: [12, 24, 12]
      }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    >
      <span className="text-2xl text-white/40 font-mono">+</span>
    </motion.div>
  </div>
);

export default function CareersHero() {
  return (
    <div style={{ backgroundColor: "#0a0a0a" }}>
      <BackgroundPaths>
        <Header title="Build The Future With Us" className="mb-2" />

        <div className="relative group max-w-2xl mx-auto mt-8">
          {/* Dark Glass Card */}
          <div className="relative bg-[#0a0a0a]/80 p-8 md:p-12 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl flex flex-col items-center text-center overflow-hidden">

            {/* Subtle Gradient background effect inside card */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none" />

            {/* Background Animated Icon */}
            <div className="absolute -right-12 -top-12 md:-right-4 md:-top-4 opacity-30 pointer-events-none scale-75 md:scale-100">
              <AnimatedResume className="transform rotate-12" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white tracking-tight">
                No Open Roles? No Problem.
              </h3>

              <p className="text-lg text-white/60 leading-relaxed max-w-lg mb-8">
                We are always looking for exceptional talent to join our team.
                Send us your CV and we'll keep you in mind for future opportunities.
              </p>

              <a
                href="mailto:careers@limitlesstaps.com"
                className="px-8 py-4 rounded-lg bg-[#eeeeee] hover:bg-white text-black font-extrabold text-sm tracking-widest uppercase shadow-[0_5px_0_0_#bebebe] hover:translate-y-0.5 hover:shadow-[0_2px_0_0_#bebebe] active:translate-y-1 active:shadow-none transition-all duration-100 ease-out flex items-center gap-3 border border-white/10"
              >
                <span>Send Your CV</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </BackgroundPaths>
    </div>
  );
}
