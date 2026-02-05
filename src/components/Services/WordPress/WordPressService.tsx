"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

export default function WordPressService() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // 3D Rotation & Scale Animation
    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

    const rotateY = useSpring(
        useTransform(scrollYProgress, [0, 0.4], [25, 0]),
        springConfig
    );
    const rotateX = useSpring(
        useTransform(scrollYProgress, [0, 0.4], [10, 0]),
        springConfig
    );
    const scale = useSpring(
        useTransform(scrollYProgress, [0, 0.4], [0.85, 1]),
        springConfig
    );
    // Adjusted y config for better alignment
    const y = useSpring(
        useTransform(scrollYProgress, [0, 0.4], [-50, 0]),
        springConfig
    );

    return (
        <section ref={containerRef} className="w-full py-0 pb-1 md:py-16 md:pb-32 px-4 min-[900px]:max-[1500px]:!px-32 bg-[#0a0a0a] flex justify-center overflow-visible perspective-[2000px] -mt-4 md:mt-8 relative z-20">
            <motion.div
                style={{
                    rotateY,
                    rotateX,
                    scale,
                    y,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-full max-w-[1400px]"
            >
                <MonitorFrame>
                    <WordPressUI />
                </MonitorFrame>
            </motion.div>
        </section>
    );
}

const MonitorFrame = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative mx-auto w-full transform-style-3d">
            {/* Monitor Bezel */}
            <div className="relative bg-[#111] rounded-[2rem] p-5 shadow-[0_0_0_2px_#333,0_40px_80px_rgba(0,0,0,0.8)] z-20 overflow-hidden">
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[8px] font-bold text-white/50 tracking-[0.3em] uppercase">
                    Limitless Taps
                </div>
                {/* Inner Bezel */}
                <div className="bg-black rounded-[1.5rem] overflow-hidden relative shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] border border-white/5">
                    {/* Screen Content */}
                    <div className="relative w-full aspect-video bg-[#1e1e1e] overflow-hidden">
                        {children}
                        {/* Screen Glare */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-30 pointer-events-none z-50 mix-blend-overlay" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- ENHANCED WORDPRESS UI ---

const WordPressUI = () => {
    const t = useTranslations('WordPress.service');
    const locale = useLocale();
    const isRTL = locale === 'ar';
    const [activeTab, setActiveTab] = useState('editor'); // 'dashboard', 'plugins', 'editor'

    // Cycle through main views (Desktop only)
    useEffect(() => {
        // Only animate on larger screens
        if (window.innerWidth < 768) return;

        const timer = setInterval(() => {
            setActiveTab(prev => prev === 'editor' ? 'plugins' : 'editor');
        }, 12000); // Increased duration to allow for full typing animation
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={`flex flex-col h-full w-full text-[#1d2327] font-sans select-none bg-[#f0f0f1] ${isRTL ? 'rtl' : 'ltr'}`}>
            {/* 1. Admin Bar */}
            <div className="h-8 bg-[#1d2327] flex items-center justify-between px-3 z-30 shrink-0 text-white text-[13px]">
                <div className="flex items-center gap-4">
                    <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center font-serif font-bold text-xs">W</div>
                    <div className="flex items-center gap-1 font-semibold">
                        {/* Short version for small screens (300-500px), full for larger */}
                        <span className="min-[500px]:hidden">{t('adminBar.siteNameShort')}</span>
                        <span className="hidden min-[500px]:inline">{t('adminBar.siteName')}</span>
                    </div>
                    <div className="flex gap-3 text-white/70">
                        <span>{t('adminBar.new')}</span>
                        {/* Short version for small screens */}
                        <span className="min-[500px]:hidden">{t('adminBar.editPageShort')}</span>
                        <span className="hidden min-[500px]:inline">{t('adminBar.editPage')}</span>
                        <span className="hidden md:inline text-green-400 font-medium">{t('adminBar.seoGood')}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {/* Short version for small screens */}
                    <span className="min-[500px]:hidden">{t('adminBar.howdyShort')}</span>
                    <span className="hidden min-[500px]:inline">{t('adminBar.howdy')}</span>
                    <div className="w-5 h-5 bg-white/20 rounded ml-1" />
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                {/* 2. Admin Sidebar */}
                <div className="w-40 bg-[#1d2327] flex flex-col pt-2 shrink-0 z-20 hidden md:flex text-white">
                    <div className="space-y-0.5">
                        <SidebarItem icon="⚡" label={t('sidebar.dashboard')} />
                        <SidebarItem icon="📌" label={t('sidebar.posts')} />
                        <SidebarItem icon="📷" label={t('sidebar.media')} />
                        <SidebarItem icon="📄" label={t('sidebar.pages')} active={activeTab === 'editor'} />
                        <SidebarItem icon="💬" label={t('sidebar.comments')} />
                        <div className="h-4" />
                        <SidebarItem icon="🎨" label={t('sidebar.appearance')} />
                        <SidebarItem icon="🔌" label={t('sidebar.plugins')} active={activeTab === 'plugins'} />
                        <SidebarItem icon="👥" label={t('sidebar.users')} />
                        <SidebarItem icon="🔧" label={t('sidebar.tools')} />
                        <SidebarItem icon="⚙️" label={t('sidebar.settings')} />
                    </div>
                </div>

                {/* 3. Main Content Area */}
                <div className="flex-1 bg-[#f0f0f1] relative overflow-hidden flex flex-col">

                    {/* MOBILE ANIMATION: Advanced Tablet Dashboard */}
                    <div className="md:hidden inset-0 absolute flex items-center justify-center p-4">
                        {/* Tablet Frame */}
                        <div className="w-full max-w-[400px] h-[550px] bg-white rounded-[2rem] shadow-2xl flex flex-col border-[8px] border-[#2c2c2c] overflow-hidden relative">
                            {/* Camera Dot */}
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#1a1a1a] z-50" />

                            {/* WP Admin Top Bar */}
                            <div className="h-10 bg-[#1d2327] flex items-center justify-between px-4 z-40">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                                        <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" /></svg>
                                    </div>
                                    <div className="w-16 h-2 bg-white/20 rounded-full" />
                                </div>
                                <div className="w-6 h-6 rounded-full bg-white/10" />
                            </div>

                            {/* Dashboard Content Layout */}
                            <div className="flex flex-1 overflow-hidden bg-[#f0f0f1]">
                                {/* Sidebar */}
                                <div className="w-12 bg-[#1d2327] flex flex-col items-center py-4 gap-4">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className={`w-6 h-6 rounded ${i === 0 ? 'bg-[#2271b1]' : 'bg-white/10'}`} />
                                    ))}
                                </div>

                                {/* Main Area */}
                                <div className="flex-1 p-4 flex flex-col gap-4 overflow-hidden">
                                    {/* Welcome Banner */}
                                    <div className="w-full h-16 bg-white border border-gray-200 p-3 rounded shadow-sm flex flex-col justify-center gap-2">
                                        <div className="w-1/2 h-3 bg-gray-200 rounded" />
                                        <div className="w-1/3 h-2 bg-gray-100 rounded" />
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <motion.div
                                            className="bg-white p-3 rounded shadow-sm border-l-4 border-green-500"
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <div className="text-[10px] text-gray-400 mb-1">Visitors</div>
                                            <div className="text-lg font-bold text-gray-700">12.5k</div>
                                        </motion.div>
                                        <motion.div
                                            className="bg-white p-3 rounded shadow-sm border-l-4 border-blue-500"
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <div className="text-[10px] text-gray-400 mb-1">Sales</div>
                                            <div className="text-lg font-bold text-gray-700">$4.2k</div>
                                        </motion.div>
                                    </div>

                                    {/* Recent Activity List */}
                                    <div className="flex-1 bg-white rounded shadow-sm border border-gray-200 p-3 overflow-hidden flex flex-col gap-3">
                                        <div className="text-xs font-bold text-gray-600 border-b pb-2">Recent Activity</div>
                                        {[1, 2, 3, 4].map((i) => (
                                            <motion.div
                                                key={i}
                                                className="flex items-center gap-2"
                                                animate={{ opacity: [0.4, 1, 0.4] }}
                                                transition={{ duration: 3, delay: i * 0.8, repeat: Infinity }}
                                            >
                                                <div className="w-8 h-8 rounded-full bg-gray-100 shrink-0" />
                                                <div className="space-y-1 flex-1">
                                                    <div className="w-3/4 h-2 bg-gray-100 rounded" />
                                                    <div className="w-1/2 h-2 bg-gray-50 rounded" />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DESKTOP ANIMATION (Complex Tabs) */}
                    <div className="hidden md:block w-full h-full relative">
                        <AnimatePresence mode="wait">
                            {activeTab === 'editor' ? (
                                <EditorView key="editor" />
                            ) : (
                                <PluginsView key="plugins" />
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- VIEW 1: PAGE EDITOR (TYPING + DRAG & DROP) ---

const EditorView = () => {
    const t = useTranslations('WordPress.service.editor');

    return (
        <motion.div
            className="flex-1 flex flex-col bg-white h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Editor Toolbar */}
            <div className="h-14 border-b border-gray-200 bg-white flex items-center px-4 justify-between shrink-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#0a0a0a] rounded flex items-center justify-center text-white text-xl font-bold transition-colors">+</div>
                    <div className="h-6 w-px bg-gray-200 mx-2" />
                    <div className="text-sm text-gray-400">{t('editing')}</div>
                    <div className="text-sm font-bold text-gray-800">{t('homePage')}</div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end mr-2">
                        <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{t('seoScore')}</div>
                        <SeoScoreAnimation />
                    </div>
                    <div className="px-5 py-2 text-xs font-bold text-white bg-blue-600 rounded shadow-sm transition-all">{t('update')}</div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Canvas */}
                <div className="flex-1 bg-[#f0f0f1] p-4 md:p-8 overflow-y-auto relative flex justify-center">
                    <div className="w-full max-w-3xl bg-white min-h-full md:min-h-[800px] shadow-sm selection-dashed relative border border-gray-200">
                        <div className="flex flex-col">

                            {/* Hero Section */}
                            <div className="p-4 md:p-12 text-center bg-gray-50 border-b border-gray-100 flex flex-col items-center">
                                {/* Simulated Image Block */}
                                <motion.div
                                    className="bg-blue-100 text-blue-800 text-[10px] font-bold px-3 py-1 rounded-full mb-4 md:mb-6 inline-block"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {t('newFeature')}
                                </motion.div>

                                {/* TYPING ANIMATION HEADLINE */}
                                <h1 className="text-xl md:text-4xl font-extrabold text-gray-900 mb-2 md:mb-4 tracking-tight leading-tight min-h-[2rem] md:min-h-[3rem]">
                                    <TypingText text={t('headline')} />
                                </h1>

                                <p className="text-gray-500 max-w-md mx-auto mb-6 md:mb-8 text-xs md:text-sm leading-relaxed">
                                    {t('description')}
                                </p>

                                <div className="flex gap-4">
                                    <motion.div
                                        className="h-10 w-32 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold shadow-sm"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {t('getStarted')}
                                    </motion.div>
                                    <div className="h-10 w-32 bg-white border border-gray-300 rounded flex items-center justify-center text-gray-700 text-xs font-bold shadow-sm hidden md:flex">{t('documentation')}</div>
                                </div>
                            </div>

                            {/* Features Grid Simulation - Simplified for Mobile */}
                            <div className="p-4 md:p-12 bg-white hidden md:block">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                                    <FeatureBlock icon="⚡" title={t('lightningFast')} delay={2.5} />
                                    <FeatureBlock icon="🎨" title={t('pixelPerfect')} delay={2.7} />
                                    <FeatureBlock icon="🔒" title={t('secureCore')} delay={2.9} />
                                </div>
                            </div>

                            {/* Mobile Features List */}
                            <div className="p-6 bg-white md:hidden flex justify-around border-t border-gray-100">
                                <div className="text-xl">⚡</div>
                                <div className="text-xl">🎨</div>
                                <div className="text-xl">🔒</div>
                            </div>

                            {/* Cursor Dragging Block Interaction */}
                            <div className="px-4 md:px-12 pb-6 md:pb-12 hidden md:block">
                                <DropZoneAnimation dropText={t('dropBlockHere')} startText={t('startYourJourney')} />
                            </div>

                        </div>
                    </div>
                </div>

                {/* Sidebar Panel - SEO & Block Settings (Hidden on Mobile) */}
                <motion.div
                    className="w-72 bg-white border-l border-gray-200 p-0 hidden md:flex flex-col shadow-xl absolute right-0 top-14 bottom-0 z-20"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                >
                    <div className="flex border-b border-gray-200">
                        <div className="flex-1 p-3 text-center text-xs font-bold text-gray-900 border-b-2 border-blue-600">{t('settings')}</div>
                        <div className="flex-1 p-3 text-center text-xs font-bold text-gray-400">{t('styles')}</div>
                    </div>

                    <div className="p-4 space-y-6 overflow-y-auto">
                        {/* SEO Meta Box Simulation */}
                        <div className="border border-gray-200 rounded p-3 bg-gray-50">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-gray-700">{t('yoastSeo')}</span>
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-green-500"
                                        initial={{ width: "30%" }}
                                        animate={{ width: "85%" }}
                                        transition={{ duration: 3, delay: 1 }}
                                    />
                                </div>
                                <div className="text-[10px] text-gray-500">{t('readability')} <strong className="text-green-600">{t('good')}</strong></div>
                            </div>
                        </div>

                        {/* Block Properties */}
                        <div className="space-y-3">
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('typography')}</div>
                            <div className="flex gap-2">
                                <div className="w-8 h-8 border border-gray-200 rounded flex items-center justify-center text-xs font-bold bg-gray-100">S</div>
                                <div className="w-8 h-8 border border-gray-200 rounded flex items-center justify-center text-xs font-bold bg-blue-50 border-blue-200 text-blue-600">M</div>
                                <div className="w-8 h-8 border border-gray-200 rounded flex items-center justify-center text-xs font-bold bg-gray-100">L</div>
                                <div className="w-8 h-8 border border-gray-200 rounded flex items-center justify-center text-xs font-bold bg-gray-100">XL</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('colorSettings')}</div>
                            <div className="grid grid-cols-5 gap-2">
                                <div className="w-6 h-6 rounded-full bg-black ring-2 ring-offset-1 ring-gray-200" />
                                <div className="w-6 h-6 rounded-full bg-blue-600" />
                                <div className="w-6 h-6 rounded-full bg-purple-600" />
                                <div className="w-6 h-6 rounded-full bg-green-500" />
                                <div className="w-6 h-6 rounded-full bg-red-500" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Simulated Cursor */}
                <CursorDragAnimation movingText={t('movingCtaButton')} />
            </div>
        </motion.div>
    );
};

// --- VIEW 2: PLUGIN INSTALLATION ---

const PluginsView = () => {
    const t = useTranslations('WordPress.service.plugins');

    return (
        <motion.div
            className="flex-1 flex flex-col bg-[#f0f0f1] h-full p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="max-w-5xl mx-auto w-full space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-medium text-[#1d2327]">{t('title')} <span className="text-gray-500 text-sm font-normal ml-2">{t('addNew')}</span></h1>
                    <div className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-600 flex items-center gap-2">
                        <span>🔍</span> {t('searchPlugins')}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[300px] md:max-h-none">
                    {/* Featured Plugin Card - Installing Animation */}
                    <div className="bg-white border border-gray-200 rounded p-4 flex flex-col gap-4 shadow-sm relative overflow-hidden group min-h-[140px]">
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-blue-50 rounded flex items-center justify-center text-3xl">🚀</div>
                            <div>
                                <h3 className="font-bold text-[#1d2327]">{t('limitlessSpeed')}</h3>
                                <p className="text-xs text-gray-500 mt-1">{t('limitlessSpeedDesc')}</p>
                            </div>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-50">
                            <div className="flex gap-1 text-xs text-yellow-500">★★★★★ <span className="text-gray-400">(500+)</span></div>
                            <InstallButtonAnimation installNow={t('installNow')} installing={t('installing')} activate={t('activate')} />
                        </div>
                        {/* Success Toast simulating */}
                        <motion.div
                            className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded shadow-lg flex items-center gap-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: [0, 1, 1, 0], y: [-10, 0, 0, -10] }}
                            transition={{ delay: 2.5, duration: 2 }}
                        >
                            <span>✓</span> {t('activated')}
                        </motion.div>
                    </div>

                    {/* Other Static Plugins */}
                    <PluginCard name={t('yoastSeo')} icon="🚦" desc={t('yoastSeoDesc')} rated installNow={t('installNow')} />
                    <PluginCard name={t('wooCommerce')} icon="🛍️" desc={t('wooCommerceDesc')} installNow={t('installNow')} />
                    <PluginCard name={t('elementor')} icon="🎨" desc={t('elementorDesc')} installNow={t('installNow')} />
                    <PluginCard name={t('securityPro')} icon="🛡️" desc={t('securityProDesc')} installNow={t('installNow')} />
                </div>
            </div>

            {/* Simulated Cursor interacting with Install button */}
            <CursorClickAnimation />
        </motion.div>
    );
};

// --- SUB-COMPONENTS & ANIMATIONS ---

const TypingText = ({ text }: { text: string }) => {
    // Only split the text into an array of characters
    const characters = text.split("");

    return (
        <span className="inline-block relative">
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.05,
                        delay: 0.5 + (index * 0.03), // Staggered typing effect
                        ease: "linear"
                    }}
                >
                    {char}
                </motion.span>
            ))}
            {/* Blinking Cursor at the end */}
            <motion.span
                className="absolute -right-1 top-0 bottom-0 w-0.5 bg-blue-600 inline-block"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ height: '1em' }}
            />
        </span>
    );
};

const SeoScoreAnimation = () => (
    <div className="flex items-center gap-1.5">
        <div className="h-1.5 w-16 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
                className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                initial={{ width: "10%" }}
                animate={{ width: "90%" }}
                transition={{ duration: 4, delay: 0.5, ease: "easeInOut" }}
            />
        </div>
        <motion.span
            className="text-[10px] font-bold"
            initial={{ color: "#ef4444" }} // Red
            animate={{ color: "#22c55e" }} // Green
            transition={{ duration: 4, delay: 1 }}
        >
            92/100
        </motion.span>
    </div>
);

const FeatureBlock = ({ icon, title, delay = 0 }: { icon: string, title: string, delay?: number }) => (
    <motion.div
        className="flex flex-col gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
    >
        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-xl transition-transform border border-transparent">{icon}</div>
        <div className="h-4 font-bold text-gray-800 text-sm">{title}</div>
        <div className="space-y-1.5 opacity-60">
            <div className="h-1.5 w-full bg-gray-300 rounded-full" />
            <div className="h-1.5 w-5/6 bg-gray-300 rounded-full" />
        </div>
    </motion.div>
);

const DropZoneAnimation = ({ dropText, startText }: { dropText: string, startText: string }) => (
    <motion.div
        className="mt-8 border-2 border-dashed border-blue-400 bg-blue-50/50 rounded-lg h-32 flex items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
    >
        <div className="text-blue-400 text-sm font-medium">{dropText}</div>

        {/* The block arriving */}
        <motion.div
            className="absolute inset-4 bg-blue-600 rounded flex items-center justify-center text-white font-bold shadow-lg"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.4 }} // Syncs with cursor drop
        >
            {startText}
        </motion.div>
    </motion.div>
);

const CursorDragAnimation = ({ movingText }: { movingText: string }) => (
    <motion.div
        className="absolute z-50 pointer-events-none"
        initial={{ x: "90%", y: "40%" }} // Start near buttons
        animate={{
            x: ["90%", "85%", "45%"], // Move to button, grab, move to center
            y: ["40%", "40%", "85%"], // Dropping lower to match new drop zone
            scale: [1, 0.9, 1] // Click effect
        }}
        transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeInOut"
        }}
    >
        {/* Cursor Icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
            <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19169L11.7841 12.3673H5.65376Z" fill="black" stroke="white" strokeWidth="1" />
        </svg>

        {/* Ghost Block Dragging */}
        <motion.div
            className="absolute top-4 left-4 bg-white border border-blue-500 text-blue-500 p-2 rounded shadow-xl text-xs font-bold whitespace-nowrap bg-opacity-95 backdrop-blur-sm flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }} // Show only during drag
            transition={{ duration: 2.5, times: [0.2, 0.3, 0.9, 1], repeat: Infinity, repeatDelay: 1.5 }}
        >
            <span className="text-lg">🔳</span> {movingText}
        </motion.div>
    </motion.div>
);

const CursorClickAnimation = () => (
    <motion.div
        className="absolute z-50 pointer-events-none top-0 left-0"
        animate={{
            x: ["60%", "30%"], // Move from right to the install button area
            y: ["50%", "45%"],
        }}
        transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 2.5,
            ease: "easeInOut"
        }}
    >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
            <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19169L11.7841 12.3673H5.65376Z" fill="#1d2327" stroke="white" strokeWidth="1" />
        </svg>
    </motion.div>
);

const InstallButtonAnimation = ({ installNow, installing, activate }: { installNow: string, installing: string, activate: string }) => (
    <motion.button
        className="px-3 py-1.5 rounded text-xs font-bold border"
        initial={{ backgroundColor: "white", color: "#2271b1", borderColor: "#2271b1" }}
        animate={{
            backgroundColor: ["white", "#f0f0f1", "#2271b1"],
            color: ["#2271b1", "#666", "white"],
            borderColor: ["#2271b1", "#f0f0f1", "#2271b1"],
        }}
        transition={{ duration: 2, times: [0, 0.5, 1], repeat: Infinity, repeatDelay: 2 }}
    >
        <motion.span
            animate={{ content: [installNow, installing, activate] }}
            transition={{ duration: 2, times: [0, 0.5, 1], repeat: Infinity, repeatDelay: 2 }}
        >
            <InstallText installNow={installNow} installing={installing} activate={activate} />
        </motion.span>
    </motion.button>
);

// Hack for animating text content in framer motion
const InstallText = ({ installNow, installing, activate }: { installNow: string, installing: string, activate: string }) => {
    const [text, setText] = useState(installNow);
    useEffect(() => {
        const sequence = async () => {
            while (true) {
                setText(installNow);
                await new Promise(r => setTimeout(r, 1500)); // Wait for cursor
                setText(installing);
                await new Promise(r => setTimeout(r, 800));
                setText(activate);
                await new Promise(r => setTimeout(r, 1700));
            }
        };
        sequence();
    }, [installNow, installing, activate]);
    return <span>{text}</span>;
}

const SidebarItem = ({ icon, label, active = false }: { icon: string, label: string, active?: boolean }) => (
    <div className={`px-3 py-2.5 flex items-center gap-2 text-xs font-medium transition-colors ${active ? 'bg-[#2271b1] text-white font-bold relative' : 'text-white/80'}`}>
        <span className="w-4 text-center opacity-70">{icon}</span>
        <span>{label}</span>
        {active && <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/20" />}
        {active && <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#f0f0f1] rotate-45" />}
    </div>
);

const PluginCard = ({ name, icon, desc, rated = false, installNow }: { name: string, icon: string, desc: string, rated?: boolean, installNow: string }) => (
    <div className="bg-white border border-gray-200 rounded p-4 flex flex-col gap-3 shadow-sm opacity-60 hover:opacity-100 transition-opacity">
        <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-gray-50 rounded flex items-center justify-center text-xl grayscale">{icon}</div>
            <div>
                <h3 className="font-bold text-[#1d2327] text-sm">{name}</h3>
                <p className="text-[10px] text-gray-500 mt-1 leading-tight">{desc}</p>
            </div>
        </div>
        <div className="mt-auto flex items-center justify-between">
            <div className="flex gap-0.5 text-[10px] text-gray-300">★★★★★</div>
            <div className="px-2 py-1 rounded text-[10px] font-bold border border-gray-300 text-gray-500 bg-gray-50">{installNow}</div>
        </div>
    </div>
);
