const fs = require('fs');
const path = require('path');
const arch = 'd:/1/123/123/YAGIDNI_архів_6_культур/YAGIDNI';
const cultures = ['ahrus', 'lokhyna', 'malytsia', 'ozhyna', 'polunytsia', 'smorodyna'];

for (const culture of cultures) {
    const promptPath = path.join(arch, culture, 'GENERATION_PROMPTS.md');
    if (!fs.existsSync(promptPath)) continue;
    
    let content = fs.readFileSync(promptPath, 'utf8');
    
    console.log(`\n=== ${culture.toUpperCase()} ===`);
    let matches = [...content.matchAll(/Файл:\s*`?([^`\n]+)`?|Куди( вставити)?:\s*`?([^`\n]+)`?/g)];
    
    // Some GENERATION_PROMPTS.md don't use "Файл:" but use "СХЕМА ... (для розділу ...)"
    // Let's print snippets that look like mapping
    const lines = content.split('\n');
    let currentImage = null;
    let currentTitle = null;
    let currentFile = null;
    for (const line of lines) {
        if (line.includes('СХЕМА') && line.includes('для розділу')) {
            console.log(line);
        }
        if (line.includes('Файл:')) {
            currentImage = line.split('Файл:')[1].replace(/[`\* ]/g, '');
        }
        if (line.includes('Title:')) {
            currentTitle = line.split('Title:')[1].trim();
        }
        if (line.includes('Куди вставити:')) {
            currentFile = line.split('Куди вставити:')[1].split(',')[0].replace(/[`\* ]/g, '');
            console.log(`${currentFile} -> ${currentImage} (${currentTitle})`);
        }
    }
}