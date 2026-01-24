import { getTranslations } from "next-intl/server";
import WordPressHero from "@/components/Services/WordPress/WordPressHero";
import WordPressCards from "@/components/Services/WordPress/WordPressCards";
import Arc from "@/components/Home/ArcHalfGlobe/Arc";
import WordPressService from "@/components/Services/WordPress/WordPressService";

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
