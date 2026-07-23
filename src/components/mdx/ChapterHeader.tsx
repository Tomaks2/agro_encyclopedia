import React from 'react';

export const ChapterHeader = ({ chapter, title, subtitle }: { chapter: string, title: string, subtitle: string }) => {
  return (
    <div className="chapter-header" style={{ 
      textAlign: 'center', 
      margin: '4rem 0 3rem 0', 
      paddingBottom: '2.5rem', 
      borderBottom: '1px solid var(--color-border)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h3 style={{ 
        fontFamily: 'var(--font-sans)', 
        color: 'var(--color-accent-dark)', 
        fontSize: '1rem', 
        letterSpacing: '0.15em', 
        textTransform: 'uppercase', 
        marginBottom: '1rem',
        fontWeight: 600
      }}>
        {chapter}
      </h3>
      <h1 style={{ 
        fontFamily: 'var(--font-serif)', 
        color: 'var(--color-primary-dark)', 
        fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
        lineHeight: 1.2, 
        marginBottom: '1.5rem', 
        fontWeight: 700 
      }}>
        {title}
      </h1>
      <p style={{ 
        fontFamily: 'var(--font-serif)', 
        color: 'var(--color-text-secondary)', 
        fontSize: '1.4rem', 
        fontStyle: 'italic', 
        maxWidth: '700px', 
        margin: '0 auto',
        lineHeight: 1.6
      }}>
        {subtitle}
      </p>
    </div>
  );
};
