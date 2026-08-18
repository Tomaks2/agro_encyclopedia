const fs = require('fs');
const path = require('path');

// The instruction doc tells us what filenames should be. Let's rename using the actual 
// names from the LIGHTBOX_CODE.md. We need to check what files landed in each folder
// and compare with what the LIGHTBOX CODE says they should be called.

const pub = 'd:/1/agro_encyclopedia-main/public';

// Read each target dir and show what files are there
const dirs = [
    'photos/yablunia',
    'photos/persyk',
    'photos/abrykos',
    'images/cultures/polunytsia',
    'images/cultures/malytsia',
    'images/cultures/smorodyna',
    'images/cultures/ahrus',
    'images/cultures/kavun',
    'photos/zachyst',
    'photos/biozahyst',
    'photos/posadka',
    'photos/zhyvlennia',
];

for (const dir of dirs) {
    const full = path.join(pub, dir);
    if (!fs.existsSync(full)) continue;
    const files = fs.readdirSync(full).filter(f => !f.endsWith('.md'));
    if (files.length === 0) continue;
    console.log(`\n${dir}:`);
    files.forEach(f => console.log(` "${f}"`));
}