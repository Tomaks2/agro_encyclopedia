const fs = require('fs');

function decodeHtml(html) {
  return html.replace(/&quot;/g, '"');
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace PremiumProcess
  content = content.replace(/<PremiumProcess\s+title="([^"]+)"[\s\S]*?stepsJSON="([^"]+)"\s*\/>/g, (match, title, stepsJSON) => {
    try {
      const steps = JSON.parse(decodeHtml(stepsJSON));
      let out = `<Callout type="${title.toLowerCase().includes('підсумок') ? 'success' : 'info'}" title="${title}">\n\n`;
      for (const step of steps) {
        out += `- **${step.title}**: ${step.desc}\n`;
      }
      out += `\n</Callout>`;
      return out;
    } catch (e) {
      console.error("Error parsing stepsJSON in", filePath, ":", e.message);
      return match;
    }
  });

  // Replace PremiumHierarchy
  content = content.replace(/<PremiumHierarchy\s+title="([^"]+)"[\s\S]*?itemsJSON="([^"]+)"\s*\/>/g, (match, title, itemsJSON) => {
    try {
      const items = JSON.parse(decodeHtml(itemsJSON));
      let out = `<Callout type="${title.toLowerCase().includes('підсумок') ? 'success' : 'info'}" title="${title}">\n\n`;
      for (const item of items) {
        out += `- **${item.label}**: ${item.desc}\n`;
      }
      out += `\n</Callout>`;
      return out;
    } catch (e) {
      console.error("Error parsing itemsJSON in", filePath, ":", e.message);
      return match;
    }
  });

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Updated ${filePath}`);
}

processFile('m:\\agro_encyclopedia\\content\\cultures\\yablunia\\09-zakhyst.md');
processFile('m:\\agro_encyclopedia\\content\\cultures\\yablunia\\10-zbir.md');
