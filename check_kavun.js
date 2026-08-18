const fs = require('fs');
const meta = JSON.parse(fs.readFileSync('d:/1/agro_encyclopedia-main/content/cultures/kavun/meta.json', 'utf8'));
meta.sections.forEach(s => console.log(s.filename + ' -> ' + s.slug));