import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Footer, Navbar } from "@/components";
import TermsContent from "@/components/Terms/TermsContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });

  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${title} | Limitless Taps`,
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
