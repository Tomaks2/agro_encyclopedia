const fs = require('fs');
const path = require('path');
const archDir = 'd:/1/123/123/BASHTAN_архів_4_культури';

const cultures = ['dynia', 'kavun', 'ohirok', 'tomat'];

for (const cult of cultures) {
    const ovochDir = path.join(archDir, 'OVOCH_інфографіки', cult);
    if (fs.existsSync(ovochDir)) {
        const items = fs.readdirSync(ovochDir);
        if (items.includes('charts')) {
            console.log(`\n${cult}/charts:`);
            fs.readdirSync(path.join(ovochDir, 'charts')).forEach(f => console.log(' ', f));
        } else {
            console.log(`\n${cult}: [no charts subfolder, files are root]`);
            items.forEach(f => console.log(' ', f));
        }
    }
}