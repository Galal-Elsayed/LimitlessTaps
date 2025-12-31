'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { NavDropdown } from '@/components/ui/nav-dropdown';

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

    const currentLocale = pathname.startsWith('/ar') ? 'ar' : 'en';
    const isRTL = currentLocale === 'ar';

    const navLinks = [
        { key: 'company', href: `/${currentLocale}/company` },
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

    // Language options for dropdown
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

    // Services hover handlers
    const handleServicesMouseEnter = () => {
        if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
        setServicesOpen(true);
    };

    const handleServicesMouseLeave = () => {
        servicesTimeoutRef.current = setTimeout(() => {
            setServicesOpen(false);
        }, 150);
    };

    // Language hover handlers
    const handleLangMouseEnter = () => {
        if (langTimeoutRef.current) clearTimeout(langTimeoutRef.current);
        setLangOpen(true);
    };

    const handleLangMouseLeave = () => {
        langTimeoutRef.current = setTimeout(() => {
            setLangOpen(false);
        }, 150);
    };

    // Determine if Services should show glow (either hovered/open or active on services page)
    const servicesGlowActive = servicesOpen || isServicesActive();
    const langGlowActive = langOpen;

    return (
        <nav className={`sticky top-0 z-50 bg-black px-8 border-b border-white/10 ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[70px]">
                {/* Logo - links to home */}
                <div
                    className="cursor-pointer hover:opacity-80 transition-opacity duration-300"
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

                {/* Nav Links */}
                <div className={`flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {/* Company Link */}
                    <div
                        className="group flex items-center justify-center py-2 cursor-pointer"
                        onClick={() => router.push(navLinks[0].href)}
                    >
                        <div className="relative">
                            <span className="block text-sm font-medium capitalize tracking-wide text-gray-500 transition-colors duration-300">
                                {t('company')}
                            </span>
                            <span
                                className={`
                                    absolute inset-0 flex items-center justify-center
                                    text-sm font-medium capitalize tracking-wide 
                                    text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]
                                    transition-all duration-300 ease-out
                                    ${isActive(navLinks[0].href)
                                        ? '[clip-path:inset(0_0_0_0)]'
                                        : '[clip-path:inset(0_50%_0_50%)] group-hover:[clip-path:inset(0_0_0_0)]'
                                    }
                                `}
                            >
                                {t('company')}
                            </span>
                        </div>
                    </div>

                    {/* Services (Manual Dropdown for Hover Support) */}
                    <div
                        className="relative group"
                        onMouseEnter={handleServicesMouseEnter}
                        onMouseLeave={handleServicesMouseLeave}
                    >
                        <button
                            className="flex items-center gap-1 focus:outline-none py-2"
                        >
                            {/* Text Container for Overlay Effect */}
                            <div className="relative">
                                <span className="block text-sm font-medium capitalize tracking-wide text-gray-500">
                                    {t('services')}
                                </span>
                                <span
                                    className="absolute inset-0 flex items-center justify-center text-sm font-medium capitalize tracking-wide text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] transition-all duration-300 ease-out"
                                    style={{
                                        clipPath: servicesGlowActive
                                            ? 'inset(0 0 0 0)'
                                            : 'inset(0 50% 0 50%)'
                                    }}
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
                        />
                    </div>

                    {/* Portfolio Link */}
                    <div
                        className="group flex items-center justify-center py-2 cursor-pointer"
                        onClick={() => router.push(navLinks[1].href)}
                    >
                        <div className="relative">
                            <span className="block text-sm font-medium capitalize tracking-wide text-gray-500 transition-colors duration-300">
                                {t('portfolio')}
                            </span>
                            <span
                                className={`
                                    absolute inset-0 flex items-center justify-center
                                    text-sm font-medium capitalize tracking-wide 
                                    text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]
                                    transition-all duration-300 ease-out
                                    ${isActive(navLinks[1].href)
                                        ? '[clip-path:inset(0_0_0_0)]'
                                        : '[clip-path:inset(0_50%_0_50%)] group-hover:[clip-path:inset(0_0_0_0)]'
                                    }
                                `}
                            >
                                {t('portfolio')}
                            </span>
                        </div>
                    </div>

                    {/* Careers Link */}
                    <div
                        className="group flex items-center justify-center py-2 cursor-pointer"
                        onClick={() => router.push(navLinks[2].href)}
                    >
                        <div className="relative">
                            <span className="block text-sm font-medium capitalize tracking-wide text-gray-500 transition-colors duration-300">
                                {t('careers')}
                            </span>
                            <span
                                className={`
                                    absolute inset-0 flex items-center justify-center
                                    text-sm font-medium capitalize tracking-wide 
                                    text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]
                                    transition-all duration-300 ease-out
                                    ${isActive(navLinks[2].href)
                                        ? '[clip-path:inset(0_0_0_0)]'
                                        : '[clip-path:inset(0_50%_0_50%)] group-hover:[clip-path:inset(0_0_0_0)]'
                                    }
                                `}
                            >
                                {t('careers')}
                            </span>
                        </div>
                    </div>

                    {/* Contact Link */}
                    <div
                        className="group flex items-center justify-center py-2 cursor-pointer"
                        onClick={() => router.push(navLinks[3].href)}
                    >
                        <div className="relative">
                            <span className="block text-sm font-medium capitalize tracking-wide text-gray-500 transition-colors duration-300">
                                {t('contact')}
                            </span>
                            <span
                                className={`
                                    absolute inset-0 flex items-center justify-center
                                    text-sm font-medium capitalize tracking-wide 
                                    text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]
                                    transition-all duration-300 ease-out
                                    ${isActive(navLinks[3].href)
                                        ? '[clip-path:inset(0_0_0_0)]'
                                        : '[clip-path:inset(0_50%_0_50%)] group-hover:[clip-path:inset(0_0_0_0)]'
                                    }
                                `}
                            >
                                {t('contact')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right side: Language Switcher - Hover Based with NavDropdown UI */}
                <div className="flex items-center gap-4">
                    <div
                        className="relative group"
                        onMouseEnter={handleLangMouseEnter}
                        onMouseLeave={handleLangMouseLeave}
                    >
                        <button
                            className="flex items-center gap-1 focus:outline-none py-2"
                        >
                            <div className="relative">
                                <span className="block text-sm font-semibold tracking-wide text-gray-400">
                                    {t('language_selector')}
                                </span>
                                <span
                                    className="absolute inset-0 flex items-center justify-center text-sm font-semibold tracking-wide text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] transition-all duration-300 ease-out"
                                    style={{
                                        clipPath: langGlowActive
                                            ? 'inset(0 0 0 0)'
                                            : 'inset(0 50% 0 50%)'
                                    }}
                                >
                                    {t('language_selector')}
                                </span>
                            </div>

                            <ChevronDown
                                className={`
                                    w-4 h-4 transition-all duration-300 ease-out
                                    ${langGlowActive
                                        ? 'rotate-180 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]'
                                        : 'text-gray-400'
                                    }
                                `}
                            />
                        </button>

                        <NavDropdown
                            isOpen={langOpen}
                            items={languageLinks}
                            isRTL={isRTL}
                            onClose={() => setLangOpen(false)}
                            className="max-w-[140px]"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
