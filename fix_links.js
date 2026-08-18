const fs = require('fs');
const path = require('path');
const contentDir = 'd:/1/agro_encyclopedia-main/content/cultures';

let modifiedFiles = 0;
let totalReplaced = 0;

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) walk(full);
        else if (full.endsWith('.md')) {
            let content = fs.readFileSync(full, 'utf8');
            // Regex to fix: href="/uk/cultures/tomat/01-biolohiya" -> href="/uk/tomat/biolohiya"
            // Wait, what if there's no number prefix? E.g. href="/uk/cultures/tomat/biolohiya"
            // Let's just use: href="/uk/cultures/([^/]+)/(?:\d+-)?([^/"]+)"
            const regex = /href="\/uk\/cultures\/([^/]+)\/(?:\d+-)?([^/"]+)"/g;
            let replaced = 0;
            const newContent = content.replace(regex, (match, culture, slugPart) => {
                // If the slug ends with .md (just in case), strip it
                slugPart = slugPart.replace(/\.md$/, '');
                replaced++;
                return `href="/uk/${culture}/${slugPart}"`;
            });
            
            if (replaced > 0) {
                fs.writeFileSync(full, newContent, 'utf8');
                modifiedFiles++;
                totalReplaced += replaced;
            }
        }
    }
}
walk(contentDir);
console.log(`Fixed ${totalReplaced} links in ${modifiedFiles} files.`);