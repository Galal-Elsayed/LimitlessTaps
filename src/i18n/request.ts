import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Load all message files and merge them
  const common = (await import(`../../messages/${locale}/common.json`)).default;
  const navigation = (await import(`../../messages/${locale}/navigation.json`)).default;
  const home = (await import(`../../messages/${locale}/home.json`)).default;
  const company = (await import(`../../messages/${locale}/company.json`)).default;
  const services = (await import(`../../messages/${locale}/services.json`)).default;
  const portfolio = (await import(`../../messages/${locale}/portfolio.json`)).default;
  const careers = (await import(`../../messages/${locale}/careers.json`)).default;
  const contact = (await import(`../../messages/${locale}/contact.json`)).default;
  const footer = (await import(`../../messages/${locale}/footer.json`)).default;

  return {
    locale,
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
