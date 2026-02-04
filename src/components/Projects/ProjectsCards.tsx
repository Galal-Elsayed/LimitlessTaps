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
} from "lucide-react";
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
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {displayProjects.map((project) =>
              activeTab === "mobile_apps" ? (
                <MobileProjectCard key={project.id} project={project} />
              ) : (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={() => setSelectedProject(project)}
                />
              ),
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
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                <Smartphone className="w-8 h-8 text-neutral-400" />
              </div>
              <h4 className="text-white font-bold text-lg mb-1">
                {t(`items.${project.id}.title`)}
              </h4>
              <p className="text-neutral-500 text-xs">
                {t(`items.${project.id}.description`)}
              </p>
            </div>
          )}

          {/* Gradient Overlay at bottom for text readability if image exists */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

          <div className="absolute bottom-6 left-6 right-6 text-white p-4 rounded-xl backdrop-blur-md bg-white/10 border border-white/10">
            <h4 className="font-bold text-sm mb-0.5">
              {t(`items.${project.id}.title`)}
            </h4>
            <p className="text-[10px] text-neutral-300 line-clamp-1">
              {t(`items.${project.id}.description`)}
            </p>
          </div>
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
              <ChevronRight className="w-3 h-3 ml-1 transform group-hover/btn:translate-x-0.5 transition-transform" />
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
