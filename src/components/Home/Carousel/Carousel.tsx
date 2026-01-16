"use client";

import { useTranslations } from "next-intl";
import Lottie from "lottie-react";
import bugsAnimation from "@/../public/Home/Carousel/techny-finding-bugs-in-the-code.json";
import tradingAnimation from "@/../public/Home/Carousel/techny-stock-trading-online-on-stock-market.json";
import LaunchSupportCard from "./LaunchSupportCard";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Carousel2() {
  const t = useTranslations("home");

  const cards = [
    {
      header: t("web_dev_header"),
      desc: t("web_dev_desc"),
      type: "video" as const,
      src: "/Home/Carousel/3d-techny-lettering-css-and-laptop-with-program-code-text.mp4",
      link: "/services/web-development",
    },
    {
      header: t("mobile_apps_header"),
      desc: t("mobile_apps_desc"),
      type: "video" as const,
      src: "/Home/Carousel/online-translator-on-smartphone.mp4",
      link: "/services/mobile-apps",
    },
    {
      header: t("software_solutions_header"),
      desc: t("software_solutions_desc"),
      type: "lottie" as const,
      animationData: tradingAnimation,
      link: "/services/software-solutions",
    },
    {
      header: t("design_maintenance_header"),
      desc: t("design_maintenance_desc"),
      type: "lottie" as const,
      animationData: bugsAnimation,
      link: "/services/maintenance",
    },
  ];

  return (
    <section className="w-full bg-transparent pt-20 pb-20 overflow-hidden relative">
      <div className="px-4 md:px-8 max-w-[1250px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
          {/* Left Side: 4 Cards Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {cards.map((card, idx) => (
              <Link
                href={card.link}
                key={idx}
                className="group relative rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden h-full flex flex-col transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Hover Arrow Icon */}
                <div className="absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 backdrop-blur-md opacity-0 -translate-y-2 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>

                {/* Media Container */}
                <div className="relative w-full aspect-16/12 flex items-center justify-center bg-black shrink-0 overflow-hidden">
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#0F0F10] to-transparent opacity-60 z-10" />

                  {card.type === "video" ? (
                    <video
                      src={card.src}
                      className="w-full h-full object-contain scale-120 transform transition-transform duration-700 group-hover:scale-125"
                      muted
                      autoPlay
                      loop
                      playsInline
                      controlsList="nodownload"
                    />
                  ) : (
                    <div className="w-full h-full p-2 scale-120 transform transition-transform duration-700 group-hover:scale-125">
                      <Lottie
                        animationData={card.animationData}
                        loop
                        autoplay
                        style={{ width: "100%", height: "100%" }}
                        rendererSettings={{
                          preserveAspectRatio: "xMidYMid meet",
                          progressiveLoad: true,
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Text Content */}
                <div className="relative p-4 flex-1 flex flex-col justify-start z-10 bg-[#0F0F10]">
                  <h3 className="text-lg md:text-xl font-bold tracking-tight leading-tight mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">
                    {card.header}
                  </h3>
                  <p className="text-sm leading-relaxed font-medium text-gray-400 group-hover:text-gray-300 transition-colors duration-300 line-clamp-2">
                    {card.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Side: Launch & Support Sidebar */}
          <div className="lg:col-span-1 h-full flex flex-col justify-center gap-6">
            {/* Header Above */}
            <div>
              <h2 className="text-6xl font-bold tracking-tight text-white mb-3">Built for Scale</h2>
              <p className="text-gray-400 text-md leading-relaxed">
                From your first deploy to millions of users, we provide the infrastructure and support you need to grow
                without limits.
              </p>
            </div>

            <LaunchSupportCard />

            {/* Description Below */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0 animate-pulse" />
              <p className="text-sm text-gray-300 leading-relaxed">
                <span className="text-white font-semibold block mb-1">Always On Support</span>
                Our automated systems and dedicated team monitor your application 24/7 to ensure maximum uptime and
                performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
