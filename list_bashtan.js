const fs = require('fs');
const path = require('path');

const archDir = 'd:/1/123/123/BASHTAN_архів_4_культури';
const items = fs.readdirSync(archDir);
console.log('Root items:', items);
items.forEach(item => {
    const full = path.join(archDir, item);
    if (fs.statSync(full).isDirectory()) {
        console.log(`\n--- ${item} ---`);
        fs.readdirSync(full).forEach(f => console.log(f));
    }
});