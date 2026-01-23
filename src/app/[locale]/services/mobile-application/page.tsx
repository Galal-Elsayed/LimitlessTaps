import { getTranslations } from "next-intl/server";
import { ServicesMopile } from "@/components/Services/Mopile/ServicesMopile";
import MobileHero from "@/components/Services/Mopile/MobileHero";
import MobileCards from "@/components/Services/Mopile/MobileCards";
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
