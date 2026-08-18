const fs = require('fs');
const buf = fs.readFileSync('d:/1/agro_encyclopedia-main/content/cultures/persyk/07-zeleni-operatsii.md');
const str = buf.toString('utf8');
const lines = str.split('\n');
lines.forEach((l, i) => {
    if (l.includes('<') || l.includes('/>') || l.includes('</')) {
        console.log(`${i+1}: ${l}`);
    }
});