"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Project } from "./data";

interface ProjectCardProps {
    project: Project;
    onClick: (project: Project) => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
    // Local state for image carousel (specific to mobile projects layout)
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % project.gallery.length);
    };

    const handlePrevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1));
    };

    if (project.id.includes('mobile')) {
        // Mobile projects use iPhone frame
        return (
            <div
                className="project-card group cursor-pointer relative rounded-[2.5rem] bg-black border-[3px] border-[#2a2a2a] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_25px_50px_rgba(0,0,0,0.6)] group-hover:translate-y-[-4px] w-full max-w-[280px] mx-auto h-[550px]"
                onClick={() => onClick(project)}
            >
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
                        src={project.gallery[currentImageIndex]}
                        alt={project.title}
                        width={800}
                        height={2000}
                        className="w-full h-full object-cover object-top transition-opacity duration-300"
                    />

                    {/* Navigation Buttons */}
                    {project.gallery.length > 1 && (
                        <>
                            <button
                                onClick={handlePrevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 hover:bg-black/80 transition-all text-white z-30 duration-300 opacity-0 group-hover:opacity-100"
                                aria-label="Previous image"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <div className="absolute top-12 left-1/2 -translate-x-1/2 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-white text-xs z-30 opacity-0 duration-300 group-hover:opacity-100 transition-opacity">
                                {currentImageIndex + 1} / {project.gallery.length}
                            </div>

                            <button
                                onClick={handleNextImage}
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
        );
    }

    // Modern Premium Card for Web & Costume Solutions
    return (
        <div className="project-card group cursor-pointer" onClick={() => onClick(project)}>
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
        </div>
    );
};
