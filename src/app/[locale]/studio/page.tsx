import { getTranslations } from "next-intl/server";

export default async function StudioPage() {
    const t = await getTranslations("navigation");

    return (
        <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
                {/* Hero Section */}
                <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-b from-white via-white/90 to-white/40 bg-clip-text text-transparent">
                    {t("studio")}
                </h1>

                <p className="text-xl md:text-2xl text-neutral-400 mb-12 max-w-2xl mx-auto">
                    Welcome to our creative studio. This page is under construction.
                </p>

                {/* Mock Content Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 mx-auto">
                            <span className="text-2xl">🎨</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2">Design</h3>
                        <p className="text-sm text-neutral-400">Creative design solutions</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 mx-auto">
                            <span className="text-2xl">💡</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2">Innovation</h3>
                        <p className="text-sm text-neutral-400">Cutting-edge ideas</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4 mx-auto">
                            <span className="text-2xl">🚀</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2">Launch</h3>
                        <p className="text-sm text-neutral-400">Ship products fast</p>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="mt-16 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                    <span className="text-sm text-yellow-500">Coming Soon</span>
                </div>
            </div>
        </main>
    );
}
