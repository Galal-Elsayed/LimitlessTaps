"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Header } from "@/components/ui/header";

// --- Animated Shapes ---

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
    <defs>
      <clipPath id="circleClip">
        <circle cx="100" cy="100" r="80" />
      </clipPath>
    </defs>
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

const LaunchShape = () => (
  <svg
    className="w-full h-full text-orange-400 drop-shadow-[0_0_5px_rgba(251,146,60,0.3)]"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path d="M100 150 L100 50" stroke="currentColor" strokeWidth="3" />
    <motion.path d="M90 60 L100 50 L110 60" stroke="currentColor" strokeWidth="3" />
    <motion.circle
      cx="100"
      cy="150"
      r="40"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.6"
      animate={{ scale: [0, 1.5], opacity: [0.6, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
  </svg>
);

const SupportShape = () => (
  <svg
    className="w-full h-full text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.3)]"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="2" />
    <motion.path
      d="M70 100 Q50 50 100 30"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      opacity="0.6"
      animate={{ pathLength: [0, 1, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />
    <motion.path
      d="M130 100 Q150 150 100 170"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      opacity="0.6"
      animate={{ pathLength: [0, 1, 0] }}
      transition={{ duration: 3, delay: 1.5, repeat: Infinity, ease: "linear" }}
    />
    <motion.circle
      cx="100"
      cy="100"
      r="60"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="2 4"
      animate={{ rotate: 180 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "100px 100px" }}
    />
  </svg>
);

// Shape mapping
const SHAPE_MAP: Record<string, { Shape: React.FC; color: string }> = {
  discovery: { Shape: DiscoveryShape, color: "blue" },
  strategy: { Shape: StrategyShape, color: "purple" },
  design: { Shape: DesignShape, color: "pink" },
  development: { Shape: DevelopmentShape, color: "emerald" },
  launch: { Shape: LaunchShape, color: "orange" },
  support: { Shape: SupportShape, color: "cyan" },
};

// --- Step Item Component ---
const StepItem = ({
  title,
  description,
  Shape,
  color,
  align = "left",
  index,
}: {
  title: string;
  description: string;
  Shape: React.FC;
  color: string;
  align?: "left" | "right";
  index: number;
}) => {
  return (
    <motion.div
      dir="ltr"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={cn(
        "flex gap-6 p-4 rounded-xl transition-all duration-300 items-center",
        align === "right" ? "flex-row-reverse text-right" : "flex-row text-left",
      )}
    >
      <div className="shrink-0 w-20 h-20 relative">
        <div className="w-full h-full flex items-center justify-center relative">
          {/* Glow */}
          <div
            className={cn(
              "absolute inset-0 rounded-full blur-xl opacity-15",
              color === "blue" && "bg-blue-500",
              color === "purple" && "bg-purple-500",
              color === "pink" && "bg-pink-500",
              color === "emerald" && "bg-emerald-500",
              color === "orange" && "bg-orange-500",
              color === "cyan" && "bg-cyan-500",
            )}
          />
          {/* Shape */}
          <div className="w-full h-full relative z-10">
            <Shape />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 justify-center h-full">
        <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{title}</h3>
        <p className="text-neutral-400 text-sm md:text-base max-w-xs block line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// Helper to parse highlight tags
const parseHighlightedText = (text: string) => {
  const parts = text.split(/(<highlight>.*?<\/highlight>)/g);
  return parts.map((part, index) => {
    if (part.startsWith("<highlight>") && part.endsWith("</highlight>")) {
      const content = part.replace(/<\/?highlight>/g, "");
      return (
        <span key={index} className="text-white font-medium">
          {content}
        </span>
      );
    }
    return part;
  });
};

export default function ServicesApproach() {
  const t = useTranslations("services.approach");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const stepKeys = ["discovery", "strategy", "design", "development", "launch", "support"] as const;

  const allSteps = stepKeys.map((key) => ({
    id: t(`steps.${key}.id`),
    title: t(`steps.${key}.title`),
    description: t(`steps.${key}.description`),
    Shape: SHAPE_MAP[key].Shape,
    color: SHAPE_MAP[key].color,
  }));

  const stepsLeft = allSteps.slice(0, 3);
  const stepsRight = allSteps.slice(3, 6);

  return (
    <section className="relative w-full py-12 md:py-10 bg-[#0A0A0A] overflow-hidden flex items-center justify-center min-h-screen">
      <div className="container max-w-[1700px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Header title={t("header")} className={cn("text-4xl md:text-7xl", isArabic && "pb-4")} />
          <p className="text-neutral-400 max-w-3xl mx-auto text-lg md:text-xl mt-4 leading-relaxed">
            {parseHighlightedText(t.raw("subtitle"))}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr_1fr] gap-6 lg:gap-0 items-center h-full min-h-[auto] lg:min-h-[600px] relative mt-8 lg:mt-0">
          {/* Left Column - 3 cards ABOVE image on mobile */}
          <div className="flex flex-col justify-center gap-4 lg:gap-8 py-4 lg:py-8 order-1 lg:order-1 h-full items-center lg:items-end z-10 relative">
            {stepsLeft.map((step, idx) => (
              <StepItem key={step.id} {...step} align="left" index={idx} />
            ))}
          </div>

          {/* Middle Column - Phone Image */}
          <div className="relative w-full h-[300px] lg:h-full lg:min-h-[600px] flex items-center justify-center order-2 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] lg:w-[120%] h-[100%] lg:h-[120%] max-w-none z-0 pointer-events-none"
            >
              <Image
                src="/Services/service-phone.png"
                alt="Service App Interface"
                fill
                className="object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                priority
              />
            </motion.div>
          </div>

          {/* Right Column - 3 cards BELOW image on mobile */}
          <div className="flex flex-col pl-0 lg:pl-12 justify-center gap-4 lg:gap-8 py-4 lg:py-8 order-3 lg:order-3 h-full items-center lg:items-start z-10 relative">
            {stepsRight.map((step, idx) => (
              <StepItem key={step.id} {...step} align="left" index={idx + 3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
