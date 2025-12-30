'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

interface NavbarProps {
    logo?: string;
}

export default function Navbar({ logo = 'LIMITLESS' }: NavbarProps) {
    const t = useTranslations('navigation');
    const pathname = usePathname();
    const router = useRouter();

    const currentLocale = pathname.startsWith('/ar') ? 'ar' : 'en';
    const isRTL = currentLocale === 'ar';

    const navLinks = [
        { key: 'home', href: `/${currentLocale}` },
        { key: 'about', href: `/${currentLocale}/about` },
        { key: 'products', href: `/${currentLocale}/products` },
        { key: 'contact', href: `/${currentLocale}/contact` },
    ];

    const switchLanguage = (locale: string) => {
        let pathWithoutLocale = pathname.replace(/^\/(en|ar)/, '') || '';
        // Handle /home path - redirect to root since /home page was removed
        if (pathWithoutLocale === '/home' || pathWithoutLocale === '') {
            pathWithoutLocale = '';
        }
        router.push(`/${locale}${pathWithoutLocale}`);
    };

    const isActive = (href: string) => {
        return pathname === href || (href.endsWith(`/${currentLocale}`) && pathname === `/${currentLocale}`);
    };

    return (
        <>
            <style jsx>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          background-color: #000000;
          padding: 0 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
        }

        .navbar-logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          cursor: pointer;
          letter-spacing: 2px;
          transition: opacity 0.25s ease-in-out;
        }

        .navbar-logo:hover {
          opacity: 0.8;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 3rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          position: relative;
          cursor: pointer;
          padding: 0.5rem 0;
        }

        .nav-link {
          color: #ffffff;
          font-size: 1rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: text-shadow 0.25s ease-in-out;
        }

        /* Center-expanding underline effect */
        .nav-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 100%;
          height: 3px;
          background-color: #f5f5f5;
          border-radius: 5px;
          transform: translateX(-50%) scaleX(0);
          transform-origin: center;
          transition: transform 0.25s ease-in-out 0.1s;
        }

        .nav-item:hover::after,
        .nav-item.active::after {
          transform: translateX(-50%) scaleX(1);
        }

        .nav-item:hover .nav-link,
        .nav-item.active .nav-link {
          text-shadow: 0 0 1px rgba(255, 255, 255, 0.8);
        }

        .language-switcher {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .lang-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          transition: color 0.25s ease-in-out;
          text-transform: uppercase;
        }

        .lang-btn:hover {
          color: #ffffff;
        }

        .lang-btn.active {
          color: #e60000;
        }

        .lang-divider {
          color: rgba(255, 255, 255, 0.3);
          font-weight: 300;
        }

        .navbar.rtl {
          direction: rtl;
        }

        .navbar.rtl .navbar-links {
          flex-direction: row-reverse;
        }

        @media (max-width: 768px) {
          .navbar-links {
            gap: 1.5rem;
          }
          .nav-link {
            font-size: 0.875rem;
          }
          .navbar-logo {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .navbar-links {
            gap: 1rem;
          }
          .nav-link {
            font-size: 0.75rem;
            letter-spacing: 0.5px;
          }
          .navbar-logo {
            font-size: 1rem;
          }
        }
      `}</style>

            <nav className={`navbar ${isRTL ? 'rtl' : 'ltr'}`}>
                <div className="navbar-container">
                    <div className="navbar-logo" onClick={() => router.push(`/${currentLocale}`)}>
                        {logo}
                    </div>

                    <ul className="navbar-links">
                        {navLinks.map((link) => (
                            <li
                                key={link.key}
                                className={`nav-item ${isActive(link.href) ? 'active' : ''}`}
                                onClick={() => router.push(link.href)}
                            >
                                <span className="nav-link">{t(link.key)}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="language-switcher">
                        <button
                            className={`lang-btn ${currentLocale === 'en' ? 'active' : ''}`}
                            onClick={() => switchLanguage('en')}
                        >
                            EN
                        </button>
                        <span className="lang-divider">|</span>
                        <button
                            className={`lang-btn ${currentLocale === 'ar' ? 'active' : ''}`}
                            onClick={() => switchLanguage('ar')}
                        >
                            AR
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}
