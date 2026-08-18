const fs = require('fs');
const file = 'd:/1/agro_encyclopedia-main/src/app/globals.css';
let content = fs.readFileSync(file, 'utf8');

// Use regex to remove block: .prose table { ... } to the end of table styles
// Let's just remove anything that matches .prose table.* { ... }
content = content.replace(/\.prose table[^{]*\{[^}]*\}/g, '');
content = content.replace(/\.prose \.table-wrap[^{]*\{[^}]*\}/g, '');
content = content.replace(/\.table-wrap[^{]*\{[^}]*\}/g, '');
content = content.replace(/\.prose-table-wrap[^{]*\{[^}]*\}/g, '');
content = content.replace(/\.prose-table[^{]*\{[^}]*\}/g, '');

fs.writeFileSync(file, content, 'utf8');