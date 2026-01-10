import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar/Navbar";
import { ServicesDiv } from "@/components/Services/ServicesDivs";

import { ServicesMopile } from "@/components/Services/ServicesMopile";
import ServicesHero from "@/components/Services/ServicesHero";
import ServicesDesign from "@/components/Services/ServicesDesign";

export default async function ServicesPage() {
    const t = await getTranslations('services');

    return (
        <div className="bg-[#0a0a0a]">
            <ServicesHero />
            <ServicesDesign />
            <ServicesMopile />
        </div>
    );
}
