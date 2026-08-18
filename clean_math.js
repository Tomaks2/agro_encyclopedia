const fs = require('fs');
const path = require('path');
const contentDir = 'd:/1/agro_encyclopedia-main/content/cultures';

let modifiedFiles = 0;

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) walk(full);
        else if (full.endsWith('.md') || full.endsWith('.json')) {
            let content = fs.readFileSync(full, 'utf8');
            let newContent = content;

            // Replacements
            newContent = newContent.replace(/\$\^?\+?(-?\d+)\^\\circ\\text\{C\}\$/g, '+$1°C'); // $+15^\circ\text{C}$
            newContent = newContent.replace(/\$\^?\+?(-?\d+)\.\.\.\+?(-?\d+)\^\\circ\\text\{C\}\$/g, '+$1...+$2°C'); // $+8...+12^\circ\text{C}$
            newContent = newContent.replace(/\$\^\\circ\\text\{C\}\$/g, '°C');
            newContent = newContent.replace(/\\circ\\text\{C\}/g, '°C');
            newContent = newContent.replace(/\\circC/g, '°C');
            newContent = newContent.replace(/\\circ/g, '°');
            newContent = newContent.replace(/\$\\approx\$/g, '≈');
            newContent = newContent.replace(/\$\\mu\$/g, 'μ');
            newContent = newContent.replace(/\$\\times\$/g, '×');
            newContent = newContent.replace(/\$([A-Za-z0-9_]+)\$/g, '$1'); // $T$ -> T, $x$ -> x
            // Clean up remaining $...$ for degrees like $+15^\circ\text{C}$ if the above missed some edge cases
            newContent = newContent.replace(/\$\+?(-?\d+)\.\.\.\+?(-?\d+)\^?\\circ\\text\{C\}\$/g, '+$1...+$2°C');
            newContent = newContent.replace(/\$\+?(-?\d+) \^?\\circ\\text\{C\}\$/g, '+$1 °C');
            newContent = newContent.replace(/\$([^\$]+)\^?\\circ\\text\{C\}\$/g, '$1°C');
            newContent = newContent.replace(/\$([^\$]+)\^\\circ C\$/g, '$1°C');
            newContent = newContent.replace(/\$([^\$]+)\\circ C\$/g, '$1°C');
            // Remove lingering math dollar signs that might surround valid temperatures
            newContent = newContent.replace(/\$(\+?-?\d+\s?(?:\.\.\.)?\s?\+?-?\d*)\s?°C\$/g, '$1°C');

            if (content !== newContent) {
                fs.writeFileSync(full, newContent, 'utf8');
                modifiedFiles++;
            }
        }
    }
}
walk(contentDir);
console.log(`Cleaned MathJax in ${modifiedFiles} files.`);