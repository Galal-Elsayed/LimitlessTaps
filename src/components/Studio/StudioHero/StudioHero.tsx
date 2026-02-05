"use client";
import React from "react";
import { WavyBackground } from "./wavy-background";
import { Header } from "@/components/ui/header";
import { useTranslations, useLocale } from "next-intl";

export default function StudioHero() {
  const t = useTranslations("studio");
  const locale = useLocale();
  const isArabic = locale === "ar";

  // Responsive wave offset: 20% for mobile/tablet (300-900px), 50% (default) for desktop
  const [waveOffset, setWaveOffset] = React.useState(50);

  React.useEffect(() => {
    const handleResize = () => {
      // Only apply higher position for screens <= 900px
      setWaveOffset(window.innerWidth <= 900 ? 38 : 50);
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <WavyBackground
      containerClassName="min-h-[50vh] h-[50vh] md:min-h-[60vh] md:h-[80vh]"
      waveYOffset={waveOffset}
    >
      <Header
        title={t("hero.title")}
        className={`!text-[15vw] md:!text-[11vw] leading-[0.8] text-center w-full max-w-none ${isArabic ? "pb-12" : ""}`}
      />
    </WavyBackground>
  );
}
