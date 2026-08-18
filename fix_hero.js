const fs = require('fs');
const file = 'd:/1/agro_encyclopedia-main/src/components/mdx/HeroCover.tsx';
let content = fs.readFileSync(file, 'utf8');

// Reduce h1 font size and add text wrapping
content = content.replace("fontSize: 'clamp(2rem, 5vw, 3.75rem)'", "fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)', overflowWrap: 'break-word', wordBreak: 'break-word'");
// Give the container some padding
content = content.replace("padding: '2rem 3rem', paddingBottom: '2.5rem'", "padding: '2rem 1rem', paddingBottom: '2.5rem', overflow: 'hidden'");

fs.writeFileSync(file, content, 'utf8');