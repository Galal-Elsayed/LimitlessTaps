import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar/Navbar";
import { ServicesMopile } from "@/components/Services/Mopile/ServicesMopile";
import MobileHero from "@/components/Services/Mopile/MobileHero";
import MobileCards from "@/components/Services/Mopile/MobileCards";
import SidePageAction from "@/components/Services/ReusableComponents/SidePageAction";
import ServiceCall from "@/components/Services/ServiceCall";


export default async function MobileApplicationPage() {
    const t = await getTranslations('services');

    return (
        <>
            <MobileHero />
            <ServicesMopile />
            <MobileCards />
            <ServiceCall />

        </>
    );
}
