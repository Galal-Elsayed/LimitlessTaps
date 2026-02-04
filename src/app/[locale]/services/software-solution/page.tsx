import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SolutionHero from "@/components/Services/SoftwareSolution/SolutionHero";

import SoftwareCards from "@/components/Services/SoftwareSolution/SoftwareCards";
import { Data } from "@/components/Services/SoftwareSolution/Data";
import SolutionGrid from "@/components/Services/SoftwareSolution/SolutionGrid";
import Arc from "@/components/Home/ArcHalfGlobe/Arc";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "services" });

    const title = t("software_solution_title");
    const description = t("software_solution_desc");

    return {
        title,
        description,
        keywords: [
            "software solutions",
            "enterprise software",
            "custom software development",
            "SaaS development",
            "API integration",
            "database architecture",
            "cloud solutions",
            "business software",
            "software consulting UAE",
        ],
        openGraph: {
            title: `${title} | Limitless Taps`,
            description,
            url: `https://limitlesstaps.com/${locale}/services/software-solution`,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | Limitless Taps`,
            description,
        },
        alternates: {
            canonical: `https://limitlesstaps.com/${locale}/services/software-solution`,
            languages: {
                "en-US": "https://limitlesstaps.com/en/services/software-solution",
                "ar-SA": "https://limitlesstaps.com/ar/services/software-solution",
            },
        },
    };
}

export default async function SoftwareSolutionPage() {
    const t = await getTranslations('services');

    return (
        <>
            <SolutionHero />
            <Data />
            <SolutionGrid />
            <div className="sr-only">
                <SoftwareCards />
            </div>
            <Arc />
        </>
    );
}
