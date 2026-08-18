const fs = require('fs');
const path = require('path');
const contentDir = 'd:/1/agro_encyclopedia-main/content/cultures';

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) walk(full);
        else if (full.endsWith('.md')) {
            let content = fs.readFileSync(full, 'utf8');
            if (content.includes('$')) {
                // Find lines with $
                const lines = content.split('\n');
                lines.forEach((line, i) => {
                    if (line.includes('$')) console.log(`${full}:${i+1} ${line.trim()}`);
                });
            }
        }
    }
}
walk(contentDir);