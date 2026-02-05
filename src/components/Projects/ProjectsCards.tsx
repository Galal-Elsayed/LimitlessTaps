"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/ui/header";
import {
  ChevronRight,
  Globe,
  Smartphone,
  LayoutDashboard,
  X,
  ExternalLink,
  Monitor,
  Play,
  ChevronLeft,
  RefreshCw,
  Minus,
  Square,
  Lock,
} from "lucide-react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "motion/react";
import { PROJECTS, Category, Project } from "@/data/projects";
import Image from "next/image";
import { ProjectModal } from "./ProjectModal";
import { useTranslations } from "next-intl";

const TABS = [
  { id: "websites", icon: Globe },
  { id: "mobile_apps", icon: Smartphone },
  { id: "dashboards", icon: LayoutDashboard },
] as const;

function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    let animationFrameId: number;

    const waveData = Array.from({ length: 5 }).map(() => ({
      value: Math.random() * 0.5 + 0.1,
      targetValue: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.01 + 0.005,
    }));

    function resizeCanvas() {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }

    function updateWaveData() {
      waveData.forEach((data) => {
        if (Math.random() < 0.01) data.targetValue = Math.random() * 0.7 + 0.1;
        const diff = data.targetValue - data.value;
        data.value += diff * data.speed;
      });
    }

    function draw() {
      // Clear instead of filling black to allow background color to show through
      // if user wants strictly black, we can change this back. but component has bg-[#0a0a0a]
      ctx!.fillStyle = "#0a0a0a";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      waveData.forEach((data, i) => {
        const freq = data.value * 7;
        ctx!.beginPath();
        // Optimization: Increase step size to reduce number of line segments
        for (let x = 0; x < canvas!.width; x += 5) {
          const nx = (x / canvas!.width) * 2 - 1;
          const px = nx + i * 0.04 + freq * 0.03;
          const py =
            Math.sin(px * 10 + time) *
            Math.cos(px * 2) *
            freq *
            0.1 *
            ((i + 1) / 8);

          // Scale y to be more subtle if needed, currently full section height
          const y = ((py + 1) * canvas!.height) / 2;
          if (x === 0) {
            ctx!.moveTo(x, y);
          } else {
            ctx!.lineTo(x, y);
          }
        }

        // Using strict #868686 (RGB: 134, 134, 134)
        const val = 134;

        ctx!.lineWidth = 1 + i * 0.3;
        ctx!.strokeStyle = `rgba(${val},${val},${val},0.6)`;
        ctx!.shadowColor = `rgba(${val},${val},${val},0.5)`;
        ctx!.shadowBlur = 5;
        ctx!.stroke();
        ctx!.shadowBlur = 0;
      });
    }

    function animate() {
      time += 0.01;
      updateWaveData();
      draw();
      animationFrameId = requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
}


// PERFORMANCE: Slide variants (only x and opacity - GPU accelerated)
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  })
};

const carouselSpring = { type: "spring" as const, stiffness: 200, damping: 28 };

function DashboardCarousel({ items }: { items: Project[] }) {
  const t = useTranslations("projects");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  // RTL detection via dir attribute or just assume LTR for now as useLocale hook usage might need import
  // But we can just use direction logic.
  // Let's import useLocale if not present or just check document dir?
  // ProjectsCards uses useTranslations. I'll add locale prop or hook.
  // For now simplistic.

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = items.length - 1;
      if (nextIndex >= items.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const activeItem = items[currentIndex];

  if (!activeItem) return null;

  return (
    <div className="w-full flex items-center justify-center relative min-h-[60vh] md:min-h-[70vh] max-w-[1600px] mx-auto">
      {/* Previous Arrow - only show if more than 1 item */}
      {items.length > 1 && (
        <button
          onClick={() => paginate(-1)}
          className="hidden md:flex absolute -left-4 lg:-left-8 xl:-left-16 z-20 w-12 h-12 items-center justify-center rounded-full bg-white border border-neutral-200 text-black hover:bg-neutral-200 hover:text-black active:scale-95 transition-transform"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Next Arrow - only show if more than 1 item */}
      {items.length > 1 && (
        <button
          onClick={() => paginate(1)}
          className="hidden md:flex absolute -right-4 lg:-right-8 xl:-right-16 z-20 w-12 h-12 items-center justify-center rounded-full bg-white border border-neutral-200 text-black hover:bg-neutral-200 hover:text-black active:scale-95 transition-transform"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Content Container */}
      <div className="w-full h-full relative flex items-center justify-center px-4 md:px-16 lg:px-20">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <m.div
            key={activeItem.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={carouselSpring}
            className="w-full flex justify-center"
            style={{ willChange: "transform, opacity" }}
          >
            <DashboardItem project={activeItem} t={t} />
          </m.div>
        </AnimatePresence>
      </div>

      {/* Mobile Navigation (Bottom) - only show if more than 1 item */}
      {items.length > 1 && (
        <div className="absolute -bottom-12 flex md:hidden gap-10 items-center z-20 pb-8" dir="ltr">
          <button
            onClick={() => paginate(-1)}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-white border border-neutral-200 text-black active:scale-95 transition-transform shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="text-base font-mono text-neutral-400 font-medium">
            {currentIndex + 1} / {items.length}
          </div>
          <button
            onClick={() => paginate(1)}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-white border border-neutral-200 text-black active:scale-95 transition-transform shadow-lg"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}

function DashboardItem({ project, t }: { project: Project; t: any }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Simplified resize observer for desktop scaling look
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width > 0) {
          setScale(width / 2000);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Ensure we check for the translated value or fallback to the project data
  const title = t(`items.${project.id}.title`) !== `items.${project.id}.title` ? t(`items.${project.id}.title`) : project.title;
  const description = t(`items.${project.id}.description`) !== `items.${project.id}.description` ? t(`items.${project.id}.description`) : project.description;

  return (
    <div className="w-full flex flex-col items-center transition-all duration-500 ease-in-out">
      {/* Window Container */}
      <div className="relative w-full flex justify-center transition-all duration-500 ease-in-out">
        <div
          dir="ltr"
          className="w-full max-w-[1400px] h-[65vh] rounded-t-2xl border border-white/10 border-b-0 shadow-[0_0_50px_-5px_rgba(255,255,255,0.15)] contain-layout contain-paint transition-all duration-500 ease-in-out"
        >
          {/* Safari Header */}
          <div className="bg-[#333] flex items-end justify-between px-4 border-b border-black/20 select-none relative w-full overflow-hidden h-12 opacity-100">
            <div className="absolute top-3.5 left-4 flex gap-4 text-neutral-400 items-center z-10">
              <div className="flex gap-2">
                <ChevronLeft size={16} />
                <ChevronRight size={16} />
              </div>
              <RefreshCw size={14} />
            </div>
            <div className="flex-1 flex items-end justify-center px-20 h-full">
              <div className="relative w-full max-w-lg h-[34px] bg-[#222] rounded-t-lg flex items-center justify-center px-4 -mb-px">
                <div className="flex items-center gap-2 text-[11px] text-neutral-300 font-medium">
                  <Lock size={10} className="text-neutral-500" />
                  <span>limitless.studio/{project.title.toLowerCase()}</span>
                </div>
                <X size={12} className="absolute right-3 text-neutral-500" />
              </div>
            </div>
            <div className="absolute top-3.5 right-4 flex gap-4 text-neutral-400 items-center">
              <Minus size={16} />
              <Square size={14} />
              <X size={16} />
            </div>
          </div>

          {/* Content */}
          <div ref={containerRef} className="relative w-full h-full bg-[#111] overflow-hidden">
            {isPlaying ? (
              <div
                style={{
                  width: "2000px",
                  height: `${100 / scale}%`,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
                className="w-full h-full"
              >
                <iframe
                  src={project.link || ""}
                  className="w-full h-full bg-white"
                  title={project.title}
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="w-full h-full relative bg-neutral-900 group">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                    <h3 className="text-6xl md:text-8xl font-black text-white/5 uppercase tracking-tighter select-none transform rotate-[-15deg] scale-150">{project.title}</h3>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="bg-[#222] border border-white/10 relative z-20 flex transition-all duration-500 ease-in-out w-full max-w-[1400px] rounded-b-2xl border-t-0 p-5 flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[0_20px_50px_-5px_rgba(255,255,255,0.15)]">
        <div className="flex flex-col gap-3 max-w-2xl">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <span className="text-[10px] uppercase font-bold tracking-wider text-black bg-white px-2 py-0.5 rounded-sm">
              {t(`items.${project.id}.highlight`) !== `items.${project.id}.highlight` ? t(`items.${project.id}.highlight`) : project.highlight}
            </span>
          </div>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed line-clamp-2">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags?.map(tag => (
              <span key={tag} className="text-xs font-mono text-neutral-500 bg-neutral-900 border border-white/5 px-2 py-1 rounded-md">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => setIsPlaying(prev => !prev)}
          className={cn(
            "group relative rounded-full font-bold text-sm overflow-hidden shrink-0 transition-colors duration-150 px-8 py-3 w-full md:w-auto",
            isPlaying
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-white text-black hover:bg-neutral-200"
          )}
        >
          <div className="relative z-10 flex items-center justify-center gap-2">
            {isPlaying ? (
              <>{t("card.stopDemo")}</>
            ) : (
              <>
                <Play size={16} fill="currentColor" />
                {t("card.viewLiveDemo")}
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}

export default function ProjectsCards() {
  const t = useTranslations("projects");
  const [activeTab, setActiveTab] = useState<Category>("websites");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter((p) => p.category === activeTab);

  // Limiting mobile apps to 3 items as per "only 1 row" interpretation
  const displayProjects =
    activeTab === "mobile_apps"
      ? filteredProjects.slice(0, 3)
      : filteredProjects;

  return (
    <section className="min-h-screen bg-[#0a0a0a] py-12 pb-32 relative overflow-hidden flex flex-col items-center">
      {/* Wave Visualizer Background */}

      {/* Header Section */}
      <div className="w-full max-w-7xl mx-auto mb-16 px-4 text-center z-10 relative">
        <Header
          title={t("header.title")}
          className="font-app text-xl md:text-2xl lg:text-7xl mb-4 tracking-tight"
        />
        <p className="text-neutral-400 text-base md:text-xl max-w-2xl mx-auto">
          {t("header.description")}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-16 z-10 px-4 relative">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Category)}
            className={cn(
              "px-6 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 border flex items-center gap-2",
              activeTab === tab.id
                ? "bg-white text-black border-white shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                : "bg-neutral-900/50 text-neutral-400 border-white/10 hover:border-white/30 hover:text-white hover:bg-neutral-900",
            )}
          >
            <tab.icon className="w-4 h-4" />
            {t(`tabs.${tab.id}`)}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <div className="w-full relative">
        <WaveCanvas />
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div
            className={cn(
              "grid gap-6 md:gap-8",
              // Mobile Apps layout adjustment: Force 3 columns on tablet+ to keep 1 row
              activeTab === "mobile_apps"
                ? "grid-cols-1 md:grid-cols-3"
                : activeTab === "dashboards" // Dashboards use carousel, so single column/full width
                  ? "grid-cols-1"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {activeTab === "dashboards" ? (
              <LazyMotion features={domAnimation}>
                <DashboardCarousel items={filteredProjects} />
              </LazyMotion>
            ) : (
              displayProjects.map((project) =>
                activeTab === "mobile_apps" ? (
                  <MobileProjectCard key={project.id} project={project} />
                ) : (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpen={() => setSelectedProject(project)}
                  />
                )
              )
            )}
          </div>
        </div>
      </div>
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

function MobileProjectCard({ project }: { project: Project }) {
  const t = useTranslations("projects");
  // Recreating the Mobile Phone aesthetic from the original file
  return (
    <div className="flex flex-col items-center w-full">
      {/* Phone Frame - Adjusted Width/Height for better proportion */}
      <div className="relative w-[280px] h-[580px] bg-[#222] rounded-[36px] border-[6px] border-[#1a1a1a] shadow-xl overflow-hidden mx-auto transition-transform duration-300 hover:-translate-y-2">
        {/* Mobile Notch & Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-7 z-20 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#1a1a1a] rounded-b-[1rem] flex items-center justify-center">
            <div className="w-16 h-2 bg-black/50 rounded-full" />
          </div>
        </div>

        {/* Screen Content */}
        <div className="w-full h-full relative bg-neutral-900">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                <Smartphone className="w-8 h-8 text-neutral-400" />
              </div>
              <h4 className="text-white font-bold text-lg mb-1">
                {project.title}
              </h4>
              <p className="text-neutral-500 text-xs">
                {project.description}
              </p>
            </div>
          )}

          {/* Gradient Overlay at bottom for text readability if image exists */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

          {/* Info Box with Title & Description */}
          <div className="absolute bottom-20 left-4 right-4 text-white z-10 group">
            <div className="bg-black/40 backdrop-blur-sm p-3 rounded-xl border border-white/5 transition-colors duration-300 group-hover:bg-black/60 group-hover:border-white/10">
              <h4 className="font-bold text-base mb-1">
                {t(`items.${project.id}.title`)}
              </h4>
              <p className="text-[11px] text-neutral-300 line-clamp-2">
                {t(`items.${project.id}.description`)}
              </p>
            </div>
          </div>

          {/* Store Links */}
          {(project.playStoreLink || project.appStoreLink) && (
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 z-10">
              {project.appStoreLink && (
                <a
                  href={project.appStoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-lg py-2.5 px-3 transition-colors"
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <span className="text-white text-xs font-medium">{t("card.appStore")}</span>
                </a>
              )}
              {project.playStoreLink && (
                <a
                  href={project.playStoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-lg py-2.5 px-3 transition-colors"
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <span className="text-white text-xs font-medium">{t("card.playStore")}</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const t = useTranslations("projects");
  return (
    <div className="w-full group">
      {/* Card Container mimicking SchemaCard style */}
      <div className="relative overflow-hidden rounded-2xl flex flex-col bg-neutral-900/80 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl">
        {/* Image Area with "Visualizer" effect */}
        <div className="p-4 flex justify-center relative">
          <div className="w-full h-48 rounded-xl overflow-hidden relative border border-white/10 bg-neutral-950/50 group-hover:border-white/20 transition-colors duration-500">
            {/* Image Placeholder Container */}
            <div className="absolute inset-0 bg-transparent group-hover:scale-105 transition-transform duration-700 ease-out">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-neutral-800/50">
                  <Globe className="w-12 h-12 text-neutral-700 group-hover:text-neutral-600 transition-colors" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

        {/* Content */}
        <div className="p-5">
          <span className="inline-block px-3 py-1 bg-white/5 text-neutral-300 rounded-full text-[10px] font-medium mb-3 border border-white/10 tracking-wider uppercase">
            {t(`items.${project.id}.highlight`)}
          </span>
          <h3 className="text-xl font-medium text-white mb-2 group-hover:text-white transition-colors">
            {t(`items.${project.id}.title`)}
          </h3>
          <p className="text-neutral-400 mb-5 leading-relaxed text-xs h-10 line-clamp-2">
            {t(`items.${project.id}.description`)}
          </p>

          <div className="flex justify-between items-center mt-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
              className="text-white hover:text-neutral-300 transition flex items-center text-xs font-medium bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10 group/btn"
            >
              {t("card.viewDetails")}
              <ChevronRight className="w-3 h-3 ml-1 rtl:rotate-180 transform group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5 transition-transform" />
            </button>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-black hover:text-neutral-800 transition flex items-center text-xs font-bold bg-white hover:bg-neutral-200 px-4 py-2 rounded-lg group/launch"
              >
                {t("card.launch")}
                <ExternalLink className="w-3 h-3 ml-1.5 opacity-70 group-hover/launch:opacity-100 transition-opacity" />
              </a>
            )}
            {!project.link && (
              <span className="text-white/30 text-[10px] uppercase tracking-widest border border-white/5 px-2 py-1 rounded-md">
                {project.status}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
