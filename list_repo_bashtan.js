const fs = require('fs');
const path = require('path');

const repo = 'd:/1/agro_encyclopedia-main/content/cultures';
const cultures = ['dynia', 'kavun', 'ohirok', 'tomat'];

for (const cult of cultures) {
    const dir = path.join(repo, cult);
    if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        console.log(`\n=== REPO: ${cult} ===`);
        files.forEach(f => console.log(f));
    } else {
        console.log(`\n=== REPO: ${cult} — NOT FOUND ===`);
    }
}