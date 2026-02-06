"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Globe, LayoutDashboard, Smartphone, Calendar, Hash } from "lucide-react";
import Image from "next/image";
import { Project } from "@/data/projects";
import { useTranslations } from "next-intl";

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const t = useTranslations("projects");
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0f0f0f] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative flex flex-col md:flex-row overflow-hidden"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white/70 hover:text-white p-2 rounded-full backdrop-blur-md transition-all border border-white/5 mx-2 my-2"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Image Section (Left/Top) */}
                            <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full bg-neutral-900">
                                {project.image ? (
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover object-top"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-neutral-700">
                                        <Globe className="w-24 h-24 opacity-20" />
                                    </div>
                                )}

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0f0f0f]" />
                            </div>

                            {/* Content Section (Right/Bottom) */}
                            <div className="w-full md:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col text-white">
                                <div className="mb-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-neutral-300 uppercase tracking-wider">
                                            {t(`categories.${project.category}`)}
                                        </span>
                                        {project.status && (
                                            <span className={`px-3 py-1 border rounded-full text-xs font-medium uppercase tracking-wider ${project.status === "Live"
                                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                                : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                                                }`}>
                                                {t(`status.${project.status}`)}
                                            </span>
                                        )}
                                    </div>

                                    <h2 className="text-3xl font-bold mb-2 leading-tight">{t(`items.${project.id}.title`)}</h2>
                                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                                        {t(`items.${project.id}.description`)}
                                    </p>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                        <div className="flex items-center gap-2 text-neutral-400 text-xs uppercase tracking-wider mb-2">
                                            <Hash className="w-3 h-3" />
                                            {t("modal.highlight")}
                                        </div>
                                        <div className="font-medium">{t(`items.${project.id}.highlight`) || "N/A"}</div>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="mb-8">
                                    <h3 className="text-sm font-medium text-neutral-300 mb-3 uppercase tracking-wider">{t("modal.technologies")}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1.5 bg-neutral-800 text-neutral-300 text-sm rounded-lg border border-white/5">
                                                {t(`tags.${tag}`)}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer / Actions */}
                                <div className="mt-auto pt-6 border-t border-white/10 flex gap-4">
                                    {project.link ? (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-white text-black font-bold py-3 px-6 rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            {t("modal.viewProject")}
                                        </a>
                                    ) : (
                                        <button disabled className="flex-1 bg-white/10 text-white/50 font-bold py-3 px-6 rounded-xl cursor-not-allowed flex items-center justify-center gap-2">
                                            {t("modal.comingSoon")}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
