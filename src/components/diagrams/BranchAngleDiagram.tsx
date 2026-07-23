"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BranchAngleDiagram({ schemaBadge }: { schemaBadge?: string }) {
  const [angle, setAngle] = useState(45);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Determine the state based on the angle
  let stateInfo = {
    title: "ПІД КУТОМ 45°",
    desc: "Оптимальний баланс. Помірний ріст, формуються поодинокі плодові бруньки.",
    color: "#84cc16", // Lime
    icon: "🌱"
  };

  if (angle <= 30) {
    stateInfo = {
      title: "ВЕРТИКАЛЬНЕ (0–30°)",
      desc: "Максимальний ріст деревини, вовчки. Квіткових бруньок майже немає.",
      color: "#10b981", // Emerald
      icon: "🌿"
    };
  } else if (angle >= 60 && angle <= 80) {
    stateInfo = {
      title: "ГОРИЗОНТАЛЬНЕ (60–80°)",
      desc: "Ріст зупиняється. Активне закладання квіткових бруньок та великих плодів.",
      color: "#d97706", // Amber
      icon: "🍐"
    };
  } else if (angle > 80) {
    stateInfo = {
      title: "ПОНИКЛЕ (>80°)",
      desc: "Ріст відсутній. З часом плоди дрібнішають через слабкий приплив соків.",
      color: "#92400e", // Brown/Dark Amber
      icon: "🍂"
    };
  }

  if (!isMounted) return <div className="branch-loader">Завантаження тренажера...</div>;

  return (
    <div className="branch-diagram-wrapper">
      
      {/* Header */}
      <div className="branch-header">
        {schemaBadge && <div className="diagram-badge">{schemaBadge}</div>}
        <h3 className="branch-title">
          Вплив положення гілки
        </h3>
        <p className="branch-subtitle">
          Перетягніть повзунок, щоб змінити кут гілки та подивитися, як це впливає на врожайність.
        </p>
      </div>

      <div className="branch-container">
        
        {/* Left Side: SVG Tree Visualization + Slider */}
        <div className="branch-left-column">
          <div className="branch-svg-container">
            <svg viewBox="-50 -50 300 300" className="branch-svg">
              {/* Trunk */}
              <path 
                d="M100 250 L100 50 C100 20, 95 10, 90 0 M100 250 L100 50 C100 20, 105 10, 110 0" 
                stroke="#4a3b32" 
                strokeWidth="16" 
                fill="none" 
                strokeLinecap="round" 
              />
              <path 
                d="M95 250 L95 0 M105 250 L105 0" 
                stroke="#3d2b1f" 
                strokeWidth="4" 
                fill="none" 
                strokeDasharray="10 5"
                opacity="0.3"
              />
              
              {/* Protractor markings */}
              <g stroke="#cbd5e1" strokeWidth="1" opacity="0.6">
                <line x1="100" y1="100" x2="100" y2="-10" strokeDasharray="4 4" />
                <line x1="100" y1="100" x2="177" y2="23" strokeDasharray="4 4" />
                <line x1="100" y1="100" x2="210" y2="100" strokeDasharray="4 4" />
              </g>
              <text x="90" y="-5" fill="#94a3b8" fontSize="10" textAnchor="end">0°</text>
              <text x="185" y="20" fill="#94a3b8" fontSize="10">45°</text>
              <text x="215" y="95" fill="#94a3b8" fontSize="10">90°</text>

              {/* The Dynamic Branch */}
              <g transform="translate(100, 100)">
                <motion.g
                  initial={false}
                  animate={{ rotate: angle }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  style={{ transformOrigin: "50% 50%" }}
                >
                  <circle cx="0" cy="0" r="250" fill="none" stroke="none" />
                  <path 
                    d="M0 0 Q0 -50 0 -100" 
                    stroke="#4a3b32" 
                    strokeWidth="10" 
                    fill="none" 
                    strokeLinecap="round" 
                  />
                  
                  {/* Apples */}
                  <motion.g
                    initial={false}
                    animate={{ opacity: angle >= 50 && angle <= 90 ? 1 : angle > 90 ? 0.4 : 0, scale: angle >= 60 ? 1 : 0.5 }}
                    transition={{ duration: 0.4 }}
                  >
                    <circle cx="-15" cy="-60" r="14" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
                    <path d="M-15 -60 Q-15 -75 -5 -78" stroke="#4a3b32" strokeWidth="2" fill="none" />
                    <path d="M-5 -78 Q5 -78 5 -72 Q-5 -72 -5 -78" fill="#16a34a" />
                    <circle cx="15" cy="-85" r="16" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
                    <path d="M15 -85 Q15 -100 5 -103" stroke="#4a3b32" strokeWidth="2" fill="none" />
                    <path d="M5 -103 Q-5 -103 -5 -97 Q5 -97 5 -103" fill="#16a34a" />
                  </motion.g>

                  {/* Vegetative Growth */}
                  <motion.g
                    initial={false}
                    animate={{ opacity: angle <= 40 ? 1 : 0, scale: angle <= 40 ? 1 : 0.5 }}
                    transition={{ duration: 0.4 }}
                  >
                    <path d="M0 -100 L0 -150" stroke="#16a34a" strokeWidth="5" fill="none" strokeLinecap="round" />
                    <path d="M0 -115 Q15 -125 15 -110 Q0 -100 0 -115" fill="#22c55e" />
                    <path d="M0 -100 Q-20 -110 -20 -95 Q0 -85 0 -100" fill="#15803d" />
                    <path d="M0 -130 Q20 -140 20 -125 0 -115 0 -130" fill="#22c55e" />
                    <path d="M0 -145 Q-15 -155 -15 -140 Q0 -130 0 -145" fill="#16a34a" />
                  </motion.g>
                </motion.g>
              </g>
              
              <circle cx="100" cy="100" r="8" fill="#3d2b1f" />
            </svg>
          </div>

          {/* Slider Control UNDER the SVG */}
          <div className="branch-slider-card">
            <div className="branch-slider-header">
              <span className="branch-slider-label">Кут відходження</span>
              <span className="branch-slider-value" style={{ color: stateInfo.color }}>
                {angle}°
              </span>
            </div>
            
            <input 
              type="range" 
              min="0" 
              max="120" 
              step="5"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="branch-slider-input"
              style={{ accentColor: stateInfo.color }}
            />
            
            <div className="branch-slider-footer">
              <span>0° (Вертикаль)</span>
              <span>120° (Вниз)</span>
            </div>
          </div>
        </div>

        {/* Right Side: Info Card Centered */}
        <div className="branch-right-column">
          <div className="branch-info-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={stateInfo.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="branch-info-card"
                style={{
                  background: `linear-gradient(135deg, ${stateInfo.color}15 0%, ${stateInfo.color}05 100%)`,
                  border: `2px solid ${stateInfo.color}40`,
                }}
              >
                <div className="branch-info-bg-icon">
                  {stateInfo.icon}
                </div>
                
                <div className="branch-info-content-centered">
                  <div className="branch-info-icon">{stateInfo.icon}</div>
                  <h4 className="branch-info-title" style={{ color: stateInfo.color }}>
                    {stateInfo.title}
                  </h4>
                  <p className="branch-info-desc">
                    {stateInfo.desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .branch-loader {
          height: 400px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-muted);
        }

        .branch-diagram-wrapper {
          width: 100%;
          max-width: 900px;
          margin: 4rem auto;
          font-family: var(--font-body);
        }

        .branch-header {
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

        .branch-title {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          color: var(--color-primary-dark);
          margin: 0 0 0.5rem 0;
          font-weight: 600;
        }

        .branch-subtitle {
          color: var(--color-text-secondary);
          font-size: 0.95rem;
          max-width: 500px;
          margin: 0 auto;
        }

        .branch-container {
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
          .branch-container {
            flex-direction: row;
            align-items: stretch;
            padding: 2.5rem;
            gap: 3rem;
          }
        }

        .branch-left-column {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .branch-left-column {
            width: 50%;
          }
        }

        .branch-svg-container {
          position: relative;
          width: 100%;
          max-width: 400px;
          aspect-ratio: 1 / 1;
          background: var(--color-surface-2);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.03);
          border: 1px solid var(--color-border);
          overflow: visible;
        }

        .branch-svg {
          width: 120%;
          height: 120%;
          overflow: visible;
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
        }

        .branch-slider-card {
          background: var(--color-surface-2);
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          width: 100%;
        }

        .branch-slider-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .branch-slider-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text-secondary);
        }

        .branch-slider-value {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .branch-slider-input {
          width: 100%;
          height: 6px;
          background: var(--color-border);
          border-radius: 4px;
          appearance: none;
          cursor: pointer;
          outline: none;
        }

        .branch-slider-input::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: currentColor;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        .branch-slider-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 0.75rem;
          font-size: 0.8rem;
          color: var(--color-muted);
        }

        .branch-right-column {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        @media (min-width: 768px) {
          .branch-right-column {
            width: 50%;
          }
        }

        .branch-info-wrapper {
          width: 100%;
        }

        .branch-info-card {
          position: relative;
          padding: 2.5rem 2rem;
          border-radius: var(--radius-xl);
          backdrop-filter: blur(10px);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          min-height: 250px;
        }

        .branch-info-bg-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 10rem;
          opacity: 0.05;
          filter: blur(2px);
          pointer-events: none;
        }

        .branch-info-content-centered {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .branch-info-icon {
          font-size: 3rem;
          line-height: 1;
        }

        .branch-info-title {
          font-size: 1.4rem;
          font-weight: 800;
          margin: 0;
          font-family: var(--font-sans);
          letter-spacing: 0.02em;
        }

        .branch-info-desc {
          margin: 0;
          color: var(--color-text-secondary);
          line-height: 1.6;
          font-weight: 500;
          font-size: 1.05rem;
          max-width: 250px;
        }
      `}} />
    </div>
  );
}
