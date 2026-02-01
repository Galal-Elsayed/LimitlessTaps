"use client";
import { DottedSurface } from "../ui/dotted-surface";

export default function ProjectsHero() {
  return (
    <div className="relative flex h-[80vh] w-full items-center justify-center overflow-hidden bg-[#0a0a0a]">
      <DottedSurface className="absolute inset-0 z-0" />
      <h1 className="font-app z-10 text-7xl font-bold md:text-9xl md:text-[9vw]!">Projects</h1>
    </div>
  );
}
