"use client";
import { DottedSurface } from "../ui/dotted-surface";
import { PROJECTS } from "@/data/projects";
import { useTranslations, useLocale } from "next-intl";
import { Marquee } from "@/components/ui/marquee";

// Create a unique list of tags from the projects outside the component to avoid recalculation
const uniqueTags = Array.from(new Set(PROJECTS.flatMap((p) => p.tags))).sort();

export default function ProjectsHero() {
  const t = useTranslations("projects");
  const locale = useLocale();

  return (
    <div className="relative flex flex-col h-[80vh] w-full items-center justify-center overflow-hidden bg-[#0a0a0a]">
      <DottedSurface className="absolute inset-0 z-0" />
      <h1
        className={`font-app z-10 text-7xl font-bold md:text-9xl md:text-[9vw]! mb-8 ${
          locale === "ar" ? "leading-normal pb-5" : ""
        }`}
      >
        {t("hero.title")}
      </h1>

      {/* Minimalist Description */}
      <div className="z-10 relative max-w-2xl px-6 text-center mb-12">
        <p className="text-lg md:text-xl text-neutral-400 font-light tracking-wide leading-relaxed">
          <span className="text-white font-medium">
            {t("hero.description_highlight")}
          </span>{" "}
          {t("hero.description")}
        </p>
      </div>

      {/* Tags Marquee using the working Marquee component */}
      <div className="z-10 w-full max-w-sm md:max-w-4xl overflow-hidden relative">
        <Marquee dir="ltr" className="[--duration:60s] [--gap:2rem]">
          {uniqueTags.map((tag, index) => (
            <div
              key={index}
              className="px-6 py-2.5 bg-white text-black rounded-2xl shadow-[0_0_10px_rgba(255,255,255,0.3)] flex items-center justify-center -rotate-1 hover:rotate-0 transition-transform duration-300"
            >
              <span className="text-[#0a0a0a] text-sm font-bold tracking-tight uppercase">
                {t(`tags.${tag}`)}
              </span>
            </div>
          ))}
        </Marquee>

        {/* Gradient masks on the sides */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
      </div>
    </div>
  );
}
