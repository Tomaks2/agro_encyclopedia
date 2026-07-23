const fs = require('fs');
const path = require('path');

const srcDir = 'm:\\agro_encyclopedia\\фото\\для яблуні';
const guideDestDir = 'm:\\agro_encyclopedia\\public\\photos\\yablunia\\guide';
const pestsDestFile = 'm:\\agro_encyclopedia\\public\\photos\\yablunia\\pests\\all_pests_hero.jpg';

fs.mkdirSync(guideDestDir, { recursive: true });

fs.copyFileSync(path.join(srcDir, 'шкідники яблуні на 1 фото.jpg'), pestsDestFile);

fs.copyFileSync(path.join(srcDir, 'images.jpg'), path.join(guideDestDir, 'guide1.jpg'));
fs.copyFileSync(path.join(srcDir, 'images (1).jpg'), path.join(guideDestDir, 'guide2.jpg'));
fs.copyFileSync(path.join(srcDir, 'images (2).jpg'), path.join(guideDestDir, 'guide3.jpg'));
fs.copyFileSync(path.join(srcDir, 'images (3).jpg'), path.join(guideDestDir, 'guide_full.jpg'));

console.log('Copy complete!');
