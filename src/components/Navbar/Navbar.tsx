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

    // Shared nav link classes
    const navLinkContainerClass = "group flex items-center justify-center py-2 cursor-pointer";
    const navLinkWrapperClass = "relative";
    const navLinkBaseClass = "block text-sm font-medium capitalize tracking-wide text-gray-500 transition-colors duration-300";
    const getNavLinkOverlayClass = (isActive: boolean) => `
        absolute inset-0 flex items-center justify-center
        text-sm font-medium capitalize tracking-wide 
        text-white
        transition-all duration-300 ease-out
        ${isActive
            ? '[clip-path:inset(0_0_0_0)]'
            : '[clip-path:inset(0_50%_0_50%)] group-hover:[clip-path:inset(0_0_0_0)]'
        }
    `;

    return (
        <nav className={`sticky top-0 z-50 bg-[#0a0a0a] px-8  ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[70px]">
                {/* Logo - links to home */}
                <div
                    className="cursor-pointer hover:opacity-80 transition-opacity duration-300"
                    onClick={() => router.push(`/${currentLocale}`)}
                >
                    <Image
                        src="/2.gif"
                        alt="Limitless Taps"
                        width={180}
                        height={80}
                        className="object-contain"
                        unoptimized
                    />
                </div>

                {/* Nav Links */}
                <div className={`flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {navLinks[0] && (
                        <div
                            className={navLinkContainerClass}
                            onClick={() => router.push(navLinks[0].href)}
                        >
                            <div className={navLinkWrapperClass}>
                                <span className={navLinkBaseClass}>
                                    {t(navLinks[0].key)}
                                </span>
                                <span className={getNavLinkOverlayClass(isActive(navLinks[0].href))}>
                                    {t(navLinks[0].key)}
                                </span>
                            </div>
                        </div>
                    )}

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
                            <div className="relative hover:cursor-pointer">
                                <span className="block text-sm font-medium capitalize tracking-wide text-gray-500">
                                    {t('services')}
                                </span>
                                <span
                                    className="absolute inset-0 flex items-center justify-center text-sm font-medium capitalize tracking-wide text-white transition-all duration-300 ease-out"
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
                            align="center"
                            className="w-screen max-w-sm"
                        />
                    </div>

                    {/* Remaining Nav Links */}
                    {navLinks.slice(1).map((link) => (
                        <div
                            key={link.key}
                            className={navLinkContainerClass}
                            onClick={() => router.push(link.href)}
                        >
                            <div className={navLinkWrapperClass}>
                                <span className={navLinkBaseClass}>
                                    {t(link.key)}
                                </span>
                                <span className={getNavLinkOverlayClass(isActive(link.href))}>
                                    {t(link.key)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right side: Language Switcher - Hover Based with NavDropdown UI */}
                <div className="flex items-center gap-4">
                    <div
                        className="relative group"
                        onMouseEnter={handleLangMouseEnter}
                        onMouseLeave={handleLangMouseLeave}
                    >
                        <button
                            className="flex items-center gap-1 focus:outline-none py-2 hover:cursor-pointer"
                        >
                            {/* Globe Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                                className={`
                                    w-5 h-5 transition-all duration-300 ease-out
                                    ${langGlowActive
                                        ? 'text-white '
                                        : 'text-gray-400'
                                    }
                                `}
                                fill="currentColor"
                            >
                                <path d="M415.9 344L225 344C227.9 408.5 242.2 467.9 262.5 511.4C273.9 535.9 286.2 553.2 297.6 563.8C308.8 574.3 316.5 576 320.5 576C324.5 576 332.2 574.3 343.4 563.8C354.8 553.2 367.1 535.8 378.5 511.4C398.8 467.9 413.1 408.5 416 344zM224.9 296L415.8 296C413 231.5 398.7 172.1 378.4 128.6C367 104.2 354.7 86.8 343.3 76.2C332.1 65.7 324.4 64 320.4 64C316.4 64 308.7 65.7 297.5 76.2C286.1 86.8 273.8 104.2 262.4 128.6C242.1 172.1 227.8 231.5 224.9 296zM176.9 296C180.4 210.4 202.5 130.9 234.8 78.7C142.7 111.3 74.9 195.2 65.5 296L176.9 296zM65.5 344C74.9 444.8 142.7 528.7 234.8 561.3C202.5 509.1 180.4 429.6 176.9 344L65.5 344zM463.9 344C460.4 429.6 438.3 509.1 406 561.3C498.1 528.6 565.9 444.8 575.3 344L463.9 344zM575.3 296C565.9 195.2 498.1 111.3 406 78.7C438.3 130.9 460.4 210.4 463.9 296L575.3 296z" />
                            </svg>

                            {/* Language Text with Glow Effect */}
                            <div className="relative">
                                <span className="block text-sm font-medium tracking-wide text-gray-400 transition-colors duration-300">
                                    {t('language_selector')}
                                </span>
                                <span
                                    className="absolute inset-0 flex items-center justify-center text-sm font-medium tracking-wide text-white  transition-all duration-300 ease-out"
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
                            align="center"
                            className="w-36"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
