const fs = require('fs');
const path = require('path');
const contentDir = 'd:/1/agro_encyclopedia-main/content/cultures';

// A super aggressive matcher to ensure all images get inserted SOMEWHERE logically
// We just find the file for the culture and append to the nearest heading
const looseInjections = [
    { c: 'abrykos', tag: '<LightboxImage src="/photos/abrykos/kliasterosporioz_abrykos2.png" alt="Клястероспоріоз абрикоса" />', match: /khvoroby/ },
    { c: 'ahrus', tag: '<LightboxImage src="/images/cultures/ahrus/korysni-vlastyvosti-ahrusu.jpg" alt="Корисні властивості плодів аґрусу" />', match: /biolohiya/ },
    { c: 'yablunia', tag: '<LightboxImage src="/photos/zachyst/FB_IMG_1784061603090.jpg" alt="Пошкодження стовбура дерева свердлувальними шкідниками" />', match: /shkidnyky/ },
    { c: 'ohirok', tag: '<LightboxImage src="/photos/zachyst/bilokrylka.jpg" alt="Білокрилка на листі" />', match: /shkidnyky/ },
    { c: 'tomat', tag: '<LightboxImage src="/photos/zachyst/bilokrylka.jpg" alt="Білокрилка на листі" />', match: /shkidnyky/ },
    { c: 'yablunia', tag: '<LightboxImage src="/photos/biozahyst/komakhy-shcho-zakhyshchaiut-sad.jpg" alt="Корисні комахи, які захищають сад" />', match: /zakhyst/ },
    { c: 'yablunia', tag: '<LightboxImage src="/photos/biozahyst/sadovi-pomichnyky-iaki-varto-berehty.jpg" alt="Садові помічники" />', match: /zakhyst/ },
    { c: 'tomat', tag: '<LightboxImage src="/photos/biozahyst/nastii-kropyvy-dlia-pidzhyvlennia-ovochiv.jpg" alt="Настій кропиви" />', match: /zhyvlennia/ },
    { c: 'yablunia', tag: '<LightboxImage src="/photos/posadka/hrunt-ta-ioho-vlastyvosti.jpg" alt="Грунт та його властивості" />', match: /posadka/ },
    { c: 'yablunia', tag: '<LightboxImage src="/photos/posadka/perehnii.png" alt="Перегній — органічне добриво" />', match: /posadka/ },
    { c: 'yablunia', tag: '<LightboxImage src="/photos/posadka/10-derev-iaki-ne-bazhano-sadyty-bilia-domu.jpg" alt="Дерева які не бажано садити" />', match: /posadka/ },
    { c: 'kavun', tag: '<LightboxImage src="/images/cultures/kavun/porady-dlia-vyroshchuvannia-solodkykh-ta-sokovytykh-kavuniv.jpg" alt="Поради для вирощування солодких та соковитих кавунів" />', match: /posadka|vyroshchuvannia/ },
    { c: 'malytsia', tag: '<LightboxImage src="/images/cultures/malytsia/pidkormka-smorodyny-kryzhovnyka-ta-malyny.jpg" alt="Підживлення смородини, агрусу та малини" />', match: /zhyvlennia/ },
    { c: 'polunytsia', tag: '<LightboxImage src="/images/cultures/polunytsia/pidzhyvlennia-polunytsi-navesni.jpg" alt="Підживлення полуниці навесні" />', match: /zhyvlennia/ },
    { c: 'smorodyna', tag: '<LightboxImage src="/images/cultures/smorodyna/pidzhyvlennia-smorodyny-vlitku.jpg" alt="Літнє підживлення смородини" />', match: /zhyvlennia/ },
    { c: 'tomat', tag: '<LightboxImage src="/images/cultures/tomat/4-typy-opor-dlia-riznykh-kultur.jpg" alt="4 типи опор для різних культур" />', match: /formuvannia/ },
    { c: 'tomat', tag: '<LightboxImage src="/images/cultures/tomat/khvoroby-tomativ-ta-ikh-oznaky.jpg" alt="Хвороби томатів та їх ознаки" />', match: /khvoroby/ },
    { c: 'tomat', tag: '<LightboxImage src="/images/cultures/tomat/7-naiposhyrenishykh-problem-lystia-tomativ.jpg" alt="7 найпоширеніших проблем листя" />', match: /khvoroby/ },
    { c: 'tomat', tag: '<LightboxImage src="/images/cultures/tomat/defitsyt-mikro-ta-makroelementiv-tomativ-.jpg" alt="Дефіцит макро- та мікроелементів" />', match: /zhyvlennia/ },
    { c: 'tomat', tag: '<LightboxImage src="/images/cultures/tomat/shkidnyky-tomativ-ta-poshkodzhennia-iaki-vony-sprychyniaiut.jpg" alt="Шкідники томатів та пошкодження" />', match: /shkidnyky/ },
    { c: 'yablunia', tag: '<LightboxImage src="/photos/yablunia/yakisnyi-dvorichnyi-sadzhanets-iabluni.jpg" alt="Якісний дворічний саджанець" />', match: /posadka/ },
    { c: 'yablunia', tag: '<LightboxImage src="/photos/yablunia/tsvitinnia-iabluni-masove-zapylennia-bdzholamy.jpg" alt="Масове запилення квітучої яблуні бджолами" />', match: /biolohiya/ },
    { c: 'yablunia', tag: '<LightboxImage src="/photos/yablunia/pidpirky-pid-hilky-iabluni-obtiazheni-plodamy.jpg" alt="Підпірки під гілки яблуні" />', match: /zbir/ },
    { c: 'yablunia', tag: '<LightboxImage src="/photos/yablunia/osinnii-sad-pislia-zboru-vrozhaiu-prybyrannia-lystia-i-pidhotovka-do-zymy.jpg" alt="Осінній сад після збору врожаю" />', match: /dohliad|zbir/ },
    { c: 'yablunia', tag: '<LightboxImage src="/photos/zhyvlennia/FB_IMG_1782360810259.jpg" alt="Дефіцити живлення за станом листя" />', match: /udobrennia|zhyvlennia/ }
];

let i = 0;
for (const inj of looseInjections) {
    const dir = path.join(contentDir, inj.c);
    if (!fs.existsSync(dir)) continue;
    
    const files = fs.readdirSync(dir).filter(f => inj.match.test(f));
    if (files.length > 0) {
        const file = path.join(dir, files[0]);
        let content = fs.readFileSync(file, 'utf8');
        // Only insert if not already there
        if (!content.includes(inj.tag.split('" ')[0])) { // basic check
            // append to end of file if no good heading found
            content += `\n\n${inj.tag}\n`;
            fs.writeFileSync(file, content, 'utf8');
            i++;
        }
    }
}
console.log(`Injected ${i} images.`);