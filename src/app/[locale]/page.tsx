import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/Home/Hero/Hero";
import WhatWeDeliver from "@/components/Home/WhatWeDeliver/WhatWeDeliver";
import { Preloader } from "@/components/Preloader";

// Lazy load below-the-fold components to improve First Contentful Paint
// These components load when they enter the viewport or when idle
const LayoutDesign = dynamic(
  () => import("@/components/Home/Desgin/LayoutDesign"),
  { ssr: true } // Keep SSR for SEO
);

const Carousel = dynamic(
  () => import("@/components/Home/ProjectsCarousel/Carousel"),
  { ssr: true }
);

const Responsive = dynamic(
  () => import("@/components/Home/Responsive/Responsive"),
  { ssr: true }
);

const Reviews = dynamic(
  () => import("@/components/Home/Reviews/Reviews"),
  { ssr: true }
);

const Arc = dynamic(
  () => import("@/components/Home/ArcHalfGlobe/Arc"),
  { ssr: true }
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const common = await getTranslations({ locale, namespace: "common" });

  const title = t("title");
  const description = t("hero_subtitle");
  const brandName = common("brand_name");

  return {
    title,
    description,
    openGraph: {
      title: `${brandName} | Digital Solutions & Software Development`,
      description,
      url: `https://limitlesstaps.com/${locale}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${brandName} | Digital Solutions & Software Development`,
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
      <Preloader />
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
