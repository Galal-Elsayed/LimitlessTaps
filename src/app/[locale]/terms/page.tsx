import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Footer, Navbar } from "@/components";
import TermsContent from "@/components/Terms/TermsContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function TermsPage() {
  return (
    <>
      <TermsContent />
    </>
  );
}
