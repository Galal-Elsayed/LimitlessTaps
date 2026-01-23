"use client";

import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamically import dashboards to avoid SSR issues
const Dashboard3 = dynamic(() => import("./Dashboard3"), { ssr: false });
const Dashboard4 = dynamic(() => import("./Dashboard4"), { ssr: false });

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Type definitions
type Project = {
  id: string;
  category: string;
  title: string;
  details: string;
  tutorialLink: string;
  mainImage: string;
  gallery: string[];
  technologies: string[];
  client: string;
  year: string;
  description: string;
  displayUrl?: string;
};

type TabConfig = {
  id: string;
  label: string;
  projects: Project[];
};

// Mock data for mobile projects
const mobileProjects: Project[] = [
  {
    id: "mobile-1",
    category: "E-Commerce App",
    title: "Shop & Ship Mobile",
    details:
      "A seamless shopping experience with intuitive navigation, personalized recommendations, and secure checkout process.",
    tutorialLink: "#",
    mainImage: "/Work/mobile/shop&ship1.webp",
    gallery: [
      "/Work/mobile/shop&ship1.webp",
      "/Work/mobile/shop&ship2.webp",
      "/Work/mobile/shop&ship3.webp",
      "/Work/mobile/shop&ship4.webp",
    ],
    technologies: ["React Native", "TypeScript", "Redux", "Firebase"],
    client: "RetailCo",
    year: "2024",
    description:
      "A comprehensive mobile shopping platform that revolutionizes the retail experience with AI-powered recommendations and seamless payment integration.",
  },
  {
    id: "mobile-2",
    category: "Logistics",
    title: "Blueworks",
    details:
      "Track your fitness goals, monitor health metrics, and get personalized workout plans tailored to your lifestyle.",
    tutorialLink: "#",
    mainImage: "/Work/mobile/bluworks1.webp",
    gallery: [
      "/Work/mobile/bluworks1.webp",
      "/Work/mobile/bluworks2.webp",
      "/Work/mobile/bluworks3.webp",
      "/Work/mobile/bluworks4.webp",
    ],
    technologies: ["Flutter", "Dart", "HealthKit", "Google Fit"],
    client: "FitLife Inc",
    year: "2024",
    description:
      "An all-in-one fitness tracking application that helps users achieve their health goals through personalized insights and community support.",
  },
  {
    id: "mobile-3",
    category: "Fintech",
    title: "Tecfy",
    details:
      "Stay connected with friends and family through instant messaging, photo sharing, and real-time updates.",
    tutorialLink: "#",
    mainImage: "/Work/mobile/Tecfy1.webp",
    gallery: [
      "/Work/mobile/Tecfy1.webp",
      "/Work/mobile/Tecfy2.webp",
    ],
    technologies: ["Swift", "SwiftUI", "Firebase", "WebRTC"],
    client: "SocialHub",
    year: "2023",
    description:
      "A modern social networking platform that emphasizes privacy and meaningful connections through innovative features.",
  },
  {
    id: "mobile-4",
    category: "Lifestyle",
    title: "Vibe Messenger",
    details: "Universal communication platform for teams and personal connections.",
    tutorialLink: "#",
    mainImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop",
    ],
    technologies: ["React Native", "Node.js", "Socket.io"],
    client: "VibeTech",
    year: "2024",
    description: "A secure and fast messaging application designed for large-scale enterprise communication and social interaction.",
  },
];

// Mock data for web projects
const webProjects: Project[] = [
  {
    id: "web-1",
    category: "E-Commerce",
    title: "KFrame Store",
    details:
      "Modern e-commerce platform with seamless shopping experience and secure payment integration.",
    tutorialLink: "#",
    mainImage: "/Work/web/kframe long.jpg",
    gallery: [
      "/Work/web/kframe1.png",
      "/Work/web/kframe2.png",
      "/Work/web/kframe3.png",
    ],
    technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    client: "KFrame",
    year: "2024",
    description:
      "A comprehensive e-commerce solution featuring advanced product filtering, real-time inventory management, and seamless checkout experience.",
    displayUrl: "kframeagency.com",
  },
  {
    id: "web-2",
    category: "E-Commerce",
    title: "SOGC Store",
    details:
      "Premium online shopping destination with curated collections and personalized recommendations.",
    tutorialLink: "#",
    mainImage: "/Work/web/sogc long.jpg",
    gallery: [
      "/Work/web/sogc1.png",
      "/Work/web/sogc2.png",
      "/Work/web/sogc3.png",
      "/Work/web/sogc4.png",
    ],
    technologies: ["React", "Node.js", "MongoDB", "Redux"],
    client: "SOGC",
    year: "2024",
    description:
      "An innovative e-commerce platform that delivers exceptional shopping experiences through AI-powered recommendations and intuitive design.",
    displayUrl: "sogc-construction.com",
  },
  {
    id: "web-3",
    category: "E-Commerce",
    title: "Power Store",
    details: "High-performance e-commerce platform for sports and energy products.",
    tutorialLink: "#",
    mainImage: "/Work/web/power long.jpg",
    gallery: [
      "/Work/web/power1.png",
      "/Work/web/power2.png",
      "/Work/web/power3.png",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Shopify"],
    client: "Power Energy",
    year: "2024",
    description: "A robust and scalable e-commerce solution designed for high-traffic energy drink and fitness supplement sales.",
    displayUrl: "power-energy.com",
  },
  {
    id: "web-4",
    category: "Dashboard",
    title: "OmniAnalytics",
    details: "Universal data visualization platform for enterprise metrics.",
    tutorialLink: "#",
    mainImage: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=800&auto=format&fit=crop",
    ],
    technologies: ["Vue.js", "D3.js", "Firebase"],
    client: "DataCorp",
    year: "2024",
    description: "A centralized dashboard that aggregates data from multiple sources to provide real-time business intelligence.",
    displayUrl: "omnianalytics.ai",
  },
];

// Mock data for Costume Solutions projects
const costumeSolutionsProjects: Project[] = [
  {
    id: "costume-1",
    category: "Fashion Tech",
    title: "TailorMade AI",
    details: "AI-powered body measurement and suit customization platform for bespoke tailoring.",
    tutorialLink: "#",
    mainImage: "https://images.unsplash.com/photo-1594932224010-75b2a77afca0?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1594932224010-75b2a77afca0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=800&auto=format&fit=crop",
    ],
    technologies: ["React", "Python", "Computer Vision", "AWS"],
    client: "Bespoke World",
    year: "2024",
    description: "A revolutionary platform that uses computer vision to take accurate body measurements from photos, allowing users to order perfectly fitted suits online.",
  },
  {
    id: "costume-2",
    category: "E-Commerce",
    title: "FabricSync",
    details: "B2B marketplace for connecting fashion designers with sustainable fabric manufacturers.",
    tutorialLink: "#",
    mainImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
    ],
    technologies: ["Next.js", "Node.js", "GraphQL", "Stripe"],
    client: "EcoFashion Global",
    year: "2023",
    description: "FabricSync simplifies the sourcing process for independent designers, focusing on sustainable and ethically produced textiles with real-time inventory tracking.",
  },
  {
    id: "costume-3",
    category: "Costume Design",
    title: "Virtual Fitting Room",
    details: "AR-based fitting room for trying on virtual costumes in real-time.",
    tutorialLink: "#",
    mainImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop",
    ],
    technologies: ["ARCore", "Unity", "React"],
    client: "V-Style",
    year: "2024",
    description: "An innovative mobile application that allows users to try on digital assets and costumes using augmented reality.",
  },
  {
    id: "costume-4",
    category: "Supply Chain",
    title: "ThreadTrack",
    details: "Blockchain-based supply chain management for the textile industry.",
    tutorialLink: "#",
    mainImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
    ],
    technologies: ["Ethereum", "Solidity", "Node.js"],
    client: "TextileHub",
    year: "2024",
    description: "Ensuring transparency and traceability in the fashion supply chain using distributed ledger technology.",
  },
];

// Mock data for CMS projects
const CMSProjects: Project[] = [
  {
    id: "CMS-1",
    category: "SaaS",
    title: "Pulse CMS Dashboard",
    details: "Next-gen customer relationship management with integrated real-time communication.",
    tutorialLink: "#",
    mainImage: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
    ],
    technologies: ["React", "Go", "Socket.io", "PostgreSQL"],
    client: "GrowthStream",
    year: "2024",
    description: "Pulse CMS centralizes user interactions, featuring a real-time dashboard that tracks customer health and provides AI-driven sentiment analysis.",
  },
  {
    id: "CMS-2",
    category: "Enterprise",
    title: "OmniLink Support Hub",
    details: "Unified support platform that connects email, social media, and chat in one interface.",
    tutorialLink: "#",
    mainImage: "https://images.unsplash.com/photo-1556761175-4b46a572b776?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1556761175-4b46a572b776?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop",
    ],
    technologies: ["Vue.js", "NestJS", "Redis", "ElasticSearch"],
    client: "GlobalConnect",
    year: "2023",
    description: "A large-scale support solution for multi-national corporations, enabling support agents to manage thousands of cross-channel tickets efficiently.",
  },
  {
    id: "CMS-3",
    category: "Publishing",
    title: "NewsFlow CMS",
    details: "High-traffic content management for digital news outlets.",
    tutorialLink: "#",
    mainImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    ],
    technologies: ["Next.js", "Supabase", "Vercel"],
    client: "NewsWorld",
    year: "2024",
    description: "A headless CMS architecture designed for lightning-fast content delivery and seamless editorial workflows.",
  },
  {
    id: "CMS-4",
    category: "Education",
    title: "EduLink Portal",
    details: "Centralized learning management system for universities.",
    tutorialLink: "#",
    mainImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    ],
    technologies: ["React", "Express", "PostgreSQL"],
    client: "UniTech",
    year: "2024",
    description: "A comprehensive platform for course management, student engagement, and academic tracking.",
  },
];

// Tab configuration - easily extensible
const tabs: TabConfig[] = [
  { id: "web", label: "Web", projects: webProjects },
  { id: "mobile", label: "Mobile", projects: mobileProjects },
  { id: "costume-solutions", label: "Costume Solutions", projects: costumeSolutionsProjects },
  { id: "CMS", label: "CMS", projects: [] }, // CMS tab renders dashboards specially
  // { id: "desktop", label: "Desktop", projects: desktopProjects },
];

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position
      } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position
      } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position
      } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-white"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

const Features = () => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // Track current image index for each mobile project in grid view
  const [projectImageIndexes, setProjectImageIndexes] = useState<Record<string, number>>({});
  // Mobile view toggle for CMS dashboards in modal
  const [showMobileView, setShowMobileView] = useState(false);

  // Refs for GSAP animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
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

      // Projects section - staggered entrance
      if (projectsRef.current) {
        const projectCards = projectsRef.current.querySelectorAll('.project-card');

        // Set initial state
        gsap.set(projectCards, {
          opacity: 1,
          scale: 1,
          rotateY: 0,
        });

        // Create ScrollTrigger animation
        gsap.from(projectCards, {
          opacity: 0,
          scale: 0.9,
          rotateY: 5,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        });

        // Parallax effect on scroll for project cards (separate from entrance animation)
        projectCards.forEach((card) => {
          gsap.to(card, {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Animate projects on tab change
  useEffect(() => {
    if (!projectsRef.current) return;

    const projects = projectsRef.current.children;

    const ctx = gsap.context(() => {
      // Animate out old projects then animate in new ones
      gsap.fromTo(
        projects,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
          rotateY: 8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: {
            each: 0.12,
            from: "start",
          },
          ease: "power3.out",
          clearProps: "transform",
        }
      );
    }, projectsRef);

    return () => ctx.revert();
  }, [activeProjects]);

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

  // Modal animations
  const openModal = (project: Project) => {
    setSelectedProject(project);

    // Animate modal entrance
    gsap.fromTo(
      modalRef.current,
      {
        opacity: 0,
        scale: 0.9,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
      }
    );

    // Animate modal content
    gsap.fromTo(
      ".modal-content > *",
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        delay: 0.2,
        ease: "power2.out",
      }
    );
  };

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setSelectedProject(null);
        setSelectedImageIndex(0);
      },
    });
  };

  // Handle gallery image change with animation
  const handleImageChange = (index: number) => {
    if (index === selectedImageIndex) return;

    const mainImage = document.querySelector(".modal-main-image");

    gsap.to(mainImage, {
      opacity: 0,
      scale: 0.95,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setSelectedImageIndex(index);
        gsap.fromTo(
          mainImage,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
        );
      },
    });
  };

  // Work-related words for the grid


  return (
    <>
      {/* Hero Section with Grid Background */}
      <section ref={heroSectionRef} className="relative bg-[#0a0a0a] text-[#bfbfbf] w-full min-h-[100vh] flex items-start justify-start overflow-hidden">

        {/* Background Grid Layer - Only in Hero */}
        <div className="absolute inset-0 z-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>

        {/* Overlay Content Layer */}
        <div className="relative z-10 w-full max-w-[1800px] pointer-events-none flex flex-col justify-start pt-24 lg:pt-18">
          <div ref={headerRef} className="relative">
            <h2 className="text-[10vw] leading-[0.8] font-medium uppercase tracking-[-0.02em] font-pop text-white/90 mix-blend-difference mb-8">
              Strengthen
              <br />
              Your
              <br />
              Strategy
            </h2>

            <p className="text-white/80 text-lg md:text-xl max-w-xl font-light leading-relaxed pl-2 pointer-events-auto">
              Enhance your strategy with intelligent tools designed for success.
            </p>
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

        {/* Projects Grid - Modern Design */}
        <div ref={projectsRef} className={`mt-8 md:mt-16 w-full mx-auto grid grid-cols-1 gap-6 ${
          activeTab === 'mobile' ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {activeProjects.map((project) => (
            <div
              key={project.id}
              className="project-card group cursor-pointer"
              onClick={() => openModal(project)}
            >
              {/* Mobile projects use iPhone frame */}
              {project.id.includes('mobile') ? (
                // Full Frame for mobile projects with image carousel
                <div className="relative rounded-[2.5rem] bg-black border-[3px] border-[#2a2a2a] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_25px_50px_rgba(0,0,0,0.6)] group-hover:translate-y-[-4px] w-full max-w-[280px] mx-auto h-[550px]">
                  {/* iPhone Side Buttons */}
                  <div className="absolute left-[-6px] top-[70px] w-[3px] h-[28px] bg-gray-500 rounded-l-sm" />
                  <div className="absolute left-[-6px] top-[130px] w-[3px] h-[28px] bg-gray-500 rounded-l-sm" />
                  <div className="absolute left-[-6px] top-[170px] w-[3px] h-[28px] bg-gray-500 rounded-l-sm" />
                  <div className="absolute right-[-6px] top-[140px] w-[3px] h-[60px] bg-gray-500 rounded-r-sm" />

                  {/* iPhone Notch */}
                  <div className="absolute top-0 left-0 right-0 h-10 z-20 flex justify-center items-start pt-1">
                    <div className="w-25 h-7 bg-black rounded-[1.25rem] border border-x border-white/5 flex items-center justify-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#1a1a3a] ring-1 ring-white/10" />
                      <div className="w-12 h-1.5 bg-[#0a0a0a] rounded-full" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-20" />

                  {/* Overlay with info */}
                  <div className="absolute inset-0 bg-linear-to-t rounded-[2.5rem] from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 flex flex-col justify-end p-6">
                    <span className="text-white/60 text-xs font-bold uppercase tracking-[0.2em]">
                      {project.category}
                    </span>
                    <h3 className="text-white text-xl font-bold mt-1">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-sm mt-2 line-clamp-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {project.details}
                    </p>
                  </div>

                  {/* Mobile Screen Content with Carousel */}
                  <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
                    <Image
                      src={project.gallery[projectImageIndexes[project.id] || 0]}
                      alt={project.title}
                      width={800}
                      height={2000}
                      className="w-full h-full object-cover object-top transition-opacity duration-300"
                    />

                    {/* Navigation Buttons */}
                    {project.gallery.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const currentIndex = projectImageIndexes[project.id] || 0;
                            const newIndex = currentIndex === 0 ? project.gallery.length - 1 : currentIndex - 1;
                            setProjectImageIndexes(prev => ({ ...prev, [project.id]: newIndex }));
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 hover:bg-black/80 transition-all text-white z-30 duration-300 opacity-0 group-hover:opacity-100"
                          aria-label="Previous image"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>

                        <div className="absolute top-12 left-1/2 -translate-x-1/2 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-white text-xs z-30 opacity-0 duration-300 group-hover:opacity-100 transition-opacity">
                          {(projectImageIndexes[project.id] || 0) + 1} / {project.gallery.length}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const currentIndex = projectImageIndexes[project.id] || 0;
                            const newIndex = (currentIndex + 1) % project.gallery.length;
                            setProjectImageIndexes(prev => ({ ...prev, [project.id]: newIndex }));
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 hover:bg-black/80 transition-all text-white z-30 duration-300 opacity-0 group-hover:opacity-100"
                          aria-label="Next image"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Title below */}
                  <div className="mt-4 px-2">
                    <h4 className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">{project.category}</p>
                  </div>
                </div>
              ) : (
                /* Modern Premium Card for Web & Costume Solutions */
                <motion.div 
                  className="relative h-full min-h-[500px] rounded-2xl overflow-hidden bg-linear-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#0a0a0a] border border-white/10 group-hover:border-orange-500/30 transition-all duration-500"
                  whileHover={{ y: -8 }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Image Container with Parallax Effect */}
                  <div className="relative h-64 overflow-hidden">
                    {/* Gradient Border Top */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out">
                      <Image
                        src={project.mainImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-semibold text-orange-500 uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>

                    {/* URL Badge (if exists) */}
                    {project.displayUrl && (
                      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-xs text-white/80 font-medium">{project.displayUrl}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="relative p-6 space-y-4">
                    {/* Title & Description */}
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-orange-500 group-hover:to-purple-500 transition-all duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed line-clamp-2 group-hover:text-white/80 transition-colors">
                        {project.details}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-white/70 hover:text-white transition-all duration-300 hover:scale-105"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-lg text-xs font-medium text-orange-500">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-4 text-xs text-white/50">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>{project.client}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{project.year}</span>
                        </div>
                      </div>

                      {/* View Project Arrow */}
                      <div className="flex items-center gap-2 text-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <span className="text-sm font-semibold">View</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/5 to-transparent" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* CMS Tab - Dashboard Showcases */}
        {activeTab === "CMS" && (
          <div className="mt-6 md:mt-16 flex flex-col gap-4 md:gap-6">
            {/* Dashboard 3 - Browser Window */}
            <div className="rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)] md:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
              {/* Browser Header - macOS Style */}
              <div className="h-8 md:h-10 bg-[#1e1e1e] border-b border-white/5 flex items-center px-2 md:px-4 gap-2 md:gap-3">
                {/* Traffic Light Buttons */}
                <div className="flex gap-1.5 md:gap-2 shrink-0">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27c93f]" />
                </div>
                {/* URL Bar */}
                <div className="flex-1 max-w-md h-5 md:h-6 bg-[#2a2a2a] rounded-md border border-white/5 flex items-center px-2 md:px-3 gap-1.5 md:gap-2 overflow-hidden">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                    <div className="w-0.5 h-0.5 md:w-1 md:h-1 bg-white/40 rounded-full" />
                  </div>
                  <span className="text-[10px] md:text-[11px] text-white/50 font-medium truncate select-none">
                    dashboard-analytics.io
                  </span>
                </div>
              </div>
              {/* Dashboard Content - Responsive height */}
              <div className="max-h-[60vh] md:max-h-[70vh] overflow-y-auto overflow-x-hidden bg-[#0a0a0a] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                <div className="md:scale-100 scale-[0.8] origin-top-left md:w-full w-[120%]">
                  <Dashboard3 />
                </div>
              </div>
            </div>

            {/* Dashboard 4 - Browser Window */}
            <div className="rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)] md:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
              {/* Browser Header - macOS Style */}
              <div className="h-8 md:h-10 bg-[#1e1e1e] border-b border-white/5 flex items-center px-2 md:px-4 gap-2 md:gap-3">
                {/* Traffic Light Buttons */}
                <div className="flex gap-1.5 md:gap-2 shrink-0">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27c93f]" />
                </div>
                {/* URL Bar */}
                <div className="flex-1 max-w-md h-5 md:h-6 bg-[#2a2a2a] rounded-md border border-white/5 flex items-center px-2 md:px-3 gap-1.5 md:gap-2 overflow-hidden">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                    <div className="w-0.5 h-0.5 md:w-1 md:h-1 bg-white/40 rounded-full" />
                  </div>
                  <span className="text-[10px] md:text-[11px] text-white/50 font-medium truncate select-none">
                    enterprise-cms.app
                  </span>
                </div>
              </div>
              {/* Dashboard Content - Responsive height */}
              <div className="max-h-[60vh] md:max-h-[70vh] overflow-y-auto overflow-x-hidden bg-[#0a0a0a] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                <div className="md:scale-100 scale-[0.8] origin-top-left md:w-full w-[120%]">
                  <Dashboard4 />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Optimized Modal with Premium Design */}
      {selectedProject && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="modal-content bg-linear-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#0a0a0a] rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden relative border border-white/10 shadow-[0_0_80px_rgba(255,127,0,0.15)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-orange-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-30 p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 group"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="overflow-y-auto max-h-[95vh] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
              {/* Header Section with Gradient */}
              <div className="relative p-8 pb-6 border-b border-white/5">
                <div className="absolute inset-0 bg-linear-to-b from-orange-500/5 to-transparent" />
                <div className="relative">
                  <span className="inline-block px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-xs font-semibold text-orange-500 uppercase tracking-wider mb-4">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white via-white to-white/80 leading-tight">
                    {selectedProject.title}
                  </h2>
                  <p className="text-white/60 mt-3 text-lg leading-relaxed max-w-3xl">
                    {selectedProject.description}
                  </p>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-8 space-y-8">
                {/* Mobile/Desktop Toggle for CMS Tab */}
                {activeTab === 'CMS' && (
                  <div className="flex items-center justify-center gap-2 p-1 bg-white/5 border border-white/10 rounded-xl w-fit mx-auto">
                    <button
                      onClick={() => setShowMobileView(false)}
                      className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                        !showMobileView
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                          : 'text-white/60 hover:text-white/80'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Desktop
                      </span>
                    </button>
                    <button
                      onClick={() => setShowMobileView(true)}
                      className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                        showMobileView
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                          : 'text-white/60 hover:text-white/80'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Mobile
                      </span>
                    </button>
                  </div>
                )}

                {/* Dashboard Preview for CMS Tab */}
                {activeTab === 'CMS' ? (
                  <div className="flex justify-center items-center min-h-[600px]">
                    {showMobileView ? (
                      // Mobile iPhone Frame with Dashboard
                      <div className="relative rounded-[2.5rem] bg-black border-[3px] border-[#2a2a2a] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.5)] w-full max-w-[320px] h-[650px]">
                        {/* iPhone Side Buttons */}
                        <div className="absolute left-[-6px] top-[70px] w-[3px] h-[28px] bg-gray-500 rounded-l-sm" />
                        <div className="absolute left-[-6px] top-[130px] w-[3px] h-[28px] bg-gray-500 rounded-l-sm" />
                        <div className="absolute left-[-6px] top-[170px] w-[3px] h-[28px] bg-gray-500 rounded-l-sm" />
                        <div className="absolute right-[-6px] top-[140px] w-[3px] h-[60px] bg-gray-500 rounded-r-sm" />

                        {/* iPhone Notch */}
                        <div className="absolute top-0 left-0 right-0 h-10 z-20 flex justify-center items-start pt-1">
                          <div className="w-25 h-7 bg-black rounded-[1.25rem] border border-x border-white/5 flex items-center justify-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#1a1a3a] ring-1 ring-white/10" />
                            <div className="w-12 h-1.5 bg-[#0a0a0a] rounded-full" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-20" />

                        {/* Mobile Screen Content with Dashboard */}
                        <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
                          <div className="w-full h-full scale-[0.35] origin-top-left">
                            <div className="w-[914px] h-[1857px]">
                              {selectedProject.id === 'web-1' || selectedProject.id === 'web-2' ? <Dashboard3 /> : <Dashboard4 />}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Desktop Browser Frame with Dashboard
                      <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        {/* Browser Header */}
                        <div className="h-10 bg-[#1e1e1e] border-b border-white/5 flex items-center px-4 gap-3">
                          <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                          </div>
                          <div className="flex-1 max-w-md h-6 bg-[#2a2a2a] rounded-md border border-white/5 flex items-center px-3 gap-2">
                            <div className="w-2.5 h-2.5 rounded-full border border-white/20 flex items-center justify-center">
                              <div className="w-1 h-1 bg-white/40 rounded-full" />
                            </div>
                            <span className="text-xs text-white/50 font-medium">
                              {selectedProject.displayUrl || 'dashboard-preview.app'}
                            </span>
                          </div>
                        </div>
                        {/* Dashboard Content */}
                        <div className="max-h-[600px] overflow-y-auto bg-[#0a0a0a] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                          {selectedProject.id === 'web-1' || selectedProject.id === 'web-2' ? <Dashboard3 /> : <Dashboard4 />}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Regular Image Gallery for other tabs
                  <>
                    {/* Main Image */}
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/50 border border-white/10 group">
                      <Image
                        className="modal-main-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={selectedProject.gallery[selectedImageIndex]}
                        alt={`${selectedProject.title} - Image ${selectedImageIndex + 1}`}
                        width={1200}
                        height={675}
                      />

                      {/* Image Navigation */}
                      {selectedProject.gallery.length > 1 && (
                        <>
                          <button
                            onClick={() => handleImageChange(selectedImageIndex === 0 ? selectedProject.gallery.length - 1 : selectedImageIndex - 1)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:bg-black/80 hover:border-orange-500/50 transition-all text-white opacity-0 group-hover:opacity-100"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>

                          <button
                            onClick={() => handleImageChange((selectedImageIndex + 1) % selectedProject.gallery.length)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:bg-black/80 hover:border-orange-500/50 transition-all text-white opacity-0 group-hover:opacity-100"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>

                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
                            {selectedImageIndex + 1} / {selectedProject.gallery.length}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Gallery Thumbnails */}
                    {selectedProject.gallery.length > 1 && (
                      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                        {selectedProject.gallery.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => handleImageChange(index)}
                            className={`shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                              selectedImageIndex === index
                                ? 'border-orange-500 shadow-lg shadow-orange-500/20 scale-105'
                                : 'border-white/10 hover:border-white/30 hover:scale-105'
                            }`}
                          >
                            <Image
                              src={image}
                              alt={`Thumbnail ${index + 1}`}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* Project Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Client
                    </div>
                    <p className="font-semibold text-white text-lg">{selectedProject.client}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Year
                    </div>
                    <p className="font-semibold text-white text-lg">{selectedProject.year}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      Category
                    </div>
                    <p className="font-semibold text-white text-lg">{selectedProject.category}</p>
                  </div>
                </div>

                {/* Technologies */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white/90 flex items-center gap-2">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/30 rounded-xl text-sm font-medium text-white/80 hover:text-white transition-all duration-300 hover:scale-105 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Link
                    href={selectedProject.tutorialLink}
                    className="group relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-xl bg-linear-to-r from-orange-500 to-orange-600 px-8 font-semibold text-white transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,127,0,0.4)] active:scale-95"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-orange-600 to-orange-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="relative z-10 flex items-center gap-2 text-lg">
                      View Full Case Study
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Features;
