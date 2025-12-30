'use client';

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function HomePage() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (locale: string) => {
    // Navigate to the locale root
    router.push(`/${locale}`);
  };

  const currentLocale = pathname.startsWith('/ar') ? 'ar' : 'en';

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      {/* Language Switcher */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => switchLanguage('en')}
          style={{
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            background: currentLocale === 'en' ? '#007bff' : '#f0f0f0',
            color: currentLocale === 'en' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          English
        </button>
        <button
          onClick={() => switchLanguage('ar')}
          style={{
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            background: currentLocale === 'ar' ? '#007bff' : '#f0f0f0',
            color: currentLocale === 'ar' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          العربية
        </button>
      </div>

      {/* Header */}
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{t("title")}</h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>{t("welcome")}</p>
      </header>

      {/* Navigation */}
      <nav style={{ marginBottom: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <strong>Navigation:</strong>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
          <li>{t("navigation.home")}</li>
          <li>{t("navigation.about")}</li>
          <li>{t("navigation.products")}</li>
          <li>{t("navigation.contact")}</li>
        </ul>
      </nav>

      {/* Home Content */}
      <section style={{ marginBottom: '2rem', padding: '2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{t("home.hero_title")}</h2>
        <p style={{ marginBottom: '1rem' }}>{t("home.hero_subtitle")}</p>
        <button style={{ padding: '0.75rem 1.5rem', background: 'white', color: '#667eea', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          {t("home.cta_button")}
        </button>
      </section>

      {/* Features */}
      <section style={{ marginBottom: '2rem' }}>
        <h3>{t("home.features_title")}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '8px' }}>{t("home.feature_1")}</div>
          <div style={{ padding: '1rem', background: '#f3e5f5', borderRadius: '8px' }}>{t("home.feature_2")}</div>
          <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '8px' }}>{t("home.feature_3")}</div>
        </div>
      </section>

      {/* Common Actions */}
      <section style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <strong>Common Actions:</strong>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
          <button style={{ padding: '0.5rem 1rem', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px' }}>{t("common.submit")}</button>
          <button style={{ padding: '0.5rem 1rem', background: '#2196f3', color: 'white', border: 'none', borderRadius: '4px' }}>{t("common.save")}</button>
          <button style={{ padding: '0.5rem 1rem', background: '#ff9800', color: 'white', border: 'none', borderRadius: '4px' }}>{t("common.edit")}</button>
          <button style={{ padding: '0.5rem 1rem', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}>{t("common.delete")}</button>
          <button style={{ padding: '0.5rem 1rem', background: '#9e9e9e', color: 'white', border: 'none', borderRadius: '4px' }}>{t("common.cancel")}</button>
        </div>
        <p style={{ marginTop: '0.5rem', color: '#666' }}>{t("common.loading")}</p>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #eee', paddingTop: '1rem', color: '#666' }}>
        <p>{t("footer.copyright")}</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span>{t("footer.privacy")}</span>
          <span>{t("footer.terms")}</span>
        </div>
      </footer>
    </div>
  );
}
