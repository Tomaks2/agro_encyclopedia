const fs = require('fs');
const path = require('path');
const contentDir = 'd:/1/agro_encyclopedia-main/content/cultures';

let modifiedFiles = 0;

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) walk(full);
        else if (full.endsWith('.md')) {
            let content = fs.readFileSync(full, 'utf8');
            let newContent = content;

            // Remove all $ symbols that wrap text, keeping the text inside
            // But we have to be careful with chemical formulas
            newContent = newContent.replace(/\$t\^° < \+?(-?\d+)\^?°C\$/g, 't° < +$1°C');
            newContent = newContent.replace(/\$t\^° = \+?(-?\d+)\.\.\.\+?(-?\d+)\^?°C\$/g, 't° = +$1...+$2°C');
            newContent = newContent.replace(/\$t\^° = \+?(-?\d+)\^?°C\$/g, 't° = +$1°C');
            newContent = newContent.replace(/\$\+?(-?\d+)\.\.\.\+?(-?\d+) \^?°C\$/g, '+$1...+$2°C');
            
            newContent = newContent.replace(/\$\\text\{P\}_2\\text\{O\}_5\$/g, 'P₂O₅');
            newContent = newContent.replace(/\$\\text\{K\}_2\\text\{O\}\$/g, 'K₂O');
            newContent = newContent.replace(/\$\\text\{MgO\}\$/g, 'MgO');
            newContent = newContent.replace(/\$\\text\{CaO\}\$/g, 'CaO');
            
            newContent = newContent.replace(/\$> (-?\d+)\\\%\$/g, '> $1%');
            newContent = newContent.replace(/\$(-?\d+)-(-?\d+)\\text\{ кг\/га\}\$/g, '$1-$2 кг/га');
            newContent = newContent.replace(/\$(-?\d+\.?\d*)\^?°C\$/g, '$1°C');
            newContent = newContent.replace(/\$C_\{40\}H_\{56\}\$/g, 'C₄₀H₅₆');
            newContent = newContent.replace(/\$2n = (\d+)\$/g, '2n = $1');

            // Catch any remaining $...$ that are simple 
            newContent = newContent.replace(/\$([^\$]+)\$/g, (match, p1) => {
                // If it contains backslashes, maybe leave it, else just strip the dollars
                return p1.replace(/\\/g, ''); 
            });

            if (content !== newContent) {
                fs.writeFileSync(full, newContent, 'utf8');
                modifiedFiles++;
            }
        }
    }
}
walk(contentDir);
console.log(`Cleaned remaining MathJax in ${modifiedFiles} files.`);