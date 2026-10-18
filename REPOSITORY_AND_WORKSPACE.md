# Agro Encyclopedia — репозиторій і робоче середовище

## 1. Основний GitHub-репозиторій

- **Repository:** [Tomaks2/agro_encyclopedia](https://github.com/Tomaks2/agro_encyclopedia)
- **Clone URL:** `https://github.com/Tomaks2/agro_encyclopedia.git`
- **GitHub web URL:** `https://github.com/Tomaks2/agro_encyclopedia`
- **Очікувана основна гілка:** `main`
- **Призначення:** основний сайт Agro Encyclopedia та його база аграрних знань.

> Важливо: ця робоча копія була отримана з указаного GitHub-репозиторію, але в поточному sandbox-каталозі `.git` відсутній. Передача виконується як повний snapshot-файл, а не як Git commit. Перед публікацією змін потрібно окремо клонувати репозиторій або відновити Git remote у робочій копії.

## 2. Поточний локальний шлях

```text
/home/ubuntu/agro_encyclopedia
```

Основні каталоги:

```text
content/       MDX-контент, культури, metadata, seed-каталог і внутрішні звіти
public/        зображення, статичні assets і PWA-ресурси
src/           Next.js App Router, компоненти, loader-и, i18n і стилі
scripts/       генерація пошукового індексу та допоміжні скрипти
docs/          аудит, handoff і робоча документація
```

Ключові файли:

```text
package.json
package-lock.json
AGENTS.md
PROJECT_OVERVIEW.md
PROJECT_DOCUMENTATION.md
AUDIT_AND_REMEDIATION_PLAN_2026-10-15.md
IMPLEMENTATION_PROGRESS_2026-10-16.md
HANDOFF_AGRO_ENCYCLOPEDIA_2026-10-16.md
content/cultures/nasinnytstvo/meta.json
```

## 3. Як відновити роботу з GitHub

Безпечна нова копія:

```bash
git clone https://github.com/Tomaks2/agro_encyclopedia.git agro_encyclopedia
cd agro_encyclopedia
```

Після цього перенести з handoff snapshot усі зміни, яких ще немає в GitHub. Не перезаписувати нову копію без попереднього порівняння.

Якщо потрібно підключити remote до цієї snapshot-копії:

```bash
cd /home/ubuntu/agro_encyclopedia
git init
git remote add origin https://github.com/Tomaks2/agro_encyclopedia.git
git fetch origin
git branch -M main
```

> Не виконувати `git push`, `git reset --hard`, merge або force push без окремого рішення власника репозиторію.

## 4. Встановлення залежностей і перевірка

```bash
cd /home/ubuntu/agro_encyclopedia
npm install --ignore-scripts --no-audit --no-fund
npx tsc --noEmit
npm run build
npm run lint
```

Для production-перевірки в чистій копії додатково:

```bash
rm -rf node_modules .next
npm ci --ignore-scripts
npx tsc --noEmit
npm run build
```

Поточний аудит попереджає, що clean install, lint і production dependency audit ще потребують окремого завершального етапу. Успішний локальний build не означає автоматичну production готовність.

## 5. Preview

Запуск:

```bash
npm run dev -- --webpack --hostname 0.0.0.0 --port 3000
```

Поточний preview URL sandbox:

```text
https://3000-iajdrpd4vf87eavjze59e-7ee310c8.us4.manus.computer
```

Корисні перевірки:

```text
/uk
/uk/catalog
/uk/catalog?category=seed
/uk/nasinnytstvo
/uk/nasinnytstvo/vstup-chomu-vlasne-nasinnia
/uk/nasinnytstvo/biolohiia-zapylennia-ta-rozmnozhennia
/uk/nasinnytstvo/chystota-sortu-izoliatsiia
```

Поточна публічна локаль — лише `uk`. Англійські маршрути навмисно приховані до окремого рішення.

## 6. Поточна версія seed-каталогу

Каталог:

```text
content/cultures/nasinnytstvo/
```

У metadata зареєстровано 27 розділів. Перші три:

```text
01-vstup-chomu-vlasne-nasinnia.md
02-biolohiia-zapylennia-ta-rozmnozhennia.md
03-chystota-sortu-izoliatsiia.md
```

Глави 01–02 відновлено з наданого еталонного матеріалу користувача. Вони не повинні бути замінені вигаданим або скороченим текстом без окремого редакційного рішення.

## 7. Документи, які потрібно прочитати перед продовженням

1. `HANDOFF_AGRO_ENCYCLOPEDIA_2026-10-16.md`
2. `AGENTS.md`
3. `AUDIT_AND_REMEDIATION_PLAN_2026-10-15.md`
4. `IMPLEMENTATION_PROGRESS_2026-10-16.md`
5. `PROJECT_OVERVIEW.md`
6. `PROJECT_DOCUMENTATION.md`
7. `docs/handoff/CONTENTS.md`
8. `docs/handoff/source-material/EXAMPLE_CHAPTERS_01_02.md`
9. `docs/handoff/source-material/INSTRUCTIONS_FOR_AI.md`
10. `docs/handoff/source-material/ПландоповненняAgroEncyclopedia_власненасіння,селекціятарозсадництво.md`

## 8. Що вже зроблено в цьому snapshot

- Додано seed-каталог і його metadata.
- Додано глави 01–02, які раніше були лише в еталонному файлі.
- Виправлено редакційну двозначну нумерацію (`01`, `02`, `03`).
- Додано окрему категорію насінництва на головній сторінці.
- Категорійні картки ведуть на каталог із query-фільтром.
- Виправлялися locale-aware `NextChapter`, HeroCover fallback, мобільна навігація, GFM-таблиця винограду та Footer search trigger.
- Останній build після додавання глав 01–02 успішний; згенеровано 478 сторінок.

## 9. Що ще потрібно зробити

- Завершити clean install і привести lock-файл до надійного стану.
- Перевірити та зменшити production dependency vulnerabilities.
- Довести lint до нуля або зафіксувати обґрунтовані винятки.
- Вирішити власника/маршрут глави 13 про кукурудзу.
- Перевірити всі NextChapter у всіх каталогах.
- Перевірити всі HeroCover assets і прибрати невідповідні повторні фото.
- Прибрати редакторські артефакти з public content.
- Уніфікувати legacy MDX винограду.
- Провести повний desktop/mobile screenshot-аудит.
- Не деплоїти до завершення P0/P1 із remediation plan.

## 10. Архів передачі

Цей файл входить до:

```text
/home/ubuntu/agro_encyclopedia_handoff_2026-10-16.tar.gz
```

Архів не містить `node_modules`, `.next`, кешів, секретів або credentials. Він містить повну поточну робочу копію, код, контент, metadata, аудит, handoff-документи й вихідні еталонні матеріали.
