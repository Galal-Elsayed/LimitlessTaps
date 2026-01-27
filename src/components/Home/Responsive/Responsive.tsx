"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTranslations } from "next-intl";

// --- Animated Shapes (Reused from ServicesApproach) ---

const DiscoveryShape = () => (
  <svg
    className="w-full h-full text-blue-400 drop-shadow-[0_0_5px_rgba(59,130,246,0.3)]"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.circle
      cx="100"
      cy="100"
      r="30"
      stroke="currentColor"
      strokeWidth="2"
      initial={{ scale: 0.8, opacity: 0.8 }}
      animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.circle
      cx="100"
      cy="100"
      r="60"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="4 4"
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    />
    <motion.circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <motion.line
      x1="100"
      y1="100"
      x2="100"
      y2="40"
      stroke="currentColor"
      strokeWidth="2"
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "100px 100px" }}
    />
  </svg>
);

const StrategyShape = () => (
  <svg
    className="w-full h-full text-purple-400 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.rect
      x="70"
      y="70"
      width="60"
      height="60"
      stroke="currentColor"
      strokeWidth="2"
      animate={{ rotate: 90 }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "100px 100px" }}
    />
    <motion.circle cx="100" cy="100" r="5" fill="currentColor" />
    <motion.path
      d="M100 40 L100 70 M100 130 L100 160 M40 100 L70 100 M130 100 L160 100"
      stroke="currentColor"
      strokeWidth="2"
      strokeDasharray="2 2"
    />
    <motion.circle
      cx="100"
      cy="100"
      r="80"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.4"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </svg>
);

const DesignShape = () => (
  <svg
    className="w-full h-full text-pink-400 drop-shadow-[0_0_5px_rgba(244,114,182,0.3)]"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      d="M50 100 Q100 50 150 100 T250 100"
      stroke="currentColor"
      strokeWidth="3"
      fill="none"
      animate={{ x: [-50, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    />
    <motion.path
      d="M50 120 Q100 70 150 120 T250 120"
      stroke="currentColor"
      strokeWidth="3"
      fill="none"
      opacity="0.6"
      animate={{ x: [-50, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.2 }}
    />
    <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
  </svg>
);

const DevelopmentShape = () => (
  <svg
    className="w-full h-full text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.3)]"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.rect x="60" y="60" width="80" height="80" rx="10" stroke="currentColor" strokeWidth="2" />
    <motion.line
      x1="80"
      y1="90"
      x2="120"
      y2="90"
      stroke="currentColor"
      strokeWidth="2"
      animate={{ scaleX: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.line
      x1="80"
      y1="110"
      x2="110"
      y2="110"
      stroke="currentColor"
      strokeWidth="2"
      animate={{ scaleX: [0, 1, 0] }}
      transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
    />
    <motion.circle
      cx="100"
      cy="100"
      r="90"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="10 10"
      opacity="0.4"
      animate={{ rotate: -360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "100px 100px" }}
    />
  </svg>
);

// --- Step Item Component ---
const StepItem = ({
  title,
  description,
  Shape,
  color,
  index,
}: {
  title: string;
  description: string;
  Shape: React.FC;
  color: string;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex gap-4 p-4 rounded-xl items-center"
    >
      <div className="shrink-0 w-16 h-16 relative">
        <div className="w-full h-full flex items-center justify-center relative">
          {/* Glow */}
          <div
            className={cn(
              "absolute inset-0 rounded-full blur-xl opacity-15",
              color === "blue" && "bg-blue-500",
              color === "purple" && "bg-purple-500",
              color === "pink" && "bg-pink-500",
              color === "emerald" && "bg-emerald-500",
            )}
          />
          {/* Shape */}
          <div className="w-full h-full relative z-10">
            <Shape />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 justify-center">
        <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{title}</h3>
        <p className="text-neutral-400 text-sm md:text-base max-w-sm block leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export default function StickyPhone() {
  const t = useTranslations("home");

  // Hardcoded responsive features instructions since translation keys might not exist yet
  // Using the requested shapes
  const features = [
    {
      title: "Universal Compatibility",
      description:
        "Our solutions are engineered to perform flawlessly across all devices, ensuring your brand looks exceptional everywhere.",
      Shape: DiscoveryShape,
      color: "blue",
    },
    {
      title: "Adaptive Interface",
      description:
        "Fluid layouts that automatically adjust to any screen size, from large desktop monitors to compact mobile displays.",
      Shape: StrategyShape,
      color: "purple",
    },
    {
      title: "Mobile-First Design",
      description:
        "Prioritizing mobile interactions to capture the immense audience on smartphones while scaling up beautifully.",
      Shape: DesignShape,
      color: "pink",
    },
    {
      title: "Cross-Platform Consistency",
      description: "Maintain a unified brand experience whether your users are on iOS, Android, Windows, or macOS.",
      Shape: DevelopmentShape,
      color: "emerald",
    },
  ];

  return (
    <section className="w-full bg-[#0A0A0A] overflow-hidden">
      <div className="container max-w-[1400px] mx-auto px-4">
        <div className="-mb-14 -lg:mb-24 text-center">
          <h2 className="text-4xl md:text-6xl font-bold font-app text-white mb-4">
            Responsive Across <br /> All Devices
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl max-w-lg mx-auto">
            Experience seamless performance and stunning visuals on every screen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Left Column: Icons Only */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <div className="flex flex-col gap-4">
              {features.map((feature, idx) => (
                <StepItem key={idx} {...feature} index={idx} />
              ))}
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative w-full max-w-[400px] h-[350px] lg:max-w-none lg:w-[950px] lg:h-[850px] flex items-center justify-center order-1 lg:order-2 justify-self-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              whileInView={{ opacity: 1, scale: 1.1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full h-full relative"
            >
              <Image
                src="/Home/StickyPhone/limitless.png"
                alt="Responsive Mockups"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
