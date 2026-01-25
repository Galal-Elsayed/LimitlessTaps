"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/ui/header";
import { tabs, Project } from "./data";
import { ProjectsGrid } from "./ProjectsGrid";
import { CMSDashboards } from "./CMSDashboards";
import { ProjectModal } from "./ProjectModal";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Features = () => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Refs for GSAP animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);

  const activeProjects = useMemo(
    () => tabs.find((tab) => tab.id === activeTab)?.projects || [],
    [activeTab]
  );

  // Enhanced GSAP ScrollTrigger animations for all sections
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Header animation with ScrollTrigger
      if (headerRef.current) {
        const headerElements = headerRef.current.children;

        gsap.fromTo(
          headerElements,
          {
            opacity: 0,
            y: 100,
            rotateX: 15,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // Tabs section animation
      if (tabsRef.current) {
        gsap.fromTo(
          tabsRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: tabsRef.current,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Tab transition animation
  const handleTabChange = (tabId: string) => {
    if (tabId === activeTab) return;

    const currentTab = document.querySelector(`[data-tab="${activeTab}"]`);
    const newTab = document.querySelector(`[data-tab="${tabId}"]`);

    gsap.to(currentTab, {
      scale: 0.95,
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(newTab, {
      scale: 1.05,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(newTab, {
          scale: 1,
          duration: 0.2,
          ease: "power2.inOut",
        });
      },
    });

    setActiveTab(tabId);
  };

  return (
    <>
      {/* Hero Section with Grid Background */}
      <section ref={heroSectionRef} className="relative bg-[#0a0a0a] text-[#bfbfbf] w-full min-h-[100vh] flex items-start justify-start overflow-hidden">

        {/* Background Grid Layer - Only in Hero */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/work-hero-bg.svg"
            alt="Hero Background"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>

        {/* Overlay Content Layer */}
        <div className="relative z-10 w-full mx-auto h-screen p-10 max-w-[1800px] pointer-events-none flex flex-col justify-start pt-24 lg:pt-18">
          <div ref={headerRef} className="relative  flex flex-col justify-between  h-full">
            <Header
              title={
                  'Strengthen'
              }
              className="!text-[11vw] leading-[0.8] text-center w-full max-w-none font-medium uppercase tracking-[-0.02em] font-pop mb-8"
            />
            <div className="flex justify-between gap-2 ">
              <Header
              title={
                  'Your'
              }
              className="!text-[11vw]  text-center w-full max-w-none font-medium uppercase tracking-[-0.02em] font-pop mb-8"
            />
            <Header
              title={
                  'Strategy'
              }
              className="!text-[11vw]  text-center w-full max-w-none font-medium uppercase tracking-[-0.02em] font-pop mb-8"
            />
            </div>

            
          </div>
        </div>
      </section>

      {/* Projects Section - Separate from Hero */}
      <div ref={sectionRef} className="relative bg-[#0a0a0a] w-full py-10 px-6">

        {/* Tab Bar */}
        <div ref={tabsRef} className="flex justify-center">
          <div className="inline-flex items-center gap-1 p-1 bg-muted rounded-lg border border-border/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                data-tab={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-6 py-2 rounded-md font-medium text-sm transition-all duration-200 ${activeTab === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid or CMS Dashboards */}
        {activeTab === "CMS" ? (
            <CMSDashboards />
        ) : (
            <ProjectsGrid 
                projects={activeProjects} 
                activeTab={activeTab} 
                onProjectClick={setSelectedProject} 
            />
        )}
      </div>

      {/* Optimized Modal with Premium Design */}
      <AnimatePresence>
        {selectedProject && (
            <ProjectModal 
                project={selectedProject} 
                activeTab={activeTab}
                onClose={() => setSelectedProject(null)} 
            />
        )}
      </AnimatePresence>
    </>
  );
};

export default Features;
