const fs = require('fs');
const path = require('path');
const src = 'd:/1/123/123/PHOTOS_FOR_SITE_архів_36_файлів/PHOTOS_FOR_SITE/yablunia';
const files = fs.readdirSync(src);
files.forEach(f => {
    console.log(`Hex: ${Buffer.from(f).toString('hex')} -> ${f}`);
});