"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

export const TextRevealEffect = ({
    animationSpeed = 1,
    opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
    colors = [[255, 255, 255]],
    containerClassName,
    fontSize = 12,
    characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    slideMode = false,
}: {
    animationSpeed?: number;
    opacities?: number[];
    colors?: number[][];
    containerClassName?: string;
    fontSize?: number;
    characterSet?: string;
    slideMode?: boolean;
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        // We'll use a slower clock for text updates so it's readable/techy, not just noise
        let frameCount = 0;

        const resize = () => {
            const parent = containerRef.current;
            if (parent) {
                // scale for high DPI
                const dpr = window.devicePixelRatio || 1;
                canvas.width = parent.clientWidth * dpr;
                canvas.height = parent.clientHeight * dpr;
                canvas.style.width = `${parent.clientWidth}px`;
                canvas.style.height = `${parent.clientHeight}px`;
                ctx.scale(dpr, dpr);
            }
        };

        window.addEventListener("resize", resize);
        resize();

        // Font settings
        ctx.font = `${fontSize}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Pre-calculate grid
        // We need to know how many cols/rows fit
        // We'll treat characters as square-ish for the grid
        const charWidth = fontSize * 0.8;
        const charHeight = fontSize * 1.2;

        const render = () => {
            frameCount++;
            // Throttling: Update every X frames based on animationSpeed (inverted logic for speed)
            // Speed 1 = Slow (update every 10 frames), Speed 5 = Fast (update every 2 frames)
            const updateThrottle = Math.max(1, Math.floor(10 / animationSpeed));

            const width = canvas.width / (window.devicePixelRatio || 1);
            const height = canvas.height / (window.devicePixelRatio || 1);

            ctx.clearRect(0, 0, width, height);

            const cols = Math.ceil(width / charWidth);
            const rows = Math.ceil(height / charHeight);

            const [r, g, b] = colors[0]; // Simple single color support for now per instance

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    // We want stable randomness per cell that changes over time
                    // Simple hash seeded by time/frame

                    // Only update random character occasionally
                    // But we need to draw EVERY frame.
                    // So we need a stable way to pick a char based on (i, j, timeBlock)

                    const timeBlock = Math.floor(frameCount / updateThrottle);

                    // Random-ish char index
                    // Simple pseudo-random mixer
                    const pseudoRandom = Math.sin(i * 12.9898 + j * 78.233 + timeBlock) * 43758.5453;
                    const charIndex = Math.floor((Math.abs(pseudoRandom) % 1) * characterSet.length);
                    const char = characterSet[charIndex];

                    // Opacity: Also needs to flux
                    // Maybe a wave?
                    const wave = Math.sin(i * 0.1 + j * 0.1 + frameCount * 0.02);
                    // Map wave (-1 to 1) to opacity index
                    // Let's just pick discrete opacity from the array based on noise
                    const opacityNoise = Math.abs(Math.sin(i * 3 + j * 5 + frameCount * 0.05));
                    const opacityIndex = Math.floor(opacityNoise * opacities.length);
                    const alpha = opacities[opacityIndex] || 0.1;

                    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;

                    // Draw
                    const x = i * charWidth + charWidth / 2;
                    const y = j * charHeight + charHeight / 2;

                    // Optional: Slide effect for "Digital Rain" feel
                    if (slideMode) {
                        // not implemented fully to keep it simple "matrix style" static grid
                    }

                    ctx.fillText(char, x, y);
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [fontSize, colors, opacities, animationSpeed, characterSet]);

    return (
        <div ref={containerRef} className={cn("h-full relative bg-black w-full overflow-hidden", containerClassName)}>
            <canvas ref={canvasRef} className="h-full w-full block" />
        </div>
    );
};
