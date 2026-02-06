import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ServiceCall from "@/components/Services/ServiceCall";
import ServicesGridCards from "@/components/Services/ServicesGridCards";
import ServicesApproach from "@/components/Services/ServicesApproach";
import ServicesHero from "@/components/Services/ServicesHero";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "services" });
    const common = await getTranslations({ locale, namespace: "common" });

    const title = t("title");
    const description = t("description");
    const brandName = common("brand_name");

    return {
        title,
        description,
        keywords: [
            "web development services",
            "mobile app development",
            "software solutions",
            "UI/UX design",
            "enterprise software",
            "custom applications",
            "WordPress development",
            "SaaS development",
        ],
        openGraph: {
            title: `${title} | ${brandName}`,
            description,
            url: `https://limitlesstaps.com/${locale}/services`,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | ${brandName}`,
            description,
        },
        alternates: {
            canonical: `https://limitlesstaps.com/${locale}/services`,
            languages: {
                "en-US": "https://limitlesstaps.com/en/services",
                "ar-SA": "https://limitlesstaps.com/ar/services",
            },
        },
    };
}

export default async function ServicesPage() {
    const t = await getTranslations("services");

    return (
        <div className="bg-[#0a0a0a]">
            <ServicesHero />
            <ServicesGridCards />
            <ServicesApproach />
            <ServiceCall />
        </div>
    );
}
