"use client";

import React from "react";
import SeoCards from "../ReusableComponents/SeoCards";

// --- SHAPES ---

const WordPressShape = () => (
    <div className="absolute top-0 right-0 p-8 opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="relative w-64 h-64 rotate-12">
            <div className="absolute inset-0 border-2 border-white/20 rounded-full" />
            <div className="absolute inset-8 border-2 border-white/10 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white/30 rounded-full animate-pulse" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-sm" />
        </div>
    </div>
);

const ThemeShape = () => (
    <div className="absolute -right-8 -top-8 opacity-50 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none">
        <div className="relative w-80 h-80">
            <div className="absolute top-16 right-16 w-48 h-48 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md transform rotate-6 group-hover:rotate-12 transition-transform duration-700" />
            <div className="absolute top-8 right-8 w-48 h-48 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md transform -rotate-3 group-hover:-rotate-6 transition-transform duration-700" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md z-10">
                <div className="p-4 space-y-2">
                    <div className="w-full h-2 bg-white/20 rounded-full" />
                    <div className="w-3/4 h-2 bg-white/10 rounded-full" />
                </div>
            </div>
        </div>
    </div>
);

const PluginShape = () => (
    <div className="absolute right-0 bottom-0 opacity-50 group-hover:opacity-90 transition-all duration-500 pointer-events-none">
        <div className="relative w-56 h-72 border-l border-t border-white/10 rounded-tl-[3rem] p-8">
            <div className="grid grid-cols-2 gap-3">
                <div className="w-12 h-12 rounded-xl border border-white/20 bg-white/5 animate-pulse" />
                <div className="w-12 h-12 rounded-xl border border-white/20 bg-white/10" />
                <div className="w-12 h-12 rounded-xl border border-white/20 bg-white/5" />
                <div className="w-12 h-12 rounded-xl border border-white/20 bg-white/5 animate-pulse delay-300" />
            </div>
        </div>
    </div>
);

const WooCommerceShape = () => (
    <div className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-90 transition-all duration-500 pointer-events-none scale-150">
        <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white/20 rounded-full animate-ping" />
                </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-xl bg-white/5 border border-white/10" />
        </div>
    </div>
);

const MaintenanceShape = () => (
    <div className="absolute inset-0 w-full h-full overflow-hidden opacity-30 group-hover:opacity-60 transition-opacity duration-1000 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="absolute inset-0"
            style={{
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
                maskImage: 'linear-gradient(to bottom, transparent, black, transparent)'
            }}
        />
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/40 rounded-full animate-bounce delay-75" />
        <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-white/30 rounded-full animate-ping delay-300" />
        <div className="absolute top-1/2 right-20 w-20 h-20 border-4 border-white/20 border-t-white/50 rounded-full animate-spin" />
    </div>
);

// --- DATA ---

const WORDPRESS_SERVICES = [
    {
        title: "Custom WordPress Development",
        description: "We build custom WordPress websites tailored to your business needs. From corporate sites to blogs and portfolios, our expert developers create fast, secure, and SEO-friendly WordPress solutions that help you rank higher on Google.",
        colSpan: "lg:col-span-4",
        shape: <WordPressShape />,
    },
    {
        title: "Premium Theme Development",
        description: "Get a unique, custom-designed WordPress theme that reflects your brand. We develop responsive, lightweight themes optimized for speed and search engines. Our themes are built with clean code, following WordPress best practices for easy maintenance and updates. Whether you need a business theme, blog theme, or e-commerce theme, we deliver pixel-perfect designs.",
        colSpan: "lg:col-span-8",
        shape: <ThemeShape />,
    },
    {
        title: "Plugin Development & Customization",
        description: "Extend your WordPress site with custom plugins. We develop powerful plugins for booking systems, membership sites, custom forms, integrations, and more. Our plugins are secure, optimized, and compatible with the latest WordPress versions.",
        colSpan: "lg:col-span-6",
        shape: <PluginShape />,
    },
    {
        title: "WooCommerce Online Stores",
        description: "Launch your online store with WooCommerce. We build custom e-commerce solutions with secure payment gateways, inventory management, and conversion-optimized checkout flows. From product pages to shipping integrations, we handle everything for your success.",
        colSpan: "lg:col-span-6",
        shape: <WooCommerceShape />,
    },
    {
        title: "WordPress Maintenance & Support",
        description: "Keep your WordPress site secure and up-to-date with our maintenance services. We handle updates, backups, security monitoring, performance optimization, and bug fixes. Our support team ensures your website runs smoothly 24/7, so you can focus on growing your business.",
        colSpan: "lg:col-span-12",
        shape: <MaintenanceShape />,
    },
];

export default function WordPressCards() {
    return (
        <SeoCards
            items={WORDPRESS_SERVICES}
            seoHeader="Professional WordPress Development Services"
            seoList={[
                "Custom WordPress Website Development",
                "WordPress Theme Design & Development",
                "WordPress Plugin Development",
                "WooCommerce E-commerce Solutions",
                "WordPress SEO Optimization",
                "WordPress Maintenance & Support",
                "Headless WordPress Development",
                "WordPress Migration Services",
                "WordPress Security Solutions",
                "WordPress Speed Optimization"
            ]}
            gradientBottom={false}
        />
    );
}
