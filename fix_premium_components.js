/**
 * fix_premium_components.js
 * 
 * Масово замінює <PremiumProcess> та <ComparisonTable> 
 * на <InfoBlock> та Markdown-таблиці у файлах abrykos та slyva.
 * 
 * Логіка:
 * - <ComparisonTable ... headersJSON='...' rowsJSON='...' /> → Markdown таблиця
 * - <PremiumProcess ... stepsJSON='...' /> → серія <InfoBlock> 
 */

const fs = require('fs');
const path = require('path');

const CULTURES_TO_FIX = ['abrykos', 'slyva'];
const CONTENT_BASE = path.join(__dirname, 'content', 'cultures');

let totalFilesProcessed = 0;
let totalReplacements = 0;

// ─── Парсер атрибутів MDX-компонента ─────────────────────────────────────────
function extractAttr(tag, attrName) {
  // Шукаємо атрибут у вигляді: attrName="value" або attrName='value'
  const patterns = [
    new RegExp(`${attrName}="([^"]*)"`, 's'),
    new RegExp(`${attrName}='([^']*)'`, 's'),
  ];
  for (const re of patterns) {
    const m = tag.match(re);
    if (m) return m[1];
  }
  return null;
}

// ─── Безпечний JSON-парсер ────────────────────────────────────────────────────
function safeParse(jsonStr) {
  if (!jsonStr) return null;
  try {
    // Нормалізуємо типографські апострофи → звичайні
    const cleaned = jsonStr
      .replace(/\u2019/g, "'")
      .replace(/\\'/g, "'");
    return JSON.parse(cleaned);
  } catch (e) {
    return null;
  }
}

// ─── ComparisonTable → Markdown таблиця ──────────────────────────────────────
function convertComparisonTable(tag) {
  const title = extractAttr(tag, 'title') || '';
  const headersRaw = extractAttr(tag, 'headersJSON');
  const rowsRaw = extractAttr(tag, 'rowsJSON');

  const headers = safeParse(headersRaw);
  const rows = safeParse(rowsRaw);

  if (!headers || !rows) {
    // Не вдалося парсити — залишаємо як InfoBlock
    return `<InfoBlock type="gold" icon="📊" title="${title}">\nДані таблиці (деталі у розширеному форматі).\n</InfoBlock>`;
  }

  const lines = [];
  if (title) {
    lines.push(`**${title}**`);
    lines.push('');
  }

  // Заголовок таблиці
  lines.push('| ' + headers.join(' | ') + ' |');
  lines.push('| ' + headers.map(() => ':---').join(' | ') + ' |');

  // Рядки таблиці
  for (const row of rows) {
    const cells = Array.isArray(row) ? row : [row];
    // Замінюємо | на ∣ щоб не ламати Markdown таблицю
    const safeCells = cells.map(c => String(c).replace(/\|/g, '∣').replace(/\n/g, ' '));
    lines.push('| ' + safeCells.join(' | ') + ' |');
  }

  return lines.join('\n');
}

// ─── PremiumProcess → серія InfoBlock ────────────────────────────────────────
const STEP_COLORS = ['gold', 'green', 'blue', 'red', 'gold', 'green', 'blue', 'red'];

function convertPremiumProcess(tag) {
  const title = extractAttr(tag, 'title') || 'Процес';
  const stepsRaw = extractAttr(tag, 'stepsJSON');
  const steps = safeParse(stepsRaw);

  if (!steps || !Array.isArray(steps) || steps.length === 0) {
    return `<InfoBlock type="gold" icon="📋" title="${title}">\nДеталі процесу.\n</InfoBlock>`;
  }

  const blocks = steps.map((step, i) => {
    const color = STEP_COLORS[i % STEP_COLORS.length];
    const icon = step.icon || `${i + 1}️⃣`;
    const stepTitle = step.title || `Крок ${i + 1}`;
    const desc = (step.desc || '').replace(/\n/g, ' ');
    return `<InfoBlock type="${color}" icon="${icon}" title="${stepTitle}">\n${desc}\n</InfoBlock>`;
  });

  return `**${title}**\n\n` + blocks.join('\n\n');
}

// ─── Обробка одного файлу ────────────────────────────────────────────────────
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let replacements = 0;

  // Регулярний вираз для знаходження самозакривних JSX-компонентів
  // Обробляємо <ComparisonTable ... />
  content = content.replace(/<ComparisonTable[\s\S]*?\/>/g, (match) => {
    const replacement = convertComparisonTable(match);
    modified = true;
    replacements++;
    return replacement;
  });

  // Обробляємо <PremiumProcess ... />
  content = content.replace(/<PremiumProcess[\s\S]*?\/>/g, (match) => {
    const replacement = convertPremiumProcess(match);
    modified = true;
    replacements++;
    return replacement;
  });

  // Також виправляємо escaped apostrophes \' → ' в InfoBlock/Callout
  const before = content;
  content = content.replace(/\\'/g, "'");
  if (content !== before) {
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ ${path.basename(filePath)} — ${replacements} замін`);
    totalReplacements += replacements;
    totalFilesProcessed++;
  }

  return modified;
}

// ─── Головна функція ──────────────────────────────────────────────────────────
function main() {
  console.log('🔧 Запуск fix_premium_components.js\n');

  for (const culture of CULTURES_TO_FIX) {
    const cultureDir = path.join(CONTENT_BASE, culture);
    if (!fs.existsSync(cultureDir)) {
      console.log(`⚠️  Папка не знайдена: ${cultureDir}`);
      continue;
    }

    const files = fs.readdirSync(cultureDir)
      .filter(f => f.endsWith('.md'))
      .map(f => path.join(cultureDir, f));

    console.log(`\n📁 ${culture} (${files.length} файлів)`);

    for (const file of files) {
      processFile(file);
    }
  }

  console.log(`\n✨ Готово!`);
  console.log(`   Оброблено файлів: ${totalFilesProcessed}`);
  console.log(`   Всього замін: ${totalReplacements}`);
}

main();
