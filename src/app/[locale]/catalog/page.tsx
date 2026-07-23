import { getAllCultures } from "@/lib/cultures";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Каталог культур — АгроЕнциклопедія",
  description: "Повний перелік довідників з вирощування плодових дерев, ягід та овочів.",
};

export default async function CatalogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // Get and sort cultures (yablunia first)
  const cultures = getAllCultures();
  const order = ['yablunia', 'hrusha', 'persyk'];
  cultures.sort((a, b) => {
    const aIndex = order.indexOf(a.slug);
    const bIndex = order.indexOf(b.slug);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.slug.localeCompare(b.slug);
  });

  return (
    <>
      <Header />
      <style dangerouslySetInnerHTML={{__html: `
        .catalog-header {
          padding: 2.5rem 0 0.5rem;
          text-align: center;
        }

        .catalog-header h1 {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--color-primary-dark);
          margin-bottom: 0.5rem;
        }

        .catalog-header p {
          font-size: 1.1rem;
          font-style: italic;
          color: var(--color-text-secondary);
          max-width: 650px;
          margin: 0 auto;
        }
        
        .catalog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr));
          gap: 2rem 2rem;
          padding: 3rem 0 6rem;
        }
        
        .catalog-card-wrapper {
          perspective: 1000px;
        }
        
        .catalog-card {
          display: block;
          position: relative;
          height: clamp(300px, 55vw, 420px);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
          transform-style: preserve-3d;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          text-decoration: none !important;
        }
        
        .catalog-card:hover {
          transform: translateY(-10px) rotateX(5deg);
          box-shadow: 0 30px 60px rgba(0,0,0,0.2);
        }
        
        .catalog-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
          z-index: 1;
          transition: opacity 0.3s ease;
        }
        
        .catalog-card:hover::after {
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 60%, transparent 100%);
        }
        
        .catalog-card-bg {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background-size: cover;
          background-position: center;
          transition: transform 0.7s ease;
          z-index: 0;
        }
        
        .catalog-card:hover .catalog-card-bg {
          transform: scale(1.08);
        }
        
        .catalog-card-content {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 2rem;
          z-index: 2;
          color: white;
          transform: translateY(10px);
          transition: transform 0.3s ease;
        }
        
        .catalog-card:hover .catalog-card-content {
          transform: translateY(0);
        }
      `}} />
      <main>
        <section className="catalog-header">
          <div className="container">
            <h1 className="animate-fade-in-up">Енциклопедія Культур</h1>
            <p className="animate-fade-in-up delay-100">
              Повні практичні довідники з вирощування. Оберіть культуру, щоб зануритись у світ глибоких знань, від посадки до збору врожаю.
            </p>
          </div>
        </section>
        
        <section className="section" style={{ background: "var(--color-bg-alt)", paddingTop: "2rem" }}>
          <div className="container">
            <div className="catalog-grid">
              {cultures.map(culture => {
                const data = locale === "en" ? culture.en : culture.uk;
                return (
                  <div key={culture.slug} className="catalog-card-wrapper animate-fade-in-up">
                    <Link href={`/${locale}/${culture.slug}`} className="catalog-card">
                      <div 
                        className="catalog-card-bg" 
                        style={{ 
                          backgroundImage: culture.image ? `url(${culture.image})` : `linear-gradient(135deg, ${culture.color}, ${culture.colorLight})`
                        }} 
                      />
                      <div className="catalog-card-content">
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                          <span style={{ fontSize: "2.5rem", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.4))" }}>{culture.emoji}</span>
                          <div>
                            <h2 style={{ fontSize: "2rem", fontFamily: "var(--font-serif)", margin: 0, lineHeight: 1.1, textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                              {data.name}
                            </h2>
                            <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}>{data.latinName}</div>
                          </div>
                        </div>
                        <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.9)", margin: "1rem 0", lineHeight: 1.5 }}>
                          {data.tagline}
                        </p>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <span style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)", padding: "0.3rem 0.8rem", borderRadius: "99px", fontSize: "0.8rem", fontWeight: 500 }}>
                            📚 {culture.stats.sections} розділів
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
