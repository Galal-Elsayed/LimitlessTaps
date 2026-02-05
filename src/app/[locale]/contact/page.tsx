import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactPage from "@/components/Contact/ContactPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const common = await getTranslations({ locale, namespace: "common" });

  const title = "Contact Us";
  const description = "Get in touch with Limitless Taps for your next digital project. We're here to help you build amazing software solutions.";
  const brandName = common("brand_name");

  return {
    title,
    description,
    keywords: [
      "contact",
      "get in touch",
      "software development inquiry",
      "project consultation",
      "digital agency contact",
    ],
    openGraph: {
      title: `${title} | ${brandName}`,
      description,
      url: `https://limitlesstaps.com/${locale}/contact`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${brandName}`,
      description,
    },
    alternates: {
      canonical: `https://limitlesstaps.com/${locale}/contact`,
      languages: {
        "en-US": "https://limitlesstaps.com/en/contact",
        "ar-SA": "https://limitlesstaps.com/ar/contact",
      },
    },
  };
}

// Main contact page component handling user interactions
export default function Page() {
  return <ContactPage />;
}
