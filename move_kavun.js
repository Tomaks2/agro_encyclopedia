const fs = require('fs');
const file = 'd:/1/agro_encyclopedia-main/content/cultures/kavun/03-visiv-ta-krapelne-zroshennia.md';
let content = fs.readFileSync(file, 'utf8');

// Remove from end
content = content.replace(/\n\n<LightboxImage src="\/images\/cultures\/kavun\/porady-dlia-vyroshchuvannia-solodkykh-ta-sokovytykh-kavuniv\.jpg" alt=".*?" \/>\n\n?/g, '');

// Insert before ## Джерела
const target = '## Джерела';
const tag = '\n<LightboxImage src="/images/cultures/kavun/porady-dlia-vyroshchuvannia-solodkykh-ta-sokovytykh-kavuniv.jpg" alt="Поради для вирощування солодких та соковитих кавунів" />\n\n';

if (content.includes(target)) {
    content = content.replace(target, tag + target);
    fs.writeFileSync(file, content, 'utf8');
}