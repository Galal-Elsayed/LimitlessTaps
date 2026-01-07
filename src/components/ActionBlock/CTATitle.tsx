"use client";

import { useTranslations } from "next-intl";

export default function CTATitle() {
  const t = useTranslations("common");
  return (
    <h2 className="text-white font-semibold leading-tight tracking-tight text-4xl md:text-5xl lg:text-6xl">
      {t("cta_title")}
    </h2>
  );
}
