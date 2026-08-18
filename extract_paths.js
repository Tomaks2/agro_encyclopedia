const fs = require('fs');
const path = require('path');

// The correct filenames come from LIGHTBOX_CODE.md - let's extract them
const lightboxCode = fs.readFileSync(
    'd:/1/123/123/PHOTOS_FOR_SITE_архів_36_файлів/PHOTOS_FOR_SITE/LIGHTBOX_CODE.md', 
    'utf8'
);

// Extract all src= paths from LightboxImage tags
const matches = [...lightboxCode.matchAll(/src="([^"]+)"/g)];
const srcPaths = matches.map(m => m[1]);

console.log('Found paths in LIGHTBOX_CODE:');
srcPaths.forEach(p => {
    const filename = path.basename(p);
    const dir = path.dirname(p).replace(/^\//, '');
    console.log(`  ${dir} -> ${filename}`);
});