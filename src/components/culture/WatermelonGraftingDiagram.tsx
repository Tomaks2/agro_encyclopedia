"use client";

import React, { useState } from 'react';

export default function WatermelonGraftingDiagram() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  // SVG стрілочка вниз
  const ArrowDown = () => (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-border-dark, #9ca3af)' }}>
        <line x1="12" y1="4" x2="12" y2="20"></line>
        <polyline points="19 13 12 20 5 13"></polyline>
      </svg>
    </div>
  );

  return (
    <div className="grafting-diagram-container" style={{
      margin: '2.5rem 0',
      padding: '2.5rem 2rem',
      backgroundColor: '#fafaf9',
      border: '1px solid var(--color-border, #e5e7eb)',
      borderRadius: 'var(--radius-xl, 1rem)',
      fontFamily: 'var(--font-body, sans-serif)',
      boxShadow: 'var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05))',
    }}>
      <h3 style={{
        textAlign: 'center',
        fontFamily: 'var(--font-serif, serif)',
        color: 'var(--color-primary-dark, #2a3a29)',
        marginBottom: '3rem',
        fontSize: '1.4rem',
        fontWeight: 700
      }}>Схема язичкового щеплення (Tongue Grafting)</h3>

      {/* Крок 1: Підготовка */}
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        
        {/* Прищепа */}
        <div style={{ flex: '1', minWidth: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: '100%',
            backgroundColor: 'white',
            padding: '1.25rem',
            borderRadius: '0.75rem',
            borderTop: '4px solid var(--color-primary, #4a6741)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            textAlign: 'center'
          }}>
            <h4 style={{ margin: '0 0 0.25rem', color: 'var(--color-text)', fontSize: '1.1rem', fontWeight: 600 }}>Прищепа: Кавун</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>(7 днів)</p>
          </div>
          
          <ArrowDown />
          
          <div style={{
            width: '90%',
            backgroundColor: 'rgba(74, 103, 65, 0.05)',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px dashed var(--color-primary, #4a6741)',
            textAlign: 'center',
            fontSize: '0.95rem',
            color: 'var(--color-text)'
          }}>
            Косий зріз-язичок <br/><strong>ЗНИЗУ вгору</strong>
          </div>
        </div>

        {/* Підщепа */}
        <div style={{ flex: '1', minWidth: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: '100%',
            backgroundColor: 'white',
            padding: '1.25rem',
            borderRadius: '0.75rem',
            borderTop: '4px solid var(--color-accent, #b8933e)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            textAlign: 'center'
          }}>
            <h4 style={{ margin: '0 0 0.25rem', color: 'var(--color-text)', fontSize: '1.1rem', fontWeight: 600 }}>Підщепа: Лагенарія</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>(9 днів)</p>
          </div>
          
          <ArrowDown />
          
          <div style={{
            width: '90%',
            backgroundColor: 'rgba(184, 147, 62, 0.05)',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px dashed var(--color-accent, #b8933e)',
            textAlign: 'center',
            fontSize: '0.95rem',
            color: 'var(--color-text)'
          }}>
            Косий зріз-язичок <br/><strong>ЗГОРИ вниз</strong>
          </div>
        </div>
      </div>

      {/* З'єднання ліній */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', position: 'relative', height: '60px' }}>
        <svg width="100%" height="60" style={{ position: 'absolute', top: 0 }}>
          {/* Ліва лінія */}
          <path d="M 25% 0 L 25% 30 L 50% 30 L 50% 60" fill="none" stroke="var(--color-border-dark, #9ca3af)" strokeWidth="2" />
          {/* Права лінія */}
          <path d="M 75% 0 L 75% 30 L 50% 30" fill="none" stroke="var(--color-border-dark, #9ca3af)" strokeWidth="2" />
          {/* Стрілочка вниз посередині */}
          <polygon points="50%,60 49%,53 51%,53" fill="var(--color-border-dark, #9ca3af)" />
        </svg>
      </div>

      {/* Крок 3: З'єднання */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div 
          style={{
            backgroundColor: hoveredStep === 3 ? 'var(--color-primary, #4a6741)' : 'white',
            color: hoveredStep === 3 ? 'white' : 'var(--color-primary-dark, #2a3a29)',
            padding: '1.25rem 2.5rem',
            borderRadius: '9999px',
            border: hoveredStep === 3 ? '2px solid var(--color-primary)' : '2px solid var(--color-border-dark, #9ca3af)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            fontWeight: 700,
            fontSize: '1.1rem',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            textAlign: 'center',
            transform: hoveredStep === 3 ? 'translateY(-2px)' : 'none'
          }}
          onMouseEnter={() => setHoveredStep(3)}
          onMouseLeave={() => setHoveredStep(null)}
        >
          З'єднання язичків + Фіксація кліпсою
        </div>
      </div>
      
      <ArrowDown />

      {/* Крок 4: Стратифікація */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
            backgroundColor: 'white',
            padding: '1rem 2rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--color-border, #e5e7eb)',
            color: 'var(--color-text-secondary)',
            fontSize: '0.95rem',
            textAlign: 'center'
        }}>
          ⏱ Стратифікація 5 днів при 100% вологості
        </div>
      </div>
      
      <ArrowDown />

      {/* Крок 5: Відрізання */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
            backgroundColor: '#fef2f2',
            color: '#991b1b',
            padding: '1rem 2rem',
            borderRadius: '9999px',
            border: '2px dashed #f87171',
            fontWeight: 600,
            textAlign: 'center'
        }}>
          ✂️ Відрізання власного кореня кавуна
        </div>
      </div>

    </div>
  );
}
