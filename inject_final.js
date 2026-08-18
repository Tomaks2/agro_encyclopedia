const fs = require('fs');
const path = require('path');
const contentDir = 'd:/1/agro_encyclopedia-main/content/cultures';

const injections = [
    { target: 'abrykos/06-khvoroby-ta-shkidnyky.md', match: /Клястероспоріоз/, img: '/photos/abrykos/kliasterosporioz_abrykos2.png' },
    { target: 'ahrus/01-biolohiya.md', match: /аґрусу/i, img: '/images/cultures/ahrus/korysni-vlastyvosti-ahrusu.jpg' },
    { target: 'yablunia/08-shkidnyky.md', match: /Шкідники деревини/, img: '/photos/zachyst/FB_IMG_1784061603090.jpg' },
    { target: 'ohirok/07-shkidnyky-ta-zakhyst.md', match: /Білокрилка/, img: '/photos/zachyst/bilokrylka.jpg' },
    { target: 'tomat/07-shkidnyky-tomata.md', match: /Білокрилка/, img: '/photos/zachyst/bilokrylka.jpg' },
    { target: 'yablunia/09-zakhyst.md', match: /Біологічні препарати/, img: '/photos/biozahyst/komakhy-shcho-zakhyshchaiut-sad.jpg' },
    { target: 'yablunia/09-zakhyst.md', match: /корисної фауни/, img: '/photos/biozahyst/sadovi-pomichnyky-iaki-varto-berehty.jpg' },
    { target: 'tomat/05-zhyvlennia-vershynna-hnyts.md', match: /Народні засоби/, img: '/photos/biozahyst/nastii-kropyvy-dlia-pidzhyvlennia-ovochiv.jpg' },
    { target: 'yablunia/02-posadka.md', match: /Вимоги до ґрунту/, img: '/photos/posadka/hrunt-ta-ioho-vlastyvosti.jpg' },
    { target: 'yablunia/02-posadka.md', match: /Підготовка ями/, img: '/photos/posadka/perehnii.png' },
    { target: 'yablunia/02-posadka.md', match: /Сумісність/, img: '/photos/posadka/10-derev-iaki-ne-bazhano-sadyty-bilia-domu.jpg' },
    { target: 'kavun/02-vyroshchuvannia-ta-dohliad.md', match: /Агротехніка/, img: '/images/cultures/kavun/porady-dlia-vyroshchuvannia-solodkykh-ta-sokovytykh-kavuniv.jpg' },
    { target: 'malytsia/04-dohliad-ta-zhyvlennia.md', match: /підживлення/i, img: '/images/cultures/malytsia/pidkormka-smorodyny-kryzhovnyka-ta-malyny.jpg' },
    { target: 'polunytsia/04-dohliad-ta-zhyvlennia.md', match: /Весняне/, img: '/images/cultures/polunytsia/pidzhyvlennia-polunytsi-navesni.jpg' },
    { target: 'smorodyna/04-dohliad-ta-zhyvlennia.md', match: /Літнє/, img: '/images/cultures/smorodyna/pidzhyvlennia-smorodyny-vlitku.jpg' },
    { target: 'tomat/04-formuvannia-pasynkuvannia.md', match: /підв'яз/i, img: '/images/cultures/tomat/4-typy-opor-dlia-riznykh-kultur.jpg' },
    { target: 'tomat/06-khvoroby-tomata.md', match: /Основні хвороби/, img: '/images/cultures/tomat/khvoroby-tomativ-ta-ikh-oznaky.jpg' },
    { target: 'tomat/06-khvoroby-tomata.md', match: /Діагностика/, img: '/images/cultures/tomat/7-naiposhyrenishykh-problem-lystia-tomativ.jpg' },
    { target: 'tomat/05-zhyvlennia-vershynna-hnyts.md', match: /Ознаки дефіциту/, img: '/images/cultures/tomat/defitsyt-mikro-ta-makroelementiv-tomativ-.jpg' },
    { target: 'tomat/07-shkidnyky-tomata.md', match: /Основні шкідники/, img: '/images/cultures/tomat/shkidnyky-tomativ-ta-poshkodzhennia-iaki-vony-sprychyniaiut.jpg' },
    { target: 'yablunia/02-posadka.md', match: /Критерії/, img: '/photos/yablunia/yakisnyi-dvorichnyi-sadzhanets-iabluni.jpg' },
    { target: 'yablunia/01-biolohiya.md', match: /Запилення/, img: '/photos/yablunia/tsvitinnia-iabluni-masove-zapylennia-bdzholamy.jpg' },
    { target: 'yablunia/10-zbir.md', match: /Підпірки/, img: '/photos/yablunia/pidpirky-pid-hilky-iabluni-obtiazheni-plodamy.jpg' },
    { target: 'yablunia/05-dohliad.md', match: /Осінній догляд/, img: '/photos/yablunia/osinnii-sad-pislia-zboru-vrozhaiu-prybyrannia-lystia-i-pidhotovka-do-zymy.jpg' },
    { target: 'yablunia/06-udobrennia.md', match: /Дефіцити/, img: '/photos/zhyvlennia/FB_IMG_1782360810259.jpg' }
];

let found = 0;
for (const inj of injections) {
    let fileToModify = null;
    let targetPath = inj.target;
    
    // Since filenames might be slightly off, let's search within the folder
    const [folder, hintName] = targetPath.split('/');
    const fullFolder = path.join(contentDir, folder);
    
    if (fs.existsSync(fullFolder)) {
        const mdFiles = fs.readdirSync(fullFolder).filter(f => f.endsWith('.md'));
        
        // Try exact first
        if (mdFiles.includes(hintName)) {
            fileToModify = path.join(fullFolder, hintName);
        } else {
            // Find a file that contains the hint keyword
            const keyword = hintName.replace(/^\d+-/, '').split('-')[0];
            const guess = mdFiles.find(f => f.includes(keyword));
            if (guess) fileToModify = path.join(fullFolder, guess);
        }
        
        if (fileToModify) {
            let content = fs.readFileSync(fileToModify, 'utf8');
            if (!content.includes(inj.img)) {
                const lines = content.split('\n');
                const idx = lines.findIndex(l => inj.match.test(l));
                if (idx !== -1) {
                    const tag = `\n<LightboxImage src="${inj.img}" alt="${path.basename(inj.img).split('.')[0].replace(/-/g, ' ')}" />\n`;
                    lines.splice(idx + 1, 0, tag);
                    fs.writeFileSync(fileToModify, lines.join('\n'), 'utf8');
                    found++;
                }
            }
        }
    }
}
console.log(`Injected ${found} images.`);