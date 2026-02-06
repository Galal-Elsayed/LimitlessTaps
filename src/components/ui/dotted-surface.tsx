"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { useReducedMotion, useDevicePerformance } from "@/hooks/use-performance";

type DottedSurfaceProps = Omit<React.ComponentProps<"div">, "ref">;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points[];
    animationId: number;
    count: number;
  } | null>(null);

  const prefersReducedMotion = useReducedMotion();
  const { isLowEnd, isMobile, performanceTier } = useDevicePerformance();

  // Always render particles, only skip for reduced motion preference
  const shouldRender = !prefersReducedMotion;

  // Use performanceTier as a stable dependency for particle count
  // Higher counts = more visible  // Use performanceTier as a stable dependency for particle count
  const particleCount = useMemo(() => {
    if (performanceTier === "low") return 1500;
    if (performanceTier === "medium") return 4000;
    return 8000; // High density for desktop
  }, [performanceTier]);

  useEffect(() => {
    // Early exit only if user prefers reduced motion
    if (!shouldRender) return;

    const container = containerRef.current;
    if (!container) return;

    // Use a mutable object to track the active animation frame ID across closures
    const state = {
      animationId: 0,
      mount: true,
      setupId: 0,
      scene: null as THREE.Scene | null,
      renderer: null as THREE.WebGLRenderer | null,
      handleResize: null as (() => void) | null,
      initialized: false,
    };

    const SEPARATION = 40; // Reduced for higher density
    // Dynamically adjust particle count based on device performance
    const baseAmount = Math.sqrt(particleCount);
    // Adjusted multipliers for wide field coverage
    const AMOUNTX = Math.round(baseAmount * 3);
    const AMOUNTY = Math.round(baseAmount * 1.5);

    const initScene = () => {
      if (!containerRef.current || !state.mount || state.initialized) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      // Ensure container has valid dimensions before initializing
      if (width === 0 || height === 0) {
        // Retry on next frame
        state.setupId = requestAnimationFrame(initScene);
        return;
      }

      state.initialized = true;

      // Scene setup
      const scene = new THREE.Scene();

      // Camera closer to ground for "landscape" effect and higher apparent density
      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
      camera.position.set(0, 300, 600); // Moved closer and lower
      camera.lookAt(0, 0, 0);

      // Reduce pixel ratio on low-end devices for better performance
      const maxPixelRatio = particleCount < 500 ? 1 : Math.min(window.devicePixelRatio, 2);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: particleCount >= 1000,
        powerPreference: particleCount < 500 ? "low-power" : "high-performance",
      });
      renderer.setPixelRatio(maxPixelRatio);
      renderer.setSize(width, height);

      containerRef.current.appendChild(renderer.domElement);

      // Create particles
      const positions: number[] = [];
      const colors: number[] = [];

      // Create geometry for all particles
      const geometry = new THREE.BufferGeometry();

      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
          const y = 0; // Will be animated
          const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

          positions.push(x, y, z);
          // Darker gray for subtle background
          colors.push(0.5, 0.5, 0.5);
        }
      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3),
      );
      geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

      // Create material
      const material = new THREE.PointsMaterial({
        size: 5, // Slightly smaller for clearer density
        vertexColors: true,
        transparent: true,
        opacity: 0.9, // Higher opacity
        sizeAttenuation: true,
      });

      // Create points object
      const points = new THREE.Points(geometry, material);
      scene.add(points);

      let count = 0;

      // Animation function
      const animate = () => {
        if (!state.mount) return;

        const positionAttribute = geometry.attributes.position;
        const positions = positionAttribute.array as Float32Array;

        let i = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            const index = i * 3;

            // Smoother wave animation
            positions[index + 1] =
              Math.sin((ix + count) * 0.3) * 30 +
              Math.sin((iy + count) * 0.5) * 30;

            i++;
          }
        }

        positionAttribute.needsUpdate = true;

        renderer.render(scene, camera);
        count += 0.02; // Slower animation

        state.animationId = requestAnimationFrame(animate);
      };

      // Handle window resize
      const handleResize = () => {
        if (!containerRef.current) return;
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      // Store references for cleanup
      state.scene = scene;
      state.renderer = renderer;
      state.handleResize = handleResize;

      window.addEventListener("resize", handleResize);

      // Start animation
      animate();

      // Store references for cleanup if needed (mainly for the ref object pattern, though simple closure works too)
      sceneRef.current = {
        scene,
        camera,
        renderer,
        particles: [points],
        animationId: state.animationId, // This is just initial, we use state.animationId for cleanup
        count,
      };
    };

    // Defer initialization to ensure container has dimensions
    // Using double RAF to ensure layout has completed
    state.setupId = requestAnimationFrame(() => {
      state.setupId = requestAnimationFrame(initScene);
    });

    // Cleanup function
    return () => {
      state.mount = false;
      cancelAnimationFrame(state.setupId);
      cancelAnimationFrame(state.animationId);

      // Remove resize listener
      if (state.handleResize) {
        window.removeEventListener("resize", state.handleResize);
      }

      // Clean up Three.js objects
      if (state.scene) {
        state.scene.traverse((object) => {
          if (object instanceof THREE.Points) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }

      if (state.renderer) {
        state.renderer.dispose();

        if (container && state.renderer.domElement) {
          // Check if the element is still a child before removing
          if (container.contains(state.renderer.domElement)) {
            container.removeChild(state.renderer.domElement);
          }
        }
      }

      sceneRef.current = null;
    };
  }, [shouldRender, particleCount]);

  // Return empty div only if user prefers reduced motion
  if (!shouldRender) {
    return <div className={cn("pointer-events-none fixed inset-0 -z-1", className)} {...props} />;
  }

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none fixed inset-0 -z-1", className)}
      {...props}
    />
  );
}
