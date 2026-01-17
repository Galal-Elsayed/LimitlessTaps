'use client';


import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { Globe } from "@/components/ui/Globe";
import ContactForm from "@/app/[locale]/contact/_components/ContactForm";
import ContactGrid from "@/app/[locale]/contact/_components/ContactGrid";
import FAQ from "@/app/[locale]/contact/_components/FAQ";

export default function ContactPage() {
    const t = useTranslations('contact');

    const markers: { location: [number, number]; size: number }[] = [
        { location: [37.7595, -122.4367], size: 0.1 },
        { location: [40.7128, -74.006], size: 0.1 },
        { location: [51.5074, -0.1278], size: 0.1 },
        { location: [25.2048, 55.2708], size: 0.1 },
        { location: [35.6895, 139.6917], size: 0.1 },
        { location: [48.8566, 2.3522], size: 0.1 },
        { location: [-33.8688, 151.2093], size: 0.1 },
        { location: [-23.5505, -46.6333], size: 0.1 },
    ];

    const arcs = [
        { start: [37.7595, -122.4367], end: [40.7128, -74.006] },
        { start: [40.7128, -74.006], end: [51.5074, -0.1278] },
        { start: [51.5074, -0.1278], end: [48.8566, 2.3522] },
        { start: [48.8566, 2.3522], end: [25.2048, 55.2708] },
        { start: [25.2048, 55.2708], end: [35.6895, 139.6917] },
        { start: [35.6895, 139.6917], end: [37.7595, -122.4367] },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">


            {/* Massive Globe Background - Blended with #0a0a0a */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
                <div className="absolute top-1/2 left-1/2   -translate-y-1/2 w-[1200px] h-[1200px] md:w-[1600px] md:h-[1600px] ">
                    <Globe
                        className="w-full h-full"
                        config={{
                            width: 2000,
                            height: 2000,
                            onRender: () => { },
                            devicePixelRatio: 1, // Reduced for performance
                            phi: 0,
                            theta: 0.3,
                            dark: 1,
                            diffuse: 1.2,
                            mapSamples: 12000, // Reduced from 16000
                            mapBrightness: 6,
                            baseColor: [0.1, 0.1, 0.1], // Dark gray base to match #0a0a0a
                            markerColor: [0.1, 0.8, 1], // Brand Cyan
                            glowColor: [0.2, 0.2, 0.2], // Subtle glow
                            markers: markers,
                            arcs: arcs,
                        }}
                    />
                </div>
            </div>

            {/* Content Overlay */}
            <main className="relative z-10 max-w-7xl mx-auto py-15 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    {/* Left Side: Header & Info */}
                    <motion.div
                        id="hero"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='col-span-1 lg:col-span-2'
                    >
                        <h1 className="text-6xl uppercase flex font-bold tracking-tight mb-3">
                            {t.rich('hero.title', {
                                br: () => <br />,
                                gradient: (chunks) => <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-[#00d4ff]">{chunks}</span>
                            })}
                        </h1>
                        <p className="text-xl text-gray-400">
                            {t('hero.subtitle')}
                        </p>
                    </motion.div>
                    {/* Left Side: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full flex"
                    >
                        <ContactForm />
                    </motion.div>

                    {/* Right Side: Contact Grid */}
                    <div className="w-full flex">
                        <ContactGrid />
                    </div>
                </div>

                <FAQ />
            </main>

            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[180px] -z-1 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00d4ff]/10 blur-[180px] -z-1 -translate-x-1/2 translate-y-1/2" />
        </div>
    );
}
