# Незалежний аудит: архітектура і навігація

**Проєкт:** `/home/ubuntu/agro_encyclopedia`  
**Дата аудиту:** 2026-10-15  
**Фокус:** маршрути, локалі, каталог насінництва, прямі переходи, нумерація, slug, metadata, `NextChapter`, 404.  
**Режим:** лише читання; вихідний код і контент не змінювалися.

## Summary

Маршрутна модель загалом зрозуміла: App Router має локалізований префікс `/{locale}`, культуру `/{culture}` і розділ `/{section}`; `meta.json` є фактичним реєстром slug і порядку розділів. Для більшості культур картка каталогу та sidebar формують маршрути з цього реєстру, а невідомі культура/секція проходять через `notFound()`.

Однак навігація не є надійною для продакшн-використання:

- **`NextChapter` майже всюди зашитий у `/uk`**: 302 із 304 знайдених переходів мають український абсолютний href. На англійській сторінці перехід змінює локаль або веде не в потрібний мовний контекст.
- Виявлено **масові розбіжності href ↔ slug** у MDX. Найочевидніші: усі переходи черешні містять числовий префікс (`/02-pidshchepy`) замість slug (`/pidshchepy`), фінальний перехід яблуні веде на неіснуючий `/biolohiya` замість `/botanika`, а частина seed-переходів посилається на розділи, яких немає в `nasinnytstvo`.
- Виноград має згенерований запис для `generation-prompts`, але файл `28-generation-prompts.md` відсутній; прямий маршрут буде згенерований, а під час рендерингу завершиться `notFound()`.
- Каталог насінництва **не має власної категорії**: `nasinnytstvo` не присутній у `SLUG_TO_CATEGORY` і через fallback автоматично потрапляє до овочевих культур.
- Footer містить `/uk/search` або `/en/search`, але сторінки `src/app/[locale]/search` немає — це гарантований dead link.
- Англійська локаль реалізована лише частково: metadata, заголовки, breadcrumbs, aria-label і значна частина сторінок залишаються українською; у Header немає перемикача мови.
- Окремої `not-found.tsx`/`404.tsx` немає: для помилкових culture/section використовується стандартна Next 404 без доменної навігації назад до каталогу.

**Загальна оцінка:** маршрутний каркас придатний як основа, але перед публічним релізом потрібна централізація route registry/locale-aware navigation і повна перевірка всіх контентних href. Найвищий ризик — англійська навігація та биті переходи з MDX.

## Перевірені джерела і методика

Прочитано:

- `AGENTS.md`
- `PROJECT_DOCUMENTATION.md`
- `PROJECT_OVERVIEW.md`
- `next.config.ts`, `middleware.ts`, `src/i18n/routing.ts`, `src/i18n/request.ts`
- `src/app/[locale]/page.tsx`
- `src/app/[locale]/[culture]/page.tsx`
- `src/app/[locale]/[culture]/[section]/page.tsx`
- `src/app/[locale]/calendar/page.tsx`, `src/app/[locale]/catalog/page.tsx`
- `src/lib/cultures.ts`
- `src/components/ui/CulturesCatalog.tsx`
- `src/components/layout/Header.tsx`, `Footer.tsx`
- `src/components/mdx/NextChapter.tsx`
- `content/cultures/nasinnytstvo/meta.json` і репрезентативні MD-файли культур.

Додатково фактично зіставлено всі `meta.json` із файлами розділів, перевірено наявність referenced files, дублікати slug, послідовність номерів файлів, `NextChapter` href та наявність відповідних app-маршрутів. Це не замінює ручну перевірку: для ключових висновків прочитано самі сторінки й репрезентативні MDX, а не лише результати скриптів.

## Findings

### F-01 — `NextChapter` примусово перемикає англійську сторінку на українську

**Severity: critical**

**Докази:**

- `src/components/mdx/NextChapter.tsx:4-21` приймає href як готовий абсолютний рядок і не додає/не зберігає поточну локаль.
- У контенті знайдено 304 `NextChapter`; 302 мають href, що починається з `/uk/`.
- Приклад: `content/cultures/vynograd/27-mify-ta-pomylky.md` містить контент, що використовується і для `/en/vynograd/mify-ta-pomylky`, але його переходи зашиті як `/uk/...`.

**Вплив:** користувач на `/en/...` після кліку отримує українську URL/локаль. Це порушує інваріант локалізованої навігації та робить англійську гілку непослідовною практично в усіх розділах.

**Рекомендації:**

1. Не зберігати локалізований абсолютний href у MDX. Зберігати `nextSectionSlug` або відносний route key.
2. Передавати в `NextChapter` поточний `locale` з `SectionPage` і будувати `/${locale}/${culture}/${slug}` у єдиному route builder.
3. На етапі CI заборонити контентні href, що починаються з `/uk/` або `/en/`, якщо вони не є явно позначеним зовнішнім/міжкультурним переходом.
4. Додати E2E smoke-перевірку: `/en/<culture>/<section>` → NextChapter → URL починається з `/en/`.

### F-02 — Масові биті `NextChapter` через невідповідність slug

**Severity: critical**

**Докази й конкретні маршрути:**

- `content/cultures/chereshnia/01-biolohiya.md:139` → `/uk/chereshnia/02-pidshchepy`, але `content/cultures/chereshnia/meta.json:33` визначає slug `pidshchepy`; правильний маршрут — `/uk/chereshnia/pidshchepy`.
- Та сама помилка повторюється в ланцюжку черешні: `02-pidshchepy.md` → `/03-sorty`, `03-sorty.md` → `/04-posadka`, …, `17-zamorozky.md` → `/01-biolohiya`. За фактичним `meta.json` це 17 битих переходів.
- `content/cultures/yablunia/17-mify.md:180-182` → `/uk/yablunia/biolohiya`, але `content/cultures/yablunia/meta.json` має перший slug `botanika`; ціль гарантовано 404.
- У ягідних файлах є href з неузгодженими Unicode/транслітерованими slug, наприклад `content/cultures/lokhyna/04-obrizka-ta-formuvannia.md:84` → `/uk/lokhyna/zhyvlennia-nh4-фертигація`, тоді як мета визначає ASCII slug `zhyvlennia-nh4-fertyhatsiya`.
- Сканування власних meta-реєстрів дало 40 href, що не збігаються зі slug їхньої культури; один із них (`nasinnytstvo/11` → `/uk/tomat/...`) виглядає як навмисний міжкультурний перехід і потребує окремого allow-list. Решта містить підтверджені 404-приклади вище.

**Вплив:** навігація між главами ламається на сторінці, хоча самі статичні маршрути можуть існувати. Це особливо небезпечно, бо користувач бачить оформлену картку «Наступний розділ» і очікує робочий deep link.

**Рекомендації:**

1. Зробити `meta.json` єдиним джерелом істини для всіх `NextChapter` і sibling links.
2. Переписати href у MDX на slug без номерів файлу; номер показувати лише в `chapterNum`/заголовку.
3. Додати валідатор: кожен `NextChapter` має або відповідати slug тієї ж культури, або бути явно дозволеним cross-culture route.
4. Перевіряти не лише target string, а повний маршрут `/{locale}/{culture}/{section}` у двох локалях.

### F-03 — Виноград має згенерований, але фізично відсутній файл розділу

**Severity: high**

**Докази:**

- `content/cultures/vynograd/meta.json` містить 28-му секцію `generation-prompts` із filename `28-generation-prompts.md`.
- Фактично `content/cultures/vynograd/` містить розділи 01–27; `28-generation-prompts.md` відсутній.
- `src/app/[locale]/[culture]/[section]/page.tsx:240-247` генерує params із meta, тому маршрут `/uk/vynograd/generation-prompts` та `/en/vynograd/generation-prompts` потрапляє до статичної матриці.
- `src/app/[locale]/[culture]/[section]/page.tsx:272-274` викликає `getSectionContent`; відсутній файл повертає `null`, після чого викликається `notFound()`.

**Вплив:** каталог показує 28 розділів і може вести на маршрут, який завершується 404. Це також спотворює нумерацію та `stats.sections`.

**Рекомендації:** або додати фактичний файл і локалізовані дані, або вилучити секцію з `meta.json` до моменту готовності. CI має падати при кожному filename із meta, якого немає на диску.

### F-04 — Насінництво класифікується як овочі й не має видимого каталожного entry point

**Severity: high**

**Докази:**

- `content/cultures/nasinnytstvo/meta.json:2` має slug `nasinnytstvo` і 25 секцій.
- `src/components/ui/CulturesCatalog.tsx:9-36` не містить `nasinnytstvo` у `SLUG_TO_CATEGORY`.
- `src/components/ui/CulturesCatalog.tsx:147` реалізує fallback `SLUG_TO_CATEGORY[slug] ?? "vegetable"`; отже насінництво автоматично потрапляє до «Овочеві та Баштанові».
- У `CATEGORIES` (`CulturesCatalog.tsx:70-112`) немає категорії «Насінництво й селекція».
- Компонент будує картки як `href={\`/${locale}/${culture.slug}\`}` (`CulturesCatalog.tsx:559-562`), тому прямий маршрут `/uk/nasinnytstvo` технічно можливий, але тематично прихований у неправильній категорії.

**Вплив:** фокусний каталог насінництва не знаходиться користувачем через правильну категорію; статистика категорій і позиціонування контенту вводять в оману. Це не 404, але навігаційно це втрата окремого розділу продукту.

**Рекомендації:** додати окремий category id (наприклад `seed`) та мапінг `nasinnytstvo: "seed"`; додати локалізовані назву/опис категорії; окремо перевірити, чи `advanced`, `audit`, `references`, `epibudynok` справді мають бути в каталозі «Бджільництво», бо нині вони також примусово мапляться до `apiary`.

### F-05 — Частина seed-контенту фізично є, але не входить у route registry

**Severity: high**

**Докази:**

- `content/cultures/nasinnytstvo/meta.json:18-319` реєструє 25 секцій, від файлового номера 03 до 28.
- У папці `content/cultures/nasinnytstvo/` є додаткові MD-файли `26-eksperymentalnyi-dyzain-kontrol.md`, `27-ryzyky-bezpeka-fitosanitarna-vidpovidalnist.md`, `28-kultura-spetsyfichni-protokoly-redaktsiia.md`, а також багато `REPORT_*.md` і `SOURCES_*.md`. Додаткові 26/27/28 у цьому випадку зареєстровані не всіма назвами, а лише 26/27/28 із власними slug-ами; важливо, що службові REPORT/SOURCES не є маршрутами і не повинні випадково потрапляти до loader-а.
- `content/cultures/nasinnytstvo/27-ryzyky-bezpeka-fitosanitarna-vidpovidalnist.md:140` → `/uk/nasinnytstvo/kultura-specyfichni-protokoly`, але meta має `kultura-specyfichni-protokoly-redaktsiia` (`meta.json:308`). Це confirmed 404.
- `content/cultures/nasinnytstvo/12-harbuzovi-vlasne-nasinnia.md:154` → `/uk/nasinnytstvo/kukurudza-tsukrova-vlasne-nasinnia`; такої секції в seed meta немає.
- `content/cultures/nasinnytstvo/16-kapustiani-dvorichni-vlasne-nasinnia.md:119` → `/uk/nasinnytstvo/koreneplody-ta-zelennia-vlasne-nasinnia`, тоді як зареєстрований slug — `koreneplody-zelenni-vlasne-nasinnia`.

**Рекомендації:** визначити політику для редакційних файлів: зберігати їх поза `content/cultures/<slug>` або фільтрувати за чітким filename pattern; синхронізувати 26–28 і всі NextChapter href з meta; не вважати наявність MD-файлу достатньою — він має бути зареєстрований і досяжний.

### F-06 — Footer веде на неіснуючий `/search`

**Severity: high**

**Докази:**

- `src/components/layout/Footer.tsx:27-30` формує `${L}/search`, тобто `/uk/search` або `/en/search`.
- У `src/app` немає `src/app/[locale]/search/page.tsx`; пошук реалізований як overlay у `src/components/layout/Header.tsx:114-258`.

**Вплив:** кожен клік на «Пошук» у footer веде на 404, хоча пошуковий UI існує в Header.

**Рекомендації:** або замінити footer link на кнопку/подію `open-search`, або створити повноцінну локалізовану сторінку `/[locale]/search`, яка використовує той самий індекс. Якщо потрібна кнопка, не маскувати її під route-link.

### F-07 — Англійська локаль має українські metadata й hardcoded UI

**Severity: high**

**Докази:**

- `src/app/[locale]/page.tsx:10-14` має статичні українські title/description для обох локалей.
- `src/app/[locale]/calendar/page.tsx:5-8` та `src/app/[locale]/catalog/page.tsx:7-10` також експортують лише українські metadata.
- `src/app/[locale]/[culture]/page.tsx:27-30` для `locale === "en"` бере англомовні дані, але suffix title залишається українським: `${data.name} — Повний довідник`.
- У `src/app/[locale]/[culture]/page.tsx:62-65`, `src/app/[locale]/[culture]/[section]/page.tsx:353-358`, `CulturesCatalog.tsx:464-490, 557-597` є hardcoded українські breadcrumbs, назви, aria-label і одиниці («розд.», «год»), навіть коли `locale=en`.
- `messages/en.json` містить потрібні ключі, але значна частина сторінок їх не використовує.

**Вплив:** `/en` існує як route prefix, але не є повноцінною англомовною версією. Це погіршує SEO, accessibility і довіру до локалізації.

**Рекомендації:** винести title/description, breadcrumbs, catalog labels, aria-label та одиниці в `messages/{locale}.json`; використовувати `getTranslations` у server pages і `useTranslations` у client components; додати локалізовані `alternates`/canonical для metadata.

### F-08 — Немає мовного перемикача, а locale-підтримка лише одностороння

**Severity: medium**

**Докази:**

- `src/i18n/routing.ts:3-8` коректно оголошує `uk`, `en`, `localePrefix: "always"` і вимикає автоматичне визначення.
- `src/components/layout/Header.tsx:9-120` використовує `useLocale()` для побудови поточної URL, але не містить кнопки/посилання переходу між `uk` і `en`.
- `rg` по `src/components`/`src/app` не виявив route-aware locale switcher; CSS-коментар «Language switcher» є, але компонента немає.

**Вплив:** англійська гілка досяжна лише ручним редагуванням URL або зовнішнім посиланням; користувач не може перемкнути мову з поточної сторінки зі збереженням culture/section.

**Рекомендації:** створити switcher, який замінює лише перший сегмент pathname і зберігає `culture/section`; для неповних/битих шляхів fallback має вести на локалізований каталог, а не на випадкову головну.

### F-09 — Немає власної 404/not-found сторінки та явної перевірки locale

**Severity: medium**

**Докази:**

- У `src/app` немає `not-found.tsx`, `404.tsx` або `error.tsx`.
- `src/app/[locale]/[culture]/page.tsx:34-36` і `src/app/[locale]/[culture]/[section]/page.tsx:266-274` коректно викликають `notFound()` для невідомих culture/section.
- Але `src/app/[locale]/layout.tsx:34-35` не перевіряє locale через `hasLocale`/`routing.locales`; `src/i18n/request.ts:5-8` за невідомого locale мовчки підміняє його на `uk`.

**Вплив:** помилки culture/section отримують стандартний екран Next без breadcrumbs/посилання на каталог; при обході middleware невідомий locale може відрендерити українські повідомлення під невалідним URL замість 404.

**Рекомендації:** додати `src/app/not-found.tsx` або локалізовані not-found boundaries; у `[locale]/layout.tsx` викликати `notFound()` для locale поза `routing.locales`; перевірити політику middleware для `/`, `/fr`, `/ukx` і trailing slash.

### F-10 — Нумерація файлів, номерів секцій і фактичного порядку не має одного інваріанта

**Severity: medium**

**Докази:**

- `src/app/[locale]/[culture]/page.tsx:117-129` і section page:334-341 нумерують за позицією в масиві `culture.sections`, а не за числом у filename.
- `nasinnytstvo` починається з `03-...` і має пропуски 01/02/13; `meta.json` коректно має 25 секцій, але файлова нумерація не збігається з UI-нумерацією.
- `bdzhilnytstvo` має пропуски 27/34; `epibudynok` починається з 72; `kukurudza-tsukrova` має пропуск до 13; `kavun` має два файли з префіксом `01`.
- Для черешні контентні `NextChapter` намагаються використовувати filename-подібні `02-pidshchepy`, тоді як route registry використовує чисті slug. Це показує, що нумерація та route slug змішані.

**Вплив:** номер у назві файла, chapterNum, номер у каталозі та URL можуть означати різні речі. Це підживлює биті переходи і ускладнює редакційне додавання нової глави.

**Рекомендації:** зберігати окремі поля `order` (число для UI), `slug` (URL) і `filename` (диск); не виводити URL із filename; перевіряти унікальність/монотонність `order`, але дозволяти історичні filename без перенумерації.

### F-11 — Документація розходиться з фактичною реалізацією навігаційних компонентів

**Severity: low**

**Докази:**

- `PROJECT_DOCUMENTATION.md:29-36, 42-46` описує `ComparisonTable` і `PremiumProcess`; `PROJECT_OVERVIEW.md:85, 92-100` стверджує, що їх видалено/заборонено.
- Фактично `src/app/[locale]/[culture]/[section]/page.tsx:18,31,67,89` імпортує/реєструє `PremiumProcess` і `ComparisonTable`; самі компоненти існують.
- Це не безпосередній 404, але робить policy щодо MDX неоднозначною і ускладнює автоматичну перевірку контенту.

**Рекомендації:** обрати одну актуальну політику, оновити документацію та додати lint rule/CI check для заборонених MDX-компонентів, якщо заборона справді чинна.

## Позитивні результати

- `src/i18n/routing.ts` має чіткий перелік локалей `uk/en`, `defaultLocale: uk` і `localePrefix: always`.
- `src/lib/cultures.ts:25-63` централізує читання `meta.json` і контенту; `generateStaticParams` для culture/section використовує цей реєстр.
- `src/app/[locale]/[culture]/[section]/page.tsx:269-274` перевіряє і culture, і section, і фізичну наявність контенту перед рендером.
- Для основних культур `meta.sections[].filename` здебільшого існує; зокрема, прямі картки catalog → culture (`CulturesCatalog.tsx:559-562`) побудовані правильно.
- `src/app/[locale]/catalog/page.tsx` є робочим окремим route entry point, хоча він не підключений до глобальної навігації.

## Пріоритезований план виправлення

### P0 — до будь-якого релізу

1. Замінити hardcoded `/uk` у `NextChapter` і привести всі 304 переходи до locale-aware route builder.
2. Автоматично перевірити всі MDX href проти `meta.json`; виправити черешню, яблуню, ягідні Unicode-slug і seed-переходи.
3. Усунути або виправити виноградний `generation-prompts` route.
4. Прибрати Footer `/search` dead link або реалізувати `/[locale]/search`.

### P1 — навігаційна цілісність

1. Додати `nasinnytstvo` як окрему категорію каталогу.
2. Впровадити єдиний registry з типізованим `order`, `slug`, `filename` і `isCrossCulture`.
3. Додати CI checks: missing filename, duplicate slug, broken internal href, invalid locale prefix, cross-culture allow-list.
4. Додати власну локалізовану 404 з маршрутами назад до каталогу/головної.

### P2 — якість локалізації та discoverability

1. Додати перемикач `uk/en`, що зберігає поточний culture/section.
2. Локалізувати metadata і всі hardcoded labels/aria-label/units.
3. Додати `/catalog` і `/diagnostics` до Header або іншої глобальної навігації; зараз ключі `nav.catalog` і `nav.diagnostics` є в messages, але Header показує лише home/calendar.
4. Узгодити `PROJECT_DOCUMENTATION.md`, `PROJECT_OVERVIEW.md` та фактичний набір MDX-компонентів.

## Caveats

- Аудит проводився статично у спільній копії; код не запускався з браузером і не виконувався deploy smoke test.
- Один із невідповідних target-ів у seed-контенті є свідомим міжкультурним переходом до томата; його треба перевірити окремим allow-list, а не механічно заміняти.
- Перевірка 404 для відсутнього файла винограду випливає безпосередньо з `getSectionContent()` і `notFound()`; це не твердження про HTTP-статус конкретного deploy cache.
