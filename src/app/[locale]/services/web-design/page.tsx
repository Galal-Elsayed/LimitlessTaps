import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import WebdesignHero from "@/components/Services/WebDesign/WebdesignHero";

import DesignCards from "@/components/Services/WebDesign/DesignCards";

import DesignVisual from "@/components/Services/WebDesign/DesignVisual";
import Arc from "@/components/Home/ArcHalfGlobe/Arc";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "services" });
    const common = await getTranslations({ locale, namespace: "common" });

    const title = t("web_design_title");
    const description = t("web_design_desc");
    const brandName = common("brand_name");

    return {
        title,
        description,
        keywords: [
            "web design",
            "UI design",
            "UX design",
            "user experience",
            "user interface",
            "responsive design",
            "website design",
            "creative design",
            "modern web design UAE",
        ],
        openGraph: {
            title: `${title} | ${brandName}`,
            description,
            url: `https://limitlesstaps.com/${locale}/services/web-design`,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | ${brandName}`,
            description,
        },
        alternates: {
            canonical: `https://limitlesstaps.com/${locale}/services/web-design`,
            languages: {
                "en-US": "https://limitlesstaps.com/en/services/web-design",
                "ar-SA": "https://limitlesstaps.com/ar/services/web-design",
            },
        },
    };
}

export default async function WebDesignPage() {
    const t = await getTranslations('services');

    return (
        <>
            <WebdesignHero />
            <DesignVisual />
            <DesignCards />
            <Arc />
        </>
    );
}
