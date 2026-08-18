const fs = require('fs');
const path = require('path');

const repo = 'd:/1/agro_encyclopedia-main/content/cultures';
const arch = 'd:/1/123/123/BASHTAN_архів_4_культури';
const cultures = ['dynia', 'kavun', 'ohirok', 'tomat'];

for (const cult of cultures) {
    const archDir = path.join(arch, 'BASHTAN', cult);
    const repoDir = path.join(repo, cult);
    
    const files = fs.readdirSync(archDir).filter(f => f.endsWith('.md') && f.match(/^\d{2}-/));
    
    let hasNew = false;
    for (const file of files) {
        const archContent = fs.readFileSync(path.join(archDir, file), 'utf8');
        const repoPath = path.join(repoDir, file);
        
        if (!fs.existsSync(repoPath)) {
            console.log(`MISSING: ${cult}/${file}`);
            hasNew = true;
            continue;
        }
        
        const repoContent = fs.readFileSync(repoPath, 'utf8');
        if (archContent !== repoContent) {
            console.log(`UPDATED: ${cult}/${file} (arch=${archContent.length} chars, repo=${repoContent.length} chars)`);
            hasNew = true;
        }
    }
    
    if (!hasNew) console.log(`${cult}: all files identical`);
}