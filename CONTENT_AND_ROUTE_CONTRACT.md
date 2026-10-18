# Agro Encyclopedia — Content & Route Contract

**Статус:** передрелізний контракт для локальної української версії  
**Дата:** 2026-10-18  
**Deploy:** не виконувався; цей документ описує локальну робочу копію.

## 1. Публічна локаль

Єдина повністю підтримана public locale — `uk`. Англійська metadata-гілка може залишатися в registry для майбутнього перекладу, але `/en/**` не вважається готовою локалізацією і не повинна використовуватися як production entry point.

## 2. Типи каталогів

`meta.json.kind` розрізняє:

- `culture` — окрема рослина, ягідна культура або овоч;
- `seed-production` — насінництво, селекція та розсадництво;
- `apiary` — бджільництво й апіпродукти;
- `reference` — довідкові матеріали;
- `special` — спеціалізовані модулі.

Каталог не повинен мовчки класифікувати невідомий slug як овочевий. Для невідомих значень використовується `special` або явна редакційна помилка.

## 3. Section identity

Для кожної секції розрізняються:

- `order` — порядок показу в UI;
- `number`/`chapterNumber` — редакційний номер глави;
- `slug` — canonical URL segment;
- `filename` — фізичний Markdown-файл;
- `linkedCulture`/`linkedSection` — canonical target для cross-catalog bridge.

URL не будується з filename. Якщо секція є bridge без локального файла, вона присутня в registry та навігації, але не генерується як дубльований route.

## 4. Глава 13 насінництва

Глава 13 про цукрову кукурудзу належить canonical culture route:

`/uk/kukurudza-tsukrova/kukurudza-tsukrova-vlasne-nasinnia`

Seed catalog містить registry bridge `/uk/nasinnytstvo/kukurudza-tsukrova-vlasne-nasinnia`, який веде на canonical route через `linkedCulture` і `linkedSection`. Bridge не створює другого Markdown-файла або дубльованої сторінки.

## 5. MDX contract

Публічний контент використовує стандартний GFM Markdown для таблиць. Заборонені:

- `<ComparisonTable>`;
- `<PremiumProcess>`;
- внутрішні редакторські маркери та технічні checklist-и;
- публічне рендерення `REPORT_*` і `SOURCES_*` матеріалів.

Зображення можуть посилатися на HeroCover fallback лише коли оригінальний asset відсутній; validator зберігає warning, а server-side renderer не віддає broken image.

## 6. Quality gates перед deploy

Перед будь-яким deploy обов’язково виконати:

```bash
npm ci --ignore-scripts --no-audit --no-fund
npm run verify:release
```

`verify:release` охоплює metadata, routes, assets, editorial rules, content coverage, TypeScript, ESLint, production dependency audit і production build.

Після build додатково перевіряються:

- `/uk`, `/uk/catalog`, `/uk/nasinnytstvo`;
- canonical кукурудзяна глава;
- representative old culture, grape, seed chapters;
- `/sitemap.xml` і `/robots.txt`;
- browser console та desktop/mobile visual smoke-test.

Deploy не є частиною локального release verification і виконується лише після окремого підтвердження користувача.
