const fs = require('fs');
const path = require('path');

const archDir = 'd:/1/123/123/BASHTAN_архів_4_культури';

const cultures = ['dynia', 'kavun', 'ohirok', 'tomat'];

for (const cult of cultures) {
    console.log(`\n=== ${cult} — BASHTAN files ===`);
    const bashDir = path.join(archDir, 'BASHTAN', cult);
    if (fs.existsSync(bashDir)) {
        fs.readdirSync(bashDir).forEach(f => console.log(f));
    }
    
    console.log(`\n=== ${cult} — OVOCH infographics ===`);
    const ovochDir = path.join(archDir, 'OVOCH_інфографіки', cult);
    if (fs.existsSync(ovochDir)) {
        fs.readdirSync(ovochDir).forEach(f => console.log(f));
    }
}