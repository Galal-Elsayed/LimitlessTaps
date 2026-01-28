"use client";

import React from 'react';
import ServiceHeroBase from '../ReusableComponents/ServiceHeroBase';
import { useTranslations } from 'next-intl';

export default function WebdesignHero() {
    const t = useTranslations('WebDesign.hero');

    return (
        <ServiceHeroBase
            title={<>{t('title')} <br />{t('titleLine2')}</>}
        />
    );
}
