'use client';

import { useTranslations } from "next-intl";
import { Globe } from "@/components/ui/Globe";
import { motion } from "framer-motion";

export function GlobeSection() {
    const t = useTranslations('home');

    return (
        <section className="relative w-full bg-[#0a0a0a] overflow-hidden py-12 md:py-24 px-6 md:px-8">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Left Side: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="z-10 text-center lg:text-left order-2 lg:order-1"
                >
                    <span className="text-[#00d4ff] font-semibold tracking-wide uppercase text-xs md:text-sm mb-3 md:mb-4 block">
                        {t('globe_label')}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                        {t('globe_title')}
                    </h2>
                    <p className="text-base md:text-lg text-gray-400 mb-8 md:mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                        {t('globe_description')}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 text-left max-w-md mx-auto lg:mx-0">
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">{t('stat_1_value')}</div>
                            <div className="text-xs md:text-sm text-gray-500">{t('stat_1_label')}</div>
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">{t('stat_2_value')}</div>
                            <div className="text-xs md:text-sm text-gray-500">{t('stat_2_label')}</div>
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">{t('stat_3_value')}</div>
                            <div className="text-xs md:text-sm text-gray-500">{t('stat_3_label')}</div>
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">{t('stat_4_value')}</div>
                            <div className="text-xs md:text-sm text-gray-500">{t('stat_4_label')}</div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Globe Interaction */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="relative flex items-center justify-center h-[300px] sm:h-[450px] md:h-[600px] w-full order-1 lg:order-2"
                >
                    {/* Subtle Glow Background */}
                    <div className="absolute inset-0 bg-blue-500/10 blur-[80px] md:blur-[120px] rounded-full scale-75 md:scale-100" />

                    <Globe
                        className="w-full h-full"
                        config={{
                            width: 600,
                            height: 600,
                            onRender: () => { },
                            devicePixelRatio: 2,
                            phi: 0,
                            theta: 0.3,
                            dark: 1,
                            diffuse: 1.2,
                            mapSamples: 16000,
                            mapBrightness: 6,
                            baseColor: [0.3, 0.3, 0.3],
                            markerColor: [0.1, 0.8, 1],
                            glowColor: [1, 1, 1],
                            markers: [
                                { location: [37.7595, -122.4367], size: 0.03 },
                                { location: [40.7128, -74.006], size: 0.1 },
                                { location: [51.5074, -0.1278], size: 0.05 },
                                { location: [35.6895, 139.6917], size: 0.07 },
                                { location: [25.2048, 55.2708], size: 0.05 },
                            ],
                        }}
                    />
                </motion.div>
            </div>

            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/5 blur-[100px] md:blur-[150px] -z-1" />
            <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-600/5 blur-[100px] md:blur-[150px] -z-1" />
        </section>
    );
}
