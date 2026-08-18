const fs = require('fs');
const path = require('path');
const dir = 'd:/1/agro_encyclopedia-main/public/photos/yablunia';
const files = fs.readdirSync(dir).filter(f => f.includes('¦') || f.includes('?'));
files.forEach(f => {
    console.log(`Size: ${fs.statSync(path.join(dir, f)).size} bytes -> ${f}`);
});