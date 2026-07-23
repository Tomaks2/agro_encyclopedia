'use client';

import React, { useState } from 'react';

type DiagnosticMode = 'diseases' | 'pests';

type Symptom = {
  id: string;
  label: string;
  targetId: string;
  hint: string;
};

const symptomsByMode: Record<DiagnosticMode, Symptom[]> = {
  diseases: [
    { id: 'spots', label: 'Плями на листі', targetId: 'іржа-груші', hint: 'Може бути іржа або парша' },
    { id: 'black', label: 'Почорніння листя та пагонів', targetId: 'бактеріальний-опік', hint: 'Ймовірно бактеріальний опік' },
    { id: 'white', label: 'Білий наліт', targetId: 'борошниста-роса', hint: 'Борошниста роса' },
    { id: 'fruits', label: 'Гниють плоди', targetId: 'моніліоз-плодова-гниль', hint: 'Моніліоз' },
  ],
  pests: [
    { id: 'sticky', label: 'Липкий наліт або дрібні комахи', targetId: 'грушева-медяниця-листоблішка', hint: 'Медяниця або попелиця' },
    { id: 'galls', label: 'Пухирці на листі', targetId: 'галовий-кліщ-груші', hint: 'Галовий кліщ' },
    { id: 'caterpillars', label: 'Скручене листя з гусінню', targetId: 'грушева-листовійка', hint: 'Листовійка' },
    { id: 'fruits', label: 'Червиві плоди', targetId: 'грушева-плодожерка', hint: 'Плодожерка' },
  ],
};

export default function DiagnosticTool({ mode = 'diseases' }: { mode?: DiagnosticMode }) {
  const [selected, setSelected] = useState<string | null>(null);
  const symptoms = symptomsByMode[mode];

  const handleSelect = (id: string, targetId: string) => {
    setSelected(id);
    window.setTimeout(() => {
      const element = document.getElementById(targetId);
      if (!element) return;

      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className="diagnostic-container">
      <h3 className="diagnostic-title"><span>🔍</span> Що з моєю грушею? (Швидка діагностика)</h3>
      <div className="diagnostic-buttons">
        {symptoms.map((symptom) => (
          <button
            key={symptom.id}
            onClick={() => handleSelect(symptom.id, symptom.targetId)}
            className={`diagnostic-btn ${selected === symptom.id ? 'diagnostic-btn-active' : ''}`}
          >
            {symptom.label}
          </button>
        ))}
      </div>
      {selected && (
        <div className="diagnostic-result">
          💡 Підказка: <strong>{symptoms.find((symptom) => symptom.id === selected)?.hint}</strong>. Переміщуємо вас до відповідного розділу...
        </div>
      )}
    </div>
  );
}
