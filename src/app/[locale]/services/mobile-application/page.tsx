import { getTranslations } from "next-intl/server";
import { ServicesMopile } from "@/components/Services/Mobile/ServicesMobile";
import MobileHero from "@/components/Services/Mobile/MobileHero";
import MobileCards from "@/components/Services/Mobile/MobileCards";
import Arc from "@/components/Home/ArcHalfGlobe/Arc";


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
