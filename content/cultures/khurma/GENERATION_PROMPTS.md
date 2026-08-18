# GENERATION_PROMPTS — ХУРМА (12 інфографік)

Цей файл містить 12 готових промптів для генерації інфографік хурми в затвердженому стилі сайту. Кожен промпт прив'язаний до конкретного місця вставки: після зазначеної СХЕМИ у вказаному розділі.

**Стиль для всіх промптів:** білий фон, темно-зелений #1a3d2e + золото #c9a227, serif-заголовки, flat-vector ботанічна ілюстрація, українська мова, 4:3.

**Формат вставки після генерації:** файл інфографіки помістити в папку `/images/cultures/khurma/charts/`, а в MD-файл після зазначеної СХЕМИ додати рядок:

```
<LightboxImage src="/images/cultures/khurma/charts/FILENAME.png" alt="опис" />
```

Коли інфографіка згенерована успішно — напишіть Manus, яка саме, і промпт буде видалено, а LightboxImage-вставка зафіксована у фінальному комплекті. Якщо не вдалося — Manus догенерує, коли відновиться ліміт генерації.

---

## 1. PCNA vs PCA: два механізми в'язкості
**Куди:** `01-biolohiya.md`, після СХЕМИ 129 (КЛАСИФІКАЦІЯ ХУРМИ ЗА ТИПОМ В'ЯЗКОСТІ).

**Промпт:**
```
Scientific orchard infographic on white background, dark green #1a3d2e and gold #c9a227 accents, serif headings, flat-vector botanical style, Ukrainian language. Title: "PCNA / PCA: ДВА МЕХАНІЗМИ В'ЯЗКОСТІ". Two side-by-side comparison panels. Left panel "PCNA (не в'яже)": cross-section of a persimmon fruit with brown polymerized tannin spots around seeds, caption "Танін полімеризується при дозріванні — їдять твердою". Right panel "PCA (в'яже)": persimmon cross-section with uniform pale flesh, caption "Розчинний танін — дозрівання або CO₂/етанол". Bottom strip with examples: "PCNA: Хіакуме, Дзіро, Фую | PCA: Хачія, Зенджі-Мару, Сибіру". 4:3 aspect ratio, clean editorial layout, no photos.
```

## 2. Підщепи: матриця вибору
**Куди:** `02-pidshchepy.md`, після СХЕМИ 131 (ПІДЩЕПИ ХУРМИ: ПОРІВНЯЛЬНА МАТРИЦЯ).

**Промпт:**
```
Scientific orchard infographic on white background, dark green #1a3d2e and gold #c9a227 accents, serif headings, flat-vector botanical style, Ukrainian language. Title: "ПІДЩЕПИ ХУРМИ: КОМУ ЯКА". Three vertical panels, each with a flat-vector rootstock illustration (small tree with root system). Panel 1: "D. kaki — Південь, Крим, до -15°C". Panel 2: "D. lotus — Центральна Україна, до -25°C, боїться хлорозу". Panel 3: "D. virginiana — експерименти Лісостепу, до -30°C, хлороз на вапняку". Bottom gold bar: "Правило: підщепа переживе сорт — обирай під клімат, а не під сорт". 4:3, clean editorial layout.
```

## 3. Хлороз на вапняку
**Куди:** `02-pidshchepy.md`, після СХЕМИ 132 (ХЛОРОЗ НА ВАПНЯКУ).

**Промпт:**
```
Scientific orchard infographic on white background, dark green #1a3d2e and gold #c9a227 accents, serif headings, flat-vector botanical style, Ukrainian language. Title: "ХЛОРОЗ НА ВАПНЯКУ: ЛАНЦЮГ ПОРУШЕННЯ". Vertical cause-effect chain of 4 flat-vector nodes connected by arrows: "pH > 7,5" → "Fe/Mn недоступні" (roots illustration with blocked uptake) → "листя жовкне між жилками" (yellow leaf with green veins) → "дерево гине за 1–2 роки". Bottom strip: "Профілактика: pH 6,0–7,2, сірка, хелати Fe, підщепа стійка". 4:3, clean editorial layout.
```

## 4. Посадкова яма: шари
**Куди:** `04-posadka.md`, після СХЕМИ 135 (ПОСАДКОВА ЯМА ХУРМИ).

**Промпт:**
```
Scientific orchard infographic on white background, dark green #1a3d2e and gold #c9a227 accents, serif headings, flat-vector botanical style, Ukrainian language. Title: "ПОСАДКОВА ЯМА ХУРМИ: ШАРИ ЗНИЗУ ВГОРУ". Cross-section side view of a planting hole with 5 labeled layers from bottom to top: "1. Дренаж 15–20 см (галька)" → "2. Компост + верхній шар ґрунту" → "3. Коренева шийка на рівні ґрунту" → "4. Мульча 8–10 см (не торкається штамба)" → "5. Об'єм ями 60×60×60 см". Side note in gold: "Стоп-фактори: pH > 7,5, застій води, близ ґрунтових вод < 1,5 м". 4:3, clean editorial layout.
```

## 5. Механізм в'язкості: танін + білок
**Куди:** `09-taniny-viazuchist.md`, після СХЕМИ 142 (МЕХАНІЗМ В'ЯЗКОСТІ).

**Промпт:**
```
Scientific orchard infographic on white background, dark green #1a3d2e and gold #c9a227 accents, serif headings, flat-vector botanical style, Ukrainian language. Title: "ЧОМУ В'ЯЖЕ: ТАНІН ЗВ'ЯЗУЄ БІЛОК СЛИНИ". Two-step flat-vector diagram. Step 1: magnified view of a persimmon cell releasing tannin molecules (small hexagons) into saliva, caption "Розчинний танін потрапляє на слину". Step 2: tannin hexagons binding to saliva protein strands, proteins clumping, caption "Білки осаджуються — відчуття сухості та шорсткості". Gold bottom bar: "Це не отрута: танін полімеризується при Brix ≥16% — і в'язкість зникає". 4:3, clean editorial layout.
```

## 6. Методи усунення в'язкості
**Куди:** `10-metody-dozryvannia.md`, після СХЕМИ 144 (МЕТОДИ УСУНЕННЯ В'ЯЗКОСТІ).

**Промпт:**
```
Scientific orchard infographic on white background, dark green #1a3d2e and gold #c9a227 accents, serif headings, flat-vector botanical style, Ukrainian language. Title: "5 МЕТОДІВ УСУНЕННЯ В'ЯЗКОСТІ". Five horizontal method rows, each with flat-vector icon, name, time and result: 1. "CO₂-камера 20% 24–48 год" — "твердий плід" (chamber icon). 2. "Етанол 1 мл/плід 2–3 дні" — "м'який" (drop icon). 3. "Яблука в пакеті 3–7 днів" — "м'який, традиційний" (apple + bag icon). 4. "Заморожування -20°C + відтавання 2 дні" — "дуже м'яка" (snowflake icon). 5. "Карбід 1–2 г на ящик 2–3 дні" — "застарілий" (warning icon). Gold star on row 1: "Єдиний метод для твердого товарного плоду". 4:3, clean editorial layout.
```

## 7. Антракноз: цикл та захист
**Куди:** `11-khvoroby.md`, після СХЕМИ 146 (АНТРАКНОЗ ПЛОДІВ).

**Промпт:**
```
Scientific orchard infographic on white background, dark green #1a3d2e and gold #c9a227 accents, serif headings, flat-vector botanical style, Ukrainian language. Title: "АНТРАКНОЗ: ЦИКЛ І ДВА ВІКНА ЗАХИСТУ". Circular disease cycle with 4 flat-vector nodes: "Зимівля міцелію на муміях" → "Спороношення у теплу дощову погоду травня" → "Інфікування через квітконіжку" → "Чорні вдавлені плями серпень–жовтень". Two gold shield markers on the cycle: "Вікно 1: до цвітіння" and "Вікно 2: після зав'язі, 2 обробки дифеноконазолом". Small warning: "Без захисту: -30–50% плодів у вологі роки". 4:3, clean editorial layout.
```

## 8. Критичні поливи
**Куди:** `08-polyv.md`, після СХЕМИ 141 (КРИТИЧНІ ПОЛИВИ ХУРМИ).

**Промпт:**
```
Scientific orchard infographic on white background, dark green #1a3d2e and gold #c9a227 accents, serif headings, flat-vector botanical style, Ukrainian language. Title: "КРИТИЧНІ ПОЛИВИ ХУРМИ". Horizontal phenological timeline of a persimmon season with 5 water-drop markers: "Травень: зав'язування — 30–40 л" → "Червень–липень: ріст плоду — 40–60 л" → "Серпень: налив — 50–70 л (рівномірно!)" → "Вересень: стоп за 2–3 тижні до збору" → "Жовтень–листопад: вологозарядковий 80–100 л". Gold warning strip: "Перепади поливу в фазу наливу = розтріскані плоди; рівномірність важливіша за об'єм". 4:3, clean editorial layout.
```

## 9. Холодовий ланцюг зберігання
**Куди:** `13-zbyrannia-zberihannia.md`, після СХЕМИ 149 (ХОЛОДОВИЙ ЛАНЦЮГ ХУРМИ).

**Промпт:**
```
Scientific orchard infographic on white background, dark green #1a3d2e and gold #c9a227 accents, serif headings, flat-vector botanical style, Ukrainian language. Title: "ХОЛОДОВИЙ ЛАНЦЮГ: ВІД ДЕРЕВА ДО СТОЛУ". Four-step flat-vector pipeline with arrows: "1. Збір при Brix ≥14–16% (критерії, не календар)" → "2. Охолодження до 0°C за 24–48 год" → "3. Зберігання 0°C + 85–90% RH — до 3 місяців" → "4. Дозрівання PCA при 20°C у пакеті 3–7 днів". Gold result bar: "Без холодового ланцюга: термін скорочується вдвічі". 4:3, clean editorial layout.
```

## 10. Зони України: матриця ризиків
**Куди:** `14-rehiony.md`, після СХЕМИ 150 (ХУРМА ЗА ЗОНАМИ УКРАЇНИ).

**Промпт:**
```
Scientific orchard infographic on white background, dark green #1a3d2e and gold #c9a227 accents, serif headings, flat-vector botanical style, Ukrainian language. Title: "ХУРМА ЗА ЗОНАМИ УКРАЇНИ". Three vertical zone panels with stylized flat map silhouettes of Ukraine regions: Panel 1 (south Crimea/Odessa): "Південь — повний цикл без ризиків, PCNA і PCA". Panel 2 (center): "Центральна Україна — PCA на D. lotus, Brix ≥14% до морозу". Panel 3 (forest-steppe east): "Лісостеп/Схід — D. virginiana, нікітські сорти, укриття перші 3 зими". Gold bottom bar: "Універсальне правило: збір за Brix, не за календарем". 4:3, clean editorial layout.
```

## 11. Матриця морозостійкості
**Куди:** `16-zamorozky.md`, після СХЕМИ 153 (МАТРИЦЯ МОРОЗОСТІЙКОСТІ ХУРМИ).

**Промпт:**
```
Scientific orchard infographic on white background, dark green #1a3d2e and gold #c9a227 accents, serif headings, flat-vector botanical style, Ukrainian language. Title: "ТРИ МЕЖІ МОРОЗУ: ХУРМА НЕ ЯК ЯБЛУНЯ". Thermometer-style vertical scale from 0°C down to -30°C with 5 marked thresholds and flat-vector icons: "0°C — збір PCA за Brix ≥14%" → "-10°C — межа молодих дерев (1–3 роки)" → "-12…-14°C — гинуть плодові бруньки" → "-15…-18°C — межа дорослої D. kaki" → "-25°C D. lotus / -30°C D. virginiana — підщепи живуть". Gold warning at top: "Плоди при Brix &lt;14% гинуть вже при -2…-4°C". 4:3, clean editorial layout.
```

## 12. 15 міфів: головне
**Куди:** `15-mify.md`, після СХЕМИ 151 (МІФИ ПРО ХУРМУ: РЕАЛЬНІСТЬ).

**Промпт:**
```
Scientific orchard infographic on white background, dark green #1a3d2e and gold #c9a227 accents, serif headings, flat-vector botanical style, Ukrainian language. Title: "ХУРМА: МІФ → РЕАЛЬНІСТЬ". Six myth-reality pairs in two-column flat-vector layout, myth in thin text with strikethrough-style, reality in bold green: "«В'яже = отруйна» → танін безпечний" ; "«Тільки субтропіки» → доросле дерево до -15…-18°C" ; "«Чорні цятки = хвороба» → це полімеризований танін" ; "«Не хворіє» → антракноз -30–50% врожаю" ; "«PCNA їдять м'яким» → їдять твердою при Brix 16–18%" ; "«Саме росте» → формування перші 4 роки обов'язкове". 4:3, clean editorial layout.
```
