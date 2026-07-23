const fs = require('fs');
const path = require('path');

const dir = 'm:/agro_encyclopedia/content/cultures/vynograd';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace $$ ... $$ block formulas
  content = content.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
    // Clean text formulas or convert to text
    return '\n*Формула:* ' + formula.replace(/\\text\{([^}]+)\}/g, '$1').replace(/\\sum/g, 'Сума').replace(/\\ge/g, '≥').trim() + '\n';
  });

  // Replace $ ... $ inline formulas
  content = content.replace(/\$([^$\n]+)\$/g, (match, formula) => {
    return formula.replace(/\\text\{([^}]+)\}/g, '$1')
                  .replace(/\\circ/g, '°')
                  .replace(/\\cdot/g, '·')
                  .replace(/\\times/g, '×')
                  .replace(/\\ge/g, '≥')
                  .replace(/\\le/g, '≤')
                  .replace(/\\rightarrow/g, '→')
                  .replace(/\\xrightarrow\{[^}]+\}/g, '→')
                  .replace(/\\/g, '');
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed math in:', file);
});
