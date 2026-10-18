/* eslint-disable @next/next/no-img-element -- lightbox content is a user-provided/static asset path. */
'use client';
import React from 'react';

interface LightboxImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function LightboxImage({ src, alt, className }: LightboxImageProps) {
  return (
    <figure className={`my-10 w-full ${className || ''}`} style={{ display: 'block', width: '100%', textAlign: 'center' }}>
      <img 
        src={src} 
        alt={alt || "Зображення"} 
        className="max-w-full h-auto object-contain rounded-lg shadow-sm"
        style={{ maxHeight: 'none', margin: '0 auto', display: 'block' }}
      />
      {alt && (
        <figcaption 
          className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 px-4"
          style={{ fontStyle: 'italic', display: 'block', textAlign: 'center', marginTop: '12px' }}
        >
          {alt}
        </figcaption>
      )}
    </figure>
  );
}
