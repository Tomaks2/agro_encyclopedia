/* eslint-disable @next/next/no-img-element -- HeroCover uses a controlled fallback/static asset path. */
'use client';

import React, { useState } from 'react';

interface HeroCoverProps {
  imageSrc: string;
  fallbackSrc?: string;
  chapter: string;
  title: string;
  subtitle: string;
}

export const HeroCover = ({ imageSrc, fallbackSrc, chapter, title, subtitle }: HeroCoverProps) => {
  const [resolvedSrc, setResolvedSrc] = useState(imageSrc);
  const [imageFailed, setImageFailed] = useState(false);

  const handleImageError = () => {
    if (fallbackSrc && resolvedSrc !== fallbackSrc) {
      setResolvedSrc(fallbackSrc);
      return;
    }
    setImageFailed(true);
  };

  return (
    <div 
      className="mb-12 rounded-2xl overflow-hidden shadow-2xl group border border-[#e5e7eb]" 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: 'min(60vh, 500px)',
        minHeight: '400px',
        backgroundColor: '#2C3825',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '3rem'
      }}
    >
      {/* Background Image */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        {!imageFailed && resolvedSrc ? (
          <img
            src={resolvedSrc}
            alt={title || "Cover image"}
            onError={handleImageError}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, mixBlendMode: 'overlay' }}
            className="transform transition-transform duration-1000 ease-out group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden="true"
            style={{
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at 30% 20%, rgba(200,169,126,0.45), transparent 45%), linear-gradient(135deg, #2d5c47, #17251d)',
            }}
          />
        )}
        <div style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
          mixBlendMode: 'multiply'
        }} />
      </div>

      {/* Content Container */}
      <div style={{ 
        position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', 
        alignItems: 'center', justifyContent: 'flex-end', textAlign: 'center',
        width: '100%', height: '100%', padding: '2rem 1rem', paddingBottom: '2.5rem', overflow: 'hidden'
      }}>
        <span style={{
          display: 'inline-block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.3em',
          fontWeight: 600, color: '#C8A97E', marginBottom: '1rem', border: '1px solid rgba(200, 169, 126, 0.4)',
          padding: '0.375rem 1rem', borderRadius: '9999px', backdropFilter: 'blur(12px)', backgroundColor: 'rgba(0,0,0,0.4)',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          {chapter || "CHAPTER"}
        </span>

        <h1 style={{
          fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)', overflowWrap: 'break-word', wordBreak: 'break-word', fontFamily: 'var(--font-serif)', color: '#F6F4EE',
          marginBottom: '1rem', textShadow: '0 4px 12px rgba(0,0,0,0.5)', lineHeight: 1.1, fontWeight: 'normal'
        }}>
          {title || "TITLE MISSING"}
        </h1>

        <p style={{
          fontSize: 'clamp(1.125rem, 2vw, 1.25rem)', fontFamily: 'var(--font-serif)', fontStyle: 'italic',
          color: 'rgba(255,255,255,0.9)', maxWidth: '42rem', margin: '0 auto', fontWeight: 300,
          lineHeight: 1.6, textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          {subtitle || "Subtitle missing"}
        </p>
      </div>
      
      {/* Decorative Accent */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, width: '100%', height: '4px',
        background: 'linear-gradient(to right, transparent, #C8A97E, transparent)', opacity: 0.7
      }} />
    </div>
  );
};
