const fs = require('fs');
const path = require('path');

const repo = 'd:/1/agro_encyclopedia-main/content/cultures';
const arch = 'd:/1/123/123/BASHTAN_архів_4_культури';
const pub = 'd:/1/agro_encyclopedia-main/public/photos';
const cultures = ['dynia', 'kavun', 'ohirok', 'tomat'];

// === STEP 1: Copy updated MD files and meta.json from archive ===
console.log('=== STEP 1: Syncing MD files from archive ===');
for (const cult of cultures) {
    const archDir = path.join(arch, 'BASHTAN', cult);
    const repoDir = path.join(repo, cult);
    
    const files = fs.readdirSync(archDir).filter(f => f.endsWith('.md') && f.match(/^\d{2}-/));
    for (const file of files) {
        const archContent = fs.readFileSync(path.join(archDir, file));
        fs.writeFileSync(path.join(repoDir, file), archContent);
        console.log(`Copied ${cult}/${file}`);
    }
    
    // Also copy meta.json
    fs.copyFileSync(path.join(archDir, 'meta.json'), path.join(repoDir, 'meta.json'));
    console.log(`Copied ${cult}/meta.json`);
}

// === STEP 2: Copy infographic images to public/photos ===
console.log('\n=== STEP 2: Copying infographics to public/photos ===');
for (const cult of cultures) {
    const ovochDir = path.join(arch, 'OVOCH_інфографіки', cult);
    const chartsDir = path.join(pub, cult, 'charts');
    
    if (!fs.existsSync(chartsDir)) {
        fs.mkdirSync(chartsDir, { recursive: true });
    }
    
    // Check if images are in a 'charts' subfolder or root
    const ovochItems = fs.readdirSync(ovochDir);
    const srcDir = ovochItems.includes('charts') ? path.join(ovochDir, 'charts') : ovochDir;
    
    const images = fs.readdirSync(srcDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));
    for (const img of images) {
        fs.copyFileSync(path.join(srcDir, img), path.join(chartsDir, img));
        console.log(`Copied photo ${cult}/${img}`);
    }
}
console.log('\nAll done!');