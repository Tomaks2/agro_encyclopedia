const fs = require('fs');
const path = require('path');

// The garbled names happen because Node was also reading in corrupted way.
// Let us delete garbled files and re-copy directly using Node (which handles UTF-8 paths correctly)

const src = 'd:/1/123/123/PHOTOS_FOR_SITE_архів_36_файлів/PHOTOS_FOR_SITE';
const pub = 'd:/1/agro_encyclopedia-main/public';

// First let's see what the actual src filenames are (Node should see them correctly)
const srcYablunia = path.join(src, 'yablunia');
const files = fs.readdirSync(srcYablunia);
console.log('Yablunia src files (first 5):');
files.slice(0,5).forEach(f => {
    const codes = [...f].map(c => c.charCodeAt(0)).join(',');
    console.log(`  "${f}" [${codes}]`);
});

// Also check what's in destination
const dstYablunia = path.join(pub, 'photos/yablunia');
const dstFiles = fs.readdirSync(dstYablunia).filter(f => f.includes('¦'));
console.log('\nGarbled dst files (first 3):');
dstFiles.slice(0,3).forEach(f => console.log(`  "${f}"`));