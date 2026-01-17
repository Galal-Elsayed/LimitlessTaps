import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar/Navbar";
import { ServicesMopile } from "@/components/Services/Mopile/ServicesMopile";
import MopileHero from "@/components/Services/Mopile/MopileHero";

export default async function MobileApplicationPage() {
    const t = await getTranslations('services');

    return (
        <>
            <MopileHero />
            <ServicesMopile />
        </>
    );
}
