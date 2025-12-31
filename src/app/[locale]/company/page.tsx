import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar/Navbar"

export default async function CompanyPage() {
    const t = await getTranslations('company');

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Navbar />
            <main className="p-8 max-w-[1400px] mx-auto">
                <h1 className="text-4xl text-white mb-4">{t("title")}</h1>
                <p className="text-gray-400 text-lg">{t("description")}</p>
            </main>
        </div>
    );
}
