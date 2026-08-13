"use client";

import { useState } from "react";
import Link from "next/link";
import type { CultureMeta } from "@/lib/cultures";

// ─── Маппінг slug → категорія ────────────────────────────────────────────────

const SLUG_TO_CATEGORY: Record<string, string> = {
  // Плодові дерева
  yablunia: "fruit", hrusha: "fruit", persyk: "fruit",
  chereshnia: "fruit", slyva: "fruit", abrykos: "fruit", khurma: "fruit",
  // Виноград
  vynograd: "grape",
  // Ягідні
  polunytsia: "berry", malytsia: "berry", lokhyna: "berry",
  ozhyna: "berry", smorodyna: "berry", ahrus: "berry",
  // Овочеві та баштанові
  tomat: "vegetable", perets: "vegetable", baklazhan: "vegetable",
  ohirok: "vegetable", kavun: "vegetable", dynia: "vegetable",
  kabachok: "vegetable", harbuz: "vegetable", kartoplia: "vegetable",
  "kukurudza-tsukrova": "vegetable", fyzalis: "vegetable", batat: "vegetable",
  // Коренеплоди та цибулеві
  morkva: "root", buriak: "root", redys: "root",
  daikon: "root", tsybulia: "root", chasnyk: "root",
  // Капустяні та зеленні
  kapusta: "brassica", selera: "brassica",
  // Бобові та делікатесні
  horokh: "legume", kvasolia: "legume", asparahus: "legume",
  // Бджільництво
  bdzhilnytstvo: "apiary",
};

// ─── Категорії ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: "all",
    label: "Всі культури",
    emoji: "🌿",
    color: "#2d5c47",
    gradient: "linear-gradient(135deg, #2d5c47, #1a3a2b)",
    description: "Повний каталог",
  },
  {
    id: "fruit",
    label: "Плодові дерева",
    emoji: "🍎",
    color: "#b91c1c",
    gradient: "linear-gradient(135deg, #b91c1c, #7f1d1d)",
    description: "Яблуня, Груша, Персик, Черешня, Слива, Абрикос, Хурма",
    imageSrc: "/images/categories/fruit.png"
  },
  {
    id: "grape",
    label: "Виноград",
    emoji: "🍇",
    color: "#6b21a8",
    gradient: "linear-gradient(135deg, #6b21a8, #3b0764)",
    description: "Столові та технічні сорти, виноробство",
    imageSrc: "/images/categories/grape.png"
  },
  {
    id: "berry",
    label: "Ягідні культури",
    emoji: "🍓",
    color: "#be185d",
    gradient: "linear-gradient(135deg, #be185d, #831843)",
    description: "Полуниця, Малина, Лохина, Ожина, Смородина, Аґрус",
    imageSrc: "/images/categories/berry.png"
  },
  {
    id: "vegetable",
    label: "Овочеві та Баштанові",
    emoji: "🍅",
    color: "#c2410c",
    gradient: "linear-gradient(135deg, #c2410c, #7c2d12)",
    description: "Томат, Перець, Огірок, Кавун, Картопля та ін.",
    imageSrc: "/images/categories/vegetable.png"
  },
  {
    id: "root",
    label: "Коренеплоди та Цибулеві",
    emoji: "🥕",
    color: "#b45309",
    gradient: "linear-gradient(135deg, #b45309, #78350f)",
    description: "Морква, Буряк, Редис, Дайкон, Цибуля, Часник",
    imageSrc: "/images/categories/root.png"
  },
  {
    id: "brassica",
    label: "Капустяні",
    emoji: "🥬",
    color: "#15803d",
    gradient: "linear-gradient(135deg, #15803d, #14532d)",
    description: "Капуста білокачанна, Селера",
    imageSrc: "/images/categories/brassica.png"
  },
  {
    id: "legume",
    label: "Бобові та Делікатесні",
    emoji: "🫘",
    color: "#0f766e",
    gradient: "linear-gradient(135deg, #0f766e, #134e4a)",
    description: "Горох, Квасоля, Спаржа",
    imageSrc: "/images/categories/legume.png"
  },
  {
    id: "apiary",
    label: "Бджільництво",
    emoji: "🐝",
    color: "#b45309",
    gradient: "linear-gradient(135deg, #d97706, #92400e)",
    description: "Пасіка, Апітерапія, Продукти бджільництва",
    imageSrc: "/images/categories/apiary.png"
  },
];

// ─── Компонент ────────────────────────────────────────────────────────────────

interface Props {
  cultures: CultureMeta[];
  locale: string;
}

export default function CulturesCatalog({ cultures, locale }: Props) {
  const [active, setActive] = useState("all");

  const getCategory = (slug: string) => SLUG_TO_CATEGORY[slug] ?? "vegetable";

  const filtered =
    active === "all"
      ? cultures
      : cultures.filter((c) => getCategory(c.slug) === active);

  const countFor = (id: string) =>
    id === "all"
      ? cultures.length
      : cultures.filter((c) => getCategory(c.slug) === id).length;

  const activeCategory = CATEGORIES.find((c) => c.id === active)!;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Секція ── */
        .cat-section { padding: 5rem 0 6rem; }

        /* ── Заголовок ── */
        .cat-header { margin-bottom: 2.5rem; }
        .cat-title {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 4vw, 2.4rem);
          color: var(--color-primary-dark);
          margin: 0 0 0.4rem;
        }
        .cat-subtitle {
          font-size: 1rem;
          color: var(--color-muted);
          margin: 0;
        }

        /* ── Таби (New Grid) ── */
        .cat-tabs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1.25rem;
          margin-bottom: 3rem;
        }
        .cat-tab-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: #000;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          aspect-ratio: 4 / 3;
        }
        .cat-tab-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
          border-color: var(--color-primary);
        }
        .cat-tab-card--active {
          border-color: var(--color-primary);
          box-shadow: 0 0 20px var(--color-primary);
          transform: translateY(-5px);
        }
        .cat-tab-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.5s ease, filter 0.3s ease;
          filter: brightness(0.7) contrast(1.1);
        }
        .cat-tab-card:hover .cat-tab-bg, .cat-tab-card--active .cat-tab-bg {
          transform: scale(1.05);
          filter: brightness(0.9);
        }
        .cat-tab-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.25rem;
          z-index: 1;
        }
        .cat-tab-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 0.25rem;
        }
        .cat-tab-label {
          color: white;
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
          margin: 0;
        }
        .cat-tab-badge {
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(4px);
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: 99px;
        }
        .cat-tab-desc {
          color: rgba(255,255,255,0.85);
          font-size: 0.85rem;
          line-height: 1.3;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        /* All cultures button styling */
        .cat-tab-all {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--color-bg-secondary);
          border: 2px dashed var(--color-border);
          aspect-ratio: 4 / 3;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--color-text);
        }
        .cat-tab-all:hover, .cat-tab-all--active {
          border-color: var(--color-primary);
          color: var(--color-primary-dark);
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .cat-tab-all-icon {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        .cat-tab-all-label {
          font-family: var(--font-serif);
          font-weight: 700;
          font-size: 1.15rem;
        }

        /* ── Category Banner ── */
        .cat-banner {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border-radius: 14px;
          margin-bottom: 2rem;
          border: 1px solid rgba(0,0,0,0.06);
        }
        .cat-banner-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          flex-shrink: 0;
        }
        .cat-banner-name {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0 0 0.15rem;
        }
        .cat-banner-desc {
          font-size: 0.82rem;
          color: var(--color-muted);
          margin: 0;
        }

        /* ── Сітка ── */
        .cultures-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(260px, 100%), 1fr));
          gap: 1.25rem;
        }
        @media (min-width: 768px) {
          .cultures-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1100px) {
          .cultures-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* ── Картка ── */
        .cg-card {
          display: block;
          text-decoration: none;
          border-radius: 14px;
          overflow: hidden;
          background: white;
          border: 1px solid var(--color-border, #e5e5e0);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          animation: cg-fadein 0.3s ease both;
        }
        @keyframes cg-fadein {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cg-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 36px rgba(0,0,0,0.12);
          text-decoration: none;
        }
        .cg-img {
          height: 190px;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        .cg-img::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%);
        }
        .cg-img-emoji {
          position: absolute;
          top: 10px; right: 10px;
          width: 36px; height: 36px;
          border-radius: 8px;
          background: rgba(255,255,255,0.88);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.15rem;
          backdrop-filter: blur(6px);
          z-index: 2;
        }
        .cg-img-name {
          position: absolute;
          bottom: 10px; left: 12px; right: 12px;
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
          text-shadow: 0 2px 6px rgba(0,0,0,0.5);
          z-index: 2;
          line-height: 1.2;
        }
        .cg-noimg {
          height: 190px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding: 1rem;
          position: relative;
        }
        .cg-noimg-bg-emoji {
          position: absolute;
          font-size: 4rem;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -65%);
          opacity: 0.12;
          user-select: none;
        }
        .cg-noimg-name {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-primary-dark);
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .cg-body { padding: 0.9rem 1.1rem 1.1rem; }
        .cg-latin {
          font-size: 0.75rem;
          color: var(--color-muted);
          font-style: italic;
          margin-bottom: 0.3rem;
        }
        .cg-tagline {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          line-height: 1.4;
          margin-bottom: 0.7rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .cg-meta {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .cg-badge {
          font-size: 0.7rem;
          padding: 0.2rem 0.55rem;
          border-radius: 99px;
          background: var(--color-bg-secondary, #f5f5f2);
          color: var(--color-muted);
          font-weight: 500;
          border: 1px solid var(--color-border, #e5e5e0);
        }
        .cg-bar { height: 3px; }
        .cg-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 4rem 2rem;
          color: var(--color-muted);
        }
        .cg-empty-icon { font-size: 3rem; margin-bottom: 0.75rem; }
      `}} />

      <section className="cat-section">
        <div className="container">

          <div className="cat-header">
            <h2 className="cat-title">Каталог культур</h2>
            <p className="cat-subtitle">
              {cultures.length} академічних довідників — оберіть категорію
            </p>
          </div>

          {/* ── Таби (Картки) ── */}
          <div className="cat-tabs-grid" role="tablist" aria-label="Категорії культур">
            {CATEGORIES.map((cat) => {
              const count = countFor(cat.id);
              if (count === 0 && cat.id !== "all") return null;
              const isActive = active === cat.id;
              
              if (cat.id === "all") {
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={isActive}
                    className={`cat-tab-all ${isActive ? "cat-tab-all--active" : ""}`}
                    onClick={() => setActive(cat.id)}
                  >
                    <span className="cat-tab-all-icon">{cat.emoji}</span>
                    <span className="cat-tab-all-label">{cat.label}</span>
                    <span style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.25rem" }}>
                      Всі {cultures.length} культур
                    </span>
                  </button>
                );
              }

              return (
                <div
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`cat-tab-card ${isActive ? "cat-tab-card--active" : ""}`}
                  onClick={() => setActive(cat.id)}
                >
                  <div 
                    className="cat-tab-bg" 
                    style={{ backgroundImage: `url(${cat.imageSrc})` }} 
                  />
                  <div className="cat-tab-overlay">
                    <div className="cat-tab-header">
                      <h3 className="cat-tab-label">{cat.label}</h3>
                      <span className="cat-tab-badge">{count}</span>
                    </div>
                    <p className="cat-tab-desc">{cat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Банер категорії ── */}
          {active !== "all" && (
            <div
              className="cat-banner"
              style={{ background: `${activeCategory.color}0d` }}
            >
              <div
                className="cat-banner-icon"
                style={{
                  background: `${activeCategory.color}18`,
                  border: `2px solid ${activeCategory.color}30`,
                }}
              >
                {activeCategory.emoji}
              </div>
              <div>
                <p className="cat-banner-name" style={{ color: activeCategory.color }}>
                  {activeCategory.label}
                </p>
                <p className="cat-banner-desc">{activeCategory.description}</p>
              </div>
            </div>
          )}

          {/* ── Сітка ── */}
          <div id="cultures-grid" role="tabpanel" className="cultures-grid">
            {filtered.length === 0 ? (
              <div className="cg-empty">
                <div className="cg-empty-icon">🌱</div>
                <p>Культури цієї категорії скоро з&apos;являться</p>
              </div>
            ) : (
              filtered.map((culture, idx) => {
                const data = locale === "en" ? culture.en : culture.uk;
                return (
                  <Link
                    key={culture.slug}
                    href={`/${locale}/${culture.slug}`}
                    className="cg-card"
                    style={{ animationDelay: `${Math.min(idx % 12, 11) * 35}ms` }}
                    aria-label={`Довідник: ${data.name}`}
                  >
                    {culture.image ? (
                      <div
                        className="cg-img"
                        style={{ backgroundImage: `url(${culture.image})` }}
                        role="img"
                        aria-label={data.name}
                      >
                        <div className="cg-img-emoji" aria-hidden="true">
                          {culture.emoji}
                        </div>
                        <div className="cg-img-name">{data.name}</div>
                      </div>
                    ) : (
                      <div
                        className="cg-noimg"
                        style={{ background: `linear-gradient(135deg, ${culture.colorLight}, white)` }}
                      >
                        <div className="cg-noimg-bg-emoji" aria-hidden="true">
                          {culture.emoji}
                        </div>
                        <div className="cg-noimg-name">{data.name}</div>
                      </div>
                    )}

                    <div className="cg-body">
                      <div className="cg-latin">{data.latinName}</div>
                      <div className="cg-tagline">{data.tagline}</div>
                      <div className="cg-meta">
                        <span className="cg-badge">📚 {culture.stats.sections} розд.</span>
                        <span className="cg-badge">
                          ⏱ ~{Math.round(culture.stats.readTimeMinutes / 60)}год
                        </span>
                      </div>
                    </div>

                    <div
                      className="cg-bar"
                      style={{ background: culture.color }}
                      aria-hidden="true"
                    />
                  </Link>
                );
              })
            )}
          </div>

        </div>
      </section>
    </>
  );
}
