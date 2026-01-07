import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Footer, Navbar } from "@/components";
import PrivacyContent from "@/components/Privacy/PrivacyContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function PrivacyPage() {
  return (
    <>
      <PrivacyContent />
    </>
  );
}
