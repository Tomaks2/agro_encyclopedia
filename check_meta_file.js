const fs = require('fs');
const meta = JSON.parse(fs.readFileSync('d:/1/123/123/YAGIDNI_архів_6_культур/YAGIDNI/lokhyna/meta.json', 'utf8'));
console.log(meta.sections[0].filename);