"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Footer() {
  const tFooter = useTranslations("footer");
  const tNav = useTranslations("navigation");
  const tServices = useTranslations("services");

  const siteLinks = [
    { key: "company", href: "/about-us" },
    { key: "portfolio", href: "/our-work" },
    { key: "careers", href: "/careers" },
    { key: "contact", href: "/contact" },
  ];

  const serviceLinks = [
    { key: "web_development", href: "/services/web-development", title: tServices("web_development_title") },
    { key: "mobile_application", href: "/services/mobile-application", title: tServices("mobile_application_title") },
    { key: "software_solution", href: "/services/software-solution", title: tServices("software_solution_title") },
    { key: "web_design", href: "/services/web-design", title: tServices("web_design_title") },
  ];

  const socials = [
    { name: "Facebook", href: "#", src: "/Footer/facebook.svg", w: 24 },
    { name: "Instagram", href: "#", src: "/Footer/instagram.svg", w: 24 },
    { name: "WhatsApp", href: "#", src: "/Footer/whatsapp.svg", w: 24 },
    { name: "Mail", href: "mailto:hello@example.com", src: "/Footer/mail.svg", w: 22 },
    { name: "LinkedIn", href: "#", src: "/Footer/linkedin.svg", w: 24 },
  ];

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 px-8 pt-14 pb-0 text-gray-300">
      <div className="max-w-[1400px] mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {/* Site */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 tracking-wide">{tNav("services")}</h3>
            <ul className="space-y-2 text-sm">
              {serviceLinks.map((s) => (
                <li key={s.key}>
                  <Link href={s.href} className="text-gray-300 hover:text-white transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-4 tracking-wide">{tFooter("site")}</h3>
            <ul className="space-y-2 text-sm">
              {siteLinks.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} className="text-gray-300 hover:text-white transition-colors">
                    {tNav(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-4 tracking-wide">{tFooter("legal")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  {tFooter("privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  {tFooter("terms")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Brand + status (spans two columns on large) */}
          <div className="md:col-span-2 lg:col-span-2 flex flex-col items-start lg:items-end gap-3">
            <Image
              src="/Logo/Main-Logo-Opt.gif"
              alt="Limitless Taps"
              width={160}
              height={64}
              className="object-contain"
              unoptimized
            />
            <div className="flex items-center gap-2 text-sm">
              <span
                className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.9)]"
                aria-hidden="true"
              />
              <span className="text-emerald-300">{tFooter("all_systems_operational")}</span>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4 mt-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  className="hover:brightness-125 transition-all duration-300"
                >
                  <Image src={s.src} alt={s.name} width={s.w} height={s.w} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row (no divider; copyright right) */}
        <div className="text-sm text-gray-300 text-right">
          <p>{tFooter("copyright")}</p>
        </div>

        {/* Fading Brand Name */}
        <div className="w-full flex justify-center select-none pointer-events-none overflow-hidden">
          <h1 className="text-[10vw] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white/20 to-transparent opacity-50 whitespace-nowrap">
            LIMITLESS TAPS
          </h1>
        </div>
      </div>
    </footer>
  );
}
