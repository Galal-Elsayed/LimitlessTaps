import { getTranslations } from "next-intl/server";

import ServicesHero from "@/components/Services/ServicesHero";
import ServicesDesc from "@/components/Services/ServicesDesc";
import ServicesCarousel from "@/components/Services/ServicesCarousel";
import ServiceCall from "@/components/Services/ServiceCall";

export default async function ServicesPage() {
    const t = await getTranslations('services');

    return (
        <div className="bg-[#0a0a0a]">
            <ServicesHero />
            <ServicesDesc />
            <ServicesCarousel />
            <ServiceCall />
        </div>
    );
}
