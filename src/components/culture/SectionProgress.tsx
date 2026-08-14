/**
 * SectionProgress — прогрес-стрічка між розділами культури.
 *
 * Компонент показує поточний розділ серед усіх розділів культури (з meta.json),
 * підсвічує пройдений шлях і дозволяє перейти на будь-який розділ одним кліком.
 * Ідеально розміщується ПІД навігацією prev/next на сторінці розділу
 * (src/app/[locale]/[culture]/[section]/page.tsx) — наприклад, після блоку
 * `nav aria-label="Навігація між розділами"`.
 *
 * Використання:
 *   import SectionProgress from "@/components/culture/SectionProgress";
 *   ...
 *   <SectionProgress
 *     sections={culture.sections}
 *     currentSlug={sectionSlug}
 *     locale={locale}
 *     cultureSlug={cultureSlug}
 *     accentColor={culture.color}
 *   />
 */
'use client';

import React from 'react';
import Link from 'next/link';

interface SectionProgressItem {
  slug: string;
  uk: { title: string };
  en: { title: string };
}

interface SectionProgressProps {
  sections: SectionProgressItem[];
  currentSlug: string;
  locale: string;
  cultureSlug: string;
  accentColor?: string;
}

export default function SectionProgress({
  sections,
  currentSlug,
  locale,
  cultureSlug,
  accentColor = "#1a5632",
}: SectionProgressProps) {
  const currentIndex = sections.findIndex((s) => s.slug === currentSlug);
  const total = sections.length;
  if (currentIndex === -1) return null;

  // Прогрес: скільки розділів пройдено (включно з поточним)
  const progressPercent = Math.round(((currentIndex + 1) / total) * 100);

  return (
    <div
      className="mt-8 rounded-xl border p-5"
      style={{
        background: "var(--color-surface, #f7f6f3)",
        borderColor: "var(--color-border, #e5e2dc)",
      }}
      aria-label="Прогрес читання культури"
    >
      {/* Заголовок + відсоток */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: "var(--color-muted, #6b6760)" }}
        >
          Прогрес по культурі
        </span>
        <span
          className="text-sm font-bold tabular-nums"
          style={{ color: accentColor }}
        >
          {currentIndex + 1} / {total} • {progressPercent}%
        </span>
      </div>

      {/* Лінійка прогресу */}
      <div
        className="relative h-2 w-full rounded-full overflow-hidden"
        style={{ background: "var(--color-border, #e5e2dc)" }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${progressPercent}%`,
            background: `linear-gradient(90deg, ${accentColor}88, ${accentColor})`,
          }}
        />
      </div>

      {/* Кропки-розділи */}
      <div className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {sections.map((s, i) => {
          const isDone = i < currentIndex;
          const isCurrent = i === currentIndex;
          const title = locale === "en" ? s.en.title : s.uk.title;
          return (
            <Link
              key={s.slug}
              href={`/${locale}/${cultureSlug}/${s.slug}`}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm no-underline"
              style={{
                background: isCurrent ? `${accentColor}18` : "transparent",
                borderLeft: isCurrent
                  ? `3px solid ${accentColor}`
                  : "3px solid transparent",
                color: isDone
                  ? "var(--color-muted, #6b6760)"
                  : isCurrent
                    ? accentColor
                    : "var(--color-text, #2b2824)",
                fontWeight: isCurrent ? 700 : 400,
                transition: "background 0.15s ease",
              }}
              aria-current={isCurrent ? "step" : undefined}
            >
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                style={{
                  background: isDone
                    ? accentColor
                    : isCurrent
                      ? accentColor
                      : "var(--color-border, #e5e2dc)",
                }}
              >
                {isDone ? "✓" : i + 1}
              </span>
              <span className="truncate">
                {title}
                {isCurrent && (
                  <span className="ml-1.5 text-[10px] font-bold uppercase tracking-wide opacity-70">
                    (читаєте)
                  </span>
                )}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
