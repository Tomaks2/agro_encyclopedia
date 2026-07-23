"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div 
      aria-hidden="true"
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '3px',
        background: 'transparent', zIndex: 9999, pointerEvents: 'none'
      }}
    >
      <div
        style={{ 
          height: '100%', width: `${progress}%`,
          background: 'linear-gradient(to right, var(--color-accent-light), var(--color-accent))',
          boxShadow: '0 0 8px rgba(184, 147, 62, 0.6)',
          transition: 'width 0.1s ease-out',
          borderTopRightRadius: '2px', borderBottomRightRadius: '2px'
        }}
      />
    </div>
  );
}
