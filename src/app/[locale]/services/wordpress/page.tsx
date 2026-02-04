import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import WordPressHero from "@/components/Services/WordPress/WordPressHero";
import WordPressCards from "@/components/Services/WordPress/WordPressCards";
import Arc from "@/components/Home/ArcHalfGlobe/Arc";
import WordPressService from "@/components/Services/WordPress/WordPressService";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "services" });

    const title = t("wordpress_cms_title");
    const description = t("wordpress_cms_desc");

    return {
        title,
        description,
        keywords: [
            "WordPress development",
            "WordPress themes",
            "WordPress plugins",
            "CMS development",
            "content management",
            "WooCommerce",
            "WordPress customization",
            "WordPress websites",
            "WordPress UAE",
        ],
        openGraph: {
            title: `${title} | Limitless Taps`,
            description,
            url: `https://limitlesstaps.com/${locale}/services/wordpress`,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | Limitless Taps`,
            description,
        },
        alternates: {
            canonical: `https://limitlesstaps.com/${locale}/services/wordpress`,
            languages: {
                "en-US": "https://limitlesstaps.com/en/services/wordpress",
                "ar-SA": "https://limitlesstaps.com/ar/services/wordpress",
            },
        },
    };
}

export default async function WordPressPage() {
    const t = await getTranslations('services');

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <WordPressHero />
            <WordPressService />
            <WordPressCards />
            <Arc />
        </div>
    );
}
