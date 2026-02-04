import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar/Navbar";
import AboutHero from '@/components/About/AboutHero';
import AboutCards from "@/components/About/AboutCards";
import AboutSlider from "@/components/About/AboutSlider";
import AboutTap from "@/components/About/AboutTap";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutUs" });

  const title = t("meta.title");
  const description = t("meta.description");

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Limitless Taps`,
      description,
      url: `https://limitlesstaps.com/${locale}/about-us`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Limitless Taps`,
      description,
    },
    alternates: {
      canonical: `https://limitlesstaps.com/${locale}/about-us`,
      languages: {
        "en-US": "https://limitlesstaps.com/en/about-us",
        "ar-SA": "https://limitlesstaps.com/ar/about-us",
      },
    },
  };
}

export default function AboutPage() {
    return (
        <main className="w-full bg-black min-h-screen">
            <AboutHero />
            <AboutCards />
            <AboutSlider />
            <AboutTap />
        </main>
    );
}
