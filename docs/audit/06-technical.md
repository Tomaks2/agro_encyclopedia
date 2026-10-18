# Незалежний технічний аудит — «Технічна якість»

**Проєкт:** `/home/ubuntu/agro_encyclopedia`  
**Дата аудиту:** 2026-10-15  
**Фокус:** package/lock, lint/build, search-index, TypeScript/Next, компоненти, деплой-ризики.  
**Режим:** read-only аудит; файли проєкту не редагувалися. Звіт єдиний новий артефакт: `/home/ubuntu/audit_reports/06-technical.md`.

## Summary

Стан проєкту **не готовий до надійного clean-deploy**, хоча локальний production build на наявному `node_modules` проходить.

- **Критичний блокер деплою:** `npm ci --dry-run` завершується помилкою `EUSAGE`: `package-lock.json` не синхронізований із `package.json`; у lock відсутній `@swc/helpers@0.5.23`. Отже, чисте встановлення залежностей у CI/на новому середовищі може зупинитися до build.
- **Безпека залежностей:** `npm audit --omit=dev` показав **1 critical, 8 high, 3 moderate**; серед прямих вузлів — `next@16.2.9` (critical) та `@serwist/next` (high). Встановлена версія Next потрапляє у вразливі діапазони advisory, зокрема до `16.3.8`.
- **Lint не є quality gate:** `npm run lint` падає з **34 errors і 14 warnings**. Водночас `npm run build` не запускає lint і тому зелений build не означає зелений pipeline.
- **Build/TypeScript:** `npx tsc --noEmit` проходить; `npm run build` проходить, генеруючи 951 сторінку та 432 записи індексу пошуку. Це підтверджує, що поточний checkout компілюється з уже наявними залежностями, але не скасовує clean-install блокер.
- **Локалізація неповна:** `/en/...` отримує англійські назви/метадані, але body секції читається з того самого `.md` файла, що й український маршрут. HTTP-перевірка `/en/yablunia/posadka` підтвердила наявність українських фраз у сторінці.
- **Пошук має втрати контенту:** `scripts/generate-search-index.js` regex-ом прибирає парні MDX-компоненти разом із їхнім внутрішнім текстом, зокрема `Callout`/`InfoBlock`. Через це пошук не охоплює частину практично найважливішого контенту.
- **Документація роз’їхалася з кодом:** документи заявляють 38 культур/738 сторінок і «видалені» `ComparisonTable`/`PremiumProcess`, тоді як фактично знайдено 42 культури, 432 секції, 951 згенеровану сторінку, а `ComparisonTable` ще імпортується та використовується в контенті.

## Перевірки та факти

Прочитано: `AGENTS.md`, `PROJECT_DOCUMENTATION.md`, `PROJECT_OVERVIEW.md`, `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `middleware.ts`, маршрути App Router, MDX-пайплайн, репрезентативні UI/MDX/diagram-компоненти, генератор індексу та фактичні `content/cultures/**`.

Виконано без редагування коду:

| Перевірка | Результат |
|---|---|
| `npm run lint` | **fail** — 34 errors, 14 warnings |
| `npx tsc --noEmit` | **pass** |
| `npm run build` | **pass** на поточному `node_modules`; 951 сторінка |
| `npm ci --dry-run --ignore-scripts` | **fail** — lock/package не синхронізовані |
| `npm audit --omit=dev` | **fail** — 1 critical, 8 high, 3 moderate |
| package root dependency spec vs lock root | збігається, але цього недостатньо: транзитивне дерево lock неповне |
| метадані культур/секцій | 42 культури, 432 секції; відсутніх файлів секцій не знайдено |
| `public/search-index.json` | 432 унікальні записи, JSON читається |
| HTTP smoke check | `/uk`, `/en`, culture/section маршрути — 200; відсутній `/uk/search-index.json` очікувано, бо public asset лежить у корені `/search-index.json` |

## Findings

### F-01 — `package-lock.json` не проходить clean install

**Severity: critical**  
**Шляхи:** `package.json`, `package-lock.json`  
**Доказ:** `npm ci --dry-run --ignore-scripts` повернув:

```text
npm error `npm ci` can only install packages when your package.json and package-lock.json ... are in sync.
Missing: @swc/helpers@0.5.23 from lock file
```

Перевірка рівності root `dependencies` у `package.json` і lock дає позитивний результат, але npm перевіряє повне транзитивне дерево. Поточний `node_modules` маскує проблему: тому локальний build проходить, а чистий CI/новий Vercel build може впасти ще на етапі встановлення.

**Рекомендація:** відтворити інсталяцію в чистому каталозі, виконати сумісний `npm install` для оновлення lock, перевірити `npm ci` у чистому середовищі та лише після цього закріпити lock. Не покладатися на локальний `node_modules` як доказ відтворюваності.

### F-02 — Відомі вразливості production dependency tree

**Severity: critical**  
**Шляхи:** `package.json:dependencies.next`, `package.json:dependencies.@serwist/next`, `package-lock.json`  
**Факти:** `npm audit --omit=dev` зафіксував **12 vulnerabilities: 1 critical, 8 high, 3 moderate**. Серед значущих встановлених версій: `next@16.2.9`, `postcss@8.4.31`, `sharp@0.34.5`; audit вказує для Next численні advisory до patched-діапазонів (`<16.2.11`, `<16.3.3`, `<16.3.8` залежно від проблеми), а для `sharp`/`postcss` також є high advisory.

Це не теоретична dev-only проблема: Next, image optimization, PostCSS і sharp входять до production build/runtime ланцюжка.

**Рекомендація:** оновити Next до актуальної patched-версії, сумісної з `next-intl` і Serwist, оновити Serwist/транзитивні пакети, після цього перевірити `npm audit`, `npm ci`, `tsc`, lint і build. Зафіксувати допустиму політику audit у CI; не маскувати advisory через `audit-level` або необґрунтовані `overrides`.

### F-03 — Lint pipeline падає, але build його не запускає

**Severity: high**  
**Шляхи:** `package.json:scripts.lint`, `package.json:scripts.build`, `eslint.config.mjs`  
**Доказ:** `npm run lint` → **34 errors, 14 warnings**; `npm run build` → pass. Script build фактично виконує лише `node scripts/generate-search-index.js && next build`, тому production build не є повним quality gate.

Репрезентативні помилки:

- `src/components/layout/Header.tsx:132` — `setState` синхронно в effect; також `:124`, `:126` — `any`.
- `src/components/layout/ThemeToggle.tsx:11` — `setMounted(true)` у effect (`react-hooks/set-state-in-effect`).
- `src/components/mdx/TableOfContents.tsx:16` — `setHeadings` у effect; це може спричиняти зайвий cascading render.
- `src/components/mdx/FilterTabs.tsx:23` — `prefer-const`.
- `src/components/mdx/LightboxImage.tsx:4` — `any`; `:7` — необроблений `<img>`.
- `src/lib/mdx.ts:6` — `prefer-const`.
- `src/components/diagrams/PremiumProcess.tsx:43,57`, `PremiumHierarchy.tsx:24,34`, `PremiumComparison.tsx:52,76,77,99` — `any` навколо `JSON.parse` і map-даних.
- `src/app/sw.ts:10` — `declare const self: any`.
- `src/app/[locale]/[culture]/[section]/page.tsx:74,78,149` — `any` у MDX component map.
- Є warnings щодо ручного `<img>` у `HeroCover.tsx` і `LightboxImage.tsx`, невикористаних змінних та cleanup ref у `RevealOnScroll.tsx:35`.

**Рекомендація:** спочатку розібрати `any` через типи/типізований JSON parser, винести стабільний MDX component map за межі render, переробити state/effect патерни; потім додати `lint` до `build` або окремий CI job з fail-on-error. Warnings щодо зображень вирішити через `next/image` або свідомо документоване виключення для специфічних MDX URL.

### F-04 — Англійські маршрути не мають англійського body контенту

**Severity: high**  
**Шляхи:** `src/app/[locale]/[culture]/[section]/page.tsx:273-278`, `src/lib/cultures.ts:50-63`, `content/cultures/*/*.md`, `messages/en.json`  
**Доказ:** `SectionPage` завжди викликає `getSectionContent(cultureSlug, section.filename)`; `locale` використовується для `sData`/`cData` (title, description), але не для вибору body файла. HTTP smoke check показав, що `/en/yablunia/posadka` має title `Planting`, одночасно містить українські фрази `Вибір місця` і `Посадка яблуні`, як і `/uk/...`.

Таким чином, `next-intl` локалізує оболонку/метадані, але не енциклопедичний матеріал. Для користувача англійської локалі це виглядає як частково зламаний переклад і може шкодити SEO через дубльований/невідповідний body.

**Рекомендація:** або явно оголосити `/en` як неготову локаль і не публікувати її, або додати локалізовані content-файли/поле `filename` для `uk` і `en`, перевірку повноти локалей у build та окремі snapshot/HTTP тести для кожної локалі.

### F-05 — Генератор search-index втрачає текст усередині MDX-компонентів

**Severity: high**  
**Шляхи:** `scripts/generate-search-index.js:39-44`, `public/search-index.json`, search logic у `src/components/layout/Header.tsx` (Fuse/search modal)  
**Доказ:** генератор видаляє парні теги regex-ом на кшталт:

```js
.replace(/<[A-Z][A-Za-z]*[^>]*>[\s\S]*?<\/[A-Z][A-Za-z]*>/g, " ")
```

Це видаляє не лише оболонку, а й текст між `<Callout>...</Callout>`, `<InfoBlock>...</InfoBlock>` та іншими парними MDX-компонентами. На фактичному `content/cultures/yablunia/07-khvoroby.md` знайдено 32 парні `Callout`; префікси їхнього тексту не потрапляють у відповідний індексований content. Водночас індекс має 432 записи, тому проблема не виглядає як повна відсутність індексу — це тиха втрата частини пошукових термінів.

Додатковий ризик: індекс має один запис на секцію і поле `content` із джерельного `.md`, без окремих локалей. Англійські результати можуть показувати український excerpt; для query, який збігся лише з title, `snippetIndex` може бути `-1`, після чого UI бере початок тексту секції, а не релевантний фрагмент (`Header.tsx`, логіка snippet біля рядків 213-216).

**Рекомендація:** будувати індекс через Markdown/MDX AST або щонайменше спочатку прибирати теги, зберігаючи children; додати `locale` до схеми документа та генерувати індекс для кожної локалі; перевірити fixture-тестами, що терміни з Callout/InfoBlock/таблиць знаходяться. Для snippet обробити `snippetIndex === -1` окремо.

### F-06 — Заборонені компоненти фактично лишилися в коді та контенті

**Severity: medium**  
**Шляхи:** `AGENTS.md:29-32`, `PROJECT_DOCUMENTATION.md:42-46`, `PROJECT_OVERVIEW.md:81-95`, `src/app/[locale]/[culture]/[section]/page.tsx:31,67,88-92`, `content/cultures/vynograd/15-khvoroby-1-mildyu-oiidum.md:112`  

AGENTS/OVERVIEW забороняють `PremiumProcess` і `ComparisonTable`, а документація водночас описує їх як еталонні компоненти. Фактичний route component map все ще імпортує/реєструє `ComparisonTable`, `PremiumProcess` та `PremiumComparison`; у контенті винограду знайдено реальне використання `<ComparisonTable>`.

Ця суперечність робить правила генерації ненадійними та дозволяє знову внести відомі мобільні/MDX-ризики.

**Рекомендація:** обрати одне джерело правди, синхронізувати три документи, видалити або ізолювати deprecated components, додати CI grep/MDX validation, що забороняє їх у `content/cultures/**`.

### F-07 — Serwist несумісний із поточним dev Turbopack сценарієм

**Severity: medium**  
**Шляхи:** `package.json:scripts.dev`, `next.config.ts:5-10`, `src/app/sw.ts`  
**Доказ:** `npm run build` вивів warning: `@serwist/next` не підтримує `next dev --turbopack`; поточний `dev` script запускає `next dev`, а Next 16 використовує Turbopack. Конфіг вимикає Serwist лише коли `NODE_ENV === "development"`, але warning все одно виникає від інтеграції.

Це створює розходження між локальною розробкою й production service-worker pipeline та може давати хибне відчуття, що PWA перевірена в dev.

**Рекомендація:** обрати один задокументований варіант: `next dev --webpack`, повністю вимкнути Serwist у dev (`NODE_ENV !== "production"`), або перейти на сумісний Turbopack/configurator режим. Додати smoke test на наявність і коректну реєстрацію service worker у production preview.

### F-08 — MDX component map створюється під час render і типи слабкі

**Severity: medium**  
**Шляхи:** `src/app/[locale]/[culture]/[section]/page.tsx`, `src/components/diagrams/Premium*.tsx`, `src/components/mdx/LightboxImage.tsx`  

ESLint окремо повідомляє `react-hooks`/React compiler про `Cannot create components during render` для кількох inline component functions у MDX map. Той самий файл містить численні `any`, а diagram components парсять довільні JSON-рядки прямо під час render. Це підвищує ризик зайвих remount/re-render, прихованих runtime помилок і складного дебагу контенту.

**Рекомендація:** винести статичну частину map на module scope, параметризувати лише culture-dependent renderer фабрикою з контрольованим memoization; описати схеми JSON типами/`zod`-подібною валідацією; у разі помилки повертати стабільний user-facing fallback без читання `e.message` з `any`.

### F-09 — Документація не відповідає фактичному масштабу та маршрутам

**Severity: medium**  
**Шляхи:** `PROJECT_OVERVIEW.md:53-58`, `PROJECT_OVERVIEW.md:81-86`, `src/app/**`, `content/cultures/**`, `public/search-index.json`  

Документація (станом на 2026-07-31) заявляє 38 культур, 329+ розділів і 738 статичних сторінок. Фактично у checkout — **42 культури, 432 секції**, а build генерує **951 сторінку** (дві локалі та службові/каталожні маршрути). Це не ламає runtime безпосередньо, але ускладнює release planning, QA coverage і контроль повноти контенту.

**Рекомендація:** генерувати статистику документації зі скрипта/manifest, а не підтримувати вручну; у release checklist звіряти число meta, секцій, locale variants, search records і build routes.

### F-10 — Відсутній видимий CI/repository quality control у checkout

**Severity: low**  
**Шляхи:** корінь проєкту, `.github/` не знайдено; `git status` не доступний, оскільки `/home/ubuntu/agro_encyclopedia` не є Git repository у цьому середовищі.

Не робиться висновок, що remote deployment точно не має CI, але в переданій копії немає перевірюваного pipeline, який гарантує `npm ci`, `npm audit`, `tsc`, lint і build. На фоні F-01/F-03 це реальний процесний ризик.

**Рекомендація:** зберігати deployment workflow разом із проєктом або надати його як перевірювану конфігурацію; мінімальний pipeline: `npm ci`, audit policy, `npm run lint`, `npx tsc --noEmit`, генерація/перевірка індексу, `npm run build`, smoke tests локалей/ключових маршрутів.

### F-11 — Неконтрольований performance/accessibility борг зображень

**Severity: low**  
**Шляхи:** `src/components/mdx/HeroCover.tsx:31`, `src/components/mdx/LightboxImage.tsx:7`, MDX component map у `src/app/[locale]/[culture]/[section]/page.tsx`  

ESLint попереджає про raw `<img>`; `LightboxImage` приймає `width`/`height`, але не використовує їх, а `HeroCover` має невикористаний import `Image`. Для сотень статичних сторінок це може збільшувати LCP, bandwidth і CLS-ризик, особливо з великими фото та PWA cache.

**Рекомендація:** перейти на `next/image` із коректними dimensions/sizes/priority для hero, залишити raw `<img>` тільки для доведених lightbox-випадків із локальним lint disable та вимірюванням Core Web Vitals.

## Recommendations — пріоритетний план

### P0 — до будь-якого деплою

1. Виправити `package-lock.json` до стану, коли `npm ci` у чистому каталозі проходить; не комітити лише результат локального `npm install` без clean verification.
2. Оновити `next`/Serwist/транзитивні залежності до patched versions; повторити `npm audit --omit=dev`.
3. Перевірити, що production deploy збирається з чистого середовища, а не з кешованого `node_modules`.

### P1 — до release candidate

4. Зробити lint обов’язковим CI gate; прибрати 34 errors, а warnings або виправити, або документовано дозволити.
5. Вирішити модель локалізації body-контенту: перекласти `/en` або не маршрутизувати неперекладений контент як англійський.
6. Переписати search-index extraction на AST/child-preserving підхід; додати locale-aware schema і regression tests на MDX-компоненти.
7. Узгодити та enforce правила заборонених компонентів; видалити фактичний `<ComparisonTable>` з контенту або скасувати заборону в усіх документах свідомим рішенням.

### P2 — стабілізація якості

8. Винести MDX renderer map зі render, типізувати JSON props і прибрати `any`.
9. Визначити Serwist dev strategy та перевірити SW у production preview.
10. Автоматично генерувати project statistics і додати маршрут/локаль smoke matrix.
11. Оптимізувати зображення та виміряти LCP/CLS на hero і довгих статтях.

## Підсумковий вердикт

**Build-статус:** умовно зелений лише для поточного робочого середовища.  
**Clean deploy:** червоний через F-01.  
**Security:** червоний/блокуючий до оновлення Next та залежностей через F-02.  
**Code quality:** червоний через lint F-03.  
**Content/search/i18n quality:** потребує P1-виправлень через F-04–F-06.  

До усунення F-01, F-02 і F-03 не рекомендується вважати проєкт технічно готовим до production release.
