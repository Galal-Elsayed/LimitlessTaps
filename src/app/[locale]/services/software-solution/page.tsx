import { getTranslations } from "next-intl/server";
import SolutionHero from "@/components/Services/SoftwareSolution/SolutionHero";

import SoftwareCards from "@/components/Services/SoftwareSolution/SoftwareCards";
import ServiceCall from "@/components/Services/ServiceCall";
import { Data } from "@/components/Services/SoftwareSolution/Data";
import SolutionGrid from "@/components/Services/SoftwareSolution/SolutionGrid";

export default async function SoftwareSolutionPage() {
    const t = await getTranslations('services');

    return (
        <>
            <SolutionHero />
            <Data />
            <SolutionGrid />
            <div className="sr-only">
                <SoftwareCards />
            </div>
            <ServiceCall />
        </>
    );
}
