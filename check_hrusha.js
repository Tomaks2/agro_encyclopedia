const fs = require('fs');
const path = require('path');
const contentDir = 'm:/agro_encyclopedia/content/cultures/hrusha';
const publicDir = 'm:/agro_encyclopedia/public';
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
let missing = [];
files.forEach(file => {
    const content = fs.readFileSync(path.join(contentDir, file), 'utf8');
    const regex = /<LightboxImage\s+src=['"]([^'"]+)['"]/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        const imgSrc = match[1];
        const imgPath = path.join(publicDir, decodeURIComponent(imgSrc));
        if (!fs.existsSync(imgPath) && !imgSrc.startsWith('http')) {
            missing.push({ file, imgSrc });
        }
    }
    const mdRegex = /!\[.*?\]\((.*?)\)/g;
    let mdMatch;
    while ((mdMatch = mdRegex.exec(content)) !== null) {
        let imgSrc = mdMatch[1].trim();
        imgSrc = imgSrc.split(' ')[0];
        if (!imgSrc.startsWith('http')) {
            const imgPath = path.join(publicDir, decodeURIComponent(imgSrc));
            if (!fs.existsSync(imgPath)) {
                missing.push({ file, imgSrc });
            }
        }
    }
});
console.log(JSON.stringify(missing, null, 2));
