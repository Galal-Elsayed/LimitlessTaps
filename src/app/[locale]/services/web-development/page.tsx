import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Webhero from "@/components/Services/Web/Webhero";
import ServicesWeb from "@/components/Services/Web/ServicesWeb";
import WebCards from "@/components/Services/Web/WebCards";
import Arc from "@/components/Home/ArcHalfGlobe/Arc";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "services" });

    const title = t("web_development_title");
    const description = t("web_development_desc");

    return {
        title,
        description,
        keywords: [
            "web development",
            "React development",
            "Next.js development",
            "frontend development",
            "backend development",
            "full-stack development",
            "custom web applications",
            "responsive web design",
            "web app development UAE",
        ],
        openGraph: {
            title: `${title} | Limitless Taps`,
            description,
            url: `https://limitlesstaps.com/${locale}/services/web-development`,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | Limitless Taps`,
            description,
        },
        alternates: {
            canonical: `https://limitlesstaps.com/${locale}/services/web-development`,
            languages: {
                "en-US": "https://limitlesstaps.com/en/services/web-development",
                "ar-SA": "https://limitlesstaps.com/ar/services/web-development",
            },
        },
    };
}

export default async function WebDevelopmentPage() {
    const t = await getTranslations('services');

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Webhero />
            <ServicesWeb />
            <WebCards />
            <Arc />
        </div>
    );
}
