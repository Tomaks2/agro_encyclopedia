const fs = require('fs');
const path = require('path');
const contentDir = 'd:/1/agro_encyclopedia-main/content/cultures';

let missing = 0;
const expected = [
    'kliasterosporioz_abrykos2.png',
    'korysni-vlastyvosti-ahrusu.jpg',
    'FB_IMG_1784061603090.jpg',
    'bilokrylka.jpg',
    'komakhy-shcho-zakhyshchaiut-sad.jpg',
    'sadovi-pomichnyky-iaki-varto-berehty.jpg',
    'nastii-kropyvy-dlia-pidzhyvlennia-ovochiv.jpg',
    'hrunt-ta-ioho-vlastyvosti.jpg',
    'perehnii.png',
    '10-derev-iaki-ne-bazhano-sadyty-bilia-domu.jpg',
    'porady-dlia-vyroshchuvannia-solodkykh-ta-sokovytykh-kavuniv.jpg',
    'pidkormka-smorodyny-kryzhovnyka-ta-malyny.jpg',
    'pidzhyvlennia-polunytsi-navesni.jpg',
    'pidzhyvlennia-smorodyny-vlitku.jpg',
    '4-typy-opor-dlia-riznykh-kultur.jpg',
    'khvoroby-tomativ-ta-ikh-oznaky.jpg',
    '7-naiposhyrenishykh-problem-lystia-tomativ.jpg',
    'defitsyt-mikro-ta-makroelementiv-tomativ-.jpg',
    'shkidnyky-tomativ-ta-poshkodzhennia-iaki-vony-sprychyniaiut.jpg',
    'yakisnyi-dvorichnyi-sadzhanets-iabluni.jpg',
    'tsvitinnia-iabluni-masove-zapylennia-bdzholamy.jpg',
    'pidpirky-pid-hilky-iabluni-obtiazheni-plodamy.jpg',
    'osinnii-sad-pislia-zboru-vrozhaiu-prybyrannia-lystia-i-pidhotovka-do-zymy.jpg',
    'FB_IMG_1782360810259.jpg'
];

let allContent = '';
function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) walk(full);
        else if (full.endsWith('.md')) {
            allContent += fs.readFileSync(full, 'utf8') + '\n';
        }
    }
}
walk(contentDir);

expected.forEach(img => {
    if (!allContent.includes(img)) {
        console.log(`[MISSING] ${img}`);
        missing++;
    }
});
console.log(`Missing ${missing} images.`);