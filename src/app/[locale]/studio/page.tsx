import StudioHero from "@/components/Studio/StudioHero/StudioHero";
import StudioTemplates from "@/components/Studio/StudioTemplates/StudioTemplates";
import { getTranslations } from "next-intl/server";

export default async function StudioPage() {
    const t = await getTranslations("navigation");

    return (
        <>
            <StudioHero />
            <StudioTemplates />
        </>
    );
}
