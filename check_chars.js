const fs = require('fs');
const meta = JSON.parse(fs.readFileSync('d:/1/agro_encyclopedia-main/content/cultures/lokhyna/meta.json', 'utf8'));
const s = meta.sections[0].slug;
console.log(s);
for (let i=0; i<s.length; i++) {
    console.log(s[i] + ' : ' + s.charCodeAt(i));
}