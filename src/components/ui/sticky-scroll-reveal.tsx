"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string | React.ReactNode;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // For 3 items: breakpoints at 0.167, 0.5, 0.833 (center of each third)
    const cardsBreakpoints = content.map((_, index) => (index + 0.5) / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      className="flex h-full w-full relative bg-[#0a0a0a]"
      ref={ref}
    >
      <div className="relative flex items-start w-3/4 md:w-1/2! md:pl-20">
        <div className="max-w-4xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="md:h-screen! h-[90vh] flex flex-col justify-center">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-5xl font-bold text-slate-100 mb-8"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-4xl! md:text-xl! text-[#808080] leading-relaxed max-w-md"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
      <div
        className={cn(
          "sticky top-0 h-screen w-1/2 overflow-hidden bg-[#0a0a0a]",
          contentClassName,
        )}
      >
        {content.map((item, index) => (
          <motion.div
            key={item.title + index}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: activeCard === index ? 1 : 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="absolute inset-0 h-full w-full"
          >
            {item.content}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
