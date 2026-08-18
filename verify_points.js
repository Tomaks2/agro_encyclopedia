const fs = require('fs');
const path = require('path');
const pub = 'd:/1/agro_encyclopedia-main/public';
const contentDir = 'd:/1/agro_encyclopedia-main/content/cultures';

// A strict list of exact replacements.
// We will look for exact `findText` (string) and replace it with `findText + '\n\n' + imgTag`.
// We will verify the number of occurrences is exactly 1 before replacing.

const replacements = [
    // === ABRYKOS ===
    {
        file: 'abrykos/08-khvoroby.md', 
        findText: '#### Клястероспоріоз',
        imgTag: '<LightboxImage src="/photos/abrykos/kliasterosporioz_abrykos2.png" alt="Клястероспоріоз абрикоса" />'
    },
    // === AHRUS ===
    {
        file: 'ahrus/01-biolohiya.md',
        findText: '## Ботанічний опис аґрусу',
        imgTag: '<LightboxImage src="/images/cultures/ahrus/korysni-vlastyvosti-ahrusu.jpg" alt="Корисні властивості плодів аґрусу" />'
    },
    // === ZACHYST / BIOZAHYST ===
    {
        file: 'yablunia/08-shkidnyky.md', // sverdlilschiki
        findText: '## Шкідники деревини',
        imgTag: '<LightboxImage src="/photos/zachyst/FB_IMG_1784061603090.jpg" alt="Пошкодження стовбура дерева свердлувальними шкідниками" />'
    },
    {
        file: 'ohirok/06-shkidnyky-ohirka.md', // bilokrylka
        findText: '#### Білокрилка',
        imgTag: '<LightboxImage src="/photos/zachyst/bilokrylka.jpg" alt="Білокрилка на листі" />'
    },
    {
        file: 'tomat/06-shkidnyky-tomata.md', // bilokrylka
        findText: '#### Білокрилка',
        imgTag: '<LightboxImage src="/photos/zachyst/bilokrylka.jpg" alt="Білокрилка на листі" />'
    },
    {
        file: 'persyk/08-shkidnyky.md', // vuhovertka - check if exists
        findText: 'Вуховертка',
        imgTag: '<LightboxImage src="/photos/zachyst/vukhovertka-zvychaina.jpg" alt="Вуховертка звичайна" />'
    },
    {
        file: 'yablunia/09-zakhyst.md', // biozahyst komakhy
        findText: '### Біологічні препарати',
        imgTag: '<LightboxImage src="/photos/biozahyst/komakhy-shcho-zakhyshchaiut-sad.jpg" alt="Корисні комахи, які захищають сад" />'
    },
    {
        file: 'yablunia/09-zakhyst.md', // biozahyst pomichnyky
        findText: '### Збереження корисної фауни',
        imgTag: '<LightboxImage src="/photos/biozahyst/sadovi-pomichnyky-iaki-varto-berehty.jpg" alt="Садові помічники" />'
    },
    {
        file: 'tomat/04-zhyvlennia.md', // narodni zasoby kropyva
        findText: '### Народні засоби',
        imgTag: '<LightboxImage src="/photos/biozahyst/nastii-kropyvy-dlia-pidzhyvlennia-ovochiv.jpg" alt="Настій кропиви" />'
    },
    // === POSADKA ===
    {
        file: 'yablunia/02-posadka.md',
        findText: '### Вимоги до ґрунту',
        imgTag: '<LightboxImage src="/photos/posadka/hrunt-ta-ioho-vlastyvosti.jpg" alt="Грунт та його властивості" />'
    },
    {
        file: 'yablunia/02-posadka.md',
        findText: '### Підготовка ями',
        imgTag: '<LightboxImage src="/photos/posadka/perehnii.png" alt="Перегній — органічне добриво" />'
    },
    {
        file: 'yablunia/02-posadka.md',
        findText: '### Сумісність з іншими рослинами',
        imgTag: '<LightboxImage src="/photos/posadka/10-derev-iaki-ne-bazhano-sadyty-bilia-domu.jpg" alt="Дерева які не бажано садити" />'
    },
    // === KAVUN ===
    {
        file: 'kavun/02-posadka-vyroshchuvannia.md', // vyroshchuvannia
        findText: '## Агротехніка вирощування',
        imgTag: '<LightboxImage src="/images/cultures/kavun/porady-dlia-vyroshchuvannia-solodkykh-ta-sokovytykh-kavuniv.jpg" alt="Поради для вирощування солодких та соковитих кавунів" />'
    },
    // === YAGIDNI ===
    {
        file: 'malytsia/04-zhyvlennia.md',
        findText: '## Стратегія підживлення малини',
        imgTag: '<LightboxImage src="/images/cultures/malytsia/pidkormka-smorodyny-kryzhovnyka-ta-malyny.jpg" alt="Підживлення смородини, агрусу та малини" />'
    },
    {
        file: 'polunytsia/04-zhyvlennia.md',
        findText: '### Весняне підживлення',
        imgTag: '<LightboxImage src="/images/cultures/polunytsia/pidzhyvlennia-polunytsi-navesni.jpg" alt="Підживлення полуниці навесні" />'
    },
    {
        file: 'smorodyna/04-zhyvlennia.md',
        findText: '### Літнє підживлення (після збору врожаю)',
        imgTag: '<LightboxImage src="/images/cultures/smorodyna/pidzhyvlennia-smorodyny-vlitku.jpg" alt="Літнє підживлення смородини" />'
    },
    // === TOMAT ===
    {
        file: 'tomat/03-formuvannia-krony-pidviazka.md',
        findText: '## Способи підв\'язування',
        imgTag: '<LightboxImage src="/images/cultures/tomat/4-typy-opor-dlia-riznykh-kultur.jpg" alt="4 типи опор для різних культур" />'
    },
    {
        file: 'tomat/05-khvoroby-tomata.md',
        findText: '## Основні хвороби томатів',
        imgTag: '<LightboxImage src="/images/cultures/tomat/khvoroby-tomativ-ta-ikh-oznaky.jpg" alt="Хвороби томатів та їх ознаки" />'
    },
    {
        file: 'tomat/05-khvoroby-tomata.md',
        findText: '### Діагностика за листям', // verify if exists
        imgTag: '<LightboxImage src="/images/cultures/tomat/7-naiposhyrenishykh-problem-lystia-tomativ.jpg" alt="7 найпоширеніших проблем листя" />'
    },
    {
        file: 'tomat/04-zhyvlennia.md', // deficit
        findText: '### Ознаки дефіциту',
        imgTag: '<LightboxImage src="/images/cultures/tomat/defitsyt-mikro-ta-makroelementiv-tomativ-.jpg" alt="Дефіцит макро- та мікроелементів" />'
    },
    {
        file: 'tomat/06-shkidnyky-tomata.md',
        findText: '## Основні шкідники',
        imgTag: '<LightboxImage src="/images/cultures/tomat/shkidnyky-tomativ-ta-poshkodzhennia-iaki-vony-sprychyniaiut.jpg" alt="Шкідники томатів та пошкодження" />'
    },
    // === YABLUNIA (Remaining) ===
    {
        file: 'yablunia/02-posadka.md',
        findText: '### Критерії вибору саджанця', // check exact
        imgTag: '<LightboxImage src="/photos/yablunia/yakisnyi-dvorichnyi-sadzhanets-iabluni.jpg" alt="Якісний дворічний саджанець" />'
    },
    {
        file: 'yablunia/01-biolohiya.md',
        findText: '## Запилення яблуні', // check exact
        imgTag: '<LightboxImage src="/photos/yablunia/tsvitinnia-iabluni-masove-zapylennia-bdzholamy.jpg" alt="Масове запилення квітучої яблуні бджолами" />'
    },
    {
        file: 'yablunia/10-zbir.md',
        findText: '## Підпірки для гілок', // check exact
        imgTag: '<LightboxImage src="/photos/yablunia/pidpirky-pid-hilky-iabluni-obtiazheni-plodamy.jpg" alt="Підпірки під гілки яблуні" />'
    },
    {
        file: 'yablunia/05-dohliad.md',
        findText: '## Осінній догляд', // check exact
        imgTag: '<LightboxImage src="/photos/yablunia/osinnii-sad-pislia-zboru-vrozhaiu-prybyrannia-lystia-i-pidhotovka-do-zymy.jpg" alt="Осінній сад після збору врожаю" />'
    },
    // === ZHYVLENNIA (General) ===
    {
        file: 'yablunia/06-udobrennia.md', // or similar
        findText: '### Дефіцити живлення',
        imgTag: '<LightboxImage src="/photos/zhyvlennia/FB_IMG_1782360810259.jpg" alt="Дефіцити живлення за станом листя" />'
    }
];

let foundCount = 0;

insertions.forEach(ins => {
    const fullPath = path.join(contentDir, ins.file);
    if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const lines = content.split('\n');
        // fuzzy search for headers if exact doesn't match
        let found = lines.find(l => l.trim() === ins.findText);
        if (!found) {
            // try to match lowercase without markdown
            const cleanTarget = ins.findText.replace(/#/g, '').trim().toLowerCase();
            found = lines.find(l => l.replace(/#/g, '').trim().toLowerCase().includes(cleanTarget));
        }
        
        if (found) {
            console.log(`[FOUND] ${ins.file} -> ${found.trim()}`);
            foundCount++;
        } else {
            console.log(`[MISSING] ${ins.file} -> ${ins.findText}`);
        }
    } else {
        console.log(`[NO FILE] ${ins.file}`);
    }
});

console.log(`\nFound ${foundCount} out of ${insertions.length} injection points`);