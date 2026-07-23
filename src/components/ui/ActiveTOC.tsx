'use client';

import React, { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export const ActiveTOC = ({ headings }: { headings: Heading[] }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px', threshold: 0.1 }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  return (
    <>
      <div className="toc-title">На цій сторінці</div>
      <ul className="toc-list">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <li 
              key={h.id} 
              className="toc-item" 
              style={{ 
                paddingLeft: h.level > 2 ? "0.75rem" : 0,
                position: 'relative'
              }}
            >
              <a 
                href={`#${h.id}`} 
                className={isActive ? "active-toc-link" : ""}
                style={{ 
                  color: isActive ? 'var(--color-primary-dark)' : 'var(--color-muted)',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all 0.3s ease'
                }}
              >
                {h.text}
              </a>
              {isActive && (
                <div style={{
                  position: 'absolute',
                  left: h.level > 2 ? '0' : '-12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-accent)',
                  boxShadow: '0 0 8px var(--color-accent)'
                }} />
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};
