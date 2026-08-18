const fs = require('fs');
const buf = fs.readFileSync('d:/1/123/123/YAGIDNI_архів_6_культур/YAGIDNI/lokhyna/meta.json');
const str = buf.toString('utf8');
console.log(str.slice(0, 100));