# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:time-awareness-rules -->
# 🔴 CRITICAL TIME AWARENESS RULE 🔴
**THE CURRENT YEAR IS 2026.**
NEVER use outdated data like 2024 or 2025 in content, examples, or code unless historically necessary.
ALWAYS frame content in the context of the present (2026) and future (2027+). If generating dummy dates, charts, or recommendations, they MUST be for 2026/2027.
This is a strict requirement from the user. Failure to comply is a severe error.
<!-- END:time-awareness-rules -->


## Visual Analysis Rule
When the user uploads images or asks you to analyze a folder of images, DO NOT guess their content by filename. You MUST use the  iew_file tool to physically inspect the images (or a representative sample if there are too many) using your multimodal vision capabilities before drawing conclusions or making plans.

## 🔴 СУВОРЕ ПРАВИЛО ГЕНЕРАЦІЇ ЗОБРАЖЕНЬ (УКРАЇНСЬКА МОВА ТА РЕАЛІЗМ)
1. Усі згенеровані зображення мають виглядати як **максимально реалістичні авторські фотографії**, зроблені у реальному саду/ґрунті (без ефекту малюнку чи 3D-анімації).
2. Якщо на згенерованому зображенні є будь-які написи, схеми або позначення — **ВОНИ ПОВИННІ БУТИ ВИКЛЮЧНО УКРАЇНСЬКОЮ МОВОЮ**. Написи англійською чи іншими мовами СУВОРО ЗАБОРОНЕНІ.
3. Перед підключенням будь-якого зображення на сайт обов'язково фізично перевіряти його через `view_file` на відсутність чужомовних написів.

## 🔴 СТАНДАРТ ЕНЦИКЛОПЕДИЧНОЇ ГЛИБИНИ ("ДОКТОРСЬКА ДИСЕРТАЦІЯ В ДОСТУПНІЙ ФОРМІ")
Усі наступні культури, розділи, довідники хвороб, шкідників, обрізки, живлення та біології повинні створюватися з **найвищим рівнем деталізації**:
1. **Вичерпність матеріалу**: Матеріал повинен розкривати тему максимально глибоко та вичерпно (деталізовані біологічні фази, точні причини захворювань, конкретні діючі речовини та дозування, схеми крони, аналіз підщеп, адаптація по регіонах).
2. **Доступність та читабельність**: Попри наукову точність, матеріал має подаватися легко, структуровано (короткі абзаци, списки, `InfoBlock`, `Callout`, таблиці) та бути максимально практичним для кожного садівника.
3. **Без узагальнень та поверхневих фальш-відповідей**: Уникати "загальних фраз". Тільки конкретика, цифри, терміни, фази та перевірені агрономічні рекомендації.

## 🔴 СУВОРЕ ПРАВИЛО: ПОВНА ЗАБОРОНА `PremiumProcess` ТА `ComparisonTable`
1. **Категорично ЗАБОРОНЕНО** використовувати компоненти `<PremiumProcess>` та `<ComparisonTable>`.
2. Замість `<ComparisonTable>` завжди використовувати **чисті стандартні Markdown-таблиці** (`| Заголовок 1 | Заголовок 2 |`).
3. Замість `<PremiumProcess>` використовувати **чисті структуровані покрокові списки** або елегантні блоки `<InfoBlock type="gold" icon="..." title="...">1. Крок 1...</InfoBlock>`.
