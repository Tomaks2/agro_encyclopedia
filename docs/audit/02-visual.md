# Незалежний аудит: візуал і компоненти

**Проєкт:** `/home/ubuntu/agro_encyclopedia`  
**Дата аудиту:** 2026-10-15  
**Область:** HeroCover, бічна навігація, заголовки, відступи та порожні області, таблиці, Callout, InfoBlock, типографіка, адаптивність, локальний preview.  
**Режим:** лише читання; вихідний код і контент проєкту не змінювалися. Створено тільки цей звіт.

## Summary

Система має виразну преміальну візуальну основу: природна палітра, сильна обкладинка HeroCover, читабельна serif-типографіка, липка desktop-бічна навігація, горизонтальний overflow-wrapper для таблиць і перевірені локальні маршрути, які рендеряться зі статусом 200. Еталонна сторінка Груші (`/uk/hrusha/fiziolohiya`) у desktop preview виглядає цілісно, а HeroCover і sidebar добре працюють на широкому екрані.

Водночас аудит виявив системну проблему з HeroCover-ресурсами: **230 із 432** `imageSrc` у контенті не відповідають існуючим файлам `public` (53,2%). Це вже видно на `/uk/tomat/biolohiya-ta-likopin` як зламане зображення у HeroCover. На мобільному сторінка спочатку показує всю бічну навігацію та список розділів, а сам HeroCover відсувається далеко вниз; це суттєво погіршує перший екран і доступ до змісту. Також код і документація суперечать одне одному щодо заборонених `ComparisonTable`/`PremiumProcess`, а `InfoBlock`/`Callout` мають пропи, які не відповідають їхнім типам.

Найвищі пріоритети: 1) відновити/нормалізувати всі HeroCover assets або безпечно показувати fallback; 2) перетворити mobile sidebar на згортаний/акордеонний блок або винести «Всі розділи» нижче контенту; 3) узгодити MDX-контракт компонентів і прибрати production-реєстрацію заборонених компонентів; 4) прибрати зламані/порожні CSS-секції та зафіксувати єдину типографічну систему.

## Методика та перевірені поверхні

- Прочитано `AGENTS.md`, `PROJECT_DOCUMENTATION.md`, `PROJECT_OVERVIEW.md`, `package.json`, `src/app/globals.css`, сторінку розділу, Header, HeroCover, TableOfContents/ActiveTOC, Callout/InfoBlock, NextChapter, MDX utilities та репрезентативні MD-файли.
- Перевірено локальний preview через Chromium на 1440×1400 і 390×844 для `/uk/hrusha/fiziolohiya`; окремо знято desktop preview `/uk/tomat/biolohiya-ta-likopin`.
- HTTP smoke-check: `/uk`, `/uk/hrusha`, `/uk/hrusha/fiziolohiya`, `/uk/tomat/biolohiya-ta-likopin`, `/uk/bdzhilnytstvo/01-vsiesvit-bdzholi` віддають 200. Маршрути з неіснуючим slug, наприклад `/uk/hrusha/01-biolohiya`, правильно дають 404.
- У representative HTML знайдено таблиці, Callout, InfoBlock і HeroCover; duplicate heading IDs на перевірених маршрутах не виявлено.
- `npm run lint` завершився з помилкою: **34 errors, 14 warnings**; серед них є безпосередньо релевантні `TableOfContents.tsx`, `HeroCover.tsx`, сторінка розділу та проблемний JSX asset.

## Findings

### V-01 — Масово биті зображення HeroCover — **critical**

**Докази:**

- `content/cultures` містить 432 `imageSrc`; 230 з них не мають відповідного файлу в `public`.
- Приклади: `content/cultures/tomat/01-biolohiya-ta-likopin.md:1` посилається на `/images/cultures/tomat/ch01_biolohiya.jpg`, аналогічна схема є для всіх 8 розділів томата; такі ж патерни є в абрикоса, хурми, огірка, перцю та більшості овочевих/ягідних культур.
- У preview маршруту `/uk/tomat/biolohiya-ta-likopin` HeroCover показує зламане зображення, хоча текстовий overlay (chapter/title/subtitle) залишається видимим.
- Існуючий еталон Груші працює через `/photos/hrusha/hero/pear_hero.png`, а не через загальний `/images/cultures/...` pattern.

**Вплив:** майже кожна друга обкладинка втрачає головний візуальний акцент; на темному overlay текст читається, але сторінка виглядає як неповна/пошкоджена. Це особливо критично для першого екрану та LCP.

**Рекомендації:**

1. Створити один canonical mapping `culture/section → asset` і перевіряти його в CI до білду.
2. Перенести/перейменувати існуючі assets або виправити `imageSrc` у MDX; не покладатися на схожість імен.
3. Додати безпечний fallback HeroCover (нейтральний gradient або culture image) при 404, щоб broken-image icon ніколи не з’являвся.
4. Для всіх HeroCover перейти з raw `<img>` на `next/image` із коректними `sizes`, `fill` та `priority` для першого hero.

### V-02 — Mobile sidebar займає весь перший екран до контенту — **high**

**Докази:**

- `src/app/globals.css:1018-1047` задає двоколонковий layout, а в `@media (max-width: 900px)` (`:1554-1563`) переводить його в одну колонку, але не приховує і не стискає `.reading-sidebar`.
- `src/app/[locale]/[culture]/[section]/page.tsx:290-348` рендерить в sidebar і `ActiveTOC`, і повний список `culture.sections` перед `<main>`.
- На 390×844 preview `/uk/hrusha/fiziolohiya` перший viewport містить header, «На цій сторінці» та частину «Всі розділи»; HeroCover не потрапляє у перший екран. Для культур із 15–20 розділами цей передконтент ще довший.

**Вплив:** мобільний користувач починає не з назви/обкладинки розділу, а з довгого навігаційного полотна; втрачається орієнтація, збільшується scroll до змісту, sidebar фактично маскує головний контент.

**Рекомендації:**

- На `≤900px` замінити sidebar на `<details>`/accordion «Навігація розділу» з закритим станом за замовчуванням.
- Залишити перед Hero лише короткий back-link і компактну кнопку «Зміст»; список усіх розділів показувати після Hero або в drawer.
- Зберегти sticky sidebar тільки для desktop (`min-width: 901px`), а не просто скасовувати `position: sticky`.
- Протестувати 320, 390, 768, 1024 і 1440 px з найдовшою культурою.

### V-03 — HeroCover має жорстку мінімальну висоту та inline-стилі без mobile override — **medium**

**Докази:** `src/components/mdx/HeroCover.tsx:15-27` задає `height: min(60vh, 500px)` і `minHeight: '400px'`; контент має `paddingBottom: '2.5rem'`, а заголовок — `clamp(1.5rem, 3.5vw, 2.75rem)` (`:45-71`).

**Вплив:** на малих телефонах мінімальні 400 px плюс довгі українські title/subtitle створюють непропорційно високий hero; inline-стилі не можна надійно перевизначити через наявну responsive CSS-систему. Довгі заголовки потенційно зменшують корисну площу зображення і можуть збільшувати overlap із нижнім градієнтом.

**Рекомендації:** перенести layout у клас CSS, використовувати `clamp()` для висоти (`min-height: clamp(260px, 55vw, 500px)`), задати breakpoint-specific padding/line-height і перевірити довгі назви («БІОЛОГІЯ, АНАТОМІЯ ТА БІОХІМІЯ ЛІКОПІНУ ТОМАТА»).

### V-04 — Заголовки мають два конфліктні стилі та розмиту ієрархію — **medium**

**Докази:**

- Базові правила `.prose h2/h3/h4` у `src/app/globals.css:282-357` задають лівий акцент для h3, uppercase h4 і відступи.
- Production MDX renderer у `src/app/[locale]/[culture]/[section]/page.tsx:99-109,198-224` додає класи `.prose-h2/.prose-h3/.prose-h4`; інша система в `globals.css:1753-1798` центрує h2, робить h3 italic і прибирає його лівий accent.
- У preview Груші видно редакційний H2, але різні MDX-шляхи можуть отримувати різну ієрархію; у `/uk/vynograd/khvoroby-1-mildyu-oiidum` серверний HTML має 6 `h1` (поруч з одним HeroCover), що вказує на несистемний heading-контент у великому corpus.

**Вплив:** візуальна непослідовність між культурами, слабша сканованість, потенційно некоректна структура документа для screen reader/SEO.

**Рекомендації:** залишити один renderer для h1–h4, заборонити `#` після HeroCover у content lint, не використовувати паралельні `legacy*`, `animated*`, `prose-*` варіанти без чіткої міграції; перевірити всі `h1`/ID автоматично.

### V-05 — Видимі порожні області та надмірний вертикальний ритм — **medium**

**Докази:** у desktop preview `/uk/hrusha/fiziolohiya` після HeroCover (приблизно y=755) до першого змістовного h3/diagram є велика малонаповнена світла область; у `/uk/tomat/biolohiya-ta-likopin` аналогічна зона під Hero виглядає як порожній перехід до першої схеми.

Джерела ритму: `HeroCover.tsx:16,26` має `mb-12` і inline `marginBottom: 3rem`; `globals.css:287,338` задає `margin-top: 3.5rem/3rem` для заголовків; `globals.css:382-386` задає великий image margin `2.5rem 0`; `page.tsx:397-403` додає ще 3rem перед нижньою навігацією. На багатьох сторінках це складається в значні паузи.

**Рекомендації:** визначити токени для `content-block-gap`, прибрати дублювання Tailwind/inline/CSS margin, виміряти відстані між Hero → first callout → first heading та забезпечити наявність корисного lead/summary одразу після hero.

### V-06 — Таблична система працює на desktop, але має конфлікт класів і не завершене mobile правило — **medium**

**Докази:**

- MDX table renderer `page.tsx:179-196` обгортає кожну Markdown-таблицю у `.comparison-table-wrapper`, але примусово задає `<table style={{ minWidth: "700px" }}>` (`:181-183`).
- Wrapper має `overflow-x: auto` (`globals.css:2221-2227`), що технічно дає горизонтальний scroll, але у `@media (max-width: 640px)` секція «Tables — must scroll» порожня (`:1664-1665`), а `min-width:700px` не змінюється.
- Є дві системи: `.prose-*` (`:1812-1859`) і `.comparison-table-*` (`:2221-2257`). Це ускладнює передбачення стилів і створює різний вигляд Markdown table та `ComparisonTable`.
- Перевірений томатний маршрут має 3 `<table>`, бджільництво — 8, виноградний — 7; тобто це не edge case.

**Вплив:** на вузькому екрані таблиці можуть вимагати непрозорого горизонтального свайпу; широкі комірки та uppercase header зменшують читабельність. Дві системи можуть розходитись за кольором, padding і hover.

**Рекомендації:** залишити одну таблицю-систему; wrapper забезпечити `-webkit-overflow-scrolling: touch`, видимим affordance/підказкою і `scrollbar`; визначити мінімальну ширину на таблиці без inline; для 2–3 колонок додати mobile reflow/card variant, для широких — чіткий горизонтальний scroll.

### V-07 — Callout/InfoBlock приймають некоректні пропи, що змінюють вигляд — **high**

**Докази:**

- `src/components/mdx/Callout.tsx:4` визначає Callout types `tip|warning|info|success|danger|note`; невідомий type переходить у `CALLOUT_CONFIG.info` (`:70-71`).
- `content/cultures/tomat/01-biolohiya-ta-likopin.md:3` використовує `<Callout type="important">`, тому він рендериться як blue `info`, а не як окреме важливе/warning оформлення.
- `content/cultures/vynograd/15-khvoroby-1-mildyu-oiidum.md:43` використовує `<InfoBlock ... variant="info">`, але `InfoBlock` читає тільки `type` (`Callout.tsx:90-106`); фактичний type лишається `gold` за замовчуванням.
- `InfoBlockProps` дозволяє `gold|green|blue|red` (`:90-95`), але `INFO_COLORS` містить також `purple` (`:97-103`), яке типізація не дозволяє.

**Вплив:** редактор очікує одну семантику, а користувач бачить іншу кольорову/іконографічну семантику; важливі попередження можуть виглядати як звичайна довідка.

**Рекомендації:** уніфікувати контракт (`type`, не `variant`), додати `important` якщо він потрібен, або мігрувати контент на дозволені values; зробити `satisfies`-тип для config; додати MDX lint, який відхиляє невідомі props і values; не інжектити глобальний `<style>` всередину кожного InfoBlock (`:116-120`), а винести правило в CSS.

### V-08 — Документація та production-код суперечать забороні ComparisonTable/PremiumProcess — **high**

**Докази:**

- `AGENTS.md:29-32` і `PROJECT_OVERVIEW.md:85,93-94` прямо забороняють `<PremiumProcess>` та `<ComparisonTable>`.
- Production route все одно імпортує і реєструє їх: `src/app/[locale]/[culture]/[section]/page.tsx:18,31,67,89`.
- У контенті залишився реальний виклик `content/cultures/vynograd/15-khvoroby-1-mildyu-oiidum.md:112-130`; файл також має верхньорівневий JS import (`:1`), що не відповідає типовому MDX-шаблону сторінки.
- `PROJECT_DOCUMENTATION.md:45-46` досі документує ці компоненти як доступні, хоча інші правила кажуть видалити їх.

**Вплив:** при зміні implementation або build policy сторінка може впасти/отримати нестабільний visual path; користувачі бачитимуть різні table/process стилі. Це також робить неможливим надійний content QA.

**Рекомендації:** прибрати компоненти з `getMdxComponents` і замінити єдиний виклик на Markdown table; очистити контентні import-рядки; оновити документацію в один узгоджений contract; додати grep/CI guard на `<ComparisonTable`/`<PremiumProcess`.

### V-09 — Типографічна система не узгоджена з документацією і завантажує зайві шрифти — **medium**

**Докази:**

- `PROJECT_DOCUMENTATION.md:21-24` та `PROJECT_OVERVIEW.md:32-35` заявляють Cormorant Garamond + Lora + JetBrains Mono.
- `src/app/globals.css:7,61-64` реально використовує Playfair Display + Newsreader + JetBrains Mono.
- `src/app/[locale]/layout.tsx:43-44` додатково завантажує Cormorant Garamond + Lora; це не збігається з CSS variables і створює зайві network requests. ESLint також попереджає (`layout.tsx:42,46`) про ручне підключення шрифтів/stylesheets.
- На desktop preview serif-стиль виглядає якісно, але без єдиного контракту різні сторінки/компоненти можуть мати різну метрику, перенос рядків і висоту блоків.

**Рекомендації:** обрати одну систему (краще `next/font`), визначити її в одному місці, синхронізувати документацію і CSS variables; перевірити перенос довгих українських заголовків після міграції.

### V-10 — Raw `<img>` у HeroCover погіршує performance і контроль preview — **medium**

**Докази:** `HeroCover.tsx:31-35` використовує `<img>` і імпортує невикористаний `Image` (`:4`); `npm run lint` дає `@next/next/no-img-element` warning на `:31`.

**Вплив:** немає автоматичного image optimization, `srcset`/`sizes`, priority/LCP control; це особливо відчутно на великих Hero asset-ах.

**Рекомендації:** використати `next/image` з `fill`, `sizes="(max-width: 768px) 100vw, 720px"`, `priority` для Hero; додати fallback/error state та перевірку існування asset.

### V-11 — TOC має зайвий/мертвий inline-візуальний шлях і lint-помилку — **low**

**Докази:** сторінка розділу використовує `ActiveTOC` (`page.tsx:227,310`), а MDX може містити `TableOfContents` (`page.tsx:32,68`). Але `.toc-container` навмисно прихований (`globals.css:2060-2064`), тобто `TableOfContents` лишається мертвим UI-шляхом. `TableOfContents.tsx:8-16` синхронно викликає `setHeadings` у effect; `npm run lint` фіксує `react-hooks/set-state-in-effect` на `:16`.

**Вплив:** подвійна реалізація ускладнює підтримку, а майбутній content author може додати компонент, який фактично не видно. ActiveTOC працює у preview і duplicate IDs на перевірених маршрутах не має.

**Рекомендації:** залишити один TOC implementation; або видалити MDX-компонент, або зробити його адаптивним drawer-компонентом; винести heading extraction з effect де можливо, додати `aria-current="location"` для active link і тест keyboard navigation.

### V-12 — CSS містить пошкоджені/порожні секції — **medium**

**Докази:**

- `globals.css:272-279` обриває selector на `.prose >` перед наступним правилом; це невалідний/мертвий CSS-фрагмент.
- `globals.css:413-436` містить лише порожні рядки під заголовком TABLES; реальні правила таблиць з’являються значно нижче (`:1812+` і `:2221+`).
- `globals.css:1800-1803` має подвійний незакритий на вигляд заголовковий comment marker.
- `globals.css:1664-1665` залишає порожній блок для mobile tables.

**Вплив:** невідомо, які задумувані обмеження були втрачені під час редизайну; майбутні зміни легко потраплять не в той selector. Це підвищує ризик непомітної регресії preview.

**Рекомендації:** прогнати CSS parser/stylelint, видалити dead blocks, звести правила в тематичні секції та додати snapshot/check для computed style таблиць, заголовків і sidebar.

### V-13 — Lint/build health недостатній для безпечного visual release — **medium**

**Докази:** `npm run lint` завершується code 1: 34 errors і 14 warnings. Безпосередньо в області аудиту: `src/components/mdx/HeroCover.tsx:4,31`, `src/components/mdx/TableOfContents.tsx:16`, `src/app/[locale]/[culture]/[section]/page.tsx:74,78,149`; додатково lint знаходить parsing error у `public/photos/vynograd/site_lightbox_inserts_schemes_40_54.jsx:5`.

**Вплив:** visual changes не мають чистого quality gate; помилки в компонентах можуть маскувати регресії runtime або спричиняти різні server/client render paths.

**Рекомендації:** розділити content asset lint і source lint, але обидва зробити blocking; спочатку виправити parsing error, Hero/TOC lint та `any` у section renderer; додати automated route smoke check і screenshot baseline для 4 viewport sizes.

## Позитивні результати

- `HeroCover` на `/uk/hrusha/fiziolohiya` має сильний visual hierarchy: image, нижній градієнт, chapter badge, title/subtitle; текст читається.
- Desktop `.reading-layout` (`globals.css:1018-1047`) має чітку 272 px sidebar + main, `min-width:0` на main і sticky sidebar; це добре працює в 1440 px preview.
- `ActiveTOC` і список розділів показують поточний стан кольором/жирністю; у перевірених маршрутах немає duplicate heading IDs.
- Таблиці рендеряться через wrapper з `overflow-x:auto`; серверні smoke-check-и підтверджують: томат 3 таблиці, бджільництво 8, виноград 7.
- Callout-и фактично рендеряться: Груша має 8, томат 2, бджільництво 7, виноград 2; базові tip/warning/info/success кольорові варіанти читаються.
- У source є `viewport` з `width: device-width`, `initialScale: 1`, `maximumScale: 5` (`src/app/[locale]/layout.tsx:17-22`), що краще за заборону zoom.

## Рекомендований порядок виправлень

1. **P0:** інвентаризувати й виправити 230 битих Hero assets; додати fallback і CI asset check.
2. **P0:** переробити mobile sidebar на collapsed/drawer pattern; Hero/title мають бути доступні в першому екрані.
3. **P1:** видалити/мігрувати `ComparisonTable` та `PremiumProcess`, синхронізувати AGENTS/PROJECT_DOCUMENTATION/OVERVIEW і контентний MDX contract.
4. **P1:** уніфікувати Callout/InfoBlock props і додати MDX validation (`important`, `variant`, `purple` тощо).
5. **P1:** звести два table CSS systems в один і зробити реальний mobile behavior з підказкою горизонтального scroll або card variant.
6. **P1:** прибрати malformed/dead CSS selectors і дубльовані heading styles; після цього зафіксувати spacing tokens.
7. **P2:** перейти на `next/image`, єдиний `next/font` stack, виправити lint у Hero/TOC/route; додати screenshot regression matrix.

## Артефакти перевірки

- Розгорнутий звіт: `/home/ubuntu/audit_reports/02-visual.md`
- Тимчасові preview screenshots (не є частиною source changes): `/home/ubuntu/jobs/f28a3bc96173_a1/preview/hrusha-desktop.png`, `hrusha-mobile.png`, `tomat-desktop.png`.
