const fs = require('fs');
const meta = JSON.parse(fs.readFileSync('d:/1/agro_encyclopedia-main/content/cultures/yablunia/meta.json', 'utf8'));
const pMeta = JSON.parse(fs.readFileSync('d:/1/agro_encyclopedia-main/content/cultures/persyk/meta.json', 'utf8'));

function findSlug(metaObj, filePart) {
    for (const section of metaObj.sections) {
        if (section.file && section.file.includes(filePart)) return section.slug;
    }
    return null;
}

console.log('yablunia/05-dohliad -> ' + findSlug(meta, '05-dohliad'));
console.log('yablunia/09-zakhyst -> ' + findSlug(meta, '09-zakhyst'));
console.log('persyk/05-formuvannia -> ' + findSlug(pMeta, '05-formuvannia'));