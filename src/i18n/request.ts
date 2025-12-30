import { getRequestConfig } from "next-intl/server";
import { i18n } from "@/i18n.config";

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = i18n.locales.includes(locale as any)
    ? (locale as (typeof i18n.locales)[number])
    : i18n.defaultLocale;

  return {
    locale: resolvedLocale,
    messages: (await import(`../../messages/${resolvedLocale}.json`)).default,
  };
});
