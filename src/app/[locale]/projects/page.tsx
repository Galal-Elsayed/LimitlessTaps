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
  const common = await getTranslations({ locale, namespace: "common" });

  const title = t("header.title");
  const description = t("header.description");
  const brandName = common("brand_name");

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
      title: `${title} | ${brandName}`,
      description,
      url: `https://limitlesstaps.com/${locale}/projects`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${brandName}`,
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
