const fs = require('fs');
let content = fs.readFileSync('m:/agro_encyclopedia/src/app/[locale]/page.tsx', 'utf8');

// Remove the wrongly inserted HeroSearch
content = content.replace('{/* Glassmorphism Search */}\n              <HeroSearch />\n', '');

// Replace the actual div with HeroSearch
const regex = /<div className="hero-search[\s\S]*?<button className="btn-search"[\s\S]*?<\/button>\s*<\/div>/g;
content = content.replace(regex, '<HeroSearch />');

fs.writeFileSync('m:/agro_encyclopedia/src/app/[locale]/page.tsx', content, 'utf8');
console.log('Fixed page.tsx');
