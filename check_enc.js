const fs = require('fs');
const buf = fs.readFileSync('d:/1/123/123/DEREVA_архів_7_культур/persyk/07-zeleni-operatsii.md');
console.log('Archive bytes:', buf.slice(0, 50).toString('hex'));
const utf8Str = buf.toString('utf8');
console.log('Archive utf8:', utf8Str.slice(0, 50));