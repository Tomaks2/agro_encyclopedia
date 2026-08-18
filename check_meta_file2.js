const fs = require('fs');
const meta = JSON.parse(fs.readFileSync('d:/1/agro_encyclopedia-main/content/cultures/lokhyna/meta.json', 'utf8').replace(/^\uFEFF/, ''));
console.log(meta.sections[0].filename);