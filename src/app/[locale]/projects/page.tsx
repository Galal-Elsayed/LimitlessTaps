import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProjectsHero from "@/components/Projects/ProjectsHero";
import ProjectsCards from "@/components/Projects/ProjectsCards";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  const title = t("header.title");
  const description = t("header.description");

  return {
    title,
    description,
    keywords: [
      "portfolio",
      "web projects",
      "mobile apps",
      "case studies",
      "software development projects",
      "digital solutions",
    ],
    openGraph: {
      title: `${title} | Limitless Taps`,
      description,
      url: `https://limitlesstaps.com/${locale}/projects`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Limitless Taps`,
      description,
    },
    alternates: {
      canonical: `https://limitlesstaps.com/${locale}/projects`,
      languages: {
        "en-US": "https://limitlesstaps.com/en/projects",
        "ar-SA": "https://limitlesstaps.com/ar/projects",
      },
    },
  };
}

export default function OurWorkPage() {
  return (
    <>
      <ProjectsHero />
      <ProjectsCards />
    </>
  );
}
