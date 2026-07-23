const fs = require('fs');
const path = require('path');

const srcDir1 = path.join(__dirname, 'фото', 'для яблуні');
const srcDir2 = path.join(__dirname, 'фото');
const destDir = path.join(__dirname, 'public', 'photos', 'yablunia');

const filesToCopy = [
    { src: path.join(srcDir1, 'Іржа яблуні.jpg'), dest: 'diseases/rust.jpg' },
    { src: path.join(srcDir1, 'Борошниста роса.jpg'), dest: 'diseases/powdery_mildew.jpg' },
    { src: path.join(srcDir1, 'Сажистий грибок.jpg'), dest: 'diseases/sooty_blotch.jpg' },
    { src: path.join(srcDir1, 'Парша яблуні.jpg'), dest: 'diseases/scab.jpg' },
    { src: path.join(srcDir1, 'Чорний рак.webp'), dest: 'diseases/black_cancer.webp' },
    { src: path.join(srcDir1, 'Дефіцит заліза.jpg'), dest: 'deficiency_iron.jpg' },
    { src: path.join(srcDir1, 'Збір та зберігання.jpg'), dest: 'harvest_storage_hero.jpg' },
    { src: path.join(srcDir1, 'загальне фото яблуневого саду в різні пори року.jpg'), dest: 'orchard_seasons_hero.jpg' },
    { src: path.join(srcDir1, 'Йодокрохмальна проба.jpg'), dest: 'iodine_test.jpg' },
    { src: path.join(srcDir1, 'шкідники яблуні на 1 фото.jpg'), dest: 'pests/all_pests_hero.jpg' },
    { src: path.join(srcDir1, 'колонії попелиці на скрученому молодому листі.jpg'), dest: 'pests/aphids_leaves.jpg' },
    { src: path.join(srcDir1, 'Мурахи, які повзають біля попелиці (симбіоз).jpg'), dest: 'pests/ants_aphids2.jpg' },
    { src: path.join(srcDir1, 'Кліщі (павутинний та бурий).jpg'), dest: 'pests/mites.jpg' },
    { src: path.join(srcDir1, 'Розрізане червиве яблуко (де чітко видно хід гусениці до насіннєвої камери та бурі виділення)..jpg'), dest: 'pests/wormy_apple2.jpg' },
    { src: path.join(srcDir1, 'Скручене в трубочку листя, скріплене павутиною (листовійка)..jpg'), dest: 'pests/leafroller2.jpg' },
    { src: path.join(srcDir1, 'Яблунева плодожерка.jpg'), dest: 'pests/codling_moth2.jpg' },
    { src: path.join(srcDir1, 'Дорослий жук-довгоносик.jpg'), dest: 'pests/weevil.jpg' },
    { src: path.join(srcDir1, 'схема захисту яблуневого садуфото.jpg'), dest: 'zakhyst/protection_scheme.jpg' },
    { src: path.join(srcDir1, 'Обгризена кора на штамбі молодої яблуні після зими.jpg'), dest: 'pests/mouse_damage2.jpg' },
    { src: path.join(srcDir1, 'Пошкоджена квітка.jpg'), dest: 'pests/damaged_flower.jpg' },
    { src: path.join(srcDir1, 'Зріз на кільце_Повне видалення гілки.jpg'), dest: 'pruning_collar.jpg' },
    { src: path.join(srcDir2, 'Збір яблук вручну в осінньому саду.jpg'), dest: 'harvest_manual.jpg' },
    { src: path.join(srcDir2, 'Збір яблук у саду — ручний збір в дерев\'яні ящики.jpg'), dest: 'harvest_crates.jpg' }
];

filesToCopy.forEach(item => {
    const destPath = path.join(destDir, item.dest);
    const destFolder = path.dirname(destPath);
    if (!fs.existsSync(destFolder)) {
        fs.mkdirSync(destFolder, { recursive: true });
    }
    if (fs.existsSync(item.src)) {
        fs.copyFileSync(item.src, destPath);
        console.log('Copied:', path.basename(item.src), '->', item.dest);
    } else {
        console.error('File not found:', item.src);
    }
});
