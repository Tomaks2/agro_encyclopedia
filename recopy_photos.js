const fs = require('fs');
const path = require('path');

const pub = 'd:/1/agro_encyclopedia-main/public';
const src = 'd:/1/123/123/PHOTOS_FOR_SITE_архів_36_файлів/PHOTOS_FOR_SITE';

// All target files from LIGHTBOX_CODE - delete garbled ones and re-copy correctly
const fileMapping = [
    // [srcDir, srcFilename (from LIGHTBOX), dstDir]
    ['yablunia', 'Якісний дворічний саджанець яблуні.jpg', 'photos/yablunia'],
    ['yablunia', 'Цвітіння яблуні — масове запилення бджолами.jpg', 'photos/yablunia'],
    ['yablunia', 'Гірчиця як сидерат між рядами яблуневого саду — зелена маса.jpg', 'photos/yablunia'],
    ['yablunia', 'Мульчування приствольного кола яблуні перегноєм.jpg', 'photos/yablunia'],
    ['yablunia', 'Система крапельного поливу в яблуневому саду.jpg', 'photos/yablunia'],
    ['yablunia', 'Побілка штамба яблуні.png', 'photos/yablunia'],
    ['yablunia', 'Підпірки під гілки яблуні, обтяжені плодами.jpg', 'photos/yablunia'],
    ['yablunia', 'Осінній сад після збору врожаю — прибирання листя і підготовка до зими.jpg', 'photos/yablunia'],
    ['persyk', 'Обрізка_Персика_Правильно_форма_чаші2.png', 'photos/persyk'],
    ['abrykos', 'Клястероспоріоз_абрикос2.png', 'photos/abrykos'],
    ['tomat', 'Хвороби томатів та їх ознаки.jpg', 'images/cultures/tomat'],
    ['tomat', '7 найпоширеніших проблем листя томатів.jpg', 'images/cultures/tomat'],
    ['tomat', '6 сигналів томатів перед катастрофою.jpg', 'images/cultures/tomat'],
    ['tomat', 'про що говорить листа томатів.jpg', 'images/cultures/tomat'],
    ['tomat', 'дефіцит мікро та макроелементів томатів .jpg', 'images/cultures/tomat'],
    ['tomat', 'шкідники томатів та пошкодження які вони спричиняють.jpg', 'images/cultures/tomat'],
    ['tomat', '4 типи опор для різних культур.jpg', 'images/cultures/tomat'],
    ['polunytsia', 'підживлення полуниці навесні.jpg', 'images/cultures/polunytsia'],
    ['malytsia', 'підкормка смородини, крижовника та малини.jpg', 'images/cultures/malytsia'],
    ['smorodyna', 'підживлення смородини влітку.jpg', 'images/cultures/smorodyna'],
    ['ahrus', 'корисні властивості агрусу.jpg', 'images/cultures/ahrus'],
    ['kavun', 'Поради для вирощування солодких та соковитих кавунів.jpg', 'images/cultures/kavun'],
    ['zachyst', 'FB_IMG_1784061603090.jpg', 'photos/zachyst'],
    ['zachyst', 'білокрилка.jpg', 'photos/zachyst'],
    ['zachyst', 'вуховертка звичайна.jpg', 'photos/zachyst'],
    ['biozahyst', 'комахи що захищають сад.jpg', 'photos/biozahyst'],
    ['biozahyst', 'комахи що захищають сад (2).jpg', 'photos/biozahyst'],
    ['biozahyst', 'садові помічники які варто берегти.jpg', 'photos/biozahyst'],
    ['biozahyst', 'настій кропиви для підживлення овочів.jpg', 'photos/biozahyst'],
    ['posadka', 'грунт та його властивості.jpg', 'photos/posadka'],
    ['posadka', 'Перегній.png', 'photos/posadka'],
    ['posadka', 'Перегній як мульча під плодовими деревами — правильне внесення.png', 'photos/posadka'],
    ['posadka', '10 дерев які не бажано садити біля дому.jpg', 'photos/posadka'],
    ['zhyvlennia', 'FB_IMG_1782360810259.jpg', 'photos/zhyvlennia'],
    ['vynograd', 'FB_IMG_1782360902275.jpg', 'photos/vynograd'],
];

// First, delete garbled files from dst dirs
const dirs = new Set(fileMapping.map(([,, d]) => d));
for (const dir of dirs) {
    const fullDir = path.join(pub, dir);
    if (!fs.existsSync(fullDir)) continue;
    const files = fs.readdirSync(fullDir);
    for (const f of files) {
        // Delete files with garbled char patterns (contains ¦ or T followed by Cyrillic)
        if (f.includes('¦') || /T[А-Я]/u.test(f)) {
            fs.unlinkSync(path.join(fullDir, f));
            console.log(`Deleted garbled: ${dir}/${f}`);
        }
    }
}

// Now find and copy each file by matching size
for (const [srcSubdir, filename, dstRelative] of fileMapping) {
    const srcFile = path.join(src, srcSubdir, filename);
    const dstFile = path.join(pub, dstRelative, filename);
    
    if (fs.existsSync(dstFile)) {
        console.log(`Already exists: ${dstRelative}/${filename}`);
        continue;
    }
    
    if (fs.existsSync(srcFile)) {
        const dstDir = path.join(pub, dstRelative);
        if (!fs.existsSync(dstDir)) fs.mkdirSync(dstDir, { recursive: true });
        fs.copyFileSync(srcFile, dstFile);
        console.log(`Copied: ${srcSubdir}/${filename} -> ${dstRelative}/`);
    } else {
        // Try to find by size in src dir
        const srcDirFiles = fs.readdirSync(path.join(src, srcSubdir));
        console.log(`NOT FOUND in src: ${srcSubdir}/${filename}`);
        console.log(`  Available: ${srcDirFiles.join(', ')}`);
    }
}

console.log('\nDone!');