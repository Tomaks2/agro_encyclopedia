'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TreeLifespanDiagram({ schemaBadge }: { schemaBadge?: string }) {
  const [age, setAge] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  let phaseInfo = { title: "", desc: "", actions: "", color: "", icon: "", quince: "", wild: "" };

  if (age < 5) {
    phaseInfo = {
      title: "1. ЮВЕНІЛЬНА ФАЗА",
      quince: "1-4 роки",
      wild: "1-7 років",
      desc: "Дерево активно нарощує вегетативну масу та будує міцний скелет. Уся енергія йде у ріст, квіткові бруньки ще не формуються.",
      actions: "Формувати крону, відгинати гілки (див. Схему 1). Не перегодовувати азотом, щоб деревина встигала визріти.",
      color: "#84cc16", // Lime
      icon: "🌱"
    };
  } else if (age >= 5 && age < 10) {
    phaseInfo = {
      title: "2. ВХОДЖЕННЯ В ПЛОДОНОШЕННЯ",
      quince: "4-5 років",
      wild: "6-8 років",
      desc: "Ріст пагонів уповільнюється. З'являються перші квітки, дерево дає перший сигнальний врожай (5-15 кг).",
      actions: "Дати дереву виростити перший врожай. Якщо зав'язей забагато (особливо на айві) — обов'язково нормувати їх.",
      color: "#10b981", // Emerald
      icon: "🌸"
    };
  } else if (age >= 10 && age < 26) {
    phaseInfo = {
      title: "3. ПОВНЕ ПЛОДОНОШЕННЯ",
      quince: "5-25 років",
      wild: "8-50+ років",
      desc: "Пік продуктивності. Дерево має розлогу крону, вегетативний ріст мінімальний. Врожаї стабільні та максимальні.",
      actions: "Підтримуюча обрізка (освітлення крони), регулярне живлення та обов'язковий захист від шкідників і хвороб.",
      color: "#f59e0b", // Amber
      icon: "🍐"
    };
  } else {
    phaseInfo = {
      title: "4. ЗАТУХАННЯ І СТАРІННЯ",
      quince: "25+ років",
      wild: "50+ років",
      desc: "Врожайність поступово знижується. Плоди дрібнішають, ріст повністю зупиняється. Гілки починають всихати.",
      actions: "Кардинальна омолоджуюча обрізка (зрізання на багаторічну деревину) або поступова заміна дерева на новий саджанець.",
      color: "#92400e", // Dark amber
      icon: "🍂"
    };
  }

  if (!isMounted) return <div className="lifespan-loader">Завантаження тренажера...</div>;

  // Animation properties scaling with age
  const trunkScaleY = 0.5 + (age / 50) * 0.5; // 0.5 to 1.0
  const trunkScaleX = 0.3 + (age / 50) * 0.7; // 0.3 to 1.0

  return (
    <div className="lifespan-diagram-wrapper">
      
      {/* Header */}
      <div className="lifespan-header">
        {schemaBadge && <div className="diagram-badge" style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--color-accent-dark)', marginBottom: '0.5rem' }}>{schemaBadge}</div>}
        <h3 className="lifespan-title">
          Вікові фази дерева
        </h3>
        <p className="lifespan-subtitle">
          Прокручуйте час, щоб побачити еволюцію дерева від саджанця до старіння, та дізнатися про завдання садівника на кожному етапі.
        </p>
      </div>

      <div className="lifespan-container">
        
        {/* Left Column: Tree SVG + Slider */}
        <div className="lifespan-left-column">
          
          <div className="lifespan-svg-container">
            <svg viewBox="-150 -250 300 300" className="lifespan-svg">
              
              {/* Ground Line */}
              <path d="M-130 45 L130 45" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
              <path d="M-100 52 L100 52" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />

              {/* Tree Group */}
              <g transform="translate(0, 45)">
                
                {/* TRUNK */}
                <motion.g
                  initial={false}
                  animate={{ scaleX: trunkScaleX, scaleY: trunkScaleY }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: "50% 50%" }}
                >
                  <circle cx="0" cy="0" r="300" fill="none" stroke="none" />
                  <path
                    d="M-5 0 Q-10 -100 -2 -200 Q0 -210 2 -200 Q10 -100 5 0 Z"
                    fill="#4a3b32"
                  />
                </motion.g>

                {/* BRANCHES (Progressively appear and grow) */}
                {/* Phase 1 branches (always visible, grow with trunk) */}
                <motion.g
                  initial={false}
                  animate={{ scale: trunkScaleY, opacity: age >= 2 ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: "50% 50%" }}
                >
                  <circle cx="0" cy="0" r="300" fill="none" stroke="none" />
                  <path d="M0 -50 Q-40 -80 -60 -120" stroke="#4a3b32" strokeWidth="6" fill="none" strokeLinecap="round" />
                  <path d="M0 -70 Q40 -110 50 -150" stroke="#4a3b32" strokeWidth="5" fill="none" strokeLinecap="round" />
                  <path d="M0 -120 Q-30 -160 -40 -190" stroke="#4a3b32" strokeWidth="4" fill="none" strokeLinecap="round" />
                </motion.g>

                {/* Phase 2 branches (appear > 4 years) */}
                <motion.g
                  initial={false}
                  animate={{ scale: age >= 5 ? trunkScaleY : 0.5, opacity: age >= 5 ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ transformOrigin: "50% 50%" }}
                >
                  <circle cx="0" cy="0" r="300" fill="none" stroke="none" />
                  <path d="M0 -90 Q-80 -100 -100 -130" stroke="#3d2b1f" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <path d="M0 -120 Q80 -130 90 -160" stroke="#3d2b1f" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <path d="M0 -150 Q-20 -190 -10 -220" stroke="#3d2b1f" strokeWidth="3" fill="none" strokeLinecap="round" />
                </motion.g>

                {/* Phase 3 branches (appear > 9 years) */}
                <motion.g
                  initial={false}
                  animate={{ scale: age >= 10 ? trunkScaleY : 0.5, opacity: age >= 10 ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ transformOrigin: "50% 50%" }}
                >
                  <circle cx="0" cy="0" r="300" fill="none" stroke="none" />
                  <path d="M0 -120 Q-110 -150 -120 -180" stroke="#2a1f16" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M0 -140 Q110 -170 110 -200" stroke="#2a1f16" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M0 -170 Q-50 -220 -30 -250" stroke="#2a1f16" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M0 -180 Q60 -230 40 -260" stroke="#2a1f16" strokeWidth="2" fill="none" strokeLinecap="round" />
                </motion.g>

                {/* LEAVES / CANOPY */}
                {/* Young leaves (Phase 1 & 2) */}
                <motion.g
                  initial={false}
                  animate={{ 
                    scale: age < 10 ? (age / 10) * trunkScaleY : trunkScaleY, 
                    opacity: age >= 2 && age < 35 ? 1 : age >= 35 ? 0.3 : 0 
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ transformOrigin: "50% 50%" }}
                >
                  <circle cx="0" cy="0" r="300" fill="none" stroke="none" />
                  <circle cx="-50" cy="-140" r="40" fill="#22c55e" opacity="0.6" />
                  <circle cx="40" cy="-170" r="35" fill="#16a34a" opacity="0.7" />
                  <circle cx="-20" cy="-200" r="45" fill="#15803d" opacity="0.5" />
                </motion.g>

                {/* Massive canopy (Phase 3) */}
                <motion.g
                  initial={false}
                  animate={{ 
                    scale: age >= 10 ? (1 + ((age - 10) / 40) * 0.2) * trunkScaleY : 0, 
                    opacity: age >= 10 && age < 35 ? 1 : age >= 35 ? 0.2 : 0 
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ transformOrigin: "50% 50%" }}
                >
                  <circle cx="0" cy="0" r="300" fill="none" stroke="none" />
                  <circle cx="-80" cy="-160" r="60" fill="#22c55e" opacity="0.8" />
                  <circle cx="80" cy="-190" r="50" fill="#16a34a" opacity="0.9" />
                  <circle cx="0" cy="-230" r="70" fill="#15803d" opacity="0.8" />
                  <circle cx="-40" cy="-210" r="50" fill="#16a34a" opacity="0.7" />
                  <circle cx="50" cy="-140" r="65" fill="#22c55e" opacity="0.6" />
                </motion.g>

                {/* FLOWERS (Only in Phase 2) */}
                <motion.g
                  initial={false}
                  animate={{ opacity: age >= 5 && age < 10 ? 1 : 0, scale: age >= 5 && age < 10 ? trunkScaleY : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: "50% 50%" }}
                >
                  <circle cx="0" cy="0" r="300" fill="none" stroke="none" />
                  <circle cx="-60" cy="-130" r="6" fill="#fdf2f8" stroke="#f472b6" strokeWidth="1" />
                  <circle cx="40" cy="-160" r="6" fill="#fdf2f8" stroke="#f472b6" strokeWidth="1" />
                  <circle cx="-20" cy="-210" r="6" fill="#fdf2f8" stroke="#f472b6" strokeWidth="1" />
                  <circle cx="-80" cy="-110" r="5" fill="#fdf2f8" stroke="#f472b6" strokeWidth="1" />
                  <circle cx="60" cy="-130" r="5" fill="#fdf2f8" stroke="#f472b6" strokeWidth="1" />
                </motion.g>

                {/* FRUITS (Only in Phase 3 & 4) */}
                <motion.g
                  initial={false}
                  animate={{ 
                    opacity: age >= 10 ? (age < 35 ? 1 : 0.4) : 0, 
                    scale: age >= 10 ? (age < 35 ? trunkScaleY : 0.7 * trunkScaleY) : 0 
                  }}
                  transition={{ duration: 0.4 }}
                  style={{ transformOrigin: "50% 50%" }}
                >
                  <circle cx="0" cy="0" r="300" fill="none" stroke="none" />
                  {/* Big harvest */}
                  <circle cx="-90" cy="-150" r="7" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
                  <circle cx="-60" cy="-180" r="8" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
                  <circle cx="-100" cy="-120" r="6" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
                  
                  <circle cx="80" cy="-170" r="8" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
                  <circle cx="50" cy="-200" r="7" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
                  <circle cx="90" cy="-140" r="6" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
                  
                  <circle cx="-20" cy="-230" r="8" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
                  <circle cx="20" cy="-220" r="7" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
                  <circle cx="0" cy="-190" r="9" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
                  <circle cx="-40" cy="-130" r="7" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
                  <circle cx="30" cy="-120" r="8" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
                </motion.g>

                {/* DEAD BRANCHES (Phase 4) */}
                <motion.g
                  initial={false}
                  animate={{ opacity: age >= 35 ? 1 : 0, scale: trunkScaleY }}
                  transition={{ duration: 0.8 }}
                  style={{ transformOrigin: "50% 50%" }}
                >
                  <circle cx="0" cy="0" r="300" fill="none" stroke="none" />
                  <path d="M0 -120 Q-90 -160 -80 -190" stroke="#78716c" strokeWidth="3" fill="none" strokeDasharray="5 2" />
                  <path d="M0 -150 Q90 -180 80 -220" stroke="#78716c" strokeWidth="3" fill="none" strokeDasharray="5 2" />
                </motion.g>

              </g>
            </svg>
          </div>

          {/* Slider Control (Now under the tree) */}
          <div className="lifespan-slider-card">
            <div className="lifespan-slider-header">
              <span className="lifespan-slider-label">Вік дерева</span>
              <span className="lifespan-slider-value" style={{ color: phaseInfo.color }}>
                {age} {age === 1 || age === 21 || age === 31 || age === 41 ? "рік" : (age >= 2 && age <= 4) || (age % 10 >= 2 && age % 10 <= 4 && age > 20) ? "роки" : "років"}
              </span>
            </div>
            
            <input 
              type="range" 
              min="1" 
              max="50" 
              step="1"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="lifespan-slider-input"
              style={{ accentColor: phaseInfo.color }}
            />
            
            <div className="lifespan-slider-footer">
              <span>1 рік</span>
              <span>25 років</span>
              <span>50 років</span>
            </div>
          </div>

        </div>

        {/* Right Side: Info Card */}
        <div className="lifespan-right-column">
          
          <div className="lifespan-info-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={phaseInfo.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="lifespan-info-card"
                style={{
                  background: `linear-gradient(135deg, ${phaseInfo.color}15 0%, ${phaseInfo.color}05 100%)`,
                  borderLeft: `4px solid ${phaseInfo.color}`
                }}
              >
                <div className="lifespan-info-bg-icon">
                  {phaseInfo.icon}
                </div>
                
                <div className="lifespan-info-card-header">
                  <span className="lifespan-info-icon">{phaseInfo.icon}</span>
                  <h4 className="lifespan-info-title" style={{ color: phaseInfo.color }}>
                    {phaseInfo.title}
                  </h4>
                </div>
                
                {/* Simplified and Centered Meta Grid */}
                <div className="lifespan-meta-grid">
                  <div className="lifespan-meta-item">
                    <span className="lifespan-meta-label">Айва (Карлик)</span>
                    <span className="lifespan-meta-value">{phaseInfo.quince}</span>
                  </div>
                  <div className="lifespan-meta-item">
                    <span className="lifespan-meta-label">Дичка (Висока)</span>
                    <span className="lifespan-meta-value">{phaseInfo.wild}</span>
                  </div>
                </div>

                <div className="lifespan-divider" />
                
                <p className="lifespan-info-desc">
                  {phaseInfo.desc}
                </p>

                <div className="lifespan-actions-box">
                  <strong className="lifespan-actions-label">Дії садівника:</strong>
                  <span className="lifespan-actions-text">{phaseInfo.actions}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .lifespan-loader {
          height: 500px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-body);
          color: var(--color-muted);
        }

        .lifespan-diagram-wrapper {
          width: 100%;
          max-width: 900px;
          margin: 4rem auto;
          font-family: var(--font-body);
        }

        .lifespan-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .lifespan-title {
          font-family: var(--font-body);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-primary-dark);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin: 0 0 0.5rem 0;
          position: relative;
          display: inline-block;
          padding-bottom: 0.5rem;
        }

        .lifespan-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 3rem;
          height: 2px;
          background: var(--color-accent);
          border-radius: 2px;
        }

        .lifespan-subtitle {
          color: var(--color-text-secondary);
          font-size: 0.95rem;
          max-width: 550px;
          margin: 0 auto;
        }

        .lifespan-container {
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
          .lifespan-container {
            flex-direction: row;
            align-items: stretch;
            padding: 2.5rem;
            gap: 2.5rem;
          }
        }

        /* Left Column (SVG + Slider) */
        .lifespan-left-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
        }

        @media (min-width: 768px) {
          .lifespan-left-column {
            width: 45%;
          }
        }

        .lifespan-svg-container {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          background: linear-gradient(to top, var(--color-tip-bg), var(--color-surface-2));
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.03);
          border: 1px solid var(--color-border);
          overflow: hidden;
        }

        .lifespan-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
        }

        /* Right Column (Info Card) */
        .lifespan-right-column {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        @media (min-width: 768px) {
          .lifespan-right-column {
            width: 55%;
          }
        }

        .lifespan-slider-card {
          background: var(--color-surface-2);
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
        }

        .lifespan-slider-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .lifespan-slider-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text-secondary);
        }

        .lifespan-slider-value {
          font-size: 1.35rem;
          font-weight: 700;
        }

        .lifespan-slider-input {
          width: 100%;
          height: 6px;
          background: var(--color-border);
          border-radius: 4px;
          appearance: none;
          cursor: pointer;
          outline: none;
        }

        .lifespan-slider-input::-webkit-slider-thumb {
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: currentColor;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
          border: 2px solid white;
        }

        .lifespan-slider-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 0.75rem;
          font-size: 0.75rem;
          color: var(--color-muted);
          font-weight: 500;
        }

        .lifespan-info-wrapper {
          height: 100%;
        }

        .lifespan-info-card {
          position: relative;
          padding: 2rem 1.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .lifespan-info-bg-icon {
          position: absolute;
          top: -15px;
          right: -15px;
          font-size: 8rem;
          opacity: 0.04;
          filter: blur(1px);
        }

        .lifespan-info-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 10;
        }

        .lifespan-info-icon {
          font-size: 1.75rem;
        }

        .lifespan-info-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0;
          font-family: var(--font-body);
        }

        .lifespan-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 10;
          background: rgba(255,255,255,0.4);
          padding: 1rem;
          border-radius: var(--radius-md);
        }

        .lifespan-meta-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.25rem;
        }

        .lifespan-meta-label {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 700;
        }

        .lifespan-meta-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-primary-dark);
        }

        .lifespan-divider {
          height: 1px;
          background: rgba(0,0,0,0.06);
          margin: 0 0 1.5rem 0;
          position: relative;
          z-index: 10;
        }

        .lifespan-info-desc {
          position: relative;
          z-index: 10;
          margin: 0 0 1.5rem 0;
          color: var(--color-text-secondary);
          line-height: 1.6;
          font-size: 1rem;
          flex-grow: 1;
        }

        .lifespan-actions-box {
          position: relative;
          z-index: 10;
          background: rgba(255,255,255,0.7);
          padding: 1.25rem;
          border-radius: var(--radius-md);
          font-size: 0.95rem;
          line-height: 1.5;
          border-left: 3px solid var(--color-accent);
        }

        .lifespan-actions-label {
          color: var(--color-primary-dark);
          display: block;
          margin-bottom: 0.35rem;
        }

        .lifespan-actions-text {
          color: var(--color-text);
        }
      `}} />
    </div>
  );
}
