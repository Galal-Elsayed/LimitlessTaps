'use client';

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export function Globe({
    className,
    config = {
        width: 600,
        height: 600,
        onRender: () => { },
        devicePixelRatio: 2,
        phi: 0,
        theta: 0,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.3, 0.3, 0.3],
        markerColor: [0.1, 0.8, 1],
        glowColor: [1, 1, 1],
        markers: [
            // Example markers: London, New York, Tokyo, San Francisco, Dubai
            { location: [37.7595, -122.4367], size: 0.03 },
            { location: [40.7128, -74.006], size: 0.1 },
            { location: [51.5074, -0.1278], size: 0.05 },
            { location: [35.6895, 139.6917], size: 0.07 },
            { location: [25.2048, 55.2708], size: 0.05 },
        ],
    }
}: {
    className?: string;
    config?: any;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionStart = useRef<number | null>(null);
    const rotationRef = useRef(0);

    useEffect(() => {
        let phi = 0;
        let width = 0;
        let globe: any;

        const onResize = () => {
            if (canvasRef.current) {
                width = canvasRef.current.offsetWidth;
            }
        };
        window.addEventListener('resize', onResize);
        onResize();

        if (!canvasRef.current) return;

        globe = createGlobe(canvasRef.current, {
            ...config,
            width: width * 2,
            height: width * 2,
            onRender: (state) => {
                if (pointerInteracting.current === null) {
                    phi += 0.002;
                }
                state.phi = phi + rotationRef.current;
                config.onRender(state);
            },
        });

        return () => {
            globe.destroy();
            window.removeEventListener('resize', onResize);
        };
    }, [config]);

    return (
        <div
            className={className}
            style={{
                width: "100%",
                maxWidth: "100%",
                aspectRatio: "1/1",
                margin: "auto",
                position: "relative",
            }}
        >
            <canvas
                ref={canvasRef}
                onPointerDown={(e) => {
                    pointerInteractionStart.current = e.clientX;
                    pointerInteracting.current = e.clientX;
                    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
                }}
                onPointerUp={() => {
                    pointerInteracting.current = null;
                    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
                }}
                onPointerOut={() => {
                    pointerInteracting.current = null;
                    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
                }}
                onPointerMove={(e) => {
                    if (pointerInteracting.current !== null && pointerInteractionStart.current !== null) {
                        const delta = e.clientX - pointerInteracting.current;
                        pointerInteracting.current = e.clientX;
                        rotationRef.current += delta / 200;
                    }
                }}
                style={{
                    width: "100%",
                    height: "100%",
                    cursor: "grab",
                    contain: "layout paint size",
                    opacity: 1,
                    transition: "opacity 1s ease",
                    touchAction: "none",
                }}
            />
        </div>
    );
}
