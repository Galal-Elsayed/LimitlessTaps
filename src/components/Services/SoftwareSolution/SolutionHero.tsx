"use client";

import React from 'react';
import ServiceHeroBase from '../ReusableComponents/ServiceHeroBase';
import { useTranslations } from 'next-intl';

export default function SolutionHero() {
    const t = useTranslations('SoftwareSolutions.hero');

    return (
        <ServiceHeroBase
            title={<>{t('title')} <br /> {t('titleLine2')}</>}
            minHeight="h-[35vh] min-[500px]:h-[40vh] md:h-[50vh]"
        />
    );
}
