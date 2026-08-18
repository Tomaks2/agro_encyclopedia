const fs = require('fs');
const meta = JSON.parse(fs.readFileSync('d:/1/agro_encyclopedia-main/content/cultures/lokhyna/meta.json', 'utf8'));
console.log(meta.sections.map(s => s.slug).join('\n'));