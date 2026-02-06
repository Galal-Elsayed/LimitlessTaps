import type { Metadata } from "next";
import { Inter, Cairo, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import "./globals.css";
import { i18n } from "@/i18n.config";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { FloatingRobot } from "@/components/ui/floating-robot";
import { FloatingIcons } from "@/components/ui/floatingIcons";
import {
  OrganizationStructuredData,
  WebsiteStructuredData,
} from "@/components/seo/StructuredData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
  preload: true,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const common = await getTranslations({ locale, namespace: "common" });

  const brandName = common("brand_name");
  const metaTitleSuffix = common("meta_title_suffix");
  const metaDescription = common("meta_description");
  const metaTwitterDescription = common("meta_twitter_description");
  const metaOgAlt = common("meta_og_alt");
  const metaKeywords = common("meta_keywords");
  const isArabic = locale === "ar";

  // Parse keywords from translated string
  const keywordsArray = metaKeywords.split(",").map((keyword: string) => keyword.trim());

  return {
    metadataBase: new URL("https://www.limitlesstaps.com"),
    title: {
      default: `${brandName} | ${metaTitleSuffix}`,
      template: `%s | ${brandName}`,
    },
    description: metaDescription,
    keywords: keywordsArray,
    authors: [{ name: brandName, url: "https://www.limitlesstaps.com" }],
    creator: brandName,
    publisher: brandName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/Logo/OG.png",
      shortcut: "/Logo/OG.png",
      apple: "/Logo/OG.png",
    },
    openGraph: {
      type: "website",
      locale: isArabic ? "ar_SA" : "en_US",
      url: `https://www.limitlesstaps.com/${locale}`,
      siteName: brandName,
      title: `${brandName} | ${metaTitleSuffix}`,
      description: metaDescription,
      images: [
        {
          url: "https://www.limitlesstaps.com/Logo/OG.png",
          width: 1196,
          height: 665,
          alt: `${brandName} - ${metaOgAlt}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${brandName} | ${metaTitleSuffix}`,
      description: metaTwitterDescription,
      images: ["https://www.limitlesstaps.com/Logo/OG.png"],
      creator: "@limitlesstaps",
    },
    alternates: {
      canonical: `https://www.limitlesstaps.com/${locale}`,
      languages: {
        "en-US": "https://www.limitlesstaps.com/en",
        "ar-SA": "https://www.limitlesstaps.com/ar",
      },
    },
    verification: {
      google: "your-google-verification-code",
    },
    category: "technology",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

async function loadMessages(locale: string | undefined) {
  const resolvedLocale = i18n.locales.includes(
    locale as (typeof i18n.locales)[number],
  )
    ? (locale as (typeof i18n.locales)[number])
    : i18n.defaultLocale;

  try {
    // Load all message files and merge them
    const common = (
      await import(`../../../messages/${resolvedLocale}/common.json`)
    ).default;
    const navigation = (
      await import(`../../../messages/${resolvedLocale}/navigation.json`)
    ).default;
    const home = (await import(`../../../messages/${resolvedLocale}/home.json`))
      .default;
    const aboutUs = (
      await import(`../../../messages/${resolvedLocale}/about-us.json`)
    ).default;
    const services = (
      await import(`../../../messages/${resolvedLocale}/services.json`)
    ).default;
    const portfolio = (
      await import(`../../../messages/${resolvedLocale}/portfolio.json`)
    ).default;
    const careers = (
      await import(`../../../messages/${resolvedLocale}/careers.json`)
    ).default;
    const contact = (
      await import(`../../../messages/${resolvedLocale}/contact.json`)
    ).default;
    const footer = (
      await import(`../../../messages/${resolvedLocale}/footer.json`)
    ).default;
    const privacy = (
      await import(`../../../messages/${resolvedLocale}/privacy.json`)
    ).default;
    const terms = (
      await import(`../../../messages/${resolvedLocale}/terms.json`)
    ).default;
    const studio = (
      await import(`../../../messages/${resolvedLocale}/studio.json`)
    ).default;
    const webDevelopment = (
      await import(`../../../messages/${resolvedLocale}/Web-Development.json`)
    ).default;
    const mobileApplication = (
      await import(
        `../../../messages/${resolvedLocale}/mopile-application.json`
      )
    ).default;
    const SoftwareSolutions = (
      await import(`../../../messages/${resolvedLocale}/SoftwareSolutions.json`)
    ).default;
    const WebDesign = (
      await import(`../../../messages/${resolvedLocale}/Web-Design.json`)
    ).default;
    const WordPress = (
      await import(`../../../messages/${resolvedLocale}/WordPress.json`)
    ).default;
    const projects = (
      await import(`../../../messages/${resolvedLocale}/projects.json`)
    ).default;

    return {
      common,
      navigation,
      home,
      aboutUs,
      services,
      portfolio,
      careers,
      contact,
      footer,
      privacy,
      terms,
      studio,
      webDevelopment,
      mobileApplication,
      SoftwareSolutions,
      WebDesign,
      WordPress,
      projects,
    };
  } catch (error) {
    console.error(
      `Failed to load messages for locale: ${resolvedLocale}`,
      error,
    );
    // Fallback to English
    const common = (await import(`../../../messages/en/common.json`)).default;
    const navigation = (await import(`../../../messages/en/navigation.json`))
      .default;
    const home = (await import(`../../../messages/en/home.json`)).default;
    const aboutUs = (await import(`../../../messages/en/about-us.json`))
      .default;
    const services = (await import(`../../../messages/en/services.json`))
      .default;
    const portfolio = (await import(`../../../messages/en/portfolio.json`))
      .default;
    const careers = (await import(`../../../messages/en/careers.json`)).default;
    const contact = (await import(`../../../messages/en/contact.json`)).default;
    const footer = (await import(`../../../messages/en/footer.json`)).default;
    const privacy = (await import(`../../../messages/en/privacy.json`)).default;
    const terms = (await import(`../../../messages/en/terms.json`)).default;
    const studio = (await import(`../../../messages/en/studio.json`)).default;
    const webDevelopment = (
      await import(`../../../messages/en/Web-Development.json`)
    ).default;
    const mobileApplication = (
      await import(`../../../messages/en/mopile-application.json`)
    ).default;
    const SoftwareSolutions = (
      await import(`../../../messages/en/SoftwareSolutions.json`)
    ).default;
    const WebDesign = (await import(`../../../messages/en/Web-Design.json`))
      .default;
    const WordPress = (await import(`../../../messages/en/WordPress.json`))
      .default;
    const projects = (await import(`../../../messages/en/projects.json`))
      .default;

    return {
      common,
      navigation,
      home,
      aboutUs,
      services,
      portfolio,
      careers,
      contact,
      footer,
      privacy,
      terms,
      studio,
      webDevelopment,
      mobileApplication,
      SoftwareSolutions,
      WebDesign,
      WordPress,
      projects,
    };
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}>) {
  const { locale } = await params;
  const messages = await loadMessages(locale);
  const resolvedLocale = i18n.locales.includes(
    locale as (typeof i18n.locales)[number],
  )
    ? (locale as (typeof i18n.locales)[number])
    : i18n.defaultLocale;
  const isArabic = resolvedLocale === "ar";

  return (
    <html
      lang={resolvedLocale}
      dir={isArabic ? "rtl" : "ltr"}
      className={`${inter.variable} ${cairo.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages} locale={resolvedLocale}>
          {/* Structured Data for SEO */}
          <OrganizationStructuredData locale={resolvedLocale} />
          <WebsiteStructuredData locale={resolvedLocale} />

          <Toaster position="top-center" expand={false} richColors />
          <div className="pt-18">
            <Navbar />
          </div>
          {children}
          <Analytics />
          <Footer />
          <FloatingRobot />
          <FloatingIcons />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
