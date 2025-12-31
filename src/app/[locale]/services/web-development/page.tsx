'use client';

import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar/Navbar";

export default function WebDevelopmentPage() {
    const t = useTranslations('services');

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Navbar />
            <main className="p-8 max-w-[1400px] mx-auto">
                <h1 className="text-4xl text-white mb-4">{t("web_development_title")}</h1>
                <p className="text-gray-400 text-lg">{t("web_development_desc")}</p>
            </main>
        </div>
    );
}
