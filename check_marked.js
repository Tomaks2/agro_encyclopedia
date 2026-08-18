const fs = require('fs');
const { marked } = require('marked');
const content = fs.readFileSync('d:/1/agro_encyclopedia-main/content/cultures/kavun/03-visiv-ta-krapelne-zroshennia.md', 'utf8');
console.log(marked(content));