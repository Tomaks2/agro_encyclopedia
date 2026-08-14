/**
 * PrintButton — кнопка «Друк / Зберегти як PDF» для календарів і розділів.
 *
 * Використання у MDX:
 *   <PrintButton />
 * (додати PrintButton до списку компонентів у getMdxComponents
 *  і до імпорту page.tsx, аналогічно LightboxImage)
 *
 * У календарях (16-kalendar, 15-zakhyst_kalendar) кожен блок місяця
 * рекомендується позначити атрибутом data-calendar-month, тоді print.css
 * розірве їх на окремі сторінки А4.
 */
'use client';

import React from 'react';

export default function PrintButton({ label = "🖨️ Друк / зберегти як PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="mb-8 mt-4 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold"
      style={{
        background: "var(--color-surface, #f7f6f3)",
        borderColor: "var(--color-border, #e5e2dc)",
        color: "var(--color-primary-dark, #14301f)",
      }}
      data-no-print="true"
    >
      {label}
    </button>
  );
}
