'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { NavDropdown } from '@/components/ui/nav-dropdown';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
    const t = useTranslations('navigation');
    const tServices = useTranslations('services');
    const pathname = usePathname();
    const router = useRouter();

    // Services dropdown state
    const [servicesOpen, setServicesOpen] = useState(false);
    const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Language dropdown state
    const [langOpen, setLangOpen] = useState(false);
    const langTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Mobile Menu state
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

    const currentLocale = pathname.startsWith('/ar') ? 'ar' : 'en';
    const isRTL = currentLocale === 'ar';

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        setMobileServicesOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    const navLinks = [
        { key: 'company', href: `/${currentLocale}/company` },
        { key: 'services', href: `/${currentLocale}/services`, isDropdown: true },
        { key: 'portfolio', href: `/${currentLocale}/portfolio` },
        { key: 'careers', href: `/${currentLocale}/careers` },
        { key: 'contact', href: `/${currentLocale}/contact` },
    ];

    const serviceLinks = [
        {
            key: 'web_development',
            href: `/${currentLocale}/services/web-development`,
            title: tServices('web_development_title'),
            description: tServices('web_development_desc')
        },
        {
            key: 'mobile_application',
            href: `/${currentLocale}/services/mobile-application`,
            title: tServices('mobile_application_title'),
            description: tServices('mobile_application_desc')
        },
        {
            key: 'software_solution',
            href: `/${currentLocale}/services/software-solution`,
            title: tServices('software_solution_title'),
            description: tServices('software_solution_desc')
        },
        {
            key: 'web_design',
            href: `/${currentLocale}/services/web-design`,
            title: tServices('web_design_title'),
            description: tServices('web_design_desc')
        },
    ];

    const languageLinks = [
        {
            key: 'en',
            title: 'English',
            href: pathname.replace(/^\/(en|ar)/, '/en') || '/en',
        },
        {
            key: 'ar',
            title: 'العربية',
            href: pathname.replace(/^\/(en|ar)/, '/ar') || '/ar',
        },
    ];

    const isActive = (href: string) => {
        return pathname === href || pathname.startsWith(href + '/');
    };

    const isServicesActive = () => {
        return pathname.startsWith(`/${currentLocale}/services`);
    };

    const handleServicesMouseEnter = () => {
        if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
        setServicesOpen(true);
    };

    const handleServicesMouseLeave = () => {
        servicesTimeoutRef.current = setTimeout(() => {
            setServicesOpen(false);
        }, 150);
    };

    const handleLangMouseEnter = () => {
        if (langTimeoutRef.current) clearTimeout(langTimeoutRef.current);
        setLangOpen(true);
    };

    const handleLangMouseLeave = () => {
        langTimeoutRef.current = setTimeout(() => {
            setLangOpen(false);
        }, 150);
    };

    const servicesGlowActive = servicesOpen || isServicesActive();
    const langGlowActive = langOpen;

    // Render a regular nav link with animated glow
    const renderNavLink = (link: { key: string; href: string }) => {
        const active = isActive(link.href);
        return (
            <div
                key={link.key}
                className="group flex items-center justify-center py-2 cursor-pointer relative"
                onClick={() => router.push(link.href)}
            >
                {/* Wrapper for tight text fit */}
                <div className="relative relative-inline-block">
                    {/* Base Text (Gray) */}
                    <span className="block text-md font-medium capitalize tracking-wide text-gray-500 transition-colors duration-300">
                        {t(link.key)}
                    </span>

                    {/* Overlay Text (White + Animation) */}
                    <span
                        className={`
                            absolute inset-0 flex items-center justify-center
                            text-md font-medium capitalize tracking-wide 
                            text-white
                            transition-all duration-500 ease-out
                            ${active
                                ? '[clip-path:inset(0_0_0_0)]'
                                : '[clip-path:inset(0_50%_0_50%)] group-hover:[clip-path:inset(0_0_0_0)]'
                            }
                        `}
                        aria-hidden="true"
                    >
                        {t(link.key)}
                    </span>
                </div>
            </div>
        );
    };

    // Render the Services dropdown trigger with animated glow
    const renderServicesDropdown = () => (
        <div
            key="services"
            className="relative group"
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
        >
            <button className="flex items-center gap-1 focus:outline-none py-2 cursor-pointer">
                <div className="relative relative-inline-block">
                    <span className="block text-md font-medium capitalize tracking-wide text-gray-500">
                        {t('services')}
                    </span>
                    <span
                        className={`
                            absolute inset-0 flex items-center justify-center
                            text-md font-medium capitalize tracking-wide 
                            text-white
                            transition-all duration-300 ease-out
                        `}
                        style={{
                            clipPath: servicesGlowActive
                                ? 'inset(0 0 0 0)'
                                : 'inset(0 50% 0 50%)'
                        }}
                        aria-hidden="true"
                    >
                        {t('services')}
                    </span>
                </div>

                <ChevronDown
                    className={`
                        w-4 h-4 transition-all duration-300 ease-out
                        ${servicesGlowActive
                            ? 'rotate-180 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]'
                            : 'text-gray-500'
                        }
                    `}
                />
            </button>

            <NavDropdown
                isOpen={servicesOpen}
                items={serviceLinks}
                isRTL={isRTL}
                onClose={() => setServicesOpen(false)}
                align="center"
                className="w-screen max-w-sm"
            />
        </div>
    );

    return (
        <>
            <nav className={`sticky top-0 z-50 bg-[#0a0a0a] px-8 border-b border-white/10 ${isRTL ? 'rtl' : 'ltr'}`}>
                <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[70px]">
                    {/* Logo */}
                    <div
                        className="cursor-pointer hover:opacity-80 transition-opacity duration-300 z-50"
                        onClick={() => router.push(`/${currentLocale}`)}
                    >
                        <Image
                            src="/Logo/Main-Logo-Interactive.gif"
                            alt="Limitless Taps"
                            width={180}
                            height={80}
                            className="object-contain"
                            unoptimized
                        />
                    </div>

                    {/* Desktop Nav Links (Hidden on mobile/tablet) */}
                    <div className={`hidden min-[900px]:flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {navLinks.map((link) =>
                            link.isDropdown
                                ? renderServicesDropdown()
                                : renderNavLink(link)
                        )}
                    </div>

                    {/* Desktop Language Switcher (Hidden on mobile/tablet) */}
                    <div className="hidden min-[900px]:flex items-center gap-4">
                        <div
                            className="relative group"
                            onMouseEnter={handleLangMouseEnter}
                            onMouseLeave={handleLangMouseLeave}
                        >
                            <button className="flex items-center gap-1 focus:outline-none py-2 cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 640"
                                    className={`
                                        w-5 h-5 transition-all duration-300 ease-out
                                        ${langGlowActive ? 'text-white' : 'text-gray-400'}
                                    `}
                                    style={{
                                        filter: langGlowActive ? 'drop-shadow(0 0 10px rgba(255,255,255,0.9))' : 'none',
                                    }}
                                    fill="currentColor"
                                >
                                    <path d="M415.9 344L225 344C227.9 408.5 242.2 467.9 262.5 511.4C273.9 535.9 286.2 553.2 297.6 563.8C308.8 574.3 316.5 576 320.5 576C324.5 576 332.2 574.3 343.4 563.8C354.8 553.2 367.1 535.8 378.5 511.4C398.8 467.9 413.1 408.5 416 344zM224.9 296L415.8 296C413 231.5 398.7 172.1 378.4 128.6C367 104.2 354.7 86.8 343.3 76.2C332.1 65.7 324.4 64 320.4 64C316.4 64 308.7 65.7 297.5 76.2C286.1 86.8 273.8 104.2 262.4 128.6C242.1 172.1 227.8 231.5 224.9 296zM176.9 296C180.4 210.4 202.5 130.9 234.8 78.7C142.7 111.3 74.9 195.2 65.5 296L176.9 296zM65.5 344C74.9 444.8 142.7 528.7 234.8 561.3C202.5 509.1 180.4 429.6 176.9 344L65.5 344zM463.9 344C460.4 429.6 438.3 509.1 406 561.3C498.1 528.6 565.9 444.8 575.3 344L463.9 344zM575.3 296C565.9 195.2 498.1 111.3 406 78.7C438.3 130.9 460.4 210.4 463.9 296L575.3 296z" />
                                </svg>

                                <div className="relative relative-inline-block">
                                    <span className="block text-md font-medium tracking-wide text-gray-400 transition-colors duration-300">
                                        {t('language_selector')}
                                    </span>
                                    <span
                                        className={`
                                            absolute inset-0 flex items-center justify-center
                                            text-md font-medium tracking-wide text-white
                                            transition-all duration-300 ease-out
                                        `}
                                        style={{
                                            clipPath: langGlowActive
                                                ? 'inset(0 0 0 0)'
                                                : 'inset(0 50% 0 50%)'
                                        }}
                                        aria-hidden="true"
                                    >
                                        {t('language_selector')}
                                    </span>
                                </div>

                                <ChevronDown
                                    className={`
                                        w-4 h-4 transition-all duration-300 ease-out
                                        ${langGlowActive ? 'rotate-180 text-white' : 'text-gray-400'}
                                    `}
                                    style={{
                                        filter: langGlowActive ? 'drop-shadow(0 0 8px rgba(255,255,255,0.7))' : 'none',
                                    }}
                                />
                            </button>

                            <NavDropdown
                                isOpen={langOpen}
                                items={languageLinks}
                                isRTL={isRTL}
                                onClose={() => setLangOpen(false)}
                                align="center"
                                className="w-36"
                            />
                        </div>
                    </div>

                    {/* Mobile Burger Menu Button */}
                    <div className="flex min-[900px]:hidden items-center z-50">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-white p-2 focus:outline-none hover:bg-white/10 rounded-full transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={`fixed top-[70px] left-0 right-0 h-auto min-h-[40vh] z-40 bg-[rgba(10,10,10,0.96)] backdrop-blur-xl min-[900px]:hidden border-b border-white/10 origin-top shadow-2xl overflow-hidden`}
                    >
                        <div className={`relative w-full ${isRTL ? 'rtl' : 'ltr'}`}>
                            {/* Symbol Image - Absolute Fixed Position (Does not move when menu stretches) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                                className="absolute -top-6 right-0 h-[40vh] w-1/2 flex items-center justify-center p-2 sm:p-8 z-0 pointer-events-none"
                            >
                                <div className="absolute bg-transparent inset-0 z-1" />
                                <Image
                                    src="/Logo/limitless-no-bg.png"
                                    alt="Limitless Taps Symbol"
                                    fill
                                    className="object-contain opacity-50 pr-4 sm:pr-8"
                                    sizes="50vw"
                                />
                            </motion.div>

                            {/* Content - Relative Foreground */}
                            <div className={`relative z-10 flex flex-col h-full p-6 no-scrollbar ${isRTL ? 'text-right items-end' : 'text-left items-start'}`}>
                                <div className="flex flex-col gap-3 w-full sm:gap-5">
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.key}
                                            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05, duration: 0.3 }}
                                            className="w-full"
                                        >
                                            {link.isDropdown ? (
                                                <div className="flex flex-col gap-1">
                                                    <button
                                                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                                        className={`flex items-center gap-2 text-lg sm:text-2xl font-semibold text-white tracking-wide hover:text-gray-300 transition-colors w-full ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                                                    >
                                                        <span>{t(link.key)}</span>
                                                        <ChevronDown
                                                            className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                                                        />
                                                    </button>

                                                    <AnimatePresence>
                                                        {mobileServicesOpen && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                className={`overflow-hidden flex bg-[#0a0a0a] w-1/2 flex-col gap-2 mt-1 ${isRTL ? 'pr-3 border-r border-white/10' : 'pl-3 border-l border-white/10'}`}
                                                            >
                                                                {serviceLinks.map((service, idx) => (
                                                                    <motion.div
                                                                        key={service.key}
                                                                        initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                                                                        animate={{ opacity: 1, x: 0 }}
                                                                        transition={{ delay: idx * 0.03 }}
                                                                        onClick={() => router.push(service.href)}
                                                                        className="py-1.5 px-3 w-full rounded-md border border-white/5 bg-white/5 cursor-pointer active:scale-95 transition-all hover:bg-white/10 text-start"
                                                                    >
                                                                        <div className="text-sm sm:text-base font-medium text-white/90">{service.title}</div>
                                                                    </motion.div>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() => router.push(link.href)}
                                                    className="text-lg sm:text-2xl font-semibold text-white tracking-wide cursor-pointer hover:text-gray-300 transition-colors py-1 block"
                                                >
                                                    {t(link.key)}
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Language Switcher - Tightly following contents */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className={`mt-4 w-full flex flex-col gap-2 ${isRTL ? 'items-end' : 'items-start'}`}
                                >
                                    <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-[0.2em]">{t('language_selector')}</div>
                                    <div className="flex items-center gap-2">
                                        {languageLinks.map((lang) => (
                                            <button
                                                key={lang.key}
                                                onClick={() => router.push(lang.href)}
                                                className={`
                                                    px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-all duration-300 border
                                                    ${currentLocale === lang.key
                                                        ? 'bg-white text-black border-white shadow-sm'
                                                        : 'text-gray-400 border-white/10 hover:text-white hover:border-white/30 hover:bg-white/5'
                                                    }
                                                `}
                                            >
                                                {lang.title}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
