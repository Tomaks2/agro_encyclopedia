# 📋 ЯК ДОДАТИ НОВУ КУЛЬТУРУ (NEW CULTURE GUIDE)

Додавання нової культури (наприклад, Виноград) складається з трьох простих кроків. Програмування не потрібне!

## КРОК 1: Згенерувати контент

Використовуй `MASTER_PROMPT.md` як базову інструкцію для AI (себе або іншого агента), щоб згенерувати контент.
Кожен розділ має бути збережений як окремий файл:
`01-назва.md`, `02-назва.md` і т.д.

## КРОК 2: Створити папку та покласти файли

1. Створи папку в `content/cultures/назва_латиницею/` (наприклад, `content/cultures/vynohrad/`)
2. Поклади туди всі згенеровані `.md` файли.
3. Створи папку `photos/` для зображень.

## КРОК 3: Створити файл meta.json

Цей файл — "паспорт" культури, який потрібен системі для відображення її на сайті.
Скопіюй `meta.json` з існуючої культури (наприклад, з `yablunia`) і заміни дані.

**Приклад `meta.json`:**
```json
{
  "slug": "vynohrad",
  "emoji": "🍇",
  "color": "#8b5cf6",
  "colorLight": "#f3e8ff",
  "uk": {
    "name": "Виноград",
    "latinName": "Vitis vinifera",
    "tagline": "Від лози до врожаю — секрети сонячної ягоди.",
    "description": "Повний практичний довідник по вирощуванню винограду. Формування куща, зелені операції, захист від мільдью та оїдіуму."
  },
  "en": {
    "name": "Grape",
    "latinName": "Vitis vinifera",
    "tagline": "From vine to harvest — secrets of the sun berry.",
    "description": "Complete practical guide to growing grapes. Pruning, green operations, protection against mildew and oidium."
  },
  "stats": {
    "sections": 8,
    "readTimeMinutes": 120
  },
  "sections": [
    {
      "slug": "botanika",
      "filename": "01-botanika.md",
      "uk": { "title": "Будова куща", "description": "Рукави, лоза, вічка та зелені пагони." },
      "en": { "title": "Vine Structure", "description": "Arms, canes, buds and green shoots." }
    },
    ...
  ]
}
```

Все! При наступному оновленні сторінки (або збиранні проекту) нова культура автоматично з'явиться на головній сторінці, у футері та пошуку.
