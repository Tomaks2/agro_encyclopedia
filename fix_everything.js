const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, 'content', 'cultures', 'abrykos'),
  path.join(__dirname, 'content', 'cultures', 'slyva')
];

let totalReplaced = 0;
let filesProcessed = 0;

function parseJS(str) {
  try {
    let clean = str.replace(/\\'/g, "’").replace(/'/g, "’").replace(/\\"/g, '”');
    clean = clean.replace(/\n/g, ' ').replace(/\r/g, '');
    return JSON.parse(clean);
  } catch (e) {
    console.error('Failed to parse:', e.message);
    return null;
  }
}

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    let replacedInFile = 0;

    const nextChapRegex = /<NextChapter\s+href="\/uk\/([^/"]+)\/[0-9]+-([^/"]+)"([^>]+)>/g;
    content = content.replace(nextChapRegex, (match, culture, slug, rest) => {
      replacedInFile++;
      return `<NextChapter href="/uk/${culture}/${slug}"${rest}>`;
    });

    const premiumRegex = /<PremiumProcess[\s\S]*?title="([^"]+)"[\s\S]*?stepsJSON='([\s\S]*?)'\s*\/>/g;
    content = content.replace(premiumRegex, (match, title, stepsStr) => {
      const steps = parseJS(stepsStr);
      if (!steps) return match; 

      let result = `**${title}**\n\n`;
      const colors = ["gold", "green", "blue", "red", "purple"];
      steps.forEach((step, idx) => {
        const color = colors[idx % colors.length];
        const icon = step.icon || '📌';
        result += `<InfoBlock type="${color}" icon="${icon}" title="${step.title}">\n${step.desc}\n</InfoBlock>\n\n`;
      });
      replacedInFile++;
      return result.trim();
    });

    const compRegex = /<ComparisonTable[\s\S]*?title="([^"]+)"[\s\S]*?headersJSON='([\s\S]*?)'[\s\S]*?rowsJSON='([\s\S]*?)'\s*\/>/g;
    content = content.replace(compRegex, (match, title, headersStr, rowsStr) => {
      const headers = parseJS(headersStr);
      const rows = parseJS(rowsStr);
      
      if (!headers || !rows) return match;

      let md = `**${title}**\n\n`;
      md += `| ${headers.join(' | ')} |\n`;
      md += `| ${headers.map(() => ':---').join(' | ')} |\n`;
      
      rows.forEach(row => {
        const cleanRow = row.map(cell => String(cell).replace(/\n/g, '<br>').replace(/\|/g, '\\|'));
        md += `| ${cleanRow.join(' | ')} |\n`;
      });

      replacedInFile++;
      return md.trim();
    });

    content = content.replace(/\\'/g, "'").replace(/’/g, "'");

    if (replacedInFile > 0) {
      fs.writeFileSync(fullPath, content, 'utf8');
      totalReplaced += replacedInFile;
      filesProcessed++;
      console.log(`✅ ${file} — ${replacedInFile} fixes`);
    }
  }
}

console.log(`\n✨ Done! Processed ${filesProcessed} files. Total fixes: ${totalReplaced}`);
