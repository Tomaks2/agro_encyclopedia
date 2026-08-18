const fs = require('fs');
const buf = fs.readFileSync('d:/1/123/123/DEREVA_архів_7_культур/persyk/07-zeleni-operatsii.md');
const str = buf.toString('utf8');
console.log(str.slice(100, 250));