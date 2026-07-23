"use client";

import React from "react";

export default function AnnualCycleDiagram() {
  const seasons = [
    {
      name: "ЗИМА",
      months: "Грудень – Лютий",
      icon: "❄️",
      color: "var(--color-info)",
      bgColor: "rgba(26, 77, 107, 0.05)",
      stages: [
        { label: "Стан", text: "Глибокий спокій. Накопичення «годин холоду»." },
        { label: "Ризик", text: "Різкі відлиги + повернення морозів." },
        { label: "Дія", text: "Нічого не робимо (або вкриваємо молоді саджанці)." }
      ]
    },
    {
      name: "РАННЯ ВЕСНА",
      months: "Березень – поч. квітня",
      icon: "🌸",
      color: "#c25975",
      bgColor: "rgba(194, 89, 117, 0.05)",
      stages: [
        { label: "Стан", text: "Набухання бруньок → Цвітіння (до розпускання листя!)" },
        { label: "Ризик", text: "Зворотні заморозки (найнебезпечніший період!)", isDanger: true },
        { label: "Дія", text: "Обрізка, перше обприскування." }
      ]
    },
    {
      name: "ВЕСНА",
      months: "Квітень – Травень",
      icon: "🌿",
      color: "var(--color-primary-light)",
      bgColor: "rgba(45, 92, 71, 0.05)",
      stages: [
        { label: "Стан", text: "Розпускання листя → Активний ріст пагонів." },
        { label: "Ризик", text: "Перший пік курчавості листя." },
        { label: "Дія", text: "Нормування плодів, підгодівля азотом, захист." }
      ]
    },
    {
      name: "ЛІТО",
      months: "Червень – Серпень",
      icon: "🍑",
      color: "var(--color-warning)",
      bgColor: "rgba(168, 110, 24, 0.05)",
      stages: [
        { label: "Стан", text: "Налив плодів → Збір врожаю." },
        { label: "Ризик", text: "Моніліоз, плодожерка, кліщі." },
        { label: "Дія", text: "Полив (критично!), захист від шкідників." }
      ]
    },
    {
      name: "ОСІНЬ",
      months: "Вересень – Листопад",
      icon: "🍂",
      color: "var(--color-bark-light)",
      bgColor: "rgba(155, 110, 80, 0.05)",
      stages: [
        { label: "Стан", text: "Дозрівання пізніх сортів → Листопад." },
        { label: "Дія", text: "Підготовка до зими, побілка, останнє підживлення." }
      ]
    }
  ];

  return (
    <div className="diagram-wrapper">
      <div className="diagram-header">
        <div className="diagram-badge">СХЕМА 3</div>
        <h3 className="diagram-title">Річний цикл персика</h3>
        <p className="diagram-subtitle">Для зони Центральної України</p>
      </div>

      <div className="timeline-container">
        {seasons.map((season, idx) => (
          <div key={idx} className="timeline-item" style={{ '--accent': season.color } as React.CSSProperties}>
            <div className="timeline-icon" style={{ background: season.bgColor, color: season.color }}>
              {season.icon}
            </div>
            
            <div className="timeline-content">
              <div className="timeline-content-header">
                <h4 style={{ color: season.color }}>{season.name}</h4>
                <span className="timeline-months">{season.months}</span>
              </div>
              
              <div className="timeline-details">
                {season.stages.map((stage, sIdx) => (
                  <div key={sIdx} className="stage-row">
                    <span className="stage-label" style={{ color: stage.isDanger ? 'var(--color-danger)' : 'var(--color-muted)' }}>
                      {stage.label}:
                    </span>
                    <span className="stage-text" style={{ fontWeight: stage.isDanger ? 600 : 400 }}>
                      {stage.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .diagram-wrapper {
          margin: 4rem auto;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: var(--font-body);
        }
        
        .diagram-header, .timeline-container {
          width: 100%;
          max-width: 800px;
        }
        
        .diagram-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .diagram-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-accent-dark);
          margin-bottom: 0.5rem;
        }
        
        .diagram-title {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          color: var(--color-primary-dark);
          margin-bottom: 0.25rem;
          font-weight: 600;
        }
        
        .diagram-subtitle {
          font-size: 0.95rem;
          color: var(--color-muted);
        }

        .timeline-container {
          position: relative;
          padding-left: 2rem;
        }

        .timeline-container::before {
          content: '';
          position: absolute;
          left: 3rem;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--color-border-subtle);
          z-index: 0;
        }

        .timeline-item {
          position: relative;
          display: flex;
          gap: 2rem;
          margin-bottom: 2.5rem;
          z-index: 1;
        }

        .timeline-item:last-child {
          margin-bottom: 0;
        }

        .timeline-icon {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          box-shadow: 0 0 0 6px var(--color-surface);
          border: 1px solid var(--accent);
          flex-shrink: 0;
          position: relative;
          left: -0.25rem;
        }

        .timeline-content {
          background: var(--color-surface);
          border: 1px solid var(--color-border-light);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          flex-grow: 1;
          box-shadow: 0 4px 15px -5px rgba(0,0,0,0.05);
          position: relative;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .timeline-content:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px -5px rgba(0,0,0,0.08);
          border-color: var(--color-border);
        }

        .timeline-content-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 1rem;
          border-bottom: 1px solid var(--color-border-subtle);
          padding-bottom: 0.75rem;
        }

        .timeline-content h4 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .timeline-months {
          font-size: 0.8rem;
          color: var(--color-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .timeline-details {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .stage-row {
          display: flex;
          gap: 0.5rem;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .stage-label {
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          width: 4rem;
          flex-shrink: 0;
          padding-top: 0.1rem;
        }

        .stage-text {
          color: var(--color-text-secondary);
        }

        @media (max-width: 640px) {
          .timeline-container { padding-left: 0; }
          .timeline-container::before { left: 1.25rem; }
          .timeline-item { gap: 1rem; }
          .timeline-content-header { flex-direction: column; gap: 0.25rem; }
          .timeline-icon { width: 2rem; height: 2rem; font-size: 1rem; left: 0.25rem; }
          .stage-row { flex-direction: column; gap: 0.1rem; }
          .stage-label { width: auto; }
        }
      `}} />
    </div>
  );
}
