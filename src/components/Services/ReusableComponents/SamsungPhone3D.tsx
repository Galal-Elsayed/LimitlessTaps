"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

function Model(props: any) {
    const { scene } = useGLTF('/Services/3d/samsung_phone.glb');
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!group.current) return;

        // Idle animation: Gentle sway left and right
        const time = state.clock.elapsedTime;
        group.current.rotation.y = Math.sin(time * 0.5) * 0.1;
    });

    return (
        <group ref={group} {...props} dispose={null}>
            {/* 
              Adjusted for Phone:
              Scale might need to be larger or smaller than laptop roughly.
              A phone is taller/narrower.
           */}
            <primitive
                object={scene}
                position={[0, 0, 0]} // Center it
                rotation={[0, 0.1, 0]} // Start neutral
                scale={0.1} // Slightly larger scale for visibility
            />
        </group>
    );
}

export default function SamsungPhone3D({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) return null;

    return (
        <div className={cn("w-full h-full relative", className)}>
            <Canvas camera={{ position: [0, 0, 3], fov: 125 }} dpr={[1, 2]}>
                <ambientLight intensity={1.5} />
                <spotLight position={[5, 10, 5]} angle={0.5} penumbra={1} intensity={2} castShadow />
                <pointLight position={[-10, 0, -10]} intensity={1} />

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
                <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={10} blur={2} far={4} />
            </Canvas>
        </div >
    );
}

useGLTF.preload('/Services/3d/samsung_phone.glb');
