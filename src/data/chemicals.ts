export interface ChemicalInfo {
  id: string;
  name: string;
  activeSubstance: string;
  toxicityClass: string;
  waitingPeriodDays: number;
  type: 'fungicide' | 'insecticide' | 'acaricide' | 'bio' | 'other';
  notes?: string;
  lastVerifiedAt?: string;
}

export const chemicalsData: ChemicalInfo[] = [
  {
    id: "enzhio",
    name: "Енжіо 247SC",
    activeSubstance: "Лямбда-цигалотрин + тіаметоксам",
    toxicityClass: "II (небезпечний)",
    waitingPeriodDays: 14,
    type: "insecticide",
    lastVerifiedAt: "2026-07-12"
  },
  {
    id: "movento",
    name: "Мовенто 100SC",
    activeSubstance: "Спіротетрамат",
    toxicityClass: "III",
    waitingPeriodDays: 14,
    type: "insecticide",
    lastVerifiedAt: "2026-07-12"
  },
  {
    id: "prokleim",
    name: "Проклейм 5SG",
    activeSubstance: "Емамектин бензоат",
    toxicityClass: "III",
    waitingPeriodDays: 7,
    type: "insecticide",
    lastVerifiedAt: "2026-07-12"
  },
  {
    id: "koragen",
    name: "Кораген 200SC",
    activeSubstance: "Хлорантраніліпрол",
    toxicityClass: "IV (малонебезпечний)",
    waitingPeriodDays: 14,
    type: "insecticide",
    lastVerifiedAt: "2026-07-12"
  },
  {
    id: "vertimek",
    name: "Вертімек 018EC",
    activeSubstance: "Абамектин",
    toxicityClass: "II",
    waitingPeriodDays: 3,
    type: "acaricide",
    lastVerifiedAt: "2026-07-12"
  },
  {
    id: "aktofit",
    name: "Актофіт 0,2%",
    activeSubstance: "Аверсектин С (біо)",
    toxicityClass: "IV",
    waitingPeriodDays: 2,
    type: "bio",
    lastVerifiedAt: "2026-07-12"
  },
  {
    id: "lepidocid",
    name: "Лепідоцид",
    activeSubstance: "Bacillus thuringiensis",
    toxicityClass: "IV",
    waitingPeriodDays: 1,
    type: "bio",
    lastVerifiedAt: "2026-07-12"
  },
  {
    id: "fitosporin",
    name: "Фітоспорин-М",
    activeSubstance: "Bacillus subtilis",
    toxicityClass: "IV",
    waitingPeriodDays: 0,
    type: "bio",
    lastVerifiedAt: "2026-07-12"
  },
  {
    id: "decis",
    name: "Децис Профі",
    activeSubstance: "Дельтаметрин",
    toxicityClass: "II",
    waitingPeriodDays: 20,
    type: "insecticide",
    lastVerifiedAt: "2026-07-12"
  },
  {
    id: "kosaid",
    name: "Косайд 2000",
    activeSubstance: "Міді гідроксид",
    toxicityClass: "III",
    waitingPeriodDays: 14,
    type: "fungicide",
    lastVerifiedAt: "2026-07-12"
  },
  {
    id: "skor",
    name: "Скор 250EC",
    activeSubstance: "Дифеноконазол",
    toxicityClass: "III",
    waitingPeriodDays: 20,
    type: "fungicide",
    lastVerifiedAt: "2026-07-12"
  },
  {
    id: "topaz",
    name: "Топаз 100EC",
    activeSubstance: "Пенконазол",
    toxicityClass: "III",
    waitingPeriodDays: 20,
    type: "fungicide",
    lastVerifiedAt: "2026-07-12"
  },
  {
    id: "aktara",
    name: "Актара 25WG",
    activeSubstance: "Тіаметоксам",
    toxicityClass: "III",
    waitingPeriodDays: 14,
    type: "insecticide",
    lastVerifiedAt: "2026-07-12"
  },
  {
    id: "spintor",
    name: "Спінтор 240SC",
    activeSubstance: "Спіносад",
    toxicityClass: "III",
    waitingPeriodDays: 7,
    type: "insecticide",
    lastVerifiedAt: "2026-07-12"
  },
  {
    id: "bitoksibacilin",
    name: "Бітоксибацилін",
    activeSubstance: "Bacillus thuringiensis",
    toxicityClass: "IV",
    waitingPeriodDays: 2,
    type: "bio",
    lastVerifiedAt: "2026-07-12"
  }
];
