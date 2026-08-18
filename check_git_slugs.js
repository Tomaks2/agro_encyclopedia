const { execSync } = require('child_process');
const buf = execSync('git show HEAD:content/cultures/lokhyna/meta.json');
const meta = JSON.parse(buf.toString('utf8').replace(/^\uFEFF/, ''));
console.log(meta.sections.map(s => s.slug).join('\n'));