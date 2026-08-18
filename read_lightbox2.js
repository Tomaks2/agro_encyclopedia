const fs = require('fs');
const path = require('path');

const dir = 'd:/1/123/123/PHOTOS_FOR_SITE_архів_36_файлів/PHOTOS_FOR_SITE';
const lightbox = fs.readFileSync(path.join(dir, 'LIGHTBOX_CODE.md'), 'utf8');
console.log(lightbox.slice(0, 4000));