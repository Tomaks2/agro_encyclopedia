import React from 'react';

export const EditorialDivider = () => {
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '3.5rem 0',
        gap: '1rem',
        opacity: 0.7
      }}
      aria-hidden="true"
    >
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, var(--color-accent-light))' }} />
      <span style={{ color: 'var(--color-accent)', fontSize: '1.25rem', padding: '0 0.5rem' }}>
        ❦
      </span>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, var(--color-accent-light))' }} />
    </div>
  );
};
