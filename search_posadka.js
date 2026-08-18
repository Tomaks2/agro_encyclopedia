const fs = require('fs');
const path = require('path');
const p = 'd:/1/agro_encyclopedia-main/content/cultures/yablunia/02-posadka.md';
const content = fs.readFileSync(p, 'utf8');
const lines = content.split('\n');
const idx = lines.findIndex(l => l.includes('Критерії якісного'));
if (idx > -1) {
    console.log(lines.slice(idx, idx+15).join('\n'));
}