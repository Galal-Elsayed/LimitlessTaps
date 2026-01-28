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
  const services = (await import(`../../messages/${locale}/services.json`)).default;
  const portfolio = (await import(`../../messages/${locale}/portfolio.json`)).default;
  const careers = (await import(`../../messages/${locale}/careers.json`)).default;
  const contact = (await import(`../../messages/${locale}/contact.json`)).default;
  const footer = (await import(`../../messages/${locale}/footer.json`)).default;
  const privacy = (await import(`../../messages/${locale}/privacy.json`)).default;
  const terms = (await import(`../../messages/${locale}/terms.json`)).default;
  const aboutUs = (await import(`../../messages/${locale}/about-us.json`)).default;
  const studio = (await import(`../../messages/${locale}/studio.json`)).default;
  const SoftwareSolutions = (await import(`../../messages/${locale}/SoftwareSolutions.json`)).default;
  const WebDesign = (await import(`../../messages/${locale}/Web-Design.json`)).default;
  const WordPress = (await import(`../../messages/${locale}/WordPress.json`)).default;

  return {
    locale,
    messages: {
      common,
      navigation,
      home,
      services,
      portfolio,
      careers,
      contact,
      footer,
      privacy,
      terms,
      aboutUs,
      studio,
      SoftwareSolutions,
      WebDesign,
      WordPress,
    },
  };
});

