import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import StudioHero from "@/components/Studio/StudioHero/StudioHero";
import StudioTemplates from "@/components/Studio/StudioTemplates/StudioTemplates";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "studio" });

    const title = "Studio";
    const description = "Explore our ready-made templates and design solutions. Premium website templates, UI kits, and digital assets.";

    return {
        title,
        description,
        keywords: [
            "website templates",
            "UI templates",
            "design templates",
            "premium templates",
            "digital assets",
            "web design kits",
        ],
        openGraph: {
            title: `${title} | Limitless Taps`,
            description,
            url: `https://limitlesstaps.com/${locale}/studio`,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | Limitless Taps`,
            description,
        },
        alternates: {
            canonical: `https://limitlesstaps.com/${locale}/studio`,
            languages: {
                "en-US": "https://limitlesstaps.com/en/studio",
                "ar-SA": "https://limitlesstaps.com/ar/studio",
            },
        },
    };
}

export default async function StudioPage() {
    const t = await getTranslations("navigation");

    return (
        <>
            <StudioHero />
            <StudioTemplates />
        </>
    );
}
