# GENERATION_PROMPTS — Черешня: промпти для генерації AI-інфографік

Цей файл містить 12 готових промптів для генерації інфографік черешні в єдиному затвердженому стилі серії «Агро-Енциклопедія» (яблуня → груша → персик → абрикос → черешня).

## Єдиний стиль для всіх 12 інфографік (додавати до кожного промпта)

> **Стиль:** навчальна садова інфографіка преміум-класу. Білий фон. Палітра: темно-зелений #1a3d2e (заголовки, таблиці, силуети) + золото #c9a227 (акценти, іконки, стрілки). Заголовки — елегантний serif (Playfair Display або аналог), основний текст — чистий sans-serif. Flat-vector ботанічна ілюстрація (ягоди, квітки, листя, гілки черешні) з м'якими акварельними відтінками. Різко-контрастна типографіка: великі числа-акценти. Усі тексти українською мовою без помилок. Формат 4:3, висока деталізація, друкована якість. Без рамок-карток, без тіней, без 3D.

## Спільна інструкція з розміщення

Коли інфографіка згенерована:
1. Збережіть PNG у `public/photos/chereshnia/charts/` під зазначеним ім'ям файлу.
2. Скажіть Manus: «інфографіка `NAME.png` вийшла» — Manus видалить відповідний промпт з цього файлу та вставить LightboxImage у вказаний MD-файл.
3. Якщо генерація не вдалася — нічого не робити, Manus догенерує пізніше сам.

---

## 1. `frost_phases_chereshnia.png` — критичні температури по фенофазах

**Куди вставляти:** `17-zamorozky.md`, після блоку `СХЕМА 27` (підрозділ 17.1).

**Промпт (англійською, контент українською):**

Educational orchard infographic in Ukrainian, title "КРИТИЧНІ ТЕМПЕРАТУРИ ЧЕРЕШНІ ПО ФЕНОФАЗАХ". Vertical timeline layout showing 6 phenological stages of a sweet cherry branch from dormant bud to young fruit, each with a thermometer icon and temperature thresholds. Stages (top to bottom): "Брунька під лусками: -25…-28°C", "Зелений бутон: -4,4°C", "Рожевий бутон: -3,9°C", "Повне цвітіння: -2,2°C ← МАКСИМАЛЬНИЙ РИЗИК" (highlighted in gold with warning icon), "Опадення пелюсток: -1,1°C", "Зав'язь 2–5 мм: -1,1°C". Small flat-vector cherry blossoms (white-pink 5-petal flowers) and developing fruits along the branch. Color coding: deep green #1a3d2e for safe stages, gradient to alarm red-gold for the bloom stage. Elegant serif headings, clean sans-serif labels, premium print quality.

## 2. `rootstock_vigor_chereshnia.png` — шкала сил росту підщеп

**Куди вставляти:** `02-pidshchepy.md`, після СХЕМИ 4 («Шкала сил росту підщеп»).

**Промпт:**

Educational orchard infographic in Ukrainian, title "ПІДЩЕПИ ЧЕРЕШНІ: ШКАЛА СИЛ РОСТУ". Horizontal scale from left (карликові/напівкарликові) to right (сильнорослі). Five flat-vector cherry trees of visibly increasing size: "Gisela 5 — 45–55% (карлик)", "Gisela 3 — 60–70%", "ВСЛ-2 — 55–65%", "MaxMa 14 — 75–85% (напівкарлик)", "Антипка — 100% (сильноросла)". Each tree with golden height marker and short label: needs support, drip irrigation, trellis. Bottom legend bar with three icons: опора, крапельний полив, без опори. Deep green #1a3d2e silhouettes, gold #c9a227 accents, serif title, clean Ukrainian typography, 4:3 premium print quality.

## 3. `pollination_chereshnia.png` — схема запилення та S-алелі

**Куди вставляти:** `01-biolohiya.md`, після підрозділу про самоплідність.

**Промпт:**

Educational orchard infographic in Ukrainian, title "ЗАПИЛЕННЯ ЧЕРЕШНІ: ЧОМУ ОДНОГО СОРТУ ЗАМАЛО". Left half: two cherry tree canopies with interconnecting bee flight paths between blossoms, caption "Перехресне запилення = до 100% урожаю". Center: magnified cherry flower diagram labeled "приймочка — воротами для пилку". Right half: S-allele compatibility table styled as elegant chart: "Сумісні S-алелі → зав'язь ✓", "Спільні S-алелі → блокування ✗". Bottom strip: "Вишня НЕ гарантує запилення черешні" with small crossed-out bee icon between cherry and sour-cherry blossom. Deep green #1a3d2e, gold accents, serif heading, flat-vector botany, Ukrainian text, 4:3.

## 4. `kgb_ufo_chereshnia.png` — сучасні системи формування KGB та UFO

**Куди вставляти:** `05-formuvannia.md`, після СХЕМИ про системи крон.

**Промпт:**

Educational orchard infographic in Ukrainian, title "СУЧАСНІ СИСТЕМИ КРОН ЧЕРЕШНІ". Two-column comparison with flat-vector tree diagrams. Left column "KGB (Kym Green Bush)": open-center bush shape with multiple vertical leaders cut annually, note "обрізка на 30–50 см щороку, висота 2–3 м". Right column "UFO (Upright Fruiting Offshoots)": wall-like canopy with one horizontal cordon and vertical fruiting branches, note "шпалера + вертикальні гілки, збір без драбини". Each with mini timeline icons: "урожай з 2-го року", "15–20 т/га", "збір з ґрунту/низької драбини". Deep green silhouettes, gold #c9a227 leader lines, serif titles, Ukrainian typography, 4:3 premium.

## 5. `summer_pruning_chereshnia.png` — чому тільки літня обрізка

**Куди вставляти:** `06-obrizka.md`, після підрозділу про терміни обрізки.

**Промпт:**

Educational orchard infographic in Ukrainian, title "ОБРІЗКА ЧЕРЕШНІ: ЛИШЕ ЛІТО". Split layout. Left panel with crossed-out spring icon: "ВЕСНА — ЗАБОРОНЕНО: Pseudomonas syringae атакує свіжі рани при +5…+12°C → бактеріальний рак". Right panel with sun icon: "ЛИПЕНЬ–СЕРПЕНЬ — ЄДИНИЙ БЕЗПЕЧНИЙ ТЕРМІН: рани затягуються за 2–3 тижні, потік камеді мінімальний". Center: flat-vector cherry branch diagram showing three correct cut types: "на перевод" (redirect cut), "видалення на кільце", "пінцировка зеленого пагона". Bottom note: "великі рани >3 см → паста з дезінфекцією інструмента". Deep green #1a3d2e, gold accents, serif, Ukrainian text, 4:3.

## 6. `calcium_cracking_chereshnia.png` — кальцієва програма проти тріщин

**Куди вставляти:** `08-zhyvlennia.md`, після СХЕМИ 16 «Кальцієва програма».

**Промпт:**

Educational orchard infographic in Ukrainian, title "КАЛЬЦІЄВА ПРОГРАМА ПРОТИ РОЗТРІСКУВАННЯ". Horizontal fruit-development timeline with 4 flat-vector cherry stages (green to dark red), each with spray icon and label: "Зав'язь 10 мм: Ca(NO₃)₂ 3 г/л → закладка клітинних стінок", "Наливання: CaCl₂ 0,2% + бор → еластичність шкірки", "Початок забарвлення: хелат Ca → максимум засвоєння", "За 2 тижні до збору: CaCl₂ 0,15% → фінальне зміцнення". Top banner with physics note: "Ca не рухається в рослині — тільки регулярні позакореневі обробки". Bottom result bar: "Ca²⁺ у шкірці >600 мг/кг → тріщини 5–12% замість 60–90%". Deep green, gold timeline arrow, serif heading, Ukrainian, 4:3.

## 7. `moniliosis_chereshnia.png` — моніліоз: вікна обробок

**Куди вставляти:** `10-khvoroby.md`, після СХЕМИ 19.

**Промпт:**

Educational orchard infographic in Ukrainian, title "МОНІЛІОЗ ЧЕРЕШНІ: ТРИ ВІКНА ЗАХИСТУ". Three-panel horizontal layout with flat-vector cherry blossom and fruit illustrations. Panel 1 "РОЖЕВИЙ БУТОН (BBCH 57–59): головне вікно — опадання пелюсток ще не настало", spray icon, golden ring around pink bud. Panel 2 "ОПАДЕННЯ ПЕЛЮСТОК (BBCH 67–69): друге вікно — захист зав'язі", flower petals falling. Panel 3 "ДОЗРІВАННЯ: сіра гниль — збір уражених плодів щодня", diseased mummified fruit icon with removal arrow. Bottom risk bar: "дощове цвітіння без обробки = втрата 80–100% зав'язі". Deep green #1a3d2e, gold window rings, serif title, Ukrainian, 4:3 premium print.

## 8. `cherry_fruit_fly_chereshnia.png` — вишнева муха: фенологія та моніторинг

**Куди вставляти:** `12-shkidnyky.md`, після СХЕМИ 22.

**Промпт:**

Educational orchard infographic in Ukrainian, title "ВИШНЕВА МУХА: ВІКНО ОБРОБКИ". Four-step flat-vector life cycle diagram with golden circular arrows: "Лялечка в ґрунті (зимування) → Вильот мухи: травень, коли ґрунт +14…+15°C → відкладання яєць: у плоди після затвердіння шкірки → личинка: біля кісточки, ураження не лікується". Right side: yellow sticky trap illustration with caption "жовті клейкі пастки + амоніак — моніторинг з середини травня; інсектицид працює тільки до відкладання яєць". Bottom warning strip: " PHI: делтаметрин за 14 днів до збору, спіносад — за 7 днів". Deep green, gold arrows, serif heading, Ukrainian, 4:3.

## 9. `protection_year_chereshnia.png` — річний конвеєр захисту по фенофазах

**Куди вставляти:** `13-kalendar-zakhystu.md`, після СХЕМИ 24.

**Промпт:**

Educational orchard infographic in Ukrainian, title "КОНВЕЄР ЗАХИСТУ ЧЕРЕШНІ: 7 ВІКОН ЗА BBCH". Horizontal phenology rail with 7 flat-vector cherry stages left to right: "спляча брунька: 3% бордоска → знищення моніліозу", "набухання: мідь + мінеральна олія", "рожевий бутон: фунгіцид проти моніліозу ← ГОЛОВНЕ ВІКНО", "повне цвітіння: БЕЗ обробок (бджоли!)", "опадення пелюсток: фунгіцид 2-го вікна", "зелений плід: проти кокомікозу + кліщ", "забарвлення: тільки біопрепарати (PHI) → спіносад за 7 днів". Golden markers on the two key windows. Deep green silhouettes, serif title, Ukrainian typography, 4:3 premium.

## 10. `budding_chereshnia.png` — серпнева окуліровка

**Куди вставляти:** `14-scheplennia.md`, після СХЕМИ 25.

**Промпт:**

Educational orchard infographic in Ukrainian, title "ОКУЛІРОВКА ЧЕРЕШНІ: ЛИПЕНЬ–СЕРПЕНЬ". Step-by-step illustrated guide, four numbered flat-vector panels: "1. Щиток 25–30 мм: зріз із брунькою та деревиною", "2. Т-подібний розріз на підщепі", "3. Вставка щитка: камбій до камбію", "4. Обмотка плівкою: брунька відкрита". Top timeline strip: "серпень–початок вересня → приживлюваність 85–95%". Bottom note: "навесні наступного року: зріз підщепи на 10 см вище вічка". Deep green tools and branches, gold step numbers, serif title, Ukrainian, 4:3.

## 11. `harvest_cold_chain_chereshnia.png` — збір та холодовий ланцюг

**Куди вставляти:** `15-zbir-zberihannia.md`, після підрозділу про зберігання.

**Промпт:**

Educational orchard infographic in Ukrainian, title "ХОЛОДОВИЙ ЛАНЦЮГ ЧЕРЕШНІ: ШВИДКІСТЬ = ЯКІСТЬ". Horizontal cold-chain pipeline with five flat-vector stages connected by golden arrows: "Збір: вранці, без черешків → +1…+2 год", "Гідроохолодження: вода +1°C, 10–20 хв → подвоєння терміну зберігання", "Сортування: за розміром і кольором", "MAP-пакування: 10–15% O₂, 10–15% CO₂", "Зберігання: 0…+1°C → 4–6 тижнів для експорту". Bottom warning: "кожні +1°C понад норму = втрата 1 тижня зберігання". Deep green crates and cherries, gold arrows, serif title, Ukrainian, 4:3 premium.

## 12. `myths_reality_chereshnia.png` — міф → реальність (зведена таблиця)

**Куди вставляти:** `16-mify.md`, після СХЕМИ 26.

**Промпт:**

Educational orchard infographic in Ukrainian, title "МІФ → РЕАЛЬНІСТЬ: 8 ГОЛОВНИХ ХИБ ПРО ЧЕРЕШНЮ". Two-column layout with flat-vector icons: left column "МІФ" with crossed-out icons, right column "РЕАЛЬНІСТЬ" with golden check icons. Eight rows: "Вишня запилює черешню ✗ → Потрібен сорт черешні ✓", "Самоплідні без сусідів ✗ → 30–60% урожаю, з записувачем до 100% ✓", "Черешня не для Півдня ✗ → 700–1200 хілінгових годин ✓", "Вимерзає взимку ✗ → витримує -25…-28°C ✓", "Весняна обрізка як у яблуні ✗ → тільки літо ✓", "Тріщини неминучі ✗ → IRC-сорти + кальцій + тунелі ✓", "Червиві плоди = плодожерка ✗ → вишнева муха ✓", "Рак лікується міддю ✗ → тільки профілактика ✓". Elegant premium design, deep green #1a3d2e, gold #c9a227 accents, serif title, Ukrainian typography, 4:3 print quality.
