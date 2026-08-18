const fs = require('fs');
const path = require('path');
const meta = JSON.parse(fs.readFileSync('d:/1/agro_encyclopedia-main/content/cultures/lokhyna/meta.json', 'utf8'));
const section = meta.sections.find(s => s.slug === decodeURIComponent("biolohiya-%D1%82%D0%B0-atsydofiliia"));
const fp = path.join('d:/1/agro_encyclopedia-main/content/cultures/lokhyna', section.filename);
console.log("File path:", fp);
console.log("Exists:", fs.existsSync(fp));