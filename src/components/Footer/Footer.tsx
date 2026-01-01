"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-white/10 pt-6 px-8 text-gray-500 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto">
        <p>{t("copyright")}</p>
        <div className="flex gap-4 mt-2">
          <Link href="/privacy" className="cursor-pointer hover:text-white transition-colors">
            {t("privacy")}
          </Link>
          <Link href="/terms" className="cursor-pointer hover:text-white transition-colors">
            {t("terms")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
