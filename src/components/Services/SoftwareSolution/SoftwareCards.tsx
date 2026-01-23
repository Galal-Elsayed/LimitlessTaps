"use client";

import React from "react";
import SeoCards from "../ReusableComponents/SeoCards";

// --- SHAPES ---

const EnterpriseShape = () => (
  <div className="absolute top-0 right-0 p-8 opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
    <div className="grid grid-cols-3 gap-2 w-48 rotate-[-12deg]">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="w-12 h-12 border border-white/10 bg-white/5 rounded-lg backdrop-blur-sm" />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
    </div>
  </div>
);

const CloudShape = () => (
  <div className="absolute -right-12 -top-12 opacity-50 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none">
    <div className="relative w-80 h-80">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 border border-white/20 rounded-[50%] transform rotate-12" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 border border-white/10 rounded-[50%] transform -rotate-12" />
      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/50 rounded-full animate-ping" />
    </div>
  </div>
);

const ApiShape = () => (
  <div className="absolute right-8 bottom-8 opacity-50 group-hover:opacity-90 transition-all duration-500 pointer-events-none">
    <div className="flex gap-4 items-center">
      <div className="w-16 h-16 border-2 border-white/20 rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-white/50 rounded-full" />
      </div>
      <div className="w-24 h-0.5 bg-gradient-to-r from-white/20 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 w-1/2 h-full bg-white/50 animate-[shimmer_2s_infinite]" />
      </div>
      <div className="w-16 h-16 border-2 border-white/20 rounded-lg transform rotate-45" />
    </div>
  </div>
);

const DataShape = () => (
  <div className="absolute inset-x-0 bottom-0 h-40 opacity-30 group-hover:opacity-60 transition-opacity duration-1000 pointer-events-none overflow-hidden">
    <div className="flex items-end justify-center gap-2 h-full px-8">
      {[40, 60, 30, 80, 50, 90, 40].map((h, i) => (
        <div key={i} className="w-8 bg-white/10 rounded-t-sm" style={{ height: `${h}%` }} />
      ))}
    </div>
    <div className="absolute top-0 w-full h-px bg-white/10" />
  </div>
);

const SecurityShape = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity duration-1000 pointer-events-none">
    <div className="w-64 h-64 border border-white/5 rounded-full animate-pulse border-2" />
    <div className="absolute w-48 h-48 border border-white/10 rounded-full animate-ping" />
    <div className="absolute w-32 h-32 border border-white/20 rounded-full border-dashed animate-[spin_10s_linear_infinite]" />
  </div>
);

const SOFTWARE_SERVICES = [
  {
    title: "Enterprise Software Solutions",
    description:
      "Scalable, secure, and custom-tailored software for large organizations. We build mission-critical systems that streamline operations, automate workflows, and integrate seamlessly with your existing legacy infrastructure.",
    colSpan: "lg:col-span-4",
    shape: <EnterpriseShape />,
  },
  {
    title: "Cloud Infrastructure",
    description:
      "Architecting resilient cloud-native environments. We leverage AWS, Azure, and Google Cloud to build self-healing, auto-scaling infrastructures that maximize uptime and minimize operational costs.",
    colSpan: "lg:col-span-8",
    shape: <CloudShape />,
  },
  {
    title: "API Development & Integration",
    description:
      "Connecting your digital ecosystem. We design robust RESTful and GraphQL APIs that serve as the backbone of your applications, enabling secure data exchange between disparate systems and third-party services.",
    colSpan: "lg:col-span-6",
    shape: <ApiShape />,
  },
  {
    title: "Data Analytics & BI",
    description:
      "Turning raw data into actionable insights. Our data engineering solutions aggregate, process, and visualize your business metrics, empowering you to make informed, data-driven decisions in real-time.",
    colSpan: "lg:col-span-6",
    shape: <DataShape />,
  },
  {
    title: "Cybersecurity & Data Protection",
    description:
      "Safeguarding your digital assets. We implement rigorous security protocols, encryption standards, and compliance measures (GDPR, HIPAA) to protect sensitive data and ensure business continuity against cyber threats.",
    colSpan: "lg:col-span-12",
    shape: <SecurityShape />,
  },
];

export function SoftwareCards() {

    return (
        <SeoCards
            items={SOFTWARE_SERVICES}
            seoHeader="Custom Software Development & Cloud Solutions"
            seoList={[
                "Enterprise Resource Planning (ERP)",
                "Cloud Migration & Architecture",
                "API Development",
                "Business Intelligence Solution",
                "Cybersecurity Services"
            ]}
            gradientBottom={false}

        />
    );
}

export default SoftwareCards;
