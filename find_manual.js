const fs = require('fs');
const path = require('path');

const insertions = [
    // yablunia
    {
        file: 'content/cultures/yablunia/02-posadka.md',
        search: 'саджанця',
        imgTag: '\n<LightboxImage src="/photos/yablunia/yakisnyi-dvorichnyi-sadzhanets-iabluni.jpg" alt="Якісний дворічний саджанець яблуні з розвиненою кореневою системою" />\n\n'
    },
    {
        file: 'content/cultures/yablunia/01-biolohiya.md',
        search: 'запилювачів',
        imgTag: '\n<LightboxImage src="/photos/yablunia/tsvitinnia-iabluni-masove-zapylennia-bdzholamy.jpg" alt="Масове запилення квітучої яблуні бджолами під час цвітіння" />\n\n'
    },
    {
        file: 'content/cultures/yablunia/10-zbir.md',
        search: 'підтримки',
        imgTag: '\n<LightboxImage src="/photos/yablunia/pidpirky-pid-hilky-iabluni-obtiazheni-plodamy.jpg" alt="Підпірки під гілки яблуні, обтяжені плодами" />\n\n'
    },
    {
        file: 'content/cultures/yablunia/05-dohliad.md',
        search: 'Осінній догляд',
        imgTag: '\n<LightboxImage src="/photos/yablunia/osinnii-sad-pislia-zboru-vrozhaiu-prybyrannia-lystia-i-pidhotovka-do-zymy.jpg" alt="Осінній сад після збору врожаю: прибирання листя і підготовка до зими" />\n\n'
    },
    {
        file: 'content/cultures/yablunia/10-zbir.md',
        search: 'Осінній догляд',
        imgTag: '\n<LightboxImage src="/photos/yablunia/osinnii-sad-pislia-zboru-vrozhaiu-prybyrannia-lystia-i-pidhotovka-do-zymy.jpg" alt="Осінній сад після збору врожаю: прибирання листя і підготовка до зими" />\n\n'
    }
];

insertions.forEach(ins => {
    const p = path.join('d:/1/agro_encyclopedia-main', ins.file);
    if (fs.existsSync(p)) {
        const lines = fs.readFileSync(p, 'utf8').split('\n');
        const idx = lines.findIndex(l => l.toLowerCase().includes(ins.search.toLowerCase()));
        if (idx !== -1) {
            console.log(`\n--- Match in ${ins.file} for '${ins.search}' ---`);
            console.log(lines.slice(idx, idx+2).join('\n'));
        }
    }
});