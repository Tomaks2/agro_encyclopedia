const fs = require('fs');
const path = require('path');

const repo = 'd:/1/agro_encyclopedia-main/content/cultures';
const cultures = ['persyk', 'abrykos', 'chereshnia', 'slyva'];

const imageMap = {
    'persyk': {
        '01-biolohiya.md': ['life_cycle_persyk.png', 'Життєвий цикл персика'],
        '02-pidshchepy.md': ['rootstocks_persyk.png', 'Підщепи персика'],
        '03-sorty.md': ['varieties_persyk.png', 'Сорти персика'],
        '04-posadka.md': ['planting_pit_persyk.png', 'Посадкова яма'],
        '05-formuvannia.md': ['vase_pruning_persyk.png', 'Формування чаші'],
        '06-obrizka.md': ['pruning_persyk.png', 'Обрізка персика'],
        '07-zeleni-operatsii.md': ['fruit_thinning_persyk.png', 'Проріджування зав`язі'],
        '08-zhyvlennia.md': ['fertilizer_calendar_persyk.png', 'Календар живлення'],
        '09-polyv.md': ['watering_persyk.png', 'Полив персика'],
        '10-khvoroby.md': ['diseases_persyk.png', 'Хвороби персика'],
        '13-kalendar-zakhystu.md': ['protection_calendar_persyk.png', 'Календар захисту'],
        '19-zamorozky.md': ['cold_hours_persyk.png', 'Години холоду та заморозки']
    },
    'abrykos': {
        '01-biolohiya.md': ['bloom_naked_abrykos.png', 'Цвітіння абрикоса'],
        '05-formuvannia.md': ['chasha_years_abrykos.png', 'Формування чаші по роках'],
        '19-zamorozky.md': ['frost_stages_abrykos.png', 'Стадії заморозків'],
        '14-scheplennia.md': ['grafting_timeline_abrykos.png', 'Календар щеплення'],
        '15-zbir-zberihannia.md': ['harvest_stages_abrykos.png', 'Етапи збору врожаю'],
        '16-sushynnia-kurahy.md': ['kuraha_process_abrykos.png', 'Процес виготовлення кураги'],
        '10-khvoroby.md': ['moniliosis_forms_abrykos.png', 'Форми моніліозу'],
        '12-shkidnyky.md': ['pests_abrykos.png', 'Шкідники абрикоса'],
        '13-kalendar-zakhystu.md': ['protection_year_abrykos.png', 'Річний календар захисту'],
        '09-polyv.md': ['watering_calendar_abrykos.png', 'Календар поливу']
    },
    'chereshnia': {
        '14-scheplennia.md': ['budding_chereshnia.png', 'Окулірування черешні'],
        '09-polyv.md': ['calcium_cracking_chereshnia.png', 'Розтріскування плодів'],
        '12-shkidnyky.md': ['cherry_fruit_fly_chereshnia.png', 'Вишнева муха'],
        '17-zamorozky.md': ['frost_phases_chereshnia.png', 'Вплив заморозків'],
        '15-zbir-zberihannia.md': ['harvest_cold_chain_chereshnia.png', 'Охолодження врожаю'],
        '05-formuvannia.md': ['kgb_ufo_chereshnia.png', 'Системи KGB та UFO'],
        '10-khvoroby.md': ['moniliosis_chereshnia.png', 'Моніліоз черешні'],
        '16-mify.md': ['myths_reality_chereshnia.png', 'Міфи та реальність'],
        '01-biolohiya.md': ['pollination_chereshnia.png', 'Запилення черешні'],
        '13-kalendar-zakhystu.md': ['protection_year_chereshnia.png', 'Календар захисту'],
        '02-pidshchepy.md': ['rootstock_vigor_chereshnia.png', 'Сили росту підщеп'],
        '06-obrizka.md': ['summer_pruning_chereshnia.png', 'Літня обрізка черешні']
    },
    'slyva': {
        '01-biolohiya.md': ['cold_hardiness_slyva.png', 'Морозостійкість сливи'],
        '08-zhyvlennia.md': ['feeding_program_slyva.png', 'Програма живлення'],
        '19-zamorozky.md': ['frost_protection_slyva.png', 'Захист від заморозків'],
        '14-scheplennia.md': ['grafting_guide_slyva.png', 'Гайд зі щеплення'],
        '15-zbir-zberihannia.md': ['harvest_prunes_slyva.png', 'Збір чорносливу'],
        '12-shkidnyky.md': ['pests_chart_slyva.png', 'Шкідники сливи'],
        '03-sorty.md': ['pollination_plum_slyva.png', 'Запилення сливи'],
        '10-khvoroby.md': ['ppv_sharka_slyva.png', 'Шарка сливи (PPV)'],
        '06-obrizka.md': ['pruning_cuts_slyva.png', 'Правильні зрізи'],
        '02-pidshchepy.md': ['rootstock_chart_slyva.png', 'Підщепи сливи'],
        '07-zeleni-operatsii.md': ['thinning_slyva.png', 'Проріджування сливи'],
        '05-formuvannia.md': ['training_systems_slyva.png', 'Системи формування']
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
            
            // Fix text in angle brackets but IGNORE JSX TAGS!
            lines[i] = lines[i].replace(/<([a-zа-яіїєґ][^>\n]{0,100})>/gi, (match, p1) => {
                if (jsxRegex.test(p1)) return match;
                return `&lt;${p1}&gt;`;
            });
            
            // Also replace old /images/cultures/.../charts/ to /photos/.../charts/
            lines[i] = lines[i].replace(/\/images\/cultures\/([a-z]+)\/charts\//g, '/photos/$1/charts/');
        }
        
        if (culture === 'abrykos') {
            const joined = lines.join('\n');
            const abrykosPattern = /(## Джерела[\s\S]*?> 📌 \*\*Головний підсумок розділу:\*\*[\s\S]*?)\r?\n\r?\n## Джерела[\s\S]*?> 📌 \*\*Головний підсумок розділу:\*\*[\s\S]*?(?=\r?\n\r?\n<NextChapter)/;
            if (abrykosPattern.test(joined)) {
                lines = joined.replace(abrykosPattern, '$1').split('\n');
            }
        }
        
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
        
        const map = imageMap[culture];
        if (map && map[file]) {
            const [imgName, altText] = map[file];
            const imgTag = `<LightboxImage src="/photos/${culture}/charts/${imgName}" alt="${altText}" />`;
            if (lines.join('\n').indexOf(imgName) === -1) {
                let inserted = false;
                for (let i=0; i<lines.length; i++) {
                    if (!inserted && lines[i].startsWith('## ')) {
                        lines.splice(i+1, 0, '', imgTag, '');
                        inserted = true;
                        break;
                    }
                }
                if (!inserted) {
                    lines.unshift(imgTag, '');
                }
            }
        }
        
        if (culture === 'abrykos' && file === '10-khvoroby.md') {
            const imgTag = `<LightboxImage src="/photos/abrykos/charts/shot_hole_abrykos.png" alt="Клястероспоріоз абрикоса" />`;
            if (lines.join('\n').indexOf('shot_hole_abrykos.png') === -1) {
                for (let i=0; i<lines.length; i++) {
                    if (lines[i].includes('## Клястероспоріоз')) {
                        lines.splice(i+1, 0, '', imgTag, '');
                        break;
                    }
                }
            }
        }
        
        fs.writeFileSync(fullPath, lines.join('\n'), 'utf8');
    }
    console.log(`Processed ${culture}`);
}