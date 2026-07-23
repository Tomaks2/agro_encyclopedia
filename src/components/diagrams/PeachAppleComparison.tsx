"use client";

import React from "react";

export default function PeachAppleComparison() {
  const comparisonData = [
    {
      param: "Вимогливість до тепла",
      peach: "Дуже висока",
      apple: "Середня",
      peachStars: 5,
      appleStars: 3,
    },
    {
      param: "Вимогливість до дренажу",
      peach: "Максимальна",
      apple: "Середня",
      peachStars: 5,
      appleStars: 3,
    },
    {
      param: "Чутливість до відлиг",
      peach: "Критична",
      apple: "Низька",
      peachStars: 5,
      appleStars: 2,
    },
    {
      param: "Швидкість росту",
      peach: "Дуже швидкий",
      apple: "Середній",
      peachStars: 5,
      appleStars: 3,
    },
    {
      param: "Тривалість життя (продуктивного)",
      peach: "12–18 років",
      apple: "40–80+ років",
      peachStars: 0,
      appleStars: 0,
      isTextOnly: true,
    },
    {
      param: "Потреба в обрізці",
      peach: "Щорічна, інтенсивна",
      apple: "Регулярна",
      peachStars: 5,
      appleStars: 3,
    },
    {
      param: "Самозапильність",
      peach: "Більшість сортів",
      apple: "Потрібні запилювачі",
      peachIcon: "✓",
      appleIcon: "✗",
    },
  ];

  const renderStars = (count: number) => {
    return (
      <span className="stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < count ? "star-filled" : "star-empty"}>
            ★
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="comparison-wrapper">
      <div className="comparison-header">
        <h3 className="comparison-title">Ключові відмінності: Персик vs Яблуня</h3>
        <p className="comparison-subtitle">Чому стандартний підхід тут не працює</p>
      </div>

      <div className="comparison-card">
        <div className="comparison-grid comparison-grid-header">
          <div className="col-param">ПАРАМЕТР</div>
          <div className="col-culture peach-col">ПЕРСИК</div>
          <div className="col-culture apple-col">ЯБЛУНЯ</div>
        </div>

        <div className="comparison-body">
          {comparisonData.map((row, idx) => (
            <div className="comparison-grid comparison-row" key={idx}>
              <div className="col-param row-param">{row.param}</div>
              
              <div className="col-culture peach-cell">
                {row.peachIcon && <span className="icon-badge peach-icon">{row.peachIcon}</span>}
                {!row.peachIcon && !row.isTextOnly && renderStars(row.peachStars || 0)}
                <span className="cell-text">{row.peach}</span>
              </div>
              
              <div className="col-culture apple-cell">
                {row.appleIcon && <span className="icon-badge apple-icon">{row.appleIcon}</span>}
                {!row.appleIcon && !row.isTextOnly && renderStars(row.appleStars || 0)}
                <span className="cell-text">{row.apple}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .comparison-wrapper {
          margin: 4rem auto;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: var(--font-body);
        }

        .comparison-header, .comparison-card {
          width: 100%;
          max-width: 800px;
        }
        
        .comparison-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .comparison-title {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          color: var(--color-primary-dark);
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        
        .comparison-subtitle {
          font-size: 0.9rem;
          color: var(--color-muted);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 600;
        }

        .comparison-card {
          background: var(--color-surface);
          border-radius: var(--radius-xl);
          box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08);
          border: 1px solid var(--color-border-light);
          overflow: hidden;
        }

        .comparison-grid {
          display: grid;
          grid-template-columns: 35% 32.5% 32.5%;
        }

        .comparison-grid-header {
          background: var(--color-bg-alt);
          border-bottom: 1px solid var(--color-border);
          padding: 1.25rem 1.5rem;
        }

        .col-param {
          font-weight: 700;
          font-size: 0.75rem;
          color: var(--color-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
        }

        .col-culture {
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .peach-col {
          color: var(--color-accent-dark);
        }

        .apple-col {
          color: var(--color-primary);
        }

        .comparison-row {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--color-border-subtle);
          transition: background 0.2s ease;
        }

        .comparison-row:last-child {
          border-bottom: none;
        }

        .comparison-row:hover {
          background: var(--color-surface-2);
        }

        .row-param {
          font-size: 0.95rem;
          color: var(--color-text);
          font-weight: 600;
          text-transform: none;
          letter-spacing: normal;
        }

        .peach-cell, .apple-cell {
          flex-direction: column;
          gap: 0.4rem;
          text-align: center;
          text-transform: none;
          letter-spacing: normal;
        }

        .stars {
          font-size: 0.9rem;
          letter-spacing: 2px;
        }

        .peach-cell .star-filled { color: var(--color-accent); }
        .apple-cell .star-filled { color: var(--color-primary-light); }
        .star-empty { color: var(--color-border); }

        .cell-text {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          font-weight: 500;
        }

        .icon-badge {
          font-size: 1.1rem;
          font-weight: bold;
        }
        
        .peach-icon { color: var(--color-success); }
        .apple-icon { color: var(--color-danger); }

        @media (max-width: 640px) {
          .comparison-grid {
            grid-template-columns: 1fr;
          }
          
          .comparison-grid-header {
            display: none;
          }
          
          .comparison-row {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1.5rem;
          }
          
          .row-param {
            font-size: 1.1rem;
            text-align: center;
            border-bottom: 1px dashed var(--color-border);
            padding-bottom: 0.75rem;
            justify-content: center;
          }
          
          .col-culture {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }

          .peach-cell::before { content: "Персик"; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent-dark); }
          .apple-cell::before { content: "Яблуня"; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; color: var(--color-primary); }
          
          .peach-cell, .apple-cell {
            text-align: right;
            align-items: flex-end;
          }
        }
      `}} />
    </div>
  );
}
