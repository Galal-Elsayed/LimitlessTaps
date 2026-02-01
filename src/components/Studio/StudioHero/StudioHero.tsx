"use client";
import { WavyBackground } from "./wavy-background";
import { Header } from "@/components/ui/header";
import { useTranslations, useLocale } from "next-intl";

export default function StudioHero() {
  const t = useTranslations("studio");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <WavyBackground containerClassName="min-h-[60vh] h-[80vh]">
      <Header
        title={t("hero.title")}
        className={`!text-[12vw] leading-[0.8] text-center w-full max-w-none ${isArabic ? "pb-12" : ""}`}
      />
    </WavyBackground>
  );
}
