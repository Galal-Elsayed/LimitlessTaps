"use client";

import Script from "next/script";

interface OrganizationStructuredDataProps {
  locale?: string;
}

export function OrganizationStructuredData({ locale = "en" }: OrganizationStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Limitless Taps",
    alternateName: "LimitlessTaps",
    url: "https://limitlesstaps.com",
    logo: "https://limitlesstaps.com/Logo/black.png",
    description:
      locale === "ar"
        ? "حلول ويب وموبايل وبرمجيات عالية الأداء مصممة للتوسع بلا حدود"
        : "High-performance web, mobile, and software solutions engineered to scale without limits",
    foundingDate: "2020",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abu Dhabi",
      addressCountry: "AE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "info@limitlesstaps.com",
      availableLanguage: ["English", "Arabic"],
    },
    sameAs: [
      "https://twitter.com/limitlesstaps",
      "https://linkedin.com/company/limitlesstaps",
      "https://instagram.com/limitlesstaps",
    ],
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 24.4539,
        longitude: 54.3773,
      },
      geoRadius: "5000",
    },
    knowsAbout: [
      "Web Development",
      "Mobile App Development",
      "Software Solutions",
      "UI/UX Design",
      "React",
      "Next.js",
      "Flutter",
      "iOS Development",
      "Android Development",
    ],
  };

  return (
    <Script
      id="organization-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface WebsiteStructuredDataProps {
  locale?: string;
}

export function WebsiteStructuredData({ locale = "en" }: WebsiteStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Limitless Taps",
    url: `https://limitlesstaps.com/${locale}`,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `https://limitlesstaps.com/${locale}/projects?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: locale === "ar" ? "ar-SA" : "en-US",
  };

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface ServiceStructuredDataProps {
  serviceName: string;
  serviceDescription: string;
  serviceUrl: string;
}

export function ServiceStructuredData({
  serviceName,
  serviceDescription,
  serviceUrl,
}: ServiceStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: serviceDescription,
    url: serviceUrl,
    provider: {
      "@type": "Organization",
      name: "Limitless Taps",
      url: "https://limitlesstaps.com",
    },
    areaServed: {
      "@type": "Country",
      name: "United Arab Emirates",
    },
    serviceType: "Software Development",
  };

  return (
    <Script
      id={`service-structured-data-${serviceName.toLowerCase().replace(/\s/g, "-")}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface BreadcrumbStructuredDataProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface FAQStructuredDataProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQStructuredData({ faqs }: FAQStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
