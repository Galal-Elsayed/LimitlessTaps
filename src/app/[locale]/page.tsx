import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar/Navbar";

export default async function HomePage() {
  const t = await getTranslations('home');
  const tCommon = await getTranslations('common');
  const tFooter = await getTranslations('footer');

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      <main className="p-8 max-w-[1400px] mx-auto">
        {/* Header */}
        <header className="mb-8 text-white">
          <h1 className="text-4xl mb-2">{t("title")}</h1>
          <p className="text-xl text-gray-400">{t("welcome")}</p>
        </header>

        {/* Features */}
        <section className="mb-8">
          <h3 className="text-white mb-4 text-xl">{t("features_title")}</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-6 bg-white/5 rounded-lg text-white border border-white/10">{t("feature_1")}</div>
            <div className="p-6 bg-white/5 rounded-lg text-white border border-white/10">{t("feature_2")}</div>
            <div className="p-6 bg-white/5 rounded-lg text-white border border-white/10">{t("feature_3")}</div>
          </div>
        </section>

        {/* Common Actions */}
        <section className="mb-8 p-6 border border-white/10 rounded-lg bg-white/[0.02]">
          <strong className="text-white">Common Actions:</strong>
          <div className="flex gap-2 mt-4 flex-wrap">
            <button className="px-4 py-2 bg-green-600 text-white border-none rounded cursor-pointer">{tCommon("submit")}</button>
            <button className="px-4 py-2 bg-blue-500 text-white border-none rounded cursor-pointer">{tCommon("save")}</button>
            <button className="px-4 py-2 bg-orange-500 text-white border-none rounded cursor-pointer">{tCommon("edit")}</button>
            <button className="px-4 py-2 bg-red-600 text-white border-none rounded cursor-pointer">{tCommon("delete")}</button>
            <button className="px-4 py-2 bg-gray-600 text-white border-none rounded cursor-pointer">{tCommon("cancel")}</button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 pt-6 text-gray-500">
          <p>{tFooter("copyright")}</p>
          <div className="flex gap-4 mt-2">
            <span className="cursor-pointer hover:text-white transition-colors">{tFooter("privacy")}</span>
            <span className="cursor-pointer hover:text-white transition-colors">{tFooter("terms")}</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
