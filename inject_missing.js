const fs = require('fs');
const file = 'd:/1/agro_encyclopedia-main/content/cultures/yablunia/01-biolohiya.md';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    const tag = '\n\n<LightboxImage src="/photos/yablunia/tsvitinnia-iabluni-masove-zapylennia-bdzholamy.jpg" alt="Масове запилення квітучої яблуні бджолами" />\n';
    content += tag;
    fs.writeFileSync(file, content, 'utf8');
}