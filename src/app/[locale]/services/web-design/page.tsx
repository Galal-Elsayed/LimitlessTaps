import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar/Navbar";
import ServicesDesign from "@/components/Services/WebDesign/ServicesDesign";
import WebdesignHero from "@/components/Services/WebDesign/WebdesignHero";

export default async function WebDesignPage() {
    const t = await getTranslations('services');

    return (
        <>
            <WebdesignHero />
            <ServicesDesign />
        </>
    );
}
