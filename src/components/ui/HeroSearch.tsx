"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function HeroSearch() {
  const t = useTranslations("home");
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      sessionStorage.setItem("initialSearch", query.trim());
    } else {
      sessionStorage.removeItem("initialSearch");
    }
    window.dispatchEvent(new CustomEvent('open-search'));
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .hero-search-form {
          margin: 0 auto 3rem;
          max-width: 580px;
          width: 100%;
          padding: 0.375rem 0.375rem 0.375rem 1.25rem;
          border-radius: 999px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        .hero-search-icon { color: rgba(255,255,255,0.7); flex-shrink: 0; }
        .hero-search-input {
          flex: 1;
          min-width: 0;
          background: transparent;
          border: none;
          color: white;
          padding: 0.6rem 0;
          font-size: 1rem;
          outline: none;
          box-shadow: none;
          font-family: inherit;
        }
        .hero-search-input::placeholder { color: rgba(255,255,255,0.55); }
        .hero-search-btn {
          flex-shrink: 0;
          background: var(--color-accent);
          color: var(--color-primary-dark);
          padding: 0.65rem 1.5rem;
          border-radius: 999px;
          font-weight: 700;
          font-size: 0.9rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          font-family: inherit;
        }
        .hero-search-btn:hover { filter: brightness(1.1); transform: scale(1.02); }
        @media (max-width: 480px) {
          .hero-search-form {
            padding: 0.3rem 0.3rem 0.3rem 1rem;
            margin-bottom: 2rem;
          }
          .hero-search-input { font-size: 0.9rem; }
          .hero-search-btn { padding: 0.6rem 1.1rem; font-size: 0.82rem; }
        }
      `}} />
      <form
        onSubmit={handleSearch}
        className="hero-search-form animate-fade-in-up delay-300"
        role="search"
        aria-label="Пошук по енциклопедії"
      >
        <svg className="hero-search-icon" width="18" height="18" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="Пошук: яблуня, парша, щеплення..."
          aria-label="Пошук по енциклопедії"
          className="hero-search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="hero-search-btn">
          Пошук
        </button>
      </form>
    </>
  );
}
