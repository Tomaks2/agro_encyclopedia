const fs = require('fs');
const path = require('path');

// Check instruction file in root of 123
const root123 = 'd:/1/123/123';
const rootFiles = fs.readdirSync(root123).filter(f => !fs.statSync(path.join(root123, f)).isDirectory());
console.log('Root files in 123/123:');
rootFiles.forEach(f => console.log(' ', f));