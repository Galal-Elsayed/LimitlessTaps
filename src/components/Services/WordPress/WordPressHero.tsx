"use client";

import ServiceHeroBase from "../ReusableComponents/ServiceHeroBase";

export default function WordPressHero() {
    return (
        <ServiceHeroBase
            title={<>cms & <br /> wordpress </>}
            raysColor="#ffffff"
            minHeight="h-[50vh]"
        />
    );
}
