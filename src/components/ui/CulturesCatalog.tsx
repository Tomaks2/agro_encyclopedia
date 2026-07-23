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
  },
  {
    id: "grape",
    label: "Виноград",
    emoji: "🍇",
    color: "#6b21a8",
    gradient: "linear-gradient(135deg, #6b21a8, #3b0764)",
    description: "Столові та технічні сорти, виноробство",
  },
  {
    id: "berry",
    label: "Ягідні культури",
    emoji: "🍓",
    color: "#be185d",
    gradient: "linear-gradient(135deg, #be185d, #831843)",
    description: "Полуниця, Малина, Лохина, Ожина, Смородина, Аґрус",
  },
  {
    id: "vegetable",
    label: "Овочеві та Баштанові",
    emoji: "🍅",
    color: "#c2410c",
    gradient: "linear-gradient(135deg, #c2410c, #7c2d12)",
    description: "Томат, Перець, Огірок, Кавун, Картопля та ін.",
  },
  {
    id: "root",
    label: "Коренеплоди та Цибулеві",
    emoji: "🥕",
    color: "#b45309",
    gradient: "linear-gradient(135deg, #b45309, #78350f)",
    description: "Морква, Буряк, Редис, Дайкон, Цибуля, Часник",
  },
  {
    id: "brassica",
    label: "Капустяні",
    emoji: "🥬",
    color: "#15803d",
    gradient: "linear-gradient(135deg, #15803d, #14532d)",
    description: "Капуста білокачанна, Селера",
  },
  {
    id: "legume",
    label: "Бобові та Делікатесні",
    emoji: "🫘",
    color: "#0f766e",
    gradient: "linear-gradient(135deg, #0f766e, #134e4a)",
    description: "Горох, Квасоля, Спаржа",
  },
  {
    id: "apiary",
    label: "Бджільництво",
    emoji: "🐝",
    color: "#b45309",
    gradient: "linear-gradient(135deg, #d97706, #92400e)",
    description: "Пасіка, Апітерапія, Продукти бджільництва",
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

        /* ── Таби ── */
        .cat-tabs-scroll {
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 2px;
          margin-bottom: 2.5rem;
        }
        .cat-tabs-scroll::-webkit-scrollbar { display: none; }
        .cat-tabs {
          display: flex;
          gap: 0.5rem;
          min-width: max-content;
        }
        .cat-tab {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.55rem 1.1rem;
          border-radius: 99px;
          border: 1.5px solid var(--color-border, #ddd);
          background: transparent;
          color: var(--color-text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          font-family: inherit;
          line-height: 1;
        }
        .cat-tab:hover:not(.cat-tab--active) {
          border-color: var(--color-primary);
          color: var(--color-primary-dark);
          transform: translateY(-1px);
          box-shadow: 0 3px 10px rgba(0,0,0,0.08);
        }
        .cat-tab--active {
          color: white !important;
          border-color: transparent !important;
          box-shadow: 0 4px 16px rgba(0,0,0,0.22);
          transform: translateY(-1px);
        }
        .cat-tab-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 20px;
          height: 20px;
          padding: 0 4px;
          border-radius: 99px;
          font-size: 0.7rem;
          font-weight: 700;
          line-height: 1;
        }
        .cat-tab:not(.cat-tab--active) .cat-tab-badge {
          background: rgba(0,0,0,0.07);
          color: var(--color-muted);
        }
        .cat-tab--active .cat-tab-badge {
          background: rgba(255,255,255,0.25);
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

          {/* ── Таби ── */}
          <div className="cat-tabs-scroll">
            <div className="cat-tabs" role="tablist" aria-label="Категорії культур">
              {CATEGORIES.map((cat) => {
                const count = countFor(cat.id);
                if (count === 0 && cat.id !== "all") return null;
                const isActive = active === cat.id;
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={isActive}
                    className={`cat-tab${isActive ? " cat-tab--active" : ""}`}
                    style={isActive ? { background: cat.gradient } : undefined}
                    onClick={() => setActive(cat.id)}
                  >
                    <span aria-hidden="true">{cat.emoji}</span>
                    <span>{cat.label}</span>
                    <span className="cat-tab-badge">{count}</span>
                  </button>
                );
              })}
            </div>
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
