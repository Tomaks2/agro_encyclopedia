"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RootSystemDiagram({ schemaBadge, title = "Коренева система" }: { schemaBadge?: string, title?: string }) {
  const [activeLayer, setActiveLayer] = useState<number>(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const layers = [
    {
      id: 1,
      depth: "0–30 см",
      title: "Активне «дрібне» коріння",
      desc: "Всмоктування поживних речовин та вологи. Основна зона живлення дерева (добрива, полив). Дуже чутливе до пересихання.",
      color: "#10b981", // Emerald
      bgColor: "rgba(16, 185, 129, 0.1)",
      icon: "💧",
      yPos: 60,
    },
    {
      id: 2,
      depth: "30–80 см",
      title: "Горизонтальне коріння",
      desc: "Тут відбувається більшість поглинання вологи в помірний сезон. Каркасні корені тримають структуру.",
      color: "#84cc16", // Lime
      bgColor: "rgba(132, 204, 22, 0.1)",
      icon: "🌿",
      yPos: 120,
    },
    {
      id: 3,
      depth: "80–180 см",
      title: "Стрижневий та якірні корені",
      desc: "Відповідає за стабільність дерева при сильному вітрі. Дістає глибинну вологу у найпосушливіші місяці.",
      color: "#d97706", // Amber
      bgColor: "rgba(217, 119, 6, 0.1)",
      icon: "⚓",
      yPos: 190,
    },
    {
      id: 4,
      depth: "> 180 см",
      title: "НЕБЕЗПЕЧНА ЗОНА (Ґрунтові води)",
      desc: "Якщо тут стоять стоячі ґрунтові води — корінь потрапляє в анаеробне середовище (без кисню). Починається гниття, і дерево раптово гине.",
      color: "#ef4444", // Red
      bgColor: "rgba(239, 68, 68, 0.1)",
      icon: "⚠️",
      isDanger: true,
      yPos: 260,
    },
  ];

  const activeData = layers.find(l => l.id === activeLayer) || layers[0];

  if (!isMounted) return <div className="root-loader">Завантаження тренажера...</div>;

  return (
    <div className="root-diagram-wrapper">
      <div className="root-header">
        {schemaBadge && <div className="diagram-badge">{schemaBadge}</div>}
        <h3 className="root-title">{title}</h3>
        <p className="root-subtitle">
          Натискайте на шари ґрунту, щоб дослідити функції кореневої системи на різній глибині.
        </p>
      </div>

      <div className="root-container">
        
        {/* Left Side: Interactive SVG Tree/Roots */}
        <div className="root-svg-container">
          <svg viewBox="0 0 300 320" className="root-svg">
            
            {/* Background Layers */}
            <rect x="0" y="40" width="300" height="50" fill={activeLayer === 1 ? "#10b98115" : "#f1f5f9"} 
                  onClick={() => setActiveLayer(1)} style={{cursor: 'pointer', transition: 'fill 0.3s'}} />
            <rect x="0" y="90" width="300" height="70" fill={activeLayer === 2 ? "#84cc1615" : "#e2e8f0"} 
                  onClick={() => setActiveLayer(2)} style={{cursor: 'pointer', transition: 'fill 0.3s'}} />
            <rect x="0" y="160" width="300" height="80" fill={activeLayer === 3 ? "#d9770615" : "#cbd5e1"} 
                  onClick={() => setActiveLayer(3)} style={{cursor: 'pointer', transition: 'fill 0.3s'}} />
            <rect x="0" y="240" width="300" height="80" fill={activeLayer === 4 ? "#ef444415" : "#94a3b8"} 
                  onClick={() => setActiveLayer(4)} style={{cursor: 'pointer', transition: 'fill 0.3s'}} />
            
            {/* Depth Labels (Clickable) */}
            <g fontSize="10" fontWeight="bold" fill="#64748b" style={{cursor: 'pointer'}}>
              <text x="10" y="65" onClick={() => setActiveLayer(1)}>0-30 см</text>
              <text x="10" y="125" onClick={() => setActiveLayer(2)}>30-80 см</text>
              <text x="10" y="200" onClick={() => setActiveLayer(3)}>80-180 см</text>
              <text x="10" y="280" fill="#ef4444" onClick={() => setActiveLayer(4)}>&gt; 180 см</text>
            </g>

            {/* Ground Line */}
            <line x1="0" y1="40" x2="300" y2="40" stroke="#4a3b32" strokeWidth="4" />
            
            {/* Tree Trunk */}
            <path d="M140 0 Q145 20 145 40 L155 40 Q155 20 160 0 Z" fill="#4a3b32" />
            
            {/* Roots */}
            <g fill="none" strokeLinecap="round">
              
              {/* Layer 1: Fine Roots */}
              <motion.g 
                stroke={activeLayer === 1 ? "#10b981" : "#8b5a2b"} 
                strokeWidth="1.5"
                animate={{ stroke: activeLayer === 1 ? "#10b981" : "#8b5a2b", strokeWidth: activeLayer === 1 ? 2.5 : 1.5 }}
              >
                <path d="M145 45 Q120 50 100 55" />
                <path d="M100 55 Q90 58 80 50" />
                <path d="M155 45 Q170 50 190 60" />
                <path d="M190 60 Q200 65 210 50" />
                <path d="M148 50 Q130 65 110 70" />
                <path d="M152 50 Q170 65 200 70" />
              </motion.g>

              {/* Layer 2: Horizontal Roots */}
              <motion.g 
                stroke={activeLayer === 2 ? "#84cc16" : "#6b4423"} 
                strokeWidth="3"
                animate={{ stroke: activeLayer === 2 ? "#84cc16" : "#6b4423", strokeWidth: activeLayer === 2 ? 4 : 3 }}
              >
                <path d="M146 60 Q120 80 90 100 Q70 110 50 120" />
                <path d="M154 60 Q170 90 200 110 Q220 120 240 110" />
                <path d="M148 80 Q130 110 110 130" />
                <path d="M152 80 Q170 120 190 140" />
              </motion.g>

              {/* Layer 3: Tap Root */}
              <motion.g 
                stroke={activeLayer === 3 ? "#d97706" : "#4a2f18"} 
                strokeWidth="4"
                animate={{ stroke: activeLayer === 3 ? "#d97706" : "#4a2f18", strokeWidth: activeLayer === 3 ? 5 : 4 }}
              >
                <path d="M150 40 Q145 100 150 160 Q155 200 150 220" />
                <path d="M150 140 Q135 170 120 200" strokeWidth="2.5" />
                <path d="M150 150 Q165 180 180 210" strokeWidth="2.5" />
              </motion.g>

              {/* Layer 4: Danger Zone Water Line */}
              <motion.g
                animate={{ opacity: activeLayer === 4 ? 1 : 0.6 }}
              >
                <path d="M0 260 Q50 250 100 260 T200 260 T300 260" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M0 280 Q50 270 100 280 T200 280 T300 280" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                {/* Dying tap root tip */}
                <path d="M150 220 Q148 240 152 260" stroke={activeLayer === 4 ? "#ef4444" : "#2a1a0d"} strokeWidth="2" />
                {activeLayer === 4 && (
                  <circle cx="152" cy="265" r="4" fill="#ef4444" />
                )}
              </motion.g>

            </g>
            
            {/* Active Highlight Indicator (Arrow pointing right) */}
            <motion.path 
              d="M75 -5 L85 0 L75 5 Z" 
              fill={activeData.color}
              animate={{ y: activeData.yPos }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            />
          </svg>
        </div>

        {/* Right Side: Info Card */}
        <div className="root-info-section">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={`root-info-card ${activeData.isDanger ? 'danger-card' : ''}`}
              style={{
                background: activeData.bgColor,
                borderLeft: `4px solid ${activeData.color}`
              }}
            >
              <div className="root-info-icon" style={{ color: activeData.color }}>
                {activeData.icon}
              </div>
              
              <div className="root-info-depth" style={{ color: activeData.color }}>
                ГЛИБИНА: {activeData.depth}
              </div>
              
              <h4 className="root-info-card-title" style={{ color: activeData.isDanger ? '#ef4444' : 'var(--color-primary-dark)' }}>
                {activeData.title}
              </h4>
              
              <p className="root-info-desc">
                {activeData.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Layer Selector Tabs */}
          <div className="root-tabs">
            {layers.map(layer => (
              <button 
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`root-tab ${activeLayer === layer.id ? 'active' : ''}`}
                style={{ 
                  borderColor: activeLayer === layer.id ? layer.color : 'transparent',
                  color: activeLayer === layer.id ? layer.color : 'var(--color-text-secondary)',
                  backgroundColor: activeLayer === layer.id ? layer.bgColor : 'transparent'
                }}
              >
                {layer.depth}
              </button>
            ))}
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .root-loader {
          height: 400px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-muted);
        }

        .root-diagram-wrapper {
          width: 100%;
          max-width: 900px;
          margin: 4rem auto;
          font-family: var(--font-body);
        }

        .root-header {
          text-align: center;
          margin-bottom: 2.5rem;
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

        .root-title {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          color: var(--color-primary-dark);
          margin: 0 0 0.5rem 0;
          font-weight: 600;
        }

        .root-subtitle {
          color: var(--color-text-secondary);
          font-size: 0.95rem;
          max-width: 500px;
          margin: 0 auto;
        }

        .root-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border-light);
          border-radius: var(--radius-xl);
          padding: 2rem;
          box-shadow: 0 15px 40px -15px rgba(0,0,0,0.1);
        }

        @media (min-width: 768px) {
          .root-container {
            flex-direction: row;
            align-items: center;
            padding: 2.5rem;
            gap: 3rem;
          }
        }

        .root-svg-container {
          width: 100%;
          max-width: 350px;
          margin: 0 auto;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--color-border);
          background: white;
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.03);
        }

        .root-svg {
          width: 100%;
          height: auto;
          display: block;
        }

        .root-info-section {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .root-info-section {
            width: 50%;
          }
        }

        .root-info-card {
          padding: 2rem;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255,255,255,0.4);
          backdrop-filter: blur(10px);
          box-shadow: var(--shadow-sm);
          position: relative;
          min-height: 220px;
        }

        .danger-card {
          border: 1px dashed rgba(239, 68, 68, 0.4);
        }

        .root-info-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .root-info-depth {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
        }

        .root-info-card-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          font-family: var(--font-sans);
        }

        .root-info-desc {
          margin: 0;
          color: var(--color-text);
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .root-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }

        .root-tab {
          padding: 0.75rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          background: var(--color-surface-2);
          cursor: pointer;
          font-weight: 600;
          font-size: 0.85rem;
          transition: all 0.2s ease;
          outline: none;
        }

        .root-tab:hover {
          background: rgba(0,0,0,0.02);
        }

        .root-tab.active {
          border-width: 2px;
        }
      `}} />
    </div>
  );
}
