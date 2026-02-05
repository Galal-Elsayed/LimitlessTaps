import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CareersHero from "@/components/Careers/CareersHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "careers" });
  const common = await getTranslations({ locale, namespace: "common" });

  const title = t("title");
  const description = t("description");
  const brandName = common("brand_name");

  return {
    title,
    description,
    keywords: [
      "careers",
      "jobs",
      "software developer jobs",
      "web developer careers",
      "tech jobs UAE",
      "Abu Dhabi tech jobs",
    ],
    openGraph: {
      title: `${title} | ${brandName}`,
      description,
      url: `https://limitlesstaps.com/${locale}/careers`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${brandName}`,
      description,
    },
    alternates: {
      canonical: `https://limitlesstaps.com/${locale}/careers`,
      languages: {
        "en-US": "https://limitlesstaps.com/en/careers",
        "ar-SA": "https://limitlesstaps.com/ar/careers",
      },
    },
  };
}

export default function CareersPage() {
  return <CareersHero />;
}
