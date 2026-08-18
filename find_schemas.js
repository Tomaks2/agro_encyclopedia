const fs = require('fs');
const path = require('path');
const contentDir = 'd:/1/agro_encyclopedia-main/content/cultures';

let schemas = [];

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) walk(full);
        else if (full.endsWith('.md')) {
            let content = fs.readFileSync(full, 'utf8');
            if (content.includes('```') && content.includes('Схема')) {
                const lines = content.split('\n');
                let inBlock = false;
                let schemaText = '';
                lines.forEach(line => {
                    if (line.startsWith('```')) {
                        if (inBlock) {
                            if (schemaText.includes('Схема')) {
                                schemas.push({file: full, content: schemaText});
                            }
                            schemaText = '';
                        }
                        inBlock = !inBlock;
                    } else if (inBlock) {
                        schemaText += line + '\n';
                    }
                });
            }
        }
    }
}
walk(contentDir);
schemas.forEach(s => {
    console.log(`--- ${s.file} ---`);
    console.log(s.content.trim());
});