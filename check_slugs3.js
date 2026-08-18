const fs = require('fs');
const meta = JSON.parse(fs.readFileSync('d:/1/agro_encyclopedia-main/content/cultures/persyk/meta.json', 'utf8'));
meta.sections.forEach(s => console.log(s.slug));