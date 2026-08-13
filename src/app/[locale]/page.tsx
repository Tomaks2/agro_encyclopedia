import { useTranslations } from "next-intl";
import Link from "next/link";
import { getAllCultures } from "@/lib/cultures";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSearch from "@/components/ui/HeroSearch";
import CulturesCatalog from "@/components/ui/CulturesCatalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "АгроЕнциклопедія — Повний довідник садівника України",
  description:
    "Практичні знання про вирощування плодових дерев, ягід та овочів. Від посадки до врожаю — все що потрібно знати садівнику.",
};

const COMING_SOON = [
  { emoji: "🍑", uk: "Персик", en: "Peach" },
  { emoji: "🍒", uk: "Черешня", en: "Cherry" },
  { emoji: "🫐", uk: "Слива", en: "Plum" },
  { emoji: "🍓", uk: "Полуниця", en: "Strawberry" },
  { emoji: "🍇", uk: "Виноград", en: "Grape" },
  { emoji: "🫐", uk: "Лохина", en: "Blueberry" },
  { emoji: "🍅", uk: "Томат", en: "Tomato" },
  { emoji: "🥒", uk: "Огірок", en: "Cucumber" },
];

const MONTHS_UK = [
  "Січень","Лютий","Березень","Квітень","Травень","Червень",
  "Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"
];

const SEASONAL_TIPS: Record<number, { title: string; items: string[]; emoji: string; badge: string }> = {
  0: { title: "Зима — планування та підготовка", emoji: "❄️", badge: "Зима",
    items: ["Заготівля живців для щеплення (лютий)", "Огляд саду після морозів", "Планування обрізки на березень"] },
  1: { title: "Лютий — перша обрізка", emoji: "✂️", badge: "Зима",
    items: ["Обрізка яблуні та груші до набрякання бруньок", "Побілка штамба", "Обробка по сплячій бруньці"] },
  2: { title: "Березень — пробудження саду", emoji: "🌱", badge: "Весна",
    items: ["Перша профілактична обробка (мідний купорос)", "Завершення обрізки", "Підживлення азотом по талому снігу"] },
  3: { title: "Квітень — цвітіння", emoji: "🌸", badge: "Весна",
    items: ["⚠️ НЕ обприскувати під час цвітіння!", "Встановлення феромонних пасток", "Відгинання гілок груші"] },
  4: { title: "Травень — після цвітіння", emoji: "🌿", badge: "Весна",
    items: ["Найважливіша обробка року: фунгіцид + інсектицид", "Нормування плодів (перше)", "Підживлення NPK"] },
  5: { title: "Червень — літній догляд", emoji: "☀️", badge: "Літо",
    items: ["Літня прищипка молодих пагонів", "Полив при посусі", "Моніторинг плодожерки за пастками"] },
  6: { title: "Липень — наливання плодів", emoji: "🌞", badge: "Літо",
    items: ["Підпірки для навантажених гілок", "Калійне підживлення", "Боротьба з плодожеркою (2-е покоління)"] },
  7: { title: "Серпень — збір літніх сортів", emoji: "🍎", badge: "Літо",
    items: ["Збір літніх яблук та груш", "⚠️ Не поливати в серпні — розтріскування плодів", "Осіннє підживлення (P+K)"] },
  8: { title: "Вересень — осінній сезон", emoji: "🍂", badge: "Осінь",
    items: ["Збір осінніх сортів", "Посадка нових дерев (жовтень–листопад)", "Санітарне прибирання листя"] },
  9: { title: "Жовтень — підготовка до зими", emoji: "🍁", badge: "Осінь",
    items: ["Збір зимових сортів", "Побілка штамба", "Захист від гризунів (сітка на штамб)"] },
  10: { title: "Листопад — посадка і підготовка", emoji: "🌧️", badge: "Осінь",
    items: ["Посадка нових дерев", "Мульчування кореневого кола", "Обробка 3% бордоської рідини після листопаду"] },
  11: { title: "Грудень — спокій", emoji: "❄️", badge: "Зима",
    items: ["Огляд саду, захист від снігу (струшування)", "Заготівля живців (кінець грудня)", "Планування нового сезону"] },
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let cultures = getAllCultures();
  
  // Sort to ensure Yablunia is always first, then Hrusha, then Persyk
  const order = ['yablunia', 'hrusha', 'persyk'];
  cultures.sort((a, b) => {
    const aIndex = order.indexOf(a.slug);
    const bIndex = order.indexOf(b.slug);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.slug.localeCompare(b.slug);
  });

  const currentMonth = new Date().getMonth();
  const seasonal = SEASONAL_TIPS[currentMonth];

  return (
    <>
      <Header />
      <main>
        {/* PREMIUM WOW HERO */}
        <section 
          aria-labelledby="hero-title"
          className="hero-section"
          style={{
            position: "relative",
            minHeight: "min(85vh, 700px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            padding: "5rem 0 4rem",
          }}
        >
          {/* Parallax Image Background */}
          <div 
            className="hero-bg-image"
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: "url('/images/hero_bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed", /* Parallax effect */
              zIndex: 0,
            }} 
          />
          {/* Deep dark gradient overlay for text readability */}
          <div 
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(10, 20, 15, 0.6) 0%, rgba(10, 20, 15, 0.9) 100%)",
              zIndex: 1,
            }}
          />
          <style dangerouslySetInnerHTML={{__html: `
            @media (max-width: 768px) {
              .hero-section-inner { padding: 2.5rem 1rem 2rem !important; }
              .hero-badge-wrap { margin-bottom: 1.25rem !important; }
              .hero-badge-text { font-size: 0.75rem !important; }
              .hero-main-title { font-size: clamp(2rem, 8vw, 3.5rem) !important; margin-bottom: 1rem !important; }
              .hero-main-sub { font-size: 1rem !important; margin-bottom: 2rem !important; }
              .hero-bg-image { background-attachment: scroll !important; } /* Fix for mobile fixed background issues */
            }
          `}} />

          <div className="container hero-section-inner" style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: "900px", padding: "0" }}>
            <div className="hero-badge animate-fade-in-up glass-panel hero-badge-wrap" style={{ display: "inline-flex", padding: "0.4rem 1rem", borderRadius: "99px", color: "var(--color-accent-light)", marginBottom: "2rem", backdropFilter: "blur(10px)" }}>
              <span style={{ marginRight: "0.5rem" }}>🌱</span>
              <span className="hero-badge-text" style={{ fontSize: "0.85rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>Аграрна Енциклопедія Садівника</span>
            </div>

            <h1 className="hero-title hero-main-title animate-fade-in-up delay-100" id="hero-title" style={{ color: "white", fontSize: "clamp(2.2rem, 6vw, 5rem)", lineHeight: 1.1, marginBottom: "1.5rem", textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
              Все про <span style={{ color: "var(--color-accent-light)", fontStyle: "italic" }}>ваш сад</span><br />в одному місці
            </h1>

            <p className="hero-subtitle hero-main-sub animate-fade-in-up delay-200" style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.15rem", maxWidth: "600px", margin: "0 auto 2.5rem", lineHeight: 1.6 }}>
              Глибокі практичні знання про плодові дерева, ягоди та город.
              Написано для українських умов — від Полісся до Степу.
            </p>

            {/* Glassmorphism Search */}
            <HeroSearch />

            {/* Animated Stats */}
            <style dangerouslySetInnerHTML={{__html: `
              .hero-stats-grid {
                display: flex;
                justify-content: center;
                gap: 2rem;
                flex-wrap: wrap;
                border-top: 1px solid rgba(255,255,255,0.1);
                padding-top: 2.5rem;
              }
              .hero-stat-item { text-align: center; min-width: 80px; }
              .hero-stat-num {
                font-size: 2.25rem;
                font-weight: 700;
                color: white;
                font-family: var(--font-serif);
                margin-bottom: 0.2rem;
                text-shadow: 0 4px 12px rgba(0,0,0,0.3);
                line-height: 1;
              }
              .hero-stat-label {
                font-size: 0.78rem;
                color: var(--color-accent-light);
                text-transform: uppercase;
                letter-spacing: 1px;
              }
              @media (max-width: 600px) {
                .hero-stats-grid {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 1.25rem 2rem;
                  padding-top: 1.75rem;
                  max-width: 280px;
                  margin: 0 auto;
                }
                .hero-stat-num { font-size: 2rem; }
              }
            `}} />
            <div className="hero-stats-grid animate-fade-in-up delay-300">
              {[
                { num: "37+", label: "культур у базі" },
                { num: "400+", label: "розділів знань" },
                { num: "2000+", label: "сторінок знань" },
                { num: "∞", label: "офлайн-доступ" },
              ].map((stat, i) => (
                <div key={i} className="hero-stat-item">
                  <div className="hero-stat-num">{stat.num}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEASONAL - Unchanged but styled */}
        <section className="section" style={{ paddingBottom: "0" }}>
          <div className="container">
            <div className="seasonal-card" data-season-emoji={seasonal.emoji} style={{ boxShadow: "var(--shadow-md)", border: "1px solid var(--color-border-light)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <span className={`badge badge-${currentMonth >= 2 && currentMonth <= 4 ? "spring" : currentMonth >= 5 && currentMonth <= 7 ? "summer" : currentMonth >= 8 && currentMonth <= 10 ? "autumn" : "winter"}`}>
                      {seasonal.badge}
                    </span>
                    <span style={{ color: "var(--color-muted)", fontSize: "0.875rem" }}>
                      {MONTHS_UK[currentMonth]} — що робити зараз
                    </span>
                  </div>
                  <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--color-primary-dark)", marginBottom: "1rem" }}>
                    {seasonal.emoji} {seasonal.title}
                  </h2>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {seasonal.items.map((item, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.95rem", color: "var(--color-text-secondary)" }}>
                        <span style={{ color: "var(--color-primary)", flexShrink: 0, marginTop: "2px" }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={`/${locale}/calendar`} className="btn btn-outline" style={{ flexShrink: 0 }}>
                  Повний календар →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIZED CATALOG */}
        <CulturesCatalog cultures={cultures} locale={locale} />

        {/* COMING SOON - TICKER MARQUEE (Space saving) */}
        <div className="ticker-wrap">
          <div className="ticker-content">
            {COMING_SOON.map((c) => (
              <div key={c.uk} className="ticker-item">
                <span>{c.emoji}</span>
                <span style={{ fontWeight: 600 }}>{locale === "en" ? c.en : c.uk}</span>
                <span style={{ fontSize: "0.85rem", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Незабаром</span>
              </div>
            ))}
            {/* Duplicate for infinite scroll loop */}
            {COMING_SOON.map((c) => (
              <div key={c.uk + "-dup"} className="ticker-item">
                <span>{c.emoji}</span>
                <span style={{ fontWeight: 600 }}>{locale === "en" ? c.en : c.uk}</span>
                <span style={{ fontSize: "0.85rem", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Незабаром</span>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES - GLOW CARDS */}
        <section className="section" style={{ background: "var(--color-primary-dark)", padding: "clamp(3rem, 7vw, 6rem) 0", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "radial-gradient(circle at top right, rgba(184, 147, 62, 0.1), transparent 60%)", zIndex: 0 }} />
          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <h2 className="section-title" style={{ color: "white", fontSize: "clamp(1.75rem, 6vw, 2.5rem)", marginBottom: "1rem" }}>
                Чому АгроЕнциклопедія?
              </h2>
              <p className="section-subtitle" style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto" }}>
                Це не просто сайт — це ваш особистий агроном у кишені. Сучасні технології на службі фермера.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "1.5rem" }}>
              {[
                { icon: "📱", title: "Працює офлайн", desc: "Встановіть як додаток (PWA) — читайте інструкції прямо в полі, навіть без зв'язку з інтернетом." },
                { icon: "🔬", title: "Розумна діагностика", desc: "Визначте хворобу або шкідника за симптомами крок за кроком завдяки інтерактивному алгоритму." },
                { icon: "📅", title: "Сезонний календар", desc: "Що робити саме зараз? Календар динамічно адаптується під поточний місяць і регіон." },
                { icon: "🇺🇦", title: "Створено для України", desc: "Жодних перекладів з іноземних сайтів. Регіональні поради спеціально для Полісся, Степу та Карпат." },
                { icon: "🔍", title: "Миттєвий пошук", desc: "Потужний повнотекстовий пошук по всьому контенту працює локально на вашому пристрої." },
                { icon: "📚", title: "Глибока експертиза", desc: "Понад 500 сторінок перевіреної інформації від практиків-агрономів з багаторічним стажем." },
              ].map((f, idx) => (
                <div key={idx} className="feature-glow-card animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div style={{ width: "60px", height: "60px", borderRadius: "16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem", marginBottom: "1.5rem" }}>
                    {f.icon}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: "600", color: "white", marginBottom: "0.75rem", fontSize: "1.35rem" }}>{f.title}</h3>
                  <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", lineHeight: "1.6" }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
