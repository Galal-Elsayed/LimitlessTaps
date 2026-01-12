"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { motion } from "motion/react";
import { Scale, ChevronRight, ShieldCheck, ArrowRight, HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";

export default function TermsContent() {
  const t = useTranslations('terms');
  const tFooter = useTranslations('footer');

  // Terms Sections
  const termsSections = [
    {
      id: "introduction",
      title: `1. ${t('sections.introduction.title')}`,
      content: t('sections.introduction.content'),
      icon: <Image src="/Terms/book.apng" alt="Introduction Icon" width={25} height={25} />,
    },
    {
      id: "accounts",
      title: `2. ${t('sections.accounts.title')}`,
      content: t('sections.accounts.content'),
      icon: <Image src="/Terms/account.apng" alt="User Accounts Icon" width={25} height={25} />,
    },
    {
      id: "intellectual-property",
      title: `3. ${t('sections.intellectualProperty.title')}`,
      content: t('sections.intellectualProperty.content'),
      icon: <Image src="/Terms/brain.apng" alt="Intellectual Property Icon" width={25} height={25} />,
    },
    {
      id: "termination",
      title: `4. ${t('sections.termination.title')}`,
      content: t('sections.termination.content'),
      icon: <Image src="/Terms/warning.apng" alt="Termination Icon" width={25} height={25} />,
    },
    {
      id: "governing-law",
      title: `5. ${t('sections.governingLaw.title')}`,
      content: t('sections.governingLaw.content'),
      icon: <Image src="/Terms/shield.apng" alt="Governing Law Icon" width={25} height={25} />,
    },
  ];
  const [activeSection, setActiveSection] = useState(termsSections[0].id);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 100;
      const elementTop = element.offsetTop;
      const offsetPosition = elementTop - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = 100;
      const scrollPosition = window.scrollY + navbarHeight + 50;

      let currentSection = termsSections[0].id;

      for (const section of termsSections) {
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

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] print:bg-white">
      <style jsx global>{`
        @media print {
          @page {
            margin-top: 0;
            margin-bottom: 0;
          }
          body {
            padding-top: 0;
            padding-bottom: 0;
          }
        }
      `}</style>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-100 bg-[#0a0a0a] overflow-hidden flex items-center justify-center print:hidden">


        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-full backdrop-blur-sm bg-white/10">
                <Scale className="w-8 h-8 text-white/80" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 text-white text-sm backdrop-blur-sm uppercase font-medium tracking-wide">
              {t('hero.effectiveDate')}: {t('hero.effectiveDateValue')}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 relative z-20 -mt-20 print:mt-0 print:pt-0 print:px-0">
        <div className="flex flex-col lg:flex-row gap-12 print:block">
          {/* Sidebar Navigation - Sticky */}
          <div className="lg:w-1/4 hidden lg:block print:hidden">
            <div className="sticky top-28">
              <div className="bg-[#12141a] opacity-80 rounded-2xl shadow-xl shadow-blue-900/5 p-6 border-s border-[#1f232d]">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-6">{t('tableOfContents')}</h3>
                <nav className="space-y-1">
                  {termsSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group cursor-pointer ${activeSection === section.id
                        ? "bg-white text-[#0a0a0a] shadow-sm"
                        : "text-gray-100 hover:bg-white hover:text-[#0a0a0a]"
                        }`}
                    >
                      <span className="flex items-center gap-3">
                        {section.icon}
                        {section.title.split(". ")[1]}
                      </span>
                      {activeSection === section.id && (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-gray-700">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">{t('related')}</h3>
                  <Link
                    href="/privacy"
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl text-gray-300 hover:bg-[#0a0a0a] hover:text-white transition-all duration-200 group"
                  >
                    <span className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5" />
                      {tFooter('privacy')}
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

              {/* Quick Contact Card */}
              <div className="mt-6 bg-[#0a0a0a] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150" />
                <h3 className="font-bold text-lg mb-2 relative z-10">{t('needHelp.title')}</h3>
                <p className="text-blue-200 text-sm mb-4 relative z-10">
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
          <div className="lg:w-3/4 print:w-full">
            <div className="bg-[#12141a] opacity-80 rounded-3xl shadow-xl shadow-blue-900/5 border border-[#1f232d] overflow-hidden print:shadow-none print:border-none print:rounded-none">
              {/* Print Header */}
              <div className="hidden print:flex flex-col items-center mb-4 pt-4">
                <h1 className="text-2xl font-bold text-white mt-2">Limitless Taps</h1>
                <h2 className="text-lg text-gray-300 mt-1">{t('hero.title')}</h2>
              </div>

              <div className="p-8 md:p-12 space-y-16 print:p-0 print:space-y-4">
                {/* Last Updated */}
                <div className="flex items-center gap-2 text-sm text-[#0a0a0a] mb-8 bg-white w-fit px-4 py-2 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  {t('hero.lastUpdated')}: {t('hero.lastUpdatedDate')}
                </div>

                {termsSections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="scroll-mt-32 group"
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

                    {index !== termsSections.length - 1 && <Separator className="my-12 bg-white/60" />}
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
