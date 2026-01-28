"use client";

import React from "react";
import { useTranslations } from "next-intl";
import ServicesH from "./ReusableComponents/ServicesHeroMain";

export default function ServicesHero() {
    const t = useTranslations('services');

    const services = [
        t('hero.badges.api_integration'),
        t('hero.badges.enterprise_software'),
        t('hero.badges.database_architecture'),
        t('hero.badges.web_development'),
        t('hero.badges.saas_platforms'),
        t('hero.badges.performance_optimization'),
        t('hero.badges.mvp_development'),
        t('hero.badges.ui_ux_design'),
        t('hero.badges.devops_strategy'),
        t('hero.badges.ecommerce_systems'),
        t('hero.badges.quality_assurance'),
        t('hero.badges.digital_transformation'),
        t('hero.badges.technical_consulting'),
        t('hero.badges.cloud_infrastructure'),
        t('hero.badges.systems_migration'),
        t('hero.badges.mobile_applications'),
    ];

    return (
        <ServicesH
            header={<>{t('hero.services')}</>}
            description={t('hero.description')}
            badges={services}
            notHoverable={[
                t('hero.badges.technical_consulting'),
                t('hero.badges.cloud_infrastructure'),
                t('hero.badges.systems_migration'),
                t('hero.badges.mobile_applications'),
            ]}
        />
    );
}
