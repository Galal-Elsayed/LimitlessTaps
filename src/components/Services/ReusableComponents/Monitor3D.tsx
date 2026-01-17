"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

function Model(props: any) {
    const { scene } = useGLTF('/Services/3d/monitor.glb');
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!group.current) return;

        // Idle animation: Gentle sway around base rotation (0.5)
        const time = state.clock.elapsedTime;
        group.current.rotation.y = -0.1 + Math.sin(time * 0.5) * 0.01; // Base rotation + small sway
    });

    return (
        <group ref={group} {...props} dispose={null}>
            <primitive
                object={scene}
                position={[-17.5, -4, 0]} // Center it
                rotation={[0, 0.5, 0]} // Slight rotation to show angle
                scale={7.15} // Small scale - adjust if needed
            />
        </group>
    );
}

export default function Monitor3D({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) return null;

    return (
        <div className={cn("w-full h-full relative", className)}>
            <Canvas camera={{ position: [0, 0, 3], fov: 40 }} dpr={[1, 2]}>
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

                <Model />

                <Environment preset="city" />
                <ContactShadows position={[0, -1.5, 0]} opacity={0.6} scale={10} blur={2} far={4} />
            </Canvas>
        </div>
    );
}

// Preload the model
useGLTF.preload('/Services/3d/monitor.glb');
