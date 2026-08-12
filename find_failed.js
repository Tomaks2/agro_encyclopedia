const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'content', 'cultures');
let found = false;

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath);
    } else if (fullPath.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('Дані таблиці (деталі у розширеному форматі)')) {
        console.log('FAILED TABLE:', fullPath);
        found = true;
      }
      if (content.includes('Деталі процесу.')) {
        console.log('FAILED PROCESS:', fullPath);
        found = true;
      }
    }
  }
}

scanDir(dirPath);
if (!found) console.log('All clear!');
