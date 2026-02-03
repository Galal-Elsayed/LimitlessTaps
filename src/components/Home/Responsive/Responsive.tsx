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
    {/* Central Core */}
    <motion.circle
      cx="100"
      cy="100"
      r="20"
      fill="currentColor"
      initial={{ scale: 0.8, opacity: 0.8 }}
      animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 3, repeat: Infinity }}
    />

    {/* Inner Orbit */}
    <motion.circle
      cx="100"
      cy="100"
      r="45"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="4 4"
      animate={{ rotate: 360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    />

    {/* Outer Orbit with Satellite */}
    <motion.g
      animate={{ rotate: -360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <circle
        cx="100"
        cy="100"
        r="75"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
      <circle cx="175" cy="100" r="6" fill="currentColor" />
    </motion.g>

    {/* Expanding Rings representing "Universal" reach */}
    <motion.circle
      cx="100"
      cy="100"
      r="30"
      stroke="currentColor"
      strokeWidth="1"
      initial={{ opacity: 0.6, scale: 1 }}
      animate={{ opacity: 0, scale: 2.5 }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
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
    {/* Layout box that changes size/aspect ratio - "Adaptive" */}
    <motion.rect
      x="60"
      y="60"
      width="80"
      height="80"
      rx="8"
      stroke="currentColor"
      strokeWidth="2"
      animate={{
        width: [80, 100, 60, 80],
        height: [80, 60, 100, 80],
        x: [60, 50, 70, 60],
        y: [60, 70, 50, 60],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Measurement lines suggesting resizing */}
    <motion.path
      d="M50 40 L50 160 M150 40 L150 160"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="2 2"
      opacity="0.5"
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    <motion.path
      d="M40 50 L160 50 M40 150 L160 150"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="2 2"
      opacity="0.5"
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 4, repeat: Infinity, delay: 2 }}
    />

    {/* Center Dot */}
    <motion.circle cx="100" cy="100" r="4" fill="currentColor" />
  </svg>
);

const DesignShape = () => (
  <svg
    className="w-full h-full text-pink-400 drop-shadow-[0_0_5px_rgba(244,114,182,0.3)]"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Phone Frame */}
    <motion.rect
      x="65"
      y="50"
      width="70"
      height="100"
      rx="10"
      stroke="currentColor"
      strokeWidth="2"
      initial={{ opacity: 0.8 }}
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    {/* Screen Notch/Home Bar */}
    <path
      d="M90 140 H110"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.5"
    />

    {/* Floating Elements (Waves) coming out or inside */}
    <motion.path
      d="M75 90 Q100 110 125 90"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      animate={{
        d: [
          "M75 90 Q100 110 125 90",
          "M75 90 Q100 70 125 90",
          "M75 90 Q100 110 125 90",
        ],
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.path
      d="M75 110 Q100 130 125 110"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      opacity="0.6"
      animate={{
        d: [
          "M75 110 Q100 130 125 110",
          "M75 110 Q100 90 125 110",
          "M75 110 Q100 130 125 110",
        ],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5,
      }}
    />

    <circle
      cx="100"
      cy="100"
      r="60"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.2"
      strokeDasharray="4 4"
    />
  </svg>
);

const DevelopmentShape = () => (
  <svg
    className="w-full h-full text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.3)]"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background Device/Window */}
    <motion.rect
      x="80"
      y="50"
      width="60"
      height="80"
      rx="6"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.5"
      animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Foreground Device/Window */}
    <motion.rect
      x="50"
      y="80"
      width="80"
      height="60"
      rx="6"
      stroke="currentColor"
      strokeWidth="2"
      fill="#0A0A0A"
    />

    {/* Code lines syncing */}
    <motion.line
      x1="65"
      y1="100"
      x2="115"
      y2="100"
      stroke="currentColor"
      strokeWidth="2"
      animate={{ scaleX: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.line
      x1="65"
      y1="115"
      x2="105"
      y2="115"
      stroke="currentColor"
      strokeWidth="2"
      animate={{ scaleX: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
    />

    {/* Connecting/Sync Arc */}
    <motion.path
      d="M130 60 A 40 40 0 0 1 140 140"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="4 4"
      fill="none"
      opacity="0.4"
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
        <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
          {title}
        </h3>
        <p className="text-neutral-400 text-sm md:text-base max-w-sm block leading-relaxed">
          {description}
        </p>
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
      title: t("feature_1_title"),
      description: t("feature_1_desc"),
      Shape: DiscoveryShape,
      color: "blue",
    },
    {
      title: t("feature_2_title"),
      description: t("feature_2_desc"),
      Shape: StrategyShape,
      color: "purple",
    },
    {
      title: t("feature_3_title"),
      description: t("feature_3_desc"),
      Shape: DesignShape,
      color: "pink",
    },
    {
      title: t("feature_4_title"),
      description: t("feature_4_desc"),
      Shape: DevelopmentShape,
      color: "emerald",
    },
  ];

  return (
    <section className="w-full bg-[#0A0A0A] overflow-hidden">
      <div className="container max-w-[1400px] mx-auto px-4">
        <div className="-mb-14 -lg:mb-24 text-center">
          <h2 className="text-4xl md:text-6xl font-bold font-app text-white mb-4">
            {t.rich("responsive_title", { br: () => <br /> })}
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl max-w-lg mx-auto">
            {t("responsive_subtitle")}
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
