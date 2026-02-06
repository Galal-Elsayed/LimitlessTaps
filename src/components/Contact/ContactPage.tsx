"use client";

import { motion } from "motion/react";
import { useTranslations, useLocale } from "next-intl";

import Link from "next/link";
import Image from "next/image";

import ContactForm from "@/components/Contact/ContactForm";
import ContactGrid from "@/components/Contact/ContactGrid";
import FAQ from "@/components/Contact/FAQ";

export default function ContactPage() {
  const t = useTranslations("contact");

  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Dark World Map Background */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src="/contact/contact-bg.png"
            alt="World Map Background"
            fill
            className="object-cover opacity-40 mix-blend-screen"
            quality={100}
            priority
          />
          {/* Gradient overlay to fade edges into black */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-60" />
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
            className="col-span-1 lg:col-span-2"
          >
            <h1
              className={`text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4 font-app text-white leading-tight`}
            >
              {t.rich("hero.title", {
                br: () => <br />,
                gradient: (chunks) => (
                  <span className="text-white">{chunks}</span>
                ),
              })}
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl leading-relaxed">
              {t("hero.subtitle")}
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
