'use client';
import React from 'react';

export default function LightboxImage({ src, alt, width, height, className }: any) {
  return (
    <figure className={`my-10 w-full ${className || ''}`} style={{ display: 'block', width: '100%', textAlign: 'center' }}>
      <img 
        src={src} 
        alt={alt || "Зображення"} 
        className="max-w-full h-auto object-contain rounded-lg shadow-sm"
        style={{ maxHeight: '80vh', margin: '0 auto', display: 'block' }}
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
