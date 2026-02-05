import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Footer, Navbar } from "@/components";
import PrivacyContent from "@/components/Privacy/PrivacyContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  const common = await getTranslations({ locale, namespace: 'common' });

  const title = t('title');
  const description = t('description');
  const brandName = common('brand_name');

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${title} | ${brandName}`,
      description,
      url: `https://limitlesstaps.com/${locale}/privacy`,
      type: "website",
    },
    alternates: {
      canonical: `https://limitlesstaps.com/${locale}/privacy`,
      languages: {
        "en-US": "https://limitlesstaps.com/en/privacy",
        "ar-SA": "https://limitlesstaps.com/ar/privacy",
      },
    },
  };
}

export default function PrivacyPage() {
  return (
    <>
      <PrivacyContent />
    </>
  );
}
