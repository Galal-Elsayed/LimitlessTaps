import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['en', 'ar'],

    // Used when no locale matches
    defaultLocale: 'en',

    // The `pathnames` object holds the mapping between internal pathnames
    // (defined in the file system) and external pathnames (what users see in the URL)
    // Since we're using simple routes, we don't need custom pathnames
    localePrefix: 'always' // Always show locale in URL: /en, /ar
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
