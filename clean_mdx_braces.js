const fs = require('fs');
const path = require('path');

const dir = 'm:/agro_encyclopedia/content/cultures/vynograd';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace curly braces that MDX attempts to parse as JSX expressions
  content = content.replace(/\{([^}]+)\}/g, (match, inner) => {
    // If it's a known component prop/tag like HeroCover, keep it, otherwise remove braces or escape
    if (inner.includes('imageSrc') || inner.includes('Callout') || inner.includes('InfoBlock')) {
      return match;
    }
    return inner;
  });

  fs.writeFileSync(filePath, content, 'utf8');
});
console.log('Sanitized MDX braces in all vynograd files');
