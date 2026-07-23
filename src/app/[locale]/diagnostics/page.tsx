"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const CULTURES = [
  { id: "yablunia", emoji: "🍎", name: "Яблуня" },
  { id: "hrusha", emoji: "🍐", name: "Груша" },
  { id: "persyk", emoji: "🍑", name: "Персик" },
  { id: "chereshnia", emoji: "🍒", name: "Черешня" },
  { id: "slyva", emoji: "🫐", name: "Слива" },
  { id: "abrykos", emoji: "🍋", name: "Абрикос" },
  { id: "khurma", emoji: "🟠", name: "Хурма" },
  { id: "vynograd", emoji: "🍇", name: "Виноград" },
  { id: "polunytsia", emoji: "🍓", name: "Полуниця" },
  { id: "malytsia", emoji: "🍇", name: "Малина" },
  { id: "lokhyna", emoji: "🫐", name: "Лохина" },
  { id: "ozhyna", emoji: "🖤", name: "Ожина" },
  { id: "smorodyna", emoji: "🫐", name: "Смородина та Порічки" },
  { id: "ahrus", emoji: "🍒", name: "Агрус" },
  { id: "tomat", emoji: "🍅", name: "Томат (Помідор)" },
  { id: "kukurudza-tsukrova", emoji: "🌽", name: "Кукурудза цукрова" },
  { id: "perets", emoji: "🫑", name: "Перець солодкий та гіркий" },
  { id: "baklazhan", emoji: "🍆", name: "Баклажан" },
  { id: "ohirok", emoji: "🥒", name: "Огірок" },
  { id: "kavun", emoji: "🍉", name: "Кавун" },
  { id: "dynia", emoji: "🍈", name: "Диня" },
  { id: "kabachok", emoji: "🥒", name: "Кабачок та Патисон" },
  { id: "harbuz", emoji: "🎃", name: "Гарбуз" },
  { id: "kartoplia", emoji: "🥔", name: "Картопля" },
  { id: "morkva", emoji: "🥕", name: "Морква столова" },
  { id: "buriak", emoji: "🍠", name: "Буряк столовий" },
  { id: "tsybulia", emoji: "🧅", name: "Цибуля ріпчаста" },
  { id: "chasnyk", emoji: "🧄", name: "Часник" },
  { id: "kapusta", emoji: "🥬", name: "Капуста білокачанна" },
  { id: "horokh", emoji: "🫛", name: "Горох овочевий" },
  { id: "kvasolia", emoji: "🫘", name: "Квасоля спаржева" },
  { id: "redys", emoji: "🔴", name: "Редис" },
  { id: "daikon", emoji: "🤍", name: "Редька та Дайкон" },
  { id: "asparahus", emoji: "🎋", name: "Спаржа (Аспарагус)" },
  { id: "batat", emoji: "🍠", name: "Батат (Солодка картопля)" },
  { id: "selera", emoji: "🌿", name: "Селера" },
  { id: "fyzalis", emoji: "🥭", name: "Фізаліс" },
];

const PARTS = [
  { id: "leaves", emoji: "🍃", name: "Листя" },
  { id: "fruit", emoji: "🍏", name: "Плоди" },
  { id: "bark", emoji: "🪵", name: "Кора / Стовбур" },
  { id: "flowers", emoji: "🌸", name: "Квіти" },
];

const SYMPTOMS: Record<string, Record<string, any[]>> = {
  yablunia: {
    leaves: [
      { id: "scab", name: "Оливково-бурі плями", disease: "Парша", section: "07-khvoroby" },
      { id: "mildew", name: "Білий борошнистий наліт", disease: "Борошниста роса", section: "07-khvoroby" },
      { id: "aphids", name: "Скручування листя, липкий наліт", disease: "Попелиця", section: "08-shkidnyky" },
    ],
    fruit: [
      { id: "moth", name: "Червиві плоди", disease: "Яблунева плодожерка", section: "08-shkidnyky" },
      { id: "rot", name: "Коричневі кола гнилі з білими точками", disease: "Плодова гниль (Моніліоз)", section: "07-khvoroby" },
    ],
    bark: [
      { id: "canker", name: "Чорні вдавлені плями на корі", disease: "Чорний рак", section: "07-khvoroby" },
    ],
    flowers: [
      { id: "beetle", name: "Квіти не розпускаються, сохнуть", disease: "Квіткоїд", section: "08-shkidnyky" },
    ]
  },
  hrusha: {
    leaves: [
      { id: "rust", name: "Яскраві руді (помаранчеві) плями", disease: "Іржа груші", section: "09-khvoroby" },
      { id: "psylla", name: "Листя чорніє, липне", disease: "Грушева медяниця", section: "10-shkidnyky" },
      { id: "mite", name: "Здуття на листі (галли)", disease: "Галовий кліщ", section: "10-shkidnyky" },
    ],
    fruit: [
      { id: "scab", name: "Чорні плями, плоди тріскаються", disease: "Парша груші", section: "09-khvoroby" },
      { id: "rot", name: "Гниття плодів на дереві", disease: "Моніліоз", section: "09-khvoroby" },
    ],
    bark: [
      { id: "bacterial", name: "Чорніє кора і кінці пагонів", disease: "Бактеріальний опік", section: "09-khvoroby" },
    ],
    flowers: [
      { id: "bacterial", name: "Квіти раптово чорніють", disease: "Бактеріальний опік", section: "09-khvoroby" },
    ]
  }
};

export default function DiagnosticsPage() {
  const locale = useLocale();
  const [step, setStep] = useState(1);
  const [culture, setCulture] = useState<string | null>(null);
  const [part, setPart] = useState<string | null>(null);
  const [symptom, setSymptom] = useState<any | null>(null);

  const reset = () => {
    setStep(1);
    setCulture(null);
    setPart(null);
    setSymptom(null);
  };

  const currentSymptoms = culture && part ? SYMPTOMS[culture]?.[part] || [] : [];

  return (
    <>
      <Header />
      <main className="container" style={{ padding: "4rem 1.5rem", maxWidth: "800px", minHeight: "80vh" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "var(--color-primary-dark)", marginBottom: "1rem" }}>
            🔬 Діагностика саду
          </h1>
          <p style={{ color: "var(--color-muted)", fontSize: "1.1rem" }}>
            Визначте хворобу або шкідника за симптомами за 3 прості кроки.
          </p>
        </div>

        {/* Progress */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "3rem" }}>
          {[1, 2, 3].map((s) => (
            <div key={s} style={{ 
              width: "40px", height: "40px", 
              borderRadius: "50%", 
              display: "flex", alignItems: "center", justifyContent: "center",
              background: step >= s ? "var(--color-primary)" : "var(--color-border)",
              color: step >= s ? "white" : "var(--color-muted)",
              fontWeight: "bold",
              transition: "all 0.3s"
            }}>
              {s}
            </div>
          ))}
        </div>

        <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", padding: "2.5rem", boxShadow: "var(--shadow-md)" }}>
          
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", textAlign: "center" }}>Крок 1. Оберіть культуру</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {CULTURES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setCulture(c.id); setStep(2); }}
                    style={{
                      padding: "1.5rem", border: "2px solid var(--color-border)",
                      borderRadius: "var(--radius-lg)", background: "transparent",
                      fontSize: "1.25rem", fontWeight: "600", cursor: "pointer",
                      display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
                      transition: "all 0.2s"
                    }}
                    className="hover-bg-alt"
                  >
                    <span style={{ fontSize: "2.5rem" }}>{c.emoji}</span>
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: "var(--color-muted)", cursor: "pointer" }}>← Назад</button>
                <h2 style={{ fontSize: "1.5rem", margin: 0 }}>Крок 2. Де проблема?</h2>
                <div style={{ width: "60px" }}></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {PARTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { setPart(p.id); setStep(3); }}
                    style={{
                      padding: "1.25rem", border: "2px solid var(--color-border)",
                      borderRadius: "var(--radius-lg)", background: "transparent",
                      fontSize: "1.1rem", fontWeight: "600", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: "1rem",
                      transition: "all 0.2s"
                    }}
                    className="hover-bg-alt"
                  >
                    <span style={{ fontSize: "2rem" }}>{p.emoji}</span>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                <button onClick={() => setStep(2)} style={{ background: "none", border: "none", color: "var(--color-muted)", cursor: "pointer" }}>← Назад</button>
                <h2 style={{ fontSize: "1.5rem", margin: 0 }}>Крок 3. Оберіть симптом</h2>
                <div style={{ width: "60px" }}></div>
              </div>
              
              {currentSymptoms.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {currentSymptoms.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => { setSymptom(s); setStep(4); }}
                      style={{
                        padding: "1.25rem", border: "2px solid var(--color-border)",
                        borderRadius: "var(--radius-lg)", background: "transparent",
                        fontSize: "1.1rem", textAlign: "left", cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                      className="hover-bg-alt"
                    >
                      <div style={{ fontWeight: "600", color: "var(--color-primary-dark)", marginBottom: "0.25rem" }}>{s.name}</div>
                      <div style={{ fontSize: "0.875rem", color: "var(--color-muted)" }}>Схоже на: {s.disease}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--color-muted)" }}>
                  Для цієї частини рослини симптоми ще не описані в системі.
                </div>
              )}
            </div>
          )}

          {step === 4 && symptom && culture && (
            <div className="animate-fade-in" style={{ textAlign: "center", padding: "1rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚨</div>
              <h2 style={{ fontSize: "1.75rem", color: "var(--color-primary-dark)", marginBottom: "0.5rem" }}>
                Діагноз: {symptom.disease}
              </h2>
              <p style={{ color: "var(--color-muted)", fontSize: "1.1rem", marginBottom: "2rem" }}>
                За вашим описом ({symptom.name}), найімовірніше це {symptom.disease}.
              </p>
              
              <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                <Link 
                  href={`/${locale}/${culture}/${symptom.section}`}
                  className="btn btn-primary"
                >
                  Читати про лікування →
                </Link>
                <button onClick={reset} className="btn btn-outline">
                  Почати знову
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
