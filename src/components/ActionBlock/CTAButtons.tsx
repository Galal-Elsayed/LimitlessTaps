"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function CTAButtons() {
  const t = useTranslations("common");
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <Link
        href="/contact"
        className="inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:brightness-95 transition-all"
      >
        {t("cta_primary")}
      </Link>
      <Link
        href="/contact"
        className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white opacity-80 hover:opacity-100 transition-opacity"
      >
        {t("cta_secondary")} <span className="ml-1">→</span>
      </Link>
    </div>
  );
}
