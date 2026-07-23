const fs = require('fs');
const path = require('path');

const contentDir = 'm:/agro_encyclopedia/content/cultures/hrusha';
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));

let modifiedFiles = 0;

files.forEach(file => {
    const filePath = path.join(contentDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace markdown images ![alt](src) with <LightboxImage src="src" alt="alt" />
    const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    content = content.replace(imgRegex, (match, alt, src) => {
        return `<LightboxImage src="${src}" alt="${alt.replace(/"/g, '&quot;')}" />`;
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedFiles++;
        console.log(`Updated images in ${file}`);
    }
});

console.log(`Finished updating ${modifiedFiles} files.`);
