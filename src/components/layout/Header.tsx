"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const LOCALES = [
  { code: "uk", flag: "🇺🇦", label: "УКР" },
  { code: "en", flag: "🇬🇧", label: "ENG" },
];

export default function Header() {
  const t = useTranslations("nav");
  const ts = useTranslations("site");
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleOpenSearch = () => setSearchOpen(true);
    window.addEventListener('open-search', handleOpenSearch);
    return () => window.removeEventListener('open-search', handleOpenSearch);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/diagnostics`, label: t("diagnostics") },
    { href: `/${locale}/calendar`, label: t("calendar") },
  ];

  const getLocaleHref = (targetLocale: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(uk|en)/, "") || "";
    return `/${targetLocale}${pathWithoutLocale}`;
  };

  return (
    <>
      <header className="header">
        <div className="header-inner">
          {/* Logo */}
          <Link href={`/${locale}`} className="header-logo">
            <span className="header-logo-emoji">🌱</span>
            <div>
              <span className="header-logo-text">{ts("name")}</span>
              <span className="header-logo-sub">{ts("tagline")}</span>
            </div>
          </Link>

          {/* Nav */}
          <nav className="header-nav" aria-label="Головна навігація">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`header-nav-link ${pathname === link.href ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="header-actions">
            {/* Search */}
            <button
              className="search-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Відкрити пошук"
              id="search-trigger"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="search-btn-text">
                {useTranslations("home")("search_placeholder").split("...")[0]}...
              </span>
              <kbd className="search-btn-kbd">⌘K</kbd>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language switcher */}
            <div className="lang-switcher" role="group" aria-label="Вибір мови">
              {LOCALES.map((loc) => (
                <Link
                  key={loc.code}
                  href={getLocaleHref(loc.code)}
                  className={`lang-btn ${locale === loc.code ? "active" : ""}`}
                  aria-label={`Перейти на ${loc.label}`}
                >
                  <span>{loc.flag}</span>
                  <span className="lang-label">{loc.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile toggle */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Мобільне меню"
              aria-expanded={menuOpen}
            >
              <span style={{ transform: menuOpen ? "rotate(45deg) translateY(7px)" : undefined }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : undefined }} />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav
            style={{
              background: "var(--color-surface)",
              borderTop: "1px solid var(--color-border)",
              padding: "1rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="header-nav-link"
                style={{ display: "block", padding: "0.6rem 0.9rem" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <SearchModal onClose={() => setSearchOpen(false)} />
      )}
    </>
  );
}

function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const fuseRef = useRef<Fuse<any> | null>(null);

  // Initialize query from sessionStorage if exists
  useEffect(() => {
    const saved = sessionStorage.getItem("initialSearch");
    if (saved) {
      setQuery(saved);
      sessionStorage.removeItem("initialSearch");
    }
  }, []);
  const t = useTranslations("search");
  const locale = useLocale();

  // Load search index on open
  useEffect(() => {
    fetch("/api/search-index")
      .then((res) => res.json())
      .then((data) => {
        fuseRef.current = new Fuse(data, {
          keys: [
            "cultureNameUk", "cultureNameEn",
            "sectionTitleUk", "sectionTitleEn",
            "content"
          ],
          threshold: 0.3,
          ignoreLocation: true,
          minMatchCharLength: 3,
        });
      })
      .catch((err) => console.error("Search index failed to load", err));
  }, []);

  useEffect(() => {
    if (!query || query.length < 2 || !fuseRef.current) {
      setResults([]);
      return;
    }
    setIsSearching(true);
    // Debounce slightly
    const timer = setTimeout(() => {
      const searchResults = fuseRef.current!.search(query, { limit: 8 });
      setResults(searchResults.map(r => r.item));
      setIsSearching(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div
      className="search-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={t("title") || "Пошук"}
    >
      <div className="search-modal animate-fade-in-up" style={{ animationDuration: "0.2s" }}>
        <div className="search-input-wrap">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" style={{ color: "var(--color-muted)", flexShrink: 0 }}>
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            autoFocus
            type="text"
            className="search-input"
            placeholder={useTranslations("home")("search_placeholder") || "Пошук..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", fontSize: "1.25rem", padding: "0.25rem" }}
            aria-label="Закрити"
          >
            ×
          </button>
        </div>

        {query.length > 1 ? (
          <div className="search-results" style={{ padding: "0.5rem", maxHeight: "60vh", overflowY: "auto" }}>
            {isSearching ? (
              <div style={{ padding: "1.5rem", textAlign: "center", color: "var(--color-muted)" }}>Шукаємо...</div>
            ) : results.length > 0 ? (
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                {results.map((item) => {
                  const title = locale === "en" ? item.sectionTitleEn : item.sectionTitleUk;
                  const culture = locale === "en" ? item.cultureNameEn : item.cultureNameUk;
                  // Basic excerpt
                  const snippetIndex = item.content.toLowerCase().indexOf(query.toLowerCase());
                  const start = Math.max(0, snippetIndex - 40);
                  const snippet = item.content.slice(start, start + 100) + "...";

                  return (
                    <li key={item.id}>
                      <Link
                        href={`/${locale}/${item.cultureSlug}/${item.sectionSlug}`}
                        onClick={onClose}
                        style={{
                          display: "block",
                          padding: "0.75rem 1rem",
                          borderRadius: "var(--radius-md)",
                          textDecoration: "none",
                          transition: "background var(--transition-fast)"
                        }}
                        className="hover-bg-alt"
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                          <span style={{ fontWeight: "600", color: "var(--color-primary-dark)" }}>{title}</span>
                          <span style={{ fontSize: "0.75rem", color: "var(--color-muted)", background: "var(--color-bg-alt)", padding: "0.15rem 0.5rem", borderRadius: "999px" }}>
                            {culture}
                          </span>
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: "1.4" }}>
                          {start > 0 ? "..." : ""}{snippet}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div style={{ padding: "2rem", textAlign: "center", color: "var(--color-muted)" }}>
                Нічого не знайдено за запитом &quot;{query}&quot;
              </div>
            )}
          </div>
        ) : (
          <div style={{ padding: "1.5rem", color: "var(--color-muted)", fontSize: "0.875rem", textAlign: "center" }}>
            Почніть друкувати для пошуку по всьому контенту (сорти, хвороби, методи...)
          </div>
        )}
      </div>
    </div>
  );
}
