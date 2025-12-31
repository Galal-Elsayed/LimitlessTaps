import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar/Navbar";

export default async function HomePage() {
  const t = await getTranslations('home');
  const tCommon = await getTranslations('common');
  const tFooter = await getTranslations('footer');

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      <main className="p-8 max-w-375 mx-auto">
        {/* Header */}
        <header className="mb-8 text-white">
          <video src="/Logo/Main-Logo-Interactive-LowQuality.webm" autoPlay loop muted className="mb-4 w-400 h-auto"></video>
          
        </header>



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
