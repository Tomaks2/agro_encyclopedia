import React from 'react';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

type CalloutType = 'tip' | 'warning' | 'info' | 'success' | 'danger' | 'note';

interface CalloutProps {
  type?: CalloutType | string;
  title?: string;
  children: React.ReactNode;
}

const CALLOUT_CONFIG: Record<string, {
  icon: string;
  defaultTitle: string;
  gradient: string;
  accentColor: string;
  bgColor: string;
  textColor: string;
}> = {
  tip: {
    icon: '🌿',
    defaultTitle: 'Практична порада',
    gradient: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
    accentColor: '#16a34a',
    bgColor: '#f0fdf4',
    textColor: '#14532d',
  },
  warning: {
    icon: '⚠️',
    defaultTitle: 'Важливо знати',
    gradient: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
    accentColor: '#d97706',
    bgColor: '#fffbeb',
    textColor: '#78350f',
  },
  info: {
    icon: '💡',
    defaultTitle: 'Довідка',
    gradient: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
    accentColor: '#2563eb',
    bgColor: '#eff6ff',
    textColor: '#1e3a8a',
  },
  note: {
    icon: '📝',
    defaultTitle: 'Нотатка',
    gradient: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
    accentColor: '#475569',
    bgColor: '#f8fafc',
    textColor: '#334155',
  },
  success: {
    icon: '✅',
    defaultTitle: 'Результат',
    gradient: 'linear-gradient(135deg, #f0fdf4, #bbf7d0)',
    accentColor: '#15803d',
    bgColor: '#f0fdf4',
    textColor: '#14532d',
  },
  danger: {
    icon: '🚨',
    defaultTitle: 'Критично',
    gradient: 'linear-gradient(135deg, #fff1f2, #ffe4e6)',
    accentColor: '#dc2626',
    bgColor: '#fff1f2',
    textColor: '#7f1d1d',
  },
};

export const Callout = ({ type = 'tip', title, children }: CalloutProps) => {
  const cfg = CALLOUT_CONFIG[type as string] || CALLOUT_CONFIG['info'];

  return (
    <RevealOnScroll>
      <div style={{
        margin: '2.5rem 0',
      position: 'relative',
      borderRadius: '16px',
      overflow: 'visible',
    }}>
      {/* Icon badge */}
      <div style={{
        position: 'absolute',
        top: '-14px',
        left: '24px',
        zIndex: 2,
        background: 'white',
        borderRadius: '50px',
        padding: '4px 14px',
        fontSize: '0.8rem',
        fontWeight: 700,
        letterSpacing: '0.06em',
        color: cfg.accentColor,
        border: `2px solid ${cfg.accentColor}`,
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-sans)',
      }}>
        <span>{cfg.icon}</span>
        <span>{title || cfg.defaultTitle}</span>
      </div>

      {/* Card body */}
      <div style={{
        background: cfg.gradient,
        borderRadius: '16px',
        border: `1px solid ${cfg.accentColor}22`,
        borderLeft: `4px solid ${cfg.accentColor}`,
        padding: '2rem 2rem 1.5rem',
        paddingTop: '2.5rem',
        boxShadow: `0 4px 24px ${cfg.accentColor}12`,
      }}>
        <div className="callout-content" style={{
          fontFamily: 'var(--font-sans)',
          color: cfg.textColor,
          lineHeight: 1.8,
          fontSize: '1rem',
          fontStyle: 'italic',
        }}>
          {children}
        </div>
      </div>
    </RevealOnScroll>
  );
};

// InfoBlock — for standalone highlighted tips/rules
interface InfoBlockProps {
  icon?: string;
  title?: string;
  type?: 'gold' | 'green' | 'blue' | 'red';
  children: React.ReactNode;
}

const INFO_COLORS = {
  gold: { bg: 'linear-gradient(135deg, #fffbeb, #fef9c3)', border: '#f59e0b', text: '#713f12' },
  green: { bg: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '#22c55e', text: '#14532d' },
  blue: { bg: 'linear-gradient(135deg, #eff6ff, #dbeafe)', border: '#3b82f6', text: '#1e3a8a' },
  red: { bg: 'linear-gradient(135deg, #fff1f2, #fecdd3)', border: '#ef4444', text: '#7f1d1d' },
  purple: { bg: 'linear-gradient(135deg, #faf5ff, #f3e8ff)', border: '#9333ea', text: '#581c87' },
};

export const InfoBlock = ({ icon = '📌', title, type = 'gold', children }: InfoBlockProps) => {
  const c = INFO_COLORS[type as keyof typeof INFO_COLORS] || INFO_COLORS.gold;
  return (
    <RevealOnScroll>
      <div style={{
        margin: '2rem 0',
      background: c.bg,
      border: `1px solid ${c.border}33`,
      borderLeft: `4px solid ${c.border}`,
      borderRadius: '12px',
      padding: '1.25rem 1.5rem',
      boxShadow: `0 2px 16px ${c.border}10`,
    }}>
      {title && (
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 700,
          fontSize: '1rem',
          color: c.border,
          marginBottom: '0.6rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span>{icon}</span>
          <span>{title}</span>
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `
        .info-content p, .callout-content p {
          font-style: italic !important;
        }
      `}} />
      <div className="info-content" style={{
        fontFamily: 'var(--font-sans)',
        color: c.text,
        lineHeight: 1.75,
        fontSize: '0.95rem',
        fontStyle: 'italic',
      }}>
        {children}
      </div>
    </div>
    </RevealOnScroll>
  );
};
