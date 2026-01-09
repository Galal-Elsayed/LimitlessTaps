import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { i18n } from "@/i18n.config";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from 'sonner';
import { Preloader } from "@/components/ui/Preloader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
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
  const resolvedLocale = i18n.locales.includes(locale as (typeof i18n.locales)[number])
    ? (locale as (typeof i18n.locales)[number])
    : i18n.defaultLocale;

  try {
    // Load all message files and merge them
    const common = (await import(`../../../messages/${resolvedLocale}/common.json`)).default;
    const navigation = (await import(`../../../messages/${resolvedLocale}/navigation.json`)).default;
    const home = (await import(`../../../messages/${resolvedLocale}/home.json`)).default;
    const aboutUs = (await import(`../../../messages/${resolvedLocale}/about-us.json`)).default;
    const services = (await import(`../../../messages/${resolvedLocale}/services.json`)).default;
    const portfolio = (await import(`../../../messages/${resolvedLocale}/portfolio.json`)).default;
    const careers = (await import(`../../../messages/${resolvedLocale}/careers.json`)).default;
    const contact = (await import(`../../../messages/${resolvedLocale}/contact.json`)).default;
    const footer = (await import(`../../../messages/${resolvedLocale}/footer.json`)).default;
    const privacy = (await import(`../../../messages/${resolvedLocale}/privacy.json`)).default;
    const terms = (await import(`../../../messages/${resolvedLocale}/terms.json`)).default;

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
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${resolvedLocale}`, error);
    // Fallback to English
    const common = (await import(`../../../messages/en/common.json`)).default;
    const navigation = (await import(`../../../messages/en/navigation.json`)).default;
    const home = (await import(`../../../messages/en/home.json`)).default;
    const aboutUs = (await import(`../../../messages/en/about-us.json`)).default;
    const services = (await import(`../../../messages/en/services.json`)).default;
    const portfolio = (await import(`../../../messages/en/portfolio.json`)).default;
    const careers = (await import(`../../../messages/en/careers.json`)).default;
    const contact = (await import(`../../../messages/en/contact.json`)).default;
    const footer = (await import(`../../../messages/en/footer.json`)).default;
    const privacy = (await import(`../../../messages/en/privacy.json`)).default;
    const terms = (await import(`../../../messages/en/terms.json`)).default;

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
  const resolvedLocale = i18n.locales.includes(locale as (typeof i18n.locales)[number])
    ? (locale as (typeof i18n.locales)[number])
    : i18n.defaultLocale;
  const isArabic = resolvedLocale === "ar";

  return (
    <html
      lang={resolvedLocale}
      dir={isArabic ? "rtl" : "ltr"}
      className={`${inter.variable} ${cairo.variable}`}
    >
      <body className="antialiased font-sans" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages} locale={resolvedLocale}>
          <Preloader />
          <Toaster position="top-center" expand={false} richColors />
          <div className="pt-18">
            <Navbar />
          </div>
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
