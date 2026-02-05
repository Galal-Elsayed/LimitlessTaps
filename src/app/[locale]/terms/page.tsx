import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Footer, Navbar } from "@/components";
import TermsContent from "@/components/Terms/TermsContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });
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
      url: `https://limitlesstaps.com/${locale}/terms`,
      type: "website",
    },
    alternates: {
      canonical: `https://limitlesstaps.com/${locale}/terms`,
      languages: {
        "en-US": "https://limitlesstaps.com/en/terms",
        "ar-SA": "https://limitlesstaps.com/ar/terms",
      },
    },
  };
}

export default function TermsPage() {
  return (
    <>
      <TermsContent />
    </>
  );
}
