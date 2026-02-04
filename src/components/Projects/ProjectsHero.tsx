"use client";
import { DottedSurface } from "../ui/dotted-surface";
import { PROJECTS } from "@/data/projects";

// Create a unique list of tags from the projects outside the component to avoid recalculation
const uniqueTags = Array.from(new Set(PROJECTS.flatMap((p) => p.tags))).sort();

export default function ProjectsHero() {
  return (
    <div className="relative flex flex-col h-[80vh] w-full items-center justify-center overflow-hidden bg-[#0a0a0a]">
      <DottedSurface className="absolute inset-0 z-0" />
      <h1 className="font-app z-10 text-7xl font-bold md:text-9xl md:text-[9vw]! mb-8">
        Projects
      </h1>

      {/* Minimalist Description */}
      <div className="z-10 relative max-w-2xl px-6 text-center mb-12">
        <p className="text-lg md:text-xl text-neutral-400 font-light tracking-wide leading-relaxed">
          <span className="text-white font-medium">
            Explore our latest work
          </span>{" "}
          across web, mobile, and data visualization. Crafting digital
          experiences that push boundaries.
        </p>
      </div>

      {/* Tags Marquee */}
      <div
        className="z-10 w-full max-w-sm md:max-w-4xl overflow-hidden relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex gap-6 animate-marquee whitespace-nowrap w-max py-4">
          {/* Duplicated list for seamless loop */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-8">
              {uniqueTags.map((tag, index) => (
                <div
                  key={`${i}-${index}`}
                  className="px-6 py-2.5 bg-white text-black rounded-2xl shadow-[0_0_10px_rgba(255,255,255,0.3)] flex items-center justify-center -rotate-1 hover:rotate-0 transition-transform duration-300"
                >
                  <span className="text-[#0a0a0a] text-sm font-bold tracking-tight uppercase">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Inline styles for animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 90s linear infinite;
        }
      `}</style>
    </div>
  );
}
