const fs = require('fs');
const path = require('path');
const contentDir = 'd:/1/agro_encyclopedia-main/content/cultures';

let modifiedFiles = 0;

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) walk(full);
        else if (full.endsWith('.md')) {
            let content = fs.readFileSync(full, 'utf8');
            let newContent = content.replace(/📊/g, '📌');
            if (content !== newContent) {
                fs.writeFileSync(full, newContent, 'utf8');
                modifiedFiles++;
            }
        }
    }
}
walk(contentDir);
console.log(`Replaced icon in ${modifiedFiles} files.`);