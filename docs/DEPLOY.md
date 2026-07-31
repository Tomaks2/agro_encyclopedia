# 🚀 Деплой АгроЕнциклопедії на Vercel

## Швидкий деплой (рекомендований спосіб)

### Крок 1 — Завантажте код на GitHub

```bash
# Ініціалізувати git (якщо ще не зроблено)
git init
git add .
git commit -m "Initial commit"

# Завантажити на GitHub
git remote add origin https://github.com/ВАШ_АКАУНТ/agro-encyclopedia.git
git push -u origin main
```

### Крок 2 — Підключити до Vercel

1. Зайдіть на [vercel.com](https://vercel.com)
2. Натисніть "New Project"
3. Виберіть репозиторій з GitHub
4. Параметри збірки Vercel визначить автоматично (Next.js)
5. Натисніть "Deploy"

Після цього кожен `git push` до `main` автоматично оновлює сайт.

---

## Ручний деплой через Vercel CLI

```bash
# Встановити Vercel CLI
npm install -g vercel

# Авторизація
vercel login

# Деплой (з поточної папки)
vercel --prod
```

---

## Архітектура деплою

Проєкт побудований як **SSG (Static Site Generation)**:

- Усі сторінки культур генеруються статично під час білду
- Пошуковий індекс (`public/search-index.json`) генерується автоматично скриптом `scripts/generate-search-index.js` перед кожним білдом
- Після деплою сайт не потребує серверного рантайму для основних сторінок

```
npm run build
  └── node scripts/generate-search-index.js   ← генерує search-index.json
  └── next build                               ← SSG: 700+ статичних HTML сторінок
```

---

## Змінні оточення

Проєкт не потребує жодних secrets або env-змінних для базового функціонування.

---

## Перевірка після деплою

Після деплою перевірте:

- [ ] Головна сторінка `/uk` відкривається
- [ ] Каталог `/uk/catalog` показує всі культури
- [ ] Одна зі сторінок культур, наприклад `/uk/hrusha`
- [ ] Один розділ культури, наприклад `/uk/hrusha/biolohiya`
- [ ] Пошук у хедері повертає результати
