"use client";

import ServiceHeroBase from "../ReusableComponents/ServiceHeroBase";
import { useTranslations } from "next-intl";

export default function WordPressHero() {
    const t = useTranslations('WordPress.hero');

    return (
        <ServiceHeroBase
            title={<>{t('title')} <br />{t('titleLine2')}</>}
            raysColor="#ffffff"
            minHeight="h-[50vh]"
        />
    );
}
