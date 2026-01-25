"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Copy, ExternalLink, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Mock Data matching the reference image style
const projects = [
  {
    id: 1,
    category: "Industrial",
    title: "Power Axes International Foundation L.L.C",
    description:
      "A leading industrial company in UAE, Abu Dhabi, specializing in the production of power axes and other industrial equipment. The company is committed to providing high-quality products and services to its customers.",
    techStack: ["Next.js", "Supabase", "TanStack Query", "Tailwind CSS"],
    stats: [
      { label: "Inquiries/Month", value: "80+" },
      { label: "Response Time", value: "3x faster" },
      { label: "Mobile Traffic", value: "65%" },
    ],
    image: "/Home/Carousel/poweraxes-uae.png", // Using a placeholder image for now as I don't have the exact one
    link: "https://poweraxes.vercel.app",
    caseStudy:
      "Deep dive into how we optimized the booking flow for Mo's Experiences, resulting in a 3x increase in conversion rate...",
  },
  {
    id: 2,
    category: "E-Commerce",
    title: "Velvet Vouge",
    description:
      "A premium fashion marketplace connecting local designers with global customers. Features real-time inventory management and AI-driven recommendations.",
    techStack: ["React", "Node.js", "PostgreSQL", "Stripe"],
    stats: [
      { label: "Sales Growth", value: "120%" },
      { label: "User Retention", value: "45%" },
      { label: "Load Time", value: "0.8s" },
    ],
    image: "/Home/How-We-Build/wireframe-apps-and-tools.png", // Placeholder
    link: "https://velvetvogue.com",
    caseStudy: "Exploring the challenges of building a scalable multi-vendor marketplace from scratch...",
  },
  {
    id: 3,
    category: "SaaS",
    title: "TaskFlow Pro",
    description:
      "Project management tool designed for remote teams. Includes time tracking, resource allocation, and automated reporting dashboards.",
    techStack: ["Vue.js", "Firebase", "D3.js", "Tailwind"],
    stats: [
      { label: "Active Users", value: "10k+" },
      { label: "Uptime", value: "99.9%" },
      { label: "Team Productivity", value: "+40%" },
    ],
    image: "/Home/How-We-Build/board-with-mobile-app-development.png", // Placeholder
    link: "https://taskflowpro.com",
    caseStudy: "How we achieved 99.9% uptime and scaled to 10k users in 3 months...",
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentProject = projects[currentIndex];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  React.useEffect(() => {
    if (isPaused || isModalOpen) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused, isModalOpen]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => {
    if (info.offset.x > 50) {
      handlePrev();
    } else if (info.offset.x < -50) {
      handleNext();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentProject.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="w-full py-24 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 font-app">Projects We&apos;ve Built</h2>
            <p className="text-neutral-400 text-2xl">Real platforms driving real results for our clients</p>
          </div>
          <Button
            variant="secondary"
            className="rounded-full px-6 gap-2 bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800"
          >
            <ExternalLink size={14} />
            Explore Further
          </Button>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 h-auto min-h-[520px] flex flex-col lg:flex-row relative transition-colors duration-300 hover:border-white/30">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                transition={{
                  x: { type: "spring", stiffness: 150, damping: 20, mass: 0.8 },
                  opacity: { duration: 0.4, ease: "easeInOut" },
                }}
                className="absolute inset-0 flex flex-col lg:flex-row w-full h-full"
              >
                {/* Left: Info */}
                <div className="w-full lg:w-[35%] p-6 md:p-8 flex flex-col justify-between z-10 bg-neutral-900">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 text-[10px] uppercase tracking-wider font-medium border border-neutral-700">
                        {currentProject.category}
                      </span>
                      <button
                        onClick={handleCopy}
                        className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 transition-colors"
                        title="Copy Link"
                      >
                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold mb-3">{currentProject.title}</h3>
                    <p className="text-sm text-neutral-400 mb-6 leading-relaxed line-clamp-3">
                      {currentProject.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-10">
                      {currentProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-neutral-800 rounded-md text-[10px] text-neutral-300 border border-neutral-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      {currentProject.stats.map((stat, idx) => (
                        <div key={idx}>
                          <div className="text-lg md:text-2xl font-bold text-white mb-1">{stat.value}</div>
                          <div className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-800 flex gap-3 mt-auto">
                    <Button
                      className="rounded-full px-4 py-3 h-auto bg-white text-black hover:bg-neutral-200 text-xs font-semibold flex-1"
                      asChild
                    >
                      <a href={currentProject.link} target="_blank" rel="noopener noreferrer">
                        Visit Website
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full px-4 py-3 h-auto border-neutral-700 text-white hover:bg-neutral-800 hover:text-white text-xs font-semibold bg-transparent flex-1"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Case Study
                    </Button>
                  </div>
                </div>

                {/* Right: Image */}
                <div className="w-full lg:w-[65%] relative h-[250px] lg:h-auto bg-neutral-800 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-neutral-900/20 z-10" />
                  <Image
                    src={currentProject.image}
                    alt={currentProject.title}
                    fill
                    className="object-screen"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border bg-neutral-800 border-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors text-white"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border bg-neutral-800 border-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors text-white"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Case Study Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4"
              >
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-y-auto pointer-events-auto shadow-2xl relative flex flex-col">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors z-10"
                  >
                    <X size={24} />
                  </button>

                  <div className="relative h-64 w-full shrink-0">
                    <Image src={currentProject.image} alt={currentProject.title} fill className="object-contain p-4" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
                    <div className="absolute bottom-6 left-8">
                      <span className="text-blue-400 font-medium mb-2 block">{currentProject.category}</span>
                      <h3 className="text-3xl font-bold text-white">{currentProject.title} Case Study</h3>
                    </div>
                  </div>

                  <div className="p-8 space-y-6">
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-3">Overview</h4>
                      <p className="text-neutral-400 leading-relaxed">{currentProject.caseStudy}</p>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-white mb-3">Key Results</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {currentProject.stats.map((stat, idx) => (
                          <div key={idx} className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-800">
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                            <div className="text-xs text-neutral-500 uppercase font-semibold mt-1">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-8 border-t border-neutral-800 mt-auto">
                    <Button
                      className="w-full rounded-xl py-6 text-lg font-semibold bg-white text-black hover:bg-neutral-200"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Close Case Study
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
