"use client";

import React from "react";

export default function BudArrangementDiagram() {
  return (
    <div className="diagram-wrapper">
      <div className="diagram-header">
        <div className="diagram-badge">СХЕМА 2</div>
        <h3 className="diagram-title">Розташування бруньок на пагоні</h3>
        <p className="diagram-subtitle">Однорічний пагін персика</p>
      </div>

      <div className="diagram-card">
        <div className="branch-container">
          <div className="branch-line"></div>
          
          <div className="buds-row">
            {/* Triple buds (Flower + Veg + Flower) */}
            {[...Array(5)].map((_, i) => (
              <div key={`triple-${i}`} className="bud-group triple-bud">
                <div className="flower-bud" title="Квіткова брунька">🌸</div>
                <div className="veg-bud" title="Ростова брунька">🌿</div>
                <div className="flower-bud" title="Квіткова брунька">🌸</div>
                <div className="bud-label">Трійка</div>
              </div>
            ))}
            
            {/* Single vegetative buds at the end */}
            <div className="bud-group single-bud">
              <div className="veg-bud" title="Ростова брунька">🌿</div>
              <div className="bud-label">Одиночна</div>
            </div>
            
            <div className="bud-group single-bud end-bud">
              <div className="veg-bud" title="Ростова брунька">🌿</div>
            </div>
          </div>
        </div>

        <div className="legend-container">
          <div className="legend-item">
            <span className="legend-icon veg-icon">🌿</span>
            <div>
              <strong>Ростова брунька</strong>
              <p>Дасть новий пагін та листя</p>
            </div>
          </div>
          <div className="legend-item">
            <span className="legend-icon flower-icon">🌸</span>
            <div>
              <strong>Квіткова брунька</strong>
              <p>Дасть квітку та майбутній плід</p>
            </div>
          </div>
        </div>
        
        <div className="diagram-note">
          <p><strong>Важливо:</strong> Трійки бруньок типові для середини пагону, а одиночні ростові — для його кінця.</p>
        </div>
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
        
        .diagram-header, .diagram-card {
          width: 100%;
          max-width: 800px;
        }
        
        .diagram-header {
          text-align: center;
          margin-bottom: 2rem;
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

        .diagram-card {
          background: var(--color-surface);
          border-radius: var(--radius-xl);
          box-shadow: 0 15px 35px -10px rgba(0,0,0,0.06);
          border: 1px solid var(--color-border-light);
          padding: 3rem 2rem 2rem;
        }

        .branch-container {
          position: relative;
          padding: 2rem 0 4rem;
          margin-bottom: 2rem;
        }

        .branch-line {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 12px;
          background: linear-gradient(to bottom, #8a5e38, #6b4226);
          border-radius: 6px;
          box-shadow: inset 0 -2px 4px rgba(0,0,0,0.2);
          z-index: 1;
        }

        .buds-row {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 1rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .bud-group {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          gap: 2px;
          background: rgba(255,255,255,0.8);
          padding: 0.5rem;
          border-radius: var(--radius-lg);
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          backdrop-filter: blur(4px);
          flex-shrink: 0;
        }

        .flower-bud, .veg-bud {
          font-size: 1.25rem;
          line-height: 1;
          filter: drop-shadow(0 2px 3px rgba(0,0,0,0.1));
          transition: transform 0.2s;
        }
        
        .flower-bud:hover, .veg-bud:hover {
          transform: scale(1.2);
        }

        .bud-label {
          position: absolute;
          bottom: -2rem;
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--color-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }

        .bud-group::after {
          content: '';
          position: absolute;
          bottom: -1rem;
          width: 2px;
          height: 0.5rem;
          background: var(--color-border);
        }

        .end-bud {
          background: transparent;
          box-shadow: none;
          padding: 0;
        }
        .end-bud::after { display: none; }

        .legend-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          background: var(--color-surface-2);
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          margin-bottom: 1.5rem;
        }

        .legend-item {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .legend-icon {
          font-size: 1.75rem;
          background: white;
          width: 3rem;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .legend-item strong {
          display: block;
          font-size: 0.95rem;
          color: var(--color-text);
          margin-bottom: 0.2rem;
        }

        .legend-item p {
          margin: 0;
          font-size: 0.85rem;
          color: var(--color-text-secondary);
        }

        .diagram-note {
          background: rgba(184, 147, 62, 0.08);
          border-left: 3px solid var(--color-accent);
          padding: 1rem 1.25rem;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
        }

        .diagram-note p {
          margin: 0;
          font-size: 0.9rem;
          color: var(--color-text-secondary);
        }
        .diagram-note strong {
          color: var(--color-accent-dark);
        }

        @media (max-width: 640px) {
          .diagram-card { padding: 2rem 1rem 1.5rem; }
          .buds-row { padding: 0 0.5rem; }
          .bud-group { padding: 0.25rem; }
          .flower-bud, .veg-bud { font-size: 1.2rem; }
          .bud-label { font-size: 0.6rem; bottom: -2rem; }
          .legend-container { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
}
