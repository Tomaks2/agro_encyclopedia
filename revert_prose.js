const fs = require('fs');
const file = 'd:/1/agro_encyclopedia-main/src/app/[locale]/[culture]/[section]/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Revert article class to exactly what it was originally
content = content.replace(/<article className="prose max-w-4xl mx-auto w-full"/g, '<article className="prose"');

fs.writeFileSync(file, content, 'utf8');