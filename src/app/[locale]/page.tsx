import { getTranslations } from "next-intl/server";


import { GlobeSection } from "@/components/GlobeSection/GlobeSection";

export default async function HomePage() {
  const t = await getTranslations('home');
  const tFooter = await getTranslations('footer');
  const tCommon = await getTranslations('common');


  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      

      <main className="p-8 max-w-[1400px] mx-auto">
        {/* Header */}
        <header className="mb-8 text-white">
          <video src="/Logo/Main-Logo-Interactive-LowQuality.webm" autoPlay loop muted className="mb-4 w-400 h-auto"></video>

        </header>

        {/* Globe Section */}
        <GlobeSection />



        
      </main>
    </div>
  );
}
