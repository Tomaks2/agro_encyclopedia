const fs = require('fs');
const path = require('path');

const pub = 'd:/1/agro_encyclopedia-main/public';
const src = 'd:/1/123/123/PHOTOS_FOR_SITE_архів_36_файлів/PHOTOS_FOR_SITE';

// Map of garbled prefix -> latin filename
const map = {
    '¦Ъ¦¬TПTБTВ¦¦TА¦': { dir: 'photos/abrykos', latin: 'kliasterosporioz_abrykos2.png' },
    '¦¦¦-TА¦¬TБ¦-TЦ ': { dir: 'images/cultures/ahrus', latin: 'korysni-vlastyvosti-ahrusu.jpg' },
    'TБ¦-¦+¦-¦-TЦ ¦¬': { dir: 'photos/biozahyst', latin: 'sadovi-pomichnyky-iaki-varto-berehty.jpg' },
    '¦-¦-TБTВTЦ¦¦ ¦¦': { dir: 'photos/biozahyst', latin: 'nastii-kropyvy-dlia-pidzhyvlennia-ovochiv.jpg' },
    '¦¦¦-¦-¦-TЕ¦¬ TЙ': { dir: 'photos/biozahyst', latin: 'komakhy-shcho-zakhyshchaiut-sad-2-.jpg' }, // note: there are two of these, one has ' (2)'
    '¦Я¦-TА¦-¦+¦¬ ¦+': { dir: 'images/cultures/kavun', latin: 'porady-dlia-vyroshchuvannia-solodkykh-ta-sokovytykh-kavuniv.jpg' },
    '¦¬TЦ¦+¦¦¦-TА¦-¦': { dir: 'images/cultures/malytsia', latin: 'pidkormka-smorodyny-kryzhovnyka-ta-malyny.jpg' },
    '¦Ю¦-TАTЦ¦¬¦¦¦-_': { dir: 'photos/persyk', latin: 'obrizka_persyka_pravylno_forma_chashi2.png' },
    '¦¬TЦ¦+¦¦¦¬¦-¦¬¦': { dir: 'images/cultures/polunytsia', latin: 'pidzhyvlennia-polunytsi-navesni.jpg' }, // wait, smorodyna has the same prefix?
    '10 ¦+¦¦TА¦¦¦- T': { dir: 'photos/posadka', latin: '10-derev-iaki-ne-bazhano-sadyty-bilia-domu.jpg' },
    '¦¦TАTГ¦-TВ TВ¦-': { dir: 'photos/posadka', latin: 'hrunt-ta-ioho-vlastyvosti.jpg' },
    '¦Я¦¦TА¦¦¦¦¦-TЦ¦': { dir: 'photos/posadka', latin: 'perehnii-iak-mulcha-pid-plodovymy-derevamy-pravylne-vnesennia.png' }, // wait, there are two of these!
    '4 TВ¦¬¦¬¦¬ ¦-¦¬': { dir: 'images/cultures/tomat', latin: '4-typy-opor-dlia-riznykh-kultur.jpg' },
    '6 TБ¦¬¦¦¦-¦-¦¬T': { dir: 'images/cultures/tomat', latin: '6-syhnaliv-tomativ-pered-katastrofoiu.jpg' },
    '7 ¦-¦-¦¦¦¬¦-TИ¦': { dir: 'images/cultures/tomat', latin: '7-naiposhyrenishykh-problem-lystia-tomativ.jpg' },
    'TИ¦¦TЦ¦+¦-¦¬¦¦¦': { dir: 'images/cultures/tomat', latin: 'shkidnyky-tomativ-ta-poshkodzhennia-iaki-vony-sprychyniaiut.jpg' },
    '¦+¦¦TДTЦTЖ¦¬TВ ': { dir: 'images/cultures/tomat', latin: 'defitsyt-mikro-ta-makroelementiv-tomativ-.jpg' },
    '¦¬TА¦- TЙ¦- ¦¦¦': { dir: 'images/cultures/tomat', latin: 'pro-shcho-hovoryt-lysta-tomativ.jpg' },
    '¦е¦-¦-TА¦-¦-¦¬ ': { dir: 'images/cultures/tomat', latin: 'khvoroby-tomativ-ta-ikh-oznaky.jpg' },
    '¦б¦¬TБTВ¦¦¦-¦- ': { dir: 'photos/yablunia', latin: 'systema-krapelnoho-polyvu-v-iablunevomu-sadu.jpg' },
    '¦ж¦-TЦTВTЦ¦-¦-T': { dir: 'photos/yablunia', latin: 'tsvitinnia-iabluni-masove-zapylennia-bdzholamy.jpg' },
    '¦п¦¦TЦTБ¦-¦¬¦¦ ': { dir: 'photos/yablunia', latin: 'yakisnyi-dvorichnyi-sadzhanets-iabluni.jpg' },
    '¦УTЦTАTЗ¦¬TЖTП ': { dir: 'photos/yablunia', latin: 'hirchytsia-iak-syderat-mizh-riadamy-iablunevoho-sadu-zelena-masa.jpg' },
    '¦ЬTГ¦¬TМTЗTГ¦-¦': { dir: 'photos/yablunia', latin: 'mulchuvannia-prystvolnoho-kola-iabluni-perehnoiem.jpg' },
    '¦ЮTБTЦ¦-¦-TЦ¦¦ ': { dir: 'photos/yablunia', latin: 'osinnii-sad-pislia-zboru-vrozhaiu-prybyrannia-lystia-i-pidhotovka-do-zymy.jpg' },
    '¦ЯTЦ¦+¦¬TЦTА¦¦¦': { dir: 'photos/yablunia', latin: 'pidpirky-pid-hilky-iabluni-obtiazheni-plodamy.jpg' },
    '¦Я¦-¦-TЦ¦¬¦¦¦- ': { dir: 'photos/yablunia', latin: 'pobilka-shtamba-iabluni.png' },
    '¦-TГTЕ¦-¦-¦¦TАT': { dir: 'photos/zachyst', latin: 'vukhovertka-zvychaina.jpg' },
    '¦-TЦ¦¬¦-¦¦TА¦¬¦': { dir: 'photos/zachyst', latin: 'bilokrylka.jpg' }
};

const dirs = new Set(Object.values(map).map(v => v.dir));
// For files not covered (FB_IMG, duplicates) we handle them explicitly
const fbImgs = {
    'vynograd': 'FB_IMG_1782360902275.jpg',
    'zhyvlennia': 'FB_IMG_1782360810259.jpg',
    'zachyst': 'FB_IMG_1784061603090.jpg',
    'yablunia': 'FB_IMG_1772308093094.jpg'
};
dirs.add('photos/vynograd'); dirs.add('photos/zhyvlennia');

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) walk(full);
        else {
            if (f.startsWith('FB_IMG')) {
                const dstFolder = path.basename(dir);
                if (fbImgs[dstFolder]) {
                    const dest = path.join(pub, 'photos', dstFolder, f);
                    if (!fs.existsSync(dest)) {
                        fs.mkdirSync(path.dirname(dest), { recursive: true });
                        fs.copyFileSync(full, dest);
                        console.log(`Copied ${f}`);
                    }
                } else if (dstFolder === 'zachyst') {
                    // special case
                    const dest = path.join(pub, 'photos', dstFolder, f);
                    if (!fs.existsSync(dest)) fs.copyFileSync(full, dest);
                }
                continue;
            }
            // match garbled names
            for (const [prefix, target] of Object.entries(map)) {
                if (f.startsWith(prefix)) {
                    // handle duplicates
                    let latin = target.latin;
                    if (prefix === '¦¦¦-¦-¦-TЕ¦¬ TЙ') {
                        if (f.includes('(2)')) latin = 'komakhy-shcho-zakhyshchaiut-sad-2-.jpg';
                        else latin = 'komakhy-shcho-zakhyshchaiut-sad.jpg';
                    }
                    if (prefix === '¦¬TЦ¦+¦¦¦¬¦-¦¬¦') { // podzhyvlennia
                        if (dir.includes('smorodyna')) latin = 'pidzhyvlennia-smorodyny-vlitku.jpg';
                        else latin = 'pidzhyvlennia-polunytsi-navesni.jpg';
                    }
                    if (prefix === '¦Я¦¦TА¦¦¦¦¦-TЦ¦') { // perehnii
                        if (f.length < 25) latin = 'perehnii.png';
                        else latin = 'perehnii-iak-mulcha-pid-plodovymy-derevamy-pravylne-vnesennia.png';
                    }
                    const dest = path.join(pub, target.dir, latin);
                    if (!fs.existsSync(dest)) {
                        fs.mkdirSync(path.dirname(dest), { recursive: true });
                        fs.copyFileSync(full, dest);
                        console.log(`Copied and Renamed: ${f} -> ${latin}`);
                    }
                }
            }
        }
    }
}
walk(src);
console.log('Finished copying with latin names');