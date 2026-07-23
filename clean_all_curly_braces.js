const fs = require('fs');
const path = require('path');

const dir = 'm:/agro_encyclopedia/content/cultures/vynograd';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove any remaining raw curly braces not inside MDX component tags
  const lines = content.split('\n');
  const cleaned = lines.map(line => {
    if (line.trim().startsWith('<') || line.trim().startsWith('/>') || line.includes('imageSrc') || line.includes('type=')) {
      return line;
    }
    return line.replace(/\{([^}]+)\}/g, '$1');
  });

  fs.writeFileSync(filePath, cleaned.join('\n'), 'utf8');
});
console.log('Completely cleaned all remaining MDX curly braces');
