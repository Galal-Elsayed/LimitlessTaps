import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar/Navbar";
import { ServicesDiv } from "@/components/Services/ServicesDivs";

import { ServicesMopile } from "@/components/Services/ServicesMopile";
import ServicesHero from "@/components/Services/ServicesHero";
import ServicesDesign from "@/components/Services/ServicesDesign";
import ServicesSolution from "@/components/Services/ServicesSolution";
import ServicesWeb from "@/components/Services/ServicesWeb";
import ServicesSoft from "@/components/Services/ServicesSoft";

export default async function ServicesPage() {
    const t = await getTranslations('services');

    return (
        <div className="bg-[#0a0a0a]">
            <ServicesHero />
            <ServicesDesign />
            <ServicesWeb />
            <ServicesMopile />
            <ServicesSoft />
        </div>
    );
}
