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
};

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

async function loadMessages(locale: string | undefined) {
  const resolvedLocale = i18n.locales.includes(locale as any)
    ? (locale as (typeof i18n.locales)[number])
    : i18n.defaultLocale;

  try {
    return (await import(`../../../messages/${resolvedLocale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${resolvedLocale}`);
    return (await import("../../../messages/en.json")).default;
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale?: string };
}>) {
  const { locale } = params;
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
