const fs = require('fs');
const file = 'd:/1/agro_encyclopedia-main/src/app/[locale]/[culture]/[section]/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Ensure article is back to normal prose
content = content.replace(/<article className="prose max-w-4xl mx-auto w-full"/g, '<article className="prose"');

// Fix table clipping by changing tableLayout to fixed and removing overflow-hidden
content = content.replace(/<div className="w-full my-8 rounded-xl border border-\[#e5e7eb\] shadow-sm bg-white overflow-hidden">/g, '<div className="w-full my-8 rounded-xl border border-[#e5e7eb] shadow-sm bg-white">');
content = content.replace(/style={{ tableLayout: 'auto', wordBreak: 'break-word' }}/g, 'style={{ tableLayout: 'fixed', wordBreak: 'break-word', hyphens: 'auto' }}');

fs.writeFileSync(file, content, 'utf8');