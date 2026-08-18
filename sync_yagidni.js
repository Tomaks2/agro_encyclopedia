const fs = require('fs');
const path = require('path');

const repo = 'd:/1/agro_encyclopedia-main/content/cultures';
const arch = 'd:/1/123/123/YAGIDNI_архів_6_культур/YAGIDNI';
const cultures = ['ahrus', 'lokhyna', 'malytsia', 'ozhyna', 'polunytsia', 'smorodyna'];

for (const culture of cultures) {
    const archDir = path.join(arch, culture);
    const repoDir = path.join(repo, culture);
    
    // Read meta.json from archive and overwrite repo's meta.json
    if (fs.existsSync(path.join(archDir, 'meta.json'))) {
        fs.copyFileSync(path.join(archDir, 'meta.json'), path.join(repoDir, 'meta.json'));
    }

    const archFiles = fs.readdirSync(archDir).filter(f => f.endsWith('.md') && f.match(/^\d{2}-/));
    const repoFiles = fs.readdirSync(repoDir).filter(f => f.endsWith('.md') && f.match(/^\d{2}-/));
    
    for (const archFile of archFiles) {
        const prefix = archFile.substring(0, 3); // "01-", "02-"
        const repoFile = repoFiles.find(f => f.startsWith(prefix));
        
        if (repoFile) {
            // Overwrite repo file with arch file content
            const content = fs.readFileSync(path.join(archDir, archFile));
            fs.writeFileSync(path.join(repoDir, repoFile), content);
            console.log(`Updated ${culture}/${repoFile} from archive`);
        } else {
            // New file in archive, copy it directly
            fs.copyFileSync(path.join(archDir, archFile), path.join(repoDir, archFile));
            console.log(`Copied new file ${culture}/${archFile} from archive`);
        }
    }
}