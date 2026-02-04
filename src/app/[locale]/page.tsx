import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/Home/Hero/Hero";
import Arc from "@/components/Home/ArcHalfGlobe/Arc";
import Responsive from "@/components/Home/Responsive/Responsive";
import Carousel from "@/components/Home/ProjectsCarousel/Carousel";
import WhatWeDeliver from "@/components/Home/WhatWeDeliver/WhatWeDeliver";
import LayoutDesign from "@/components/Home/Desgin/LayoutDesign";
import Reviews from "@/components/Home/Reviews/Reviews";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const title = t("title");
  const description = t("hero_subtitle");

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Digital Solutions & Software Development`,
      description,
      url: `https://limitlesstaps.com/${locale}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Digital Solutions & Software Development`,
      description,
    },
    alternates: {
      canonical: `https://limitlesstaps.com/${locale}`,
      languages: {
        "en-US": "https://limitlesstaps.com/en",
        "ar-SA": "https://limitlesstaps.com/ar",
      },
    },
  };
}

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Hero />
      <WhatWeDeliver />
      <LayoutDesign />
      <Carousel />
      <Responsive />
      <Reviews />
      <Arc />
    </div>
  );
}
