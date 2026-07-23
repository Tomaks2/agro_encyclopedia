const fs = require('fs');
const path = require('path');

const dir = 'm:/agro_encyclopedia/content/cultures/persyk';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Regex to match <PremiumProcess ... />
  const regex = /<PremiumProcess[\s\S]*?title="([^"]+)"[\s\S]*?stepsJSON={`(\[[\s\S]*?\])`}[\s\S]*?\/>/g;

  let replaced = false;
  content = content.replace(regex, (match, title, jsonStr) => {
    try {
      const steps = JSON.parse(jsonStr);
      let newBlocks = `### ${title}\n\n`;
      steps.forEach((step, idx) => {
        const type = (idx % 2 === 0) ? 'green' : 'blue';
        newBlocks += `<InfoBlock type="${type}" icon="📌" title="${step.title}">\n${step.desc}\n</InfoBlock>\n\n`;
      });
      replaced = true;
      return newBlocks;
    } catch (e) {
      console.error(`Failed to parse JSON in ${file}: ${e.message}`);
      return match;
    }
  });

  if (replaced) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
