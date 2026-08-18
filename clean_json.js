const fs = require('fs');
const path = require('path');

const repo = 'd:/1/agro_encyclopedia-main/content/cultures';
const cultures = ['ahrus', 'lokhyna', 'malytsia', 'ozhyna', 'polunytsia', 'smorodyna'];

for (const culture of cultures) {
    const metaPath = path.join(repo, culture, 'meta.json');
    if (fs.existsSync(metaPath)) {
        let content = fs.readFileSync(metaPath, 'utf8');
        // Remove BOM
        content = content.replace(/^\uFEFF/, '');
        
        // Also ensure valid JSON (some trailing commas or stuff might exist)
        try {
            JSON.parse(content);
            fs.writeFileSync(metaPath, content, 'utf8');
            console.log(`Cleaned meta.json for ${culture}`);
        } catch (e) {
            console.log(`JSON Error in ${culture}: ${e.message}`);
        }
    }
}