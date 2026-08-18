const fs = require('fs');
const path = require('path');

// Check PHOTOS_FOR_SITE folder structure
const photosDir = 'd:/1/123/123/PHOTOS_FOR_SITE_архів_36_файлів';
function listDir(dir, indent = '') {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
        const full = path.join(dir, item);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
            console.log(`${indent}📁 ${item}/`);
            listDir(full, indent + '  ');
        } else {
            const sizeKB = Math.round(stat.size / 1024);
            console.log(`${indent}📄 ${item} (${sizeKB}KB)`);
        }
    });
}
listDir(photosDir);