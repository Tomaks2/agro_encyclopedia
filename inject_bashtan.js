const fs = require('fs');
const path = require('path');

const repo = 'd:/1/agro_encyclopedia-main/content/cultures';
const cultures = ['dynia', 'kavun', 'ohirok', 'tomat'];

// Image mapping: culture -> filename -> [image, alt]
const imageMap = {
    'dynia': {
        '01-biolohiya-ta-formuvannia.md': [
            ['65_zhinchi_kvitky_dyni.png', 'Жіночі квітки дині та схема формування'],
        ],
        '02-sorty-ananas-kantalupa.md': [
            ['66_try_typy_dyni.png', 'Три типи дині: аnanas, kantalupa та касаба'],
        ],
        '03-visiv-krapelne-zroshennia.md': [
            ['67_rozsada_dyni.png', 'Розсада дині та крапельне зрошення'],
        ],
        '04-zhyvlennia-brix-цукор.md': [
            ['68_formuly_medovogo_smaku.png', 'Формули медового смаку та Brix'],
        ],
        '05-khvoroby-boroshnysta-rosa.md': [
            ['69_boroshnysta_rosa.png', 'Борошниста роса на дині'],
        ],
        '06-zbir-aromat-storage.md': [
            ['70_try_oznaky_stiglosti.png', 'Три ознаки стиглості дині'],
        ],
    },
    'kavun': {
        '01-biolohiya-ta-tsukry.md': [
            ['59_pasport_kavuna_henom_korin_i_miakot.png', 'Паспорт кавуна: геном, корінь і м\'якоть'],
            ['60_konveier_BBCH_fazy.png', 'Конвеєр BBCH-фаз кавуна'],
        ],
        '01-shcheplennia-na-pidshchepy.md': [
            ['61_scheplennya_podviinyi_efekt.png', 'Щеплення кавуна: подвійний ефект'],
        ],
        '02-sorty-chervoni-ta-zhovti.md': [
            ['62_chotyry_typy_kavuna.png', 'Чотири типи кавуна: червоні та жовті'],
        ],
        '03-visiv-ta-krapelne-zroshennia.md': [
            ['63_technologia_termos.png', 'Технологія «термос»: посів та зрошення'],
        ],
        '06-zbir-oznaky-styglocti-storage.md': [
            ['64_chotyry_oznaky_stiglosti.png', 'Чотири ознаки стиглості кавуна'],
        ],
    },
    'ohirok': {
        '01-biolohiya-ta-partenokarpia.md': [
            ['51_partenokarpiia_vs_bdzholozapylennia.png', 'Партенокарпія vs бджолозапилення'],
        ],
        '02-hibrydy-f1-amur-artist.md': [
            ['52_try_typy_shypuvatosti_plodiv.png', 'Три типи шипуватості плодів огірка'],
        ],
        '03-rozsada-ta-temperatura.md': [
            ['53_temperaturnyi_konveier_rozsady.png', 'Температурний конвеєр розсади огірка'],
        ],
        '04-shpalerne-formuvannia-parasolka.md': [
            ['54_skhema_formuvannia_parasolka.png', 'Схема формування «парасолька»'],
        ],
        '05-zhyvlennia-fertyhatsiia.md': [
            ['55_konveier_NPKCaMg_po_fenofazakh.png', 'Конвеєр NPK+Ca+Mg по фенофазах огірка'],
        ],
        '06-khvoroby-peronosporoz.md': [
            ['56_diahnostyka_peronosporozu.png', 'Діагностика пероноспорозу огірка'],
            ['peronosporoz_diagnostyka.png', 'Пероноспороз: схема діагностики'],
        ],
        '07-shkidnyky-ohirka.md': [
            ['57_klishch_vs_popelytsia.png', 'Кліщ vs попелиця на огірку'],
        ],
        '08-zbir-pickling-cooling.md': [
            ['58_kalibruvalna_sitka_ta_hydrocooling.png', 'Калібрувальна сітка та hydrocooling огірка'],
        ],
    },
    'tomat': {
        '01-biolohiya-ta-likopin.md': [
            ['45_shkala_BBCH_dlia_tomata.png', 'Шкала BBCH для томата'],
            ['50_temperaturnyi_kontrol_likopinu.png', 'Температурний контроль ліколіну'],
        ],
        '02-khasyfikatsiia-indet-det.md': [
            ['43_try_typy_rostu_kushcha_tomata.png', 'Три типи росту куща томата'],
        ],
        '04-formuvannia-pasynkuvannia.md': [
            ['46_formuvannia_v_1_steblo_pasynkuvannia.png', 'Формування в 1 стебло та пасинкування'],
        ],
        '05-zhyvlennia-vershynna-hnyts.md': [
            ['44_mekhanizm_vershynnoi_hnyli_BER.png', 'Механізм вершинної гнилі (BER)'],
        ],
        '08-zbir-dozryvannya-storage.md': [
            ['49_dozariuvannia_etylenom_u_kameri.png', 'Дозарювання етиленом у камері'],
            ['ripeness_scale_tomat.png', 'Шкала стиглості томату'],
        ],
        '06-khvoroby-tomata.md': [
            ['phytophthora_tuta_tomat.png', 'Фітофтора та тута на томаті'],
        ],
    }
};

const jsxTags = 'NextChapter|Callout|InfoBlock|LightboxImage|HeroCover|TableOfContents|ChemicalsDirectory|SectionProgress|PrintButton|br|em|strong|b|i|u|s|p|span|div|a|ul|ol|li|h[1-6]';
const jsxRegex = new RegExp(`^(${jsxTags})(\\s|$|\\/)`, 'i');

for (const culture of cultures) {
    const dir = path.join(repo, culture);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && f.match(/^\d{2}-/));
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        let content = fs.readFileSync(fullPath, 'utf8');
        let lines = content.split('\n');
        
        // MDX fixes
        for (let i = 0; i < lines.length; i++) {
            lines[i] = lines[i].replace(/<!--(.*?)-->/g, '{/* $1 */}');
            lines[i] = lines[i].replace(/<(\d)/g, '&lt;$1');
            lines[i] = lines[i].replace(/<([+\-]\d)/g, '&lt;$1');
            lines[i] = lines[i].replace(/<([a-zа-яіїєґ][^>\n]{0,100})>/gi, (match, p1) => {
                if (jsxRegex.test(p1)) return match;
                return `&lt;${p1}&gt;`;
            });
            // fix /images/cultures paths
            lines[i] = lines[i].replace(/\/images\/cultures\/([a-z]+)\/charts\//g, '/photos/$1/charts/');
        }
        
        // Duplicate heading fix
        let seenHeaders = {};
        for (let i = 0; i < lines.length; i++) {
            const m = lines[i].match(/^#{1,4} (.+)/);
            if (m) {
                const h = m[1].trim();
                if (seenHeaders[h]) {
                    seenHeaders[h]++;
                    lines[i] = lines[i].replace(h, h + ' (' + seenHeaders[h] + ')');
                } else {
                    seenHeaders[h] = 1;
                }
            }
        }
        
        // Inject images
        const imgList = imageMap[culture] && imageMap[culture][file] ? imageMap[culture][file] : [];
        
        for (let j = 0; j < imgList.length; j++) {
            const [imgName, altText] = imgList[j];
            const imgTag = `<LightboxImage src="/photos/${culture}/charts/${imgName}" alt="${altText}" />`;
            
            if (lines.join('\n').indexOf(imgName) !== -1) continue; // already there
            
            if (j === 0) {
                // Insert after first H2
                let inserted = false;
                for (let i = 0; i < lines.length; i++) {
                    if (!inserted && lines[i].startsWith('## ')) {
                        lines.splice(i + 1, 0, '', imgTag, '');
                        inserted = true;
                        break;
                    }
                }
                if (!inserted) lines.unshift(imgTag, '');
            } else {
                // Insert after Nth H2
                let h2Count = 0;
                let inserted = false;
                for (let i = 0; i < lines.length; i++) {
                    if (lines[i].startsWith('## ')) {
                        h2Count++;
                        if (h2Count === j + 1) {
                            lines.splice(i + 1, 0, '', imgTag, '');
                            inserted = true;
                            break;
                        }
                    }
                }
                if (!inserted) lines.push('', imgTag);
            }
        }
        
        fs.writeFileSync(fullPath, lines.join('\n'), 'utf8');
    }
    console.log(`Processed ${culture}`);
}