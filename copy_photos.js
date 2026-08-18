const fs = require('fs');
const path = require('path');

const src = 'd:/1/123/123/PHOTOS_FOR_SITE_архів_36_файлів/PHOTOS_FOR_SITE';
const pub = 'd:/1/agro_encyclopedia-main/public';

// === STEP 1: Copy all files to their target public/ directories ===
const copyMap = {
    'yablunia': path.join(pub, 'photos/yablunia'),
    'persyk':   path.join(pub, 'photos/persyk'),
    'abrykos':  path.join(pub, 'photos/abrykos'),
    'polunytsia': path.join(pub, 'images/cultures/polunytsia'),  // per instruction
    'malytsia': path.join(pub, 'images/cultures/malytsia'),
    'smorodyna': path.join(pub, 'images/cultures/smorodyna'),
    'ahrus':    path.join(pub, 'images/cultures/ahrus'),
    'kavun':    path.join(pub, 'images/cultures/kavun'),
    'tomat':    path.join(pub, 'images/cultures/tomat'),
    'zachyst':  path.join(pub, 'photos/zachyst'),
    'biozahyst': path.join(pub, 'photos/biozahyst'),
    'posadka':  path.join(pub, 'photos/posadka'),
    'zhyvlennia': path.join(pub, 'photos/zhyvlennia'),
    'vynograd': path.join(pub, 'photos/vynograd'),
};

// Create target dirs
Object.values(copyMap).forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Copy files
const srcSubdirs = fs.readdirSync(src).filter(f => fs.statSync(path.join(src, f)).isDirectory());
for (const subdir of srcSubdirs) {
    const targetDir = copyMap[subdir];
    if (!targetDir) { console.log(`WARNING: no mapping for ${subdir}`); continue; }
    
    const files = fs.readdirSync(path.join(src, subdir));
    for (const file of files) {
        if (file.endsWith('.md')) continue;  // skip markdown files
        const srcFile = path.join(src, subdir, file);
        const dstFile = path.join(targetDir, file);
        fs.copyFileSync(srcFile, dstFile);
        console.log(`Copied: ${subdir}/${file} -> ${path.relative(pub, dstFile)}`);
    }
}

console.log('\nAll files copied!');