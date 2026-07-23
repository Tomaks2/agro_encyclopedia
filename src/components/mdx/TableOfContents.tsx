'use client';
import React, { useState, useEffect } from 'react';

export default function TableOfContents() {
  const [headings, setHeadings] = useState<{ id: string, text: string, level: number }[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3'))
      .filter(el => el.id)
      .map(el => ({
        id: el.id,
        text: el.textContent || '',
        level: el.tagName === 'H2' ? 2 : 3
      }));
    setHeadings(elements);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );

    document.querySelectorAll('h2, h3').forEach(el => {
      if (el.id) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="toc-container">
      <h4 className="toc-title">Зміст сторінки</h4>
      <nav className="toc-nav">
        {headings.map(h => {
          let className = "toc-link";
          if (h.level === 3) className += " toc-link-h3";
          if (activeId === h.id) className += " toc-link-active";
          
          return (
            <a
              key={h.id}
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(h.id);
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className={className}
            >
              {h.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
}