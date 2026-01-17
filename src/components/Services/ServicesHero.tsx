"use client";

import React from "react";
import ServicesH from "./ReusableComponents/ServicesH";

const services = [
    "API INTEGRATION",
    "ENTERPRISE SOFTWARE",
    "DATABASE ARCHITECTURE",
    "WEB DEVELOPMENT",
    "SAAS PLATFORMS",
    "PERFORMANCE OPTIMIZATION",
    "MVP DEVELOPMENT",
    "UI/UX DESIGN",
    "DEVOPS STRATEGY",
    "E-COMMERCE SYSTEMS",
    "QUALITY ASSURANCE",
    "DIGITAL TRANSFORMATION",
    "TECHNICAL CONSULTING",
    "CLOUD INFRASTRUCTURE",
    "SYSTEMS MIGRATION",
    "MOBILE APPLICATIONS",
];

export default function ServicesHero() {
    return (
        <ServicesH
            header={<>Select <br /> Services</>}
            description="End-to-end software solutions tailored for impact. From immersive web experiences to scalable enterprise architectures, we build the digital foundation for your future."
            badges={services}
            hiddenBadges={["DEVOPS STRATEGY"]}
        />
    );
}
