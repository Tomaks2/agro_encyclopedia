const fs = require('fs');
const path = require('path');

// Read src folder sizes as our reference
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
    'tomat': 'images/cultures/tomat',
    'zachyst': 'photos/zachyst',
    'biozahyst': 'photos/biozahyst',
    'posadka': 'photos/posadka',
};

for (const [srcSubdir, dstRelative] of Object.entries(dirMapping)) {
    const srcDir = path.join(src, srcSubdir);
    const dstDir = path.join(pub, dstRelative);
    
    if (!fs.existsSync(srcDir)) continue;
    
    const srcFiles = fs.readdirSync(srcDir)
        .filter(f => !f.endsWith('.md'))
        .map(f => ({ name: f, size: fs.statSync(path.join(srcDir, f)).size }));
    
    // Read src as buffer to detect real size  
    const dstFiles = fs.readdirSync(dstDir)
        .filter(f => !fs.statSync(path.join(dstDir, f)).isDirectory())
        .map(f => ({ name: f, size: fs.statSync(path.join(dstDir, f)).size }));
    
    for (const srcFile of srcFiles) {
        // Check if the correct file already exists in dst
        if (dstFiles.find(d => d.name === srcFile.name)) continue;
        
        // Find garbled file with same size
        const garbled = dstFiles.find(d => d.size === srcFile.size && d.name !== srcFile.name);
        if (garbled) {
            const oldPath = path.join(dstDir, garbled.name);
            const newPath = path.join(dstDir, srcFile.name);
            fs.renameSync(oldPath, newPath);
            console.log(`Renamed: ${srcSubdir}/"${garbled.name.slice(0,20)}..." -> "${srcFile.name}"`);
        } else {
            // Try direct copy from src
            const srcPath = path.join(srcDir, srcFile.name);
            const dstPath = path.join(dstDir, srcFile.name);
            if (!fs.existsSync(dstPath)) {
                fs.copyFileSync(srcPath, dstPath);
                console.log(`Copied: ${srcSubdir}/"${srcFile.name}"`);
            }
        }
    }
    
    // Delete any remaining garbled files
    const remaining = fs.readdirSync(dstDir).filter(f => f.includes('¦') || /T[А-ЯІЇЄ]/u.test(f));
    for (const f of remaining) {
        fs.unlinkSync(path.join(dstDir, f));
        console.log(`Cleaned up garbled: ${dstRelative}/${f.slice(0,20)}...`);
    }
}
console.log('\nAll done!');