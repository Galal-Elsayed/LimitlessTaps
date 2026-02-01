"use client";

import React from "react";
import { motion } from "framer-motion";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { ArrowRight, Globe, Zap, Heart, Briefcase, Mail } from "lucide-react";

const benefits = [
  {
    title: "Global Impact",
    description:
      "Work on products that touch millions of lives across the globe.",
    icon: Globe,
  },
  {
    title: "Fast-Paced Growth",
    description:
      "Accelerate your career in an environment that values speed and ownership.",
    icon: Zap,
  },
  {
    title: "Health & Wellness",
    description:
      "Comprehensive health coverage and wellness stipends to keep you at your best.",
    icon: Heart,
  },
];

// Button style constant matching the Navbar "Start Project" button
const BUTTON_STYLE_CLASSES = `
  px-8 py-3 rounded-lg 
  bg-[#eeeeee] hover:bg-white 
  text-black font-extrabold text-sm tracking-widest uppercase 
  shadow-[0_5px_0_0_#bebebe] 
  hover:translate-y-0.5 hover:shadow-[0_2px_0_0_#bebebe] 
  active:translate-y-1 active:shadow-none 
  transition-all duration-100 ease-out 
  flex items-center justify-center gap-3 
  border border-white/10
`;

export default function CareersHero() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white overflow-hidden pb-24">
      {/* Hero Section */}
      <div className="relative">
        <BackgroundPaths>
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold mb-8 tracking-tighter font-app group">
              Join the Limitless
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl leading-relaxed">
              We are building the future of digital experiences.{" "}
              <br className="hidden md:block" />
              Join a team where your work truly matters.
            </p>
            <div className="mt-10">
              <a
                href="#open-roles"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("open-roles")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={BUTTON_STYLE_CLASSES}
              >
                View Open Roles
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </BackgroundPaths>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 -mt-20">
        {/* Culture / Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-8 rounded-3xl hover:bg-neutral-900 transition-colors"
            >
              <div className="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center mb-6 text-white">
                <benefit.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-neutral-400 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Open Roles Section */}
        <div id="open-roles" className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-app">
              Open Positions
            </h2>
            <p className="text-neutral-400 text-lg">
              Don't see your perfect role? We are always looking for talent.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-12 bg-neutral-900/30 border border-dashed border-neutral-800 rounded-3xl">
            <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-6 text-neutral-500">
              <Briefcase size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-2">No Open Roles Currently</h3>
            <p className="text-neutral-500 mb-8 max-w-md text-center">
              We don't have any specific openings right now, but things move
              fast here. Check back soon!
            </p>
          </div>

          <div className="mt-12 p-8 rounded-3xl bg-neutral-900/30 border border-neutral-800 text-center relative overflow-hidden">
            {/* Decorative gradient for the CTA card */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            <h3 className="text-2xl font-bold mb-4 relative z-10">
              Can't find what you're looking for?
            </h3>
            <p className="text-neutral-400 mb-8 max-w-xl mx-auto relative z-10">
              We're always interested in meeting extraordinary people. Send us
              your resume and tell us why you'd be a great fit.
            </p>
            <div className="flex justify-center relative z-10">
              <a
                href="mailto:careers@limitlesstaps.com"
                className={BUTTON_STYLE_CLASSES}
              >
                <Mail className="w-4 h-4" />
                Email Us Directly
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
