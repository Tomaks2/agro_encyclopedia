import React from 'react';
import { chemicalsData, ChemicalInfo } from '@/data/chemicals';

export default function ChemicalsDirectory() {
  const getRowStyle = (chemical: ChemicalInfo) => {
    switch (chemical.toxicityClass.split(' ')[0]) {
      case 'II':
        return 'bg-red-50 dark:bg-red-900/20';
      case 'III':
        return 'bg-orange-50 dark:bg-orange-900/20';
      case 'IV':
        return 'bg-green-50 dark:bg-green-900/20';
      default:
        return '';
    }
  };

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-[var(--color-border)] shadow-sm">
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] p-4 text-white">
        <h3 className="font-bold text-lg m-0 flex items-center gap-2">
          🧪 ДОВІДНИК ПРЕПАРАТІВ
        </h3>
        <p className="text-sm opacity-90 m-0 mt-1">
          Зведена база хімічних та біологічних засобів (Оновлено: 2026-07-12)
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] uppercase font-semibold text-xs border-b border-[var(--color-border)]">
            <tr>
              <th className="px-4 py-3">Препарат</th>
              <th className="px-4 py-3">Діюча речовина</th>
              <th className="px-4 py-3 text-center">Строк (днів)</th>
              <th className="px-4 py-3">Клас токсичності</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {chemicalsData.map((chemical) => (
              <tr key={chemical.id} className={`hover:bg-[var(--color-bg-secondary)] transition-colors ${getRowStyle(chemical)}`}>
                <td className="px-4 py-3 font-medium text-[var(--color-text)]">
                  {chemical.name}
                  {chemical.type === 'bio' && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      БІО
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-[var(--color-text-secondary)]">{chemical.activeSubstance}</td>
                <td className="px-4 py-3 text-center font-bold text-[var(--color-text)]">
                  {chemical.waitingPeriodDays}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${
                    chemical.toxicityClass.startsWith('II') ? 'text-red-700 bg-red-100/50 dark:text-red-400' :
                    chemical.toxicityClass.startsWith('III') ? 'text-orange-700 bg-orange-100/50 dark:text-orange-400' :
                    'text-green-700 bg-green-100/50 dark:text-green-400'
                  }`}>
                    {chemical.toxicityClass}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
