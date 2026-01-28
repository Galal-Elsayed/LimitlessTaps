"use client";

import DatabaseWithRestApi from "@/components/Services/SoftwareSolution/database-with-rest-api";
import { useTranslations } from "next-intl";

export const Data = () => {
  const t = useTranslations("SoftwareSolutions.data");

  return (
    <div className="pt-8 px-8 min-[500px]:p-0 md:p-8 rounded-xl bg-[#0a0a0a] w-full flex items-center justify-center min-h-0 min-[500px]:min-h-[200px] md:min-h-[400px]">
      <DatabaseWithRestApi
        className="scale-[1.3] min-[400px]:scale-[1.2] min-[500px]:scale-[0.75] sm:scale-[0.85] md:scale-100 xl:scale-125 origin-center max-w-none w-auto"
        title={t("title")}
        circleText={t("circleText")}
        badgeTexts={{
          first: t("badges.first"),
          second: t("badges.second"),
          third: t("badges.third"),
          fourth: t("badges.fourth"),
        }}
        buttonTexts={{
          first: t("buttons.first"),
          second: t("buttons.second"),
        }}
      />
    </div>
  );
};
