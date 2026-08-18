const fs = require('fs');
const path = require('path');
const pub = 'd:/1/agro_encyclopedia-main/public';
const contentDir = 'd:/1/agro_encyclopedia-main/content/cultures';

const replacements = [
    {
        file: 'abrykos/08-khvoroby.md', 
        findText: 'Клястероспоріоз',
        imgTag: '\n<LightboxImage src="/photos/abrykos/kliasterosporioz_abrykos2.png" alt="Клястероспоріоз абрикоса" />\n'
    },
    {
        file: 'ahrus/01-biolohiya.md',
        findText: 'аґрусу',
        imgTag: '\n<LightboxImage src="/images/cultures/ahrus/korysni-vlastyvosti-ahrusu.jpg" alt="Корисні властивості плодів аґрусу" />\n'
    },
    {
        file: 'yablunia/08-shkidnyky.md',
        findText: 'Шкідники деревини',
        imgTag: '\n<LightboxImage src="/photos/zachyst/FB_IMG_1784061603090.jpg" alt="Пошкодження стовбура дерева свердлувальними шкідниками" />\n'
    },
    {
        file: 'ohirok/06-shkidnyky-ohirka.md',
        findText: 'Білокрилка',
        imgTag: '\n<LightboxImage src="/photos/zachyst/bilokrylka.jpg" alt="Білокрилка на листі" />\n'
    },
    {
        file: 'tomat/06-shkidnyky-tomata.md',
        findText: 'Білокрилка',
        imgTag: '\n<LightboxImage src="/photos/zachyst/bilokrylka.jpg" alt="Білокрилка на листі" />\n'
    },
    {
        file: 'yablunia/09-zakhyst.md',
        findText: 'Біологічні препарати',
        imgTag: '\n<LightboxImage src="/photos/biozahyst/komakhy-shcho-zakhyshchaiut-sad.jpg" alt="Корисні комахи, які захищають сад" />\n'
    },
    {
        file: 'yablunia/09-zakhyst.md',
        findText: 'Збереження корисної фауни',
        imgTag: '\n<LightboxImage src="/photos/biozahyst/sadovi-pomichnyky-iaki-varto-berehty.jpg" alt="Садові помічники" />\n'
    },
    {
        file: 'tomat/04-zhyvlennia.md',
        findText: 'Народні засоби',
        imgTag: '\n<LightboxImage src="/photos/biozahyst/nastii-kropyvy-dlia-pidzhyvlennia-ovochiv.jpg" alt="Настій кропиви" />\n'
    },
    {
        file: 'yablunia/02-posadka.md',
        findText: 'Вимоги до ґрунту',
        imgTag: '\n<LightboxImage src="/photos/posadka/hrunt-ta-ioho-vlastyvosti.jpg" alt="Грунт та його властивості" />\n'
    },
    {
        file: 'yablunia/02-posadka.md',
        findText: 'Підготовка ями',
        imgTag: '\n<LightboxImage src="/photos/posadka/perehnii.png" alt="Перегній — органічне добриво" />\n'
    },
    {
        file: 'yablunia/02-posadka.md',
        findText: 'Сумісність',
        imgTag: '\n<LightboxImage src="/photos/posadka/10-derev-iaki-ne-bazhano-sadyty-bilia-domu.jpg" alt="Дерева які не бажано садити" />\n'
    },
    {
        file: 'kavun/02-posadka-vyroshchuvannia.md',
        findText: 'Агротехніка',
        imgTag: '\n<LightboxImage src="/images/cultures/kavun/porady-dlia-vyroshchuvannia-solodkykh-ta-sokovytykh-kavuniv.jpg" alt="Поради для вирощування солодких та соковитих кавунів" />\n'
    },
    {
        file: 'malytsia/04-zhyvlennia.md',
        findText: 'підживлення',
        imgTag: '\n<LightboxImage src="/images/cultures/malytsia/pidkormka-smorodyny-kryzhovnyka-ta-malyny.jpg" alt="Підживлення смородини, агрусу та малини" />\n'
    },
    {
        file: 'polunytsia/04-zhyvlennia.md',
        findText: 'Весняне',
        imgTag: '\n<LightboxImage src="/images/cultures/polunytsia/pidzhyvlennia-polunytsi-navesni.jpg" alt="Підживлення полуниці навесні" />\n'
    },
    {
        file: 'smorodyna/04-zhyvlennia.md',
        findText: 'Літнє',
        imgTag: '\n<LightboxImage src="/images/cultures/smorodyna/pidzhyvlennia-smorodyny-vlitku.jpg" alt="Літнє підживлення смородини" />\n'
    },
    {
        file: 'tomat/03-formuvannia-krony-pidviazka.md',
        findText: 'підв\'язування',
        imgTag: '\n<LightboxImage src="/images/cultures/tomat/4-typy-opor-dlia-riznykh-kultur.jpg" alt="4 типи опор для різних культур" />\n'
    },
    {
        file: 'tomat/05-khvoroby-tomata.md',
        findText: 'Основні хвороби',
        imgTag: '\n<LightboxImage src="/images/cultures/tomat/khvoroby-tomativ-ta-ikh-oznaky.jpg" alt="Хвороби томатів та їх ознаки" />\n'
    },
    {
        file: 'tomat/05-khvoroby-tomata.md',
        findText: 'Діагностика',
        imgTag: '\n<LightboxImage src="/images/cultures/tomat/7-naiposhyrenishykh-problem-lystia-tomativ.jpg" alt="7 найпоширеніших проблем листя" />\n'
    },
    {
        file: 'tomat/04-zhyvlennia.md',
        findText: 'Ознаки дефіциту',
        imgTag: '\n<LightboxImage src="/images/cultures/tomat/defitsyt-mikro-ta-makroelementiv-tomativ-.jpg" alt="Дефіцит макро- та мікроелементів" />\n'
    },
    {
        file: 'tomat/06-shkidnyky-tomata.md',
        findText: 'Основні шкідники',
        imgTag: '\n<LightboxImage src="/images/cultures/tomat/shkidnyky-tomativ-ta-poshkodzhennia-iaki-vony-sprychyniaiut.jpg" alt="Шкідники томатів та пошкодження" />\n'
    },
    {
        file: 'yablunia/02-posadka.md',
        findText: 'Критерії',
        imgTag: '\n<LightboxImage src="/photos/yablunia/yakisnyi-dvorichnyi-sadzhanets-iabluni.jpg" alt="Якісний дворічний саджанець" />\n'
    },
    {
        file: 'yablunia/01-biolohiya.md',
        findText: 'Запилення',
        imgTag: '\n<LightboxImage src="/photos/yablunia/tsvitinnia-iabluni-masove-zapylennia-bdzholamy.jpg" alt="Масове запилення квітучої яблуні бджолами" />\n'
    },
    {
        file: 'yablunia/10-zbir.md',
        findText: 'Підпірки',
        imgTag: '\n<LightboxImage src="/photos/yablunia/pidpirky-pid-hilky-iabluni-obtiazheni-plodamy.jpg" alt="Підпірки під гілки яблуні" />\n'
    },
    {
        file: 'yablunia/05-dohliad.md',
        findText: 'Осінній догляд',
        imgTag: '\n<LightboxImage src="/photos/yablunia/osinnii-sad-pislia-zboru-vrozhaiu-prybyrannia-lystia-i-pidhotovka-do-zymy.jpg" alt="Осінній сад після збору врожаю" />\n'
    },
    {
        file: 'yablunia/06-udobrennia.md',
        findText: 'Дефіцити',
        imgTag: '\n<LightboxImage src="/photos/zhyvlennia/FB_IMG_1782360810259.jpg" alt="Дефіцити живлення за станом листя" />\n'
    }
];

let injectedCount = 0;

replacements.forEach(ins => {
    const fullPath = path.join(contentDir, ins.file);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        // avoid double insertion
        if (!content.includes(ins.imgTag.trim())) {
            const lines = content.split('\n');
            const targetIdx = lines.findIndex(l => l.toLowerCase().includes(ins.findText.toLowerCase()));
            if (targetIdx !== -1) {
                // insert below the found line
                lines.splice(targetIdx + 1, 0, ins.imgTag);
                fs.writeFileSync(fullPath, lines.join('\n'), 'utf8');
                console.log(`[INJECTED] ${ins.file} -> after '${ins.findText}'`);
                injectedCount++;
            } else {
                console.log(`[TEXT NOT FOUND] ${ins.file} -> '${ins.findText}'`);
            }
        } else {
            console.log(`[ALREADY EXISTS] ${ins.file} -> '${ins.findText}'`);
        }
    } else {
        console.log(`[FILE NOT FOUND] ${ins.file}`);
    }
});

console.log(`\nSuccessfully injected ${injectedCount} images.`);