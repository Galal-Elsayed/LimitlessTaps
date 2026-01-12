"use client";

import { Button } from "@/components/ui/button";
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
    title: "Shop Smart Mobile Experience",
    details:
      "A seamless shopping experience with intuitive navigation, personalized recommendations, and secure checkout process.",
    tutorialLink: "#",
    mainImage: "/placeholder-mobile-1.jpg",
    gallery: [
      "/placeholder-mobile-1.jpg",
      "/placeholder-mobile-2.jpg",
      "/placeholder-mobile-3.jpg",
    ],
    technologies: ["React Native", "TypeScript", "Redux", "Firebase"],
    client: "RetailCo",
    year: "2024",
    description:
      "A comprehensive mobile shopping platform that revolutionizes the retail experience with AI-powered recommendations and seamless payment integration.",
  },
  {
    id: "mobile-2",
    category: "Fitness Tracker",
    title: "Health & Wellness Companion",
    details:
      "Track your fitness goals, monitor health metrics, and get personalized workout plans tailored to your lifestyle.",
    tutorialLink: "#",
    mainImage: "/placeholder-mobile-4.jpg",
    gallery: [
      "/placeholder-mobile-4.jpg",
      "/placeholder-mobile-5.jpg",
      "/placeholder-mobile-6.jpg",
    ],
    technologies: ["Flutter", "Dart", "HealthKit", "Google Fit"],
    client: "FitLife Inc",
    year: "2024",
    description:
      "An all-in-one fitness tracking application that helps users achieve their health goals through personalized insights and community support.",
  },
  {
    id: "mobile-3",
    category: "Social Networking",
    title: "Connect & Share Moments",
    details:
      "Stay connected with friends and family through instant messaging, photo sharing, and real-time updates.",
    tutorialLink: "#",
    mainImage: "/placeholder-mobile-7.jpg",
    gallery: [
      "/placeholder-mobile-7.jpg",
      "/placeholder-mobile-8.jpg",
      "/placeholder-mobile-9.jpg",
    ],
    technologies: ["Swift", "SwiftUI", "Firebase", "WebRTC"],
    client: "SocialHub",
    year: "2023",
    description:
      "A modern social networking platform that emphasizes privacy and meaningful connections through innovative features.",
  },
];

// Mock data for web projects
const webProjects: Project[] = [
  {
    id: "web-1",
    category: "SaaS Platform",
    title: "Enterprise Project Management",
    details:
      "Streamline your team's workflow with powerful project management tools, real-time collaboration, and advanced analytics.",
    tutorialLink: "#",
    mainImage: "/placeholder-web-1.jpg",
    gallery: [
      "/placeholder-web-1.jpg",
      "/placeholder-web-2.jpg",
      "/placeholder-web-3.jpg",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    client: "TechCorp",
    year: "2024",
    description:
      "A comprehensive project management solution designed for enterprise teams, featuring advanced reporting and seamless integrations.",
  },
  {
    id: "web-2",
    category: "E-Learning Platform",
    title: "Interactive Learning Hub",
    details:
      "Engage students with interactive courses, live sessions, and personalized learning paths powered by AI.",
    tutorialLink: "#",
    mainImage: "/placeholder-web-4.jpg",
    gallery: [
      "/placeholder-web-4.jpg",
      "/placeholder-web-5.jpg",
      "/placeholder-web-6.jpg",
    ],
    technologies: ["React", "Node.js", "MongoDB", "WebRTC"],
    client: "EduTech Solutions",
    year: "2024",
    description:
      "An innovative e-learning platform that combines cutting-edge technology with pedagogical best practices to deliver exceptional learning experiences.",
  },
  {
    id: "web-3",
    category: "Analytics Dashboard",
    title: "Data Insights Platform",
    details:
      "Transform raw data into actionable insights with customizable dashboards, real-time analytics, and predictive modeling.",
    tutorialLink: "#",
    mainImage: "/placeholder-web-7.jpg",
    gallery: [
      "/placeholder-web-7.jpg",
      "/placeholder-web-8.jpg",
      "/placeholder-web-9.jpg",
    ],
    technologies: ["Vue.js", "Python", "D3.js", "Apache Kafka"],
    client: "DataCorp",
    year: "2023",
    description:
      "A powerful analytics platform that helps businesses make data-driven decisions through intuitive visualizations and advanced analytics.",
  },
];

// Tab configuration - easily extensible
const tabs: TabConfig[] = [
  { id: "mobile", label: "Mobile", projects: mobileProjects },
  { id: "web", label: "Web", projects: webProjects },
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

  const activeProjects = useMemo(
    () => tabs.find((tab) => tab.id === activeTab)?.projects || [],
    [activeTab]
  );

  // Initial animations on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.from(headerRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Animate tabs
      gsap.from(tabsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.4,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate projects on tab change or mount
  useEffect(() => {
    if (!projectsRef.current) return;

    const projects = projectsRef.current.children;
    
    const ctx = gsap.context(() => {
      // Animate out old projects
      gsap.to(projects, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.05,
        onComplete: () => {
          // Animate in new projects
          gsap.fromTo(
            projects,
            {
              opacity: 0,
              y: 50,
              scale: 0.95,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.15,
              ease: "power3.out",
              clearProps: "all",
            }
          );
        },
      });

      // ScrollTrigger for each project card
      Array.from(projects).forEach((project) => {
        const image = project.querySelector(".project-image");
        const content = project.querySelector(".project-content");

        // Parallax effect on images
        if (image) {
          gsap.to(image, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: project,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        // Fade in content on scroll
        if (content) {
          gsap.from(content.children, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: content,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });
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

  return (
    <div ref={sectionRef} className="min-h-screen flex items-center justify-center">
      <div className="max-w-(--breakpoint-lg) w-full py-10 px-6">
        <div ref={headerRef}>
          <h2 className="text-4xl md:text-[2.75rem] md:leading-[1.2] font-semibold tracking-[-0.03em] sm:max-w-xl text-pretty sm:mx-auto sm:text-center">
            Strengthen Your Strategy
          </h2>
          <p className="mt-2 text-muted-foreground text-lg sm:text-xl sm:text-center">
            Enhance your strategy with intelligent tools designed for success.
          </p>
        </div>

        {/* Tab Bar */}
        <div ref={tabsRef} className="mt-8 flex justify-center">
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

        {/* Projects Grid */}
        <div ref={projectsRef} className="mt-8 md:mt-16 w-full mx-auto space-y-20">
          {activeProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col md:flex-row items-center gap-x-12 gap-y-6 md:even:flex-row-reverse"
            >
              {/* Project Image - Clickable */}
              <div
                className="project-image w-full aspect-4/3 bg-muted rounded-xl border border-border/50 basis-1/2 overflow-hidden cursor-pointer group relative"
                onClick={() => openModal(project)}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    View Project
                  </span>
                </div>
                <Image
                  src={project.mainImage}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Project Details */}
              <div className="project-content basis-1/2 shrink-0">
                <span className="uppercase font-medium text-sm text-muted-foreground">
                  {project.category}
                </span>
                <h4 className="my-3 text-3xl font-semibold tracking-[-0.02em]">
                  {project.title}
                </h4>
                <p className="text-muted-foreground">{project.details}</p>
                <Button asChild size="lg" className="mt-6 rounded-full gap-3">
                  <Link href={project.tutorialLink}>
                    Learn More <ArrowRight />
                  </Link>
                </Button>
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
            className="modal-content bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
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
                        ? "border-primary"
                        : "border-transparent hover:border-border"
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
                  <span className="uppercase font-medium text-sm text-muted-foreground">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-3xl font-semibold tracking-[-0.02em] mt-2">
                    {selectedProject.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Client</p>
                    <p className="font-medium">{selectedProject.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Year</p>
                    <p className="font-medium">{selectedProject.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Category
                    </p>
                    <p className="font-medium">{selectedProject.category}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Description
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-muted rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full gap-3 mt-6"
                >
                  <Link href={selectedProject.tutorialLink}>
                    View Full Case Study <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Features;
