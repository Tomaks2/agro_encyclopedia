const fs = require('fs');
const path = require('path');

const dir = 'm:/agro_encyclopedia/content/cultures/vynograd';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Clean backslashes that caused MDX parse errors in formula lines
  content = content.replace(/\\frac/g, '')
                 .replace(/\\/g, '');

  fs.writeFileSync(filePath, content, 'utf8');
});
console.log('Completely cleaned backslashes from vynograd MDX files');
