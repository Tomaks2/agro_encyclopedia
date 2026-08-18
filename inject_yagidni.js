const fs = require('fs');
const path = require('path');

const repo = 'd:/1/agro_encyclopedia-main/content/cultures';
const cultures = ['ahrus', 'lokhyna', 'malytsia', 'ozhyna', 'polunytsia', 'smorodyna'];

const imageMap = {
    'ahrus': {
        '01-biolohiya-ta-shypy.md': ['gooseberry_infographic_31.png', 'Фенокалендар BBCH аґрусу'],
        '02-sorty-ahrusu.md': ['gooseberry_infographic_32.png', 'Сортна матриця аґрусу'],
        // 03-obrizka-ta-shtamb.md has two images
        '05-khvoroba-sferoteka.md': ['gooseberry_infographic_35.png', 'Протокол захисту від сферотеки'],
        '06-shkidnyky-ta-zbir.md': ['gooseberry_infographic_36.png', 'Два вікна збору']
    },
    'lokhyna': {
        // 01-biolohiya-та-atsydofiliia.md has two
        // 02-substraty-ta-zakyslennia.md has two
        '03-sorty-lokhyny.md': ['blueberry_infographic_21.png', 'Сорт-стратегія лохини'],
        '04-obrizka-ta-formuvannia.md': ['blueberry_infographic_22.png', 'Вікова піраміда куща лохини'],
        '07-zbir-pruin-cooling.md': ['blueberry_infographic_23.png', 'Логістика зберігання лохини']
    },
    'malytsia': {
        // 01-biolohiya-та-morfolohiya.md has two
        '02-sorty-floricane-primocane.md': ['raspberry_infographic_12.png', 'Вибір сортової стратегії'],
        '03-shpalery-та-obrizka.md': ['raspberry_infographic_13.png', 'Т-подібна шпалера'],
        '04-zhyvlennia-фертигація.md': ['raspberry_infographic_14.png', 'Фазовий зсув N:K у фертигації'],
        '06-shkidnyky-малини.md': ['raspberry_infographic_15.png', 'Ланцюг «Галиця → Дідімела»'], // Wait, section 06 is shkidnyky, but the prompt says 'для розділу 06', wait did I get the file right?
        '07-zbir-охлодження-зберігання.md': ['raspberry_infographic_16.png', 'Постзбиральний ланцюг малини']
    },
    'ozhyna': {
        '01-biolohiya-та-hrupy-sortiv.md': ['blackberry_infographic_01_groups.png', 'Три групи ожини'],
        '02-sorty-ozhyny-ta-hibrydy.md': ['blackberry_infographic_02_varieties.png', 'Сортна матриця ожини'],
        // 03-povorotna-shpalera-rca-obrizka.md has two
        '05-khvoroby-ta-shkidnyky-ozhyny.md': ['blackberry_infographic_05_redberry_disease.png', 'Білоклітинність'],
        '06-zbir-охлодження-зберігання.md': ['blackberry_infographic_06_harvest_stages.png', 'Shiny Black vs Dull Black']
    },
    'polunytsia': {
        // 01-biolohiya-та-genetyka.md has two
        '02-tipy-sortiv-ksd-nsd.md': ['157_fotoperiodychni_typy.png', 'Три фотоперіодичні типи'],
        '03-rozsada-frigo-metody.md': ['158_protokol_frigo.png', 'Протокол розморожування Frigo'],
        '04-tekhnolohii-vyroshchuvannia.md': ['159_try_tehnologii.png', 'Три технології вирощування'],
        '05-zhyvlennia-fertyhatsiia.md': ['160_fertygatsiia.png', 'Фазовий план фертигації'],
        '06-khvoroby-ta-zahyst.md': ['161_frac_rotatsiia.png', 'FRAC-ротація проти сірої гнилі'],
        '07-shkidnyky-ta-biozahyst.md': ['162_biozahyst.png', 'План біозахисту ентомофагами'],
        '08-zbir-zberihannia-cooling.md': ['163_postzbyralnyi_lantziug.png', 'Постзбиральний ланцюг']
    },
    'smorodyna': {
        // 01-biolohiya-chornoi-ta-chervonoi.md has two
        '02-sorty-smorodyny-ta-porichok.md': ['currant_infographic_03_markets.png', 'Два ринки — два набори критеріїв'],
        // 03-obrizka-kushchova-та-shtambova.md has two
        '05-khvoroby-smorodyny.md': ['currant_infographic_06_brv_quarantine.png', 'Карантинний протокол BRV'],
        '07-zbir-mehano-cooling.md': ['currant_infographic_07_harvest_chain.png', 'Два ланцюги збору']
    }
};

const multiImageMap = {
    'ahrus': {
        '03-obrizka-ta-shtamb.md': [
            ['gooseberry_infographic_33.png', 'Вікова структура куща'],
            ['gooseberry_infographic_34.png', 'Штамбовий аґрус']
        ]
    },
    'lokhyna': {
        '01-biolohiya-та-atsydofiliia.md': [
            ['blueberry_infographic_17.png', 'Анатомія всмоктування лохини'],
            ['blueberry_infographic_18.png', 'Фенокалендар BBCH лохини']
        ],
        '02-substraty-ta-zakyslennia.md': [
            ['blueberry_infographic_19.png', 'Рецептура субстрату лохини'],
            ['blueberry_infographic_20.png', 'Закислення поливної води']
        ]
    },
    'malytsia': {
        '01-biolohiya-та-morfolohiya.md': [
            ['raspberry_infographic_10.png', 'Життєвий цикл пагона малини'],
            ['raspberry_infographic_11.png', 'Коренева система малини']
        ]
    },
    'ozhyna': {
        '03-povorotna-shpalera-rca-obrizka.md': [
            ['blackberry_infographic_03_trellis.png', 'Шпалера RCA'],
            ['blackberry_infographic_04_pruning.png', 'Дво-траншна обрізка']
        ]
    },
    'polunytsia': {
        '01-biolohiya-та-genetyka.md': [
            ['155_anatomiya_rizhka.png', 'Анатомія ріжка та кореневої системи'],
            ['156_iierarhiia_kvitok.png', 'Ієрархія квіток суниці']
        ]
    },
    'smorodyna': {
        '01-biolohiya-chornoi-ta-chervonoi.md': [
            ['currant_infographic_01_biology.png', 'Подвійна біологія Ribes'],
            ['currant_infographic_02_bbch.png', 'Фенокалендар BBCH Ribes']
        ],
        '03-obrizka-kushchova-та-shtambova.md': [
            ['currant_infographic_04_bush_architecture.png', 'Вікова архітектура куща'],
            ['currant_infographic_05_standard_form.png', 'Штамбова форма']
        ]
    }
};

const jsxTags = 'NextChapter|Callout|InfoBlock|LightboxImage|HeroCover|TableOfContents|ChemicalsDirectory|SectionProgress|PrintButton|br|em|strong|b|i|u|s|p|span|div|a|ul|ol|li|h[1-6]';
const jsxRegex = new RegExp(`^(${jsxTags})(\\s|$|\\/)`, 'i');

for (const culture of cultures) {
    const dir = path.join(repo, culture);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        let content = fs.readFileSync(fullPath, 'utf8');
        let lines = content.split('\n');
        
        for (let i=0; i<lines.length; i++) {
            lines[i] = lines[i].replace(/<!--(.*?)-->/g, '{/* $1 */}');
            lines[i] = lines[i].replace(/<(\d)/g, '&lt;$1');
            lines[i] = lines[i].replace(/<([+\-]\d)/g, '&lt;$1');
            lines[i] = lines[i].replace(/<([a-zа-яіїєґ][^>\n]{0,100})>/gi, (match, p1) => {
                if (jsxRegex.test(p1)) return match;
                return `&lt;${p1}&gt;`;
            });
            lines[i] = lines[i].replace(/\/images\/cultures\/([a-z]+)\/charts\//g, '/photos/$1/charts/');
        }
        
        // Header deduplication
        let seenHeaders = {};
        for (let i=0; i<lines.length; i++) {
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
        
        // Injection
        let toInject = [];
        const map = imageMap[culture];
        if (map && map[file]) {
            toInject.push(map[file]);
        }
        const mMap = multiImageMap[culture];
        if (mMap && mMap[file]) {
            toInject = mMap[file];
        }
        
        for (let j=0; j<toInject.length; j++) {
            const [imgName, altText] = toInject[j];
            const imgTag = `<LightboxImage src="/photos/${culture}/charts/${imgName}" alt="${altText}" />`;
            if (lines.join('\n').indexOf(imgName) === -1) {
                let inserted = false;
                for (let i=0; i<lines.length; i++) {
                    if (lines[i].startsWith('## ')) {
                        // For second image, insert after the SECOND h2
                        if (j === 1) {
                            for (let k=i+1; k<lines.length; k++) {
                                if (lines[k].startsWith('## ')) {
                                    lines.splice(k+1, 0, '', imgTag, '');
                                    inserted = true;
                                    break;
                                }
                            }
                        } else {
                            lines.splice(i+1, 0, '', imgTag, '');
                            inserted = true;
                        }
                        if (inserted) break;
                    }
                }
                if (!inserted) {
                    lines.unshift(imgTag, '');
                }
            }
        }
        
        fs.writeFileSync(fullPath, lines.join('\n'), 'utf8');
    }
    console.log(`Processed ${culture}`);
}