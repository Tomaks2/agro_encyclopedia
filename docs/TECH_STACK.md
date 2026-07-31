# 🛠 Технічний стек АгроЕнциклопедії

## Core Stack

| Технологія | Версія | Роль |
|------------|--------|------|
| **Next.js** | 16.2.9 | Фреймворк (App Router + Turbopack) |
| **React** | 19.2.4 | UI |
| **TypeScript** | ^5 | Мова програмування |
| **next-intl** | ^4.13 | Інтернаціоналізація (uk/en) |
| **next-mdx-remote** | ^6 | Рендеринг Markdown → React |
| **gray-matter** | ^4 | Парсинг frontmatter у MD файлах |
| **Serwist (@serwist/next)** | ^9 | PWA / Service Worker |
| **Framer Motion** | ^12 | Анімації |
| **Fuse.js** | ^7 | Клієнтський fuzzy-пошук |

---

## Архітектура сайту

```
src/
├── app/
│   ├── [locale]/                    ← Locale wrapper (uk / en)
│   │   ├── page.tsx                 ← Головна сторінка
│   │   ├── [culture]/
│   │   │   ├── page.tsx             ← Сторінка культури (список розділів)
│   │   │   └── [section]/
│   │   │       └── page.tsx         ← Сторінка розділу (MDX рендер)
│   │   ├── catalog/page.tsx         ← Каталог усіх культур
│   │   ├── calendar/page.tsx        ← Агрономічний календар
│   │   └── diagnostics/page.tsx     ← Сторінка діагностики
│   └── sw.ts                        ← Service Worker (Serwist)
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx               ← Навігація + пошук (Fuse.js)
│   │   └── Footer.tsx               ← Нижня навігація
│   └── ui/
│       ├── HeroCover.tsx            ← Банер розділу з фото
│       ├── TableOfContents.tsx      ← Автонавігація по H2/H3
│       ├── Callout.tsx              ← Інформаційні блоки (tip/warning/note)
│       ├── InfoBlock.tsx            ← Преміальні блоки (gold/green/blue)
│       ├── FilterTabs.tsx           ← Вкладки (Spring/Summer/Autumn/Winter)
│       ├── NextChapter.tsx          ← Кнопка наступного розділу
│       ├── ScrollReveal.tsx         ← Анімація появи при скролі
│       └── ...                      ← Інші UI компоненти
│
└── lib/
    └── cultures.ts                  ← Завантаження meta.json + MD файлів
```

---

## Контентна архітектура

```
content/cultures/[slug]/
├── meta.json           ← Метадані (назва, опис, список розділів, кольори)
├── 01-[slug].md        ← Перший розділ
├── 02-[slug].md        ← Другий розділ
└── ...                 ← До 18 розділів
```

**Автодискавері:** `src/lib/cultures.ts` автоматично читає всі папки в `content/cultures/` та знаходить `meta.json`. Нові культури додаються без змін у код.

---

## Генерація статичних сторінок (SSG)

Маршрут `/[locale]/[culture]/[section]` генерується статично через `generateStaticParams()`:

```typescript
// Для кожної культури + кожного розділу + кожної мови
// генерується окремий HTML-файл під час npm run build
```

**Загальна кількість статичних сторінок:** ~738 (38 культур × ~9 розділів × 2 мови + головні сторінки)

---

## Пошук

Пошук реалізований через **Fuse.js** (fuzzy-search на стороні клієнта):

1. Під час `npm run build` запускається `scripts/generate-search-index.js`
2. Скрипт читає всі MD-файли та генерує `public/search-index.json`
3. При відкритті сайту Header завантажує цей JSON
4. Fuse.js індексує його в пам'яті та відповідає на пошукові запити

---

## Мовна підтримка (i18n)

Реалізована через **next-intl**:

- `/uk/*` — Українська (основна)
- `/en/*` — English (інтерфейс перекладено, контент — опційно)
- Переклади: `messages/uk.json`, `messages/en.json`
- Middleware: `middleware.ts` → автоматичний редирект на `/uk`

---

## PWA (Progressive Web App)

Реалізовано через **Serwist**:
- Кешування статичних ресурсів (HTML, CSS, JS, зображення)
- Підтримка офлайн-режиму (корисно в полі/саду без інтернету)
- Service Worker генерується автоматично при білді

---

## Дизайн-система

### Кольори (CSS змінні)

```css
--color-primary: темно-зелений
--color-accent: золотисто-жовтий
--color-surface: напівпрозорий фон (glassmorphism)
```

### Шрифти

- `var(--font-serif)` — Cormorant Garamond (заголовки)
- `var(--font-body)` — Lora (основний текст)
- `var(--font-mono)` — JetBrains Mono (технічні деталі)

### Компоненти MDX (правила використання)

| Компонент | Використання | Заборонено |
|-----------|-------------|------------|
| `<HeroCover>` | Початок кожного розділу | — |
| `<TableOfContents>` | Після HeroCover | — |
| `<Callout type="tip/warning/note">` | Поради, попередження | Вкладати один в одний |
| `<InfoBlock type="gold/green/blue">` | Важливі блоки | — |
| `<FilterTabs>` | Сезонні календарі | — |
| `<NextChapter>` | Кінець кожного розділу | Останній розділ |
| `<PremiumProcess>` | ❌ **ЗАБОРОНЕНО** | Завжди |
| `<ComparisonTable>` | ❌ **ЗАБОРОНЕНО** | Завжди |

**Таблиці** — виключно Markdown: `| Кол 1 | Кол 2 |`  
**Покрокові алгоритми** — нумеровані списки всередині `<InfoBlock type="gold">`
