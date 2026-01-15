"use client";

import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  { id: "CMS", label: "CMS", projects: CMSProjects },
  // Add more tabs here as needed
  // { id: "desktop", label: "Desktop", projects: desktopProjects },
];

const Features = () => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Refs for GSAP animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const activeProjects = useMemo(
    () => tabs.find((tab) => tab.id === activeTab)?.projects || [],
    [activeTab]
  );

  // Enhanced GSAP ScrollTrigger animations for all sections
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Section - Grid cells animation
      if (gridRef.current) {
        const gridCells = gridRef.current.querySelectorAll('.grid-cell');
        
        gsap.fromTo(
          gridCells,
          {
            opacity: 0,
            scale: 0.8,
            y: 50,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: {
              each: 0.05,
              from: "random",
            },
            ease: "power3.out",
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse", // enter, leave, enterBack, leaveBack
            },
          }
        );
      }

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
  const workWords = [
    "WEB DEVELOPMENT",
    "MOBILE APPS",
    "E-COMMERCE",
    "UI/UX DESIGN",
    "DASHBOARDS",
    "CMS SOLUTIONS",
    "API INTEGRATION",
    "RESPONSIVE DESIGN",
    "PERFORMANCE",
    "SCALABILITY",
    "INNOVATION",
    "PORTFOLIO",
  ];

  return (
    <>
      {/* Hero Section with Grid Background */}
      <section ref={heroSectionRef} className="relative bg-[#0a0a0a] text-[#bfbfbf] w-full min-h-[80vh] flex items-start justify-start overflow-hidden">
        
        {/* Background Grid Layer - Only in Hero */}
        <div className="absolute inset-0 z-0 flex flex-col">
          <div ref={gridRef} className="w-full flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-[#1a1a1a] gap-px border border-[#1a1a1a]">
            {workWords.map((word, index) => (
              <div
                key={index}
                className="grid-cell group relative w-full min-h-[120px] md:min-h-[20vh] bg-[#0a0a0a]"
                style={{ perspective: "1000px" }}
              >
                <div className="relative w-full h-full duration-300 ease-out transition-all transform-style-3d group-hover:-translate-y-2 group-hover:translate-z-10 group-hover:rotate-x-2 group-hover:shadow-2xl">
                  <div className="absolute inset-0 bg-[#0a0a0a] flex items-center pl-4 md:pl-8 transition-colors duration-300 group-hover:bg-[#0f0f0f] border border-transparent group-hover:border-[#333]/30">
                    
                    {/* Intersection Stars */}
                    <div className="absolute -top-[5.5px] -left-[5.5px] text-[#333] z-20 group-hover:opacity-50 transition-opacity">
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-100">
                        <path d="M5.5 0V11" stroke="#333" strokeWidth="1" />
                        <path d="M0 5.5H11" stroke="#333" strokeWidth="1" />
                      </svg>
                    </div>

                    {/* Word Label */}
                    <span className="text-sm md:text-lg font-light tracking-wide text-[#444] group-hover:text-white transition-colors duration-300 uppercase z-10 relative select-none">
                      {word}
                    </span>

                    {/* Corner Brackets */}
                    <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#333] opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#333] opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#333] opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#333] opacity-20 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Shiny sheen effect */}
                    <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Bottom Depth Face */}
                  <div className="absolute inset-x-0 -bottom-2 h-2 bg-[#050505] origin-top transform rotate-x-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overlay Content Layer */}
        <div className="relative z-10 w-full max-w-[1800px] px-4 md:px-12 pointer-events-none flex flex-col justify-start pt-24 lg:pt-18">
          <div ref={headerRef} className="relative">
            <h2 className="text-[13vw] leading-[0.8] font-medium uppercase tracking-[-0.02em] font-sans text-white/90 mix-blend-difference mb-8">
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
                className={`px-6 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid - Optimized widths */}
        <div ref={projectsRef} className="mt-8 md:mt-16 w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activeProjects.map((project) => (
            <div
              key={project.id}
              className="project-card group cursor-pointer"
              onClick={() => openModal(project)}
            >
              {/* Device Frame - Different dimensions for mobile vs web */}
              <div className={`relative rounded-[2.5rem] overflow-hidden bg-black border-[3px] border-[#2a2a2a] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_25px_50px_rgba(0,0,0,0.6)] group-hover:translate-y-[-4px] ${
                project.id.includes('mobile') 
                  ? 'w-full max-w-[280px] mx-auto h-[550px]' 
                  : 'w-full h-[400px] rounded-2xl'
              }`}>
                
                {/* Frame Header (Conditional) */}
                {project.id.includes('mobile') ? (
                  /* iPhone Notch Frame */
                  <>
                    <div className="absolute top-0 left-0 right-0 h-10 z-20 flex justify-center items-start pt-1">
                      <div className="w-25 h-7 bg-black rounded-[1.25rem] border border-x border-white/5 flex items-center justify-center gap-2 ">
                        {/* Camera */}
                        <div className="w-2 h-2 rounded-full bg-[#1a1a3a] ring-1 ring-white/10" />
                        {/* Speaker */}
                        <div className="w-12 h-1.5 bg-[#0a0a0a] rounded-full" />
                      </div>
                    </div>
                    {/* Bottom Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-20" />
                  </>
                ) : (
                  /* Browser Frame Header */
                  <div className="absolute top-0 left-0 right-0 h-8 bg-[#252525] border-b border-white/5 z-20 flex items-center px-4 gap-3">
                    <div className="flex gap-1.5 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    {/* URL Bar */}
                    <div className="flex-1 max-w-[280px] h-5 bg-black/30 rounded-md border border-white/5 flex items-center px-2 gap-2 overflow-hidden">
                      <div className="w-2.5 h-2.5 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                        <div className="w-1 h-1 bg-white/40 rounded-full" />
                      </div>
                      <span className="text-[10px] text-white/40 font-medium truncate select-none">
                        {project.displayUrl || "localhost:3000"}
                      </span>
                    </div>
                  </div>
                )}

                {/* Overlay with info */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 flex flex-col justify-end p-6">
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
                
                {/* Scrolling Page Content */}
                <div className={`relative w-full h-full ${!project.id.includes('mobile') ? 'pt-8' : ''} overflow-hidden`}>
                  <div className={`absolute inset-x-0 ${project.id.includes('mobile') ? 'top-0' : 'top-8'} transition-all ease-in-out
                    ${project.id.includes('web') 
                      ? "duration-[8000ms] group-hover:translate-y-[clamp(-1000%,calc(-100%+368px),0%)]" 
                      : project.id.includes('mobile')
                        ? "duration-1000 group-hover:translate-y-[calc(-100%+550px)]"
                        : "duration-[3000ms] group-hover:translate-y-[-15%]"
                    }`}
                  >
                    <Image
                      src={project.mainImage}
                      alt={project.title}
                      width={800}
                      height={2000}
                      className={`w-full ${project.id.includes('mobile') ? 'h-[900px]' : 'h-auto'} object-cover object-top origin-top transition-transform duration-700 ${project.id.includes('web') ? 'group-hover:scale-100' : ''}`}
                    />
                  </div>
                </div>
              </div>

              {/* Title below for accessibility */}
              <div className="mt-4 px-2">
                <h4 className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
                  {project.title}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="modal-content bg-[#0a0a0a] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="p-8">
              {/* Main Image */}
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-muted mb-6">
                <Image
                  className="modal-main-image w-full h-full object-cover"
                  src={selectedProject.gallery[selectedImageIndex]}
                  alt={`${selectedProject.title} - Image ${selectedImageIndex + 1}`}
                  width={1200}
                  height={675}
                />
              </div>

              {/* Gallery Thumbnails */}
              <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                {selectedProject.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageChange(index)}
                    className={`shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-blue-500"
                        : "border-white/10 hover:border-white/30"
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

              {/* Project Info */}
              <div className="space-y-6">
                <div>
                  <span className="uppercase font-medium text-sm text-gray-500">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-3xl font-semibold tracking-[-0.02em] mt-2 text-white">
                    {selectedProject.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y border-white/5 py-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Client</p>
                    <p className="font-medium text-white">{selectedProject.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Year</p>
                    <p className="font-medium text-white">{selectedProject.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Category
                    </p>
                    <p className="font-medium text-white">{selectedProject.category}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Description
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-3">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href={selectedProject.tutorialLink}
                    className="group relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-xl bg-white px-8 font-semibold text-black transition-all duration-500 ease-out hover:bg-zinc-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95"
                  >
                    <div className="absolute inset-0 bg-linear-to-tr from-zinc-100 via-white to-zinc-200 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="relative z-10 flex items-center gap-2">
                      View Full Case Study <ArrowRight className="h-5 w-5" />
                    </span>
                    <div className="absolute inset-0 -z-10 -translate-x-full bg-linear-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 group-hover:animate-shine" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Features;
