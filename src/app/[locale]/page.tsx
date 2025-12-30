'use client';

import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar/Navbar";

export default function HomePage() {
  const t = useTranslations();

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      {/* Navbar */}
      <Navbar logo="LIMITLESS TAPS" />

      {/* Main Content */}
      <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <header style={{ marginBottom: '2rem', color: 'white' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{t("title")}</h1>
          <p style={{ fontSize: '1.2rem', color: '#aaa' }}>{t("welcome")}</p>
        </header>

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
          <h3 style={{ color: 'white', marginBottom: '1rem' }}>{t("home.features_title")}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>{t("home.feature_1")}</div>
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>{t("home.feature_2")}</div>
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>{t("home.feature_3")}</div>
          </div>
        </section>

        {/* Common Actions */}
        <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', background: 'rgba(255,255,255,0.02)' }}>
          <strong style={{ color: 'white' }}>Common Actions:</strong>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <button style={{ padding: '0.5rem 1rem', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>{t("common.submit")}</button>
            <button style={{ padding: '0.5rem 1rem', background: '#2196f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>{t("common.save")}</button>
            <button style={{ padding: '0.5rem 1rem', background: '#ff9800', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>{t("common.edit")}</button>
            <button style={{ padding: '0.5rem 1rem', background: '#e60000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>{t("common.delete")}</button>
            <button style={{ padding: '0.5rem 1rem', background: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>{t("common.cancel")}</button>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', color: '#888' }}>
          <p>{t("footer.copyright")}</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <span style={{ cursor: 'pointer' }}>{t("footer.privacy")}</span>
            <span style={{ cursor: 'pointer' }}>{t("footer.terms")}</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
