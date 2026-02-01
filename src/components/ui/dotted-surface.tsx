"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

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

  useEffect(() => {
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

    const SEPARATION = 60;
    const AMOUNTX = 140;
    const AMOUNTY = 120;

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

      const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
      camera.position.set(0, 400, 600);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
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
          colors.push(0.6, 0.6, 0.6);
        }
      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3),
      );
      geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

      // Create material
      const material = new THREE.PointsMaterial({
        size: 7,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
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

            // Animate Y position with sine waves
            // Reduced amplitude for "smaller" wave
            positions[index + 1] =
              Math.sin((ix + count) * 0.3) * 40 +
              Math.sin((iy + count) * 0.5) * 40;

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
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none fixed inset-0 -z-1", className)}
      {...props}
    />
  );
}
