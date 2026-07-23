import { notFound } from "next/navigation";
import Link from "next/link";
import { getCultureMeta, getAllCultures } from "@/lib/cultures";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const dynamicParams = false;

interface Props {
  params: Promise<{ locale: string; culture: string }>;
}

export async function generateStaticParams() {
  const cultures = getAllCultures();
  const locales = ["uk", "en"];
  return locales.flatMap((locale) =>
    cultures.map((c) => ({ locale, culture: c.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, culture: cultureSlug } = await params;
  const culture = getCultureMeta(cultureSlug);
  if (!culture) return {};
  const data = locale === "en" ? culture.en : culture.uk;
  return {
    title: `${data.name} — Повний довідник`,
    description: data.description,
  };
}

export default async function CulturePage({ params }: Props) {
  const { locale, culture: cultureSlug } = await params;
  const culture = getCultureMeta(cultureSlug);
  if (!culture) notFound();

  const data = locale === "en" ? culture.en : culture.uk;
  const prefix = `/${locale}`;

  return (
    <>
      <Header />
      <main>
        {/* PREMIUM Culture Hero */}
        <section
          style={{
            background: culture.image 
              ? `linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%), url(${culture.image}) center/cover no-repeat`
              : `linear-gradient(135deg, var(--color-primary-dark) 0%, ${culture.color} 100%)`,
            padding: "clamp(2.5rem, 6vw, 5rem) 0 clamp(2rem, 4vw, 4rem)",
            position: "relative",
            overflow: "hidden",
          }}
          aria-labelledby="culture-title"
        >
          {/* Subtle pattern overlay */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundImage: "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "30px 30px", opacity: 0.5, pointerEvents: "none" }}></div>

          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            {/* Breadcrumbs */}
            <nav className="breadcrumbs animate-fade-in-up" aria-label="Хлібні крихти" style={{ color: "rgba(255,255,255,0.6)", marginBottom: "2rem" }}>
              <Link href={`${prefix}/`} className="breadcrumb-link" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", transition: "color 0.2s" }}>Головна</Link>
              <span className="breadcrumbs-sep" style={{ margin: "0 0.75rem" }}>/</span>
              <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>{data.name}</span>
            </nav>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "2.5rem", flexWrap: "wrap" }}>
              <div className="animate-fade-in-up" style={{ 
                fontSize: "clamp(3rem, 12vw, 6rem)", 
                lineHeight: 1, 
                flexShrink: 0,
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
                padding: "clamp(0.75rem, 3vw, 1.5rem)",
                borderRadius: "24px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.2)"
              }}>
                {culture.emoji}
              </div>
              <div className="animate-fade-in-up delay-100">
                <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", fontStyle: "italic", marginBottom: "0.5rem", letterSpacing: "1px" }}>
                  {data.latinName}
                </div>
                <h1
                  id="culture-title"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "white", marginBottom: "1rem", textShadow: "0 4px 12px rgba(0,0,0,0.4)" }}
                >
                  {data.name}
                </h1>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.2rem", marginBottom: "1.5rem", maxWidth: "650px", lineHeight: 1.6 }}>
                  {data.tagline}
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <span className="glass-panel" style={{ padding: "0.5rem 1.25rem", borderRadius: "999px", color: "white", fontSize: "0.9rem", fontWeight: 500 }}>
                    📚 {culture.stats.sections} розділів
                  </span>
                  <span className="glass-panel" style={{ padding: "0.5rem 1.25rem", borderRadius: "999px", color: "white", fontSize: "0.9rem", fontWeight: 500 }}>
                    ⏱ ~{Math.round(culture.stats.readTimeMinutes / 60)} годин читання
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sections list - SYLLABUS STYLE */}
        <section className="section" aria-labelledby="sections-title" style={{ background: "var(--color-bg)", paddingBottom: "6rem" }}>
          <div className="container" style={{ maxWidth: "860px" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 className="section-title" id="sections-title" style={{ fontSize: "2.25rem" }}>Зміст довідника</h2>
              <p className="section-subtitle" style={{ fontSize: "1.1rem" }}>{data.description}</p>
            </div>

            <div className="syllabus-list">
              {culture.sections.map((section, index) => {
                const sData = locale === "en" ? section.en : section.uk;
                return (
                  <Link
                    key={section.slug}
                    href={`${prefix}/${cultureSlug}/${section.slug}`}
                    className="syllabus-card animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                    aria-label={`Розділ ${index + 1}: ${sData.title}`}
                  >
                    <div className="syllabus-number" style={{ background: `linear-gradient(135deg, ${culture.color}, ${culture.colorLight})` }}>
                      {index + 1}
                    </div>
                    <div className="syllabus-content">
                      <div className="syllabus-title">{sData.title}</div>
                      <div className="syllabus-desc">{sData.description}</div>
                    </div>
                    <div className="syllabus-arrow">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Quick start CTA */}
            <div className="animate-fade-in-up delay-300" style={{
              marginTop: "4rem",
              padding: "2rem",
              background: `linear-gradient(135deg, var(--color-surface), ${culture.colorLight}11)`,
              border: `1px solid ${culture.color}33`,
              borderRadius: "var(--radius-xl)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.5rem",
              flexWrap: "wrap",
              boxShadow: "var(--shadow-sm)"
            }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: "700", fontSize: "1.25rem", color: "var(--color-primary-dark)", marginBottom: "0.5rem" }}>
                  {culture.emoji} Починаємо навчання?
                </div>
                <div style={{ fontSize: "1rem", color: "var(--color-text-secondary)" }}>
                  Розділ 1: {culture.sections[0] ? (locale === "en" ? culture.sections[0].en : culture.sections[0].uk).title : ""}
                </div>
              </div>
              <Link
                href={`${prefix}/${cultureSlug}/${culture.sections[0]?.slug}`}
                className="btn btn-primary"
                style={{ padding: "0.75rem 2rem", fontSize: "1.1rem", background: culture.color, boxShadow: `0 4px 14px ${culture.color}66` }}
              >
                Почати читання →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
