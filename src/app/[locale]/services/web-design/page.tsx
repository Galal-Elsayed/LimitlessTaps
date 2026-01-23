import { getTranslations } from "next-intl/server";
import WebdesignHero from "@/components/Services/WebDesign/WebdesignHero";

import DesignCards from "@/components/Services/WebDesign/DesignCards";

import DesignVisual from "@/components/Services/WebDesign/DesignVisual";
import Arc from "@/components/Home/ArcHalfGlobe/Arc";

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
