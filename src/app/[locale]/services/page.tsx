import { getTranslations } from "next-intl/server";

import ServicesHero from "@/components/Services/ServicesHero";
import ServiceCall from "@/components/Services/ServiceCall";
import ServicesGridCards from "@/components/Services/ServicesGridCards";
import ServiceApproach from "@/components/Services/ServiceApproach";
import StickyPhone from "@/components/Home/StickyPhone/StickyPhone";
import ServicesApproach from "@/components/Services/ServicesApproach";

export default async function ServicesPage() {
    const t = await getTranslations('services');

    return (
        <div className="bg-[#0a0a0a]">
            <ServicesHero />
            <ServicesGridCards />
            <ServicesApproach />
            <ServiceCall />
        </div>
    );
}
