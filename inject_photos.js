const fs = require('fs');
const path = require('path');

const insertions = [
    // yablunia
    {
        fileRegex: /yablunia.*posadka.*\.md$/,
        findText: /Розсадний матеріал.*?(\r?\n\r?\n)/s,
        imgTag: '\n<LightboxImage src="/photos/yablunia/yakisnyi-dvorichnyi-sadzhanets-iabluni.jpg" alt="Якісний дворічний саджанець яблуні" />\n\n'
    },
    {
        fileRegex: /yablunia.*biolohiya.*\.md$/,
        findText: /Запилення.*?(\r?\n\r?\n)/s,
        imgTag: '\n<LightboxImage src="/photos/yablunia/tsvitinnia-iabluni-masove-zapylennia-bdzholamy.jpg" alt="Масове запилення квітучої яблуні бджолами під час цвітіння" />\n\n'
    },
    {
        fileRegex: /yablunia.*zhyvlennia.*\.md$/,
        findText: /сидерати.*?(\r?\n\r?\n)/si,
        imgTag: '\n<LightboxImage src="/photos/yablunia/hirchytsia-iak-syderat-mizh-riadamy-iablunevoho-sadu-zelena-masa.jpg" alt="Гірчиця як сидерат між рядами яблуневого саду" />\n\n'
    },
    {
        fileRegex: /yablunia.*dohliad.*\.md$/, // or posadka
        findText: /Мульчування.*?(\r?\n\r?\n)/s,
        imgTag: '\n<LightboxImage src="/photos/yablunia/mulchuvannia-prystvolnoho-kola-iabluni-perehnoiem.jpg" alt="Мульчування приствольного кола яблуні перегноєм" />\n\n'
    },
    {
        fileRegex: /yablunia.*dohliad.*\.md$/,
        findText: /Полив.*?(\r?\n\r?\n)/s,
        imgTag: '\n<LightboxImage src="/photos/yablunia/systema-krapelnoho-polyvu-v-iablunevomu-sadu.jpg" alt="Система крапельного поливу в яблуневому саду" />\n\n'
    },
    {
        fileRegex: /yablunia.*zakhyst.*\.md$/,
        findText: /Побілка.*?(\r?\n\r?\n)/si,
        imgTag: '\n<LightboxImage src="/photos/yablunia/pobilka-shtamba-iabluni.png" alt="Побілка штамба яблуні вапняним розчином на зиму" />\n\n'
    },
    {
        fileRegex: /yablunia.*zbir.*\.md$/,
        findText: /Підпірки.*?(\r?\n\r?\n)/si,
        imgTag: '\n<LightboxImage src="/photos/yablunia/pidpirky-pid-hilky-iabluni-obtiazheni-plodamy.jpg" alt="Підпірки під гілки яблуні, обтяжені плодами" />\n\n'
    },
    {
        fileRegex: /yablunia.*zbir.*\.md$/, // or dohliad
        findText: /Осінній догляд.*?(\r?\n\r?\n)/si,
        imgTag: '\n<LightboxImage src="/photos/yablunia/osinnii-sad-pislia-zboru-vrozhaiu-prybyrannia-lystia-i-pidhotovka-do-zymy.jpg" alt="Осінній сад після збору врожаю" />\n\n'
    },
    // persyk
    {
        fileRegex: /persyk.*formuvannia.*\.md$/,
        findText: /чаші.*?(\r?\n\r?\n)/si,
        imgTag: '\n<LightboxImage src="/photos/persyk/obrizka_persyka_pravylno_forma_chashi2.png" alt="Правильне формування персика: форма чаші" />\n\n'
    }
];

const contentDir = 'd:/1/agro_encyclopedia-main/content/cultures';
let modified = 0;

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) walk(full);
        else if (full.endsWith('.md')) {
            let content = fs.readFileSync(full, 'utf8');
            let changed = false;
            
            for (const ins of insertions) {
                if (ins.fileRegex.test(full.replace(/\\/g, '/'))) {
                    // avoid double insertion
                    if (!content.includes(ins.imgTag.trim())) {
                        const match = content.match(ins.findText);
                        if (match) {
                            const index = match.index + match[0].length;
                            content = content.slice(0, index) + ins.imgTag + content.slice(index);
                            changed = true;
                            console.log(`Injected into ${path.basename(full)}: ${ins.imgTag.trim().substring(0,50)}...`);
                        }
                    }
                }
            }
            if (changed) {
                fs.writeFileSync(full, content, 'utf8');
                modified++;
            }
        }
    }
}
walk(contentDir);
console.log(`Modified ${modified} files`);