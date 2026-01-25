"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Project } from "./data";
import { ProjectCard } from "./ProjectCard";

interface ProjectsGridProps {
    projects: Project[];
    activeTab: string;
    onProjectClick: (project: Project) => void;
}

export const ProjectsGrid = ({ projects, activeTab, onProjectClick }: ProjectsGridProps) => {
    const gridRef = useRef<HTMLDivElement>(null);

    // Initial enter animation
    useEffect(() => {
        if (!gridRef.current) return;
        const projectCards = gridRef.current.querySelectorAll('.project-card');

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
                trigger: gridRef.current,
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
            },
        });

        // Parallax effect on scroll for project cards
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
    }, []);

    // Tab change animation
    useEffect(() => {
        if (!gridRef.current) return;
        const projectCards = gridRef.current.children;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                projectCards,
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
        }, gridRef);

        return () => ctx.revert();
    }, [projects]);

    return (
        <div 
            ref={gridRef} 
            className={`mt-8 md:mt-16 w-full mx-auto grid grid-cols-1 gap-6 ${
                activeTab === 'mobile' ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'
            }`}
        >
            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={onProjectClick}
                />
            ))}
        </div>
    );
};
