"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import Image from "next/image";
import { useState, useRef, useEffect, Fragment } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { NavDropdown } from "@/components/ui/nav-dropdown";
import { AnimatePresence, motion } from "motion/react";
import { Transition } from "@headlessui/react";

export default function Navbar() {
  const t = useTranslations("navigation");
  const tServices = useTranslations("services");
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

  // With 'as-needed' locale prefix, English pages don't have /en in the URL
  // Only Arabic pages will have /ar prefix
  const currentLocale = pathname.startsWith("/ar") ? "ar" : "en";
  const isRTL = currentLocale === "ar";

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Navigation links without locale prefix - next-intl's router handles this
  const navLinks = [
    { key: "company", href: "/about-us" },
    { key: "services", href: "/services", isDropdown: true },
    { key: "portfolio", href: "/work" },
    { key: "careers", href: "/careers" },
    { key: "contact", href: "/contact", isButton: true },
  ];

  const serviceLinks = [
    {
      key: "web_development",
      href: "/services/web-development",
      title: tServices("web_development_title"),
      description: tServices("web_development_desc"),
    },
    {
      key: "mobile_application",
      href: "/services/mobile-application",
      title: tServices("mobile_application_title"),
      description: tServices("mobile_application_desc"),
    },
    {
      key: "software_solution",
      href: "/services/software-solution",
      title: tServices("software_solution_title"),
      description: tServices("software_solution_desc"),
    },
    {
      key: "web_design",
      href: "/services/web-design",
      title: tServices("web_design_title"),
      description: tServices("web_design_desc"),
    },
  ];

  // Language links for switching
  const languageLinks = [
    {
      key: "en",
      title: "English",
      locale: "en" as const,
      flag: "https://flagcdn.com/w40/gb.png",
    },
    {
      key: "ar",
      title: "العربية",
      locale: "ar" as const,
      flag: "https://flagcdn.com/w40/eg.png",
    },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  const isServicesActive = () => {
    return pathname.startsWith("/services");
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
  const renderNavLink = (link: { key: string; href: string; isButton?: boolean }) => {
    const active = isActive(link.href);

    if (link.isButton) {
      return (
        <div
          key={link.key}
          className="flex items-center justify-center cursor-pointer"
          onClick={() => router.push(link.href)}
        >
          <div
            className={`
                        px-4 py-1 rounded-lg 
                        bg-white/10 hover:bg-white/20 
                        border border-white/20 hover:border-white/40
                        transition-all duration-300
                        flex items-center justify-center
                        backdrop-blur-sm
                        shadow-[0_4px_0_0_rgba(255,255,255,0.2)]
                        hover:translate-y-[2px] hover:shadow-[0_2px_0_0_rgba(255,255,255,0.2)]
                        active:translate-y-[4px] active:shadow-none
                        min-w-[140px]
                    `}
          >
            <span className="text-sm font-bold uppercase tracking-widest text-white">{t(link.key)}</span>
          </div>
        </div>
      );
    }

    return (
      <div
        key={link.key}
        className="group flex items-center justify-center py-2 cursor-pointer relative"
        onClick={() => router.push(link.href)}
      >
        {/* Wrapper for tight text fit */}
        <div className="relative relative-inline-block">
          {/* Base Text (Gray) */}
          <span className="block text-[14px] font-medium capitalize tracking-wide text-gray-300 transition-colors duration-300">
            {t(link.key)}
          </span>

          {/* Overlay Text (White + Animation) */}
          <span
            className={`
                            absolute inset-0 flex items-center justify-center
                            text-[14px] font-medium capitalize tracking-wide 
                            text-white
                            transition-all duration-500 ease-out
                            ${
                              active
                                ? "[clip-path:inset(0_0_0_0)]"
                                : "[clip-path:inset(0_50%_0_50%)] group-hover:[clip-path:inset(0_0_0_0)]"
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
      <button
        className="flex items-center gap-1 focus:outline-none py-2 cursor-pointer"
        onClick={() => router.push("/services")}
      >
        <div className="relative relative-inline-block">
          <span className="block text-[14px] font-medium capitalize tracking-wide text-gray-300">{t("services")}</span>
          <span
            className={`
                            absolute inset-0 flex items-center justify-center
                            text-[14px] font-medium capitalize tracking-wide 
                            text-white
                            transition-all duration-300 ease-out
                        `}
            style={{
              clipPath: servicesGlowActive ? "inset(0 0 0 0)" : "inset(0 50% 0 50%)",
            }}
            aria-hidden="true"
          >
            {t("services")}
          </span>
        </div>

        <ChevronDown
          className={`
                        w-4 h-4 transition-all duration-300 ease-out
                        ${
                          servicesGlowActive
                            ? "rotate-180 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                            : "text-gray-300"
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
      <nav
        className={`fixed top-0 inset-x-0 z-50 px-8 ${isRTL ? "rtl" : "ltr"} ${
          mobileMenuOpen ? "max-[900px]:hidden" : ""
        } bg-[#0a0a0a]`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[70px]">
          {/* Logo */}
          <div
            className={`cursor-pointer hover:opacity-80 transition-opacity duration-300 z-50 ${
              mobileMenuOpen
                ? "opacity-0 min-[900px]:opacity-100 pointer-events-none min-[900px]:pointer-events-auto"
                : "opacity-100"
            }`}
            onClick={() => router.push("/")}
          >
            {/* Desktop Logo (GIF) */}
            <div className="hidden min-[900px]:block">
              <Image
                src="/Logo/Main-Logo-Opt.gif"
                alt="Limitless Taps"
                width={150}
                height={60}
                className="object-contain"
                unoptimized
              />
            </div>
            {/* Mobile Logo (Static) */}
            <div className="block min-[900px]:hidden">
              <Image
                src="/Logo/Main-Logo-Static.png"
                alt="Limitless Taps"
                width={140}
                height={60}
                className="object-contain"
              />
            </div>
          </div>

          {/* Desktop Nav Links (Hidden on mobile/tablet) */}
          <div className={`hidden min-[900px]:flex items-center gap-8 ${isRTL ? "flex-row-reverse" : ""}`}>
            {navLinks.map((link) => (link.isDropdown ? renderServicesDropdown() : renderNavLink(link)))}
          </div>

          {/* Desktop Language Switcher (Hidden on mobile/tablet) */}
          <div className="hidden min-[900px]:flex items-center gap-4">
            <div className="relative group" onMouseEnter={handleLangMouseEnter} onMouseLeave={handleLangMouseLeave}>
              <button className="flex items-center gap-1 focus:outline-none py-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className={`
                                        w-5 h-5 transition-all duration-300 ease-out
                                        ${langGlowActive ? "text-white" : "text-gray-300"}
                                    `}
                  style={{
                    filter: langGlowActive ? "drop-shadow(0 0 10px rgba(255,255,255,0.9))" : "none",
                  }}
                  fill="currentColor"
                >
                  <path d="M415.9 344L225 344C227.9 408.5 242.2 467.9 262.5 511.4C273.9 535.9 286.2 553.2 297.6 563.8C308.8 574.3 316.5 576 320.5 576C324.5 576 332.2 574.3 343.4 563.8C354.8 553.2 367.1 535.8 378.5 511.4C398.8 467.9 413.1 408.5 416 344zM224.9 296L415.8 296C413 231.5 398.7 172.1 378.4 128.6C367 104.2 354.7 86.8 343.3 76.2C332.1 65.7 324.4 64 320.4 64C316.4 64 308.7 65.7 297.5 76.2C286.1 86.8 273.8 104.2 262.4 128.6C242.1 172.1 227.8 231.5 224.9 296zM176.9 296C180.4 210.4 202.5 130.9 234.8 78.7C142.7 111.3 74.9 195.2 65.5 296L176.9 296zM65.5 344C74.9 444.8 142.7 528.7 234.8 561.3C202.5 509.1 180.4 429.6 176.9 344L65.5 344zM463.9 344C460.4 429.6 438.3 509.1 406 561.3C498.1 528.6 565.9 444.8 575.3 344L463.9 344zM575.3 296C565.9 195.2 498.1 111.3 406 78.7C438.3 130.9 460.4 210.4 463.9 296L575.3 296z" />
                </svg>

                <div className="relative relative-inline-block">
                  <span className="block text-[14px] font-medium tracking-wide text-gray-300 transition-colors duration-300">
                    {t("language_selector")}
                  </span>
                  <span
                    className={`
                                            absolute inset-0 flex items-center justify-center
                                            text-[14px] font-medium tracking-wide text-white
                                            transition-all duration-300 ease-out
                                        `}
                    style={{
                      clipPath: langGlowActive ? "inset(0 0 0 0)" : "inset(0 50% 0 50%)",
                    }}
                    aria-hidden="true"
                  >
                    {t("language_selector")}
                  </span>
                </div>

                <ChevronDown
                  className={`
                                        w-4 h-4 transition-all duration-300 ease-out
                                        ${langGlowActive ? "rotate-180 text-white" : "text-gray-300"}
                                    `}
                  style={{
                    filter: langGlowActive ? "drop-shadow(0 0 8px rgba(255,255,255,0.7))" : "none",
                  }}
                />
              </button>

              {/* Language Dropdown */}
              <Transition
                show={langOpen}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <div
                  className="absolute z-50 pt-2 px-4 left-1/2 -translate-x-1/2 w-36"
                  onMouseEnter={handleLangMouseEnter}
                  onMouseLeave={handleLangMouseLeave}
                >
                  <div className="overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 bg-[#0a0a0a] relative">
                    <div
                      className="absolute inset-0 pointer-events-none opacity-20"
                      style={{
                        background:
                          "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)",
                      }}
                    />
                    <div className="relative bg-white/5 backdrop-blur-xl p-2">
                      <div className="flex flex-col gap-1">
                        {languageLinks.map((lang) => (
                          <button
                            key={lang.key}
                            onClick={() => {
                              router.replace(pathname, { locale: lang.locale });
                              setLangOpen(false);
                            }}
                            className="group flex items-center justify-center rounded-lg p-2 hover:bg-white/10 transition-colors duration-200 cursor-pointer w-full"
                          >
                            <div className="flex items-center gap-2">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={lang.flag} alt={lang.title} className="w-5 h-5 rounded-full object-cover" />
                              <p
                                lang={lang.locale}
                                dir={lang.locale === "ar" ? "rtl" : "ltr"}
                                className="block font-semibold text-md text-gray-100 group-hover:text-white transition-colors"
                              >
                                {lang.title}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          {/* Mobile Burger Menu Button */}
          <div className="flex min-[900px]:hidden items-center z-50">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 focus:outline-none hover:bg-white/10 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? null : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 min-[900px]:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`
                                fixed top-0 bottom-0 right-0 
                                w-[300px] z-50 
                                bg-[#0a0a0a]/95 backdrop-blur-xl 
                                min-[900px]:hidden 
                                border-l border-white/10 
                                shadow-2xl 
                                overflow-y-auto flex flex-col
                            `}
            >
              <div className="flex flex-col h-full relative">
                {/* Header Area with Logo and Close Button - Matching Main Navbar Height (70px) */}
                <div className="h-[70px] px-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
                  <div
                    className="cursor-pointer hover:opacity-80 transition-opacity duration-300"
                    onClick={() => {
                      router.push("/");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Image
                      src="/Logo/Main-Logo-Static.png"
                      alt="Limitless Taps"
                      width={140}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Content */}
                <div className={`flex flex-col p-6 gap-3 ${isRTL ? "text-right" : "text-left"} flex-1`}>
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                      className="w-full"
                    >
                      {link.isDropdown ? (
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                            className={`
                                                            flex items-center justify-between w-full py-3 px-4 
                                                            text-lg font-medium text-white tracking-wide 
                                                            bg-transparent hover:bg-white/5 
                                                            border border-transparent hover:border-white/5
                                                            rounded-xl transition-all duration-300
                                                        `}
                          >
                            <span>{t(link.key)}</span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-300 ${
                                mobileServicesOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {mobileServicesOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden flex flex-col gap-2 pl-2"
                              >
                                {serviceLinks.map((service, idx) => (
                                  <motion.div
                                    key={service.key}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.03 }}
                                    onClick={() => {
                                      router.push(service.href);
                                      setMobileMenuOpen(false);
                                    }}
                                    className={`
                                                                            py-2.5 px-4 w-full rounded-lg 
                                                                            bg-white/5 border border-white/5
                                                                            text-sm text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20
                                                                            cursor-pointer transition-all duration-200
                                                                        `}
                                  >
                                    {service.title}
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            router.push(link.href);
                            setMobileMenuOpen(false);
                          }}
                          className={`
                                                        block py-3 px-4 
                                                        text-lg font-medium text-white tracking-wide 
                                                        bg-transparent hover:bg-white/5 
                                                        border border-transparent hover:border-white/5
                                                        rounded-xl transition-all duration-300 cursor-pointer
                                                    `}
                        >
                          {t(link.key)}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Language Switcher */}
                <div className="p-6 border-t border-white/10 bg-black/20">
                  <div
                    className={`text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-3 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {t("language_selector")}
                  </div>
                  <div className="flex items-center gap-3">
                    {languageLinks.map((lang) => (
                      <button
                        key={lang.key}
                        onClick={() => router.replace(pathname, { locale: lang.locale })}
                        className={`
                                                    flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300 border
                                                    ${
                                                      currentLocale === lang.key
                                                        ? "bg-white text-black border-white shadow-[0_0_14px_rgba(255,255,255,0.3)]"
                                                        : "text-gray-400 border-white/10 hover:text-white hover:border-white/30 hover:bg-white/5"
                                                    }
                                                `}
                      >
                        <div className="flex items-center justify-center gap-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={lang.flag} alt={lang.title} className="w-4 h-4 rounded-full object-cover" />
                          <span lang={lang.locale} dir={lang.locale === "ar" ? "rtl" : "ltr"}>
                            {lang.title}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
