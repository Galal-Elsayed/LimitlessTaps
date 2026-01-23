"use client";
import { WavyBackground } from "./wavy-background";
import { Header } from "@/components/ui/header";

export default function StudioHero() {
    return (
        <WavyBackground containerClassName="min-h-[60vh] h-[60vh]">
            <Header
                title="THE STUDIO"
                className="!text-[12vw] leading-[0.8] text-center w-full max-w-none"
            />
        </WavyBackground>
    );
}
