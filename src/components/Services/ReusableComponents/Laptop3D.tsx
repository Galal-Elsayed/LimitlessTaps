"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

function Model(props: any) {
    const { scene } = useGLTF('/Services/3d/laptop.glb');
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!group.current) return;

        // Idle animation: Gentle sway left and right
        // Speed: 0.5, Amplitude: 0.1 radians (approx 5-6 degrees)
        const time = state.clock.elapsedTime;
        group.current.rotation.y = Math.sin(time * 0.5) * 0.1;
    });

    return (
        <group ref={group} {...props} dispose={null}>
            {/* 
          Position: 
          X=0.5 (Move slightly right to be closer to text)
          Y=-0.5 (Center vertically)
          
          Rotation:
          Y = -1.5 (Rotated -90 degrees approx to face forward if default was Side)
          Adjusted to face SCREEN directly.
       */}
            <primitive
                object={scene}
                position={[0.2, -0.4, 0.3]}
                rotation={[0.1, 2.2, 0]}
                scale={1.5}
            />
        </group>
    );
}

export default function Laptop3D({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Delay rendering slightly or wait for mount to "enable" interactions
        const timer = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) return null;

    return (
        <div className={cn("w-full h-full relative", className)}>
            <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }} dpr={[1, 2]}>
                <ambientLight intensity={1.5} />
                <spotLight position={[5, 10, 5]} angle={0.5} penumbra={1} intensity={2} castShadow />
                <pointLight position={[-10, 0, -10]} intensity={1} />

                {/* Disable Grab/Rotate interaction */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={false}
                    minPolarAngle={Math.PI / 2.5}
                    maxPolarAngle={Math.PI / 2}
                />

                <Float
                    speed={2}
                    rotationIntensity={0.1}
                    floatIntensity={0.5}
                    floatingRange={[-0.05, 0.05]}
                >
                    <Model />
                </Float>

                <Environment preset="city" />
                <ContactShadows position={[0, -1.5, 0]} opacity={0.6} scale={10} blur={2} far={4} />
            </Canvas>
        </div >
    );
}

// Preload the model
useGLTF.preload('/Services/3d/laptop.glb');
