import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ServicesMopile } from "@/components/Services/Mobile/ServicesMobile";
import MobileHero from "@/components/Services/Mobile/MobileHero";
import MobileCards from "@/components/Services/Mobile/MobileCards";
import Arc from "@/components/Home/ArcHalfGlobe/Arc";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "services" });
    const common = await getTranslations({ locale, namespace: "common" });

    const title = t("mobile_application_title");
    const description = t("mobile_application_desc");
    const brandName = common("brand_name");

    return {
        title,
        description,
        keywords: [
            "mobile app development",
            "iOS development",
            "Android development",
            "React Native",
            "Flutter development",
            "cross-platform apps",
            "native mobile apps",
            "mobile UI/UX design",
            "app development UAE",
        ],
        openGraph: {
            title: `${title} | ${brandName}`,
            description,
            url: `https://limitlesstaps.com/${locale}/services/mobile-application`,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | ${brandName}`,
            description,
        },
        alternates: {
            canonical: `https://limitlesstaps.com/${locale}/services/mobile-application`,
            languages: {
                "en-US": "https://limitlesstaps.com/en/services/mobile-application",
                "ar-SA": "https://limitlesstaps.com/ar/services/mobile-application",
            },
        },
    };
}

export default async function MobileApplicationPage() {
    const t = await getTranslations('services');

    return (
        <>
            <MobileHero />
            <ServicesMopile />
            <MobileCards />
            <Arc />

        </>
    );
}
