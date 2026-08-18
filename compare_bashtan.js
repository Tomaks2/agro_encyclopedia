const fs = require('fs');
const path = require('path');

const repo = 'd:/1/agro_encyclopedia-main/content/cultures';
const arch = 'd:/1/123/123/BASHTAN_архів_4_культури';
const cultures = ['dynia', 'kavun', 'ohirok', 'tomat'];

for (const cult of cultures) {
    const archMeta = JSON.parse(fs.readFileSync(path.join(arch, 'BASHTAN', cult, 'meta.json'), 'utf8'));
    const repoMeta = JSON.parse(fs.readFileSync(path.join(repo, cult, 'meta.json'), 'utf8'));
    
    const archSlugs = archMeta.sections.map(s => s.slug);
    const repoSlugs = repoMeta.sections.map(s => s.slug);
    
    console.log(`\n=== ${cult} ===`);
    console.log(`Archive: ${archSlugs.length} sections`);
    console.log(`Repo:    ${repoSlugs.length} sections`);
    
    const newSlugs = archSlugs.filter(s => !repoSlugs.includes(s));
    const missSlugs = repoSlugs.filter(s => !archSlugs.includes(s));
    
    if (newSlugs.length) console.log('NEW in archive:', newSlugs);
    if (missSlugs.length) console.log('MISSING from archive:', missSlugs);
    if (!newSlugs.length && !missSlugs.length) console.log('Same sections!');
}