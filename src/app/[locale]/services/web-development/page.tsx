import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar/Navbar";
import Webhero from "@/components/Services/Web/Webhero";
import ServicesWeb from "@/components/Services/Web/ServicesWeb";
import WebCards from "@/components/Services/Web/WebCards";

export default async function WebDevelopmentPage() {
    const t = await getTranslations('services');

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Webhero />
            <ServicesWeb />
            <WebCards />
        </div>
    );
}
