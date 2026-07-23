import React from 'react';

interface PullQuoteProps {
  children: React.ReactNode;
  author?: string;
  align?: 'left' | 'right' | 'center';
}

export const PullQuote = ({ children, author, align = 'center' }: PullQuoteProps) => {
  const alignStyles = {
    left: {
      float: 'left' as const,
      marginRight: '2rem',
      marginLeft: '-2rem',
      maxWidth: '45%',
    },
    right: {
      float: 'right' as const,
      marginLeft: '2rem',
      marginRight: '-2rem',
      maxWidth: '45%',
    },
    center: {
      margin: '3.5rem auto',
      maxWidth: '85%',
      textAlign: 'center' as const,
    },
  };

  const currentAlign = alignStyles[align];

  return (
    <aside 
      style={{
        ...currentAlign,
        position: 'relative',
        padding: align === 'center' ? '2rem 0' : '1.5rem 0',
        clear: align === 'center' ? 'both' : 'none',
      }}
      className="pull-quote"
    >
      <div 
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: align === 'center' ? 'clamp(1.6rem, 3vw, 2.2rem)' : '1.5rem',
          fontStyle: 'italic',
          fontWeight: 500,
          color: 'var(--color-primary-dark)',
          lineHeight: 1.4,
          position: 'relative',
          zIndex: 2,
        }}
      >
        <span style={{ 
          position: 'absolute', 
          top: '-1rem', 
          left: align === 'center' ? '50%' : '0', 
          transform: align === 'center' ? 'translateX(-50%)' : 'none',
          fontSize: '6rem', 
          color: 'var(--color-accent)', 
          opacity: 0.15,
          zIndex: -1,
          lineHeight: 1,
          fontFamily: 'serif'
        }}>
          &ldquo;
        </span>
        {children}
      </div>
      
      {author && (
        <div style={{
          marginTop: '1.25rem',
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-accent-dark)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: align === 'center' ? 'center' : 'flex-start',
          gap: '12px'
        }}>
          <span style={{ width: '30px', height: '1px', background: 'var(--color-accent)' }}></span>
          {author}
        </div>
      )}
    </aside>
  );
};
