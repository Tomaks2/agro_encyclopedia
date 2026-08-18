const fs = require('fs');
const path = require('path');
const dir = 'd:/1/agro_encyclopedia-main/public/photos/yablunia';
const files = fs.readdirSync(dir);
files.forEach(f => {
    const size = fs.statSync(path.join(dir, f)).size;
    // only show files that look like garbled (not standard english names)
    if (!/^[a-zA-Z0-9_.\-]+$/.test(f)) {
        console.log(`Size: ${size} bytes -> Hex: ${Buffer.from(f).toString('hex')} -> ${f}`);
    }
});