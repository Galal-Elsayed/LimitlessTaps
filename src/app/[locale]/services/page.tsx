import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar/Navbar";

export default async function ServicesPage() {
    const t = await getTranslations('services');

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Navbar />
            <main className="p-8 max-w-[1400px] mx-auto">
                <h1 className="text-4xl text-white mb-4">{t("title")}</h1>
                <p className="text-gray-400 text-lg mb-8">{t("description")}</p>

                <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 bg-white/5 rounded-lg border border-white/10">
                        <h3 className="text-xl text-white mb-2">{t("web_development_title")}</h3>
                        <p className="text-gray-400">{t("web_development_desc")}</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-lg border border-white/10">
                        <h3 className="text-xl text-white mb-2">{t("mobile_application_title")}</h3>
                        <p className="text-gray-400">{t("mobile_application_desc")}</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-lg border border-white/10">
                        <h3 className="text-xl text-white mb-2">{t("software_solution_title")}</h3>
                        <p className="text-gray-400">{t("software_solution_desc")}</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-lg border border-white/10">
                        <h3 className="text-xl text-white mb-2">{t("web_design_title")}</h3>
                        <p className="text-gray-400">{t("web_design_desc")}</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
