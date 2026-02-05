import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.limitlesstaps.com";
  const locales = ["en", "ar"];
  const lastModified = new Date();

  // Define all routes
  const routes = [
    "",
    "/about-us",
    "/services",
    "/services/web-development",
    "/services/mobile-application",
    "/services/software-solution",
    "/services/web-design",
    "/services/wordpress",
    "/projects",
    "/careers",
    "/contact",
    "/studio",
    "/privacy",
    "/terms",
  ];

  // Generate sitemap entries for all locales
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      const url = `${baseUrl}/${locale}${route}`;

      // Determine priority based on route importance
      let priority = 0.8;
      if (route === "") priority = 1.0;
      else if (route === "/services" || route === "/projects") priority = 0.9;
      else if (route.startsWith("/services/")) priority = 0.85;
      else if (route === "/privacy" || route === "/terms") priority = 0.3;

      // Determine change frequency
      let changeFrequency:
        | "always"
        | "hourly"
        | "daily"
        | "weekly"
        | "monthly"
        | "yearly"
        | "never" = "weekly";
      if (route === "" || route === "/projects") changeFrequency = "daily";
      else if (route === "/privacy" || route === "/terms")
        changeFrequency = "yearly";

      sitemapEntries.push({
        url,
        lastModified,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            ar: `${baseUrl}/ar${route}`,
          },
        },
      });
    }
  }

  return sitemapEntries;
}
