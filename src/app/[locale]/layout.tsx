import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { i18n } from "@/i18n.config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Limitless Taps",
  description: "Your ultimate beverage solution",
  icons: {
    icon: "/Logo/black.png",
    shortcut: "/Logo/black.png",
    apple: "/Logo/black.png",
  },
  openGraph: {
    images: ["/Logo/black.png"],
  },
};

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

async function loadMessages(locale: string | undefined) {
  const resolvedLocale = i18n.locales.includes(locale as any)
    ? (locale as (typeof i18n.locales)[number])
    : i18n.defaultLocale;

  try {
    // Load all message files and merge them
    const common = (await import(`../../../messages/${resolvedLocale}/common.json`)).default;
    const navigation = (await import(`../../../messages/${resolvedLocale}/navigation.json`)).default;
    const home = (await import(`../../../messages/${resolvedLocale}/home.json`)).default;
    const company = (await import(`../../../messages/${resolvedLocale}/company.json`)).default;
    const services = (await import(`../../../messages/${resolvedLocale}/services.json`)).default;
    const portfolio = (await import(`../../../messages/${resolvedLocale}/portfolio.json`)).default;
    const careers = (await import(`../../../messages/${resolvedLocale}/careers.json`)).default;
    const contact = (await import(`../../../messages/${resolvedLocale}/contact.json`)).default;
    const footer = (await import(`../../../messages/${resolvedLocale}/footer.json`)).default;

    return {
      common,
      navigation,
      home,
      company,
      services,
      portfolio,
      careers,
      contact,
      footer,
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${resolvedLocale}`, error);
    // Fallback to English
    const common = (await import(`../../../messages/en/common.json`)).default;
    const navigation = (await import(`../../../messages/en/navigation.json`)).default;
    const home = (await import(`../../../messages/en/home.json`)).default;
    const company = (await import(`../../../messages/en/company.json`)).default;
    const services = (await import(`../../../messages/en/services.json`)).default;
    const portfolio = (await import(`../../../messages/en/portfolio.json`)).default;
    const careers = (await import(`../../../messages/en/careers.json`)).default;
    const contact = (await import(`../../../messages/en/contact.json`)).default;
    const footer = (await import(`../../../messages/en/footer.json`)).default;

    return {
      common,
      navigation,
      home,
      company,
      services,
      portfolio,
      careers,
      contact,
      footer,
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
  const resolvedLocale = i18n.locales.includes(locale as any)
    ? (locale as (typeof i18n.locales)[number])
    : i18n.defaultLocale;
  const isArabic = resolvedLocale === "ar";

  return (
    <html lang={resolvedLocale} dir={isArabic ? "rtl" : "ltr"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages} locale={resolvedLocale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
