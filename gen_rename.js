const fs = require('fs');
const path = require('path');

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

// Output PS1 rename commands
let psCommands = [];

for (const [srcSubdir, dstRelative] of Object.entries(dirMapping)) {
    const srcDir = path.join(src, srcSubdir);
    const dstDir = path.join(pub, dstRelative);
    if (!fs.existsSync(srcDir)) continue;
    
    const srcFiles = fs.readdirSync(srcDir)
        .filter(f => !f.endsWith('.md'))
        .map(f => ({ name: f, size: fs.statSync(path.join(srcDir, f)).size }));
    
    const dstFiles = fs.readdirSync(dstDir)
        .filter(f => !fs.statSync(path.join(dstDir, f)).isDirectory())
        .map(f => ({ name: f, size: fs.statSync(path.join(dstDir, f)).size }));
    
    for (const srcFile of srcFiles) {
        const garbled = dstFiles.find(d => d.size === srcFile.size && d.name !== srcFile.name);
        if (garbled) {
            const oldPath = path.join(dstDir, garbled.name).replace(/\//g, '\\');
            const newPath = path.join(dstDir, srcFile.name).replace(/\//g, '\\');
            psCommands.push(`Rename-Item -LiteralPath "${oldPath}" -NewName "${srcFile.name}"`);
        }
    }
}

fs.writeFileSync('d:/1/agro_encyclopedia-main/rename_files.ps1', psCommands.join('\n'), 'utf8');
console.log(`Generated ${psCommands.length} rename commands`);