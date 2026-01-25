"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import gsap from "gsap";
import dynamic from "next/dynamic";
import { Project } from "./data";

// Dynamically import dashboards to avoid SSR issues
const Dashboard3 = dynamic(() => import("./Dashboard3"), { ssr: false });
const Dashboard4 = dynamic(() => import("./Dashboard4"), { ssr: false });


interface ProjectModalProps {
    project: Project;
    activeTab: string; // To know if we need to show special CMS controls
    onClose: () => void;
}

export const ProjectModal = ({ project, activeTab, onClose }: ProjectModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showMobileView, setShowMobileView] = useState(false);

    // Initial Entrance Animation
    useEffect(() => {
        if (!modalRef.current) return;
        
        // Modal entrance
        gsap.fromTo(
            modalRef.current,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
        );

        // Content stagger
        gsap.fromTo(
            ".modal-content > *",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.2, ease: "power2.out" }
        );
    }, []);

    const handleClose = () => {
        if (!modalRef.current) return;
        
        gsap.to(modalRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: "power2.in",
            onComplete: onClose
        });
    };

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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={handleClose}
        >
            <div
                ref={modalRef}
                className="modal-content bg-linear-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#0a0a0a] rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden relative border border-white/10 shadow-[0_0_80px_rgba(255,127,0,0.15)]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-orange-500/20 via-transparent to-purple-500/20 opacity-10 pointer-events-none" />

                {/* Close Button */}
                <button
                    onClick={handleClose}
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
                                {project.category}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white via-white to-white/80 leading-tight">
                                {project.title}
                            </h2>
                            <p className="text-white/60 mt-3 text-lg leading-relaxed max-w-3xl">
                                {project.description}
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
                            <div className="bg-black/50 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                                <div className="h-10 bg-[#1e1e1e] border-b border-white/5 flex items-center px-4 gap-3">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                    </div>
                                    <div className="flex-1 max-w-sm h-6 bg-[#2a2a2a] rounded text-xs text-white/40 flex items-center px-3">
                                        https://{project.id === "CMS-1" ? "dashboard-analytics.io" : "enterprise-cms.app"}
                                    </div>
                                </div>
                                <div className={`relative bg-[#0a0a0a] transition-all duration-500 ease-in-out ${
                                    showMobileView ? 'w-[375px] mx-auto my-8 border-x border-[#333] h-[700px]' : 'w-full h-[600px]'
                                }`}>
                                    <div className={`w-full h-full overflow-y-auto overflow-x-hidden ${showMobileView ? 'scrollbar-none' : 'scrollbar-thin scrollbar-thumb-white/10'}`}>
                                        {project.id === "CMS-1" ? <Dashboard3 /> : <Dashboard4 />}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Standard Project Gallery */
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Main Image Preview */}
                                <div className="lg:col-span-2 space-y-4">
                                    <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/50 shadow-2xl group/image">
                                        <Image
                                            src={project.gallery[selectedImageIndex] || project.mainImage}
                                            alt={project.title}
                                            fill
                                            className="modal-main-image object-cover object-top"
                                        />
                                        
                                        {/* Zoom indication */}
                                        <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors pointer-events-none" />
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-4">
                                        <button className="flex-1 bg-white text-black font-semibold py-3 px-6 rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
                                            Visit Live Project
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                        <button className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-white transition-colors">
                                            View Documentation
                                        </button>
                                    </div>
                                </div>

                                {/* Sidebar Info */}
                                <div className="space-y-8">
                                    {/* Tech Stack */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">
                                            Technologies
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-sm text-white/80"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Project Details */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
                                        <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-2">
                                            Project Details
                                        </h3>
                                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                                            <span className="text-white/60">Client</span>
                                            <span className="text-white font-medium">{project.client}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                                            <span className="text-white/60">Year</span>
                                            <span className="text-white font-medium">{project.year}</span>
                                        </div>
                                        <div className="pt-2">
                                            <h4 className="text-white/60 text-sm mb-2">The Challenge</h4>
                                            <p className="text-sm text-white/50 leading-relaxed">
                                                To build a scalable, user-centric solution that streamlines core business processes while maintaining high performance and security standards.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Gallery Stripes */}
                                    <div className="grid grid-cols-4 gap-2">
                                        {project.gallery.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleImageChange(idx)}
                                                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                                    selectedImageIndex === idx
                                                        ? "border-orange-500 scale-95"
                                                        : "border-transparent hover:border-white/30"
                                                }`}
                                            >
                                                <Image
                                                    src={img}
                                                    alt={`Gallery ${idx}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
