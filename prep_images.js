const fs = require('fs');
const path = require('path');

const src = 'd:/1/123/123/PHOTOS_FOR_SITE_архів_36_файлів/PHOTOS_FOR_SITE';
const scratch = 'C:/Users/admin/.gemini/antigravity-ide/brain/866d18a9-1dfa-4a03-b403-77c0fd992f88/scratch/images';

if (!fs.existsSync(scratch)) fs.mkdirSync(scratch, { recursive: true });

let id = 1;
const map = [];

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) {
            walk(full);
        } else if (!f.endsWith('.md')) {
            const ext = path.extname(f);
            const newName = `${id++}${ext}`;
            const dst = path.join(scratch, newName);
            fs.copyFileSync(full, dst);
            const relDir = path.relative(src, dir);
            map.push(`${newName} = ${relDir}/${f}`);
        }
    }
}
walk(src);
fs.writeFileSync(path.join(scratch, 'map.txt'), map.join('\n'));
console.log(`Copied ${id - 1} images to scratch.`);