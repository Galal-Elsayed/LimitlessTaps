"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  ArrowRight,
  Users,
  TrendingUp,
  Heart,
  Zap,
  Search,
  Filter,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Type definitions
type JobPosting = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string; // Full-time, Part-time, Contract
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  postedDate: string;
};

// Mock job data
const mockJobs: JobPosting[] = [
  {
    id: "job-1",
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote / New York, NY",
    type: "Full-time",
    salary: "$120k - $180k",
    description:
      "We're looking for an experienced Full Stack Developer to join our engineering team and help build the next generation of our platform.",
    requirements: [
      "5+ years of experience with React, Node.js, and TypeScript",
      "Strong understanding of modern web technologies",
      "Experience with cloud platforms (AWS, GCP, or Azure)",
      "Excellent problem-solving and communication skills",
    ],
    responsibilities: [
      "Design and implement scalable web applications",
      "Collaborate with cross-functional teams",
      "Mentor junior developers",
      "Participate in code reviews and architecture decisions",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Flexible work arrangements",
      "Professional development budget",
    ],
    postedDate: "2024-01-10",
  },
  {
    id: "job-2",
    title: "Product Designer",
    department: "Design",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$100k - $150k",
    description:
      "Join our design team to create beautiful, intuitive experiences that delight our users and drive business growth.",
    requirements: [
      "3+ years of product design experience",
      "Proficiency in Figma and design systems",
      "Strong portfolio showcasing UX/UI work",
      "Understanding of user-centered design principles",
    ],
    responsibilities: [
      "Design end-to-end product experiences",
      "Create and maintain design systems",
      "Conduct user research and usability testing",
      "Collaborate with engineers and product managers",
    ],
    benefits: [
      "Competitive compensation package",
      "Comprehensive health benefits",
      "Remote-friendly culture",
      "Latest design tools and equipment",
    ],
    postedDate: "2024-01-08",
  },
  {
    id: "job-3",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$110k - $160k",
    description:
      "Help us build and maintain robust infrastructure that powers millions of users worldwide.",
    requirements: [
      "4+ years of DevOps/SRE experience",
      "Strong knowledge of Kubernetes and Docker",
      "Experience with CI/CD pipelines",
      "Proficiency in scripting (Python, Bash, etc.)",
    ],
    responsibilities: [
      "Manage and optimize cloud infrastructure",
      "Implement monitoring and alerting systems",
      "Automate deployment processes",
      "Ensure system reliability and performance",
    ],
    benefits: [
      "Competitive salary with bonuses",
      "Full remote work options",
      "Learning and certification support",
      "Generous PTO policy",
    ],
    postedDate: "2024-01-05",
  },
  {
    id: "job-4",
    title: "Marketing Manager",
    department: "Marketing",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$90k - $130k",
    description:
      "Lead our marketing initiatives and help us reach new audiences while building our brand presence.",
    requirements: [
      "5+ years of marketing experience",
      "Proven track record in digital marketing",
      "Strong analytical and strategic thinking",
      "Experience with marketing automation tools",
    ],
    responsibilities: [
      "Develop and execute marketing strategies",
      "Manage marketing campaigns across channels",
      "Analyze performance metrics and optimize",
      "Collaborate with sales and product teams",
    ],
    benefits: [
      "Competitive base salary plus bonuses",
      "Health and wellness benefits",
      "Flexible schedule",
      "Professional growth opportunities",
    ],
    postedDate: "2024-01-03",
  },
];

// Company values/perks
const companyPerks = [
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "Work with talented people who are passionate about what they do",
  },
  {
    icon: TrendingUp,
    title: "Growth Opportunities",
    description: "Continuous learning and career advancement paths",
  },
  {
    icon: Heart,
    title: "Work-Life Balance",
    description: "Flexible schedules and generous time off policies",
  },
  {
    icon: Zap,
    title: "Cutting-Edge Tech",
    description: "Work with the latest tools and technologies",
  },
];

export default function CareersPage() {
  const [showJobs, setShowJobs] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Refs for GSAP animations
  const heroRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const perksRef = useRef<HTMLDivElement>(null);
  const jobsRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const jobsSectionRef = useRef<HTMLElement>(null);

  // Filter jobs
  const filteredJobs = mockJobs.filter((job) => {
    const matchesDepartment =
      selectedDepartment === "All" || job.department === selectedDepartment;
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  const departments = ["All", ...new Set(mockJobs.map((job) => job.department))];

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
      if (heroRef.current) {
        const headerElements = heroRef.current.children;
        
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
              trigger: heroRef.current,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // Toggle section animation
      if (toggleRef.current) {
        gsap.fromTo(
          toggleRef.current,
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: toggleRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse", // play on enter, reverse only when scrolling back up past start
            },
          }
        );
      }

      // Jobs section animation
      if (jobsSectionRef.current) {
        gsap.fromTo(
          jobsSectionRef.current,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: jobsSectionRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse", // play on enter, reverse only when scrolling back up past start
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Animate jobs when toggled
  useEffect(() => {
    if (showJobs && jobsRef.current) {
      const jobs = jobsRef.current.querySelectorAll(".job-card");
      
      if (jobs.length > 0) {
        gsap.fromTo(
          jobs,
          {
            opacity: 0,
            y: 60,
            scale: 0.9,
            rotateX: 10,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.7,
            stagger: {
              each: 0.1,
              from: "start",
            },
            ease: "power3.out",
            clearProps: "all",
          }
        );
      }
    }
  }, [showJobs, filteredJobs]);

  // Handle toggle with animation
  const handleToggle = () => {
    if (showJobs) {
      // Animate out
      const jobs = jobsRef.current?.querySelectorAll(".job-card");
      if (jobs && jobs.length > 0) {
        gsap.to(jobs, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.in",
          onComplete: () => setShowJobs(false),
        });
      } else {
        setShowJobs(false);
      }
    } else {
      setShowJobs(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section with Grid Background */}
      <section ref={heroSectionRef} className="relative bg-[#0a0a0a] text-[#bfbfbf] w-full min-h-[80vh] flex items-start justify-start overflow-hidden">
        
        {/* Background Grid Layer */}
        <div className="absolute inset-0 z-0 flex flex-col">
          <div ref={gridRef} className="w-full flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-[#1a1a1a] gap-px border border-[#1a1a1a]">
            {[
              "ENGINEERING",
              "DESIGN",
              "MARKETING",
              "PRODUCT",
              "REMOTE WORK",
              "GROWTH",
              "INNOVATION",
              "TEAMWORK",
              "BENEFITS",
              "CULTURE",
              "LEADERSHIP",
              "OPPORTUNITIES",
            ].map((word, index) => (
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
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <h2 className="text-[13vw] leading-[0.8] font-medium uppercase tracking-[-0.02em] font-sans text-white/90 mix-blend-difference mb-8">
              Build The
              <br />
              Future
              <br />
              With Us
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-white/80 text-lg md:text-xl max-w-xl font-light leading-relaxed pl-2 pointer-events-auto"
            >
              Join a team of passionate innovators creating products that make a difference.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Company Perks - Commented out */}
      {/* ... */}

      {/* Jobs Toggle Section */}
      <section ref={jobsSectionRef} className="py-16">
        <div className="max-w-(--breakpoint-xl) mx-auto px-6">
          <div ref={toggleRef} className="max-w-7xl mb-12">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-[-0.04em] leading-[0.95] text-white uppercase text-left">
              <span className="block">Open</span>
              <span className="block mt-8">Positions</span>
            </h2>
            <p className="mt-8 text-gray-400 text-xl sm:text-2xl max-w-2xl text-left">
              Explore our current job openings and find the perfect role for you.
            </p>
            
            {/* White button like home page */}
            <button
              onClick={handleToggle}
              className="mt-8 group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-xl bg-white px-8 font-semibold text-black transition-all duration-500 ease-out hover:px-12 hover:bg-zinc-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95 min-w-[200px]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100 via-white to-zinc-200 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="relative z-10 flex items-center gap-2">
                {showJobs ? "Hide Positions" : "Show Positions"}
                <ArrowRight
                  className={`w-4 h-4 transition-transform duration-300 ${
                    showJobs ? "rotate-90" : ""
                  }`}
                />
              </span>
              <div className="absolute inset-0 -z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 group-hover:animate-shine" />
            </button>
          </div>

          {/* Jobs List */}
          {showJobs && (
            <div className="space-y-8">
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-zinc-900/50 p-4 rounded-xl border border-white/10 backdrop-blur-md">
                <div className="relative flex-1 w-full md:max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search positions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="flex gap-2 items-center flex-wrap">
                  <Filter className="w-4 h-4 text-gray-400" />
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setSelectedDepartment(dept)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedDepartment === dept
                          ? "bg-white text-black"
                          : "bg-zinc-900/50 border border-white/10 text-white hover:border-white/20 hover:bg-white/5"
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>

              {/* Jobs Grid */}
              {filteredJobs.length > 0 ? (
                <div ref={jobsRef} className="grid gap-6">
                  {filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className="job-card group p-6 md:p-8 rounded-xl border border-white/10 bg-zinc-900/50 hover:border-white/20 hover:bg-white/5 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/10 backdrop-blur-md"
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-blue-600/10 text-blue-400 text-xs font-semibold rounded-full">
                              {job.department}
                            </span>
                            <span className="text-xs text-gray-500">
                              Posted {new Date(job.postedDate).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-gray-300 mb-4">
                            {job.description}
                          </p>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4" />
                              {job.type}
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4" />
                              {job.salary}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              Full-time
                            </div>
                          </div>
                        </div>

                        {/* White button like home page */}
                        <button className="group/btn relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xl bg-white px-6 font-semibold text-black transition-all duration-500 ease-out hover:px-8 hover:bg-zinc-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95 shrink-0">
                          <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100 via-white to-zinc-200 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
                          <span className="relative z-10 flex items-center gap-2">
                            Apply Now <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                          </span>
                        </button>
                      </div>

                      {/* Expandable Details */}
                      <details className="group/details mt-6">
                        <summary className="cursor-pointer text-sm font-medium text-blue-400 hover:text-blue-300 hover:underline list-none flex items-center gap-2">
                          View Details
                          <ArrowRight className="w-4 h-4 transition-transform group-open/details:rotate-90" />
                        </summary>
                        
                        <div className="mt-6 space-y-6 pt-6 border-t border-white/10">
                          <div>
                            <h4 className="font-semibold mb-3 text-white">Requirements</h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                              {job.requirements.map((req, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-blue-400 mt-1">•</span>
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3 text-white">Responsibilities</h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                              {job.responsibilities.map((resp, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-blue-400 mt-1">•</span>
                                  {resp}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3 text-white">Benefits</h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                              {job.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-blue-400 mt-1">•</span>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              ) : (
                // No Results Placeholder
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-zinc-900/50 border border-white/10 flex items-center justify-center">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">No positions found</h3>
                  <p className="text-gray-400 mb-6">
                    Try adjusting your search or filters
                  </p>
                  {/* Glass button */}
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedDepartment("All");
                    }}
                    className="group relative inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 text-white backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10 active:scale-95"
                  >
                    <span className="font-semibold">Clear Filters</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Empty State - No Jobs Available */}
          {!showJobs && mockJobs.length === 0 && (
            <div className="text-center py-16 px-6">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-br from-blue-600/20 to-blue-600/5 flex items-center justify-center">
                  <Briefcase className="w-12 h-12 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">
                  No Open Positions Right Now
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  We don&apos;t have any open positions at the moment, but we&apos;re always
                  looking for talented people. Submit your resume and we&apos;ll keep you
                  in mind for future opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {/* White button */}
                  <button className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-xl bg-white px-8 font-semibold text-black transition-all duration-500 ease-out hover:px-12 hover:bg-zinc-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95">
                    <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100 via-white to-zinc-200 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="relative z-10 flex items-center gap-2">
                      Submit Your Resume <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 -z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 group-hover:animate-shine" />
                  </button>
                  {/* Glass button */}
                  <button className="group relative inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 text-white backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:pr-10 active:scale-95">
                    <span className="font-semibold">Join Our Talent Network</span>
                    <ArrowRight className="h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-20 border-t border-white/10">
        <div className="max-w-(--breakpoint-lg) mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Don't See the Right Role?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            We&apos;re always interested in hearing from talented individuals. Send us
            your resume and let us know what you&apos;re passionate about.
          </p>
          
          <button className="group relative inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 text-white backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:pr-10 active:scale-95">
            <span className="font-semibold">Get in Touch</span>
            <ArrowRight className="h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section> */}
    </div>
  );
}
