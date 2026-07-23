import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сезонний календар садівника",
  description: "Календар робіт у саду по місяцях. Що і коли робити для отримання гарного врожаю.",
};

const MONTHS_UK = [
  "Січень","Лютий","Березень","Квітень","Травень","Червень",
  "Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"
];

const SEASONAL_TIPS = [
  { title: "Зима — планування та підготовка", emoji: "❄️", badge: "Зима",
    items: ["Заготівля живців для щеплення (лютий)", "Огляд саду після морозів", "Планування обрізки на березень"] },
  { title: "Лютий — перша обрізка", emoji: "✂️", badge: "Зима",
    items: ["Обрізка яблуні та груші до набрякання бруньок", "Побілка штамба", "Обробка по сплячій бруньці"] },
  { title: "Березень — пробудження саду", emoji: "🌱", badge: "Весна",
    items: ["Перша профілактична обробка (мідний купорос)", "Завершення обрізки", "Підживлення азотом по талому снігу"] },
  { title: "Квітень — цвітіння", emoji: "🌸", badge: "Весна",
    items: ["⚠️ НЕ обприскувати під час цвітіння!", "Встановлення феромонних пасток", "Відгинання гілок груші"] },
  { title: "Травень — після цвітіння", emoji: "🌿", badge: "Весна",
    items: ["Найважливіша обробка року: фунгіцид + інсектицид", "Нормування плодів (перше)", "Підживлення NPK"] },
  { title: "Червень — літній догляд", emoji: "☀️", badge: "Літо",
    items: ["Літня прищипка молодих пагонів", "Полив при посусі", "Моніторинг плодожерки за пастками"] },
  { title: "Липень — наливання плодів", emoji: "🌞", badge: "Літо",
    items: ["Підпірки для навантажених гілок", "Калійне підживлення", "Боротьба з плодожеркою (2-е покоління)"] },
  { title: "Серпень — збір літніх сортів", emoji: "🍎", badge: "Літо",
    items: ["Збір літніх яблук та груш", "⚠️ Не поливати в серпні — розтріскування плодів", "Осіннє підживлення (P+K)"] },
  { title: "Вересень — осінній сезон", emoji: "🍂", badge: "Осінь",
    items: ["Збір осінніх сортів", "Посадка нових дерев (жовтень–листопад)", "Санітарне прибирання листя"] },
  { title: "Жовтень — підготовка до зими", emoji: "🍁", badge: "Осінь",
    items: ["Збір зимових сортів", "Побілка штамба", "Захист від гризунів (сітка на штамб)"] },
  { title: "Листопад — посадка і підготовка", emoji: "🌧️", badge: "Осінь",
    items: ["Посадка нових дерев", "Мульчування кореневого кола", "Обробка 3% бордоської рідини після листопаду"] },
  { title: "Грудень — спокій", emoji: "❄️", badge: "Зима",
    items: ["Огляд саду, захист від снігу (струшування)", "Заготівля живців (кінець грудня)", "Планування нового сезону"] },
];

export default function CalendarPage() {
  const currentMonth = new Date().getMonth();

  return (
    <>
      <Header />
      <main className="container" style={{ padding: "4rem 1.5rem", maxWidth: "800px" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "var(--color-primary-dark)", marginBottom: "1rem" }}>
            📅 Сезонний календар
          </h1>
          <p style={{ color: "var(--color-muted)", fontSize: "1.1rem" }}>
            Щомісячний план робіт у саду для отримання максимального врожаю.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {SEASONAL_TIPS.map((tip, index) => {
            const isCurrent = index === currentMonth;
            const badgeClass = 
              index >= 2 && index <= 4 ? "spring" : 
              index >= 5 && index <= 7 ? "summer" : 
              index >= 8 && index <= 10 ? "autumn" : "winter";

            return (
              <div 
                key={index} 
                className="seasonal-card" 
                style={{ 
                  border: isCurrent ? "2px solid var(--color-primary)" : undefined,
                  boxShadow: isCurrent ? "var(--shadow-md)" : "var(--shadow-sm)"
                }}
                id={`month-${index}`}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                      <span className={`badge badge-${badgeClass}`}>
                        {tip.badge}
                      </span>
                      <span style={{ color: "var(--color-muted)", fontSize: "0.875rem", fontWeight: "600", textTransform: "uppercase" }}>
                        {MONTHS_UK[index]}
                      </span>
                      {isCurrent && (
                        <span style={{ background: "var(--color-primary)", color: "white", padding: "0.15rem 0.5rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: "600" }}>
                          ПОТОЧНИЙ МІСЯЦЬ
                        </span>
                      )}
                    </div>
                    <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--color-primary-dark)" }}>
                      {tip.emoji} {tip.title}
                    </h2>
                  </div>
                </div>
                
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {tip.items.map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "1.05rem", color: "var(--color-text)" }}>
                      <span style={{ color: "var(--color-primary)", flexShrink: 0, marginTop: "2px" }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
