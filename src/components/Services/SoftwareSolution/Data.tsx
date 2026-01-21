"use client";

import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";

export const Data = () => {
    return (
        <div className="p-8 rounded-xl bg-[#0a0a0a] w-full flex items-center justify-center min-h-[400px]">
            <DatabaseWithRestApi
                className="scale-125 origin-center max-w-none w-auto"
                title="Centralized Enterprise System"
                circleText="Core"
                badgeTexts={{
                    first: "ERP",
                    second: "CRM",
                    third: "HRM",
                    fourth: "Inventory"
                }}
                buttonTexts={{
                    first: "Analytics",
                    second: "Cloud"
                }}
            />


        </div>
    );
};