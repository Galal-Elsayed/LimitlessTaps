"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import ServiceHeroBase from '../ReusableComponents/ServiceHeroBase';

export default function MobileHero() {
    const t = useTranslations('mobileApplication.hero');

    return (
        <ServiceHeroBase
            title={<>{t('title_line1')} <br /> {t('title_line2')}</>}
        />
    );
}
