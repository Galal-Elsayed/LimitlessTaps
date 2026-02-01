"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

export const CanvasRevealEffect = ({
    animationSpeed = 0.4,
    opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
    colors = [[0, 255, 255]],
    containerClassName,
    dotSize = 3,
    showGradient = true,
}: {
    animationSpeed?: number;
    opacities?: number[];
    colors?: number[][];
    containerClassName?: string;
    dotSize?: number;
    showGradient?: boolean;
}) => {
    return (
        <div className={cn("h-full relative bg-black w-full", containerClassName)}>
            <div className="h-full w-full">
                <DotMatrix
                    colors={colors}
                    dotSize={dotSize}
                    opacities={opacities}
                    shader={`
            float animation_speed_factor = ${animationSpeed.toFixed(1)};
            float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.1 + (random(st2) * 0.1);
            opacity *= step(intro_offset, u_time * animation_speed_factor);
            opacity *= clamp((1.0 - step(intro_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.0);
          `}
                    center={["x", "y"]}
                />
            </div>
            {showGradient && (
                <div className="absolute inset-0 bg-gradient-to-t from-black to-[84%]" />
            )}
        </div>
    );
};

const DotMatrix = ({
    colors = [[0, 0, 0]],
    opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
    totalSize = 4,
    dotSize = 2,
    shader = "",
    center = ["x", "y"],
}: {
    colors?: number[][];
    opacities?: number[];
    totalSize?: number;
    dotSize?: number;
    shader?: string;
    center?: ("x" | "y")[];
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };

        window.addEventListener("resize", resize);
        resize();

        // Random generator
        const seeds = new Float32Array(200 * 200).map(() => Math.random());
        const getRandom = (x: number, y: number) => {
            const idx = Math.floor(x) + Math.floor(y) * 200;
            return seeds[idx % seeds.length];
        }

        const render = () => {
            time += 0.01;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const width = canvas.width;
            const height = canvas.height;
            const spacing = totalSize * 5; // spacing between dots

            const cols = Math.ceil(width / spacing);
            const rows = Math.ceil(height / spacing);

            // Create a warm/orange palette mixer
            // We will just cycle through colors provided
            const [r, g, b] = colors[0];

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * spacing;
                    const y = j * spacing;

                    // Normalized coords
                    const nx = i / cols;
                    const ny = j / rows;

                    // Random opacity based on time and position (simulating the shader)
                    // simple wave
                    const distFromCenter = Math.sqrt(Math.pow(nx - 0.5, 2) + Math.pow(ny - 0.5, 2));

                    // Simulating the "shader" logic in JS roughly for performance
                    // float animation_speed_factor = ...
                    // opacity *= step(intro_offset, u_time * animation_speed_factor);

                    // We'll make a flowing noise effect
                    const noise = getRandom(i, j);

                    // Dynamic alpha
                    // Base alpha
                    const alpha = opacities[Math.floor(noise * opacities.length)];

                    // Wave animation
                    const wave = Math.sin(time + nx * 10 + ny * 10);

                    // Only show some dots
                    if (wave > 0) {
                        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                        ctx.fillRect(x, y, dotSize, dotSize);
                    }
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [colors, opacities, totalSize, dotSize]);

    return <canvas ref={canvasRef} className="h-full w-full" />;
};
