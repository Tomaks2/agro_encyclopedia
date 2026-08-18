const fs = require('fs');
const file = 'd:/1/agro_encyclopedia-main/content/cultures/kavun/03-visiv-ta-krapelne-zroshennia.md';
let content = fs.readFileSync(file, 'utf8');
const tag = '\n\n<LightboxImage src="/images/cultures/kavun/porady-dlia-vyroshchuvannia-solodkykh-ta-sokovytykh-kavuniv.jpg" alt="Поради для вирощування солодких та соковитих кавунів" />\n';
content += tag;
fs.writeFileSync(file, content, 'utf8');