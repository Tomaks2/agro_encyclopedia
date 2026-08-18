const fs = require('fs');
const path = require('path');

const arch = 'd:/1/123/123/BASHTAN_архів_4_культури';
const prompts = fs.readFileSync(path.join(arch, 'BASHTAN', 'kavun', 'GENERATION_PROMPTS.md'), 'utf8');
const lines = prompts.split('\n');
// Show lines with СХЕМА/для розділу
lines.forEach((l, i) => {
    if (l.includes('СХЕМА') || l.includes('для розділу') || l.includes('filename') || l.includes('Файл')) {
        console.log(l);
    }
});