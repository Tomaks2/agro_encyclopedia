"use client";
import React from "react";
import Image from "next/image";

export default function BranchAnatomyDiagram() {
  return (
    <div className="branch-anatomy-wrapper">
      <div className="branch-anatomy-header">
        <h3 className="branch-anatomy-title">
          БУДОВА ГІЛКИ (ВІД СЕРЦЕВИНИ ДО КОРИ)
        </h3>
        <p className="branch-anatomy-subtitle">
          Для успішного щеплення критично важливо розуміти анатомію гілки. 
          Саме тонкий шар камбію забезпечує зрощення прищепи з підщепою.
        </p>
      </div>

      <div className="branch-anatomy-container">
        
        {/* DESKTOP SVG OVERLAY (Spans entire container) */}
        <svg className="desktop-svg">
          
          {/* 1. Серцевина (Image: 31%, Text: 10%) */}
          <circle cx="22.5%" cy="31%" r="6" fill="#fff" stroke="#333" strokeWidth="2" />
          <line x1="22.5%" y1="31%" x2="45%" y2="31%" stroke="#ccc" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="45%" y1="31%" x2="52%" y2="10%" stroke="#ccc" strokeWidth="2" strokeDasharray="4 4" />
          
          {/* 2. Деревина (Image: 45%, Text: 30%) */}
          <circle cx="22.5%" cy="45%" r="6" fill="#fff" stroke="#333" strokeWidth="2" />
          <line x1="22.5%" y1="45%" x2="45%" y2="45%" stroke="#ccc" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="45%" y1="45%" x2="52%" y2="30%" stroke="#ccc" strokeWidth="2" strokeDasharray="4 4" />
          
          {/* 3. Камбій (Image: 58%, Text: 50%) */}
          <circle cx="22.5%" cy="58%" r="8" fill="#4ade80" stroke="#fff" strokeWidth="2" />
          <line x1="22.5%" y1="58%" x2="45%" y2="58%" stroke="#4ade80" strokeWidth="3" />
          <line x1="45%" y1="58%" x2="52%" y2="50%" stroke="#4ade80" strokeWidth="3" />
          
          {/* 4. Луб (Image: 68%, Text: 70%) */}
          <circle cx="22.5%" cy="68%" r="6" fill="#fff" stroke="#333" strokeWidth="2" />
          <line x1="22.5%" y1="68%" x2="45%" y2="68%" stroke="#ccc" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="45%" y1="68%" x2="52%" y2="70%" stroke="#ccc" strokeWidth="2" strokeDasharray="4 4" />
          
          {/* 5. Кора (Image: 82%, Text: 90%) */}
          <circle cx="22.5%" cy="82%" r="6" fill="#fff" stroke="#333" strokeWidth="2" />
          <line x1="22.5%" y1="82%" x2="45%" y2="82%" stroke="#ccc" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="45%" y1="82%" x2="52%" y2="90%" stroke="#ccc" strokeWidth="2" strokeDasharray="4 4" />
        </svg>

        {/* MOBILE SVG OVERLAY (Spans only photo panel) */}
        <svg className="mobile-svg">
          {/* 1. Серцевина (31%) */}
          <circle cx="50%" cy="31%" r="6" fill="#fff" stroke="#333" strokeWidth="2" />
          <line x1="50%" y1="31%" x2="100%" y2="31%" stroke="#ccc" strokeWidth="2" strokeDasharray="4 4" />
          
          {/* 2. Деревина (45%) */}
          <circle cx="50%" cy="45%" r="6" fill="#fff" stroke="#333" strokeWidth="2" />
          <line x1="50%" y1="45%" x2="100%" y2="45%" stroke="#ccc" strokeWidth="2" strokeDasharray="4 4" />
          
          {/* 3. Камбій (58%) */}
          <circle cx="50%" cy="58%" r="8" fill="#4ade80" stroke="#fff" strokeWidth="2" />
          <line x1="50%" y1="58%" x2="100%" y2="58%" stroke="#4ade80" strokeWidth="3" />
          
          {/* 4. Луб (68%) */}
          <circle cx="50%" cy="68%" r="6" fill="#fff" stroke="#333" strokeWidth="2" />
          <line x1="50%" y1="68%" x2="100%" y2="68%" stroke="#ccc" strokeWidth="2" strokeDasharray="4 4" />
          
          {/* 5. Кора (82%) */}
          <circle cx="50%" cy="82%" r="6" fill="#fff" stroke="#333" strokeWidth="2" />
          <line x1="50%" y1="82%" x2="100%" y2="82%" stroke="#ccc" strokeWidth="2" strokeDasharray="4 4" />
        </svg>

        {/* Left side - Photo */}
        <div className="branch-anatomy-photo-panel">
          <Image 
            src="/photos/yablunia/branch_cutaway.png" 
            alt="Вертикальний зріз гілки" 
            fill
            className="branch-photo-img"
            unoptimized
          />
        </div>

        {/* Right side - Text blocks */}
        <div className="branch-anatomy-text-panel">
          <div className="branch-text-blocks">
            {/* 1. СЕРЦЕВИНА */}
            <div className="branch-text-row">
              <div className="branch-text-content">
                <h4 className="branch-layer-title">
                  <span className="dot" style={{ backgroundColor: "#000" }}></span>
                  Серцевина
                </h4>
                <p className="branch-layer-desc">Найстаріша центральна частина гілки. Вона пухка і не бере участі в життєзабезпеченні.</p>
              </div>
            </div>

            {/* 2. ДЕРЕВИНА */}
            <div className="branch-text-row">
              <div className="branch-text-content">
                <h4 className="branch-layer-title">
                  <span className="dot" style={{ backgroundColor: "#ccc", border: "1px solid #999" }}></span>
                  Деревина
                </h4>
                <p className="branch-layer-desc">Основна маса гілки зі світлими річними кільцями. Виконує роль скелета і проводить воду від коренів вгору.</p>
              </div>
            </div>

            {/* 3. КАМБІЙ */}
            <div className="branch-text-row">
              <div className="branch-text-content cambium-block">
                <h4 className="branch-layer-title cambium-title">
                  <span className="dot" style={{ backgroundColor: "#22c55e" }}></span>
                  Камбій (Критично важливо!)
                </h4>
                <p className="branch-layer-desc cambium-desc">
                  Надзвичайно тонкий, вологий і слизький шар живих клітин. <strong>ТІЛЬКИ ВІН забезпечує зрощення при щепленні!</strong>
                </p>
              </div>
            </div>

            {/* 4. ЛУБ */}
            <div className="branch-text-row">
              <div className="branch-text-content">
                <h4 className="branch-layer-title">
                  <span className="dot" style={{ backgroundColor: "#fb923c" }}></span>
                  Луб (Флоема)
                </h4>
                <p className="branch-layer-desc">Внутрішній живий шар кори, яким поживні речовини рухаються від листя вниз до коренів.</p>
              </div>
            </div>

            {/* 5. КОРА */}
            <div className="branch-text-row">
              <div className="branch-text-content">
                <h4 className="branch-layer-title">
                  <span className="dot" style={{ backgroundColor: "#8B4513" }}></span>
                  Кора (Епідерміс)
                </h4>
                <p className="branch-layer-desc">Грубий зовнішній шар, що захищає внутрішні тканини гілки від висихання, морозів та шкідників.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .branch-anatomy-wrapper {
          margin: 4rem 0;
          font-family: var(--font-body);
          position: relative;
          z-index: 10;
        }

        .branch-anatomy-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .branch-anatomy-title {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-primary-dark);
          margin-bottom: 0.75rem;
        }

        .branch-anatomy-subtitle {
          color: var(--color-muted);
          font-size: 0.95rem;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .branch-anatomy-container {
          position: relative;
          width: 100%;
          max-width: 950px;
          margin: 0 auto;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          background: var(--color-surface);
          border: 1px solid var(--color-border-light);
          display: flex;
          flex-direction: column;
        }

        @media (min-width: 768px) {
          .branch-anatomy-container {
            flex-direction: row;
            height: 850px;
          }
        }

        /* LEFT SIDE - PHOTO */
        .branch-anatomy-photo-panel {
          position: relative;
          width: 100%;
          height: 350px;
          background: #111;
          flex-shrink: 0;
        }

        @media (min-width: 768px) {
          .branch-anatomy-photo-panel {
            width: 45%;
            height: 100%;
          }
        }

        .branch-photo-img {
          object-fit: cover;
          opacity: 0.95;
        }

        /* RIGHT SIDE - TEXT */
        .branch-anatomy-text-panel {
          position: relative;
          width: 100%;
          flex-grow: 1;
          background: var(--color-surface);
          display: flex;
          flex-direction: column;
        }

        @media (min-width: 768px) {
          .branch-anatomy-text-panel {
            width: 55%;
            height: 100%;
          }
        }

        .branch-svg-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 20;
        }

        .desktop-svg, .mobile-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          pointer-events: none;
          z-index: 30;
        }

        .desktop-svg {
          height: 100%;
          display: none;
        }

        .mobile-svg {
          height: 350px;
          display: block;
        }

        @media (min-width: 768px) {
          .desktop-svg {
            display: block;
          }
          .mobile-svg {
            display: none;
          }
        }

        .branch-text-blocks {
          position: relative;
          width: 100%;
          height: 100%;
          z-index: 20;
          display: flex;
          flex-direction: column;
        }

        .branch-text-row {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid rgba(0,0,0,0.03);
          position: relative;
        }

        .branch-text-row:last-child {
          border-bottom: none;
        }

        @media (min-width: 768px) {
          .branch-text-row {
            padding: 0 2rem 0 3.5rem;
          }
        }

        .branch-text-content {
          width: 100%;
        }

        .branch-layer-title {
          font-weight: 700;
          color: var(--color-primary-dark);
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .branch-layer-desc {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
          margin: 0;
        }

        .dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .cambium-block {
          background: rgba(74, 222, 128, 0.08);
          padding: 1rem;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(74, 222, 128, 0.3);
        }

        .cambium-title {
          color: #15803d;
        }

        .cambium-desc {
          color: #166534;
        }

        .cambium-desc strong {
          color: #14532d;
        }
      `}} />
    </div>
  );
}
