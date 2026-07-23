const fs = require('fs');
const path = require('path');

const contentDir = 'm:/agro_encyclopedia/content/cultures/yablunia';
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));

let modifiedFiles = 0;

files.forEach(file => {
    const filePath = path.join(contentDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace markdown images ![alt](src) with <LightboxImage src="src" alt="alt" />
    // Ignore images inside HTML comments if any
    const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    content = content.replace(imgRegex, (match, alt, src) => {
        // Special case: remove the broken missing image
        if (src.includes('Розділ_9_Сік.png')) {
            return '';
        }
        return `<LightboxImage src="${src}" alt="${alt.replace(/"/g, '&quot;')}" />`;
    });

    // Check if anything changed
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedFiles++;
        console.log(`Updated images in ${file}`);
    }
});

console.log(`Finished updating ${modifiedFiles} files.`);
