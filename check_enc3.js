const fs = require('fs');
const buf = fs.readFileSync('d:/1/agro_encyclopedia-main/content/cultures/persyk/07-zeleni-operatsii.md');
const str = buf.toString('utf8');
console.log(str.slice(100, 250));