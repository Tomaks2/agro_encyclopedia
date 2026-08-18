const fs = require('fs');
const path = require('path');

// The files were copied with garbled names (Windows-1251 read as something else).
// We need to rename them to proper Ukrainian names.
// Strategy: read from the src directory directly using Node, get the correct UTF-8 names, 
// then match them by file size to find which garbled file corresponds to which name.

const src = 'd:/1/123/123/PHOTOS_FOR_SITE_архів_36_файлів/PHOTOS_FOR_SITE';
const pub = 'd:/1/agro_encyclopedia-main/public';

const dirMapping = {
    'yablunia': 'photos/yablunia',
    'persyk': 'photos/persyk',
    'abrykos': 'photos/abrykos',
    'polunytsia': 'images/cultures/polunytsia',
    'malytsia': 'images/cultures/malytsia',
    'smorodyna': 'images/cultures/smorodyna',
    'ahrus': 'images/cultures/ahrus',
    'kavun': 'images/cultures/kavun',
    'zachyst': 'photos/zachyst',
    'biozahyst': 'photos/biozahyst',
    'posadka': 'photos/posadka',
    'zhyvlennia': 'photos/zhyvlennia',
};

let renamed = 0;

for (const [subdir, targetRelative] of Object.entries(dirMapping)) {
    const srcDir = path.join(src, subdir);
    const dstDir = path.join(pub, targetRelative);
    
    if (!fs.existsSync(srcDir) || !fs.existsSync(dstDir)) continue;
    
    // Get source files with correct names + sizes
    const srcFiles = fs.readdirSync(srcDir)
        .filter(f => !f.endsWith('.md'))
        .map(f => ({ name: f, size: fs.statSync(path.join(srcDir, f)).size }));
    
    // Get destination files (garbled names) + sizes
    const dstFiles = fs.readdirSync(dstDir)
        .filter(f => !fs.statSync(path.join(dstDir, f)).isDirectory())
        .map(f => ({ name: f, size: fs.statSync(path.join(dstDir, f)).size }));
    
    // Match by file size and rename
    for (const srcFile of srcFiles) {
        const match = dstFiles.find(d => d.size === srcFile.size && d.name !== srcFile.name);
        if (match) {
            const oldPath = path.join(dstDir, match.name);
            const newPath = path.join(dstDir, srcFile.name);
            if (!fs.existsSync(newPath)) {
                fs.renameSync(oldPath, newPath);
                console.log(`Renamed: ${subdir}/${match.name} -> ${srcFile.name}`);
                renamed++;
            }
        }
    }
}

console.log(`\nTotal renamed: ${renamed}`);