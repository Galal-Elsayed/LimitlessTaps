'use client';

import { useTranslations } from "next-intl";
import { Globe } from "@/components/ui/Globe";
import { motion } from "framer-motion";

export function GlobeSection() {
    const t = useTranslations('home');

    const markers: { location: [number, number]; size: number }[] = [
        { location: [37.7595, -122.4367], size: 0.1 }, // SF
        { location: [40.7128, -74.006], size: 0.1 },  // NY
        { location: [51.5074, -0.1278], size: 0.1 },  // London
        { location: [25.2048, 55.2708], size: 0.1 },   // Dubai
        { location: [35.6895, 139.6917], size: 0.1 },  // Tokyo
        { location: [48.8566, 2.3522], size: 0.1 },    // Paris
        { location: [-33.8688, 151.2093], size: 0.1 }, // Sydney
        { location: [-23.5505, -46.6333], size: 0.1 }, // Sao Paulo
    ];

    const arcs = [
        { start: [37.7595, -122.4367], end: [40.7128, -74.006] },
        { start: [40.7128, -74.006], end: [51.5074, -0.1278] },
        { start: [51.5074, -0.1278], end: [48.8566, 2.3522] },
        { start: [48.8566, 2.3522], end: [25.2048, 55.2708] },
        { start: [25.2048, 55.2708], end: [35.6895, 139.6917] },
        { start: [35.6895, 139.6917], end: [37.7595, -122.4367] },
        { start: [37.7595, -122.4367], end: [-33.8688, 151.2093] },
        { start: [-33.8688, 151.2093], end: [35.6895, 139.6917] },
        { start: [25.2048, 55.2708], end: [-23.5505, -46.6333] },
        { start: [-23.5505, -46.6333], end: [40.7128, -74.006] },
    ];

    return (
        <section className="relative h-fit w-full overflow-hidden py-20 md:py-32">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] -z-1 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[150px] -z-1 -translate-x-1/2 translate-y-1/2" />

            <div className="max-w-[1400px] h-full mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="z-10 lg:col-span-6 px-6 lg:px-0"
                    >
                        <span className="text-[#00d4ff] font-bold tracking-wider uppercase text-xs md:text-sm mb-4 block">
                            {t('globe_label')}
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                            {t('globe_title')}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-xl leading-relaxed">
                            {t('globe_description')}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10">
                            <div>
                                <div className="text-2xl font-bold text-white mb-1">{t('stat_1_value')}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{t('stat_1_label')}</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white mb-1">{t('stat_2_value')}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{t('stat_2_label')}</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white mb-1">{t('stat_3_value')}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{t('stat_3_label')}</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white mb-1">{t('stat_4_value')}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{t('stat_4_label')}</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Globe Interaction */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="relative lg:col-span-6 flex items-center justify-center lg:justify-end h-[400px] md:h-[600px] lg:h-[800px] w-full"
                    >
                        {/* Globe Container with specific positioning to mimic Stripe */}
                        <div className="absolute top-1/2 left-1/2 lg:left-full -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] lg:w-[1500px] lg:h-[1500px] pointer-events-none">
                            <div className="w-full h-full pointer-events-auto">
                                <Globe
                                    className="w-full h-full"
                                    config={{
                                        width: 1500,
                                        height: 1500,
                                        onRender: () => { },
                                        devicePixelRatio: 2,
                                        phi: 0,
                                        theta: 0.3,
                                        dark: 1,
                                        diffuse: 1.2,
                                        mapSamples: 16000,
                                        mapBrightness: 6,
                                        baseColor: [0.05, 0.15, 0.3], // Navy base color
                                        markerColor: [0.1, 0.8, 1],
                                        glowColor: [0.1, 0.2, 0.4],
                                        markers: markers,
                                        arcs: arcs,
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
