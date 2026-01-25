"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamically import dashboards to avoid SSR issues
const Dashboard3 = dynamic(() => import("./Dashboard3"), { ssr: false });
const Dashboard4 = dynamic(() => import("./Dashboard4"), { ssr: false });

export const CMSDashboards = () => {
    return (
        <div className="mt-6 md:mt-16 flex flex-col gap-4 md:gap-6">
            {/* Dashboard 3 - Browser Window */}
            <div className="rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)] md:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                {/* Browser Header - macOS Style */}
                <div className="h-8 md:h-10 bg-[#1e1e1e] border-b border-white/5 flex items-center px-2 md:px-4 gap-2 md:gap-3">
                    {/* Traffic Light Buttons */}
                    <div className="flex gap-1.5 md:gap-2 shrink-0">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    {/* URL Bar */}
                    <div className="flex-1 max-w-md h-5 md:h-6 bg-[#2a2a2a] rounded-md border border-white/5 flex items-center px-2 md:px-3 gap-1.5 md:gap-2 overflow-hidden">
                        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                            <div className="w-0.5 h-0.5 md:w-1 md:h-1 bg-white/40 rounded-full" />
                        </div>
                        <span className="text-[10px] md:text-[11px] text-white/50 font-medium truncate select-none">
                            dashboard-analytics.io
                        </span>
                    </div>
                </div>
                {/* Dashboard Content - Responsive height */}
                <div className="max-h-[60vh] md:max-h-[70vh] overflow-y-auto overflow-x-hidden bg-[#0a0a0a] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                    <div className="md:scale-100 scale-[0.8] origin-top-left md:w-full w-[120%]">
                        <Dashboard3 />
                    </div>
                </div>
            </div>

            {/* Dashboard 4 - Browser Window */}
            <div className="rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)] md:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                {/* Browser Header - macOS Style */}
                <div className="h-8 md:h-10 bg-[#1e1e1e] border-b border-white/5 flex items-center px-2 md:px-4 gap-2 md:gap-3">
                    {/* Traffic Light Buttons */}
                    <div className="flex gap-1.5 md:gap-2 shrink-0">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    {/* URL Bar */}
                    <div className="flex-1 max-w-md h-5 md:h-6 bg-[#2a2a2a] rounded-md border border-white/5 flex items-center px-2 md:px-3 gap-1.5 md:gap-2 overflow-hidden">
                        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                            <div className="w-0.5 h-0.5 md:w-1 md:h-1 bg-white/40 rounded-full" />
                        </div>
                        <span className="text-[10px] md:text-[11px] text-white/50 font-medium truncate select-none">
                            enterprise-cms.app
                        </span>
                    </div>
                </div>
                {/* Dashboard Content - Responsive height */}
                <div className="max-h-[60vh] md:max-h-[70vh] overflow-y-auto overflow-x-hidden bg-[#0a0a0a] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                    <div className="md:scale-100 scale-[0.8] origin-top-left md:w-full w-[120%]">
                        <Dashboard4 />
                    </div>
                </div>
            </div>
        </div>
    );
};
