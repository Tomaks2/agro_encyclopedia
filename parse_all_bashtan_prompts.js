const fs = require('fs');
const path = require('path');

const arch = 'd:/1/123/123/BASHTAN_архів_4_культури';
const cultures = ['dynia', 'kavun', 'ohirok', 'tomat'];

for (const cult of cultures) {
    const promptPath = path.join(arch, 'BASHTAN', cult, 'GENERATION_PROMPTS.md');
    if (!fs.existsSync(promptPath)) { console.log(`NO PROMPTS for ${cult}`); continue; }
    
    const prompts = fs.readFileSync(promptPath, 'utf8');
    console.log(`\n=== ${cult.toUpperCase()} ===`);
    prompts.split('\n').forEach(l => {
        if (l.match(/Розділ \d+/i) || l.match(/СХЕМА \d+/i)) {
            console.log(l.trim());
        }
    });
}