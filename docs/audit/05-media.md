# Незалежний аудит: медіа і MDX

**Проєкт:** `/home/ubuntu/agro_encyclopedia`  
**Фокус:** шляхи зображень, повтор томатної обкладинки, assets, MDX, Markdown-таблиці, локалізація  
**Дата аудиту:** 2026-10-15  
**Режим:** read-only; файли проєкту не змінювалися. Звіт збережено окремо від репозиторію.

## Summary

Стан медіа/MDX не відповідає заявленій готовності. Найбільший ризик — **багато опублікованих розділів посилаються на неіснуючі HeroCover-файли**: із 428 HeroCover-посилань у розділах, перелічених у `meta.json`, 230 ведуть до відсутніх assets. Для томата відсутні всі вісім очікуваних chapter-cover файлів. Це дає зламану або порожню першу візуальну секцію на значній кількості маршрутів.

Другий системний ризик — **маршрути `/en/...` не мають англомовного MDX-контенту**. Код для обох локалей читає той самий `filename`, а фактичні розділи є українськими. Перевірка локально через `curl` показала HTTP 200 для `/en/tomat/biolohiya-ta-likopin`, але HTML містить український заголовок `БІОЛОГІЯ, АНАТОМІЯ ТА БІОХІМІЯ ЛІКОПІНУ ТОМАТА` і український текст.

Окремо виявлено **масове повторне використання томатної обкладинки** `/images/cultures/tomat.jpg`: 27 активних входжень у 26 опублікованих файлах, переважно в `content/cultures/nasinnytstvo/*` та ще в розділі власного насіння кукурудзи. Файл існує, але семантично використовується як універсальна обкладинка для різних культур і тем.

MDX-інтеграція має технічний борг: 43 import-рядки в 8 активних розділах винограду посилаються на неіснуючі alias-шляхи `@/components/...`, а 86 import-рядків у 81 активному файлі використовують `@/components/mdx`, хоча `src/components/mdx/index.ts` або `index.tsx` відсутній. У контенті є один фактичний тег `<ComparisonTable>` всупереч забороні в `AGENTS.md`; також сторінка досі імпортує та реєструє заборонені компоненти.

## Методика і межі

Прочитано:

- `AGENTS.md`;
- `PROJECT_DOCUMENTATION.md`;
- `PROJECT_OVERVIEW.md`;
- `README.md`, `package.json`;
- фактичні `src/app`, `src/components`, `src/lib`, `content/cultures`, `public`, `messages` та `scripts`.

Виконано незалежні перевірки:

- зіставлення media refs у MD з файлами під `public/`;
- окреме зіставлення активних розділів, перелічених у `meta.json`;
- читання репрезентативних файлів томата, груші, винограду, насінництва та MDX-компонентів;
- перевірка локальних `/uk` і `/en` маршрутів томата через HTTP;
- `npm run lint` (завершився помилкою: **34 errors, 14 warnings**);
- `npx tsc --noEmit` був запущений у read-only режимі, але у відведений час команда не повернула підсумковий код у вивід; це не вважається доказом успішної TypeScript-перевірки.

Статистичні числа залежать від того, чи рахувати службові `REPORT_*.md`/`SOURCES_*.md`. У висновках про маршрути використано тільки файли, які реально перелічені в `meta.json`.

## Findings

### F-01 — Відсутні HeroCover assets на опублікованих маршрутах

**Severity: critical**

У 431 активному розділі знайдено 428 `HeroCover imageSrc`; 230 унікальних цільових файлів не існують під `public/`. Це не лише проблема звіту-інвентарю: `HeroCover` напряму рендерить `<img src={imageSrc}>` (`src/components/mdx/HeroCover.tsx:29–35`), тому браузер отримує 404.

Репрезентативні докази:

- `content/cultures/tomat/01-biolohiya-ta-likopin.md:1` → `/images/cultures/tomat/ch01_biolohiya.jpg` — відсутній;
- `content/cultures/tomat/08-zbir-dozryvannya-storage.md:1` → `/images/cultures/tomat/ch08_zbir.jpg` — відсутній;
- `content/cultures/hrusha/16-kalendar.md:2` → `/photos/hrusha/hero/hrusha_seasons_hero.jpg` — відсутній;
- `content/cultures/slyva/17-chornosliv.md:1` → `/images/cultures/slyva/ch17_chornosliv.png` — відсутній;
- для `abrykos` відсутні 19 chapter-cover refs, для `khurma` — 14, для `tomat` — 8; для багатьох овочевих/ягідних культур відсутні всі 6–8 chapter covers.

Фактичний каталог томата (`public/images/cultures/tomat/`) містить лише сім інших статичних ілюстрацій (`4-typy-opor...`, `6-syhnaliv...`, тощо), але не `ch01...ch08`. Отже, це не простий пропущений один файл, а розрив між конвенцією імен у MDX і реальною asset-бібліотекою.

**Наслідок:** значна частина сторінок відображається без заявленої обкладинки; користувач бачить fallback background `#2C3825`, зламане зображення або невдалий запит до asset.

### F-02 — Англомовні маршрути рендерять український MDX

**Severity: high**

`src/app/[locale]/[culture]/[section]/page.tsx:264–277` читає `getSectionContent(cultureSlug, section.filename)` без урахування `locale`. `src/lib/cultures.ts:36–57` також має лише один `filename` на секцію. У `content/` немає структур `en/`, файлів `*.en.md` або `meta.en.json`; англійські значення є тільки в `meta.json` для назв/описів.

Репрезентативний приклад:

- `content/cultures/tomat/meta.json:13–17` містить англійські `name`, `tagline`, `description`;
- але `content/cultures/tomat/01-biolohiya-ta-likopin.md:1–82` — український MDX без англійського варіанта;
- локальний HTTP-тест `GET /en/tomat/biolohiya-ta-likopin` повернув 200, але HTML містив український Hero title `БІОЛОГІЯ, АНАТОМІЯ ТА БІОХІМІЯ ЛІКОПІНУ ТОМАТА` і той самий український body text.

Інтерфейс також не повністю локалізований поза `messages/*.json`: наприклад, `src/app/[locale]/[culture]/page.tsx:62–65,112,160–171` жорстко задає `Хлібні крихти`, `Зміст довідника`, `Починаємо навчання?`, `Почати читання`; `src/app/[locale]/[culture]/[section]/page.tsx:292,314` задає `Навігація по розділах`, `Всі розділи`; `src/components/layout/Header.tsx:42,60,76,191,207,248–254` має українські aria-label/status strings; `src/components/layout/Footer.tsx:18,25,36–37` має українські brand/navigation strings. У `messages/en.json` відповідні ключі існують, але ці рядки не використовуються.

**Наслідок:** `/en` виглядає частково англійським лише на рівні метаданих/окремих UI-елементів, але фактичний довідник не є англомовним.

### F-03 — Повтор томатної обкладинки для сторонніх культур і тем

**Severity: high**

Посилання `/images/cultures/tomat.jpg` існує (`public/images/cultures/tomat.jpg`), але в активних розділах використане **27 разів у 26 файлах**. Більшість — `content/cultures/nasinnytstvo/03-chystota-sortu-izoliatsiia.md` до `28-kultura-spetsyfichni-protokoly-redaktsiia.md`; ще один приклад — `content/cultures/kukurudza-tsukrova/13-kukurudza-tsukrova-vlasne-nasinnia.md:1`. У `28-kultura-spetsyfichni-protokoly-redaktsiia.md` входження повторюється в одному файлі.

Це відрізняється від нормального використання обкладинки томата в `content/cultures/tomat/meta.json:4`: там файл логічно є image культури. Проблема — повторне використання тієї самої фотографії на сторінках про ізоляцію сортів, відбір материнських рослин, насіннєву інфекцію, гарбузові, бобові, плодові дерева та інші теми.

**Наслідок:** візуальна семантика маршруту не відповідає контенту; повтор виглядає як placeholder/копіпаст і знижує довіру до енциклопедії.

### F-04 — Змішано кілька несумісних схем шляхів assets

**Severity: high**

У контенті одночасно використовуються:

- `/images/cultures/...` — chapter covers та частина статичних ілюстрацій;
- `/photos/...` — charts і lightbox photos;
- legacy-імпорти `Фото/...`, які `img`-renderer переписує у `/photos/${cultureSlug}/...` (`src/app/[locale]/[culture]/[section]/page.tsx:117–143`);
- окрема коренева папка `фото/` з 48 файлами, яка не є `public/` і тому напряму не є web asset-джерелом;
- компонентні `src`-шляхи в самому MDX через imports.

`HeroCover` не має перевірки/нормалізації asset path і використовує native `<img>` (`src/components/mdx/HeroCover.tsx:31–35`). `LightboxImage` теж напряму виводить `<img src={src}>` (`src/components/mdx/LightboxImage.tsx:4–12`). Отже, будь-яка помилка префікса або регістру дає runtime 404 без єдиного контрольованого resolver-а.

Повний аудит посилань знайшов 834 media refs у всьому MD-контенті, 716 унікальних; 232 refs ведуть до відсутніх assets (230 з них — активні HeroCover refs, ще два — активні/службові фото-посилання на `bdzhilnytstvo`).

### F-05 — MDX imports не відповідають фактичним шляхам компонентів

**Severity: high**

Фактичні компоненти лежать під `src/components/mdx/`, але в активному виноградному контенті є 43 import-рядки у 8 файлах із неіснуючими шляхами `@/components/HeroCover`, `@/components/LightboxImage`, `@/components/Callout`, `@/components/InfoBlock`, `@/components/TableOfContents`, `@/components/NextChapter`.

Репрезентативний файл:

- `content/cultures/vynograd/01-vsesvit-vynohradu.md:1–6` імпортує `@/components/HeroCover`, `@/components/LightboxImage`, `@/components/Callout`, `@/components/InfoBlock`, `@/components/TableOfContents`, `@/components/NextChapter`, але фактичні файли — у `src/components/mdx/`.

Сучасніші файли імпортують `@/components/mdx`, наприклад `content/cultures/vynograd/09-systemy-formuvannia.md:1`. Однак barrel-файла `src/components/mdx/index.ts` або `index.tsx` немає. Такий import не має фактичного модуля-цілі без додаткової alias-магiї, якої в перевірених файлах не знайдено.

Це не лише стильова невідповідність: remote MDX compiler має розібрати imports до рендеру сторінки. Відсутність модуля може зламати build/route compilation для всієї групи сторінок.

### F-06 — Заборонений ComparisonTable фактично лишився в контенті та коді

**Severity: medium**

`AGENTS.md:29–33` прямо забороняє `PremiumProcess` і `ComparisonTable` та вимагає чисті Markdown-таблиці. Водночас:

- `src/app/[locale]/[culture]/[section]/page.tsx:18,21,31,67,89,92` імпортує/реєструє `PremiumProcess`, `PremiumComparison`, `ComparisonTable`;
- `src/components/mdx/ComparisonTable.tsx:10–109` реалізує активний компонент;
- `content/cultures/vynograd/15-khvoroby-1-mildyu-oiidum.md:112` має фактичний `<ComparisonTable ...>` тег.

За пошуком фактичних тегів у контенті: `<ComparisonTable>` — 1, `<PremiumProcess>` — 0. Багато import-рядків `ComparisonTable` у `advanced`, `bdzhilnytstvo`, `epibudynok`, `references`, `vynograd` — це невикористані/застарілі imports, але вони підтримують розходження між правилами і кодовою базою.

### F-07 — Markdown-таблиці рендеряться, але документація суперечить сама собі

**Severity: medium**

Позитивна частина: залежність `remark-gfm` є в `package.json:23`, додається в `src/app/[locale]/[culture]/[section]/page.tsx:5` і `src/lib/mdx.ts:1–18`; сторінка має кастомні `table`, `thead`, `th`, `td`, `tr` mapping (`page.tsx:179–195`). Репрезентативний томатний файл коректно використовує стандартні Markdown-таблиці (`content/cultures/tomat/01-biolohiya-ta-likopin.md:43–50,54–69`).

Але правила конфліктують:

- `AGENTS.md:29–33` вимагає стандартні Markdown-таблиці й забороняє ComparisonTable;
- `PROJECT_DOCUMENTATION.md:29–31` каже, що звичайні Markdown-таблиці для важливих правил/кроків заборонені;
- старі приклади в `PROJECT_DOCUMENTATION.md:42–46` все ще документують `ComparisonTable` і `PremiumProcess`.

У репозиторії багато чистих Markdown-таблиць, що узгоджується з новішим правилом `AGENTS.md`, але немає одного канонічного policy-документа. Це сприяє поверненню legacy-компонентів і непослідовному authoring.

### F-08 — Локалізаційні поля є, але ними не покривається весь UI/контент

**Severity: medium**

`content/cultures/*/meta.json` містять `uk` та `en` для назв і описів, а `messages/uk.json` та `messages/en.json` мають по 9 груп ключів. Це створює враження повної локалізації, але фактичні сторінки культури й розділу мають hardcoded Ukrainian strings, а MDX — один мовний варіант.

Додаткові конкретні місця:

- `src/app/[locale]/page.tsx:10–14,27–57,135–145,188–198,218–232,248–258` містить hardcoded Ukrainian metadata, календар, hero, статистику й feature copy, хоча отримує `locale`;
- `src/app/[locale]/catalog/page.tsx:7–9` має hardcoded Ukrainian metadata;
- `src/components/ui/CulturesCatalog.tsx:40–121` має hardcoded Ukrainian категорії, описи й підписи без використання `useTranslations`;
- `src/components/layout/Footer.tsx:18,25,36–37` має hardcoded Ukrainian brand/labels.

**Наслідок:** навіть якщо `/en` meta-дані правильні, accessibility labels, CTA, каталог, календар і body content залишаються українськими.

### F-09 — Відсутня автоматична гарантія цілісності media refs

**Severity: low**

У `package.json:5–9` є `dev`, `build`, `start`, `lint`, але немає перевірки, яка проходить по MDX media refs і звіряє їх з `public/`. Поточний `scripts/generate-search-index.js:19–73` лише читає MD і генерує JSON; він не перевіряє існування `imageSrc`/`LightboxImage` targets. Це дозволило накопичити 230 активних missing HeroCover refs.

## Recommendations

### Негайно — перед наступним deploy

1. **Зупинити/позначити broken routes до відновлення assets.** Зробити canonical manifest для кожного активного розділу: `culture`, `section`, `imageSrc`, абсолютний `public` target, існування, MIME/розмір. CI має падати при першому missing image.
2. **Відновити або змінити всі 230 HeroCover-посилань.** Для томата або додати `public/images/cultures/tomat/ch01_biolohiya.jpg` … `ch08_zbir.jpg`, або атомарно замінити refs на фактично існуючі files. Не маскувати проблему fallback-ом.
3. **Узгодити один asset convention.** Рекомендований варіант: усі web assets тільки під `public/photos/<culture>/...` або `public/images/...`, з одним resolver-ом і case-sensitive перевіркою. Заборонити посилання з кореневої `фото/` без pipeline-копіювання у `public/`.
4. **Прибрати повтор томатної обкладинки.** Додати окремі тематичні covers для насінництва/кукурудзи або використовувати нейтральний cover, який не називає томат. Для `nasinnytstvo` краще мати власний namespace (`/images/cultures/nasinnytstvo/...`).
5. **Уніфікувати MDX imports.** Або створити справжній `src/components/mdx/index.ts` з явними exports, або замінити всі imports на реальні `@/components/mdx/<Component>` шляхи. Legacy `@/components/*` у винограді потрібно виправити до запуску production build.

### Локалізація

6. **Визначити модель джерела контенту:** окремі `uk/en` MDX-файли або один структурований content model з перекладеними полями. Поточна модель одного `filename` не може чесно обслуговувати дві мови.
7. **Змінити `getSectionContent`/metadata на locale-aware API.** `generateStaticParams`, `generateMetadata` і `SectionPage` мають гарантувати, що `/en` читає англійське джерело, а не український fallback без явного маркування.
8. **Винести hardcoded UI strings у messages.** Мінімум: breadcrumbs, sidebar labels, CTA, aria-labels, search status, календар, catalog categories, home metadata та Footer. Після цього перевірити snapshot/HTML для `/uk` і `/en`.
9. **Додати локалізаційний smoke test:** для кожної локалі перевіряти title/H1/body/alt/aria-label; тест має падати, якщо `/en` містить український section H1 або `/uk` містить англійський.

### MDX і таблиці

10. **Оновити policy-документацію.** Вибрати один канон: `AGENTS.md` (чисті Markdown-таблиці) або інше правило; прибрати суперечливі приклади `ComparisonTable`/`PremiumProcess` із `PROJECT_DOCUMENTATION.md`.
11. **Міграційно видалити `<ComparisonTable>` з `content/cultures/vynograd/15-khvoroby-1-mildyu-oiidum.md:112`** на стандартну GFM Markdown-таблицю; після цього видалити legacy mapping/imports, якщо вони не потрібні.
12. **Залишити `remark-gfm` і перевірити таблиці реальним render smoke test.** Тестувати багаторядкові cells, українські апострофи, довгі таблиці та мобільний overflow через існуючий `.comparison-table-wrapper`.

### Контроль якості

13. **Додати `npm run audit:media`** зі статусами: missing, duplicate semantic cover, unsupported prefix, external URL, orphan asset. Запускати його разом із `lint` у CI.
14. **Додати orphan-assets report.** Після виправлення missing refs перевірити assets, які існують у `public/`, але не мають жодного контентного споживача; це допоможе прибрати `tomat.jpeg`/`tomat.jpg` та legacy-копії лише після підтвердження їх використання.
15. **Не вважати HTTP 200 достатнім.** Для кожного route smoke test перевіряти, що `img src` повертає не лише HTML/404 fallback, а реальний image response з `Content-Type: image/*`.

## Пріоритетний порядок виправлення

1. F-01: відсутні assets (critical).
2. F-05: MDX imports і barrel module (high).
3. F-02/F-08: реальна локалізація `/en` (high/medium).
4. F-03: повтор томатної обкладинки (high).
5. F-06/F-07: canonical policy і міграція таблиць (medium).
6. F-09: CI-автоматизація та orphan audit (low, але необхідна для недопущення регресії).
