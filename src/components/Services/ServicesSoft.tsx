"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Wand2, Users, Tag, Image as ImageIcon, Sparkles, Rocket, ArrowRight } from "lucide-react";
import { GlowingHeader } from "../ui/GlowingHeader";

const FEATURES = [
    {
        icon: <Wand2 size={24} className="text-[#8b5cf6]" />,
        title: "Enterprise ERP Solutions",
        desc: "Comprehensive resource planning systems tailored to streamline your complex business operations."
    },
    {
        icon: <Users size={24} className="text-[#8b5cf6]" />,
        title: "Dedicated Engineering Team",
        desc: "A fully managed team of senior developers and architects dedicated to your project's success."
    },
    {
        icon: <Tag size={24} className="text-[#8b5cf6]" />,
        title: "Scalable Architecture",
        desc: "Built on robust, cloud-native infrastructure designed to grow seamlessly with your enterprise."
    },
    {
        icon: <ImageIcon size={24} className="text-[#8b5cf6]" />,
        title: "Seamless Integration",
        desc: "Effortlessly integrate with your existing software ecosystem, CRM, and third-party APIs."
    },
    {
        icon: <Sparkles size={24} className="text-[#8b5cf6]" />,
        title: "Custom Workflows",
        desc: "Automate your unique business processes with bespoke software solutions designed for you."
    },
    {
        icon: <Rocket size={24} className="text-[#8b5cf6]" />,
        title: "Agile Development",
        desc: "Rapid iteration cycles ensuring your software adapts quickly to changing market demands."
    }
];

export default function ServicesSoft() {
    return (
        <section className="bg-[#0a0a0a] w-full py-20 relative overflow-hidden">
            <div className="w-full px-6 md:px-12 lg:px-20">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-start">

                    {/* Left Column */}
                    <div className="lg:w-5/12 relative z-10">

                        <GlowingHeader>
                            Software <br />
                            Solutions

                        </GlowingHeader>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-neutral-400 text-lg md:text-xl leading-relaxed max-w-sm mb-20"
                        >
                            Whether you need a custom ERP, CRM, or a complex enterprise platform, our team delivers robust, scalable solutions tailored to your business goals.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: -50 }}
                            whileInView={{ opacity: 1, scale: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 40, damping: 20, delay: 0.3 }}
                            className="relative w-[140%] -ml-[40%] md:w-[130%] md:-ml-[30%]"
                        >
                            <div className="absolute inset-0 bg-[#8b5cf6] blur-[150px] opacity-15" />
                            <Image
                                src="/Services/screen.png"
                                alt="Services Core Box"
                                width={800}
                                height={800}
                                className="object-contain relative z-10"
                                priority
                            />
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:w-7/12 pt-10 lg:pt-32">
                        <div className="flex flex-col gap-12">
                            {FEATURES.map((feature, i) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                    className="group grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-start"
                                >
                                    {/* Column 1: Header (Icon + Title) */}
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-white text-xl font-medium">{feature.title}</h3>
                                    </div>

                                    {/* Column 2: Description */}
                                    <p className="text-neutral-500 leading-relaxed text-sm md:text-base">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 }}
                            className="mt-24 border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6"
                        >
                            <div className="text-white text-2xl font-medium">
                                & Way More<span className="text-[#8b5cf6]">*</span>
                            </div>

                            <button className="px-8 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 group">
                                Start your Project
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
