import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar/Navbar";
import ServicesDesign from "@/components/Services/WebDesign/ServicesDesign";
import WebdesignHero from "@/components/Services/WebDesign/WebdesignHero";

import DesignCards from "@/components/Services/WebDesign/DesignCards";
import ServiceCall from "@/components/Services/ServiceCall";

import DesignVisual from "@/components/Services/WebDesign/DesignVisual";

export default async function WebDesignPage() {
    const t = await getTranslations('services');

    return (
        <>
            <WebdesignHero />
            <DesignVisual />
            <DesignCards />
            <ServiceCall />
        </>
    );
}
