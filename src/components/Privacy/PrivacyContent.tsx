"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "@/i18n/routing";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, ShieldCheck, Scale, ArrowRight, HelpCircle, Database } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function PrivacyContent() {
  const t = useTranslations('privacy');
  const tFooter = useTranslations('footer');

  // Section Data
  const sections = useMemo(
    () => [
      {
        id: "collection",
        title: `1. ${t("sections.collection.title")}`,
        icon: (
          <Image
            src="/Privacy/database.apng"
            alt="Data Collection Icon"
            width={25}
            height={25}
          />
        ),
        content: (
          <>
            <p>{t("sections.collection.intro")}</p>
            <p className="mt-4">{t("sections.collection.also")}</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>{t("sections.collection.logInfo")}</li>
              <li>{t("sections.collection.usageInfo")}</li>
            </ul>
          </>
        ),
      },
      {
        id: "usage",
        title: `2. ${t("sections.usage.title")}`,
        icon: (
          <Image
            src="/Privacy/lens.apng"
            alt="Data Usage Icon"
            width={25}
            height={25}
          />
        ),
        content: (
          <>
            <p>{t("sections.usage.intro")}</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>{t("sections.usage.provide")}</li>
              <li>{t("sections.usage.process")}</li>
              <li>{t("sections.usage.send")}</li>
              <li>{t("sections.usage.respond")}</li>
            </ul>
          </>
        ),
      },
      {
        id: "sharing",
        title: `3. ${t("sections.sharing.title")}`,
        icon: (
          <Image
            src="/Privacy/globe.apng"
            alt="Data Sharing Icon"
            width={25}
            height={25}
          />
        ),
        content: (
          <>
            <p>{t("sections.sharing.content")}</p>
          </>
        ),
      },
      {
        id: "cookies",
        title: `4. ${t("sections.cookies.title")}`,
        icon: <Database className="w-5 h-5" />,
        content: (
          <>
            <p>{t("sections.cookies.intro")}</p>
            <p className="mt-4">{t("sections.cookies.instruction")}</p>
          </>
        ),
      },
      {
        id: "security",
        title: `5. ${t("sections.security.title")}`,
        icon: (
          <Image
            src="/Privacy/lock.apng"
            alt="Data Security Icon"
            width={22}
            height={22}
          />
        ),
        content: (
          <>
            <p>{t("sections.security.content")}</p>
          </>
        ),
      },
    ],
    [t]
  );
  const [activeSection, setActiveSection] = useState(sections[0].id);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 100; // Navbar + some padding
      const elementTop = element.offsetTop;
      const offsetPosition = elementTop - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      // Don't set active section here - let scroll event handler update it naturally
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = 100;
      const scrollPosition = window.scrollY + navbarHeight + 50; // Small offset to trigger earlier

      // Find the section that's currently in view (iterate in reverse to get the correct one)
      let currentSection = sections[0].id;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const elementTop = element.offsetTop;
          // If we've scrolled past this section's top, mark it as current
          if (scrollPosition >= elementTop) {
            currentSection = section.id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    // Run once on mount to set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-100 bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-full backdrop-blur-sm bg-white/10">
                <ShieldCheck className="w-8 h-8 text-white/80" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 relative z-20 -mt-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation - Sticky */}
          <div className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-24">
              <div className="bg-[#12141a] opacity-80 rounded-2xl shadow-xl shadow-blue-900/5 p-6 border-s border-[#1f232d]">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-6">{t('tableOfContents')}</h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group cursor-pointer ${
                      activeSection === section.id
                        ? "bg-white text-[#0a0a0a] shadow-sm"
                        : "text-gray-100 hover:bg-white hover:text-[#0a0a0a]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {section.icon}
                      {section.title.split(". ")[1]}
                    </span>
                    {activeSection === section.id && <ChevronRight className="w-4 h-4" />}
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">{t('related')}</h3>
                <div className="space-y-2">
                  <Link
                    href="/terms"
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl text-gray-300 hover:bg-[#0a0a0a] hover:text-white transition-all duration-200 group"
                  >
                    <span className="flex items-center gap-3">
                      <Scale className="w-5 h-5" />
                      {tFooter("terms")}
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                    <Link
                     href="/faq"
                        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl text-gray-300 hover:bg-[#0a0a0a] hover:text-white transition-all duration-200 group"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5" />
                      FAQ
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>
              </div>

              </div>

              {/* Need Help Card */}
              <div className="mt-6 bg-[#0a0a0a] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150" />
                <h3 className="font-bold text-lg mb-2 relative z-10">{t('needHelp.title')}</h3>
                <p className="text-white/90 text-sm mb-4 relative z-10">
                  {t('needHelp.description')}
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-blue-200 transition-colors relative z-10 group/link"
                >
                  {t('needHelp.contactSupport')} <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-[#12141a] opacity-80 rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden border border-[#1f232d]">
              <div className="p-8 md:p-12 space-y-16">
                {/* Last Updated */}
                <div className="flex items-center gap-2 text-sm text-[#0a0a0a] mb-8 bg-white w-fit px-4 py-2 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  {t('hero.lastUpdated')}: {t('hero.lastUpdatedDate')}
                </div>

                {sections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="scroll-mt-24 "
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        {section.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                    </div>

                    <div className="max-w-none leading-relaxed text-white/90">
                      {section.content}
                    </div>

                    {index !== sections.length - 1 && <Separator className="my-12 bg-white/60" />}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
