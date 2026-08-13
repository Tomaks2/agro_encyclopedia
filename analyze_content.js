const fs = require('fs');
const path = require('path');

const culturesDir = path.join(__dirname, 'content', 'cultures');
const fruitTrees = ['yablunia', 'hrusha', 'persyk', 'chereshnia', 'khurma']; // we already know abrykos and slyva

for (const culture of fruitTrees) {
    const dirPath = path.join(culturesDir, culture);
    if (!fs.existsSync(dirPath)) {
        console.log(`Culture ${culture} does not exist.`);
        continue;
    }
    
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
    console.log(`\n--- ${culture.toUpperCase()} (${files.length} files) ---`);
    
    let totalSize = 0;
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const size = Buffer.byteLength(content, 'utf8');
        totalSize += size;
        
        // Let's print files that are very small (e.g., < 1500 bytes, which probably means just title/stubs)
        if (size < 1500) {
            console.log(`[STUB] ${file} - ${size} bytes`);
        }
    }
    console.log(`Total size: ${(totalSize / 1024).toFixed(2)} KB`);
}
