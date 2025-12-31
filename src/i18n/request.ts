import { getRequestConfig } from "next-intl/server";
import { i18n } from "@/i18n.config";

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = i18n.locales.includes(locale as any)
    ? (locale as (typeof i18n.locales)[number])
    : i18n.defaultLocale;

  // Load all message files and merge them
  const common = (await import(`../../messages/${resolvedLocale}/common.json`)).default;
  const navigation = (await import(`../../messages/${resolvedLocale}/navigation.json`)).default;
  const home = (await import(`../../messages/${resolvedLocale}/home.json`)).default;
  const company = (await import(`../../messages/${resolvedLocale}/company.json`)).default;
  const services = (await import(`../../messages/${resolvedLocale}/services.json`)).default;
  const portfolio = (await import(`../../messages/${resolvedLocale}/portfolio.json`)).default;
  const careers = (await import(`../../messages/${resolvedLocale}/careers.json`)).default;
  const contact = (await import(`../../messages/${resolvedLocale}/contact.json`)).default;
  const footer = (await import(`../../messages/${resolvedLocale}/footer.json`)).default;

  return {
    locale: resolvedLocale,
    messages: {
      common,
      navigation,
      home,
      company,
      services,
      portfolio,
      careers,
      contact,
      footer,
    },
  };
});
