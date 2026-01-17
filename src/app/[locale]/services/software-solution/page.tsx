import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar/Navbar";
import ServicesSoft from "@/components/Services/SoftwareSolution/ServicesSoft";
import SolutionHero from "@/components/Services/SoftwareSolution/SolutionHero";

export default async function SoftwareSolutionPage() {
    const t = await getTranslations('services');

    return (
        <>
            <SolutionHero />
            <ServicesSoft />
        </>
    );
}
